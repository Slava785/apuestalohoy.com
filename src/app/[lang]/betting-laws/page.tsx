import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { MARKET_INFO } from "@/data/market-info";
import { MARKET_SOURCES } from "@/data/market-sources";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { listMarkets } from "@/lib/markets";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/betting-laws">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).lawsPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "laws") };
}

export default async function LawsPage({ params }: PageProps<"/[lang]/betting-laws">) {
  const lang = await pageLang(params);
  const t = getDict(lang).lawsPage;
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap prose">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        {listMarkets().map((m) => {
          const info = MARKET_INFO[m.code];
          const sources = MARKET_SOURCES[m.code] ?? [];
          return (
            <section key={m.code} aria-labelledby={`law-${m.slug}`}>
              <h2 id={`law-${m.slug}`}>{info?.flag} {m.name[lang]}</h2>
              <p>{info?.summary[lang]}</p>
              {sources.length > 0 ? (
                <ul>{sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a></li>)}</ul>
              ) : <p><em>{t.noSources}</em></p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
