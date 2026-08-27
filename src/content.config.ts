import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * THE RULES LIVE HERE.
 *
 * Put editorial obligations in the schema, not in a checklist you will forget.
 * A piece that breaks these cannot build, so the obligation is mechanical.
 *
 *   jurisdiction  - every piece belongs to exactly one silo
 *   compares      - a cross-border piece must name two or more jurisdictions
 *   position      - an opinion piece without a stated claim is a summary
 *   falsifier     - unfalsifiable opinion is noise with a byline
 *   sources       - at least one, retrievable, with a publisher named
 */

const CODES = ['au', 'nz', 'uk', 'ca', 'us', 'in', 'general'] as const;

const MAX_SOURCE_AGE_DAYS = 180;

const citation = z.object({
  label: z.string().min(4),
  publisher: z.string().min(2),

  /**
   * REQUIRED. Every citation must point at a real, retrievable page.
   * A source you cannot link is a source you are asserting from memory, and
   * memory reconstructs the shape of a plausible reference rather than
   * recalling a real one.
   */
  url: z.string().url('Every citation needs a URL. If you cannot link it, you cannot cite it.'),

  /**
   * REQUIRED. What THIS source establishes, in the writer's own words.
   *
   * This is the anti-laundering field. Attaching a plausible URL to a claim
   * written from memory is the easy way to defeat a URL requirement, and it
   * produces a citation that looks perfect and supports nothing. If you cannot
   * say what the source establishes, you did not read it.
   */
  supports: z.string().min(20,
    'Say what this source establishes. A citation you cannot summarise is one you did not read.'),

  /**
   * REQUIRED. The date the URL was actually retrieved and read.
   * Not the publication date - the date someone opened it.
   */
  retrievedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'retrievedAt must be YYYY-MM-DD.'),

  /**
   * REQUIRED TRUE. Set only after a live check. Typing it by hand passes the
   * schema but fails scripts/check-sources.mjs, which probes every URL in CI.
   */
  verified: z.literal(true, {
    errorMap: () => ({ message: 'Source not verified. Run npm run check:sources.' })
  }),

  date: z.string().optional(),
  quote: z.string().max(160).optional()
}).refine(
  (c) => {
    const age = (Date.now() - new Date(c.retrievedAt).getTime()) / 86400000;
    return age <= MAX_SOURCE_AGE_DAYS;
  },
  { message: `Source retrieved more than ${MAX_SOURCE_AGE_DAYS} days ago. Re-open it and update retrievedAt, or drop the claim.`, path: ['retrievedAt'] }
);

const opinion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opinion' }),
  schema: z.object({
    jurisdiction: z.enum(CODES),
    compares: z.array(z.enum(CODES)).optional(),

    title: z.string().max(90, 'Headline over 90 characters. Say the argument, not the topic.'),
    dek: z.string().min(20).max(240),
    kicker: z.string().max(24),
    author: z.string().min(2),
    date: z.coerce.date(),

    position: z.string().min(25,
      'State the claim in one sentence. An opinion piece without a position is a summary.'),

    falsifier: z.string().min(25,
      'Say what would show this is wrong. FinOpine does not publish unfalsifiable opinion.'),

    sources: z.array(citation).min(1,
      'Every piece needs at least one citation. Retrieve it - do not write one from memory.'),

    readMins: z.number().int().positive().default(4),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    generated: z.boolean().default(false),
    groundedIn: z.string().optional()
  })
  .superRefine((d, ctx) => {
    if (d.jurisdiction === 'general') {
      if (!d.compares || d.compares.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['compares'],
          message: 'A cross-border piece must name at least two jurisdictions in compares. If it only concerns one, file it in that silo instead.'
        });
      }
      if (d.compares?.includes('general')) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['compares'], message: 'general cannot compare itself.' });
      }
    } else if (d.compares?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom, path: ['compares'],
        message: 'Only cross-border pieces use compares. A single-jurisdiction piece that ranges across countries belongs in the general silo.'
      });
    }
  })
});

export const collections = { opinion };
