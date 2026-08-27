#!/usr/bin/env node
/**
 * Probes every citation URL in every published article, live.
 *
 * This is the check the schema cannot do. `verified: true` is a word in a text
 * file - anyone can type it, and a plausible URL bolted onto a claim written
 * from memory passes every offline gate while supporting nothing. This script
 * is the part that actually opens the page.
 *
 * Runs in CI on every push and weekly. NOT in the deploy path, deliberately:
 * a transient 503 at a publisher should not take the site down, and the schema
 * already blocks anything structurally unsourced without needing a network.
 *
 * Exit codes
 *   0  every citation resolved
 *   1  at least one dead citation - fix or unpublish before merging
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = 'src/content/opinion';
const UA = 'FinOpine-source-check/1.0 (+https://finopine.com)';

async function walk(dir) {
  let out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return { draft: false, sources: [] };
  const fm = m[1];
  const draft = /^draft:\s*true/m.test(fm);
  const title = (fm.match(/^title:\s*"(.+?)"/m) || [])[1] || '(untitled)';
  const sources = [];
  const re = /^\s*-\s+label:\s*"(.+?)"/gm;
  let hit;
  while ((hit = re.exec(fm))) {
    const block = fm.slice(hit.index, fm.indexOf('\n  - label:', hit.index + 1) === -1 ? fm.length : fm.indexOf('\n  - label:', hit.index + 1));
    const url = (block.match(/url:\s*"(.+?)"/) || [])[1];
    const supports = (block.match(/supports:\s*"([\s\S]+?)"/) || [])[1];
    const retrieved = (block.match(/retrievedAt:\s*"(.+?)"/) || [])[1];
    sources.push({ label: hit[1], url, supports, retrieved });
  }
  return { draft, title, sources };
}

async function probe(url) {
  try {
    let r = await fetch(url, { method: 'HEAD', headers: { 'user-agent': UA }, redirect: 'follow' });
    if ([403, 405, 501].includes(r.status)) {
      r = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
    }
    return r.status;
  } catch { return 'network'; }
}

const files = await walk(ROOT);
let dead = 0, ok = 0, soft = 0, missing = 0;
const lines = [];

for (const f of files) {
  const { draft, title, sources } = parseFrontmatter(await readFile(f, 'utf8'));
  if (draft) continue;
  console.log(`\n${title}`);
  if (!sources.length) { console.log('  NO SOURCES'); dead++; continue; }

  for (const s of sources) {
    if (!s.url) { console.log(`  MISSING URL  ${s.label}`); missing++; continue; }
    if (!s.supports || s.supports.length < 20) {
      console.log(`  NO SUPPORTS  ${s.label}`);
      console.log('               A citation nobody can summarise is one nobody read.');
      missing++;
    }
    const status = await probe(s.url);
    if (status === 200) { ok++; console.log(`  ok    ${s.label}`); }
    else if (status === 404 || status === 410) {
      dead++;
      console.log(`  DEAD  ${s.label}  (${status})`);
      console.log(`        ${s.url}`);
      lines.push(`| ${title} | ${s.label} | DEAD ${status} |`);
    } else {
      soft++;
      console.log(`  ????  ${s.label}  (${status}) - bot wall or publisher issue, not treated as dead`);
    }
    await new Promise(r => setTimeout(r, 250));
  }
}

console.log(`\n${ok} resolved | ${dead} dead | ${soft} unconfirmed | ${missing} structurally incomplete`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const { writeFile } = await import('node:fs/promises');
  await writeFile(process.env.GITHUB_STEP_SUMMARY,
    ['## Source check', '', `${ok} resolved, **${dead} dead**, ${soft} unconfirmed, ${missing} incomplete`,
     ...(lines.length ? ['', '| article | source | state |', '| --- | --- | --- |', ...lines] : [])].join('\n') + '\n',
    { flag: 'a' });
}

if (dead + missing > 0) {
  console.log('\nFix or unpublish before merging. Only 404 and 410 count as dead;');
  console.log('a 403 is a bot wall and a 5xx is a bad day, and neither fails this check.');
  process.exit(1);
}
console.log('\nEvery published citation resolves.');
