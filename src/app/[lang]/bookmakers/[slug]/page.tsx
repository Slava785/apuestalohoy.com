import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BetButton, Legend, MiniCard } from "@/components/BrandCards";
import { Crumbs } from "@/components/Crumbs";
import { LogoTile } from "@/components/LogoTile";
import { SectionHead } from "@/components/SectionHead";
import { MARKET_INFO } from "@/data/market-info";
import { REGULATORS } from "@/data/regulators";
import { formatDate, getDict } from "@/i18n/dict";
import { LANGS, localHref, pageAlternates, type Lang } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { getActiveMarketCodes, getBrandBySlug, getListedBrands, getListedBySlug, getListedMarketCodes, getMarketBrands } from "@/lib/market-brands";
import { getMarketBySlug } from "@/lib/markets";
import { pageLang } from "@/lib/page-lang";

export async function generateStaticParams() {
  const codes = await getActiveMarketCodes();
  const all = (await Promise.all(codes.map((c) => getMarketBrands(c)))).flat();
  const listed = (await Promise.all((await getListedMarketCodes()).map((c) => getListedBrands(c)))).flat();
  return LANGS.flatMap((lang) => [...all, ...listed].map((b) => ({ lang, slug: b.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/bookmakers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await pageLang(params);
  const b = await getBrandBySlug(slug);
  if (!b) {
    const l = await getListedBySlug(slug);
    if (!l) return {};
    const country = getMarketBySlug(l.countryCode.toLowerCase())?.name[lang] ?? "";
    return { title: getDict(lang).listed.reviewTitle(l.name, country), alternates: pageAlternates(lang, "bookmakers", l.slug), robots: { index: false, follow: true } };
  }
  const market = getMarketBySlug(b.countryCode.toLowerCase());
  const r = getDict(lang).review;
  const reg = REGULATORS[b.countryCode]?.name[lang] ?? "";
  const country = market?.name[lang] ?? "";
  return { title: r.metaTitle(b.name, country), description: r.metaDescription(b.name, reg, country), alternates: pageAlternates(lang, "bookmakers", b.slug) };
}

function ListedReview({ name, slug, countryCode, lang }: { name: string; slug: string; countryCode: string; lang: Lang }) {
  const d = getDict(lang);
  const market = getMarketBySlug(countryCode.toLowerCase());
  const country = market?.name[lang] ?? countryCode;
  return (
    <div className="wrap">
      <Crumbs lang={lang} trail={[{ label: d.review.crumbBookmakers, href: localHref(lang, "countries", market?.slug) }, { label: name }]} />
      <div className="notice" style={{ marginBlock: "1.5rem" }}>
        <strong>{d.listed.badge}</strong> {d.listed.reviewText(name, country)}
      </div>
      <div className="review-head__who">
        <LogoTile name={name} slug={slug} size={80} />
        <div>
          <h1>{name}</h1><span className="badge badge--line">{d.listed.badge}</span>
          <p className="lede" style={{ marginTop: "0.75rem" }}>{MARKET_INFO[countryCode]?.flag} {country}</p>
        </div>
      </div>
      <section className="prose" aria-labelledby="rg"><h2 id="rg">{d.review.rg}</h2><ul>{d.review.rgItems.map((x) => <li key={x}>{x}</li>)}</ul></section>
      <p><Link href={localHref(lang, "countries", market?.slug)}>{d.listed.back(country)}</Link></p>
    </div>
  );
}

export default async function ReviewPage({ params }: PageProps<"/[lang]/bookmakers/[slug]">) {
  const { slug } = await params;
  const lang = await pageLang(params);
  const b = await getBrandBySlug(slug);
  if (!b) {
    const l = await getListedBySlug(slug);
    if (!l) notFound();
    return <ListedReview name={l.name} slug={l.slug} countryCode={l.countryCode} lang={lang} />;
  }
  const d = getDict(lang);
  const r = d.review;
  const market = getMarketBySlug(b.countryCode.toLowerCase());
  const regInfo = REGULATORS[b.countryCode];
  const reg = regInfo?.name[lang] ?? "";
  const country = market?.name[lang] ?? "";
  const card = toCardData(b, lang);
  const checked = formatDate(lang, b.verifiedAt);
  const similar = (await getMarketBrands(b.countryCode)).filter((x) => x.slug !== b.slug).slice(0, 2).map((x) => toCardData(x, lang));
  const hasCasino = b.products.includes("casino");
  const h2 = { fontSize: "2rem", margin: "2rem 0 0.5rem" } as const;

  return (
    <div className="wrap">
      <Crumbs lang={lang} trail={[{ label: r.crumbBookmakers, href: localHref(lang, "sportsBetting") }, { label: b.name }]} />

      <div className="notice" style={{ marginBlock: "1.5rem" }}>
        <strong>{r.statusLabel}</strong> {r.statusText(b.name, reg)}{" "}
        <small>{r.lastChecked(checked)} {r.source} <a href={b.evidenceUrl} rel="noopener noreferrer" target="_blank">{regInfo?.registerLabel[lang]}</a>.</small>
      </div>

      <div className="review-head">
        <div className="review-head__who">
          <LogoTile name={b.name} slug={b.slug} size={80} />
          <div>
            <h1>{b.name}</h1><span className="badge">{d.common.verified}</span>
            <p className="lede" style={{ marginTop: "0.75rem" }}>{card.descriptor}</p>
            <dl className="facts">
              <div><dt>{r.operator}</dt><dd>{b.entity}</dd></div>
              <div><dt>{r.domain}</dt><dd>{b.domain}</dd></div>
              <div><dt>{r.country}</dt><dd>{MARKET_INFO[b.countryCode]?.flag} {country}</dd></div>
            </dl>
          </div>
        </div>
        <div className="review-cta">
          <BetButton slug={b.slug} lang={lang} />
          <Legend b={card} />
        </div>
      </div>

      <div className="layout-2">
        <div>
          <section className="prose" aria-labelledby="overview">
            <h2 id="overview">{r.overview}</h2>
            <p>{r.overviewText(b.name, reg, country, b.entity, b.licence, b.domain)}</p>
            <p>{r.overviewPending}</p>
          </section>

          <section aria-labelledby="markets">
            <h2 id="markets" className="page-title" style={h2}>{r.markets}</h2>
            <div className="info-grid">
              <div className="info-card"><h3>{r.sports}</h3>{r.sportsText}</div>
              <div className="info-card"><h3>{d.common.casino}</h3>{hasCasino ? r.casinoYes : r.casinoNo}</div>
              <div className="info-card"><h3>{r.live}</h3>{d.common.notReviewed}</div>
              <div className="info-card"><h3>{r.streaming}</h3>{d.common.notReviewed}</div>
            </div>
          </section>

          <section aria-labelledby="payments">
            <h2 id="payments" className="page-title" style={h2}>{r.payments}</h2>
            <div className="info-grid"><div className="info-card"><h3>{r.paymentsCard}</h3>{d.common.notReviewed}</div></div>
          </section>

          <section aria-labelledby="licences">
            <h2 id="licences" className="page-title" style={h2}>{r.licences}</h2>
            <div className="info-card" style={{ maxWidth: "36rem" }}>
              <h3>{r.officialRegister}</h3>
              <p><strong>{regInfo?.label}</strong> ({country}) · {b.licence}</p>
              <p>{r.company}: {b.entity}</p>
              <p className="muted" style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>{r.countriesCovered(country, checked)}</p>
            </div>
          </section>

          <div className="proscons">
            <div className="pros"><h3>{r.pros}</h3><ul><li>{r.prosItem(reg, country)}</li></ul></div>
            <div className="cons"><h3>{r.cons}</h3><ul><li>{d.common.notReviewed}</li></ul></div>
          </div>

          <section className="prose" aria-labelledby="rg"><h2 id="rg">{r.rg}</h2><ul>{r.rgItems.map((x) => <li key={x}>{x}</li>)}</ul></section>
          <section className="prose" aria-labelledby="history"><h2 id="history">{r.history}</h2><p>{r.historyText(reg, b.licence)}</p></section>
          <section className="prose" aria-labelledby="shots"><h2 id="shots">{r.screenshots}</h2><p><em>{r.screenshotsText}</em></p></section>
        </div>

        <aside>
          <div className="bonus-box">
            <p className="kicker">{r.bonus}</p>
            <h3>{d.common.promoHeadline}</h3>
            <p>{d.common.promoDetail}</p>
            <BetButton slug={b.slug} lang={lang} label={d.common.viewPromotions} />
          </div>
        </aside>
      </div>

      {similar.length > 0 ? (
        <section className="section">
          <SectionHead kicker={r.similarKicker} title={r.similarTitle} />
          <div className="grid-3">{similar.map((s) => <MiniCard key={s.slug} b={s} lang={lang} />)}</div>
        </section>
      ) : null}
    </div>
  );
}
