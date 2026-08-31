# FinOpine

Opinion on money, markets and the law that shapes them.
Astro static site, published from this repository to Cloudflare Pages.

## Commands

```bash
npm run dev                 # local preview
npm run build               # static build to dist/
npm run check:feeds         # probe every source, update verified flags
npm run check:sources       # probe every citation in every published piece
npm run check:wire          # probe the source directory links
npm run check:compliance    # banned-language scan, exits non-zero
npm run check:readability   # flags jargon used without explanation
npm run check:moderation    # evaluates the moderation policy against test cases
npm run generate            # draft one piece, grounded in a retrieved source
```

## Coverage

`au nz uk ca us in general`. Each piece declares one in frontmatter and lives in
the matching folder. `general` is for cross-country comparison and must name two
or more countries in `compares`.

`src/data/jurisdictions.ts` holds the regulator, central bank, currency, date
locale, vocabulary and per-country compliance rules. Routes, navigation and
disclaimers all derive from it.

## No piece is written from memory

Enforced in four places rather than promised in one:

| gate | catches | needs network |
| --- | --- | --- |
| `url` required | a source that cannot be linked | no |
| `supports` required | a plausible URL attached to a claim written from memory | no |
| `retrievedAt` within 180 days of the piece | a source read months either side of writing | no |
| `check:sources` in CI | a `verified: true` set by hand, and link rot | yes |

`supports` does the real work. A URL requirement alone is defeated by writing
from memory and attaching a plausible link afterwards — the citation looks
perfect and supports nothing. Requiring a sentence on what *this* source
establishes cannot be satisfied without opening it.

The network check runs in CI rather than the deploy path, so a publisher having
a bad day cannot take the site down. It also runs weekly, because a citation
that resolved at publication can die later.

## The editorial rules are in the schema

`src/content.config.ts` requires every piece to carry:

- `plainly` — what the subject is, for someone who does not follow finance
- `position` — two paragraphs stating the claim
- `falsifier` — two paragraphs naming what would show it wrong
- `sources` — at least one live, verified citation

A piece missing any of these does not build. Rules in a checklist get forgotten.

## Pipeline

Three stages, each doing only what its tier is good at:

```
watch.yml    hourly   fetch feeds, score, queue anything material
daily-wire   weekday  vet the queue, write one piece, publish
```

Scoring is deterministic first — corroboration across independent feeds, source
tier, recency — and only then handed to a model. If the model is unavailable the
deterministic score stands alone and the run continues.

## Repository shape

```
site.config.json          canonical URL, shared with astro.config.mjs
feeds.json                source registry + verified flags
wire.json                 public source directory + verified flags
models.json               model ladder per stage
src/
  data/                   single sources of truth
  content.config.ts       the rules
  content/opinion/<country>/*.md
scripts/                  checks and the generator
.github/workflows/        watch, daily wire, source verification
```
