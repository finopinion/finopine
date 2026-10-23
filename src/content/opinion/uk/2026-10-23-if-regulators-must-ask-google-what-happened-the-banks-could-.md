---
jurisdiction: "uk"
title: "If regulators must ask Google what happened, the banks could not tell them"
dek: "The European Banking Authority and the Financial Conduct Authority have been in contact with Google after a cloud outage took down bank websites. The firms they actually authorise are the banks."
kicker: "Operational resilience"
author: "FinOpine desk"
date: 2026-10-23
plainly: "Banks no longer run all their own computers. They rent capacity from a few very large technology firms, one of which is Google. When that capacity failed this week, several banks' websites went down with it, and customers could not get to their accounts. Two financial regulators, the UK's Financial Conduct Authority and the European Banking Authority, have been in touch with Google about it."
viewInBrief: "The banks, not Google, are the ones regulators authorise, and the decision to put customer services behind one supplier with no tested fallback was theirs. A private call to the vendor produces no public record of how long anyone was locked out."
callToAction: |
  The Financial Conduct Authority should publish, within thirty days of this outage, a per-firm record for every authorised firm whose customers lost account access: start and end times, services affected, the third party involved, whether a contingency existed, whether it was used, and when it was last tested. Firms should be required to tell affected customers the duration directly, not leave it to a status page.
  
  The European Banking Authority and the FCA should also make Google answer once, jointly and on the record, rather than twice in private. If direct oversight of critical suppliers is the future, its first product should be a published finding — otherwise it is just a phone call with a press line attached.
position: |
  Supervisors talking to a cloud provider after an outage is not supervision of that provider; it is an admission that the accountability chain has been reversed. Google is not an authorised bank. The banks are. Every decision that turned one vendor's bad day into several banks' customers being locked out of their own account pages — which services to put behind one provider, what the fallback was, whether it had ever been tested under load — was a banking decision, taken by a regulated firm, and should be answered for by that firm in public.
  
  What follows is that a private conversation with the vendor is the worst available outcome. It produces assurances nobody outside the room can check, it duplicates across jurisdictions, and it quietly tells boards that resilience is now someone else's supervisory problem. The useful output of this week is not a reassurance from Google. It is a per-firm record of how long customers were shut out, what the contingency was, and whether anyone had ever run it.
falsifier: |
  I am wrong if, within a month of the outage, the Financial Conduct Authority publishes a per-firm incident record — naming the affected UK firms, the start and end times of the disruption, the customer-facing services lost, and whether each firm's own contingency arrangement worked — or confirms it has opened a formal, documented information request whose findings it will publish. Either would show the contact with Google was the front end of a process with an output, not the whole response.
  
  If that happens, the architecture is working as intended and my complaint is about sequencing, not substance. If three months pass with nothing published beyond the fact that conversations took place, the complaint stands and will stand after the next outage too.
readMins: 4
tags: ["operational resilience","cloud","banking"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48637/uk-and-eu-financial-regulators-seek-answers-from-google-over-cloud-outage?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "UK and EU financial regulators seek answers from Google over cloud outage"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48637/uk-and-eu-financial-regulators-seek-answers-from-google-over-cloud-outage?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "Finextra reports that the European Banking Authority and the UK's Financial Conduct Authority have been in contact with Google following a major cloud outage this week that took down several bank websites."
    retrievedAt: "2026-10-23"
    date: "2026-10-22"
    verified: true
---

## The call went to the wrong building

Several bank websites stopped working this week. What we know about the official response is that two authorities — the European Banking Authority and the United Kingdom's Financial Conduct Authority — have been in contact with Google.

Neither of them authorises Google to take deposits, run payment accounts or hold anybody's money. They authorise the banks. And the banks are the only parties in this story who made the decisions that turned a single supplier's bad day into customers being unable to see their own balances.

That is not a technicality. Renting computing capacity from a large provider is an ordinary, sensible thing for a bank to do; nobody should want every bank building its own data centres. But the choice of which customer-facing services to place behind one supplier, the choice of what happens when that supplier goes dark, and the choice of whether to ever rehearse that scenario are all banking choices. They are made in bank risk committees, signed off by bank boards, and paid for out of bank budgets. If supervisors have to ring the vendor to find out what happened, the firms they supervise could not tell them — and that, not the outage, is the supervisory failure worth writing about.

## "In contact" is not an output

Contact with a supplier produces nothing a customer can use. There is no duration, no count of affected accounts, no statement of which services degraded and which stayed up, no answer to the only question a locked-out customer actually has, which is how long.

Compare what a bank is expected to produce when it loses money. A capital shortfall generates numbers, filings, dates and consequences. An availability failure of the same severity — people cannot reach their accounts for hours — tends to generate a status page, an apology, and silence. The asymmetry is strange, because for a retail customer the two failures feel identical at the moment they happen.

The absence matters more now than it used to, because the failures are correlated. Several banks going down together is not several independent accidents. It is one accident, shared, which is precisely the outcome that diversification of suppliers is supposed to prevent and precisely the outcome that concentration in a handful of cloud providers makes more likely. A system in which each firm individually made a defensible outsourcing decision can still produce a collective failure that none of them would have chosen. You cannot see that unless somebody collects and publishes the per-firm detail.

## The strongest case for going straight to Google

There is a serious argument on the other side, and it is the one supervisors would make. Concentration cuts both ways. If one provider underpins a large slice of the banking system, then dealing with that provider directly is faster, better informed and more likely to fix the root cause than conducting twenty separate conversations with twenty firms who are all quoting the same incident report back at you. Supervising the hub beats interrogating the spokes. Engagement with the provider is also the only way to get at questions no individual bank can answer, such as how failures propagate across a shared region, or what the provider's own recovery sequencing looks like.

All true — and it only works if direct engagement produces something public. A regime that supervises critical suppliers through published standards, mandated testing and findings that firms and their customers can read is a genuine advance. A regime that supervises them through quiet calls and private reassurance is worse than nothing, because it transfers the appearance of responsibility to the provider while leaving the legal responsibility with the banks. Boards read that signal accurately. If the regulator is now talking to Google, the internal case for spending money on a second path to the same service gets harder to win.

There is also a coordination problem sitting in plain sight. A European authority and a British authority each contacting the same global supplier about the same incident will get two sets of answers, neither of which either public can read. One incident, two private conversations, zero published findings. The provider answers twice; the customers learn nothing once.

## What the public record should contain

The fix is unglamorous and cheap. For any incident where retail customers lose access to accounts, each affected firm should file, and the regulator should publish, a short standard record: when it started, when normal service resumed, which services were unavailable, roughly how many customers were affected, which third party was involved, whether the firm had a contingency arrangement for that failure, whether it was invoked, and whether it had been tested in the previous twelve months.

That last line is the one that changes behaviour. It is easy to write a resilience policy and hard to explain, in public, that you had never run it. Publishing the untested fallback does more for operational resilience than any number of conversations with a supplier, because it puts the cost of not spending the money where it belongs — on the firm that took the deposit and made the promise.
