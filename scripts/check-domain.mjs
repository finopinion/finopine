#!/usr/bin/env node
/**
 * Definitive .com/.net availability check via Verisign RDAP.
 *
 *   node scripts/check-domain.mjs finopine.com finopine.net
 *
 * Playbook rule: sanity-check the method against a domain you KNOW is taken
 * before trusting any answer. This script does that automatically and refuses
 * to report on your domains if the control lookup misbehaves.
 *
 * Reading the result:
 *   200 -> registered
 *   404 -> not found, i.e. available to register
 *   429 -> rate limited, back off (RFC 7480 s5.5)
 *   anything else -> unknown, do not treat as available
 *
 * Cloudflare Registrar sells at cost but not every TLD. Check yours before
 * planning around it.
 */

const CONTROL = 'google.com';           // must come back 200
const CONTROL_FREE = 'zzq7x4v9nope.com'; // almost certainly 404

const ENDPOINT = (d) =>
  `https://rdap.verisign.com/${d.endsWith('.net') ? 'net' : 'com'}/v1/domain/${d}`;

async function lookup(domain) {
  const res = await fetch(ENDPOINT(domain), {
    headers: { accept: 'application/rdap+json' },
    redirect: 'follow'
  });
  let registrar = null, created = null, expires = null;
  if (res.status === 200) {
    try {
      const j = await res.json();
      registrar = j.entities?.find((e) => e.roles?.includes('registrar'))
        ?.vcardArray?.[1]?.find((f) => f[0] === 'fn')?.[3] ?? null;
      created = j.events?.find((e) => e.eventAction === 'registration')?.eventDate ?? null;
      expires = j.events?.find((e) => e.eventAction === 'expiration')?.eventDate ?? null;
    } catch { /* body shape changed; status is still the answer */ }
  }
  return { domain, status: res.status, registrar, created, expires };
}

function verdict(status) {
  if (status === 200) return 'REGISTERED';
  if (status === 404) return 'AVAILABLE';
  if (status === 429) return 'RATE LIMITED — retry later';
  return `UNKNOWN (HTTP ${status}) — do not assume available`;
}

const targets = process.argv.slice(2);
if (!targets.length) {
  console.error('usage: node scripts/check-domain.mjs <domain> [domain...]');
  process.exit(2);
}

console.log('Sanity-checking the method first.\n');
const takenControl = await lookup(CONTROL);
const freeControl = await lookup(CONTROL_FREE);
console.log(`  control (known taken)     ${CONTROL} -> ${takenControl.status}`);
console.log(`  control (known unused)    ${CONTROL_FREE} -> ${freeControl.status}\n`);

if (takenControl.status !== 200 || freeControl.status !== 404) {
  console.error('Control lookups did not behave as expected. RDAP may be down or');
  console.error('rate-limiting this IP. Not reporting on your domains — an answer');
  console.error('you cannot trust is worse than no answer.');
  process.exit(1);
}

console.log('Method confirmed. Results:\n');
let anyUnknown = false;
for (const d of targets) {
  const r = await lookup(d);
  const v = verdict(r.status);
  if (v.startsWith('UNKNOWN') || v.startsWith('RATE')) anyUnknown = true;
  console.log(`  ${d.padEnd(28)} ${v}`);
  if (r.registrar) console.log(`  ${' '.repeat(28)} registrar: ${r.registrar}`);
  if (r.created)   console.log(`  ${' '.repeat(28)} registered: ${r.created.slice(0, 10)}`);
  if (r.expires)   console.log(`  ${' '.repeat(28)} expires: ${r.expires.slice(0, 10)}`);
  await new Promise((r2) => setTimeout(r2, 400)); // be polite
}

console.log('\nIf AVAILABLE: register at Cloudflare Registrar so DNS lands in the');
console.log('same account as Pages. Confirm the TLD is one they sell.');
process.exit(anyUnknown ? 1 : 0);
