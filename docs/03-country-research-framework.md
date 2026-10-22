# 03 · Country research framework and register

**Status of the research itself: NOT DONE.** This file is the framework and the empty register. No legal conclusion below is verified. "Candidate regulator" entries come from general knowledge, may be outdated or wrong, and exist only to tell the researcher where to start. Every row is `RESEARCH_PENDING` in `src/data/markets.ts`, so the site promotes nothing.

## Evidence record (one row per material claim)
`country · field · claim · source_url · source_type (regulator|legislation|gov_publication|operator|industry) · date_checked · confidence (confirmed|provisional|unresolved) · reviewer`

## Status transitions
| From → To | Who | Required evidence |
|---|---|---|
| RESEARCH_PENDING → LEGAL_REVIEW_REQUIRED | researcher | All 18 research fields drafted with sources |
| → APPROVED_FOR_EDITORIAL_CONTENT | legal reviewer | Informational/educational content permitted; no operator promotion |
| → APPROVED_FOR_AFFILIATE_PROMOTION | legal reviewer | Affiliate marketing + bonus advertising rules documented, required warnings implemented, operator register checked |
| any → RESTRICTED / DO_NOT_PROMOTE | legal reviewer | Written reason; takes effect immediately in the Promotion Gate |

Re-check cadence: 90 days (matches the gate's verification max age), and immediately before launch.

## Candidate starting points (UNVERIFIED, from memory)
| Market | Candidate authority to check first | Spain/LatAm note |
|---|---|---|
| ES | DGOJ (Dirección General de Ordenación del Juego) | Assess independently; strict advertising/bonus rules likely, so default to no promotional components |
| MX | Secretaría de Gobernación, Dirección General de Juegos y Sorteos | Permit-holder register to check |
| CO | Coljuegos | Operator domains are individually authorised |
| AR | Provincial authorities (e.g. LOTBA for CABA, IAFAS for Buenos Aires province) | Province-by-province; no national regime assumed |
| PE | MINCETUR | Recent online-betting framework to verify |
| CL | Superintendencia de Casinos de Juego / pending legislation | Legal position uncertain, treat as LEGAL_REVIEW_REQUIRED at best |
| EC, UY, PY, BO, VE, CR, PA, GT, SV, HN, NI, DO, CU, PR, GQ | To be identified | PR is a US-territory framework, distinct from LatAm |

## Launch prioritisation
Not yet possible. Needs (a) completed legal research, (b) at least one genuine affiliate programme approval per market, (c) keyword research. Do not pick a launch market before these exist.

## Localisation glossary seeds (to be validated by native reviewers)
Spain: *casa de apuestas*, *cuota*, *apuesta combinada*, *ingresar/retirar*. LatAm varies (*momio* is MX usage, *cuota* common elsewhere): each profile needs its own glossary before content is written.
