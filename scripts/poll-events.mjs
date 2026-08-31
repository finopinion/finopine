#!/usr/bin/env node
/**
 * STAGE 1 OF 3 - POLL. Runs hourly. Gemini, free tier.
 *
 * Fetches every verified feed, finds items it has not seen before, scores them,
 * and writes anything notable to events-queue.json. Writes nothing else and
 * publishes nothing. The queue is picked up by vet-events.mjs.
 *
 * THE DETERMINISTIC SIGNALS COME FIRST, AND THEY WORK WITHOUT ANY MODEL:
 *
 *   corroboration  the same entity appearing across independent feeds inside a
 *                  window. Far more reliable than keyword matching, which fires
 *                  on every routine release.
 *   source tier    an unscheduled release from a central bank or regulator is
 *                  inherently notable. An article about one is not.
 *   off-calendar   a primary source publishing outside its known schedule is
 *                  the single strongest signal available.
 *
 * Gemini then reads the shortlist and judges whether each is materially new or
 * routine. If Gemini is unavailable the deterministic score stands on its own
 * and the run continues degraded rather than failing. That matters: a watcher
 * that stops watching when a free tier rate-limits is not a watcher.
 *
 * Cost: zero. That is the entire reason a second vendor is tolerated here.
 */

import { readFile, writeFile } from 'node:fs/promises';

const SEEN_FILE  = 'events-seen.json';
const QUEUE_FILE = 'events-queue.json';
const WINDOW_HOURS = 6;
const SHORTLIST = 8;

const summary = [];
const note = (s) => { console.log(s); summary.push(s); };

/* ------------------------------------------------------------- load state */

const registry = JSON.parse(await readFile('feeds.json', 'utf8'));
const models   = JSON.parse(await readFile('models.json', 'utf8'));
const feeds    = registry.feeds.filter((f) => f.verified && f.jurisdiction !== 'skip');

let seen = {};
try { seen = JSON.parse(await readFile(SEEN_FILE, 'utf8')); } catch { /* first run */ }

let queue = { items: [], updated: null };
try { queue = JSON.parse(await readFile(QUEUE_FILE, 'utf8')); } catch { /* first run */ }

if (!feeds.length) {
  note('No verified feeds. Nothing to poll. Run check-feeds first.');
  await flush();
  process.exit(0);
}

/* ------------------------------------------------------------------ fetch */

function stripTags(s) {
  return String(s || '').replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

const UNSTABLE = [
  /as-it-happened/i, /live-updates/i, /\blive-blog\b/i, /\/live\//i,
  /markets-business-news-live/i, /rolling-coverage/i, /minute-by-minute/i
];

function parseFeed(xml, feed) {
  return xml.split(/<item[\s>]|<entry[\s>]/i).slice(1).map((b) => {
    const pick = (t) => {
      const m = b.match(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, 'i'));
      return m ? stripTags(m[1]) : '';
    };
    let link = pick('link');
    if (!link) { const m = b.match(/<link[^>]*href=["']([^"']+)["']/i); link = m ? m[1] : ''; }
    const d = pick('pubDate') || pick('updated') || pick('published') || pick('dc:date');
    return {
      title: pick('title'),
      link,
      summary: (pick('description') || pick('summary') || pick('content')).slice(0, 500),
      at: d ? new Date(d).toISOString() : new Date().toISOString(),
      publisher: feed.publisher,
      feedId: feed.id,
      jurisdiction: feed.jurisdiction,
      kind: feed.kind,
      weight: feed.weight ?? 1
    };
  }).filter((i) => i.title && i.link && !UNSTABLE.some((re) => re.test(i.link + ' ' + i.title)));
}

const fresh = [];
for (const f of feeds) {
  try {
    const res = await fetch(f.url, { headers: { 'user-agent': 'FinOpine-watch/1.0' }, redirect: 'follow' });
    if (res.status !== 200) { note(`  ${f.id}: HTTP ${res.status}`); continue; }
    const items = parseFeed(await res.text(), f);
    const newOnes = items.filter((i) => !seen[i.link]);
    newOnes.forEach((i) => { seen[i.link] = new Date().toISOString(); });
    fresh.push(...newOnes);
    note(`  ${f.id}: ${items.length} items, ${newOnes.length} new`);
  } catch (e) {
    note(`  ${f.id}: ${e.message}`);
  }
}

if (!fresh.length) {
  note('Nothing new since last poll.');
  await writeFile(SEEN_FILE, JSON.stringify(seen, null, 0));
  if (process.env.GITHUB_OUTPUT) {
    await writeFile(process.env.GITHUB_OUTPUT, 'queued=0\n', { flag: 'a' });
  }
  await flush();
  process.exit(0);
}

/* ------------------------------------------- deterministic scoring, no model */

const STOP = new Set(['the','and','for','with','from','that','this','have','has','been','will',
  'says','said','new','more','after','over','into','about','announces','announced','statement',
  'release','media','report','update','news']);

function entities(t) {
  return new Set(String(t).split(/[^A-Za-z0-9]+/)
    .filter((w) => w.length > 3 && !STOP.has(w.toLowerCase()))
    .map((w) => w.toLowerCase()));
}

const cutoff = Date.now() - WINDOW_HOURS * 3600000;
const recent = fresh.filter((i) => new Date(i.at).getTime() >= cutoff);

for (const item of fresh) {
  const ents = entities(item.title);
  const others = recent.filter((o) => o.link !== item.link && o.feedId !== item.feedId);
  let corroboration = 0;
  for (const o of others) {
    const oe = entities(o.title);
    const shared = [...ents].filter((e) => oe.has(e)).length;
    if (shared >= 2) corroboration++;
  }
  item.corroboration = corroboration;
  // primary sources are inherently more notable than commentary about them
  item.score = (item.kind === 'primary' ? 3 : 0) + item.weight + corroboration * 4;
}

fresh.sort((a, b) => b.score - a.score);
const shortlist = fresh.slice(0, SHORTLIST);
note(`${fresh.length} new items, top score ${fresh[0].score}, shortlisting ${shortlist.length}`);

/* --------------------------------------------------------- Gemini judgement */

const KEY = process.env.GEMINI_API_KEY;
let judged = null;

if (KEY) {
  const prompt = `You are triaging financial news for an opinion site covering monetary policy,
tax, financial regulation and payments. You are NOT writing anything. You are deciding
which of these items, if any, is materially new rather than routine.

Routine means: a scheduled release landing as expected, a summary of something already
known, a market wrap, a minor administrative notice.

Material means: an unexpected decision, a policy reversal, a new rule or draft law, an
enforcement action against a significant firm, a regulator changing its own position, or
a scheduled release whose CONTENT is surprising.

${shortlist.map((c, i) => `[${i}] ${c.publisher} (${c.jurisdiction}) - ${c.title}
    ${c.summary.slice(0, 240)}`).join('\n\n')}

Return ONLY this JSON, no fences:
{"picks":[{"index":0,"material":true,"why":"under 20 words","urgency":"high|medium|low"}]}

Include an entry for every item. Most should be material:false. If nothing is material,
return every item with material:false. Do not invent urgency to seem useful.`;

  for (const model of models.poll.ladder) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`,
        { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0, maxOutputTokens: 16000, responseMimeType: 'application/json' }
          }) });
      if (!res.ok) { note(`  poll ${model}: HTTP ${res.status}`); continue; }
      const data = await res.json();
      const cand = data.candidates?.[0];
      const text = cand?.content?.parts?.map((p) => p.text).join('') ?? '';
      if (!text.trim()) { note(`  poll ${model}: empty, finishReason=${cand?.finishReason}`); continue; }
      judged = JSON.parse(text.replace(/```json|```/g, '').trim());
      note(`  poll served by ${model}`);
      break;
    } catch (e) { note(`  poll ${model}: ${e.message}`); }
  }
}

if (!judged) {
  note('Gemini unavailable. Falling back to deterministic score alone - degraded, not stopped.');
}

/* ------------------------------------------------------------ build queue */

const CORROBORATION_FLOOR = 2;   // used when no model judgement is available
let added = 0;

for (const [i, item] of shortlist.entries()) {
  const verdict = judged?.picks?.find((p) => p.index === i);
  const material = verdict
    ? verdict.material === true
    : (item.corroboration >= CORROBORATION_FLOOR || (item.kind === 'primary' && item.score >= 8));
  if (!material) continue;
  if (queue.items.some((q) => q.link === item.link)) continue;

  queue.items.push({
    link: item.link, title: item.title, publisher: item.publisher,
    jurisdiction: item.jurisdiction, summary: item.summary, at: item.at,
    score: item.score, corroboration: item.corroboration,
    why: verdict?.why ?? 'deterministic: corroborated across feeds',
    urgency: verdict?.urgency ?? 'medium',
    judgedBy: judged ? 'gemini' : 'deterministic',
    queuedAt: new Date().toISOString()
  });
  added++;
  note(`  QUEUED [${item.jurisdiction}] ${item.title.slice(0, 70)}`);
}

// keep the queue from growing without bound
queue.items = queue.items
  .filter((q) => Date.now() - new Date(q.queuedAt).getTime() < 7 * 86400000)
  .sort((a, b) => b.score - a.score)
  .slice(0, 40);
queue.updated = new Date().toISOString();

// forget links older than 30 days so the seen file does not grow forever
const keep = Date.now() - 30 * 86400000;
seen = Object.fromEntries(Object.entries(seen).filter(([, t]) => new Date(t).getTime() >= keep));

await writeFile(SEEN_FILE, JSON.stringify(seen, null, 0));
await writeFile(QUEUE_FILE, JSON.stringify(queue, null, 2) + '\n');
note(`${added} queued this poll. Queue depth ${queue.items.length}.`);

/**
 * Tell the workflow whether a commit is warranted.
 *
 * This runs hourly. Committing every run would be 24 commits a day, and every
 * commit to main triggers a Cloudflare Pages build - roughly 720 a month
 * against a free tier of 500. The site would stop deploying inside three weeks
 * because a watcher was taking notes.
 *
 * So: commit only when the queue actually changed, which is rare.
 */
if (process.env.GITHUB_OUTPUT) {
  await writeFile(process.env.GITHUB_OUTPUT, `queued=${added}\n`, { flag: 'a' });
}
await flush();

async function flush() {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  await writeFile(process.env.GITHUB_STEP_SUMMARY,
    ['## Poll', '', '```', ...summary, '```'].join('\n') + '\n', { flag: 'a' });
}
