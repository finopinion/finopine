---
jurisdiction: "au"
title: "The tokenisation question the RBA should ask is about access, not plumbing"
dek: "Australia's central bank wants views on what its settlement system should do in a tokenised market. The decision that matters is which institutions may hold central bank money, and it belongs in the same paper."
kicker: "Market structure"
author: "FinOpine desk"
date: 2026-09-04
plainly: "The Reserve Bank of Australia runs the system that banks use to settle payments with one another, called RITS. Balances held there are the safest form of money in the country. The Bank has now asked the public and the industry for views on what that system should do as financial assets start being issued as digital tokens."
viewInBrief: "The Bank is asking how its settlement system should work in a tokenised market. The harder question is who gets to hold an account in it, and that one should be asked out loud rather than settled by engineering."
callToAction: |
  The Reserve Bank should publish, before submissions close, a short addendum stating its working assumption about which institutions may hold or access settlement in central bank money under a tokenised design — including whether the answer is "no change" — and invite argument against it. It should commit to a date for its response and publish non-confidential submissions.
  
  Treasury should say, separately and now, whether admitting any new class of settlement participant would require legislation. If it would, that answer shapes every technical option on the table and the industry should not have to guess at it.
position: |
  The Reserve Bank of Australia has opened a consultation framed around the role of its settlement system in a tokenised ecosystem. That framing quietly converts a policy question into an engineering one. The variable that determines whether tokenisation delivers anything is not the interface: it is who is permitted to hold a claim on the central bank at all. If the answer is "the same institutions as today, through the same accounts", then the efficiency gains the Bank cites accrue inside the existing club and everyone else settles in commercial bank claims wearing new clothing.
  
  That is a defensible outcome, but it is a choice with winners and losers, and it should be made in the open rather than arrived at by architecture. Design decisions taken now will foreclose access decisions later: if new platforms can only reach central bank money through an existing participant, the access question has been answered before it was asked. The consultation should therefore set out the eligibility criteria the Bank would apply to any new class of settlement participant, and say plainly if the answer is that there will be none.
falsifier: |
  If the published consultation paper contains a chapter setting out proposed eligibility criteria for holding or accessing settlement in central bank money — including whether non-bank platform operators can apply, on what terms, and under what legal authority — together with a dated timetable for the Bank's response, then my complaint about the framing is wrong and the headline simply undersold the document.
  
  Equally, if the Bank publishes non-confidential submissions and a response that resolves access before it commits to a technical design, the sequencing objection falls away. In that case the criticism reduces to a quibble about a media release title, and the consultation deserves to be judged on its substance rather than its frame.
readMins: 4
tags: ["tokenisation","payments","rba"]
generated: true
groundedIn: "https://www.rba.gov.au/media-releases/2026/mr-26-24.html"
draft: false
sources:
  - label: "RITS Consultation and Retail CBDC Update"
    publisher: "Reserve Bank of Australia"
    url: "https://www.rba.gov.au/media-releases/2026/mr-26-24.html"
    supports: "The item establishes that on 3 September 2026 the Reserve Bank of Australia opened a consultation on the role of RITS in supporting settlement in a tokenised ecosystem, citing Project Acacia's finding that tokenisation could improve the efficiency, functionality and resilience of wholesale markets, and that the same release carried a retail central bank digital currency update."
    retrievedAt: "2026-09-04"
    date: "2026-09-03"
    verified: true
---

## Strip out the word "tokenised"

Take the fashionable word out of the Reserve Bank of Australia's new consultation and an old question is left standing: who is allowed to hold money issued by the central bank?

On 3 September the Bank asked for views on the role of the Reserve Bank Information and Transfer System — RITS, the plumbing through which Australian banks discharge obligations to each other using balances held at the central bank — in supporting settlement in a tokenised ecosystem. The release points back to Project Acacia, the Bank's earlier work, as having shown that tokenisation could improve the efficiency, functionality and resilience of wholesale financial markets. Wholesale here means the market where banks and large institutions trade with each other, not the market where households pay for groceries.

## The word doing the work is "role"

A consultation on the *role* of RITS presumes RITS persists and asks how it should adapt. That is a reasonable starting point for the operator of live critical infrastructure. It is also a way of turning a question about institutional membership into a question about interfaces and message formats.

Here is why that matters. The whole claim for tokenised settlement is that the asset and the cash move together, at the same instant, so that neither party is left exposed if the other fails. That claim only holds if the cash leg is a claim on the central bank and can be moved at the moment the asset moves. If the cash leg sits in a separate system, with its own operating hours and its own list of eligible holders, what you get is a faster asset leg attached to the same old settlement risk. Dressed-up delay is still delay.

So the efficiency case the Bank itself cites cannot be assessed without knowing who is inside the perimeter. A tokenised bond market in which every new platform must reach central bank money through an incumbent bank is not a structural change. It is an incumbency-preserving upgrade, and possibly a good one — but it should be argued for on those terms.

## Architecture decides access if policy does not

The practical danger is sequencing. Technical design choices are sticky. Once the Bank has specified how tokenised platforms connect to RITS, the set of institutions that can realistically connect has been narrowed, whether or not anyone wrote down an access policy. A decision made by interface specification is still a decision; it simply never gets consulted on, because by the time the access framework is published the engineering has already ruled out the alternatives.

The Bank knows how to do this the other way round. Australia now has a statutory framework for designating cash-in-transit operators, under which the Bank designated Armaguard this week. Whatever one thinks of that regime, its criteria and consequences are written in legislation and applied by a named decision. Access to settlement in central bank money deserves at least that much explicitness.

## The retail question in the same envelope

The release also carries an update on a retail central bank digital currency — a digital form of cash issued directly to the public. That is a different question, with a different constituency and a genuinely contested politics, and it does not sit comfortably in the same announcement as a technical wholesale consultation. Bundling them invites the wholesale paper to be read through the retail argument, which is the fastest way to make a narrow operational consultation attract submissions about surveillance and none about settlement finality.

## The strongest case for the Bank's approach

Consultations work when they are narrow. A paper that asked simultaneously about message standards, ledger design, liquidity-saving mechanisms and the legal basis for admitting a new class of account holder would be unanswerable, and would attract submissions that talk past each other. Access to settlement accounts is governed by its own criteria and its own risk assessment; folding it into a design consultation would muddle both. There is also a real supervisory argument for not advertising an open door before you know what the room looks like: invite applications first and you spend two years managing a queue of hopefuls instead of specifying a system.

That case is good, and it would be decisive if the two questions were separable. They are not. Narrowness is a virtue when the excluded question can be answered later without cost. Here, the later answer is constrained by the earlier one. You cannot design the door and then hold an open mind about who walks through it.

## What honest scope would look like

A better version of this consultation would state the Bank's working assumption about the perimeter up front — even if that assumption is "no new categories of participant" — and invite argument against it. That costs the Bank nothing it is not already exposed to. It converts an unstated constraint into a testable proposition, which is what a consultation is for.

The alternative is a process that collects thoughtful views on plumbing, adopts a design, and then discovers that the interesting question was settled somewhere in an annexe about connectivity models.
