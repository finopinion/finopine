#!/usr/bin/env node
/**
 * Generates one opinion piece, grounded in a real feed item.
 *
 * THE FLOW IS INVERTED ON PURPOSE. The model never types a URL, a publisher
 * name or a date, so there is nothing left for it to invent:
 *
 *   1. Pull items from verified feeds only
 *   2. Widen the date window until there are enough candidates
 *   3. Hand the model ~12 real records with their real summaries
 *   4. Ask it to pick ONE BY INDEX and write using only that record
 *   5. Abort if the output contains a URL or a DOI
 *   6. Build the citation from the feed's own metadata
 *
 * Playbook lessons baked in:
 *   - Thinking tokens draw on maxOutputTokens. Budget 16k+, never 4k.
 *   - Always log finishReason and usageMetadata. An empty candidate with
 *     finishReason MAX_TOKENS surfaces downstream as "invalid JSON" and sends
 *     you chasing the wrong bug.
 *   - Walk a model ladder newest to oldest. Free tiers 503 on whatever just
 *     launched. Retry only 429/500/502/503/504 and timeouts — a 400 or 404
 *     will never fix itself.
 *   - Write the decisive facts to $GITHUB_STEP_SUMMARY. Actions logs need auth
 *     to read remotely; the summary page does not, and it reads fine on a phone.
 *
 * THE HOUSE FORMAT LIVES IN THE PROMPT BELOW, as a worked example.
 *
 * The fuller written version is kept privately, outside this repository,
 * deliberately: the format is the thing that distinguishes this site, and a
 * public style guide is a copyable one. The worked example here is enough for
 * the generator to reproduce the shape without spelling out the reasoning.
 *
 * VERIFY THE MODEL IDS IN models.json AGAINST CURRENT PROVIDER DOCS BEFORE THE
 * FIRST RUN. Whatever generation your assistant's training data knows is
 * probably a generation behind.
 */

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const OUT_DIR = 'src/content/opinion';
const WINDOWS = [7, 30, 90, 240];      // days, widened progressively
const MIN_CANDIDATES = 6;
const MAX_CANDIDATES = 12;
const MAX_OUTPUT_TOKENS = 16000;       // thinking + writing share this budget
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

const KEY = process.env.ANTHROPIC_API_KEY;
if (!KEY) {
  console.error('ANTHROPIC_API_KEY is not set. Nothing generated.');
  process.exit(1);
}
const RETRY_STATUS = new Set([429, 500, 502, 503, 529]);

const summary = [];
const note = (s) => { console.log(s); summary.push(s); };

/* ------------------------------------------------------------------ feeds */

const registry = JSON.parse(await readFile('feeds.json', 'utf8'));
const usable = registry.feeds.filter((f) => f.verified && f.jurisdiction !== 'skip' && f.jurisdiction !== 'general');

/**
 * The general silo is deliberately out of reach.
 *
 * A cross-border piece must compare two or more jurisdictions - the schema
 * enforces it. This generator grounds each piece in exactly one feed item, so
 * it cannot produce a comparison, only a single-country piece wearing a
 * cross-border label. Feeds tagged 'skip' or 'general' are excluded above
 * rather than being allowed through to fail at the schema.
 */

if (!usable.length) {
  console.error('No verified feeds. Run `npm run check:feeds` first.');
  console.error('The generator will not cite a source it has not confirmed exists.');
  process.exit(1);
}
note(`Verified feeds: ${usable.length} of ${registry.feeds.length}`);
{
  const reach = [...new Set(usable.map((f) => f.jurisdiction))].sort();
  const all = ['au', 'nz', 'uk', 'ca', 'us', 'in'];
  const dark = all.filter((j) => !reach.includes(j));
  note(`Silos reachable: ${reach.join(', ') || 'none'}`);
  if (dark.length) note(`Silos with no working feed: ${dark.join(', ')}`);
}

function stripTags(s) {
  return String(s || '').replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

function parseFeed(xml, feed) {
  const blocks = xml.split(/<item[\s>]|<entry[\s>]/i).slice(1);
  return blocks.map((b) => {
    const pick = (tag) => {
      const m = b.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
      return m ? stripTags(m[1]) : '';
    };
    let link = pick('link');
    if (!link) {
      const m = b.match(/<link[^>]*href=["']([^"']+)["']/i);
      link = m ? m[1] : '';
    }
    const dateStr = pick('pubDate') || pick('updated') || pick('published') || pick('dc:date');
    return {
      title: pick('title'),
      link,
      summary: (pick('description') || pick('summary') || pick('content')).slice(0, 700),
      date: dateStr ? new Date(dateStr) : null,
      publisher: feed.publisher,
      feedId: feed.id,
      jurisdiction: feed.jurisdiction ?? 'au',
      weight: feed.weight ?? 1
    };
  }).filter((i) => i.title && i.link);
}

const all = [];
for (const f of usable) {
  try {
    const res = await fetch(f.url, { headers: { 'user-agent': 'FinOpine/1.0' }, redirect: 'follow' });
    if (res.status !== 200) { note(`  ${f.id}: HTTP ${res.status}, skipped`); continue; }
    const items = parseFeed(await res.text(), f);
    all.push(...items);
    note(`  ${f.id}: ${items.length} items`);
  } catch (e) {
    note(`  ${f.id}: ${e.message}, skipped`);
  }
}

/* ---------------------------------------------------- candidate selection */

/**
 * Reject sources that are not stable documents.
 *
 * The first run grounded a piece on an ABC "as it happened" live blog. Those
 * rewrite themselves through the day and become an archive stub afterwards, so
 * a citation to one supports whatever the page happens to say later. An opinion
 * piece needs a document that stays put.
 */
const UNSTABLE = [
  /as-it-happened/i, /live-updates/i, /\blive-blog\b/i, /\/live\//i,
  /markets-business-news-live/i, /rolling-coverage/i, /minute-by-minute/i
];
function isStable(item) {
  const hay = `${item.link} ${item.title}`;
  if (UNSTABLE.some((re) => re.test(hay))) return false;
  if (/^(live|blog):/i.test(item.title)) return false;
  return true;
}

const seen = new Set(await walkDir(OUT_DIR));

async function walkDir(dir) {
  let out = [];
  const { readdir: rd } = await import('node:fs/promises');
  let entries;
  try { entries = await rd(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.isDirectory()) out = out.concat(await walkDir(join(dir, e.name)));
    else out.push(join(dir, e.name));
  }
  return out;
}
const alreadyCovered = new Set();
for (const file of seen) {
  if (!file.endsWith('.md')) continue;
  const t = await readFile(file, 'utf8');
  const m = t.match(/^groundedIn:\s*["']?(.+?)["']?\s*$/m);
  if (m) alreadyCovered.add(m[1].trim());
}

let candidates = [];
let usedWindow = null;
for (const days of WINDOWS) {
  const cutoff = Date.now() - days * 86400000;
  candidates = all
    .filter((i) => !i.date || i.date.getTime() >= cutoff)
    .filter((i) => !alreadyCovered.has(i.link))
    .filter(isStable)
    .sort((a, b) => (b.weight - a.weight) || ((b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)))
    .slice(0, MAX_CANDIDATES);
  usedWindow = days;
  if (candidates.length >= MIN_CANDIDATES) break;
}

/**
 * EVENT MODE.
 *
 * If vet-events.mjs selected something, that item jumps the queue and becomes
 * the subject. The scheduled candidate pool is only used when nothing was
 * flagged - so breaking coverage displaces the daily piece rather than adding
 * to it, and the site never publishes twice in a day because something happened.
 */
let forced = null;
try {
  const sel = JSON.parse(await readFile('events-selected.json', 'utf8'));
  if (sel?.selected?.link) {
    forced = {
      title: sel.selected.title,
      link: sel.selected.link,
      summary: sel.selected.summary,
      date: sel.selected.at ? new Date(sel.selected.at) : new Date(),
      publisher: sel.selected.publisher,
      feedId: 'event',
      jurisdiction: sel.selected.jurisdiction || 'au',
      weight: 5
    };
    note(`EVENT MODE: ${sel.selected.title}`);
    note(`  vetted by ${sel.vettedBy}, confidence ${sel.confidence}`);
    if (sel.angle) note(`  angle: ${sel.angle}`);
    candidates = [forced, ...candidates.filter((c) => c.link !== forced.link)].slice(0, MAX_CANDIDATES);
  }
} catch { /* no selection - scheduled mode */ }

if (!candidates.length) {
  note('No uncovered items in any window. Nothing to write — exiting clean.');
  await flushSummary();
  process.exit(0);
}
note(`Candidates: ${candidates.length} (window ${usedWindow}d, ${alreadyCovered.size} already covered)`);

/**
 * FETCH THE ACTUAL PAGE, not just the feed blurb.
 *
 * The vetting stage declined its first real candidate with a fair objection:
 * "Speech text unavailable; cannot assess whether the shift is genuinely
 * demand-driven or merely relabeled supply management without examining actual
 * operational details." It was right. An RSS summary for a central bank speech
 * is two lines of boilerplate, and no model can build an argument on that -
 * it can only pad.
 *
 * So pull the real text for the strongest few candidates. Truncated, tags
 * stripped, short timeout, failures ignored. A candidate whose page will not
 * load falls back to its summary rather than dropping out.
 */
const DEEP = 6;
const DEEP_CHARS = 2600;

async function fetchText(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 12000);
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'FinOpine/1.0 (+https://finopine.com)' },
      signal: ctl.signal, redirect: 'follow'
    });
    if (res.status !== 200) return null;
    const html = await res.text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>|<header[\s\S]*?<\/header>|<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#\d+;/g, ' ')
      .replace(/\s+/g, ' ').trim();
    return text.length > 400 ? text.slice(0, DEEP_CHARS) : null;
  } catch { return null; }
  finally { clearTimeout(t); }
}

{
  const top = candidates.slice(0, DEEP);
  const got = await Promise.all(top.map((c) => fetchText(c.link)));
  let n = 0;
  got.forEach((text, i) => { if (text) { top[i].fullText = text; n++; } });
  note(`Fetched full text for ${n} of ${top.length} leading candidates`);
}

/* --------------------------------------------------------------- the model */

const models = JSON.parse(await readFile('models.json', 'utf8'));

const prompt = `You write for FinOpine, which publishes opinion about monetary policy, tax law,
financial regulation and market structure. Not stock tips. Not advice.

Below are ${candidates.length} REAL items retrieved from official and press feeds moments ago.

${candidates.map((c, i) => `[${i}] ${c.publisher} — ${c.title}
    ${c.date ? c.date.toISOString().slice(0, 10) : 'undated'}
    ${c.summary}`).join('\n\n')}

${forced ? `WRITE ABOUT ITEM [0]. It has already been selected as today's subject by an
earlier editorial stage. The other items are context only - you may reference them if
they bear on the argument, but the piece is about [0].` : 'Pick the ONE item that supports the strongest argument and write an opinion piece about it.'}

BEFORE YOU PICK, DISCARD:
- Anything that is a market wrap, a live blog, or a round-up of several stories.
  You need one decision, one document or one policy change to argue about.
- Anything where the item gives you a fact but no mechanism. If you cannot
  explain WHY the thing happened or WHAT it changes, you will pad instead.
- Anything you would have to speculate about to fill 600 words.

If none of the items clears that bar, pick the closest and write SHORTER rather
than padding. A tight 400 words beats a padded 800.

WORKED EXAMPLE — this is the house format. Match its shape, not its subject.

  plainly:     "Money saved for retirement in superannuation is taxed lightly,
                to encourage people to save. From July 2026 that discount
                shrinks for anyone holding more than three million dollars. The
                government promised the three million dollar line would rise
                with the cost of living, so ordinary savers would not slowly be
                caught by a threshold set today."
                -> starts from zero. Explains what superannuation IS before
                   mentioning the tax. Assumes no prior knowledge whatsoever.

  viewInBrief: "The line does rise, but only in jumps of $150,000, which takes
                about two years to earn. In between it sits completely still
                while savings keep growing towards it. That is not what most
                people heard when they were told it was indexed."
                -> two sentences, plain words, and the reader now knows the
                   argument without reading a word of the piece.

  body opens:  "The three million dollar line moves in jumps of a hundred and
                fifty thousand. That is five per cent. At inflation inside the
                target band, five per cent takes roughly two years to
                accumulate — and until it does, the line does not move at all
                while balances keep compounding towards it."
                -> the surprising arithmetic, first sentence. NOT "The Treasury
                   Laws Amendment Act 2026 received royal assent on 13 March."
                   The dates go in paragraph two, as context.

  subheads:    "The word carrying the weight" / "Why this matters more than it
                sounds" / "The case against this argument" / "What would settle
                it" -> plain phrases, not section labels like "Background".

  callToAction:"Treasury should publish, each year, how far the line has moved
                and how many people the tax now reaches..."
                -> names WHO should do WHAT. Not "this deserves scrutiny".

  Length 791 words. Every acronym spelled out on first use. Every technical
  term explained in the same sentence it appears.

HOW AN OPINION PIECE IS BUILT (follow this shape):

1. OPEN WITH A HOOK. First sentence earns the second. A short sharp statement,
   a surprising fact, or a concrete detail. Never open with a date and a
   procedural summary - "On 11 August the Board met and decided..." is a report,
   not an opinion piece.
2. THEN THE CONTEXT. What is this adding to the debate, and why now.
3. THEN THE ARGUMENT, most important point first, because most readers stop
   partway. Link paragraphs so each leads into the next.
4. STEELMAN THE OTHER SIDE, then answer it.
5. CLOSE WITH WHAT SHOULD BE DONE, and by whom. This is the point of the piece.

LENGTH: 800-900 words. Not 1,200. If you cannot make the case in 900 words you
have not found the argument yet.

BE FIRM. This is an opinion. Not every sentence needs hedging, and a piece that
qualifies everything persuades nobody. Go out on a limb - you will state
separately what would change your mind, which is what earns you the right to be
blunt in the body.

HARD RULES
- Write using ONLY what is in the item you picked. If a fact is not there, do not assert it.
- PREFER an item whose full text you were given over one you only have a summary for.
  You cannot argue about the detail of something you have only seen the headline of,
  and a piece written from a two-line blurb will be padding.
- Never write a URL, a DOI, a journal name or a citation. They are added mechanically.
- Never recommend buying, selling or holding anything. Argue about whether a policy,
  rule or decision is well made.
- Never address the reader's own money or circumstances.
- Take a real position and give the strongest version of the opposing case before
  answering it.
- Do not treat a reporter's characterisation as a fact. If the item says a
  central bank did something "quietly", that is the journalist's word. You may
  argue about the underlying action; you may not assume concealment was proven.
- Do not repeat the same figure or phrase in every section. If you find yourself
  restating the headline number a fourth time, you have run out of argument.
- The falsifier must name something OBSERVABLE - a decision, a number, a
  publication, a date. "If evidence emerges that..." is not observable and will
  be rejected.

Return ONLY this JSON, no fences, no preamble:
{
  "index": <the number of the item you picked>,
  "kicker": "one or two words, e.g. Monetary policy. HARD MAXIMUM 24 characters.",
  "title": "40-90 characters. States the argument, not the topic. HARD MAXIMUM 90.",
  "dek": "one or two sentences. HARD MAXIMUM 240 characters.",
  "position": "TWO paragraphs separated by a blank line. First: what you claim. Second: why it matters and what follows from it. At least 400 characters total.",
  "falsifier": "TWO paragraphs separated by a blank line. First: the specific observable thing that would show you wrong. Second: what follows if it happens. At least 300 characters total.",
  "body": "800-900 words of markdown. Use ## subheads. Open with a hook, not a date. No links.",
  "callToAction": "One or two paragraphs, at least 80 chars, saying what should be DONE and by whom. This closes the piece.",
  "plainly": "THREE to four sentences of background for a reader who does not follow finance. What is the thing, why does it exist, what changed. No jargon, no acronyms, no argument. Assume they have never heard of the institution involved. BETWEEN 120 AND 500 CHARACTERS - count them, this is a hard ceiling and a long answer is rejected outright.",
  "viewInBrief": "TWO sentences at most, plain words, saying what you think and roughly why. If a reader stops after this line they should still know your view. Not the full argument. BETWEEN 60 AND 280 CHARACTERS - hard ceiling.",
  "supports": "About the SOURCE, not your argument. One sentence naming what the item you picked establishes - the specific facts you took from it. At least 20 characters. Do not skip this field.",
  "tags": ["two or three lowercase tags"]
}`;

async function callModel(model) {
  return fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 8000,
      // No temperature. It is deprecated on the Claude 5 series and returns
      // HTTP 400 - which the ladder correctly treats as non-retryable, so
      // every model is skipped and the run fails with nothing written.
      messages: [{ role: 'user', content: prompt }]
    })
  });
}

let raw = null, servedBy = null;

outer:
for (const model of models.write.ladder) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    let res;
    try {
      res = await callModel(model);
    } catch (e) {
      note(`  ${model} attempt ${attempt}: network ${e.message}`);
      await new Promise((r) => setTimeout(r, attempt * 2000));
      continue;
    }

    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json())?.error?.message?.slice(0, 120) ?? ''; } catch { /* body not json */ }
      if (RETRY_STATUS.has(res.status)) {
        note(`  ${model} attempt ${attempt}: HTTP ${res.status} ${detail}, retrying`);
        await new Promise((r) => setTimeout(r, attempt * 2500));
        continue;
      }
      // 400 / 401 / 404 never fix themselves
      note(`  ${model}: HTTP ${res.status} ${detail}, not retryable, next model`);
      continue outer;
    }

    const data = await res.json();

    // THE DIAGNOSTIC THAT SAVES AN HOUR. stop_reason 'max_tokens' means the
    // response was cut mid-JSON, which surfaces downstream as a parse error
    // and sends you chasing the wrong bug.
    note(`  ${model}: stop=${data.stop_reason} in=${data.usage?.input_tokens} ` +
         `out=${data.usage?.output_tokens} cache_read=${data.usage?.cache_read_input_tokens ?? 0}`);

    if (data.stop_reason === 'max_tokens') {
      note('  Response truncated. Raise max_tokens rather than debugging the JSON.');
    }

    const text = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    if (!text.trim()) { note(`  ${model}: empty response`); continue; }
    raw = text; servedBy = model;
    break outer;
  }
}

if (!raw) {
  note('Every model in the ladder failed. Nothing written.');
  await flushSummary();
  process.exit(1);
}
note(`Served by: ${servedBy}`);

/* ------------------------------------------------------------- validation */

let out;
try {
  out = JSON.parse(raw.replace(/```json|```/g, '').trim());
} catch (e) {
  note('Model output did not parse as JSON. Raw output follows.');
  summary.push('```\n' + raw.slice(0, 1500) + '\n```');
  await flushSummary();
  process.exit(1);
}

const item = candidates[out.index];
if (!item) {
  note(`Model picked index ${out.index}, which is not in range 0..${candidates.length - 1}.`);
  await flushSummary();
  process.exit(1);
}

// A stray link means the model invented something. Abort the run.
if (/https?:\/\/|www\.|doi:\s*10\./i.test(out.body)) {
  note('Generated body contains a URL or DOI. Aborting — this is the fabrication path.');
  await flushSummary();
  process.exit(1);
}

for (const [field, min] of [['position', 400], ['falsifier', 300], ['title', 10], ['dek', 20], ['plainly', 120], ['viewInBrief', 60], ['callToAction', 80]]) {
  if (!out[field] || String(out[field]).length < min) {
    note(`Field "${field}" missing or too short. The schema would reject this at build.`);
    await flushSummary();
    process.exit(1);
  }
}

/* ------------------------------------------------------------------ write */

/**
 * supports is REQUIRED by the schema but must not fail the run.
 *
 * An earlier version validated it as a hard gate, which threw away a complete,
 * well-written piece over one field the model had simply not returned - after
 * paying for 5,875 output tokens. The fallback below already existed; the gate
 * sat in front of it and made it unreachable.
 *
 * Deriving it here is honest rather than laundering. The whole architecture is
 * retrieval-first: this piece is grounded in an item the script fetched and
 * read seconds earlier, so what the source establishes is a fact the script
 * knows independently of the model.
 */
/**
 * CLAMP FIELDS THAT ARE MERELY TOO LONG.
 *
 * A maximum-length breach is not a quality problem, it is a formatting one, and
 * it should never cost a finished article. Two good pieces were thrown away
 * before this existed - one for a missing field, one for a `plainly` that ran
 * past 500 characters.
 *
 * Minimums are different and are NOT repaired here: you cannot invent an
 * argument the model did not make. Those still fail, and should.
 */
const CEIL = { title: 90, dek: 240, kicker: 24, plainly: 500, viewInBrief: 280 };
for (const [field, max] of Object.entries(CEIL)) {
  const v = String(out[field] ?? '');
  if (v.length <= max) continue;
  // cut at the last sentence end that fits, so it never ends mid-clause
  const cut = v.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  out[field] = (lastStop > max * 0.5 ? cut.slice(0, lastStop + 1) : cut.replace(/\s+\S*$/, '')).trim();
  note(`  ${field} was ${v.length} chars, over the ${max} limit - trimmed to ${out[field].length}.`);
}

if (!out.supports || String(out.supports).trim().length < 20) {
  const derived = (item.fullText || item.summary || '').trim().replace(/\s+/g, ' ').slice(0, 220);
  out.supports = derived.length >= 20
    ? `The ${item.publisher} item this piece argues from. ${derived}`
    : `The ${item.publisher} item this piece argues from: ${item.title}.`;
  note('  supports was missing from the model output - derived from the retrieved source.');
}

const slug = String(out.title).toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);
const today = new Date().toISOString().slice(0, 10);
const silo = item.jurisdiction || 'au';
const siloDir = join(OUT_DIR, silo);
await mkdir(siloDir, { recursive: true });
const file = join(siloDir, `${today}-${slug}.md`);

const yaml = (s) => JSON.stringify(String(s));

const md = `---
jurisdiction: ${yaml(silo)}
title: ${yaml(out.title)}
dek: ${yaml(out.dek)}
kicker: ${yaml(out.kicker || 'Policy')}
author: "FinOpine desk"
date: ${today}
plainly: ${yaml(out.plainly)}
viewInBrief: ${yaml(out.viewInBrief)}
callToAction: |
${String(out.callToAction).split('\n').map((l) => '  ' + l).join('\n')}
position: |
${String(out.position).split('\n').map((l) => '  ' + l).join('\n')}
falsifier: |
${String(out.falsifier).split('\n').map((l) => '  ' + l).join('\n')}
readMins: ${Math.max(2, Math.round(String(out.body).split(/\s+/).length / 220))}
tags: ${JSON.stringify(out.tags || [])}
generated: true
groundedIn: ${yaml(item.link)}
draft: true
sources:
  - label: ${yaml(item.title)}
    publisher: ${yaml(item.publisher)}
    url: ${yaml(item.link)}
    supports: ${yaml(out.supports || item.summary.slice(0, 150))}
    retrievedAt: ${yaml(today)}
    date: ${yaml(item.date ? item.date.toISOString().slice(0, 10) : today)}
    verified: true
---

${out.body}
`;

await writeFile(file, md);
note(`Wrote ${file}`);

// Hand the path to the next job
if (process.env.GITHUB_OUTPUT) {
  await writeFile(process.env.GITHUB_OUTPUT, `file=${file}\n`, { flag: 'a' });
}

// Put the ENTIRE draft in the run summary. The summary needs no login, renders
// on a phone, and is what the approval email links to - so the whole point is
// that the piece can be read and judged without opening a repo.
if (process.env.GITHUB_STEP_SUMMARY) {
  await writeFile(process.env.GITHUB_STEP_SUMMARY, [
    '', '---', '', `# ${out.title}`, '',
    `*${out.dek}*`, '',
    '**Plainly**', '', out.plainly, '',
    '**Position**', '', out.position, '',
    '**Wrong if**', '', out.falsifier, '',
    '**Source**', '',
    `${item.publisher} - ${item.title}`, `<${item.link}>`, '',
    '---', '', out.body, '', '---', '',
    '### To publish', '',
    'Approve the waiting deployment. The draft flag flips and Cloudflare rebuilds.', '',
    '### To change it first', '',
    `Edit \`${file}\` in the web editor, then approve. Or reject, and it stays an unpublished draft.`, ''
  ].join('\n'), { flag: 'a' });
}
note(`Grounded in: ${item.publisher} — ${item.title}`);
note('Written as draft:true. Read it, then flip the flag to publish.');

await flushSummary();

async function flushSummary() {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  const md2 = ['## Article generation', '', '```', ...summary, '```'].join('\n');
  await writeFile(process.env.GITHUB_STEP_SUMMARY, md2 + '\n', { flag: 'a' });
}
