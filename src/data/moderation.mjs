/**
 * MODERATION POLICY
 *
 * Shared by the build-time checks and the runtime vetting layer. Written as data
 * rather than baked into a prompt so it can be tested, diffed and argued with.
 *
 * THE CENTRAL RISK IS OVER-BLOCKING, NOT UNDER-BLOCKING.
 *
 * FinOpine exists to publish criticism. A moderator that flags "the RBA has been
 * incompetent" or "this article is wrong" has destroyed the product to reduce a
 * risk that was never there. Legitimate criticism of institutions, policies,
 * officials, companies and of FinOpine itself is PROTECTED and must survive
 * review. That is why PROTECTED is listed before BLOCKED below, appears first in
 * the prompt, and is tested with cases that must pass.
 *
 * The genuinely blockable band is narrow: regulated activity, defamation-shaped
 * factual allegations about identifiable people, abuse, and spam.
 *
 * NOT LEGAL ADVICE.
 */

/* ------------------------------------------------------------------ *
 * PROTECTED — must never be blocked. Listed first on purpose.        *
 * ------------------------------------------------------------------ */
export const PROTECTED = [
  'Harsh criticism of a central bank, regulator, government, political party or policy',
  'Saying a named public official is wrong, has failed, is incompetent at their job, or should resign',
  'Criticism of a company’s strategy, pricing, product, governance or conduct',
  'Unpopular, contrarian or minority positions on economics or policy',
  'Criticism of FinOpine, of a published piece, or of the author of one',
  'Blunt, sarcastic or forceful language directed at an argument or an institution',
  'Disagreement with the site’s own editorial line',
  'Predictions about the economy, rates, inflation or policy direction',
  'Saying an investment or asset class is overvalued, a bubble, or a bad idea in general terms'
];

/* ------------------------------------------------------------------ *
 * BLOCKED — four groups, each with a reason a writer can act on.      *
 * ------------------------------------------------------------------ */
export const BLOCKED = [
  {
    group: 'regulated',
    why: 'This is the narrow band that turns commentary into licensed activity.',
    rules: [
      { id: 'product-rec', test: 'A buy, sell or hold recommendation on a named security, fund or financial product',
        note: 'Argue about the company or the policy, not about what to do with the stock.' },
      { id: 'price-target', test: 'A price target, expected return figure, or forecast return presented as an expectation',
        note: 'Drop the number or frame it as what the market is pricing, not what you expect.' },
      { id: 'personal-advice', test: 'Advice addressed to an individual reader’s own money, balance, age or circumstances',
        note: 'Answer the general question, not this person’s situation.' },
      { id: 'promotion', test: 'An inducement to invest, a referral or affiliate link, or a signup pitch for a product or platform',
        note: 'No promotion of products, platforms or services.' },
      { id: 'licence-claim', test: 'A claim to hold a licence, registration or authorisation as an adviser or analyst',
        note: 'Do not assert credentials you cannot evidence.' }
    ]
  },
  {
    group: 'defamation-shaped',
    why: 'Criticising conduct is fine. Asserting a named person committed a crime is not. The line is fact versus opinion, and identifiable person versus institution.',
    rules: [
      { id: 'crime-allegation', test: 'A factual assertion that a named or identifiable individual committed fraud, theft, corruption or another crime, stated as fact rather than as a matter under investigation or already established in public record',
        note: 'Say what was reported and by whom, or frame it as a question. Do not assert it.' },
      { id: 'private-individual', test: 'Unverifiable allegations of misconduct about a private individual who is not a public figure',
        note: 'Private individuals are not the subject of this site.' }
    ]
  },
  {
    group: 'conduct',
    why: 'Directed at a person rather than an argument.',
    rules: [
      { id: 'abuse', test: 'Abuse, threats or harassment aimed at a person, including another commenter',
        note: 'Attack the argument, not the person making it.' },
      { id: 'hate', test: 'Attacks based on race, religion, sex, gender, sexuality, disability or nationality', note: 'Not published.' },
      { id: 'doxxing', test: 'Personal contact details, address or employer of a private individual', note: 'Not published.' }
    ]
  },
  {
    group: 'integrity',
    why: 'Distorts the board or the market.',
    rules: [
      { id: 'manipulation', test: 'Coordinated buying or selling calls, ramping, or talking a position without disclosing it',
        note: 'Disclose a position or drop the specific instrument.' },
      { id: 'spam', test: 'Promotion of the commenter’s own service, channel, group or newsletter', note: 'Not published.' },
      { id: 'off-topic', test: 'Not about money, markets, economics, tax or the policy and law around them', note: 'Wrong site.' }
    ]
  }
];

/* ------------------------------------------------------------------ *
 * Per-jurisdiction emphasis. Adjusts weighting, never adds new bans.  *
 * ------------------------------------------------------------------ */
export const OVERLAY = {
  au: 'Australian defamation is a strict-liability tort and the operator is a publisher of third-party comments, so apply the defamation-shaped rules with a lower tolerance than elsewhere. Criticism of ASIC, APRA, the RBA and of government policy remains fully protected.',
  uk: 'The financial promotion restriction is broad, so apply the promotion rule with a lower tolerance. Criticism of the FCA, the Bank of England and of policy remains fully protected.',
  in: 'Securities recommendation rules are the strictest here and actively enforced, so apply product-rec and price-target with a lower tolerance. Criticism of SEBI, the RBI, the Budget and of policy remains fully protected.',
  us: 'Commentary of general circulation is well protected. Apply the ordinary thresholds.',
  ca: 'Apply the ordinary thresholds.',
  nz: 'Apply the ordinary thresholds.',
  general: 'Apply the ordinary thresholds across all jurisdictions discussed.'
};

/* ------------------------------------------------------------------ *
 * WHO DECIDES WHAT                                                    *
 *                                                                     *
 * The model decides. Every publish/revise/decline verdict on reader    *
 * content is made by the model layer, because the distinctions that    *
 * matter here are all contextual:                                      *
 *                                                                     *
 *   "price target of $180"  is a violation when you are issuing one    *
 *                           and ordinary commentary when you are       *
 *                           quoting the sell side to mock it           *
 *   "guaranteed returns"    is a violation in a pitch and the whole    *
 *                           point in a piece attacking a scam          *
 *   "you should buy CBA"    is a violation as advice and reportage     *
 *                           when describing what finfluencers say      *
 *                                                                     *
 * A regex cannot see any of that. Tested against six such passages the *
 * old blocking prefilter rejected five. It has therefore been demoted: *
 * SIGNALS never block anything.                                        *
 *                                                                     *
 * What the deterministic layer is still good for:                      *
 *   1. compose-time hint  - warn the writer before they submit, so a   *
 *                           genuine violation gets fixed by the person *
 *                           who knows their own intent                 *
 *   2. queue priority     - order the human review queue               *
 *   3. drift sweep        - scan already-published content and flag    *
 *                           for review, never unpublish                *
 *                                                                     *
 * Note this is the opposite call from check-compliance.mjs, which does *
 * block at build time. That is fine there: it lints FinOpine's own     *
 * articles, a human sees the exact line and reason, and can rephrase   *
 * or suppress with an inline allow comment. A lint with an author in   *
 * the loop is not a censor. Reader content has no such loop.           *
 * ------------------------------------------------------------------ */

export const SIGNALS = [
  [/\b(price\s+target|target\s+price)\s*(?:of|:|is)?\s*[\$\u00a3\u20ac\u20b9]?\s*\d/i,
    'price-target', 'Mentions a price target. Fine if quoting one, not if issuing one.'],
  [/\b(guaranteed|assured|risk[-\s]?free)\s+(returns?|profits?|income|yield)/i,
    'price-target', 'Return-guarantee wording. Fine if describing someone else’s claim.'],
  [/\bmulti[-\s]?bagger\b|\bsure[-\s]?shot\b/i,
    'price-target', 'Return-promise vocabulary. Fine if quoting or criticising it.'],
  [/\b(buy|sell|short)\s+(?:the\s+)?\$?[A-Z]{2,5}\b(?!\s+(?:sector|economy|market|debate|argument|policy|case))/,
    'product-rec', 'Reads like a call on a ticker. Fine if reporting what others say.'],
  [/\byou should (buy|sell|invest in|put your (money|super|savings))/i,
    'personal-advice', 'Instruction wording. Fine if quoting someone else giving it.'],
  [/\b(dm|pm|whatsapp|telegram)\s+(me|my)\b/i,
    'spam', 'Off-platform solicitation.'],
  [/\bmy\s+(referral\s+)?(link|code)\b/i,
    'promotion', 'Referral wording.'],
  [/\bi am (a\s+)?(SEBI|ASIC|FCA|SEC)[-\s]registered\b/i,
    'licence-claim', 'Registration claim.']
];

/**
 * Advisory only. Returns hints for the writer and a priority score for the
 * review queue. NOTHING IN THIS FUNCTION BLOCKS ANYTHING. Do not wire its
 * output into a publish decision.
 */
export function signals(text) {
  const hits = [];
  for (const [re, id, why] of SIGNALS) {
    if (re.test(text)) hits.push({ id, why, advisory: true });
  }
  return hits;
}

/** Queue priority only. Higher means look at it sooner, never means reject. */
export function reviewPriority(text) {
  return Math.min(5, signals(text).length);
}

/* ------------------------------------------------------------------ *
 * When the model layer is unavailable                                 *
 *                                                                     *
 * Do not fall back to the regexes - they over-block, which is the      *
 * failure this whole redesign exists to avoid. Do not publish          *
 * unreviewed either. Hold, retry, and tell the writer plainly that     *
 * their submission is queued rather than rejected. Degrade visibly.    *
 * ------------------------------------------------------------------ */
export const UNAVAILABLE_POLICY = {
  action: 'hold-and-retry',
  publishUnreviewed: false,
  fallBackToRegex: false,
  writerMessage: 'Review is unavailable right now, so this is queued rather than rejected. It publishes automatically once review comes back.',
  retrySchedule: [30, 120, 600, 3600]
};

/* ------------------------------------------------------------------ *
 * Prompt builder. PROTECTED comes first, every time.                  *
 * ------------------------------------------------------------------ */
export function buildPrompt(kind, jurisdiction, payload) {
  const blocked = BLOCKED.map((g) =>
    `${g.group.toUpperCase()} — ${g.why}\n` +
    g.rules.map((r) => `  [${r.id}] ${r.test}`).join('\n')
  ).join('\n\n');

  return `You review submissions for FinOpine, which publishes opinion about monetary policy,
tax law, financial regulation and market structure, with reader discussion.

YOUR PRIMARY FAILURE MODE IS BLOCKING LEGITIMATE CRITICISM. Read this list first
and treat everything on it as protected. If a submission is only doing one of
these things, the verdict is publish, however rude or wrong it is:

${PROTECTED.map((p) => `  \u2713 ${p}`).join('\n')}

Being harsh, mistaken, contrarian or annoyed is not a reason to block anything.

Only these are blockable:

${blocked}

Jurisdiction context: ${OVERLAY[jurisdiction] ?? OVERLAY.general}

${kind === 'comment'
  ? 'This is a reply in a thread. Hold it to a low bar. A short, blunt disagreement is fine.'
  : 'This is a submitted article. It additionally needs a stated claim and reasons for it, but a thin argument is a "revise", never a "decline".'}

Judge the submission on its own terms. You are not given any automated flags,\ndeliberately - pattern matches on this material are wrong more often than right,\nand anchoring on one would defeat the point of asking you.\n\nReturn ONLY this JSON, no fences, no preamble:
{
  "verdict": "publish" | "revise" | "decline",
  "ruleIds": [],
  "protectedSpeech": true or false,
  "notes": "under 30 words, addressed to the writer, plain and specific",
  "confidence": 0.0 to 1.0
}

Set protectedSpeech true if the submission is criticism of an institution, policy,
official, company or of FinOpine. Use "decline" only when a specific rule id
applies. If unsure, publish.

SUBMISSION${payload.title ? `\nHeadline: ${payload.title}` : ''}
${payload.body}`;
}
