---
jurisdiction: "us"
title: "SoFi can call it a deposit. Someone still has to find the depositor"
dek: "A national bank has issued a consumer tokenised deposit a day after the comptroller banned stablecoin yield. The protection customers are being sold attaches to the bank's records, not to the token."
kicker: "Tokenised deposits"
author: "FinOpine desk"
date: 2026-10-23
plainly: "When you put money in an American bank, what you really own is a promise from that bank to pay you back, and a government agency insures that promise up to a limit if the bank fails. SoFi, an online bank, has begun issuing that promise as a digital token that can sit in a wallet and be moved around. It says it is the first such product offered to ordinary customers rather than big institutions."
viewInBrief: "Calling it a deposit only helps if the bank can still prove, overnight, who the depositor is. SoFi should publish how ownership is recorded, and the deposit insurer should say how it would pay out, before tokens like this spread."
callToAction: |
  SoFi should publish, before the product scales, the plain-English terms: whether the token can be held by anyone who is not already its customer, who is named as depositor on its account records at each moment, and what happens to the holder of a token in transit if the bank closes on a Friday. The Federal Deposit Insurance Corporation should go first and say, in guidance rather than in a resolution, how it would determine insured ownership of a tokenised deposit — and the comptroller, having just finished writing rules for stablecoins, should not leave the bank-issued alternative it has just privileged without the same specificity.
position: |
  A tokenised deposit is only a deposit if the bank can say, at any moment and without the holder's help, who the depositor is. Deposit insurance in the United States is not a property of money; it is a determination made from a failed bank's account records over a weekend. SoFi has launched the first consumer-facing version of this product in the week the Office of the Comptroller of the Currency closed the yield door on stablecoins, which is exactly why the question matters now: policy has deliberately routed tokenised retail money into banks, and nobody has published how the insurance determination works when ownership sits on a ledger.
  
  If the token cannot leave SoFi's own books, it is a database migration with a ticker, and the marketing is doing more work than the technology. If it can leave, then the bank has created a claim on itself that moves without passing through the app — at the same moment the largest banks are blocking outside software agents from touching accounts at all. Both answers are defensible. Only one of them is being advertised, and the bank has not said which.
falsifier: |
  I am wrong if SoFi publishes product terms showing the token is transferable only between customers whose accounts SoFi already maintains, with the bank's deposit account records naming the beneficial owner continuously — or if the Federal Deposit Insurance Corporation publishes guidance setting out how it would determine insured ownership of a tokenised deposit at closing. Either would mean the hard question has an answer in writing.
  
  If that appears, the critique collapses to a labelling complaint and the product deserves to be treated as ordinary banking. If it does not appear, and the token trades to holders the bank cannot identify, the first failure of an issuing bank will be the test — and that is the worst possible place to discover the records do not resolve.
readMins: 4
tags: ["tokenised deposits","deposit insurance","banking"]
generated: true
groundedIn: "https://www.finextra.com/pressarticle/111421/sofi-launches-tokenised-deposits?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "SoFi launches tokenised deposits"
    publisher: "Finextra"
    url: "https://www.finextra.com/pressarticle/111421/sofi-launches-tokenised-deposits?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that SoFi Technologies launched SoFi Earn (SOFIE) on 22 October 2026, describing it as the first national bank-issued tokenised deposit aimed at consumers, a day after the OCC finalised its stablecoin rule barring issuers from paying yield directly to holders."
    retrievedAt: "2026-10-23"
    date: "2026-10-22"
    verified: true
---

## A day apart

On Tuesday the Office of the Comptroller of the Currency, the regulator that charters national banks in the United States, finalised a rule barring stablecoin issuers from paying yield directly to the people holding their coins. On Wednesday a national bank launched a consumer token with the word *Earn* in its name.

That is not a loophole. It is the rule working as designed. A stablecoin is a payment instrument its issuer must back and must not pay you for holding. A deposit is a loan you make to a bank, and banks have paid interest on those since there were banks. Draw the line there and you have told the market, clearly, that tokenised retail money which pays anything must be issued by a bank and sit inside the bank perimeter. The digital-asset custodians say the same thing from the other side: the banks knocking on their doors are asking about stablecoins and tokenised deposits in the same breath, and the ones who are conservative pick the deposit.

So the policy has succeeded in steering the product. What it has not done is specify the product.

## The word doing the work

When an American puts money in a bank, they do not own money sitting in a vault. They own an unsecured claim on the bank, and the Federal Deposit Insurance Corporation — the government body that insures those claims — guarantees it up to a limit per depositor. The guarantee does not attach to the dollars. It attaches to a name on the bank's account records.

That is the whole mechanism, and it is a records mechanism. When a bank fails, the insurer takes the deposit ledger, works out who owns what and in which ownership category, and makes insured balances available, usually by the next business day. It can only do that because the failed bank's own books say who the depositor is. There is no second source of truth.

A token is a second source of truth. That is its point. It settles on a ledger, it can be held in a wallet, and the holder of the key is the one who can move it. The entire reason to tokenise a deposit rather than leave it as a line in a core banking system is that the token can go somewhere the core system is not. The moment it does, the bank's account records and the actual ownership of the claim are two different facts that have to be reconciled — and reconciled fast enough to survive a Friday-night closure.

## The question the weekend asks

So there are only three possible designs, and they have very different consequences.

The token moves only between customers the bank already onboarded, on infrastructure the bank controls. Then the records never diverge, insurance determination is unaffected, and the product is a conventional deposit with a new interface. Entirely sound, and considerably less interesting than the launch language suggests.

The token moves to third parties, but the bank re-registers the holder on its own books at every transfer. That works, and it means the ledger is not really bearer at all — every transfer needs the bank's identity checks, which is precisely the friction tokenisation is sold as removing.

Or the token moves freely and the bank reconciles afterwards. In that case the bank cannot, at an arbitrary moment, name its own depositors. The claim remains a claim on the bank. Whether the insurance determination can be made on it in a weekend is not something a bank gets to decide in a press release.

SoFi's own framing — the first tokenised deposit issued by a national bank *for consumers* — concedes that earlier versions were not for consumers. Institutional tokenised deposits move between a handful of identified counterparties under negotiated contracts. Retail is the opposite: many small holders, no bespoke agreements, and a statutory limit applied per depositor per ownership category. The consumer step is the step that makes the records question bite.

## The case for calm

The strongest answer is that none of this is new. Banks have long had deposits whose ownership record sits with somebody else — brokered deposits, prepaid programmes, fintech partner accounts. The insurer has decades of experience reconstructing beneficial ownership from third-party ledgers, and it has rules requiring banks to be able to produce those records.

That is true, and it is exactly the precedent that should make everyone nervous rather than relaxed. The most visible failure in recent memory of a bank-fintech arrangement was a failure of precisely that reconciliation: ledgers that did not agree, customers who could not be matched to balances, and money that took far longer than a weekend to find. The lesson from the partner-banking model is not that third-party records work. It is that they work until they do not, and the cost falls on the smallest holders.

There is also a timing oddity worth stating plainly. The largest American banks spent this week refusing to let external software agents touch customer accounts, on the grounds that they cannot yet verify what an agent is or what it will do. A consumer deposit token that can be sent by whoever holds the key is a channel out of the account that does not pass through the app those agents are blocked from. A bank cannot coherently take the strict view on one and the permissive view on the other.
