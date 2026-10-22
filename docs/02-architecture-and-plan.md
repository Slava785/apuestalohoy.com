# 02 · Architecture and build plan

## Environment findings
Empty directory, Node 24 / npm 11. **No** PostgreSQL, Docker or pnpm installed. No existing code to preserve. Next.js 16.4 scaffolded (breaking changes vs. older: `proxy.ts` replaces `middleware.ts`; `params`/`searchParams` are Promises; typed `PageProps<'/route'>` helpers).

## Stack decision
| Layer | Choice | Why |
|---|---|---|
| App | Next.js 16 (App Router) + TypeScript | SSR/SSG for SEO, same stack the reference benchmark uses, one deployable |
| i18n | Country-prefixed routes `/[country]/…`, locale resolved from a market profile (es-ES, es-MX, …), `proxy.ts` for `/` → market redirect | Content is keyed by country, not conditional text in templates |
| DB | PostgreSQL via Drizzle ORM (schema in `src/db/schema.ts`) | Spec requires relational, FK/unique constraints; Drizzle is lightweight and SQL-transparent. Local dev: PGlite (embedded Postgres, no install) or a managed Postgres via `DATABASE_URL` |
| Admin | Custom `/admin` inside the app | Workflow gates (legal/brand/affiliate/ad approvals) are domain-specific; a generic headless CMS would not enforce them |
| Auth | Signed-session cookie + argon2/bcrypt password hash, RBAC (admin, editor, legal, affiliate_manager, ad_manager) | Least infra; revisit if SSO needed |
| Tests | Vitest (unit/integration), Playwright (e2e, a11y via axe, screenshots at 320/768/1024/1440) | Matches web testing rules |
| Hosting | Not decided. Needs Node host + managed Postgres (user decision, no purchase made) | |

## The central safety design: the **Promotion Gate**
Nothing commercial renders unless all hold (`src/lib/eligibility.ts`, unit-tested):
1. Country status = `APPROVED_FOR_AFFILIATE_PROMOTION` (set by a *legal* role, with evidence rows attached).
2. A `brand_market` row exists for that country, status `verified`, evidence source + `verified_at` within max age (default 90 days).
3. An `affiliate_link` for that brand+country is `approved` and its host is on the programme's allow-list.
4. For banners: campaign `approved`, inside schedule, creative `approved`, placement allowed for country.
5. Promotions additionally need `terms_url` and `expires_at` in the future.
Failing any → component returns `null` (or neutral informational variant); admin UI cannot bypass by "saving". Seed data ships with **every country at RESEARCH_PENDING and zero verified brands**, so a fresh install promotes nothing.

## Click-out (`/go/[linkId]`)
Look up `affiliate_links` by opaque id → re-run gate → record event (campaign, placement, page, country, hashed-IP-less dedupe key via short-lived cookie-free window, bot UA filter) only if analytics consent or as aggregate-only counter → 302 to stored URL (never from query string; no open redirect possible). Partner-reported conversions come only via signed postbacks into a separate `conversions` table.

## Data model (Drizzle, `src/db/schema.ts`)
countries, locales, regulatory_records (source_url, source_type, checked_at, rule, confidence), operators, brands, brand_markets, affiliate_programmes, affiliate_links, banner_assets, ad_placements, ad_campaigns, categories, authors, articles, reviews, seo_metadata, tracking_events, conversions, consent_records, users, roles, audit_logs, scheduled_content. Workflow enum: draft → review → approved → scheduled → published → expired → archived.

## Ad system
Placements are rows (ids from the spec's 15 slots), each with allowed sizes and reserved CSS aspect-ratio. `<AdSlot id country page device>` picks highest-priority eligible campaign, renders labelled "Publicidad · +18", reserves space, lazy-loads below fold. HTML5 creatives only inside `sandbox` iframes served from a separate asset path; image/text creatives rendered natively.

## Milestone status (this session)
| # | Milestone | Status |
|---|---|---|
| 1 | Reference audit, market research framework | Audit done at HTML level; country research **framework + empty register** done; the actual per-country legal research is **not done** (needs source-by-source verification) |
| 2 | Architecture, data model, design system | This doc; schema + design tokens in progress |
| 3 | Homepage/nav/components | In progress |
| 4–10 | Everything else | Not started |

## Build order for the first vertical slice
Promotion Gate + tests → market registry → country page → directory (empty-state aware) → AdSlot → `/go` route → minimal admin. A demo fixture used only in tests proves the positive path.
