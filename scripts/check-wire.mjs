#!/usr/bin/env node
/**
 * Probes every url in wire.json and rewrites the verified flag honestly.
 *
 * Nothing renders as a link on the site until this says so. That is the whole
 * mechanism: a url written by hand, however confident, stays invisible until a
 * live request confirms it.
 *
 * Only 404 and 410 mean dead. A 403 is a bot wall - the page is real, we just
 * cannot confirm it unattended. A 5xx is the publisher having a bad day.
 * Neither gets deleted, and neither gets a link.
 */
import { readFile, writeFile } from 'node:fs/promises';

const UA = 'FinOpine-link-check/1.0 (+https://finopine.com)';
const TIMEOUT = 15000;

async function probe(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT);
  try {
    let res = await fetch(url, { method: 'HEAD', headers: { 'user-agent': UA }, signal: ctl.signal, redirect: 'follow' });
    if ([403, 405, 501].includes(res.status)) {
      res = await fetch(url, { headers: { 'user-agent': UA }, signal: ctl.signal, redirect: 'follow' });
    }
    return { status: res.status, final: res.url };
  } catch (e) {
    return { status: e.name === 'AbortError' ? 'timeout' : 'network' };
  } finally { clearTimeout(t); }
}

function verdict(status) {
  if (status === 200) return ['LIVE', true];
  if (status === 404 || status === 410) return [`DEAD (${status}) - find the current URL`, false];
  if (status === 403) return ['403 bot wall - real, but cannot confirm unattended', false];
  if (typeof status === 'number' && status >= 500) return [`${status} - publisher issue, retry later`, false];
  return [String(status), false];
}

const wire = JSON.parse(await readFile('wire.json', 'utf8'));
let withUrl = 0, live = 0, noUrl = 0;

for (const g of wire.groups) {
  console.log(`\n${g.name}`);
  for (const s of g.sources) {
    if (!s.url) { noUrl++; console.log(`  ----  ${s.name}  (no confirmed URL - renders unlinked)`); continue; }
    withUrl++;
    const r = await probe(s.url);
    const [msg, ok] = verdict(r.status);
    s.verified = ok;
    s.lastChecked = new Date().toISOString().slice(0, 10);
    s.lastResult = msg;
    if (ok) live++;
    console.log(`  ${ok ? 'LINK' : 'SKIP'}  ${s.name}`);
    console.log(`        ${msg}`);
    if (r.final && r.final !== s.url) console.log(`        redirected -> ${r.final}`);
    await new Promise(res => setTimeout(res, 300));
  }
}

await writeFile('wire.json', JSON.stringify(wire, null, 2) + '\n');

console.log(`\n${live} of ${withUrl} URLs live and will render as links.`);
console.log(`${noUrl} sources have no confirmed URL and render as plain text.`);
console.log('\nTo add one: find the real URL, paste it into wire.json, run this again.');
console.log('Adding a URL without re-running changes nothing on the site.');

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = wire.groups.flatMap(g => g.sources.filter(s => s.url)
    .map(s => `| ${s.name} | ${s.verified ? 'LINK' : 'SKIP'} | ${s.lastResult} |`));
  await writeFile(process.env.GITHUB_STEP_SUMMARY,
    ['## Wire link check', '', `${live}/${withUrl} live`, '', '| source | state | result |', '| --- | --- | --- |', ...rows].join('\n') + '\n',
    { flag: 'a' });
}
