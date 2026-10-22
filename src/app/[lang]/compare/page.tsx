import type { Metadata } from "next";
import { CompareTable } from "@/components/CompareTable";
import { Crumbs } from "@/components/Crumbs";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { toCardData } from "@/lib/brand-card";
import { getAllBrands } from "@/lib/market-brands";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/compare">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).comparePage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "compare") };
}

export default async function ComparePage({ params }: PageProps<"/[lang]/compare">) {
  const lang = await pageLang(params);
  const t = getDict(lang).comparePage;
  const rows = (await getAllBrands()).map((b) => toCardData(b, lang));
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <CompareTable lang={lang} rows={rows} />
      </div>
    </div>
  );
}
