---
jurisdiction: "us"
title: "A bank deposit on a public chain is still just the bank's promise"
dek: "JP Morgan has put its deposit token on Ethereum. The network is public; the guarantee behind the token is not. Banks doing this should publish, in one page, exactly what travels with the token."
kicker: "Payments"
author: "FinOpine desk"
date: 2026-10-20
plainly: "JP Morgan is one of the largest banks in the United States. For years it has issued a \"deposit token\" — an electronic marker representing dollars sitting in an account at the bank, which clients can pass between each other on a computer ledger. That ledger used to be the bank's own private system. It has now been extended onto Ethereum, a public network that anyone can read and build software on."
viewInBrief: "A deposit token on a public blockchain is still a promise from one bank, not a guarantee from the network. Before this becomes normal, banks should state in one page who may hold it, when a transfer is final in law, and what happens if the bank fails."
callToAction: |
  JP Morgan should publish a short, public holder's statement for its deposit token — eligibility to hold, the moment of legal finality, the bank's power to freeze or reverse, and the treatment of holders in receivership — and keep it current as the token spreads to new networks. The Office of the Comptroller of the Currency should make that statement a condition of any national bank issuing deposit tokens on a permissionless network, and say so before the second bank follows.
  
  The Federal Deposit Insurance Corporation should state, separately and in plain English, whether and how deposit insurance records are determined when the holder of record is an address rather than a named customer. If the answer is "it depends on the arrangement", that is exactly the answer the market needs in writing now, not after a failure.
position: |
  Moving a deposit token onto a permissionless public network changes the plumbing, not the promise. What a holder owns is a claim on a bank, governed by the bank's contract and by US banking law, and nothing a public blockchain does to a transaction record alters that. The chain can give you a confirmed block in seconds; only the bank and the law can tell you whether the deposit has legally moved, whether it can be reversed, who is permitted to hold it, and what happens to the holder if the issuing bank fails.
  
  That gap matters because the whole appeal of a public chain is that you need not trust the counterparty's systems. Here you must. If tokenised deposits become ordinary collateral in markets that settle around the clock, the difference between a block confirmation and legal finality will be discovered in a stress episode rather than in a contract. Regulators should force it into the open now, while the volumes are small and the issuer is one of the best-capitalised banks in the country.
falsifier: |
  I am wrong if JP Morgan — or any bank following it onto a public network — publishes a plain-language holder's statement setting out eligibility to hold, the moment of legal finality, whether and how transfers can be reversed or frozen, and the treatment of token holders in receivership, and if the Office of the Comptroller of the Currency confirms that such a statement is required of national banks issuing deposit tokens on public networks.
  
  If that appears, the disclosure problem is solved and my complaint collapses into a question of adoption, which is the market's business and not mine. If instead the terms stay inside client agreements that nobody outside the counterparty list ever reads, the argument stands and gets stronger with every bank that copies the move.
readMins: 4
tags: ["payments","banking","digital assets"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48607/jp-morgan-brings-jpm-coin-to-ethereum?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "JP Morgan brings JPM Coin to Ethereum"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48607/jp-morgan-brings-jpm-coin-to-ethereum?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that JP Morgan has brought its deposit token product, JPM Coin, onto the Ethereum layer 1 public blockchain, reported 19 October 2026; the Ramp trust charter application and the ICBA lawsuit against the OCC come from a separate item in the same feed."
    retrievedAt: "2026-10-20"
    date: "2026-10-19"
    verified: true
---

## A token is only as good as the bank behind it

Putting a bank deposit on a public blockchain does not turn it into public money. It turns it into a bank deposit with a new address.

JP Morgan has extended JPM Coin — its deposit token, meaning a digital marker that stands for dollars held in an account at the bank — onto Ethereum's main public network. Until now that kind of token lived on ledgers the bank itself ran, among clients the bank itself admitted. Ethereum is different in one specific way: anyone can read it, anyone can build software against it, and the network does not ask who you are before it processes a transaction.

That is a real engineering gain. It is also the source of the confusion I want to head off. A public chain's selling point is that you do not have to trust your counterparty's back office. With a deposit token you do. The token is a claim on one bank, enforceable under that bank's contract and under United States banking law. The network is a messaging system with a shared ledger attached. It does not issue the dollars, it cannot honour them, and it has no view on what happens if the issuer fails.

## Confirmation is not finality

Here is the thing that will matter when something goes wrong. On a blockchain, a transaction is "final" when the network has settled on a version of history that will not be rewritten. In banking, a payment is final when the law says the payee's claim is good and cannot be unwound — which is a question about contracts, rulebooks and insolvency statutes, not about blocks.

Those two kinds of finality are not the same thing and need not arrive at the same moment. A deposit token transfer is, in substance, an instruction to a bank to move a deposit from one holder to another. If the bank can freeze a balance, decline to recognise a transfer to an ineligible holder, or reverse an entry after the chain has confirmed it, then the chain's finality is a display, not a guarantee. That is not necessarily wrong — banks have to be able to do those things, under sanctions law and anti-money-laundering rules — but it is the opposite of what the surrounding technology advertises.

So the questions that matter are not technical. Who is permitted to hold the token, and what happens if it reaches someone who is not? At what moment does the law treat the payment as made? Can the bank reverse an entry, and on what grounds? And in a receivership, is the holder of record the person holding the token, or someone else? None of those are answered by the choice of network, and all of them determine what the instrument is actually worth to the person holding it at two in the morning.

## The other half of the same fight

This lands in the middle of an argument American regulators are already having from the opposite direction. Non-bank firms have been queueing at the Office of the Comptroller of the Currency for national trust charters — Ramp, the corporate spend management company, filed one last week, saying it would offer fiduciary investment management and digital-asset custody without taking deposits or making commercial loans. The Independent Community Bankers of America has sued the comptroller over the influx, arguing that the agency is letting digital-asset businesses into the banking system through a lightly regulated side door.

Set the two movements next to each other. Fintechs are seeking bank charters to custody digital assets. A bank is putting deposits onto the rails those firms built. They are converging on the same product from different ends, and the regulatory question is identical in both cases: what protections attach to the balance, and who has to say so out loud. The community banks' complaint is essentially about disclosure and parity. It applies to a national bank issuing a token on a public chain just as much as to a trust company custodying one.

## The case for leaving it alone

The strongest objection is that this is plumbing, and the disclosure already exists. A deposit token is used by institutional clients who negotiate documented agreements with a bank's legal department. They are not retail savers; they can read a contract and price the risk. Piling a new public disclosure requirement on top of that slows down a legitimate modernisation of correspondent banking and nudges activity towards stablecoin issuers that face thinner obligations than a national bank does.

That argument is good on the facts and weak on the direction of travel. The point of moving to a public network is precisely that the token can end up in software, and in hands, that the issuer did not individually paper. The moment a tokenised deposit is pledged as collateral by someone who is not the bank's direct client, the contract between those two parties stops being a complete account of what anyone holds. And the broader risk is categorical confusion: if the market cannot tell at a glance which tokenised dollar is an insured bank deposit, which is a bank liability outside insurance limits, and which is a non-bank issuer's promise, the resulting mistake will not be a paperwork error. It will be a run on the wrong thing.

One page would fix it. The absence of that page, not the choice of blockchain, is what is actually new here.
