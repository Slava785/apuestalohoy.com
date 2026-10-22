import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { DirectoryView } from "@/components/DirectoryView";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/sports-betting">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).directory;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "sportsBetting") };
}

export default async function Page({ params }: PageProps<"/[lang]/sports-betting">) {
  const lang = await pageLang(params);
  const t = getDict(lang).directory;
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <DirectoryView lang={lang} />
      </div>
    </div>
  );
}
