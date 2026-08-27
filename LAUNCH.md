# FinOpine — launch

Built to the playbook. Same stack as srishankaradental.com: Astro static output,
GitHub public repo, Cloudflare Pages, Cloudflare Registrar. Running cost is the
domain and nothing else.

Run `npm run check:launch` at any point. It separates blockers from noise.

---

## Silo model

Seven silos: `au` `nz` `uk` `ca` `us` `in` `general`. Australia and general are
live; the rest are `status: 'planned'` in `src/data/jurisdictions.ts` and render
greyed and unlinked on the home page rather than being hidden — the roadmap is
information a reader is entitled to.

**Adding a country is a one-word edit plus three pieces of real work:**

1. Flip `status` to `'live'` in `jurisdictions.ts`
2. Add that country's feeds to `feeds.json` and run `npm run check:feeds`
3. Have `bannedExtra` for that silo reviewed by someone who practises there

Step 3 is the one that matters and the one that will be tempting to skip.

`general` is for cross-jurisdiction comparison and the schema enforces it: a
general piece must name two or more jurisdictions in `compares`, and a
single-country piece cannot use the field at all. Verified — the build rejects
a general piece listing one country.

### Three guards now run on every piece

| Guard | Catches |
|---|---|
| Folder vs frontmatter | A piece declaring `au` while sitting in `uk/` |
| Per-silo banned terms | "Personal advice" in AU, "multi-bagger" in IN, s21 promotion language in UK |
| Foreign vocabulary | "ISA" in an AU piece, "superannuation" in a UK piece |

The third is the cheap version of your AHPRA-in-India mistake. A piece written
for the wrong country almost always says so in its vocabulary before it says so
anywhere else.

---

## Blocker 1 — where does the publisher sit?

The playbook's first learning was a briefing on Australian AHPRA rules for a
clinic in India, thrown away entirely. **The same trap is open here, and wider.**

You have answered the audience question: Australia first, then NZ, UK, Canada,
US, India, plus cross-border. That is now in the data model.

You have **not** answered where the publisher sits, and that is a separate
question that does not go away. A publisher in India writing about Australian
policy for Australian readers potentially engages both regimes: India's because
that is where the activity happens, Australia's because that is who it targets.
SEBI's research analyst regime is the strictest of the seven and is actively
enforced against unregistered commentators.

| Question | Why it changes the build |
|---|---|
| Where does the publisher sit? | Determines the home regulator and the company/tax position |
| Who is the writing aimed at? | A site targeting Australian readers can engage ASIC regardless of where it is hosted |
| Which regulator applies? | Decides the disclaimer wording, the about page, and how far `check-compliance.mjs` should reach |

Two examples of how differently this lands:

- **Publisher in Australia.** Financial product advice is licensed activity.
  There is a media exemption and a general-versus-personal-advice distinction,
  and commentary on *policy* sits well clear of the line — but commentary on
  *specific securities* does not, and reader-submitted posts are a separate
  exposure again.
- **Publisher in India.** Research analyst registration is its own regime with
  its own view on published opinion about securities, and it has been enforced
  against unregistered commentators.

I am not a lawyer and this is not legal advice. What I can say confidently is
the design consequence, because it is already reflected in the code: **opinion
about policy design is far safer ground than opinion about instruments, in every
jurisdiction.** That is why `site.ts` lists price targets, ratings and buy/sell
language under `doesNotPublish`, and why `check-compliance.mjs` blocks them
mechanically.

Fill in `SITE.publisher` in `src/data/site.ts` once settled. Until then the
about page, privacy page and footer all say so plainly rather than rendering a
placeholder — no marker string can leak onto a live page.

---

## Blocker 2 — the domain

I verified the RDAP method works (`google.com` returns a full registration
record) but could not run the query for `finopine.com` from my environment.
The check is in the repo:

```bash
npm run check:domain finopine.com finopine.net finopine.com.au
```

It sanity-checks against a known-taken and a known-free domain first, and
refuses to report if the controls misbehave. `404` means available.

Then register at **Cloudflare Registrar**, so DNS is already in the account
Pages will use. Two cautions from the playbook:

- Cloudflare sells at cost but not every TLD. `.com.au` is **not** one of them,
  and it requires an Australian ABN or ACN. If the `.com.au` matters for an
  Australian audience, that is a separate registrar and a separate decision.
- Email Routing is **receive only**. It forwards to Gmail. Sending as
  `you@finopine.com` is a separate "Send mail as" setup in Gmail.

**I cannot register the domain.** That needs payment details and an account, and
I do not enter either. This step is yours.

---

## Steps only you can do

1. Register the domain (payment details)
2. Create/authenticate the GitHub and Cloudflare accounts — **use a business
   email from the start**, migrating later is painful
3. Paste `.github/workflows/daily-wire.yml` through the GitHub web editor;
   workflow files are write-protected over most API paths
4. Add `GEMINI_API_KEY` as a repository secret
5. Decide whose name goes on the public commit history — the workflow sets a
   per-repo bot identity, never a global one

---

## Deploy

```bash
npm install
npm run check:domain finopine.com   # before anything else
npm run check:feeds                 # verifies every source is real
npm run check:compliance
npm run build
```

Then:

1. `git init && git add -A && git commit -m "initial"` — **public** repo, so
   Actions minutes are unlimited and the run API is readable without a token
2. Cloudflare dashboard → Compute (Workers & Pages) → Pages → Connect to Git
3. Build command `npm run build`, output directory `dist`
4. Pages → Custom domains → add apex and `www`
5. Email Routing → enable → verify destination

---

## Before the first generation

`feeds.json` ships with **ten unverified feed URLs written from training data.**
Some are probably wrong — that is the fabrication failure mode, applied to URLs
instead of DOIs. `npm run check:feeds` probes each one and flips `verified` only
on a live response with parseable items. **The generator refuses to touch an
unverified feed**, so a made-up URL cannot reach a published citation.

Same warning for `models.json`. Verify the Gemini model IDs against current docs
before the first run; the ladder was written from stale knowledge. A dead ID
returns 404, which the generator treats as non-retryable and skips — so a stale
ladder fails loudly rather than subtly, but check anyway.

---

## Phase 2 — the board

The Reddit-like layer (long/short positions, threaded replies, AI-vetted reader
posts) is **not** in this build. Static hosting cannot store it, and the playbook
is right that automation and features come after the site is live and correct.

`src/components/Discussion.astro` currently renders an honest message instead of
a dead widget, controlled by `SITE.discussion.enabled`. When you want it:
Cloudflare Pages Functions plus D1 keeps the zero-server constraint intact, adds
no monthly cost at this volume, and the vetting key stays server-side where it
belongs. A working prototype of the interaction model is the standalone HTML
file from earlier in this project.

---

## What is deliberately not here

No analytics, no cookie banner, no newsletter capture, no contact form key.
Each is a decision to make once the site is real, not scaffolding to carry now.
`check-launch.mjs` lists them as warnings rather than blockers.
