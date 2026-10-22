# 01 · Reference audit: apostarhoje.net

Audit date: 2026-10-21. Method: unauthenticated HTTP fetch of the server-rendered HTML (curl, desktop UA) for the homepage and 8 key pages. No JavaScript execution, no screenshots, no authenticated areas. Firecrawl was unavailable (account out of credits). **Not verified:** rendered visual design, colour palette, mobile menu behaviour, dropdown contents, hover/animation behaviour, Core Web Vitals. These need a browser pass (Playwright) before the design system is finalised.

## Observed (HTML-level facts)

| Area | Observation |
|---|---|
| Stack | Next.js App Router (`/_next/static`, Turbopack chunks), `next/font` (Manrope + Lora), `lang` on `<html>` |
| Routing | Locale-prefixed: `/pt-br/`, `/pt-pt/`, `/pt-ao/`, `/pt-mz/`, `/en/`. `/` redirects to `/pt-br/` |
| i18n SEO | Canonical per page, `hreflang` for 5 locales plus `x-default`, JSON-LD `Organization` (and more), sitemap.xml, `robots: Allow /` |
| Outbound links | Direct operator URLs with `rel="noopener noreferrer nofollow sponsored"` (24 on the homepage). No internal `/go/` redirect route observed |
| Top bar | Sticky sponsored strip: brand name, "18+ · Publicidade · Aplicam-se T&Cs", CTA, dismiss (×) |
| Nav | Apostas Esportivas▾, Cassinos Online▾, Bônus▾, Análises, Comparar▾, Guias▾, Notícias▾, Jogo Responsável; country switcher (País▾), language switcher (Idioma▾), hamburger |
| Featured rail | "Em destaque · Publicidade · 18+" with 5 operator tiles |
| Homepage | H1, stat strip (operators compared, verified bonuses), market chips (BR/PT/AO/MZ), legal notice on bonus rules, "Melhores Ofertas de Boas-Vindas" (offer cards with wagering requirement, CTA + "Ler análise completa"), ranked operator list, casino brands, trending operators, growth markets, latest guides, latest news |
| Review page | Visão geral, Mercados, Slots, Métodos de pagamento, Licenças, Jogo responsável, História, Capturas de ecrã, Notícias relacionadas, Casas semelhantes, FAQ |
| Section pages | /casas-de-apostas, /cassinos-online, /marcas-de-cassino, /melhores-sites-de-apostas, /bonus, /promocoes, /aplicativos, /comparador-de-odds, /resultados-ao-vivo, /esports, /ferramentas, /guias (+ pix/mbway/multibanco/crypto), /dicas-de-apostas, /noticias, /metodos-de-pagamento, /leis-de-apostas, /paises, /reviews |
| Company pages | /sobre, /contato, /anunciar (ad-sales), /jogo-responsavel |
| Ad products (stated on /anunciar) | Featured homepage partner; fixed top sportsbook/casino slot on comparison + country pages; Editor's Choice badge; category/country sponsorship; newsletter sponsorship. All labelled "Patrocinado" |
| Revenue models (stated) | CPA, revenue share, hybrid, fixed-fee listings, display/native, labelled sponsored content |
| Compliance patterns | Affiliate disclosure in footer, 18+ and "Publicidade" labels, per-country legal explainer, bonus data flagged "verificado" vs pending, "sources always cited" |
| Footer | Explorar / Aprender / Mercados / Empresa columns, affiliate disclosure, © line |

## Decisions: keep, improve, avoid

**Keep (functional patterns):** locale/country-prefixed routes; per-country legal explainer on the country home; "verified vs pending" flag on every commercial claim; separate Publicidade/18+ labelling; review template with licences + payments + FAQ; ad-sales page; hreflang + canonical + JSON-LD.

**Improve:** internal tracked click-out route (`/go/...`) with validation, dedupe and audit instead of direct links; eligibility gate that *prevents* rendering (not just labels); Spain separated from LatAm; evidence register behind every claim; consent-gated analytics.

**Do not copy:** their text, logo, layout code, name, colour palette (unverified anyway). ApuestaLoHoy gets its own identity.

## Unverifiable from this pass
Palette, type scale, breakpoints, mobile nav, dropdown contents, animation, performance numbers, whether top bar rotates sponsors, newsletter capture. Marked **TODO-browser-audit**.
