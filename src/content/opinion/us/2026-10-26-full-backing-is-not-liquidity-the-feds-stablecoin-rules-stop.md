---
jurisdiction: "us"
title: "Full backing is not liquidity: the Fed's stablecoin rules stop one step short"
dek: "The Federal Reserve's two proposals fix what is in the box and who may open one. Neither, on the Board's own summary, settles who can get a dollar out at 11pm on a Saturday."
kicker: "Stablecoins"
author: "FinOpine desk"
date: 2026-10-26
plainly: "A stablecoin is a digital token meant to be worth exactly one dollar, used mainly to move money between people and platforms. The Federal Reserve is America's central bank and supervises many of the firms that might issue such tokens. Under a 2025 law called the GENIUS Act, it has now asked the public to comment on two draft rules: one setting what assets must sit behind each token and how much capital an issuer needs, the other creating an application process for banks that want to issue them."
viewInBrief: "Backing every token with Treasury bills fixes solvency, not speed — bills settle on business days and tokens trade around the clock. The Fed should require published redemption terms and a committed private liquidity line before it grants anyone a licence."
callToAction: |
  Before finalising, the Board should add three things to the application proposal: a filed redemption-and-liquidity plan naming a committed private provider and its size; daily public disclosure of the reserve maturity ladder and the share held in overnight cash or repurchase agreements; and published, non-discretionary direct-redemption terms — eligibility threshold, cut-off, settlement window, and the precise circumstances in which redemption may be suspended.
  
  Commenters — banks, exchanges, custodians and consumer groups alike — should answer one question on the record: what happens to a retail holder between Friday close and Monday open. And the Board should coordinate with the Comptroller of the Currency so that the same question is asked at every door, not just this one.
position: |
  The Federal Reserve's proposed framework for payment stablecoin issuers gets the asset side right — full backing in short-term Treasury bills and similar high-quality assets, plus standardised capital for credit and operational risk — and says nothing, in the Board's own summary of it, about the thing that actually breaks these instruments: the gap between a token that settles every second of every day and a reserve that settles on business days.
  
  A fully reserved issuer can still fail to pay on time, and most holders cannot present a token to the issuer at all; they exit by selling to someone else at whatever price clears. That is what a broken peg usually is. The comment period, and the tailored application process in the second proposal, are the Board's last clean chance to require published redemption terms, a daily maturity ladder, and a named, sized private liquidity arrangement before a charter is granted rather than after a weekend goes wrong.
falsifier: |
  The published text of the two proposals in the Federal Register containing a hard liquidity term — a minimum share of reserves in overnight cash or repurchase agreements, a mandated maximum redemption settlement time, or a required public maturity ladder — would show the gap I am describing is not there.
  
  If that language is in the drafts, or appears in the final rules, the Board has already done the work and this piece is wrong about what was left out. What would remain is a narrower complaint: that the press summary led with reserve composition and capital, and buried the part that matters most on a bad day.
readMins: 4
tags: ["stablecoins","federal reserve","payments"]
generated: true
groundedIn: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260924a.htm"
draft: false
sources:
  - label: "Federal Reserve Board requests public comment on two proposals related to establishing a regulatory framework for Board-supervised payment stablecoin issuers under the GENIUS Act"
    publisher: "US Federal Reserve"
    url: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260924a.htm"
    supports: "The Federal Reserve Board's 24 September press release establishes that its two stablecoin proposals cover full reserve backing in short-term Treasuries and other liquid assets, standardised capital for credit and operational risk, risk management and custody rules, and a tailored application process for Board-supervised bank issuers."
    retrievedAt: "2026-10-26"
    date: "2026-09-24"
    verified: true
---

## A stablecoin can be fully backed and still fail to pay

Put a dollar of Treasury bills behind every dollar of token, and you have solved one problem completely: solvency. You have not touched the other one. A payment stablecoin is a promise of a dollar *now*. A Treasury bill is a promise of a dollar in days, convertible to cash through a market that keeps bankers' hours, closes on weekends and takes Christmas off. The token keeps moving the whole time.

That mismatch is not a credit problem. It is a calendar problem, and no amount of backing fixes it.

On 24 September the Federal Reserve Board put two proposals out for comment, building the supervisory framework for payment stablecoin issuers it oversees under the GENIUS Act. The first requires full backing with permissible reserve assets — short-term Treasury bills and other high-quality liquid assets — sets standardised capital requirements for credit and operational risk, imposes risk management standards, writes rules for Board-supervised firms safekeeping the reserves, and clarifies what Board-supervised banks may do in this business. The second creates a tailored application process for Board-supervised banks that want to issue.

That is a serious framework. It covers what is in the box, who holds the box, and who is allowed to open one. It does not, on the Board's own account of it, cover how fast the box opens.

## The capital is not for the Treasury bills

The most underrated line in the release is the capital requirement. In a structure that is already fully reserved, equity is not there to absorb losses on government paper. It is there for the software and the custodian: a compromised key, a botched contract upgrade, a vendor failure, an erroneous issuance. The Board has resisted the obvious temptation to say that a hundred per cent reserve makes a buffer redundant, and it has made the requirement standardised rather than model-based. For a business whose loss history is measured in a handful of years, internal models would have been a joke. Good.

But capital is a cushion for losses. It is not a cushion for timing, and timing is where this instrument is fragile.

## Who can actually redeem

Ask a simple question of any proposed issuer: on a Saturday night, who can present tokens and receive dollars, in what minimum size, by when?

The honest answer in this market is that most holders cannot present anything to anybody. Direct redemption is typically for a short list of institutional counterparties above a size threshold. Everyone else exits by selling into a secondary market at whatever price clears. That is what a "depeg" usually is — not evidence that the reserve was fake, but evidence that the people holding the token could not personally convert it at par and had to find a buyer instead. The reserve can be immaculate and the screen can still read ninety-seven cents.

An issuer's options for meeting weekend demand are narrow. Hold cash at a commercial bank, and you have converted a Treasury-backed instrument into an unsecured claim on a bank — the dependency the structure was meant to avoid. Repo the bills, and you need a counterparty awake and willing at three in the morning. Wait for the market to open, and you have told holders their dollar is a weekday dollar.

None of that requires the Federal Reserve to lend to anyone. It requires the terms to be written down in advance and published, so that holders and supervisors know what they are before the queue forms rather than after.

## The case against

Two objections, and the second is strong.

The first: short-dated Treasury bills are the deepest collateral market on earth, the Board can reasonably assume an issuer can monetise them, and drafting rules for an eleven-o'clock-Saturday run is designing for the tail. The answer is that payment systems are judged entirely on bad days. Nobody is marketing these tokens as a weekday settlement rail.

The second: any pre-committed liquidity arrangement drags the public safety net towards instruments Congress deliberately declined to insure, and a stated backstop invites reliance on it. That is a real risk, and it is why the arrangement should be explicitly private — a named provider, a committed size, a stated fee, filed as part of the application, with only the issuer and its counterparty on the hook. Disclosure of a private facility is not an extension of the federal safety net. Silence about whether one exists is the thing that makes a parent bank's support ambiguous, and ambiguity is itself a run trigger.

## Why the application proposal is the leverage point

Entry is the one moment a supervisor has complete bargaining power. The second proposal — the tailored application process — is where a redemption-and-liquidity plan belongs, because once the charter is issued the Board is negotiating with an incumbent.

It also matters because this is not the only door. Firms are already walking through the Office of the Comptroller of the Currency's national trust charter instead, and a buy-now-pay-later lender has applied for one after abandoning a state industrial-loan route. If the Federal Reserve's door asks the hard question about weekend redemption and the other doors do not, applicants will simply queue elsewhere, and the tightest regime will supervise the smallest share of the market.
