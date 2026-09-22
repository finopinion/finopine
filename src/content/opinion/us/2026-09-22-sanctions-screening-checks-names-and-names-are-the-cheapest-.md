---
jurisdiction: "us"
title: "Sanctions screening checks names, and names are the cheapest thing to change"
dek: "An FT investigation says a Kremlin-linked fintech pushed billions through international banks. The control that failed was never strong: banks match strings against lists, using data supplied by the party with a motive to lie."
kicker: "Sanctions"
author: "FinOpine desk"
date: 2026-09-22
plainly: "Banks send each other payment instructions over a messaging network called Swift. Sanctions are enforced mainly by each bank checking the names on those instructions against government lists of banned companies, and blocking matches. The Financial Times has reported that a Russian fintech called A7 got billions of dollars of payments for Russian state companies through international banks anyway."
viewInBrief: "Name-matching against lists was never a real control, because the names are supplied by whoever wants the payment to clear. Regulators should test whether screening catches disguised payments, and publish how often it does."
callToAction: |
  The US Treasury's sanctions office and the federal banking agencies should start examining correspondent banks on outcomes rather than paperwork: run probe payments through live screening, and publish aggregate detection rates by institution size, the way stress-test results are published. And Swift's central bank overseers should require that originator and ultimate-beneficiary fields be fully populated in structured form, with the sending institution — not the receiving correspondent — answerable for what it wrote.
  
  If regulators will reopen how a stress-test loss is calculated, they can reopen how a screening filter is tested.
position: |
  Sanctions enforcement in the dollar payment chain rests on string-matching: a bank compares the names typed into a payment message against a government list, and if nothing matches, the money moves. That control can only ever be as good as the information in the fields, and the fields are filled in by the institution with the strongest incentive to misdescribe them. An intermediary that is not itself designated defeats it by existing.
  
  So the interesting question raised by the A7 reporting is not whether a few compliance teams were careless. It is why supervisors test whether a screening programme exists rather than whether it works. Until someone measures detection — with test payments, published hit rates, and liability that lands on the bank that populated the originator field rather than the correspondent that received it — every fresh designation is a new name on a list that the next shell company will simply not be on.
falsifier: |
  If enforcement documents, a consent order or a bank's own filing show that the messages in question carried accurate and complete originator and ultimate-beneficiary information, and that staff saw the alerts and cleared them anyway, then this is a conduct failure and not a design failure, and my argument is wrong.
  
  Equally, if a US banking regulator publishes examination findings showing it already tests correspondent screening with injected probe payments and reports aggregate detection rates, my central complaint — that nobody measures whether the filter catches anything — falls away, and the remedy becomes enforcement of existing supervision rather than new supervision.
readMins: 4
tags: ["sanctions","payments","financial regulation"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48446/russian-fintech-a7-exploited-swift-controls-to-funnel-billion-of-dollars-in-sanctioned-payments?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "Russian fintech A7 exploited Swift controls to funnel billion of dollars in sanctioned payments"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48446/russian-fintech-a7-exploited-swift-controls-to-funnel-billion-of-dollars-in-sanctioned-payments?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "A Finextra summary of a Financial Times investigation reporting that A7, described as a Kremlin-controlled fintech, exploited Swift controls to route billions of dollars of sanctioned payments to Russian state companies through international banks."
    retrievedAt: "2026-09-22"
    date: "2026-09-22"
    verified: true
---

## A list of names, and a box to type names into

At the moment of execution, economic sanctions are a spelling test. A government publishes a list of designated companies, people and vessels. A bank compares the names written in a payment instruction against that list. If nothing matches, the money moves. That is very nearly the whole control.

The Financial Times has reported that A7, a fintech it describes as Kremlin-controlled, used that design to push billions of dollars of payments to Russian state companies through international banks that did not understand what they were processing. I have seen the summary of the investigation, not the underlying documents, and I make no claim about any particular transaction or any named bank. But the shape of the allegation is entirely plausible on the architecture alone, and that is the part worth arguing about. Nothing in the plumbing of correspondent banking is designed to stop it.

## Swift does not move money

The summary says Swift's controls were exploited. That framing is comforting because it implies a single chokepoint that somebody could tighten. Swift is a messaging network. It carries instructions between banks; the banks themselves debit and credit accounts, and the banks themselves apply the screening. "Swift controls" are mostly message standards — which fields exist, and what must be put in them — plus who is allowed to connect. The filter sits inside each institution.

That matters because of where knowledge sits. The bank that actually knows who a customer is, and who is ultimately being paid, is the first one in the chain. The bank carrying the enforcement risk for a dollar payment is the correspondent further along, which sees a message from another licensed institution and has no practical way to audit the truth of it. Trust travels down the chain. Information does not. A control placed at the end of a chain, fed by data created at the start of it, is a control in name.

## The intermediary is the product

Designation is entity-specific. Incorporation is cheap. Once you accept that sanctions are enforced by matching names, the business opportunity is obvious: be the name that is not on the list. A trading company with a clean registration, a real bank account and plausible invoices converts a blocked payment into an ordinary one, and the correspondent screens exactly what it was given and finds nothing.

This is why adding designations, which is what governments mostly do when a scandal like this breaks, is the weakest available response. Each new name is a fact about the past. The evasion layer is rebuilt in weeks for the cost of a company registration and a new set of invoices.

## What supervisors actually measure

Compare the week's other enforcement. On Friday the Federal Reserve Board issued three consent prohibition orders against former bank employees — misappropriation of customer funds at one lender, misapplication of funds at a card company, check fraud at another bank. Those are real cases and the remedies are proportionate. They are also the easy kind: individual, documented, small.

The same week, the Fed's vice chair for supervision set out potential changes to how stress-test losses are calculated and a review of the central bank's own performance before Silicon Valley Bank failed. Regulators are plainly willing to reopen the mechanics of a test when the number it produces looks wrong. Nobody applies that thinking to sanctions screening. Examination of a financial crime programme asks whether a policy exists, whether lists are refreshed, whether alerts were dispositioned within a service standard. It does not ask the only question that counts: if a disguised payment goes in, does it come out the other side?

That question is answerable. Sanctions authorities and bank examiners could inject synthetic payment messages — obfuscated in the ways real ones are, with links that a diligent reviewer could find — and record how often institutions catch them. Penetration testing is routine for computer security and unremarkable in aviation safety. Payments compliance is audited on paperwork.

## The case against this argument

The strongest objection is that banks cannot be the world's beneficial-ownership registry. Every extra verification obligation raises the cost of a cross-border payment, and banks respond to unpriceable legal risk by withdrawing: closing correspondent relationships, abandoning whole corridors, making remittances and aid payments harder for people who have done nothing wrong. Cross-border payments are already a market where fintechs compete hard on price and speed. Load more diligence onto the chain and the legitimate traffic moves or stops.

I accept the mechanism and reject the conclusion. I am not asking correspondents to verify the world; I am asking that the institution which populated the originator and ultimate-beneficiary fields carry the liability for what it wrote there, and that structured data be mandatory rather than optional. That shifts cost onto the party with the knowledge, instead of the party with the exposure. And the alternative to precise controls is not freedom — it is the blunt instrument. When targeted enforcement fails visibly enough, governments cut off whole institutions and whole jurisdictions, and it is exactly the small, legitimate, low-margin payments that die first.

A control that catches nobody is not cheap. It is expensive and useless, and it makes the crude response inevitable.
