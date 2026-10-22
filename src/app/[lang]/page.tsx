import type { Metadata } from "next";
import { MarketHome } from "@/components/MarketHome";
import { getDict } from "@/i18n/dict";
import { pageAlternates } from "@/i18n/config";
import { pageLang } from "@/lib/page-lang";
import { getMarketBySlug } from "@/lib/markets";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = await pageLang(params);
  const t = getDict(lang).countriesPage;
  const name = getMarketBySlug("es")?.name[lang] ?? "";
  return { title: t.homeMetaTitle(name), description: t.homeMetaDescription(name), alternates: pageAlternates(lang, "home") };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = await pageLang(params);
  const spain = getMarketBySlug("es");
  return spain ? <MarketHome market={spain} lang={lang} /> : null;
}
