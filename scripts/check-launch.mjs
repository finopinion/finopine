#!/usr/bin/env node
/**
 * Separates blockers from nice-to-haves. Run before pointing anyone at the URL.
 */
import { readFile } from 'node:fs/promises';

const blockers = [], warnings = [];
const site = await readFile('src/data/site.ts', 'utf8');
const feeds = JSON.parse(await readFile('feeds.json', 'utf8'));

if (/operatingCountry: null/.test(site))
  blockers.push('Jurisdiction unresolved. Who regulates this publisher? See LAUNCH.md blocker 1.');
if (/regulator: null/.test(site))
  blockers.push('Regulator not named in site.ts. Disclaimers cannot be written without it.');
if (/legalName: null/.test(site))
  blockers.push('Publisher legal name not set. Required on the about and privacy pages.');
if (/email: null/.test(site))
  warnings.push('No contact address. Set up Cloudflare Email Routing.');

const verified = feeds.feeds.filter(f => f.verified).length;
if (verified === 0)
  warnings.push('No feeds verified yet. Run `npm run check:feeds` before generating anything.');

if (!process.env.PUBLIC_WEB3FORMS_KEY)
  warnings.push('No Web3Forms key. The contact panel will show an email fallback, which is fine.');

console.log('\nBLOCKERS');
blockers.length ? blockers.forEach(b => console.log('  x ' + b)) : console.log('  none');
console.log('\nWARNINGS');
warnings.length ? warnings.forEach(w => console.log('  ! ' + w)) : console.log('  none');
console.log('');
process.exit(blockers.length ? 1 : 0);
