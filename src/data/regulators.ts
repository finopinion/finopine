import type { JCode } from './jurisdictions';

/**
 * REGULATOR REGISTRY
 *
 * Who does what, per silo. Grouped by ROLE rather than by name, because the
 * comparative pieces in the general silo turn on the fact that the same job is
 * done by different bodies in different countries — and sometimes by one body
 * where another country uses two.
 *
 * `publisherRelevant: true` marks the body that decides whether a commentary
 * site is inside or outside its perimeter. That is the one that matters for
 * FinOpine itself, and it is exactly one body per jurisdiction.
 *
 * `status` is not decoration. Regulator line-ups move. Two are mid-change as at
 * August 2026 and both are marked. Re-check before a silo goes live.
 *
 * NOT LEGAL ADVICE. This is a map of who to ask, not an answer.
 */

export type Role =
  | 'central bank'
  | 'prudential'
  | 'conduct & securities'
  | 'payments'
  | 'competition & consumer'
  | 'anti-money-laundering'
  | 'dispute resolution'
  | 'tax'
  | 'retirement'
  | 'coordination';

export interface Body {
  abbr: string;
  name: string;
  role: Role;
  does: string;
  publisherRelevant?: boolean;
  status?: 'stable' | 'in transition' | 'contested';
  statusNote?: string;
}

export const REGULATORS: Record<JCode, Body[]> = {
  au: [
    { abbr: 'RBA', name: 'Reserve Bank of Australia', role: 'central bank',
      does: 'Cash rate via the Monetary Policy Board; payments system oversight via the Payments System Board.' },
    { abbr: 'APRA', name: 'Australian Prudential Regulation Authority', role: 'prudential',
      does: 'Banks, insurers and superannuation funds — solvency and safety.' },
    { abbr: 'ASIC', name: 'Australian Securities and Investments Commission', role: 'conduct & securities',
      does: 'Market conduct, financial services licensing, company registration. Owns the advice perimeter.',
      publisherRelevant: true },
    { abbr: 'ACCC', name: 'Australian Competition and Consumer Commission', role: 'competition & consumer',
      does: 'Competition and consumer law, including misleading conduct.' },
    { abbr: 'AUSTRAC', name: 'Australian Transaction Reports and Analysis Centre', role: 'anti-money-laundering',
      does: 'AML/CTF supervision, now including digital asset service providers.' },
    { abbr: 'ATO', name: 'Australian Taxation Office', role: 'tax',
      does: 'Tax administration, and the regulator of self-managed super funds.' },
    { abbr: 'AFCA', name: 'Australian Financial Complaints Authority', role: 'dispute resolution',
      does: 'Single external dispute scheme for consumer financial complaints.' },
    { abbr: 'CFR', name: 'Council of Financial Regulators', role: 'coordination',
      does: 'Coordinating forum of RBA, APRA, ASIC and Treasury. Not a regulator and holds no powers.' }
  ],

  nz: [
    { abbr: 'RBNZ', name: 'Reserve Bank of New Zealand', role: 'central bank',
      does: 'Official Cash Rate, and prudential supervision of banks and insurers — one body doing what RBA and APRA split in Australia.' },
    { abbr: 'FMA', name: 'Financial Markets Authority', role: 'conduct & securities',
      does: 'Market conduct and licensing of financial advice providers under the FMC Act.',
      publisherRelevant: true },
    { abbr: 'ComCom', name: 'Commerce Commission', role: 'competition & consumer',
      does: 'Competition, and consumer credit under the CCCFA.' },
    { abbr: 'DIA', name: 'Department of Internal Affairs', role: 'anti-money-laundering',
      does: 'One of three AML supervisors, alongside RBNZ and FMA.' },
    { abbr: 'IRD', name: 'Inland Revenue', role: 'tax', does: 'Tax administration, including PIE rules and KiwiSaver.' },
    { abbr: 'Schemes', name: 'Four approved dispute schemes', role: 'dispute resolution',
      does: 'Banking Ombudsman, IFSO, FSCL and FDRS. No single AFCA equivalent — which scheme applies depends on the provider.' }
  ],

  uk: [
    { abbr: 'BoE', name: 'Bank of England', role: 'central bank',
      does: 'Bank Rate via the Monetary Policy Committee; systemic risk via the Financial Policy Committee; supervises systemic payment systems.' },
    { abbr: 'PRA', name: 'Prudential Regulation Authority', role: 'prudential',
      does: 'Banks, insurers and major investment firms. Sits inside the Bank of England.' },
    { abbr: 'FCA', name: 'Financial Conduct Authority', role: 'conduct & securities',
      does: 'Conduct, markets, and the financial promotion restriction under FSMA section 21 — the tightest constraint on published material of any silo here.',
      publisherRelevant: true },
    { abbr: 'PSR', name: 'Payment Systems Regulator', role: 'payments',
      does: 'Economic regulator of designated payment systems.',
      status: 'in transition',
      statusNote: 'Being abolished. HM Treasury confirmed the decision on 21 April 2026 and the Financial Services and Markets Bill 2026-27 had its First Reading in the Lords on 19 May 2026. Functions transfer to the FCA. The PSR retains its statutory powers and is still running a work programme until commencement.' },
    { abbr: 'TPR', name: 'The Pensions Regulator', role: 'retirement',
      does: 'Workplace pension schemes and auto-enrolment.' },
    { abbr: 'FOS', name: 'Financial Ombudsman Service', role: 'dispute resolution',
      does: 'Consumer complaints. Paired with the FSCS, which compensates when a firm fails.' },
    { abbr: 'HMRC', name: 'HM Revenue and Customs', role: 'tax', does: 'Tax, including ISA and SIPP treatment.' },
    { abbr: 'CMA', name: 'Competition and Markets Authority', role: 'competition & consumer',
      does: 'Competition, including the open banking remedies.' }
  ],

  ca: [
    { abbr: 'BoC', name: 'Bank of Canada', role: 'central bank', does: 'Policy interest rate and monetary policy.' },
    { abbr: 'OSFI', name: 'Office of the Superintendent of Financial Institutions', role: 'prudential',
      does: 'Federally regulated banks, insurers and pension plans.' },
    { abbr: 'CSA', name: 'Canadian Securities Administrators', role: 'coordination',
      does: 'Umbrella body that harmonises rules across provinces. Not itself a regulator and issues no licences.' },
    { abbr: 'OSC / AMF / BCSC / ASC', name: 'Provincial securities commissions', role: 'conduct & securities',
      does: 'The actual securities regulators. Registration and the advice perimeter are provincial, so there is no single national answer.',
      publisherRelevant: true },
    { abbr: 'CIRO', name: 'Canadian Investment Regulatory Organization', role: 'conduct & securities',
      does: 'Self-regulatory body for investment and mutual fund dealers, formed by the 2023 merger of IIROC and the MFDA.' },
    { abbr: 'FCAC', name: 'Financial Consumer Agency of Canada', role: 'competition & consumer',
      does: 'Consumer protection at federally regulated institutions.' },
    { abbr: 'FINTRAC', name: 'Financial Transactions and Reports Analysis Centre', role: 'anti-money-laundering',
      does: 'AML reporting and supervision.' },
    { abbr: 'CRA', name: 'Canada Revenue Agency', role: 'tax', does: 'Tax, including RRSP and TFSA rules.' },
    { abbr: 'OBSI', name: 'Ombudsman for Banking Services and Investments', role: 'dispute resolution',
      does: 'Complaints against banks and investment firms.' }
  ],

  us: [
    { abbr: 'Fed', name: 'Federal Reserve', role: 'central bank',
      does: 'Federal funds rate via the FOMC, and supervision of bank holding companies.' },
    { abbr: 'SEC', name: 'Securities and Exchange Commission', role: 'conduct & securities',
      does: 'Securities markets and investment advisers. The publisher’s exclusion under the Advisers Act is the ground a commentary site stands on.',
      publisherRelevant: true },
    { abbr: 'FINRA', name: 'Financial Industry Regulatory Authority', role: 'conduct & securities',
      does: 'Self-regulatory body for broker-dealers.' },
    { abbr: 'CFTC', name: 'Commodity Futures Trading Commission', role: 'conduct & securities',
      does: 'Derivatives and futures. The NFA is its self-regulatory counterpart.' },
    { abbr: 'OCC / FDIC / NCUA', name: 'Federal banking regulators', role: 'prudential',
      does: 'National banks, insured state banks and deposit insurance, and credit unions respectively.' },
    { abbr: 'CFPB', name: 'Consumer Financial Protection Bureau', role: 'competition & consumer',
      does: 'Consumer financial products — mortgages, cards, lending.',
      status: 'contested',
      statusNote: 'Legally extant but heavily reduced. Headcount fell from roughly 1,700 to about 1,300 during 2025, funding has been the subject of ongoing litigation over whether the Federal Reserve can lawfully transfer funds while operating at a loss, and a December 2025 district court ruling required the Bureau to keep requesting funding. Treat its supervisory reach as unsettled.' },
    { abbr: 'FinCEN', name: 'Financial Crimes Enforcement Network', role: 'anti-money-laundering',
      does: 'AML rules and reporting.' },
    { abbr: 'State regulators', name: 'State securities, insurance and banking regulators', role: 'conduct & securities',
      does: 'Blue-sky securities registration, insurance, and money transmission. NASAA and the NAIC coordinate but do not licence.' },
    { abbr: 'DOL', name: 'Department of Labor', role: 'retirement', does: 'Employer retirement plans under ERISA.' },
    { abbr: 'IRS', name: 'Internal Revenue Service', role: 'tax', does: 'Tax, including 401(k) and IRA treatment.' }
  ],

  in: [
    { abbr: 'RBI', name: 'Reserve Bank of India', role: 'central bank',
      does: 'Repo rate and monetary policy, plus prudential supervision of banks and NBFCs and oversight of payment systems — an unusually broad remit.' },
    { abbr: 'SEBI', name: 'Securities and Exchange Board of India', role: 'conduct & securities',
      does: 'Securities markets, and registration of research analysts and investment advisers. The strictest of the seven for published opinion touching securities, and actively enforced against unregistered commentators.',
      publisherRelevant: true },
    { abbr: 'IRDAI', name: 'Insurance Regulatory and Development Authority of India', role: 'prudential',
      does: 'Insurance.' },
    { abbr: 'PFRDA', name: 'Pension Fund Regulatory and Development Authority', role: 'retirement',
      does: 'The National Pension System and pension funds.' },
    { abbr: 'IFSCA', name: 'International Financial Services Centres Authority', role: 'conduct & securities',
      does: 'Unified regulator for GIFT City — banking, capital markets and insurance in one body, inside one zone.' },
    { abbr: 'FIU-IND', name: 'Financial Intelligence Unit — India', role: 'anti-money-laundering',
      does: 'AML reporting, including virtual asset service providers.' },
    { abbr: 'CBDT / CBIC', name: 'Central Boards of Direct and Indirect Taxes', role: 'tax',
      does: 'Income tax, and GST and customs respectively.' },
    { abbr: 'MCA', name: 'Ministry of Corporate Affairs', role: 'coordination',
      does: 'Company law and corporate registry.' },
    { abbr: 'NPCI', name: 'National Payments Corporation of India', role: 'payments',
      does: 'Operates UPI, IMPS and RuPay. An operator under RBI oversight, not a regulator — but structurally central to any argument about Indian payments.' }
  ],

  general: [
    { abbr: 'FSB', name: 'Financial Stability Board', role: 'coordination',
      does: 'Coordinates national regulators and standard-setters after the G20.' },
    { abbr: 'BCBS', name: 'Basel Committee on Banking Supervision', role: 'prudential',
      does: 'Bank capital and liquidity standards, hosted at the BIS. Sets what national prudential regulators implement.' },
    { abbr: 'IOSCO', name: 'International Organization of Securities Commissions', role: 'conduct & securities',
      does: 'Securities regulation standards. Members include ASIC, FCA, SEC and SEBI.' },
    { abbr: 'FATF', name: 'Financial Action Task Force', role: 'anti-money-laundering',
      does: 'AML standards. The virtual asset service provider regimes appearing across these silos are FATF-aligned.' },
    { abbr: 'IAIS', name: 'International Association of Insurance Supervisors', role: 'prudential',
      does: 'Insurance supervision standards.' }
  ]
};

/** exactly one per jurisdiction — the body that decides if a commentary site is inside its perimeter */
export const perimeterBody = (code: JCode): Body | undefined =>
  REGULATORS[code].find((b) => b.publisherRelevant);

export const byRole = (code: JCode) => {
  const out = new Map<Role, Body[]>();
  for (const b of REGULATORS[code]) {
    if (!out.has(b.role)) out.set(b.role, []);
    out.get(b.role)!.push(b);
  }
  return out;
};

export const inTransition = () =>
  (Object.keys(REGULATORS) as JCode[])
    .flatMap((c) => REGULATORS[c].filter((b) => b.status && b.status !== 'stable').map((b) => ({ code: c, body: b })));
