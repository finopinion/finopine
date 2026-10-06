---
jurisdiction: "au"
title: "A tokenised deposit is still a promise from ANZ. Publish the rulebook"
dek: "ANZ says it has moved corporate money across borders on Swift's blockchain ledger. The technology clearly works. What nobody has published is what the holder owns, and at what moment the payment becomes final."
kicker: "Payments"
author: "FinOpine desk"
date: 2026-10-06
plainly: "Swift is the global network banks use to send each other instructions to move money across borders; it carries messages, not cash. A tokenised deposit is ordinary money held at a bank, recorded as a digital token on a ledger several institutions share rather than only in that bank's own books. ANZ, a major Australian bank, says it has now used both together for a live corporate payment."
viewInBrief: "The pilot shows the plumbing works. It does not say when a payment becomes final or what a token holder owns if a bank fails mid-transfer — and that rulebook, not the technology, decides whether this is safe to scale."
callToAction: |
  ANZ and Swift should publish the participation rulebook for this ledger before the next announcement: the moment of settlement finality, the order of claims if a participant fails with tokens outstanding, and the governance and outage arrangements. The Australian Prudential Regulation Authority should state plainly whether a tokenised deposit at a licensed Australian bank is a deposit for the purposes of depositor protection, or something else.
  
  And the Reserve Bank, having just warned about critical service provider disruption, should name shared commercial-bank ledgers as the category it means in the next Financial Stability Review — before they are large enough to matter.
position: |
  A tokenised deposit is not digital cash. It is the same unsecured claim on a commercial bank that an ordinary deposit is, written onto a ledger that several institutions can read and write to instead of sitting only in the issuing bank's own books. ANZ's live cross-border payment over Swift's blockchain ledger proves the plumbing runs. It does not tell anyone when a transfer becomes irrevocable, what the holder of a token has if a participant bank fails mid-chain, or whether a tokenised deposit carries the legal protections Australian law gives deposits. Those answers live in a rulebook, and no rulebook has been put in front of the public.
  
  This matters because the industry habit is to call a system live the moment one transaction clears, and then let adoption outrun the documentation. It matters more because Swift moving from carrying messages to keeping the record changes its failure mode: today, if the messaging network goes down, every bank's own books still stand. Five days before this announcement the Reserve Bank's Financial Stability Review named critical service provider disruption as a mounting vulnerability and told institutions to strengthen crisis preparedness. Building the shared ledger of record for cross-border bank money is exactly the kind of concentration that warning was about.
falsifier: |
  I am wrong if, before this moves from pilot to commercial service, ANZ and Swift publish a participation rulebook that states the moment of settlement finality, the order of claims when a participant institution fails with tokens outstanding, and the governance and outage arrangements for the ledger — and if the Australian Prudential Regulation Authority states in writing how a tokenised deposit is treated relative to an ordinary one.
  
  If those documents appear, the sequencing objection collapses and this becomes an unusually well-governed piece of market infrastructure. If the next announcement is another successful transaction with another counterparty and still no published terms, the case for treating shared commercial-bank ledgers as critical infrastructure in the Reserve Bank's next Financial Stability Review becomes unanswerable.
readMins: 4
tags: ["payments","banking","tokenisation"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48534/anz-completes-cross-border-tokenised-deposit-payment-with-swift-ledger?utm_medium=rssfinextra utm_source=finextrafeed"
draft: false
sources:
  - label: "ANZ completes cross-border tokenised deposit payment with Swift ledger"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48534/anz-completes-cross-border-tokenised-deposit-payment-with-swift-ledger?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that ANZ has carried out a live cross-border corporate treasury payment using tokenised deposits over Swift's blockchain ledger; the RBA item establishes that its October 2026 Financial Stability Review flags critical service provider disruption and urges stronger crisis preparedness."
    retrievedAt: "2026-10-06"
    date: "2026-10-06"
    verified: true
---

## A token is not money

A tokenised deposit is not digital cash. It is a promise from a bank, written somewhere new.

Australia's ANZ says it has completed a live corporate treasury payment across borders using tokenised deposits and Swift's blockchain ledger. Announcements like this are usually read as though money itself had changed form. It has not. A deposit is an unsecured claim on a commercial bank — an entry in that bank's ledger saying it owes you a sum. Tokenising it means recording that same claim on a ledger that more than one institution can read and write to. The credit risk is identical. The issuer is identical. What changes is who keeps the book.

That is the part worth arguing about, and it is the part the press release cannot settle.

## Swift is changing jobs

Swift is the cooperative messaging network banks use to instruct each other to move money across borders. For half a century its job has been to carry instructions reliably. It has not held the record of who owns what; each bank's own ledger does that, and settlement ultimately leans on central bank money and on decades of accumulated law about when a payment is done.

Operating a shared ledger is a different job. If the ledger is the record, then the network is no longer passing a message about a transfer — it is constituting the transfer. The question of finality, which in correspondent banking is messy but legally mapped, becomes whatever the rulebook says it is. When does the sending bank lose the ability to recall? At what instant does the receiving party hold something it can rely on? If an institution in the chain fails between acceptance and drawdown, is the holder a creditor of that bank, of the sender, or of nobody in particular?

These are not gotcha questions. They are the first three a corporate treasurer's lawyer asks, and the answers belong in published terms rather than in a trade headline.

## The deposit protection question

There is a sharper version. Australian law treats deposits at licensed banks specially — that specialness is most of the reason a deposit is considered safe rather than merely convenient. If a tokenised deposit is a deposit, it should carry those protections, and someone should say so in writing. If it is instead a transferable instrument that references a deposit, that is a materially different product and ought to be described as one.

Nobody has published which it is. Until somebody does, every claim that tokenised deposits are the safe, boring, bank-issued answer to private stablecoins rests on an assertion rather than a document.

## What the Reserve Bank said five days earlier

On 1 October the Reserve Bank of Australia released its Financial Stability Review. It found the system broadly resilient, and then flagged what is getting worse: geopolitical tension, vulnerabilities in global markets, artificial intelligence, and disruption to critical service providers. It asked institutions to build operational resilience and strengthen crisis preparedness.

A shared ledger operated by one global cooperative is a critical service provider of a new kind. Note how the failure mode shifts. If messaging goes down today, payments stall but every balance in every bank's own books remains intact and provable. If the ledger of record goes down, or is corrupted, or is captured in a geopolitical dispute, the open question is not whether payments flow but whether anybody can demonstrate who owns what. Those are not the same outage. Resilience planning written for the first does not cover the second.

## The case for getting on with it

The honest counter-argument is strong. Correspondent banking is genuinely bad. Payments take days, pass through intermediaries that each take a cut, die at cut-off times, and force banks to park idle cash in accounts around the world purely so that something is there when an instruction arrives. That trapped liquidity is a real cost carried by real customers. A shared ledger of bank liabilities, settling continuously, could collapse much of it.

And you cannot draft a rulebook purely in the abstract. You learn what the edge cases are by running transactions and watching what breaks. A deposit token issued by a prudentially supervised bank is also a far more conservative design than a token issued by a company that is not supervised at all. None of that is in dispute.

The objection is to sequence, not direction. Pilots are how you find the questions. The risk is the industry reflex of treating one cleared transaction as proof the system is ready, then allowing volume to grow while the legal architecture is still a work in progress. Card schemes and domestic fast payment systems both ended up with thick, public rulebooks covering failure, reversal and liability. They got them because regulators insisted, usually after something went wrong.

## Do it in the right order

There is no reason to repeat that pattern. The technology demonstration is the easy half. The hard half is the paperwork that tells a treasurer, a liquidator and a supervisor the same story about what a token is — and that paperwork should exist before the volumes do, not after.
