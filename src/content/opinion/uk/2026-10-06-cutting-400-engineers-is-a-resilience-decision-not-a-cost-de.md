---
jurisdiction: "uk"
title: "Cutting 400 engineers is a resilience decision, not a cost decision"
dek: "DNB is shrinking its technology teams while expanding its use of AI agents. Nothing in the operational resilience rulebook requires a bank to say how many humans its recovery plan assumes."
kicker: "Operational resilience"
author: "FinOpine desk"
date: 2026-10-06
plainly: "DNB is Norway's biggest bank. It has said it will cut 400 jobs in its technology teams while spending more on AI agents — software that carries out tasks by itself rather than waiting for instructions. Banks must show regulators they can keep essential services such as payments running when something breaks. Until now, the people who fixed those breaks were people."
viewInBrief: "Swapping engineers for autonomous software changes a bank's ability to recover from an outage, not just its cost base. Regulators should make firms re-test their outage plans at the staffing level they will actually have."
callToAction: |
  The Prudential Regulation Authority should require, in the operational resilience self-assessment every firm already produces, an explicit statement of the in-house technical capacity each important business service depends on — and require that scenario testing be re-run whenever that capacity is materially cut, before the cut takes effect rather than after.
  
  Boards should refuse to approve a technology headcount reduction without seeing the re-run. If a bank is confident that agents can hold the service, proving it in a test is cheap. Discovering otherwise during an incident is not.
position: |
  A bank's ability to recover from an outage rests on people who understand the system well enough to know what to turn off. When a bank replaces part of that capacity with software agents, it has changed the recovery plan — but supervisors will record the change as a staffing matter, because operational resilience rules count services, suppliers and tolerances, and never count engineers.
  
  That gap matters now because the direction of travel is obvious and fast. The Bank of England's Financial Policy Committee has just said that rapid advances in artificial intelligence have increased cyber and operational resilience risks. If firms are going to run critical technology functions with fewer humans and more autonomous software, the impact tolerance a board signs off should be tested at the headcount the firm will actually have, not the one it had when the plan was written.
falsifier: |
  I am wrong if supervisors produce incident data showing it does not matter. If the Bank of England or the Prudential Regulation Authority publishes analysis of restoration times for important business services showing that firms which reduced in-house technology headcount while deploying autonomous agents recovered as fast as, or faster than, comparable firms that did not, the staffing variable is not load-bearing and I should stop asking for it.
  
  If that happens, the ask collapses to simple disclosure — firms state the assumption, nobody polices the level — and the argument that regulators should require scenario testing at post-reduction staffing falls away entirely.
readMins: 4
tags: ["operational resilience","banking","artificial intelligence"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48538/dnb-to-lay-off-400-and-expand-use-of-ai-agents?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "DNB to lay off 400 and expand use of AI agents"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48538/dnb-to-lay-off-400-and-expand-use-of-ai-agents?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "Finextra reports that DNB, Norway's largest bank, is set to lay off 400 staff from its technology teams while increasing investment in AI agents; the Bank of England's September 2026 FPC record states that rapid AI advances have increased cyber and operational resilience risks."
    retrievedAt: "2026-10-06"
    date: "2026-10-06"
    verified: true
---

## The last line of defence is a person

When a payment rail stops, the thing that ends the outage is usually someone who has been inside that system for years and knows which component to isolate before anyone has worked out why. That person is not in the rulebook. They are not in the impact tolerance. They are a line in a cost centre.

Norway's largest bank, DNB, is reported to be cutting 400 staff from its technology teams while increasing what it spends on AI agents — software that carries out tasks on its own rather than waiting to be told each step. Treat the two halves as one decision, because that is how they were announced. The bank is not simply spending less on technology. It is changing who, or what, holds the system up.

## The official conversation is about models, not people

The Bank of England's Financial Policy Committee recorded last month that rapid advances in frontier AI have increased cyber and operational resilience risks, and that recent incidents in frontier AI have sharpened the focus on the pace of development. The Bank's own Court was told in July that it was helping banks get sufficient access to AI models to protect their cyber security. Both are about the technology: its capabilities, its failure modes, who can reach it.

Neither is about the thinning of the humans who sit between the technology and the customer. That is the variable DNB has just moved, and it is the one no supervisor measures.

## What the rulebook actually counts

British operational resilience regulation is built on a sensible idea. A firm identifies its important business services, sets an impact tolerance — the maximum tolerable disruption before intolerable harm — and tests whether it can stay inside that tolerance in severe but plausible scenarios. Alongside it sits a third-party regime, now extended to critical third parties, whose whole logic is that when many firms depend on one supplier, the dependency needs naming, oversight and an exit plan.

Notice what is counted and what is not. If a bank hands a function to an external supplier, the dependency is documented, contracted and supervised. If a bank hands the same function to autonomous software it bought and runs itself, having removed the engineers who used to do it, nothing is triggered. No contract, no exit plan, no substitutability test. It is procurement at one end and redundancy at the other, and the resilience file does not change.

Yet the second arrangement can be the more brittle one. An exit plan from an outsourcing contract assumes you can bring the work back in. Back to whom?

## Why agents are not ordinary automation

Banks have automated for forty years without anyone calling it a stability question, and most of it was fine. Agentic software is different in one specific respect that matters for recovery rather than for running costs.

When a scripted process fails, it fails the same way every time, and the person who wrote it can read it. When an agent takes a sequence of actions on its own and something downstream breaks, diagnosing it requires someone who can reconstruct what the agent did and why — which is a harder skill than the one being made redundant, not an easier one. Firms are reducing the population from which that skill is drawn at the same moment they create the need for it.

There is a second, slower effect. Capability that is not exercised decays. A fallback procedure that assumes staff can do manually what the machine normally does is only as good as the last time someone actually did it.

## The case against this argument

The strongest objection is that headcount is not resilience, and that large bank technology functions have long carried people doing manual toil that automation does better and more consistently than they ever did. Human error is a leading cause of outages. Fewer hands on production systems can mean fewer bad changes, cleaner release processes and faster detection. On this reading, DNB is removing a source of failure, not a defence against it.

A second objection is jurisdictional: DNB is supervised in Norway, and British regulators do not get a vote on a Norwegian bank's staffing.

Both land, and neither disposes of the point. Automation's gains show up in the steady state; resilience regulation exists for the tail, and the tail is precisely where the judgement of experienced humans is the residual control. And the jurisdictional point is why this is a British argument rather than a Norwegian one — DNB is simply the first large bank to say the quiet part out loud. Every major UK bank is making the same trade, in smaller increments, without announcing it.

## What would settle it

One number, published and tested: the minimum engineering capacity each important business service assumes in a severe but plausible scenario, and evidence that the service has been tested at that level rather than at last year's level. If firms can show recovery holds at post-reduction staffing, the question answers itself and the objection wins.
