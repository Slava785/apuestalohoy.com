# ApuestaLoHoy

Spanish-language, multi-country sports-betting comparison/affiliate site. Work in progress: see `docs/` (start with `02-architecture-and-plan.md`).

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # vitest
npm run typecheck
npm run test:e2e   # builds, then Playwright + axe (needs `npx playwright install chromium` once)
npm run build
```

Data: `src/data/commercial*.ts` hold regulator-register operators (CO, ES, PE) with source and date; `src/data/markets.ts` holds per-country status.

Safety model: nothing commercial renders unless `canShowAffiliateLink` / `canServeCampaign` (`src/lib/eligibility.ts`) allow it. Every market ships as `RESEARCH_PENDING`.

## Status
Bilingual (English UK / Spanish; `/en`, `/es`). Sister site of apostarhoje.net (same structure and design language, original code and brand). ES, CO and PE show regulator-registered operators with working "Apostar ahora" buttons.

- **Links**: until affiliate tracking URLs exist, buttons go via `/go/<brand>-<cc>` to the operator's own registered domain (`rel="sponsored"`). Add real tracking links in `src/data/commercial.ts`.
- **Promotion decision**: ES/CO/PE are set to `APPROVED_FOR_AFFILIATE_PROMOTION` on the owner's instruction (2026-10-21). Advertising laws for these markets were **not** read in full; see docs/05 and docs/06 before scaling.
- **No invented data**: no bonuses, ratings or logos. Review pages state what is verified (licence) and mark the rest pending.
- **Not built**: admin, database, click logging, newsletter, contact page, banners.

## Agents and QA
Five agents (QA, content and editor, SEO and GEO, news, brand and design) keep the site correct; see `docs/AGENTS.md` and `.claude/agents/`. `npm run qa:all` runs every check and prints a report per agent; `npm run qa:crawl -- <url>` crawls a running site.

## Brand logos
Fetched from each operator's own website into `public/brands/` (see `src/data/brand-logos.ts`). Replace with the affiliate programme's brand-kit logos once approved.

## Local development note (macOS)
Do not keep this folder inside iCloud-synced Desktop/Documents with "Optimize Mac Storage": evicted `node_modules` files make `tsc`/`next` hang. Work from a non-synced folder (e.g. `~/dev/`).
