---
jurisdiction: "uk"
title: "A till standard only works if it makes deleting a sale impossible"
dek: "Mandatory software standards for point-of-sale systems are the right lever against till fraud. Whether they bite depends on one thing the announcement does not settle: what the till is required to record, and who can unwrite it."
kicker: "Tax enforcement"
author: "FinOpine desk"
date: 2026-10-29
plainly: "Shops and cafés record what they sell on electronic tills. Some businesses use software to delete or never record sales, usually cash ones, so their takings look smaller and they pay less tax. The UK government says it will make till software meet compulsory standards to stop this."
viewInBrief: "Regulating till software is the right lever, because there are far fewer suppliers than shops. But it only works if the rules specify a sales record that cannot be quietly deleted — not just a certificate for the vendor."
callToAction: |
  Before the standard commences, HM Revenue and Customs and the Treasury should publish four things: the technical specification, stating plainly whether the sales journal must be append-only, sequentially numbered and signed, and whether that applies to cash as well as card transactions; who certifies, at what cost to a vendor and to a single-site shop; the date by which tills already in use must comply; and whether operating on uncertified software is itself an offence, with the penalty named.
  
  They should also publish a baseline estimate of the revenue lost to sales suppression and the method behind it, and commit to restating it on the same basis three years after commencement. A scheme that imposes costs on every small retailer in the country should be answerable to the number that justified it.
position: |
  Certifying point-of-sale software is a sensible place to apply pressure — there are far fewer till vendors than there are tills. But a standard that certifies suppliers rather than specifying the record will not stop sales suppression. The fraud works by making a transaction disappear, so the only requirement that matters is one that makes a sale, once rung, impossible to remove without leaving a visible, numbered hole in a log the merchant does not control.
  
  If the standard ends up as a badge on a vendor's website, the dishonest trade simply moves to uncertified apps, generic tablets, bespoke builds and the enormous installed base of tills already sitting on counters. The cost of compliance would then fall almost entirely on the honest small businesses that were already declaring their takings, which is the worst available outcome.
falsifier: |
  Publish a technical specification that requires an append-only, sequentially numbered and cryptographically signed sales journal, retained in a form the merchant cannot silently edit, applying to cash as well as card sales — and make operating a business on uncertified software an offence in its own right, with a stated date by which existing tills must comply. That combination would make this a record standard rather than a vendor badge, and I would be wrong.
  
  If it lands that way, the next question is purely about enforcement capacity and the transition cost for small retailers, which is an argument worth having on its own terms rather than the one I am making here.
readMins: 4
tags: ["tax","payments","fraud"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48664/uk-government-takes-on-till-fraud-with-pos-software-standards?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "UK Government takes on till fraud with POS software standards"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48664/uk-government-takes-on-till-fraud-with-pos-software-standards?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that the UK government is introducing mandatory software standards for point-of-sale systems with the stated aim of clamping down on till fraud."
    retrievedAt: "2026-10-29"
    date: "2026-10-28"
    verified: true
---

Till fraud is not sophisticated. A customer pays, the sale is rung up, and at some point afterwards the record of it is removed — or is never written at all — so the business looks smaller than it is and pays tax on the smaller number. The money has already been taken from the customer. What is stolen is the tax on it, and, less visibly, the trade of every competitor who declared the same sale.

The UK government now says it will impose mandatory software standards on point-of-sale systems — the tills, tablets and apps that record sales in shops, cafés and salons — to clamp down on exactly this. The instinct is correct. Chasing suppression trader by trader is slow and expensive; regulating the software is leverage, because there are a few hundred serious vendors and hundreds of thousands of counters. But a standard is a container, and everything turns on what gets put in it.

## What a standard has to make impossible

There are two kinds of software standard. One certifies the supplier: a conformance process, a logo, an annual fee, an assurance that the product does what it says. The other specifies the record: every transaction written to a sequentially numbered, append-only log, each entry signed so that later alteration is detectable, with the log retained somewhere the business operating the till cannot quietly edit.

Only the second kind reaches the fraud. Suppression is not a product defect; it is a feature used deliberately, often through a mode or an add-on that voids, re-rings or reconstructs a day's trading. A certified till can be a perfectly good till and still be run in a way that leaves nothing behind. What defeats that is not certification but the numbered hole: if sale 417 is missing between 416 and 418, and the sequence is signed, the deletion is itself the evidence. Inspectors stop arguing about whether takings look low and start asking why nine entries are absent.

## The suppliers are the easy part

Honest vendors will comply. They always do; compliance is a feature they can sell. The people who supply suppression tools are not the people queuing for a conformance certificate, and the dishonest demand will go wherever the standard does not reach — generic hardware running an off-the-shelf app, software hosted outside the UK, something written by a cousin, or the till already on the counter that nobody is obliged to replace.

That means the duty cannot sit only on the vendor. Operating a business on uncertified point-of-sale software has to be the offence, with a penalty attached, or the standard regulates the supply chain of the compliant and ignores everyone else. It also means a date: an installed base that is grandfathered indefinitely is an installed base that advertises itself as the place to go.

## Cash is the hard part

Card payments already generate a second record. The acquirer that processes the transaction knows it happened, and a till that disagrees with the acquirer is a till with a problem. Suppression therefore concentrates precisely where no second record exists: cash. A standard whose main achievement is reconciling the till to the card file is mostly proving something the tax authority could already reconstruct.

The valuable requirement is the one that makes a cash sale as hard to unwrite as a card one — an on-device counter that cannot be reset, a receipt carrying a signed sequence number, a journal that goes somewhere before the close of trading. That is harder to design and more intrusive to run than a vendor conformance scheme, which is exactly why it is the part most likely to be softened on the way to commencement.

## The case against this argument

The strongest objection is that perfect is the enemy of enforceable. A simple binary question — is this till certified? — is one an officer can ask at the door and answer in ten seconds, and that alone changes the economics of suppression. It raises the cost, pushes the fraud into visibly shabbier corners of the market, and shifts vendor incentives, because a supplier whose product becomes known as the one the fraudsters use now has something to lose. Cryptographic elegance that nobody can check at a counter is worth less than a crude test anyone can.

There is force in that, and the binary question should be part of the scheme. But a badge without a record specification leaves the central fact untouched: a certified product can be operated in an uncertified way, and the trader who deletes sales will happily buy a compliant till and then not use it compliantly. Meanwhile the costs — new hardware, new terminals, staff retraining — fall hardest on small operators with thin margins who were never the problem. If they pay and suppression does not measurably fall, the policy will have taxed honesty and left the rest alone.

## The number this will be judged on

Nobody has yet been told what success looks like. A standard introduced to close a revenue leak should be announced alongside an estimate of the leak and the method used to produce it, so that in three years the scheme can be measured against the case made for it rather than against the number of certificates issued.
