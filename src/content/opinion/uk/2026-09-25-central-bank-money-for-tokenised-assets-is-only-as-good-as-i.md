---
jurisdiction: "uk"
title: "Central bank money for tokenised assets is only as good as its opening hours"
dek: "The Eurosystem's Pontes puts central bank money behind tokenised trades. Whether that counts as settlement depends on when the cash leg is final, and on who is allowed to hold it."
kicker: "Settlement"
author: "FinOpine desk"
date: 2026-09-25
plainly: "Banks and market infrastructures settle large trades using money held at the central bank, because a balance at the central bank cannot fail. Some markets are moving to \"tokenised\" assets recorded on new digital ledgers, where trades can in principle settle instantly at any hour. The European Central Bank has launched Pontes, which lets those tokenised trades be paid for in central bank money."
viewInBrief: "Saying tokenised trades settle in central bank money means little until the ECB says when the cash leg becomes final and who may hold it. If the euro side keeps business hours, private tokens will keep the nights and weekends."
callToAction: |
  The Eurosystem should publish, for Pontes, three specific things: the operating hours during which the euro leg achieves finality, the exact moment finality occurs relative to the asset leg and what happens if one leg fails after the other has moved, and the criteria determining which institutions may hold the cash side directly rather than through an account-holding bank.
  
  The Bank of England should answer the same three questions for sterling, in public, before the UK's tokenised issuance market settles into private-token habits that will be expensive to reverse.
position: |
  The Eurosystem has answered the easy half of the tokenisation question — yes, wholesale tokenised transactions can settle in central bank money — and left the hard half unstated. The hard half is timing and access: at what moment the cash leg becomes final, whether that moment is the same one at which the asset moves, and which institutions are permitted to be on the cash side at all. A link between a token platform and a settlement system that opens on business mornings does not give tokenised markets central bank finality at three on a Sunday. It gives them a queue.
  
  That matters because the gap between the two legs is not an inconvenience; it is a credit exposure, and somebody is carrying it. If the exposure is carried by a commercial bank standing between the platform and the central bank, then the thing being used as settlement money in the interval is a claim on that bank, not on the central bank — which is precisely the arrangement tokenisation was sold as replacing. Publishing the operating hours, the finality moment and the access criteria would tell the market whether Pontes is a settlement asset or a settlement promise.
falsifier: |
  I am wrong if the Eurosystem publishes Pontes specifications showing the euro leg is final at the same instant as the asset leg, with no provisional window, available outside standard settlement-system operating hours including weekends, and with access criteria that admit non-bank market participants directly rather than only through an account-holding bank.
  
  If that document appears, the objection collapses: the cash leg would no longer be the binding constraint on tokenised market design, and the incentive to settle euro trades in privately issued tokens at nights and weekends largely disappears. I would then be arguing about capacity and pricing, not about whether this is settlement.
readMins: 4
tags: ["tokenisation","settlement","central banking"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48439/eurosystem-brings-central-bank-money-to-tokenised-finance?utm_medium=rssfinextra utm_source=finextrafeed"
draft: false
sources:
  - label: "Eurosystem brings central bank money to tokenised finance"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48439/eurosystem-brings-central-bank-money-to-tokenised-finance?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that the European Central Bank launched Pontes on 21 September 2026, a solution enabling wholesale transactions in tokenised assets to be settled in central bank money."
    retrievedAt: "2026-09-25"
    date: "2026-09-21"
    verified: true
---

## The cash leg keeps office hours

The pitch for tokenised markets is that a security and the money paying for it move in one instruction, instantly, at any hour, with no gap in which either side can fail. The pitch for central bank money is that it is the only claim that never defaults. Put the two together and you get the strongest settlement arrangement anyone has designed. Put them together badly and you get a token that moves at three on a Sunday morning waiting for a payment system that opens on Monday.

The Eurosystem announced Pontes on 21 September: a solution that lets wholesale transactions in tokenised assets settle in central bank money. That is the right ambition and the right institution to have it. Wholesale settlement — banks and market infrastructures paying each other, as opposed to shop tills and card terminals — is where finality actually matters, because the sums are large, the counterparties are few, and a failed leg propagates. Central bank money is the asset that makes finality real: a balance at the central bank cannot be a claim on a firm that might not open tomorrow.

But "settled in central bank money" is a phrase doing an enormous amount of work, and the announcement as reported does not say when.

## Two ways to do this, and they are not equivalent

There are broadly two architectures. One puts central bank money onto the ledger where the asset lives, so that both legs move in the same atomic operation: either the whole trade happens or none of it does. The other leaves central bank money where it has always been and builds a link — the asset platform triggers a payment in the existing settlement system, and when that payment confirms, the asset is released.

The second is easier, safer for the central bank, and inherits everything. It inherits the settlement system's calendar, its cut-off times, its holidays and its liquidity management rules. During the interval between instruction and confirmation, the trade is not settled. It is pending. Someone is exposed, and in practice that someone is whichever bank has agreed to stand between the platform and the central bank account.

That is not a technicality. It is the entire question. A market that can only achieve central bank finality between nine and five on weekdays will keep doing what it already does outside those hours: settling in privately issued tokens, deposit tokens or stablecoins, and treating the central bank leg as an end-of-day tidy-up. The interim design becomes the permanent design, because it is good enough on Tuesday and the only option on Saturday.

## Who is allowed on the cash side

The second unstated question is access. Central bank accounts are rationed, and for good reasons — supervision, anti-money-laundering obligations, operational risk. But the composition of tokenised asset markets is not the composition of the existing banking system. Issuers, non-bank market makers, asset managers and infrastructure operators are all on these platforms. If only banks with central bank accounts can hold the cash leg, every other participant settles in a claim on one of those banks.

That reproduces, inside the new plumbing, exactly the tiering the old plumbing has. It may be defensible. It is not what most people hear when they are told a tokenised trade settled in central bank money.

## The case for doing it this way anyway

The strongest argument against my complaint is that central banks should not rebuild their core settlement infrastructure to suit a market that is still small. Running a real-time gross settlement system around the clock is not a software problem; it means staffing, incident response, collateral valuation and intraday liquidity provision at three in the morning, and banks themselves would have to fund positions on a Sunday. Central banks that moved fast on retail digital currency designs have mostly found the demand was not there. Conservatism about the safest asset in the system is a feature.

All true, and none of it is an argument for ambiguity. If Pontes settles on business days within defined hours, that is a legitimate policy choice — say so, precisely, and let market participants price the overnight gap rather than assume it away. The danger is not that the Eurosystem chose the cautious architecture. It is that the market reads the word "settled" and builds products assuming a finality that arrives several hours later than they think.

## The sterling question is the same question

Britain is not a spectator here. The Bank of England holds the sterling side of exactly this problem, and the sequencing is unforgiving: once a tokenised issuance market has grown up settling against private tokens because no central bank option was available at the hours it trades, the habit is set and central bank money arrives as an optional upgrade. The Eurosystem has now put a marker down. The useful response is not a press release matching it but a published answer on hours, finality and access — the three things that determine whether central bank money is actually the settlement asset or merely the one quoted in the brochure.
