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
 * VERIFY THE MODEL IDS IN models.json AGAINST CURRENT PROVIDER DOCS BEFORE THE
 * FIRST RUN. Whatever generation your assistant's training data knows is
 * probably a generation behind.
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const OUT_DIR = 'src/content/opinion';
const WINDOWS = [7, 30, 90, 240];      // days, widened progressively
const MIN_CANDIDATES = 6;
const MAX_CANDIDATES = 12;
const MAX_OUTPUT_TOKENS = 16000;       // thinking + writing share this budget
const RETRYABLE = new Set([429, 500, 502, 503, 504]);

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('GEMINI_API_KEY is not set. Nothing generated.');
  process.exit(1);
}

const summary = [];
const note = (s) => { console.log(s); summary.push(s); };

/* ------------------------------------------------------------------ feeds */

const registry = JSON.parse(await readFile('feeds.json', 'utf8'));
const usable = registry.feeds.filter((f) => f.verified);

if (!usable.length) {
  console.error('No verified feeds. Run `npm run check:feeds` first.');
  console.error('The generator will not cite a source it has not confirmed exists.');
  process.exit(1);
}
note(`Verified feeds: ${usable.length} of ${registry.feeds.length}`);

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

const seen = new Set(await readdir(OUT_DIR).catch(() => []));
const alreadyCovered = new Set();
for (const file of seen) {
  if (!file.endsWith('.md')) continue;
  const t = await readFile(join(OUT_DIR, file), 'utf8');
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
    .sort((a, b) => (b.weight - a.weight) || ((b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0)))
    .slice(0, MAX_CANDIDATES);
  usedWindow = days;
  if (candidates.length >= MIN_CANDIDATES) break;
}

if (!candidates.length) {
  note('No uncovered items in any window. Nothing to write — exiting clean.');
  await flushSummary();
  process.exit(0);
}
note(`Candidates: ${candidates.length} (window ${usedWindow}d, ${alreadyCovered.size} already covered)`);

/* --------------------------------------------------------------- the model */

const models = JSON.parse(await readFile('models.json', 'utf8')).ladder;

const prompt = `You write for FinOpine, which publishes opinion about monetary policy, tax law,
financial regulation and market structure. Not stock tips. Not advice.

Below are ${candidates.length} REAL items retrieved from official and press feeds moments ago.

${candidates.map((c, i) => `[${i}] ${c.publisher} — ${c.title}
    ${c.date ? c.date.toISOString().slice(0, 10) : 'undated'}
    ${c.summary}`).join('\n\n')}

Pick the ONE item that supports the strongest argument and write an opinion piece about it.

HARD RULES
- Write using ONLY what is in the item you picked. If a fact is not there, do not assert it.
- Never write a URL, a DOI, a journal name or a citation. They are added mechanically.
- Never recommend buying, selling or holding anything. Argue about whether a policy,
  rule or decision is well made.
- Never address the reader's own money or circumstances.
- Take a real position and give the strongest version of the opposing case before
  answering it.

Return ONLY this JSON, no fences, no preamble:
{
  "index": <the number of the item you picked>,
  "kicker": "one or two words, e.g. Monetary policy",
  "title": "under 90 chars, states the argument not the topic",
  "dek": "one or two sentences, under 240 chars",
  "position": "one sentence stating your claim, at least 25 chars",
  "falsifier": "one sentence naming what would show the claim is wrong, at least 25 chars",
  "body": "600-900 words of markdown. Use ## subheads. No links.",
  "tags": ["two or three lowercase tags"],
  "supports": "one sentence saying what the item you picked establishes for your argument, at least 20 chars"
}`;

async function callModel(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: MAX_OUTPUT_TOKENS,   // thinking draws on this too
        responseMimeType: 'application/json'
      }
    })
  });
  return res;
}

let raw = null, servedBy = null;

outer:
for (const model of models) {
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
      if (RETRYABLE.has(res.status)) {
        note(`  ${model} attempt ${attempt}: HTTP ${res.status}, retrying`);
        await new Promise((r) => setTimeout(r, attempt * 2500));
        continue;
      }
      // 400 / 401 / 404 never fix themselves — next model
      note(`  ${model}: HTTP ${res.status}, not retryable, next model`);
      continue outer;
    }

    const data = await res.json();
    const cand = data.candidates?.[0];
    const finish = cand?.finishReason ?? 'none';
    const usage = data.usageMetadata ?? {};

    // THE DIAGNOSTIC THAT SAVES AN HOUR
    note(`  ${model}: finishReason=${finish} prompt=${usage.promptTokenCount ?? '?'} ` +
         `thoughts=${usage.thoughtsTokenCount ?? 0} output=${usage.candidatesTokenCount ?? '?'}`);

    const text = cand?.content?.parts?.map((p) => p.text).join('') ?? '';
    if (!text.trim()) {
      note(`  ${model}: empty candidate (finishReason ${finish}). ` +
           (finish === 'MAX_TOKENS' ? 'Budget exhausted by thinking — raise MAX_OUTPUT_TOKENS.' : ''));
      continue;
    }
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

for (const [field, min] of [['position', 25], ['falsifier', 25], ['title', 10], ['dek', 20], ['supports', 20]]) {
  if (!out[field] || String(out[field]).length < min) {
    note(`Field "${field}" missing or too short. The schema would reject this at build.`);
    await flushSummary();
    process.exit(1);
  }
}

/* ------------------------------------------------------------------ write */

const slug = String(out.title).toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60);
const today = new Date().toISOString().slice(0, 10);
const file = join(OUT_DIR, `${today}-${slug}.md`);

const yaml = (s) => JSON.stringify(String(s));

const md = `---
title: ${yaml(out.title)}
dek: ${yaml(out.dek)}
kicker: ${yaml(out.kicker || 'Policy')}
author: "FinOpine desk"
date: ${today}
position: ${yaml(out.position)}
falsifier: ${yaml(out.falsifier)}
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
note(`Grounded in: ${item.publisher} — ${item.title}`);
note('Written as draft:true. Read it, then flip the flag to publish.');

await flushSummary();

async function flushSummary() {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  const md2 = ['## Article generation', '', '```', ...summary, '```'].join('\n');
  await writeFile(process.env.GITHUB_STEP_SUMMARY, md2 + '\n', { flag: 'a' });
}
