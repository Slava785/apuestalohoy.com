import type { Metadata } from "next";
import { OfferCard } from "@/components/BrandCards";
import { Crumbs } from "@/components/Crumbs";
import { SectionHead } from "@/components/SectionHead";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { getAllBrands } from "@/lib/market-brands";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/bonuses">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).bonusesPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "bonuses") };
}

export default async function BonusesPage({ params }: PageProps<"/[lang]/bonuses">) {
  const lang = await pageLang(params);
  const t = getDict(lang).bonusesPage;
  const brands = (await getAllBrands()).map((b) => toCardData(b, lang)).slice(0, 12);
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <div className="notice" style={{ marginBlock: "1.5rem", maxWidth: "46rem" }}>{t.notice}</div>
        <SectionHead kicker={t.kicker} title={t.featured} />
        <div className="picks">{brands.map((b) => <OfferCard key={b.slug} b={b} lang={lang} />)}</div>
      </div>
    </div>
  );
}
