import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/responsible-gambling">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).rgPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "responsible") };
}

export default async function ResponsiblePage({ params }: PageProps<"/[lang]/responsible-gambling">) {
  const lang = await pageLang(params);
  const t = getDict(lang).rgPage;
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap prose">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <h2>{t.h1}</h2>
        <p>{t.p1}</p>
        <h2>{t.h2}</h2>
        <ul>{t.signs.map((s) => <li key={s}>{s}</li>)}</ul>
        <h2>{t.h3}</h2>
        <ul>{t.tools.map((s) => <li key={s}>{s}</li>)}</ul>
        <h2>{t.h4}</h2>
        <p>{t.help}</p>
        <ul>{t.regulators.map((r) => <li key={r.url}><a href={r.url} rel="noopener noreferrer" target="_blank">{r.label}</a></li>)}</ul>
        <p className="notice">{t.adults}</p>
      </div>
    </div>
  );
}
