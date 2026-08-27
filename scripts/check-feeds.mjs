#!/usr/bin/env node
/**
 * Probes every feed in feeds.json and rewrites the file with an honest
 * verified flag. Run this before the first generation and whenever a
 * generation run reports a source going quiet.
 *
 * Playbook rules applied here:
 *   - Only 404 and 410 mean a URL is dead. 403 is a bot wall, 5xx is the
 *     publisher having a bad day. Both stay "unverified", not "removed".
 *   - Try HEAD, then GET. Some servers reject HEAD outright.
 *   - Degrade visibly: a feed that fails is reported by name, not skipped.
 *
 * Exits non-zero if no feed verified, because the generator has nothing to
 * stand on in that case.
 */

import { readFile, writeFile } from 'node:fs/promises';

const UA = 'FinOpine-feed-check/1.0 (+https://finopine.com)';
const TIMEOUT = 15000;

async function probe(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    let res = await fetch(url, { method: 'HEAD', headers: { 'user-agent': UA }, signal: ctl.signal, redirect: 'follow' });
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, { headers: { 'user-agent': UA }, signal: ctl.signal, redirect: 'follow' });
    }
    if (res.status !== 200) return { ok: false, status: res.status, items: 0 };

    const body = await (res.bodyUsed
      ? Promise.resolve('')
      : fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' }).then((r) => r.text()));

    const items = (body.match(/<item[\s>]/gi) || []).length
                + (body.match(/<entry[\s>]/gi) || []).length;
    return { ok: items > 0, status: 200, items };
  } catch (e) {
    return { ok: false, status: e.name === 'AbortError' ? 'timeout' : 'network', items: 0 };
  } finally {
    clearTimeout(t);
  }
}

function meaning(status, items) {
  if (status === 200 && items > 0) return `ok, ${items} items`;
  if (status === 200) return 'returned 200 but no <item>/<entry> — not a feed';
  if (status === 404 || status === 410) return `DEAD (${status}) — find the current URL`;
  if (status === 403) return '403 bot wall — real but unusable unattended';
  if (typeof status === 'number' && status >= 500) return `${status} — publisher issue, retry later`;
  return String(status);
}

const raw = JSON.parse(await readFile('feeds.json', 'utf8'));
let verified = 0;

console.log(`Probing ${raw.feeds.length} feeds.\n`);

for (const f of raw.feeds) {
  const r = await probe(f.url);
  f.verified = r.ok;
  f.lastChecked = new Date().toISOString().slice(0, 10);
  f.lastResult = meaning(r.status, r.items);
  if (r.ok) verified++;
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${f.id.padEnd(22)} ${f.lastResult}`);
  if (!r.ok) console.log(`        ${f.url}`);
  await new Promise((res) => setTimeout(res, 300));
}

await writeFile('feeds.json', JSON.stringify(raw, null, 2) + '\n');

console.log(`\n${verified} of ${raw.feeds.length} verified. feeds.json updated.`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const md = [
    '## Feed check',
    '',
    '| feed | result |',
    '| --- | --- |',
    ...raw.feeds.map((f) => `| ${f.id} | ${f.verified ? 'PASS' : 'FAIL'} — ${f.lastResult} |`)
  ].join('\n');
  await writeFile(process.env.GITHUB_STEP_SUMMARY, md + '\n', { flag: 'a' });
}

if (verified === 0) {
  console.error('\nNo usable feeds. The generator has nothing to ground on — fix the URLs.');
  process.exit(1);
}
