# Retired drafts

Four pieces written before the sourcing rule was enforced. They are readable and
the arguments may hold, but every citation in them was written from memory: no
URL, nothing verified. That is the failure mode this project is built to avoid,
so they sit outside the content collection and cannot be published by accident.

The flaw is not hypothetical. The original flagship piece argued at length that
the monthly CPI indicator was too noisy to steer by. That series had been
discontinued in October 2025 and replaced by the complete Monthly CPI, which is
now the benchmark for the RBA's inflation target. The argument was built on a
number that no longer existed. A live search caught it; memory did not.

## To bring one back

1. Search for the primary source. Do not start from the draft's claims.
2. Rewrite the argument around what the source actually says. Expect the
   argument to change - if it does not, you are writing from memory again.
3. Give every citation a real URL from a live result.
4. Run `npm run check:wire` style verification, set `verified: true`.
5. Move it into `src/content/opinion/<jurisdiction>/`.

The schema enforces steps 3 and 4. It will not build otherwise.

See `src/content/opinion/au/2026-08-27-the-target-moved.md` for the pattern:
five citations, five live URLs, and an argument that only exists because the
sources were read first.


---

## Status, 27 August 2026

Three of the four have been rebuilt from live search and are now published.
In every case the argument changed, because the sources said something other
than what memory had supplied:

| original claim (from memory) | what the sources said |
| --- | --- |
| The monthly CPI indicator is too noisy to steer by | That series was discontinued in Oct 2025. The complete Monthly CPI replaced it and is now the target benchmark — while the RBA keeps deciding off the quarterly trimmed mean until 2027 |
| Div 296 grandfathering favours SMSFs over pooled funds | Not supported. The sourced story is lumpy indexation: thresholds move in $150,000 steps, so they sit frozen between them |
| Crypto licensing will consolidate the sector | The live story is the ten-month gap — ASIC's no-action relief expired 30 June 2026, the Act does not commence until 9 April 2027 |
| The payments perimeter moved | It did, but the real change is that the Treasurer can now designate on national-interest grounds, a power previously the RBA's alone |

Not one of those corrections was a detail. Each was the spine of the piece.

### Still outstanding

`2026-08-25-licence-enforce-or-tax.md` — the cross-border comparison. It needs
primary sources from at least two jurisdictions before it can be rebuilt, and
doing that properly is its own research round rather than an edit. Left here
deliberately rather than rushed.
