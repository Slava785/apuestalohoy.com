import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";
import { MARKET_INFO } from "@/data/market-info";
import { getDict } from "@/i18n/dict";
import { localHref, pageAlternates } from "@/i18n/config";
import { listMarkets } from "@/lib/markets";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/countries">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).countriesPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "countries") };
}

export default async function CountriesPage({ params }: PageProps<"/[lang]/countries">) {
  const lang = await pageLang(params);
  const t = getDict(lang).countriesPage;
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <div className="grid-3" style={{ marginTop: "2rem" }}>
          {listMarkets().map((m) => {
            const info = MARKET_INFO[m.code];
            return (
              <Link key={m.code} href={m.slug === "es" ? localHref(lang, "home") : localHref(lang, "countries", m.slug)} className="country-card">
                <div className="country-card__top"><span>{info?.flag}</span>{info ? <span className={`badge ${info.tier === "PRIORITY" ? "badge--gold" : "badge--dark"}`}>{t.tiers[info.tier]}</span> : null}</div>
                <h3>{m.name[lang]}</h3>
                <p>{info?.summary[lang]}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
