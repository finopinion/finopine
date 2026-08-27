/**
 * JURISDICTION REGISTRY — the second source of truth.
 *
 * site.ts answers "who publishes this". This file answers "under whose rules
 * does each silo operate". Every route, disclaimer, feed selection and
 * compliance rule derives from here. Adding a country is an edit to this file
 * plus verified feeds, not a scatter of changes across the tree.
 *
 * Why this matters more than it looks: the playbook's most expensive lesson was
 * writing confident Australian compliance guidance for an Indian business. With
 * seven silos that failure mode is not a one-off risk, it is the default unless
 * the rules are attached to the content mechanically.
 *
 * NOT LEGAL ADVICE. `regime` names the framework a local lawyer should be asked
 * about before that silo goes live. `status` stays 'planned' until they have.
 */

export type JCode = 'au' | 'nz' | 'uk' | 'ca' | 'us' | 'in' | 'general';

export interface Jurisdiction {
  code: JCode;
  name: string;
  adjective: string;
  status: 'live' | 'planned';
  currency: string | null;
  dateLocale: string;
  /** conduct regulators — who cares what you publish */
  conduct: string[];
  /** central bank / monetary authority */
  centralBank: string | null;
  /** the licensing regime that a publisher of finance opinion must be cleared against */
  regime: string | null;
  /** retirement-savings vocabulary; wrong word = wrong silo */
  nativeTerms: string[];
  /** terms that signal a piece was written for a different silo */
  foreignTerms: string[];
  /** extra banned patterns beyond the global set, as [source, why] */
  bannedExtra: [string, string][];
  disclaimer: string;
}

export const JURISDICTIONS: Record<JCode, Jurisdiction> = {
  au: {
    code: 'au',
    name: 'Australia',
    adjective: 'Australian',
    status: 'live',
    currency: 'AUD',
    dateLocale: 'en-AU',
    conduct: ['ASIC', 'APRA', 'ACCC', 'AUSTRAC'],
    centralBank: 'Reserve Bank of Australia',
    regime: 'Corporations Act financial product advice — AFSL, with a media exemption and a general-versus-personal-advice distinction',
    nativeTerms: ['superannuation', 'super fund', 'SMSF', 'franking credit', 'cash rate'],
    foreignTerms: ['401(k)', 'ISA', 'RRSP', 'KiwiSaver', 'demat', 'IRA rollover'],
    bannedExtra: [
      ['\\bpersonal advice\\b(?!\\s+is\\s+not)', 'The Corporations Act term. Do not describe output as personal advice.'],
      ['\\bwe are licen[cs]ed\\b', 'Licensing claim. Do not assert an AFSL you do not hold.']
    ],
    disclaimer: 'Opinion only. Not financial product advice, and not a recommendation about any financial product. It does not consider any reader’s objectives, financial situation or needs.'
  },

  nz: {
    code: 'nz',
    name: 'New Zealand',
    adjective: 'New Zealand',
    status: 'planned',
    currency: 'NZD',
    dateLocale: 'en-NZ',
    conduct: ['Financial Markets Authority', 'Commerce Commission'],
    centralBank: 'Reserve Bank of New Zealand',
    regime: 'Financial Markets Conduct Act regulated financial advice — licensing under the FAP regime',
    nativeTerms: ['KiwiSaver', 'OCR', 'PIE', 'FAP'],
    foreignTerms: ['superannuation guarantee', '401(k)', 'ISA', 'RRSP', 'demat'],
    bannedExtra: [
      ['\\bregulated financial advice\\b(?!\\s+is\\s+not)', 'FMCA term of art. Do not describe output this way.']
    ],
    disclaimer: 'Opinion only. Not regulated financial advice under the Financial Markets Conduct Act.'
  },

  uk: {
    code: 'uk',
    name: 'United Kingdom',
    adjective: 'British',
    status: 'planned',
    currency: 'GBP',
    dateLocale: 'en-GB',
    conduct: ['Financial Conduct Authority', 'Prudential Regulation Authority'],
    centralBank: 'Bank of England',
    regime: 'FSMA section 21 financial promotion restriction — an invitation or inducement to engage in investment activity needs approval by an authorised person unless an exemption applies, including the journalism exemption',
    nativeTerms: ['ISA', 'SIPP', 'Bank Rate', 'gilt', 'auto-enrolment'],
    foreignTerms: ['superannuation', '401(k)', 'RRSP', 'KiwiSaver', 'demat', 'cash rate'],
    bannedExtra: [
      ['\\b(invitation|inducement) to invest\\b', 'Financial promotion language under s21 FSMA.'],
      ['\\bcapital (is|at) secure\\b|\\byour capital is safe\\b', 'Contradicts the required risk warning.']
    ],
    disclaimer: 'Opinion and commentary only. Not a financial promotion, and not advice on any investment.'
  },

  ca: {
    code: 'ca',
    name: 'Canada',
    adjective: 'Canadian',
    status: 'planned',
    currency: 'CAD',
    dateLocale: 'en-CA',
    conduct: ['Canadian Securities Administrators', 'CIRO', 'OSFI'],
    centralBank: 'Bank of Canada',
    regime: 'Provincial securities legislation — adviser registration is triggered by advising on securities; provincially administered, so there is no single national answer',
    nativeTerms: ['RRSP', 'TFSA', 'RESP', 'policy rate', 'CPP'],
    foreignTerms: ['superannuation', 'ISA', 'KiwiSaver', 'demat', 'cash rate'],
    bannedExtra: [
      ['\\bregistered adviser\\b(?!\\s+would)', 'Registration claim under provincial securities law.']
    ],
    disclaimer: 'Opinion only. Not advice on securities, and not provided by a registered adviser.'
  },

  us: {
    code: 'us',
    name: 'United States',
    adjective: 'American',
    status: 'planned',
    currency: 'USD',
    dateLocale: 'en-US',
    conduct: ['SEC', 'FINRA', 'CFTC', 'CFPB'],
    centralBank: 'Federal Reserve',
    regime: 'Investment Advisers Act — the publisher’s exclusion covers bona fide publications of general and regular circulation, which is the ground a commentary site stands on',
    nativeTerms: ['401(k)', 'IRA', 'fed funds rate', 'Treasury', 'Roth'],
    foreignTerms: ['superannuation', 'ISA', 'RRSP', 'KiwiSaver', 'demat', 'cash rate'],
    bannedExtra: [
      ['\\bregistered investment adviser\\b(?!\\s+would)', 'RIA claim.'],
      ['\\bpast performance\\b(?![^.]{0,60}(no|not) (guarantee|indicat))', 'Performance reference without the standard qualifier.']
    ],
    disclaimer: 'Opinion and commentary of general circulation. Not investment advice and not personalised to any reader.'
  },

  in: {
    code: 'in',
    name: 'India',
    adjective: 'Indian',
    status: 'planned',
    currency: 'INR',
    dateLocale: 'en-IN',
    conduct: ['SEBI', 'RBI', 'IRDAI', 'PFRDA'],
    centralBank: 'Reserve Bank of India',
    regime: 'SEBI (Research Analysts) Regulations and the Investment Advisers Regulations — the strictest of the seven for published opinion touching securities, and actively enforced against unregistered commentators',
    nativeTerms: ['EPF', 'NPS', 'repo rate', 'demat', 'SIP', 'GST'],
    foreignTerms: ['superannuation', '401(k)', 'ISA', 'RRSP', 'KiwiSaver', 'cash rate'],
    bannedExtra: [
      ['\\b(buy|sell|target|stop\\s?loss)\\s+(call|recommendation)\\b', 'Research-analyst output. Registration territory.'],
      ['\\bmulti[- ]?bagger\\b', 'Return-promise vocabulary.'],
      ['\\bSEBI[- ]registered\\b', 'Registration claim.']
    ],
    disclaimer: 'Opinion only. Not a research report or a recommendation on any security, and not investment advice.'
  },

  general: {
    code: 'general',
    name: 'Cross-border',
    adjective: 'comparative',
    status: 'live',
    currency: null,
    dateLocale: 'en-AU',
    conduct: [],
    centralBank: null,
    regime: null,
    nativeTerms: [],
    foreignTerms: [],
    bannedExtra: [],
    disclaimer: 'Comparative opinion across jurisdictions. Not advice in any of them, and rules differ by country — check the local position before relying on anything here.'
  }
};

export const ORDER: JCode[] = ['au', 'nz', 'uk', 'ca', 'us', 'in', 'general'];
export const live = () => ORDER.filter((c) => JURISDICTIONS[c].status === 'live');
export const planned = () => ORDER.filter((c) => JURISDICTIONS[c].status === 'planned');
