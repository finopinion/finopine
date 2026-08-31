import cfg from '../../site.config.json';

/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Every page, the footer, the RSS feed and the structured-data block read from
 * this file. Nothing here is duplicated anywhere else in the tree. Changing the
 * contact address or the masthead line is a one-line edit.
 *
 * Canonical URL lives in site.config.json because astro.config.mjs needs it too
 * and cannot import TypeScript.
 */

export const SITE = {
  name: cfg.name,
  tagline: cfg.tagline,
  url: cfg.url,
  locale: cfg.locale,

  /* ---- masthead ------------------------------------------------------ */
  masthead: {
    wordmarkA: 'Fin',
    wordmarkB: 'Opine',
    standfirst: 'Opinion on money, markets and the law that shapes them.'
  },

  /* ---- who runs it ----------------------------------------------------
     JURISDICTION IS UNRESOLVED. See LAUNCH.md, blocker 1.
     Leave these null until settled. Components render an honest fallback
     rather than a placeholder string — nothing here leaks to a live page.  */
  publisher: {
    legalName: null as string | null,
    operatingCountry: null as string | null,   // where the publisher sits
    audienceCountry: null as string | null,    // who the writing is aimed at
    regulator: null as string | null,          // ASIC / SEBI / FCA / none
    email: null as string | null
  },

  /* ---- what this site will and will not publish -----------------------
     This is not decoration. scripts/check-compliance.mjs enforces it.       */
  editorial: {
    publishes: [
      'Opinion on monetary policy, tax law, regulation and market structure',
      'Argument about whether a policy is well designed',
      'Analysis of published data, with the source named'
    ],
    doesNotPublish: [
      'Recommendations to buy, sell or hold any financial product',
      'Price targets, return forecasts or valuations presented as guidance',
      'Anything addressed to an individual reader’s circumstances',
      'Claims about a named private individual'
    ],
    everyPieceMustHave: [
      'A position — one sentence stating the claim',
      'A falsifier — what would show the claim is wrong',
      'At least one citation to a retrievable source'
    ]
  },

  /* ---- third-party keys ----------------------------------------------
     Read from env at build time. Missing key changes what the reader sees,
     it does not silently break. See components/ContactPanel.astro.        */
  keys: {
    web3forms: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? null
  },

  /* ---- discussion layer ----------------------------------------------
     Phase 2. Static hosting cannot store comments. When this is false the
     article page says so plainly instead of rendering a dead widget.      */
  discussion: {
    enabled: false,
    note: 'The discussion board is not connected yet.'
  },

  /* Nav is derived from the jurisdiction registry at render time so a silo
     going live is a one-word edit in jurisdictions.ts, not a nav change too. */
  nav: [
    { label: 'Coverage', href: '/' },
    { label: 'The Wire', href: '/wire/' },
    { label: 'About', href: '/about/' }
  ]
} as const;

export type Site = typeof SITE;
