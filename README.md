# FinOpine

Opinion on money, markets and the law that shapes them. Static site, zero servers.

Read **LAUNCH.md** first — there are two blockers before this goes live.

## Stack

| Piece | Choice | Cost |
|---|---|---|
| Generator | Astro, static output | free |
| Source control | GitHub, public repo | free |
| Hosting | Cloudflare Pages | free |
| Domain | Cloudflare Registrar | ~US$11/yr |
| Inbound email | Cloudflare Email Routing | free |
| Scheduled drafts | GitHub Actions cron | free |

## Commands

```bash
npm run dev                              # local preview
npm run build                            # static build to dist/
npm run check:domain finopine.com        # RDAP availability, sanity-checked
npm run check:feeds                      # probe every source, update verified flags
npm run check:compliance                 # banned-language scan, exits non-zero
npm run check:launch                     # blockers vs warnings
npm run generate                         # draft one piece, grounded in a real feed item
npm run publish                          # compliance check, then build
```

## Silos

`au` `nz` `uk` `ca` `us` `in` `general`. Each piece declares one in frontmatter and
lives in the matching folder. `general` is for cross-jurisdiction comparison and
must name two or more countries in `compares`.

`src/data/jurisdictions.ts` holds the regulator, central bank, currency, date
locale, native and foreign vocabulary, per-silo banned patterns and disclaimer
for each. Routes, nav, disclaimers and compliance rules all derive from it.

## No article is written from memory

Mandatory, and enforced in four places rather than promised in one:

| gate | catches | needs network |
| --- | --- | --- |
| `url` required | a source you cannot link | no |
| `supports` required | a plausible URL bolted onto a memory claim | no |
| `retrievedAt` + 180-day limit | a source nobody has reopened in six months | no |
| `check:sources` in CI | a `verified: true` typed by hand, and link rot | yes |

`supports` is the one doing the real work. A URL requirement alone is trivially
defeated by writing from memory and attaching a plausible link afterwards - the
citation looks perfect and supports nothing. Requiring a sentence on what THIS
source establishes cannot be satisfied without opening it.

The network check sits in CI rather than the deploy path on purpose. A transient
503 at a publisher should not take the site down, and the offline gates already
block anything structurally unsourced. It also runs weekly, because a citation
that resolved at publication can die later.

## The editorial rules are in the schema

`src/content.config.ts` requires every piece to carry:

- **position** — one sentence stating the claim
- **falsifier** — what would show the claim is wrong
- **sources** — at least one citation with a named publisher

Plus, per silo: a piece must declare a jurisdiction, sit in the matching folder,
and — if general — compare two or more countries.

A piece missing any of these does not build. Verified:

```
[InvalidContentEntryDataError] opinion → _guardtest does not match collection schema.
  falsifier: Required
  sources: Every piece needs at least one citation.
```

Rules in a checklist get forgotten. Rules in a schema do not.

## One data file

`src/data/site.ts` is the single source of truth — masthead, editorial policy,
publisher details, feature flags. Every page, the footer and the structured-data
block read from it. Fields that are not set render an honest message rather than
a placeholder marker.

## Generation is retrieval-first

The model never types a URL. `scripts/generate-article.mjs` pulls real items from
verified feeds, hands the model ~12 real records, asks it to pick one **by index**
and write only from that record, then builds the citation from the feed's own
metadata. A stray link in the output aborts the run.

## Repository shape

```
site.config.json            canonical URL, shared with astro.config.mjs
feeds.json                  source registry + verified flags
models.json                 fallback ladder, newest to oldest
src/
  data/site.ts              single source of truth
  content.config.ts         Zod schemas — the rules
  content/opinion/*.md      the pieces
  layouts/ components/ pages/ styles/
scripts/
  check-domain.mjs          RDAP, with method sanity-check
  check-feeds.mjs           probe sources, only 404/410 mean dead
  check-compliance.mjs      banned patterns, exits non-zero
  check-launch.mjs          blockers vs nice-to-haves
  generate-article.mjs      retrieval → model → validate → write
.github/workflows/
  daily-wire.yml            cron, UTC — paste by hand
```
