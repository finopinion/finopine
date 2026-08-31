#!/usr/bin/env node
/**
 * Blocks the language drift that turns a finance opinion site into something a
 * regulator reads differently.
 *
 * SILO-AWARE. Three layers run against every piece:
 *
 *   1. GLOBAL  - things no jurisdiction tolerates: guaranteed returns,
 *                "you should buy", price targets, urgency, fabricated cites.
 *   2. LOCAL   - bannedExtra from jurisdictions.ts for that piece's silo.
 *                A phrase harmless in one country is a term of art in another.
 *                "Personal advice" is ordinary English in Britain and a
 *                statutory trigger in Australia.
 *   3. VOCAB   - a piece using another silo's retirement vocabulary was
 *                probably written for, or lifted from, the wrong country.
 *                Cheapest possible guard against the playbook's most
 *                expensive mistake.
 *
 * NOT legal advice, and it does not make anything compliant. Before a silo goes
 * live, have its bannedExtra reviewed by someone who practises there, then set
 * status to 'live' in jurisdictions.ts.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOTS = ['src/content', 'src/pages', 'src/components'];

/* ------------------------------------------------------------------ layer 1 */
const GLOBAL = [
  [/\bguarantee(d|s)?\s+(return|profit|gain|income|yield)/i, 'Outcome guarantee.'],
  [/\brisk[-\s]?free\b/i, 'Nothing offered to a reader is risk-free.'],
  [/\bcannot lose\b|\bno downside\b/i, 'Absolute downside claim.'],
  [/\bwill (definitely|certainly|surely) (rise|fall|double|outperform)/i, 'Certainty about a future price.'],
  [/\byou should (buy|sell|short|invest in|put your money)/i, 'Instruction to the reader. Argue the case; do not issue the order.'],
  [/\b(my|our) (financial|investment) advice\b/i, 'Do not call it advice.'],
  [/\bthis is (financial|investment) advice\b/i, 'Do not call it advice.'],
  [/\btailored to your\b|\bfor your situation\b/i, 'Personal-circumstances framing.'],
  [/\b(price target|PT)\s*(of|:)\s*\$?\d/i, 'Price target.'],
  [/\b(strong )?(buy|sell) rating\b/i, 'Ratings language.'],
  [/\ballocate \d+\s?% of your\b/i, 'Portfolio instruction.'],
  [/\b(act|buy|invest) now before\b/i, 'Urgency.'],
  [/\blast chance\b|\bbefore it is too late\b/i, 'Urgency.'],
  [/\b(the|a) (best|only|number one) (site|source|analysis) (for|on)\b/i, 'Superiority claim.'],
  [/\bPLACEHOLDER\b|\bTODO\b|\bLOREM IPSUM\b|\bFIXME\b/, 'Placeholder marker leaks onto live pages.'],
  [/\bdoi:\s*10\.\d{4,}/i, 'Hard-coded DOI. Citations come from retrieval, never from prose.']
];

/* ---------------------------------------- jurisdictions.ts, parsed as text
   Read rather than imported so this stays dependency-free and runs before
   any npm install.                                                        */
const jsrc = await readFile('src/data/jurisdictions.ts', 'utf8');

function extractSilo(code) {
  const start = jsrc.indexOf(`  ${code}: {`);
  if (start === -1) return null;
  const end = jsrc.indexOf('\n  },', start);
  const block = jsrc.slice(start, end === -1 ? undefined : end);

  const arr = (key) => {
    const m = block.match(new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`));
    if (!m) return [];
    return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => x[1]);
  };
  /**
   * Read banned patterns ONLY from bannedExtra.
   *
   * An earlier version scanned the whole jurisdiction block for any
   * ['x', 'y'] pair, which swept up
   *   conduct: ['Financial Conduct Authority', 'Prudential Regulation Authority']
   * and turned the UK's own regulator into a banned term — a UK piece could not
   * mention the FCA without failing the build. Scope the match to the one key
   * that actually holds patterns.
   */
  const bannedBlock = (() => {
    const i = block.indexOf('bannedExtra:');
    if (i === -1) return '';
    const open = block.indexOf('[', i);
    let depth = 0;
    for (let k = open; k < block.length; k++) {
      if (block[k] === '[') depth++;
      else if (block[k] === ']') { depth--; if (depth === 0) return block.slice(open, k + 1); }
    }
    return '';
  })();

  const banned = [...bannedBlock.matchAll(/\[\s*'((?:[^'\\]|\\.)*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*\]/g)]
    .map((m) => [m[1].replace(/\\\\/g, '\\'), m[2]]);

  return {
    code,
    status: (block.match(/status:\s*'(\w+)'/) || [])[1] ?? 'planned',
    foreignTerms: arr('foreignTerms'),
    banned
  };
}

const CODES = ['au', 'nz', 'uk', 'ca', 'us', 'in', 'general'];
const SILOS = Object.fromEntries(
  CODES.map((c) => [c, extractSilo(c)]).filter(([, v]) => v)
);

/* --------------------------------------------------------------- traversal */
async function walk(dir) {
  let out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (['.md', '.mdx', '.astro'].includes(extname(e.name))) out.push(p);
  }
  return out;
}

const files = (await Promise.all(ROOTS.map(walk))).flat();
const problems = [];
const warnings = [];

for (const f of files) {
  const text = await readFile(f, 'utf8');
  const lines = text.split('\n');

  // Inline override. This check BLOCKS, unlike the reader-content moderator,
  // which is only defensible because an author sees the exact line and reason.
  // Quoting a price target to mock it is legitimate, so give them the escape:
  //   <!-- finopine-allow: price-target quoting the sell side -->
  // on the line before, or at the end of the offending line. A reason is
  // required, so the suppression is self-documenting in the diff.
  const allowed = new Set();
  lines.forEach((line, i) => {
    const m = line.match(/finopine-allow:\s*([a-z-]+)\s+(.+?)\s*(?:-->|\*\/|$)/i);
    if (m && m[2].trim().length > 3) { allowed.add(i); allowed.add(i + 1); }
  });
  const isPiece = f.includes('src/content/opinion/');

  const jm = text.match(/^jurisdiction:\s*["']?(\w+)["']?/m);
  const code = jm ? jm[1] : null;
  const silo = code ? SILOS[code] : null;

  /* --- every piece must declare a silo ---------------------------------- */
  if (isPiece && !code) {
    problems.push({ f, n: 1, why: 'No jurisdiction declared. Every piece belongs to exactly one silo.', line: '' });
  }

  /* --- folder must match the declared silo ------------------------------ */
  if (isPiece && code) {
    const folder = f.split('src/content/opinion/')[1].split('/')[0];
    if (folder !== code) {
      problems.push({ f, n: 1,
        why: `Declares jurisdiction "${code}" but sits in the "${folder}" folder. One of them is wrong.`,
        line: `jurisdiction: ${code}` });
    }
  }

  /* --- pieces filed into a silo that is not live yet -------------------- */
  if (isPiece && silo && silo.status === 'planned') {
    warnings.push({ f, n: 1,
      why: `Silo "${code}" is marked planned in jurisdictions.ts, so this will not render.`, line: '' });
  }

  const local = silo
    ? silo.banned.map(([src, why]) => [new RegExp(src, 'i'), `[${code}] ${why}`])
    : [];

  lines.forEach((line, i) => {
    for (const [re, why] of [...GLOBAL, ...local]) {
      if (re.test(line)) problems.push({ f, n: i + 1, why, line: line.trim().slice(0, 100) });
    }

    /* --- wrong-silo vocabulary ------------------------------------------ */
    if (silo && silo.foreignTerms.length && !line.startsWith('compares:')) {
      for (const term of silo.foreignTerms) {
        const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (re.test(line)) {
          warnings.push({ f, n: i + 1,
            why: `"${term}" is another country's vocabulary in the ${code.toUpperCase()} silo. Check this was not written for the wrong jurisdiction.`,
            line: line.trim().slice(0, 100) });
        }
      }
    }
  });
}

/* ------------------------------------------------------------------ report */
console.log(`Scanned ${files.length} files across ${Object.keys(SILOS).length} silos.\n`);

for (const w of warnings) {
  console.log(`  WARN  ${w.f}:${w.n}`);
  console.log(`        ${w.why}`);
  if (w.line) console.log(`        > ${w.line}`);
  console.log('');
}
for (const p of problems) {
  console.log(`  FAIL  ${p.f}:${p.n}`);
  console.log(`        ${p.why}`);
  if (p.line) console.log(`        > ${p.line}`);
  console.log('');
}

if (process.env.GITHUB_STEP_SUMMARY) {
  const md = ['## Compliance', '', `Scanned ${files.length} files.`, '',
    `- ${problems.length} blocking`, `- ${warnings.length} warnings`, '',
    ...problems.map((p) => `- **FAIL** \`${p.f}:${p.n}\` ${p.why}`),
    ...warnings.map((w) => `- WARN \`${w.f}:${w.n}\` ${w.why}`)].join('\n');
  await writeFile(process.env.GITHUB_STEP_SUMMARY, md + '\n', { flag: 'a' });
}

if (problems.length) {
  console.log(`${problems.length} blocking issue${problems.length === 1 ? '' : 's'}. Publish blocked.`);
  process.exit(1);
}
console.log(`Compliance check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`);
