import type { Metadata } from "next";
import { Crumbs } from "@/components/Crumbs";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { pageLang } from "@/lib/page-lang";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).privacyPage;
  return { title: t.metaTitle, description: t.metaDescription, alternates: pageAlternates(lang, "privacy") };
}

export default async function Page({ params }: PageProps<"/[lang]/privacy">) {
  const lang = await pageLang(params);
  const t = getDict(lang).privacyPage;
  return (
    <div className="section" style={{ paddingTop: 0 }}>
      <div className="wrap prose">
        <Crumbs lang={lang} trail={[{ label: t.title }]} />
        <h1 className="page-title">{t.title}</h1>
        {t.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((x) => <p key={x}>{x}</p>)}
          </section>
        ))}
        <p className="muted">{t.updated}</p>
      </div>
    </div>
  );
}
