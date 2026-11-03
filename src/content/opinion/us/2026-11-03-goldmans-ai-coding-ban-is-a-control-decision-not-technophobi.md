---
jurisdiction: "us"
title: "Goldman's AI coding ban is a control decision, not technophobia"
dek: "A bank stopping traders from generating their own code is defensible: these tools make writing code cheap without making owning it cheap. The test is whether engineers still get them under supervision."
kicker: "Operational risk"
author: "FinOpine desk"
date: 2026-11-03
plainly: "Goldman Sachs is one of the world's largest investment banks. Many staff there write small computer programs to do their jobs — pricing tools, spreadsheets, automation. New artificial intelligence tools can produce such code in seconds. According to a Bloomberg report, Goldman has told traders and other employees to stop using them, citing both risk and productivity."
viewInBrief: "Stopping traders from generating their own code is a control decision, not technophobia: these tools make writing code cheap without making owning it cheap. It only works if engineers still get them under supervision."
callToAction: |
  Goldman's technology leadership should say plainly whether this restriction is role-based — whether its own engineers retain these tools inside a supervised, logged environment — and what sanctioned alternative exists for staff who need to automate something. A firm that measured a productivity effect strong enough to justify withdrawing a tool should be willing to describe, even in aggregate, what it measured.
  
  Supervisors reviewing operational resilience at any large dealer should stop asking whether a bank "uses AI" and ask three narrower questions instead: how much code running in production was machine-generated, who signed it off, and whether anyone outside the engineering function can still put code anywhere near a live book. Those answers are auditable. The current conversation is not.
position: |
  Taken at face value, the reported restriction is a sensible response to a real asymmetry. Artificial intelligence coding assistants collapse the cost of producing plausible-looking code to near zero, while leaving the cost of reviewing, testing, owning and explaining that code exactly where it was. In a trading business, the people who bear the second cost are not the people enjoying the first. That is a textbook internal externality, and a central policy is the only thing that catches it.
  
  What follows is that the right line is role-based, not tool-based. Engineers working inside change control, logging and sign-off should have these tools; people whose output never passes through any of that should not be generating production-adjacent code at all, with or without a machine. A blanket ban with no sanctioned alternative does not stop the behaviour, it moves it onto personal devices and consumer chatbots, where the firm cannot see it. Whether Goldman has drawn the line in the right place is the only question worth asking about this decision.
falsifier: |
  Two observable things would show me wrong. First, if Goldman confirms in a public statement, staff memo reported in full, or a filing that the restriction extends to its software engineering organisation with no supervised internal coding assistant available — then this is not a control decision about who may write code, it is a retreat from the technology, and my reading collapses. Second, if within twelve months the firm reverses and deploys coding assistants to the same front-office population while publishing measured productivity gains, the stated productivity rationale was never load-bearing.
  
  Either outcome would mean the useful lesson is not about governance boundaries but about a bank mismanaging a tooling decision in public. The reverse also holds: if other large dealers announce role-based restrictions with named sanctioned alternatives over the coming year, that is the industry converging on the line I am arguing for.
readMins: 4
tags: ["banking","artificial intelligence","operational risk"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48690/goldman-bans-traders-and-bankers-from-using-ai-coding-tools?utm_medium=rssfinextra utm_source=finextrafeed"
draft: false
sources:
  - label: "Goldman bans traders and bankers from using AI coding tools"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48690/goldman-bans-traders-and-bankers-from-using-ai-coding-tools?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes, via a Bloomberg report carried by Finextra on 3 November 2026, that Goldman Sachs has barred traders and other employees from using advanced AI coding tools, with productivity and risk given as the stated reasons."
    retrievedAt: "2026-11-03"
    date: "2026-11-03"
    verified: true
---

## A confession or a control decision

Banning your most expensive staff from using the most hyped productivity tool of the decade is either an admission that the tool does not work, or a statement about who in a bank is allowed to write code. The second is far more interesting, and far more defensible.

The report is thin: Goldman Sachs has stopped traders and other employees using advanced artificial intelligence tools for coding, citing productivity and risk concerns. That comes via Bloomberg, carried by a trade outlet. There is no Goldman statement in front of me, no scope, no list of which tools or which desks, no indication whether this is permanent or a pause. So treat the act as reported and argue about the reasons given — because the reasons are where the substance is.

## The word that does not fit

Risk is the expected justification. Leakage of proprietary code into a third-party model, licensing contamination, unverifiable output: all standard. Productivity is the odd one, because these tools are sold as productivity and nothing else. You do not cite productivity as a reason to withdraw a productivity tool unless somebody looked and found the number pointing the wrong way.

There is an obvious mechanism for that. Machine-generated code is fast to produce and slow to verify. It is usually syntactically clean, often subtly wrong, and almost always longer than a human would have written. That shifts labour from the author to the reviewer. If the author is a trader and the reviewer is a control function — model validation, technology risk, whoever has to sign the thing off before it touches a live book — then each individual's productivity rises while the firm's falls. No trader will ever internalise that cost. Only a central policy catches it.

## The front office is where the unsupervised code has always lived

This is not a new problem wearing a new badge. Trading floors have run on spreadsheets, macros and personal scripts for forty years: pricing adjustments, hedging logic and reconciliation hacks built by the person who needed them and understood by nobody else. When that person leaves, the firm owns a model it cannot explain. Banks spent two decades dragging that work into engineering, with version control, testing, change management and a named owner.

AI assistants are a machine for undoing it. The marginal cost of producing something that looks like working software falls to roughly zero, and it falls for everyone, not just the quantitative analysts who could already code. The population of potential authors goes from a few hundred specialists to anyone with a terminal and an afternoon. The governance built to handle the small population does not scale to the large one. A ban is a blunt instrument, but it is a coherent response to a problem that arrived faster than the controls could be rewritten.

## A ban is only as good as its alternative

The failure mode is obvious. Tell capable people they may not use a tool that makes their day shorter, offer nothing in its place, and they will use it anyway — on a phone, on a home laptop, pasting into a consumer chatbot. Now the code is not merely ungoverned, it is outside the building. A restriction that produces that outcome is worse than no restriction, because the firm has traded visible risk for invisible risk and told itself it has tightened up.

So the test of whether this is competence or panic is narrow: is the line drawn around roles or around technology? Engineers inside a logged, reviewed, attributable environment should have these tools, because that is where the review cost is already budgeted for. People whose output never passes through change control should not be generating production-adjacent code at all. That distinction has nothing to do with artificial intelligence. It is the same rule that should have applied to the spreadsheet.

## The strongest case against

The opposing argument is good. Banks compete on speed. Junior staff learn faster with these tools than without them. A desk that can prototype a pricing tweak in an hour gets to a better answer than one filing a ticket with technology and waiting a fortnight. And the control argument proves too much: run it to its conclusion and you ban spreadsheets, screen-scraping and every piece of improvisation that makes a trading floor work.

Two answers. Nobody is proposing to ban prototyping — only its silent promotion into something a client or a balance sheet depends on, which is where the costs land. And the spreadsheet comparison cuts the other way: some of the industry's most expensive self-inflicted model failures came from exactly that pattern, built by smart people in a hurry with nobody able to reconstruct the logic afterwards. The lesson was learned at considerable cost. Relearning it with a tool that writes a thousand lines a minute would be careless.

It is possible, of course, that "productivity" here is diplomatic cover for a leakage or licensing worry that nobody wants to describe in print. I cannot know. But taken at face value it is the more interesting claim, because it is the one that can be tested with a number rather than settled by a lawyer.
