import Link from "next/link";
import { BrandRow, MiniCard, OfferCard } from "@/components/BrandCards";
import { GuideCard } from "@/components/GuideCard";
import { NewsCard } from "@/components/NewsCard";
import { RgBanner } from "@/components/RgBanner";
import { SectionHead } from "@/components/SectionHead";
import { GUIDES } from "@/content/guides";
import { ARTICLES } from "@/content/news";
import { MARKET_INFO } from "@/data/market-info";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { LogoTile } from "@/components/LogoTile";
import { getActiveMarketCodes, getListedBrands, getMarketBrands } from "@/lib/market-brands";
import { getMarketBySlug } from "@/lib/markets";
import type { Market } from "@/lib/types";

const marketHref = (lang: Lang, m: Market) => (m.slug === "es" ? localHref(lang, "home") : localHref(lang, "countries", m.slug));

export async function MarketHome({ market, lang }: { market: Market; lang: Lang }) {
  const d = getDict(lang);
  const t = d.home;
  const brands = (await getMarketBrands(market.code)).map((b) => toCardData(b, lang));
  const casinos = brands.filter((b) => b.products.includes("casino"));
  const name = market.name[lang];
  const active = await getActiveMarketCodes();
  const others = active.filter((c) => c !== market.code).map((c) => getMarketBySlug(c.toLowerCase())).filter((m): m is Market => m !== null);
  const sportsHref = localHref(lang, "sportsBetting");

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">{t.kicker()}</p>
          <h1>{t.title()}</h1>
          <p className="hero__lede">{t.lede()}</p>
          <div className="hero__stats">
            <div><strong>{brands.length}</strong><span>{t.statListed}</span></div>
            <div><strong className="accent">{casinos.length}</strong><span>{t.statCasino}</span></div>
          </div>
          <div className="chips">{t.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
          <div className="hero__cta">
            <Link className="btn btn--green" href={sportsHref}>{t.ctaSports}</Link>
            <Link className="btn btn--dark" href={localHref(lang, "casinos")}>{t.ctaCasinos}</Link>
            <Link className="btn btn--dark" href={localHref(lang, "bonuses")}>{t.ctaBonuses}</Link>
          </div>
        </div>
      </section>

      <div className="markets-bar">
        <div className="wrap markets-bar__row">
          <span className="markets-bar__label">{t.otherMarkets}</span>
          {others.map((m) => <Link key={m.code} href={marketHref(lang, m)}>{MARKET_INFO[m.code]?.flag} {m.name[lang]}</Link>)}
          <Link href={localHref(lang, "countries")}>{t.seeAllMarkets}</Link>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker={d.ads.topPicksKicker(name.toUpperCase())} title={d.ads.topPicksTitle} text={d.ads.topPicksText} href={sportsHref} linkLabel={d.common.seeAll} />
          <div className="picks">{brands.slice(0, 6).map((b) => <OfferCard key={b.slug} b={b} lang={lang} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead kicker={t.rowsKicker} title={t.rowsTitle} text={t.rowsText} href={sportsHref} linkLabel={d.common.seeAll} />
          <ol className="rows">{brands.slice(0, 3).map((b, i) => <BrandRow key={b.slug} b={b} lang={lang} rank={i + 1} />)}</ol>
        </div>
      </section>

      {casinos.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead kicker={t.casinosKicker} title={t.casinosTitle} text={t.casinosText} href={localHref(lang, "casinos")} linkLabel={d.common.seeAll} />
            <ol className="rows">{casinos.slice(0, 3).map((b, i) => <BrandRow key={b.slug} b={b} lang={lang} rank={i + 1} />)}</ol>
          </div>
        </section>
      ) : null}

      <section className="section section--navy">
        <div className="wrap">
          <SectionHead kicker={t.verifiedKicker} title={t.verifiedTitle} href={localHref(lang, "reviews")} linkLabel={t.verifiedLink} />
          <div className="scroller">{brands.slice(0, 10).map((b) => <MiniCard key={b.slug} b={b} lang={lang} />)}</div>
          {others.length > 0 ? (
            <div style={{ marginTop: "3.5rem" }}>
              <SectionHead kicker={t.moreKicker} title={t.moreTitle} href={localHref(lang, "countries")} linkLabel={t.moreLink} />
              <div className="grid-4">
                {others.map((m) => (
                  <Link key={m.code} href={marketHref(lang, m)} className="country-card">
                    <div className="country-card__top"><span>{MARKET_INFO[m.code]?.flag}</span><span className="badge badge--gold">{MARKET_INFO[m.code] ? d.countriesPage.tiers[MARKET_INFO[m.code].tier] : ""}</span></div>
                    <h3>{m.name[lang]}</h3>
                    <p>{MARKET_INFO[m.code]?.summary[lang]}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker={t.guidesKicker} title={t.guidesTitle} href={localHref(lang, "guides")} linkLabel={d.common.seeAll} />
          <div className="grid-4">{GUIDES.map((g) => <GuideCard key={g.slug} g={g} lang={lang} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead kicker={t.newsKicker} title={t.newsTitle} href={localHref(lang, "news")} linkLabel={d.common.seeAll} />
          <div className="news-grid">{ARTICLES.slice(0, 4).map((a) => <NewsCard key={a.slug} a={a} lang={lang} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap"><RgBanner lang={lang} /></div>
      </section>
    </>
  );
}

/** Shown for markets with no verified operators: legal position, summary and sources. */
export async function ResearchState({ market, lang, sources }: { market: Market; lang: Lang; sources: readonly { label: string; url: string }[] }) {
  const d = getDict(lang);
  const t = d.countriesPage;
  const info = MARKET_INFO[market.code];
  const name = market.name[lang];
  const listed = await getListedBrands(market.code);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="kicker">{info?.flag} {name.toUpperCase()} · {info ? t.tiers[info.tier].toUpperCase() : ""}</p>
          <h1>{t.metaTitle2(name)}</h1>
          <p className="hero__lede">{info?.summary[lang]}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap prose">
          {listed.length === 0 ? <div className="notice"><strong>{t.notListed(name)}</strong> <small>{t.notListedText}</small></div> : null}
          {listed.length > 0 ? (
            <section aria-labelledby="listed">
              <h2 id="listed">{d.listed.title(name)}</h2>
              <p>{d.listed.text}</p>
              <div className="grid-4">
                {listed.map((b) => (
                  <article key={b.slug} className="card">
                    <div className="card__top">
                      <LogoTile name={b.name} slug={b.slug} />
                      <div><h3>{b.name}</h3><p>{name}</p></div>
                    </div>
                    <div><span className="badge badge--line">{d.listed.badge}</span></div>
                    <div className="card__actions">
                      <Link className="btn btn--outline btn--block" href={localHref(lang, "bookmakers", b.slug)}>{d.common.readReview}</Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          {sources.length > 0 ? (
            <>
              <h2>{t.sources}</h2>
              <ul>{sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a></li>)}</ul>
            </>
          ) : null}
          <p><Link href={localHref(lang, "laws")}>{t.allLaws}</Link></p>
        </div>
      </section>
    </>
  );
}
