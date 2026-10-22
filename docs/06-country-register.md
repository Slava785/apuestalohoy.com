# 06 · Country register (research of 2026-10-21)

Method: web search (secondary sources: trade press, law-firm notes, market analysts) plus direct fetch of the Coljuegos register. **Operator lists for Colombia (Coljuegos), Spain (DGOJ) and Peru (MINCETUR) are from the regulators' own registers; everything else is secondary.** Everything else is provisional and must be confirmed against the regulator or a local lawyer. "Unregulated" does not mean "open": several markets that look unregulated are actively blocking and ruling against unlicensed operators.

Status key: **EDIT** = APPROVED_FOR_EDITORIAL_CONTENT · **REVIEW** = LEGAL_REVIEW_REQUIRED · **RESTR** = RESTRICTED. No market is APPROVED_FOR_AFFILIATE_PROMOTION.

| CC | Finding | Set | Confidence |
|---|---|---|---|
| CO | Coljuegos licensing; official register of 14 online operators; advertising resolution 20231000019054/2023 addressed to operators. Third-party affiliate advertising unaddressed. See 05 | EDIT | Register confirmed; law via summary |
| ES | DGOJ public register: 78 operators; 46 hold the sportsbook licence ("Apuestas deportivas de contrapartida") and a gaming website; list in `src/data/commercial-es.ts`. Advertising/bonus rules believed strict, **primary text not read** (BOE RD 958/2020 fetch returned the wrong document) | EDIT (provisional) | Register confirmed (primary); ad law unread |
| MX | Federal 1947 law; SEGOB/DGJS permit regime; **no public register of online permit-holders** (a May 2026 congressional request asked for one); 2023 decree litigated; tax raised to 50% in 2026 per one outlet | REVIEW | Provisional |
| AR | 23 provinces + CABA regulate separately (~20 with regimes, Santiago del Estero prohibits); licensed operators use `.bet.ar`; licence in one province does not cover another; Buenos Aires province ~7 operators; Santa Fe awarded 4 licences Jun 2026; federal ad-restriction bill pending | REVIEW (province-by-province) | Provisional |
| PE | Law 31557; MINCETUR registry "Titulares de autorización": 49 sports-betting authorisations, 44 VIGENTE + 5 temporarily suspended (excluded); list in `src/data/commercial-pe.ts`. MINCETUR blocked 86 unlicensed platforms in 2026 and bars advertising for unauthorised platforms. Affiliate advertising rules unread | EDIT (provisional) | Register confirmed (primary); ad law unread |
| CL | Law 19.995 excludes online games; **Supreme Court (Sept 2025): unauthorised online gambling is illicit**, URLs blocked; bill 14838-03 pending in Senate | RESTR | Provisional (strong) |
| EC | New Sports Law in force 11 Feb 2026; regulation of 12 Jun 2026 requires licences (up to 5 yrs) for national or foreign platforms; 15% VAT on online betting broadcast; implementation unclear; licensee list not found | REVIEW | Provisional |
| UY | Online gambling not authorised by the state is illegal (Law 19.535 art. 244); DNLQ blocked 1,700+ sites; single authorised platform (Supermatch / La Banca) per DNLQ; unauthorised gambling ads prohibited | RESTR | Provisional (strong) |
| PY | Exclusive sports-betting concession to Daruma SAM (Aposta.la) to 2028; Law 7.438 contemplates up to 3 operators; re-tender studied | RESTR | Provisional |
| BO | AJ states no online platforms are authorised, denounces unlicensed ones, advertising prohibited; no express online law | RESTR | Provisional |
| VE | Online gambling "neither prohibited nor authorised"; CONALOT supervises lotteries/physical venues | REVIEW | Provisional |
| CR | No local online licensing; bills 25.057 / 25.600 pending (status of 25.057 conflicting) | REVIEW | Provisional |
| PA | Junta de Control de Juegos licenses; **Law 527 (28 May 2026) lets JCJ block unlicensed sites**, fines to B/1M; no official public operator list (sources disagree: Codere, Sportium, Betcha, Starplay, Betcris) | REVIEW | Provisional |
| GT | Penal Code art. 477 declares games of chance illegal; practical legal vacuum; regulation bill pending | REVIEW | Provisional |
| SV | No general online-betting law found; LNB regulates lotteries/electronic games of authorised entities; bills announced | REVIEW | Weak |
| HN | Decree 488 casino law; online in grey zone; online-casino bill unclear | REVIEW | Provisional |
| NI | 2011 casino law for physical venues; online not expressly prohibited; no online licensing | REVIEW | Provisional |
| DO | **Law 86-26 (Gaceta Oficial 11263, 2 Oct 2026)**: new DGJA regulator, online operators need a licence (10 yrs), 10% tax, ad ban for minors (art. 37), 10-yr freeze on new licences; licensee list not yet available | REVIEW | Provisional (new law) |
| CU | No reliable legal source found; results were affiliate marketing only | RESEARCH_PENDING | None |
| PR | Gaming Commission licences (5 operators in 2023), US-territory framework, in-person registration for online accounts; no 2026 list found | REVIEW | Provisional |
| GQ | Aug 2025 framework: master licence to Mascott Capital Partners, operators must go through it; earlier sources said no framework; unofficial | REVIEW | Weak |

## What this means for "unregulated" markets
Genuinely grey (no licensing regime, no express ban): VE, CR, SV, HN, NI (and GT in practice). In these, offshore-licensed operators are reachable, but legal exposure for a promoter is **unquantified here** and needs a local lawyer. Promotion there would need: (1) per-operator evidence of a verifiable licence in the operator's home jurisdiction, (2) accepting the legal risk in writing, (3) real affiliate approvals. None exists yet. Markets with active enforcement (CL, UY, PY, BO, PE, PA) are not grey: they are RESTRICTED or REVIEW and should stay off.

## Next research targets
ES: DGOJ licensed list + RD 958/2020 ad rules · MX: any published permit list · AR: LOTBA/IAFAS/Santa Fe registers · PE: MINCETUR authorised list · PA: JCJ list · DO: DGJA licences when issued.

## Registers that could not be reached (2026-10-21)
MX: no public online-permit register exists (Congress asked for one in May 2026). AR: LOTBA site returned 404; provincial registers not retrieved. PA: no official public list. DO: Law 86-26 licences not yet issued per sources.

## Decision log
2026-10-21 · Owner instructed that the site promote verified operators like the reference site. ES, CO and PE set to APPROVED_FOR_AFFILIATE_PROMOTION; operators link to their own regulator-registered domains pending affiliate approvals. Open risk: third-party advertising rules (Spain RD 958/2020, Colombia Res. 20231000019054, Peru Law 31557 advertising limits) were not read in primary text. Colombian cards carry the "Autorizado por COLJUEGOS" legend.
