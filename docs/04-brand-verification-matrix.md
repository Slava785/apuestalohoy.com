# 04 · Brand and affiliate verification matrix

**Verified against official registers (editorial listing only): CO 14 · ES 46 · PE 44. Zero affiliate links approved anywhere.** No operator names are seeded, so no unverified claim can leak. The reference site's operator list was deliberately *not* imported: those are Brazil/Portugal/Angola brands and say nothing about our markets.

## Matrix schema (one row per brand × market)
| Field | Source of truth | Gate rule |
|---|---|---|
| brand, legal entity | operator site / regulator register | |
| market domain | regulator register | destination host must be on the programme allow-list |
| licence ref + evidence URL + verified_at | regulator register | verified AND evidence present AND < 90 days |
| products (sports/casino) | operator site | |
| min age | operator T&Cs | shown on card |
| offer + terms URL + expiry | operator promo page | terms and future expiry required, else offer hidden |
| affiliate programme / network / status | network dashboard | link must be `approved` |
| tracking URL + sub-ID format | network docs | never invented |
| logo/assets permission | programme brand kit | else text-only treatment |

## Current matrix
| Market | Brands verified | Programmes approved | Blocker |
|---|---|---|---|
| CO | 14 (editorial listing only) | 0 | Legal question on third-party affiliate advertising; no affiliate accounts supplied |
| ES | 46 | 0 | Ad-law not read; no affiliate accounts |
| PE | 44 | 0 | Ad-law not read; no affiliate accounts |
| other 18 | 0 | 0 | No public register or legal review pending |

## Needed from the owner
Affiliate network/programme logins or approvals; list of target operators per market; brand kits.
