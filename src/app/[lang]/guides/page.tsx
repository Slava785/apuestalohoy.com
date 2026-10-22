import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { PartnerAds } from "@/components/PartnerAds";
import { Prose } from "@/components/Prose";
import { GUIDES } from "@/content/guides";
import { formatDate, getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { getMarketBrands } from "@/lib/market-brands";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).guidesPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "guides") };
}

export default async function GuidesPage({ params }: PageProps<"/[lang]/guides">) {
  const lang = await pageLang(params);
  const t = getDict(lang).guidesPage;
  const ads = (await getMarketBrands("ES")).slice(0, 3).map((b) => toCardData(b, lang));
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <div className="layout-news">
        <div>
        <nav aria-label={t.inThisPage} className="toc">
          <strong>{t.inThisPage}</strong>
          <ul>{GUIDES.map((g) => <li key={g.slug}><a href={`#${g.slug}`}>{g.title[lang]}</a></li>)}</ul>
        </nav>
        {GUIDES.map((g) => (
          <article key={g.slug} id={g.slug} className="prose article">
            <p className="kicker">{g.category[lang]}</p>
            <h2>{g.title[lang]}</h2>
            <p className="muted">{t.updated} {formatDate(lang, g.updated)}</p>
            <Prose blocks={g.body[lang]} lang={lang} />
            <p className="notice">{t.disclaimer}</p>
          </article>
        ))}
        </div>
        <PartnerAds brands={ads} lang={lang} />
        </div>
      </div>
    </div>
  );
}
