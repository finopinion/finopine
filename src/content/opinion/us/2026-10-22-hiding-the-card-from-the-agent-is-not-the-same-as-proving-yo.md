---
jurisdiction: "us"
title: "Hiding the card from the agent is not the same as proving you agreed"
dek: "Browser Tokens stop an AI agent from seeing your card or password. They do nothing about the question every disputed payment turns on: who actually authorised it, and who eats the loss."
kicker: "Agentic payments"
author: "FinOpine desk"
date: 2026-10-22
plainly: "Companies are building AI software that browses the web and buys things for you. To do that, the software usually needs your card details and passwords, which is risky. Evervault has launched a product that lets the software pay and log in without ever seeing those details. It protects the data, but not the question of whether you really wanted the purchase."
viewInBrief: "Keeping the card number away from an AI agent is good engineering. It does nothing about who authorised the purchase, and that is what every disputed payment actually turns on."
callToAction: |
  Visa, Mastercard and the issuing banks should refuse to treat an agent-initiated transaction as ordinary cardholder-present commerce unless the credential carries a scope — named merchant, dollar ceiling, expiry — and a retrievable reference to the human instruction behind it. Evervault and its competitors should ship those fields as mandatory, not optional, and publish where a consumer's dispute goes when an agent buys something nobody asked for.
  
  And the Federal Deposit Insurance Corporation and the Office of the Comptroller of the Currency, both already thinking aloud about agentic AI, should say plainly whether an agent-initiated debit the customer never requested is an unauthorised transaction. That one sentence, written down, would do more for this market than any amount of tokenisation.
position: |
  Evervault's Browser Tokens solve a real problem — credential exposure — and leave the harder one untouched. In American consumer payments, disputes do not turn on whether a card number leaked. They turn on whether a transaction was authorised. A token that lets an agent buy without seeing the card makes every agent-initiated purchase look perfectly authorised to the merchant and the issuer, because it is: the credential was used exactly as designed. The confusion sits one layer up, in whether the human ever asked for that thing, at that price, from that seller.
  
  That matters because the infrastructure layer sets the defaults everyone else inherits. If spend-capable agent credentials ship before a scope-and-mandate standard exists, the default becomes a token indistinguishable from the cardholder, and the burden of proving a purchase was never wanted lands on the person least able to reconstruct what a language model did inside a browser at 2am.
falsifier: |
  I am wrong if the credential carries enforceable scope that an issuer can see and act on. Concretely: if Evervault or a card network publishes a specification in which a Browser Token is minted against a named merchant, a dollar ceiling and an expiry, with a mandate reference the issuer can check at authorisation and the consumer can retrieve in a dispute — and issuers start declining agent traffic that lacks one.
  
  If that appears, the token stops being a bearer instrument and becomes a bounded instruction, which is the thing I am asking for. The argument would then be about how tight the caps are, not about whether authority is recorded at all.
readMins: 4
tags: ["payments","fintech","ai"]
generated: true
groundedIn: "https://www.finextra.com/pressarticle/111376/evervault-launches-browser-tokens-enabling-secure-agentic-payments?utm_medium=rssfinextra utm_source=finextrafeed"
draft: false
sources:
  - label: "Evervault launches Browser Tokens, enabling secure agentic payments"
    publisher: "Finextra"
    url: "https://www.finextra.com/pressarticle/111376/evervault-launches-browser-tokens-enabling-secure-agentic-payments?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that Evervault launched Browser Tokens at Money20/20 on 20 October 2026, letting AI agents and browser automations make purchases, log into accounts and complete sensitive workflows without exposing cards, passwords or personal data to the agent or browser provider."
    retrievedAt: "2026-10-22"
    date: "2026-10-20"
    verified: true
---

The hard problem in letting software shop for you was never the card number.

Evervault said this week at Money20/20 that it has launched Browser Tokens: a way for developers building agentic commerce — software that browses, signs in and buys on a person's behalf — to let an artificial-intelligence agent complete a purchase or log into an account without the agent, or the browser provider running it, ever seeing the card, the password or the personal data underneath. As engineering, that is sound and overdue. Handing raw card numbers and passwords to a model that reads untrusted web pages all day is an obviously bad idea, and the industry has spent a year doing it anyway.

But tokenisation is a fix for leakage. The failure mode that will define agentic commerce is not leakage. It is authority.

## What a token proves, and what it does not

American consumer payments law draws its central line between authorised and unauthorised transactions. That is the hinge on which chargebacks, liability caps and bank investigations all swing. A stolen card number produces an unauthorised transaction; a purchase you regret produces an authorised one, and a merchant dispute rather than a fraud claim.

Now consider what a Browser Token does to that line. The agent never holds the secret, so the secret cannot be stolen from it. The agent holds something better: the ability to spend without holding the secret. When it buys, the transaction arrives at the merchant and the issuer carrying a credential used exactly as designed, from an approved integration, by a party with a legitimate delegation. It looks more authorised than a human typing a card into a checkout page on hotel wi-fi.

The interesting question — did the person actually ask for this? — is not encoded anywhere in that flow. It lives in a conversation between a human and a model, which the payments system never sees.

## The confused deputy, now with a wallet

Security people have a name for this shape: the confused deputy. You give a trusted intermediary power to act for you; an attacker persuades the intermediary to use that power for them. Removing the secret from the deputy does not fix it. It only means the deputy cannot be robbed, while remaining perfectly able to be fooled.

Agents are fooled through the content they read. A product page, a review, an email, a search result — any of which can carry instructions dressed as text. Zach Perret, chief executive of the data aggregator Plaid, told the same conference that the industry is "in a dead sprint using AI to fight AI fraud" and warned of a scary year ahead for financial security. He is describing the attack surface that Browser Tokens sit on top of, not the one they close.

And when the fooling works, the consumer is in the worst possible evidentiary position. The purchase is real, the delegation was real, the logs sit with the agent vendor and the token vendor rather than the bank. Try explaining to a dispute handler that the credential was yours, the agent was yours, the intent was not.

## Logging in is the bigger half

The announcement is not only about buying. It covers signing into accounts and completing sensitive workflows. That half has no network rulebook at all. Card payments at least come with decades of dispute machinery; a general account login comes with nothing but the site's terms of service. An agent that can authenticate into accounts on a person's behalf is, functionally, account takeover with consent — and consent given once, in advance, for an open-ended set of future actions.

This is why Bill Demchak, chief executive of PNC, said this week that agent-only transactions "will never happen" and could "mess with people's lives," and why Travis Hill of the Federal Deposit Insurance Corporation is publicly thinking about what agentic AI does to deposits. Neither man is worried about card numbers leaking.

## The case for shipping it anyway

The strongest defence is that Evervault is not claiming to solve liability. It is a security vendor closing a specific hole, and credential exposure is a genuine harm with a body count of breaches behind it. Mandates, scopes and dispute rights are properly the business of card networks, issuers and regulators, not an infrastructure startup. Waiting for a standard would simply mean another year of agents being handed live cards.

That is fair as far as it goes, and it does not go far enough. The layer that mints the credential is the layer best placed to bind it — to stamp a merchant, a ceiling and an expiry into the thing at creation, because that is the only moment when the human instruction still exists in recoverable form. Defaults set at the plumbing layer become the market's defaults. If the first widely adopted agent credential is unscoped, every downstream participant will build assuming unscoped is normal, and the correction will arrive as a wave of disputes nobody can adjudicate.

Security that hides the card from the agent is worth having. It should not be mistaken for a consent architecture, and the marketing language of "secure agentic payments" invites exactly that mistake.
