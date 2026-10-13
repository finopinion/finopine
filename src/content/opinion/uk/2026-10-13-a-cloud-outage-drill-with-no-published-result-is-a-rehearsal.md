---
jurisdiction: "uk"
title: "A cloud-outage drill with no published result is a rehearsal, not a test"
dek: "Thirty-eight of the UK's biggest banks and market infrastructures spent a day simulating a global cloud failure. The Bank of England says firms should now act on it. It has not said what they found."
kicker: "Operational risk"
author: "FinOpine desk"
date: 2026-10-13
plainly: "Banks now run much of their computing on a small number of outside companies' remote data centres, known as the cloud. On 8 October the Bank of England, which supervises UK banks, ran a day-long crisis rehearsal with the 38 biggest banks and exchanges, imagining those services failed worldwide. It said firms should act on what they learned. It has not said what they learned."
viewInBrief: "The rehearsal was the right one to run; the silence afterwards is not. If the Bank can publish bank-by-bank capital stress test results, it can publish what this exercise found and a date by which firms must fix it."
callToAction: |
  The Bank of England and UK Finance should publish a SIMEX26 findings report within three months: the scenario in outline, aggregate time-to-restore for critical services, how many participating firms breached their own impact tolerances, the shared assumptions that failed, and a date by which the Bank expects remediation. None of that requires naming a single firm.
  
  The Bank should also state plainly whether the major cloud service providers participated. If they did not, the Prudential Regulation Authority should make their presence a condition of the 2028 exercise. Rehearsing a supplier's failure without the supplier in the room tests the sector's imagination, not its resilience.
position: |
  SIMEX26 was the right scenario at the right time, and the Bank of England and UK Finance deserve credit for choosing the sector's most uncomfortable dependency rather than a safe one. But the exercise produced a public output of exactly one sentence: that the Bank now expects firms to take action. No findings, no aggregate recovery times, no deadline, and no statement of whether the cloud providers whose failure was being simulated were actually in the room. An exercise that ends in an expectation is a rehearsal. A test has a result.
  
  This matters because operational resilience is now the binding constraint on whether people can be paid, not capital. The Bank publishes bank-by-bank results of its capital stress tests precisely because the public has a claim on knowing whether the system survives the scenario. The same claim applies to a scenario in which the payment works perfectly on paper and the machine it runs on is unavailable. Until the Bank publishes aggregate SIMEX26 findings and a remediation date, nobody outside the 38 firms can tell the difference between a sector that learned something and a sector that had a useful day out.
falsifier: |
  I am wrong if the Bank of England and UK Finance publish a SIMEX26 findings document that sets out, in aggregate, how long critical services took to restore under the scenario, how many participating firms breached their own impact tolerances, which shared assumptions failed, and a date by which remediation is expected — or if they confirm that the major cloud service providers were participants rather than simulated.
  
  If either appears, the criticism collapses: the exercise would have a published result and an accountable follow-up, and my complaint reduces to a quibble about publication lag. If neither appears before the next biennial exercise in 2028, the sector will have gone four years with no external evidence of progress on its largest single dependency.
readMins: 4
tags: ["operational resilience","banking","cloud"]
generated: true
groundedIn: "https://www.bankofengland.co.uk/news/2026/october/cmorg-holds-sector-wide-cloud-outage-simulation-exercise"
draft: false
sources:
  - label: "CMORG holds sector-wide cloud outage simulation exercise"
    publisher: "Bank of England"
    url: "https://www.bankofengland.co.uk/news/2026/october/cmorg-holds-sector-wide-cloud-outage-simulation-exercise"
    supports: "The Bank of England's news release establishes that SIMEX26, the biennial Cross-Market Operational Resilience Group exercise, ran on 8 October 2026 on a global cloud disruption scenario with 38 systemic firms, the Treasury and the FCA, and that its stated follow-up is that the Bank \"expects firms to take action\"."
    retrievedAt: "2026-10-13"
    date: "2026-10-09"
    verified: true
---

## Thirty-eight firms rehearsed the end of the cloud, and the result is a secret

On 8 October the UK's thirty-eight largest and most systemically important banks and market infrastructure operators spent a day working through what they would do if cloud-based services failed globally. The Economic Secretary to the Treasury opened it. The London Stock Exchange Group hosted it. The Bank of England and UK Finance chaired it, with the Treasury and the Financial Conduct Authority in attendance. The Bank-chaired Cross Market Business Continuity Group, which steers the sector's collective response to a systemic incident, held a live meeting inside the scenario.

That is a serious mobilisation of the entire official apparatus. The public output of it is one sentence: the Bank "now expects firms to take action based on the exercise to further strengthen their resilience".

Expects. Not requires, not by when, not measured against what.

## The asymmetry nobody defends

Twice a year the Bank tells the country, bank by bank, how a named institution's capital would fare under a severe recession. Those results are published because the public has a legitimate interest in knowing whether the firms holding its money survive the scenario. Nobody argues that disclosure helps a future shock arrive sooner.

Apply the same test to operational resilience and the logic is stronger, not weaker. A capital shortfall is slow, abstract and recoverable over quarters. An outage is instant and visible to every customer. The question SIMEX26 was built to answer — can critical services keep running when a shared technology supplier goes dark — is the question that now determines whether wages land, whether trades settle, whether a card works at a till. And the answer is not published at all.

There is no principled reason for that asymmetry. There is only habit: capital stress testing grew up as a market-disclosure tool, and crisis exercising grew up as a private supervisory one. The risks have swapped places; the disclosure regimes have not.

## The participant list has a hole in it

Read the Bank's own description of who was there. Banks. Market infrastructure operators. The Treasury, the FCA, UK Finance, the exchange that hosted it. It does not say that the providers of the cloud services being disrupted took part.

Maybe they did and the release omitted it. If they did not, the exercise tested the sector's response to a counterparty whose real behaviour is the single most decisive variable in the scenario. In a global cloud outage, a bank's recovery time is not principally a function of its own runbooks. It is a function of the provider's restoration sequence: which regions come back first, which customers get capacity, how long before a failover that looks independent on an architecture diagram turns out to share a control plane with the thing that failed. Firms can rehearse their call trees. They cannot rehearse somebody else's recovery queue, and simulating it is not the same as being told how it actually works.

This is also where the usual comfort breaks down. In a single-firm outage the rest of the sector is a resource — correspondents, back-up routes, mutual aid. In a shared-supplier outage every participant becomes a claimant on the same scarce capacity at the same moment. Resilience plans written on the first assumption fail silently under the second. If SIMEX26 found that, it is the most important finding the Bank has produced this year. If it did not find that, we should be told that too.

## The case for keeping quiet

There are two decent arguments on the other side, and both deserve stating properly.

The first is candour. Exercises work because people admit in the room what they would never admit in a filing. If every weakness surfaced on the day becomes a supervisory exhibit or a press line, participants will perform rather than learn, and the exercise degrades into theatre within one cycle.

The second is attack surface. Publishing where the sector's recovery breaks is a map for anyone who would like to break it, and the cloud is already the most attractive target in the system precisely because so much converges on so little.

Both arguments are real and neither gets you to silence. Nobody is asking for the injects, the transcript or a league table of which bank fumbled. The capital stress test manages exactly this tension: it publishes results without publishing anyone's trading book. The operational equivalent is an aggregate — how long to restore critical services under the scenario, how many of the thirty-eight breached their own stated impact tolerances, which shared assumptions turned out to be wrong, and the date by which the Bank expects them fixed. And on attack surface: an adversary already knows cloud concentration is the soft spot. That is why the Bank picked it as the scenario.

## Two years is a long time to say nothing

SIMEX is biennial. The next one falls in 2028. Between now and then, the only external evidence that anything changed will be whatever the Bank chooses to volunteer — which, on current form, is a quotation about collaboration. The Deputy Governor is right that preparedness safeguards financial stability. Preparedness that cannot be observed from outside is indistinguishable from the assertion of it.
