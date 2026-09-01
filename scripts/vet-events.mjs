#!/usr/bin/env node
/**
 * STAGE 2 OF 3 - VET. Claude Haiku 4.5.
 *
 * Reads events-queue.json and decides which single item, if any, is worth an
 * opinion piece today. Runs maybe a few hundred times a year, so the cost is
 * cents. Writes its choice to events-selected.json and nothing else.
 *
 * WHY A SECOND JUDGEMENT AT ALL. The poller optimises for recall - it flags
 * anything that might matter, because a missed event cannot be recovered. This
 * stage optimises for precision, and it has a different question to answer:
 * not "is this new" but "is there an ARGUMENT here". Plenty of material events
 * support no opinion worth reading.
 *
 * Exits 0 with no selection when nothing qualifies. Publishing nothing is a
 * valid outcome and a better one than padding.
 */
import { readFile, writeFile } from 'node:fs/promises';

const KEY = process.env.ANTHROPIC_API_KEY;
const summary = [];
const note = (s) => { console.log(s); summary.push(s); };

if (!KEY) { console.error('ANTHROPIC_API_KEY not set.'); process.exit(1); }

let queue;
try { queue = JSON.parse(await readFile('events-queue.json', 'utf8')); }
catch { note('No queue file. Nothing to vet.'); await flush(); process.exit(0); }

const fresh = (queue.items || []).filter(q => Date.now() - new Date(q.queuedAt).getTime() < 4 * 86400000);
if (!fresh.length) { note('Queue empty. Nothing to vet.'); await flush(); process.exit(0); }

const models = JSON.parse(await readFile('models.json', 'utf8'));

/**
 * Pull the real page for each queued item before judging it.
 *
 * The first live run declined its only candidate because an RSS summary for a
 * central bank speech is two lines of boilerplate. That was the right call on
 * the evidence available, and the fix is to improve the evidence rather than
 * lower the bar.
 */
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
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<nav[\s\S]*?<\/nav>|<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ').trim();
    return text.length > 400 ? text.slice(0, 2600) : null;
  } catch { return null; }
  finally { clearTimeout(t); }
}

{
  const texts = await Promise.all(fresh.map((c) => fetchText(c.link)));
  let n = 0;
  texts.forEach((t, i) => { if (t) { fresh[i].fullText = t; n++; } });
  note(`Fetched full text for ${n} of ${fresh.length} queued items`);
}

const prompt = `You select which financial news item, if any, deserves an opinion piece today.

FinOpine publishes arguments about monetary policy, tax law, financial regulation, market
structure and payments. Every piece must state a position and name what would prove it wrong.

${fresh.map((c, i) => `[${i}] ${c.publisher} (${c.jurisdiction}) - ${c.title}
    queued because: ${c.why}
    ${c.fullText ? c.fullText : c.summary.slice(0, 300) + '\n    (summary only - full page unavailable)'}`).join('\n\n')}

Pick the item that supports the strongest ARGUABLE position. That is a different test from
"most important". A large event everyone agrees about supports no argument. A smaller one
where the obvious reading is wrong supports a good one.

REJECT anything where you would have to speculate to fill 600 words, where the only
available position is "this is bad" or "this is good", or where the item reports a fact
without enough context to argue about its meaning.

Returning nothing is a valid and often correct answer. Do not stretch.

Return ONLY this JSON, no fences:
{"selected": <index or null>, "reason": "under 25 words", "angle": "one sentence naming the arguable position", "confidence": 0.0}`;

let out = null, served = null;
for (const model of models.vet.ladder) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({ model, max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
      });
    } catch (e) { note(`  vet ${model}: ${e.message}`); continue; }

    if (!res.ok) {
      const retryable = [429, 500, 502, 503, 529].includes(res.status);
      note(`  vet ${model} attempt ${attempt}: HTTP ${res.status}${retryable ? ', retrying' : ', next model'}`);
      if (!retryable) break;
      await new Promise(r => setTimeout(r, attempt * 2000));
      continue;
    }
    const data = await res.json();
    note(`  vet ${model}: stop=${data.stop_reason} in=${data.usage?.input_tokens} out=${data.usage?.output_tokens}`);
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    try { out = JSON.parse(text.replace(/```json|```/g, '').trim()); served = model; } catch { note('  unparseable'); }
    break;
  }
  if (out) break;
}

if (!out) { note('Vetting failed. Nothing selected.'); await flush(); process.exit(1); }

if (out.selected === null || out.selected === undefined || !fresh[out.selected]) {
  note(`Nothing selected. ${out.reason || ''}`);
  await writeFile('events-selected.json', JSON.stringify({ selected: null, reason: out.reason }, null, 2) + '\n');
  await flush();
  process.exit(0);
}

const chosen = fresh[out.selected];
await writeFile('events-selected.json', JSON.stringify({
  selected: chosen, reason: out.reason, angle: out.angle,
  confidence: out.confidence, vettedBy: served, vettedAt: new Date().toISOString()
}, null, 2) + '\n');

note(`SELECTED [${chosen.jurisdiction}] ${chosen.title}`);
note(`  why: ${out.reason}`);
note(`  angle: ${out.angle}`);
await flush();

async function flush() {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  await writeFile(process.env.GITHUB_STEP_SUMMARY,
    ['## Vet', '', '```', ...summary, '```'].join('\n') + '\n', { flag: 'a' });
}
