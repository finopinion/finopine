---
jurisdiction: "uk"
title: "Tokenised collateral solves the easy half of a margin call"
dek: "The Bank of England says tokenised collateral must be capable of being valued, transferred and realised under stress. Only the third verb is hard — and it is the one a digital ledger does least for."
kicker: "Clearing"
author: "FinOpine desk"
date: 2026-10-29
plainly: "When banks and funds trade derivatives, a clearing house sits in the middle so that if one side fails, the other is still paid. To back that promise it holds collateral — assets lodged as security, usually cash or government bonds, which it sells if a member collapses. The Bank of England has asked for views on letting UK clearing houses hold that collateral in digital, ledger-based form instead."
viewInBrief: "Moving collateral faster is useful, but the hard part of a default is selling it, and a digital ledger does not help with that. The Bank should make each approved arrangement prove itself in a live default drill, not a paper review."
callToAction: |
  Before the consultation closes on 12 February 2027, the Bank of England should add two things to the proposed supervisory statement. First, a requirement that every approved tokenised collateral arrangement be exercised in the clearing house's default management rehearsal — an actual on-ledger seizure, transfer and sale under a simulated member failure, with the elapsed time recorded and reported to the Bank. Second, publication, at least in anonymised category form, of what has been approved and what additional haircut was applied for ledger and legal risk.
  
  And the Bank should actively seek responses from clearing members and their end clients, not only from the clearing houses applying. The members fund the default waterfall. They should get a say before the collateral they stand behind changes shape.
position: |
  The Bank of England is right that it does not need a bespoke rulebook for tokenised collateral, and right that the test is whether the asset can be valued, transferred and realised in stressed conditions. But the gain tokenisation offers is in transfer, which was never the binding constraint. The constraint is realisation: turning the asset into cash during a member default, when the clearing house is selling into a market that wants cash too. A ledger makes the first leg faster and does nothing for the second — and it adds a new failure point, the ledger itself, that existing collateral haircuts were never calibrated to price.
  
  That matters because collateral acceptance at a central counterparty is not a private risk decision. If seized collateral cannot be realised inside the default window, the shortfall runs into a default fund paid for by every clearing member, including the ones who never touched a token. So a supervisory judgement made firm by firm, behind closed doors, on a principle flexible enough that different arrangements may reach the same outcome in different ways, is a judgement whose cost falls on people who cannot see it being made.
falsifier: |
  I am wrong if the final supervisory statement requires each approved tokenised collateral arrangement to be exercised in a clearing house's default management rehearsal — an actual on-ledger seizure and sale under a simulated member failure, not a documentary assessment — and requires the Bank or the clearing house to publish the category of arrangement approved and any additional haircut applied to it.
  
  If that appears in the final text after the consultation closes on 12 February 2027, the opacity objection falls away and the flexible, outcomes-based approach is the correct one. If the final statement reads as the consultation does, with realisation treated as a condition asserted rather than a drill performed, the objection stands.
readMins: 4
tags: ["clearing","tokenisation","financial-stability"]
generated: true
groundedIn: "https://www.bankofengland.co.uk/news/2026/october/bank-of-england-sets-out-approach-to-tokenised-collateral-in-central-clearing"
draft: false
sources:
  - label: "Bank of England sets out approach to tokenised collateral in central clearing"
    publisher: "Bank of England"
    url: "https://www.bankofengland.co.uk/news/2026/october/bank-of-england-sets-out-approach-to-tokenised-collateral-in-central-clearing"
    supports: "The Bank of England's 29 October 2026 news release launching a consultation, closing 12 February 2027, on a proposed supervisory statement for central counterparties accepting tokenised eligible collateral — including its view that the existing framework is not a barrier, the requirement that collateral remain capable of being valued, transferred and realised in stressed conditions, the same risk/same regulatory outcome principle, and Sarah Breeden's quoted statement."
    retrievedAt: "2026-10-29"
    date: "2026-10-29"
    verified: true
---

## Three verbs, and only one of them is hard

The Bank of England's consultation turns on a single sentence: tokenised collateral must remain capable of being valued, transferred and realised when needed, including in stressed conditions. Two of those are engineering problems. The third is a market problem, and no ledger ever built has solved it.

Start from zero. A central counterparty, or clearing house, sits in the middle of derivatives and securities trades so that if one side collapses the other is still paid. To make that promise good it collects margin — assets lodged as security, sized to cover what it would cost to replace a failed member's positions. Usually cash or government bonds. If a member does fail, the clearing house seizes that collateral and sells it, and if the proceeds fall short, the shortfall is met from a default fund contributed by the surviving members.

On 29 October the Bank launched a consultation, closing on 12 February 2027, setting out how it would assess clearing houses that want to accept eligible collateral in tokenised form — the same underlying asset, recorded on a digital ledger rather than a conventional register. Its view is that the existing framework is not a barrier, provided the standards are met. Sarah Breeden, the Deputy Governor for Financial Stability, framed it as delivering the Bank's secondary objective for innovation in market infrastructure while maintaining stability.

## The benefit is real, and it is on the wrong side of the trade

The case for tokenisation here is mobilisation: a firm facing a margin call can move eligible assets to the clearing house faster, across time zones and borders, instead of waiting on settlement cut-offs. That is a genuine improvement, and in an intraday margin call it is worth having.

But notice which direction it runs. Faster mobilisation helps collateral get *in*. The default is about collateral getting *out* — being converted to money, at a price close to the one the haircut assumed, in the days after a member fails. That conversion depends on there being a buyer with cash at that moment. A token of a gilt still has to find that buyer. A token of something thinner finds one more slowly, and the ease of transferring it on a ledger does not change the depth of the market underneath.

So tokenisation improves the half of the collateral lifecycle that was already working and leaves the half that defines the whole exercise exactly where it was.

## The wrapper is the whole question

The natural reply is that the asset is unchanged, so the risk is unchanged. That reply gives the game away. If the asset is unchanged, every new risk in the arrangement is in the wrapper: who operates the ledger, whether a transfer recorded on it is a legally effective transfer of title in an English insolvency, what happens if the operator is unavailable on the morning the default is declared, and whether the clearing house's control over the token survives the failure of whoever is holding the underlying.

Haircut methodologies price the asset — its price volatility, its liquidity, the time needed to sell it. They do not price "the register may not respond." That is an operational and legal risk sitting on top of a market risk, and it is novel, which means it is not in the historical data any haircut model is fitted to.

## The applicants are not the ones who pay

Here is the structural problem with assessing this case by case. A clearing house that accepts a new form of collateral is making a decision whose downside is mutualised. If realisation falls short, the default fund absorbs it, and that fund belongs to the members. A pension scheme clearing through a member bank has no view on which ledger arrangements were approved, no standing in the application, and a direct financial interest in the answer.

The Bank's chosen principle — same risk, same regulatory outcome, with different arrangements potentially reaching that outcome differently — is defensible as supervision. It is weak as accountability. Flexibility of that kind can only be checked by someone who can see both the arrangement and the outcome, and under a firm-by-firm approvals process, nobody outside the Bank and the applicant can see either.

## The case against this argument

The strongest objection is that a prescriptive tokenisation rulebook would be worse. It would freeze a moving technology, bless whichever design happened to exist in 2027, and push the business to jurisdictions that wrote nothing. Technology neutrality is the right instinct, and the Bank deserves credit for not inventing a parallel regime for what is, legally, the same gilt.

The second objection is incentives. A clearing house wears the loss before the default fund does, after the defaulter's own margin is exhausted. It has every reason to be conservative about what it will take.

Both are fair. But competition between clearing houses for members runs partly on what collateral they will accept, and eligibility is precisely where a race shows up first. Good incentives are not the same as verified outcomes — and the Bank has proposed a standard that can only be verified by testing it.

## What would settle it

Clearing houses rehearse member defaults. The obvious requirement is that any tokenised collateral arrangement be rehearsed too: seized on the ledger, transferred, and sold, under a simulated default, with the time taken recorded. Not a legal opinion that realisation is possible. A demonstration that it happened.
