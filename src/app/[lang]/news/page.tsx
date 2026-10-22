import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { COVER } from "@/components/NewsCard";
import { NewsGrid, type NewsItem } from "@/components/NewsGrid";
import { PartnerAds } from "@/components/PartnerAds";
import { Prose } from "@/components/Prose";
import { ARTICLES } from "@/content/news";
import { formatDate, getDict } from "@/i18n/dict";
import { localHref, pageAlternates } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { getMarketBrands } from "@/lib/market-brands";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/news">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).newsPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "news") };
}

export default async function NewsPage({ params }: PageProps<"/[lang]/news">) {
  const lang = await pageLang(params);
  const t = getDict(lang).newsPage;
  const ads = (await getMarketBrands("ES")).slice(0, 3).map((b) => toCardData(b, lang));
  const items: NewsItem[] = ARTICLES.map((a) => ({
    slug: a.slug, title: a.title[lang], summary: a.summary[lang], category: a.category[lang], date: a.date,
    dateLabel: formatDate(lang, a.date), variant: a.variant, source: `${t.sourceLabel}: ${a.sources[0]?.label.split(" · ")[0] ?? ""}`,
  }));
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apuestalohoy.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: a.title[lang],
        datePublished: a.date,
        inLanguage: lang,
        url: `${SITE}${localHref(lang, "news")}#${a.slug}`,
        author: { "@type": "Organization", name: "ApuestaLoHoy" },
        citation: a.sources.map((s) => s.url),
      },
    })),
  };
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.heading}</h1>
        <p className="lede">{t.lede}</p>
        <div className="layout-news">
          <div>
            <NewsGrid lang={lang} items={items} basePath={localHref(lang, "news")} />
            <h2 className="page-title" style={{ fontSize: "1.8rem", marginTop: "3rem" }}>{t.allStories}</h2>
            <div className="article-list">
              {ARTICLES.map((a) => (
                <article key={a.slug} id={a.slug} className="article-card">
                  <div className="story__cover" aria-hidden="true">
                    <span className="story__block" style={{ background: COVER[a.variant].bg }}>
                      <svg width="48" height="48" viewBox="0 0 24 24">{COVER[a.variant].icon}</svg>
                    </span>
                    <span className="badge badge--ghost story__tag">{a.category[lang]}</span>
                  </div>
                  <div className="article-card__body prose">
                    <time className="muted" dateTime={a.date}>{formatDate(lang, a.date)}</time>
                    <h2>{a.title[lang]}</h2>
                    <p className="muted">{t.by}</p>
                    <Prose blocks={a.body[lang]} lang={lang} />
                    <h3>{t.sources}</h3>
                    <ul>{a.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.label}</a></li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <PartnerAds brands={ads} lang={lang} />
        </div>
      </div>
    </div>
  );
}
