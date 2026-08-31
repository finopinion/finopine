#!/usr/bin/env node
/**
 * Flags finance vocabulary used without explanation, and sentences long enough
 * to lose a reader who is not already following.
 *
 * ADVISORY, not blocking. Same reasoning as the moderation prefilter: a regex
 * cannot tell "the trimmed mean, which strips out the biggest price moves in
 * both directions" from a bare mention, and a checker that blocks on context
 * it cannot see will push writers toward vagueness rather than clarity.
 *
 * What it does instead: tells you which terms appear before any nearby
 * explanation, so you can decide.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Terms a reader outside finance will not know cold. Not banned - just terms
// that need a few words of explanation the first time they appear.
const JARGON = [
  'trimmed mean', 'weighted median', 'cash rate', 'basis points', 'CPI',
  'headline inflation', 'underlying inflation', 'seasonal adjustment',
  'monetary policy', 'quantitative', 'yield curve', 'duration',
  'AFSL', 'ASIC', 'APRA', 'AUSTRAC', 'ATO', 'RBA', 'ABS', 'SEBI', 'FCA', 'SEC',
  'designation', 'designated', 'enforceable undertaking', 'no-action',
  'total super balance', 'TSB', 'indexation', 'indexed', 'concession',
  'grandfathering', 'SMSF', 'defined benefit', 'transfer balance cap',
  'custody', 'custodian', 'tokenised', 'stablecoin', 'BNPL',
  'prudential', 'perimeter', 'consensus', 'the print', 'guidance'
];

// A term counts as explained if any of these appear within 120 chars after it
const EXPLAINERS = /\b(which|that is|meaning|means|in other words|i\.e\.|called|known as|is the|are the|is a|are a|— the|- the|\(the|works by|that tracks|that measures)\b/i;

async function walk(dir) {
  let out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = await walk('src/content/opinion');
let totalFlags = 0;

for (const f of files) {
  const raw = await readFile(f, 'utf8');
  const fmEnd = raw.indexOf('\n---', 4);
  const fm = raw.slice(0, fmEnd);
  const body = raw.slice(fmEnd);
  if (/^draft:\s*true/m.test(fm)) continue;

  const title = (fm.match(/^title:\s*"(.+?)"/m) || [])[1] || f;
  const hasPlainly = /^\s*plainly:/m.test(fm);

  const flags = [];
  for (const term of JARGON) {
    const i = body.search(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'));
    if (i === -1) continue;
    /**
     * Look BEHIND the term as well as ahead of it. An explanation often comes
     * first — "something called seasonal adjustment" — and an appositive
     * ("the Financial Conduct Authority, the FCA,") explains by restating.
     * Checking only forwards produced four false positives out of eight.
     */
    const ahead  = body.slice(i, i + 200);
    const behind = body.slice(Math.max(0, i - 160), i);
    const appositive = new RegExp(`[a-z)], (the )?${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(body);
    if (!EXPLAINERS.test(ahead) && !EXPLAINERS.test(behind) && !appositive) flags.push(term);
  }

  // sentences over 35 words
  const long = (body.match(/[^.!?\n]+[.!?]/g) || [])
    .map(s => s.trim())
    .filter(s => s.split(/\s+/).length > 35);

  console.log(`\n${title}`);
  console.log(`  plainly field: ${hasPlainly ? 'present' : 'MISSING'}`);
  if (flags.length) {
    console.log(`  unexplained on first use (${flags.length}): ${flags.join(', ')}`);
    totalFlags += flags.length;
  } else {
    console.log('  no unexplained jargon found');
  }
  if (long.length) {
    console.log(`  sentences over 35 words: ${long.length}`);
    for (const s of long.slice(0, 2)) console.log(`    "${s.slice(0, 90)}..."`);
  }
}

console.log(`\n${totalFlags} terms flagged across ${files.length} files.`);
console.log('Advisory only. A flag means "explain it or cut it", not "this is wrong".');
