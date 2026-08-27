#!/usr/bin/env node
/**
 * Evaluates the moderation policy.
 *
 * The deterministic layer is ADVISORY - it cannot block, so it cannot fail this
 * suite. What the offline run measures instead is NOISE: how often the
 * compose-time hint fires on something perfectly legitimate. A hint that cries
 * wolf gets ignored by writers, which makes it worse than no hint at all.
 *
 * The real evaluation needs --ai, because every actual decision is the model's.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { signals, buildPrompt, UNAVAILABLE_POLICY } from '../src/data/moderation.mjs';

const useAI = process.argv.includes('--ai');
const { cases } = JSON.parse(await readFile('moderation-cases.json', 'utf8'));
const mustPass  = cases.filter(c => c.expect === 'publish');
const mustBlock = cases.filter(c => c.expect === 'decline');
const contextual = cases.filter(c => c.context);

console.log(`${cases.length} cases: ${mustPass.length} must publish, ${mustBlock.length} must block.`);
console.log(`${contextual.length} of them turn on context a regex cannot see.\n`);

console.log('DETERMINISTIC LAYER (advisory - blocks nothing)');
const noisy = mustPass.filter(c => signals(c.text).length);
const flagged = mustBlock.filter(c => signals(c.text).length);
console.log(`  fires on legitimate content : ${noisy.length} of ${mustPass.length}  (hint noise)`);
console.log(`  fires on real violations     : ${flagged.length} of ${mustBlock.length}`);
if (noisy.length) {
  console.log('  noisy on:');
  for (const c of noisy) console.log(`    ${c.id} -> ${signals(c.text).map(s => s.id).join(', ')}`);
}
const rate = mustPass.length ? noisy.length / mustPass.length : 0;
console.log(`\n  noise rate ${(rate * 100).toFixed(0)}%. Under the old design every one of these`);
console.log('  was a rejection. Now they are a hint the writer can dismiss.');
if (rate > 0.5) console.log('  WARNING: over half of legitimate content trips a hint. Writers will tune it out.');

console.log(`\n  If the model is unavailable: ${UNAVAILABLE_POLICY.action}`);
console.log(`  publish unreviewed: ${UNAVAILABLE_POLICY.publishUnreviewed} | fall back to regex: ${UNAVAILABLE_POLICY.fallBackToRegex}`);

if (!useAI) {
  console.log('\nNo pass/fail offline - the layer that decides is the model.');
  console.log('Run with --ai and GEMINI_API_KEY for the real evaluation.');
  process.exit(0);
}

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('\n--ai needs GEMINI_API_KEY.'); process.exit(1); }
const { ladder } = JSON.parse(await readFile('models.json', 'utf8'));

async function judge(c) {
  const prompt = buildPrompt('comment', c.jurisdiction, { body: c.text });
  for (const model of ladder) {
    let res;
    try {
      res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`,
        { method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0, maxOutputTokens: 16000, responseMimeType: 'application/json' } }) });
    } catch { continue; }
    if (!res.ok) continue;
    const data = await res.json();
    const cand = data.candidates?.[0];
    const text = cand?.content?.parts?.map(p => p.text).join('') ?? '';
    if (!text.trim()) { console.log(`    (${model} empty, finishReason=${cand?.finishReason})`); continue; }
    try { return { ...JSON.parse(text.replace(/```json|```/g, '').trim()), model }; } catch { continue; }
  }
  return null;
}

console.log('\nMODEL LAYER');
let falseBlock = 0, ctxFail = 0, missed = 0, errors = 0;
for (const c of cases) {
  const r = await judge(c);
  if (!r) { errors++; console.log(`  ERROR       ${c.id}`); continue; }
  const blocked = r.verdict === 'decline';
  if (blocked && c.expect === 'publish') {
    falseBlock++; if (c.context) ctxFail++;
    console.log(`  FALSE BLOCK ${c.id}${c.context ? '  [context case]' : ''}`);
    console.log(`              ${r.notes}`);
  } else if (!blocked && c.expect === 'decline') {
    missed++; console.log(`  MISSED      ${c.id}  expected ${c.rule}`);
  }
  await new Promise(r2 => setTimeout(r2, 250));
}
console.log(`\n  false blocks on legitimate content : ${falseBlock}   <- the number that matters`);
console.log(`    of which context cases            : ${ctxFail} of ${contextual.length}`);
console.log(`  missed violations                  : ${missed}`);
console.log(`  no response                        : ${errors}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  await writeFile(process.env.GITHUB_STEP_SUMMARY,
    `## Moderation eval\n\n- false blocks: **${falseBlock}** (context cases: ${ctxFail}/${contextual.length})\n- missed: ${missed}\n- errors: ${errors}\n`,
    { flag: 'a' });
}
process.exit(falseBlock > 0 ? 1 : 0);
