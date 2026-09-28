---
jurisdiction: "uk"
title: "A tokenised pound is only a pound if the protections travel with it"
dek: "UK banks say they have run the first live customer payments in tokenised sterling deposits. The engineering is the easy half. Nobody has published whose promise the token is, or what happens when the issuer fails."
kicker: "Tokenised deposits"
author: "FinOpine desk"
date: 2026-09-28
plainly: "Money in a bank account is really a promise from that bank to pay you, backed by rules and a government-run compensation scheme if the bank collapses. Some UK banks have now run their first real customer payments using a new format for those balances, recorded as digital tokens that can move instantly and follow instructions written in software. What has not been made public is whether the protections that come with an ordinary bank balance apply to the new tokens."
viewInBrief: "Getting the first tokenised sterling payment to work is easy; saying whose promise the token is, and whether the deposit compensation scheme covers it, is the part that matters. That paragraph should have been published first."
callToAction: |
  The banks in this consortium should publish the terms of the token alongside the press release — legal characterisation, protection status, transferability between institutions, and treatment on issuer failure — before the pilot widens beyond its current participants. The Bank of England and the Financial Conduct Authority should state, jointly and in writing, whether a tokenised sterling deposit is an eligible deposit, and should say so now rather than in a discussion paper next year.
  
  If the answer is yes, the industry has a genuine competitive advantage over private stablecoins and should be shouting about it. If the answer is "it depends on the design", customers are entitled to know which design just moved their money.
position: |
  The milestone being claimed here is the wrong one. Moving a tokenised pound from one customer to another is a solved engineering problem; what is not solved, and what has not been published, is the legal characterisation of the token — whether the holder ends up with a claim on their own bank or on somebody else's, whether that claim is an eligible deposit for compensation purposes, and how the interbank leg is actually extinguished.
  
  This matters because pilots set defaults. The redemption logic, the message format and the treatment of a failed issuer get designed once, at small scale, and then inherited by everything built on top. If the protections that make a bank deposit acceptable at face value do not travel with the token, the industry will have built something that looks like money, is marketed as money, and behaves like a private credit instrument at exactly the wrong moment.
falsifier: |
  I would be wrong if the participating banks, or the Bank of England and the Financial Conduct Authority, publish during the life of this pilot a document stating plainly that the tokens are eligible deposits for compensation purposes, naming which institution owes the holder after a transfer between customers of different banks, and setting out how the token is treated if the issuer enters resolution.
  
  If that document appears, my objection collapses to a complaint about sequencing rather than substance, and the pilot becomes the model for how this should be done: terms first, transactions second. If it does not appear before the pilot widens beyond a controlled group, the ambiguity is a choice.
readMins: 4
tags: ["tokenisation","banking","payments"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48467/uk-banks-pilot-tokenised-deposit-transactions?utm_medium=rssfinextra utm_source=finextrafeed"
draft: false
sources:
  - label: "UK banks pilot tokenised deposit transactions"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48467/uk-banks-pilot-tokenised-deposit-transactions?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that UK banks have collaborated to complete what they describe as the first live customer transactions using tokenised sterling deposits, and that the announcement is of completed transactions rather than of published terms."
    retrievedAt: "2026-09-28"
    date: "2026-09-24"
    verified: true
---

## The first payment was never the hard part

Banks have been moving sterling between customers electronically for half a century. What is new in the pilot announced this week is the container: a deposit recorded as a token on a shared ledger, transferable under conditions written in code rather than instructed through a batch file. UK banks say they have collaborated to complete the first live customer transactions using tokenised sterling deposits. That is genuine engineering, and it works.

The engineering was the easy half. The hard half is the sentence nobody has published: after the token moves, who owes the holder the money?

## A deposit is a promise, not a substance

Money in a bank account is not a pile of pounds sitting somewhere with your name on it. It is a promise by one specific institution to pay you on demand. That promise is accepted at face value by everyone, without anyone checking the bank's books, because of scaffolding built up over a century: capital requirements, supervision, resolution powers that let the authorities take a failing bank apart over a weekend, and a compensation scheme that pays eligible depositors up to a statutory limit if all of that fails.

None of that scaffolding attaches to a database format. It attaches to a legal relationship. Tokenising the record of a deposit does not automatically carry the protections across; whether it does depends entirely on the terms of the token, and those terms are the one thing an announcement of a successful transaction does not tell you.

## Whose claim is it after the transfer?

Here is why this is not a lawyer's quibble. The whole point of tokenised deposits is that value can move between customers of *different* banks, instantly, against simultaneous delivery of an asset or the discharge of a contract. At the moment of that transfer there are only two possibilities.

Either the receiving customer now holds a claim against the sending customer's bank — an institution they did not choose, whose creditworthiness they never assessed, with a claim that may sit outside any protection limit they thought applied to them. Or the token is redeemed at the issuing bank and re-issued by the receiving bank, with the interbank difference settled in central bank money, in which case the token is a messaging improvement wrapped around the existing plumbing.

Those are radically different products. They carry different credit risk, different failure modes and different regulatory homes. They are currently being described by the same two words. Which one has just gone live with real customers is the first question a supervisor should ask, and the answer belongs in public.

## Three words doing a lot of work

"Tokenised" is doing the least work of the three. "Deposit" is doing the most, because it is the word that borrows a century of public trust and statutory protection. "First" is doing the sneakiest work, because in payments, first tends to become default: the redemption rule, the settlement finality convention and the treatment of a token issued by a bank that subsequently fails get chosen once, in a pilot, by engineers with a deadline, and then everything built afterwards inherits them.

This is also the context in which Europe is arguing about whether to embrace privately issued stablecoins. Tokenised deposits are the banking industry's answer to that argument, and it is a good answer — same money, better plumbing, existing regulatory perimeter. But the answer only works if the second half is true. A tokenised deposit whose protection status is undocumented is not obviously safer than a stablecoin whose reserve composition is disclosed monthly.

## The case against this argument

The strongest objection is proportionality. This is a pilot. The sums will be small, the customers will have consented, and the participants are supervised institutions who did not do this without telling anyone. English law characterises financial instruments by their substance rather than the technology used to record them, so if the customer has a claim on a bank repayable on demand, it is a deposit, and protection follows automatically. Demanding a published rulebook before a controlled experiment is exactly the reflex that makes people complain the UK talks about innovation and delivers consultations.

That objection is mostly right, and it still loses. If substance governs, then saying so publicly costs the participants nothing. A paragraph confirming that holders of these tokens are depositors of a named bank, protected on the same terms as any other balance, and describing what happens to an outstanding token if the issuer fails, is not a regulatory burden. It is a product disclosure. The reason it has not appeared is more likely that the question is genuinely unresolved — and if it is unresolved, "live customer transactions" is the wrong stage to still be resolving it.

## What would settle it

One document, four facts: which institution owes the holder before and after a transfer; whether the claim is an eligible deposit; how the interbank leg is extinguished and in what money; and the order of events if an issuing bank enters resolution with tokens outstanding. Every participant already knows the answers, or has discovered that they do not.
