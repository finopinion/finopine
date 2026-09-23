---
jurisdiction: "us"
title: "A bank paying in a token it issued itself has not settled anything"
dek: "SoFi Bank is moving its card programme onto its own stablecoin with Mastercard. Settlement means the obligation is discharged in an asset nobody has to trust. A self-issued IOU is not that."
kicker: "Payments"
author: "FinOpine desk"
date: 2026-09-23
plainly: "When you pay by card, the shop's bank and your bank square up afterwards by moving money through accounts held at the central bank. SoFi, an American online bank, says it will instead settle its whole card business using a digital token it issues itself, called SoFiUSD, in partnership with Mastercard. The token is meant to be worth a dollar and exchangeable for one."
viewInBrief: "Handing someone a token you issued yourself is not settling a debt; it is swapping it for a promise with a redemption queue behind it. Before this goes live, the rulebook should say exactly when the obligation is legally discharged."
callToAction: |
  Mastercard should publish the settlement rulebook amendment covering this migration, including the defined moment of legal finality and the fallback path into central bank money when redemption fails. SoFi Bank's primary federal supervisor should publish the conditions attached to the arrangement, as the Comptroller's office does with novel charters.
  
  And the Federal Deposit Insurance Corporation should say plainly, in writing, whether a holder of a bank-issued settlement token holds an insured deposit claim, an unsecured claim, or a claim on segregated reserves. Every acquirer asked to accept one needs that answer before the first transaction, not during the first incident.
position: |
  Card settlement works because it ends in an asset the receiving bank does not have to trust anybody to make good: a balance at the Federal Reserve. If the paying bank instead hands over a token it issues itself, the obligation has not been discharged — it has been converted into a claim on that bank with a redemption promise attached. That may be a perfectly sound claim. It is not settlement, and using the word blurs the only question that matters on a bad day: at what moment did the obligation transfer, and who is exposed until it did.
  
  This matters because card settlement is non-discretionary and time-critical. An acquiring bank cannot decline to be paid, and merchants must be funded on schedule. Any friction in redemption becomes somebody else's Monday morning. Before a full card programme migrates, the network rulebook and the supervisory conditions should say in writing where legal finality sits, what backs the token, where its holders rank if the issuer fails, and what happens when redemption does not clear.
falsifier: |
  I am wrong if Mastercard and SoFi Bank publish settlement rules that define the legal moment of discharge as the token transfer itself, backed by reserves held apart from the bank's general estate with a stated priority for token holders in insolvency, plus a committed same-day fallback into central bank money when redemption fails — and if SoFi Bank's primary federal supervisor publishes conditions to that effect.
  
  If those documents exist and say that, then the token is a settlement asset in substance and not just in branding, and the complaint collapses to one about vocabulary. I would rather be shown the rulebook than argue about the press release.
readMins: 4
tags: ["stablecoins","payments","banking"]
generated: true
groundedIn: "https://www.finextra.com/newsarticle/48453/sofi-bank-goes-live-with-stablecoin-settlement-across-mastercard-network?utm_medium=rssfinextra utm_source=finextrafeed"
draft: true
sources:
  - label: "SoFi Bank goes live with stablecoin settlement across Mastercard network"
    publisher: "Finextra"
    url: "https://www.finextra.com/newsarticle/48453/sofi-bank-goes-live-with-stablecoin-settlement-across-mastercard-network?utm_medium=rssfinextra utm_source=finextrafeed"
    supports: "The item establishes that SoFi Bank and Mastercard are migrating SoFi's full card programme to blockchain settlement using SoFi's own SoFiUSD stablecoin, reported 23 September 2026."
    retrievedAt: "2026-09-23"
    date: "2026-09-23"
    verified: true
---

## Settlement is not a synonym for "fast"

Settlement is one of the few words in finance with a precise meaning, and it is not "the money arrived quickly." It means the obligation is discharged, finally and irrevocably, in an asset the receiver does not have to trust anyone to honour. In a card transaction that asset has for decades been central bank money. The issuing bank's balance at the Federal Reserve goes down, the acquiring bank's goes up, and afterwards nobody owes anybody anything. That last clause is the whole product.

SoFi Bank and Mastercard now propose to run SoFi's entire card programme on a different asset: SoFiUSD, a stablecoin the bank issues itself. The published detail is a headline and a line of summary, so what follows is an argument about the structure, not about an implementation nobody outside the two firms has seen. The structure is enough to argue about, because it has one feature you cannot design away.

## You cannot discharge a debt with your own IOU

When the paying party settles in its own liability, the receiving party has not been paid. It has been issued a promise with a redemption process behind it. Banks do this all day — a deposit is exactly that — but a deposit is not how interbank obligations are extinguished, and for good reason. The acquirer holding SoFiUSD at the end of the day is a creditor of SoFi Bank until it redeems. The moment of finality has not been abolished; it has been moved one step later, into the redemption queue, with a token sitting in front of it.

So the central bank does not leave the chain. It is still there, at the end, when somebody wants actual dollars. What changes is that a new intermediate leg has been inserted, and the exposure during that leg belongs to whoever is holding the token. Whether that exposure is trivial or serious depends entirely on things a press release does not tell you: what the reserves are, whether they sit apart from the bank's general estate, whether token holders rank ahead of ordinary creditors, and who eats the loss if redemption is gated on a Sunday afternoon.

Card settlement is the least forgiving place to find out. An acquiring bank cannot decide to be paid tomorrow instead. Merchants are funded on a schedule. A redemption problem does not stay a redemption problem; within hours it is a merchant funding problem, and merchant funding problems are how payments incidents become newspaper stories.

## Four per cent changes the arithmetic

There is a reason this idea is arriving now rather than in 2021. The Federal Open Market Committee lifted its target range to 3.75 to 4 per cent last week. Balances that used to sit overnight at negligible opportunity cost are now worth real money, and the reserves behind a stablecoin earn the money market rate for whoever holds them. Any design that lengthens the period during which settlement value sits inside your own reserve pool rather than someone else's is worth something, and the number is not small across a full card programme.

I am not saying that is the stated reason; I have not seen the statement. I am saying the interest rate arithmetic is not neutral, and readers should price the enthusiasm accordingly. Float has always been a payments business model. Tokenising it does not change what it is.

## The strongest case for doing it anyway

Here is the honest version of the other side. Deposits are already private liabilities, correspondent balances already carry intraday credit exposure, and a Mastercard settlement obligation is already a claim on somebody. Purity about central bank money is a bit rich when the existing plumbing is full of private credit. Cards run every hour of every day; settlement does not. The weekend gap the current system tolerates is a real mismatch, and continuous settlement closes it. And if the reserves are Treasury bills and central bank deposits held outside the bank's general balance sheet, the acquirer's claim may be better collateralised than the correspondent balance it replaces.

All of that could be true. Every clause of it turns on documents. Reserve composition, segregation, redemption rights, insolvency ranking, and the network rule that says what happens when redemption fails at two in the afternoon on a business day. The well-built version and the badly-built version look identical from the outside until the first bad day, which is precisely why the documents, not the announcement, are the story.

## The advantage of doing this inside a bank

There is one genuinely good thing here. This is a chartered bank, not an offshore issuer, which means a supervisor can simply require the answers as a condition rather than asking politely afterwards. The Office of the Comptroller of the Currency did something adjacent this week, conditionally approving three national trust charters for firms in this part of the market. Conditional is the operative word: with novel plumbing, the conditions are where all the substance lives, and they are public.

The same discipline should apply here, and it should apply before migration rather than after. There is also a question nobody has answered in public and someone should: whether a holder of a bank-issued settlement token has a deposit claim or something weaker. That is not a technicality. It is the difference between two entirely different products wearing the same name.
