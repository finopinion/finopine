---
jurisdiction: "au"
title: "ASIC can't make AI traders explain themselves. It can make them stop"
dek: "New market integrity rules for AI-enabled trading will fail if they rest on documenting how a model decides. Load the weight on halting it — and publish what was deregulated in the same package."
kicker: "Markets regulation"
author: "FinOpine desk"
date: 2026-09-24
plainly: "The Australian Securities and Investments Commission, the regulator for company conduct and financial markets, writes binding rules for firms that trade on Australia's stock and futures exchanges. It has said it will add new safeguards covering trading run by computers and artificial intelligence, while removing some other requirements from those firms at the same time."
viewInBrief: "Rules that ask firms to document how an AI trading model decides will be unenforceable. The safeguards should rest on hard limits, a halt that is tested rather than certified, and a named person who owns it."
callToAction: |
  ASIC should publish, with the final instrument, a line-by-line table of every obligation removed and the specific reason each is redundant under the new regime — not an aggregate burden-reduction figure. It should define the enhanced controls by behaviour rather than by naming a technology, and require participants to demonstrate an effective halt in a supervised live test at least annually, reported to ASIC, rather than certify one on a form.
  
  And it should say plainly which named officer at each participant owns that halt. A control nobody is personally accountable for is a control that fails at the exact moment it is needed.
position: |
  The Australian Securities and Investments Commission is adding safeguards for automated and AI-enabled trading to its Market Integrity Rules while streamlining other obligations on securities and futures participants. Those two verbs sit in one package, and the safeguard half will only work if it is built around stopping a system rather than explaining it. Obligations to document how a model reached a decision are compliance theatre for anything adaptive; obligations to cap what it can do before the order leaves the building, to halt it on command, and to name the person whose job depends on the halt working are enforceable.
  
  That matters because markets are the one corner of Australian policy where AI accountability can actually be tested: a bounded population of licensed firms, an existing enforcement hook, and losses that show up in minutes rather than years. If ASIC gets the trigger for these obligations wrong — defining scope by naming a technology instead of describing a behaviour — firms will argue their system is not the thing named, and the rest of the guardrail debate will inherit the same drafting problem.
falsifier: |
  I am wrong if the final instrument and accompanying guidance bring systems into scope by what they do — generating or altering orders using parameters no human set, and not reproducible on replay — rather than by whether a firm calls it artificial intelligence; if they require a halt that is demonstrated in a live test rather than certified on a form; and if ASIC publishes, obligation by obligation, what the streamlining removed and why each was redundant.
  
  If all three appear when the rules are made, this is a well-built package and the criticism collapses. If the scope clause names a technology, or the removed obligations are described only in aggregate as burden reduction, the package is a net loosening dressed as a tightening, and the first disorderly AI-driven trading event will be argued over definitions rather than conduct.
readMins: 4
tags: ["asic","market structure","ai"]
generated: true
groundedIn: "https://www.finextra.com/pressarticle/111014/asic-strengthens-ai-safeguards?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "Asic strengthens AI safeguards"
    publisher: "Finextra"
    url: "https://www.finextra.com/pressarticle/111014/asic-strengthens-ai-safeguards?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that ASIC is strengthening safeguards for automated and AI-enabled trading while streamlining other requirements for securities and futures market participants through incoming changes to its Market Integrity Rules."
    retrievedAt: "2026-09-24"
    date: "2026-09-24"
    verified: true
---

## A rule that asks a model to explain itself will be obeyed on paper and nowhere else

That is the hazard sitting inside ASIC's announcement this week that it is strengthening safeguards for automated and AI-enabled trading, while streamlining requirements for securities and futures market participants, through incoming changes to its Market Integrity Rules — the binding rulebook for firms that trade on Australia's licensed markets.

Control of a trading machine has always had two halves: understanding what it will do, and being able to stop it. For a conventional algorithm the first half is achievable. Someone wrote the logic, someone can read it back, and a replay of the same inputs produces the same orders. That is what makes a testing-and-documentation regime meaningful. Adaptive models break exactly that property. Not necessarily because nobody understands them, but because the thing you documented on Tuesday is not reliably the thing running on Friday, and replaying the inputs does not reproduce the output.

So the weight has to move to the second half. Pre-trade limits sized to the firm's capital, not to its ambitions. A halt that works at the desk and at the firm, and that has been shown to work under load rather than attested to in an annual return. A named person inside the participant who owns that halt and whose accountability does not evaporate into a committee. And a duty to tell the regulator when a deployed model's behaviour changes materially — because with an adaptive system, redeployment is not the only moment risk changes.

## The trigger is where this will be won or lost

The temptation in drafting is to write "artificial intelligence" into the scope clause. It is also the fastest route to arbitrage. Vendors and participants will cheerfully argue that a statistical parameter-tuner is not AI, that reinforcement on execution outcomes is just optimisation, that the model is only "assisting" a human who presses the button. None of those arguments is absurd, which is precisely the problem: a definitional fight is a cheap defence.

The better trigger is behavioural. Does the system generate, size or modify orders using parameters that no human set directly, and would a replay of the same market data fail to reproduce the same orders? If yes, the enhanced controls apply, regardless of what is inside the box or what the sales deck calls it. That formulation also has the virtue of ageing well. It will still bite in five years, when whatever succeeds today's models has a different name.

## The case for the streamlining half

The honest argument for the other verb in ASIC's sentence is that market integrity rules accrete. Requirements written for one market structure survive into another; notifications duplicate what the exchange already captures; small participants carry obligations designed for the largest. Clearing that out is real work and it lowers the cost of being a market participant, which matters for competition among brokers. Pairing it with a new safeguard is also politically sensible: it is how a regulator gets a tightening through without a fight.

The objection is not to deregulating. It is to deregulating opaquely in the same instrument that introduces a novel risk. Many of the obligations now judged redundant were designed for a world of inspectable, deterministic algorithms. The judgement that a particular record or notification adds nothing was formed under assumptions that the first half of this package concedes no longer hold. Redundancy has to be re-argued against the new baseline, in public, item by item — not asserted in a summary line about reducing burden.

## Why markets are the right place to test this

Australia is pursuing economy-wide artificial intelligence guardrails, sharpened by a delayed disclosure of an autonomous agent reaching a government website. That debate is stuck on the usual problem: who is covered, and what happens when they are not. Markets regulation does not have that problem. ASIC already knows every firm in scope, already licenses them, and already has rules with penalties attached. If a demonstrable halt and a named accountable human cannot be made to work here, they will not work anywhere.

There is a second reason for haste. The Reserve Bank's assessment this week found ASX's clearing and settlement facilities only partly observing the standards on operational risk, governance and risk management, with a multi-year transformation programme still to prove itself. The plumbing under Australian equities is mid-rebuild. Order flow that is faster and less predictable than the controls assume is not what you want pressing against infrastructure in that state. The safeguards and the infrastructure reset are the same problem viewed from two ends.

## What the final text has to show

The announcement is not the rule. The instrument is, and it is the instrument that will decide whether this is a tightening or a trade. Three things in it will tell you which: a behavioural scope test, a halt that must be demonstrated rather than certified, and an itemised account of what came out. Two of the three would be a good outcome. One would not.
