import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketHome, ResearchState } from "@/components/MarketHome";
import { MARKET_SOURCES } from "@/data/market-sources";
import { getDict } from "@/i18n/dict";
import { LANGS, pageAlternates } from "@/i18n/config";
import { getMarketBrands } from "@/lib/market-brands";
import { getMarketBySlug, listMarkets } from "@/lib/markets";
import { pageLang } from "@/lib/page-lang";

export function generateStaticParams() {
  return LANGS.flatMap((lang) => listMarkets().filter((m) => m.slug !== "es").map((m) => ({ lang, cc: m.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/countries/[cc]">): Promise<Metadata> {
  const { cc } = await params;
  const lang = await pageLang(params);
  const market = getMarketBySlug(cc);
  if (!market) return {};
  const t = getDict(lang).countriesPage;
  const has = (await getMarketBrands(market.code)).length > 0;
  const name = market.name[lang];
  return {
    title: has ? t.homeMetaTitle(name) : t.metaTitle2(name),
    description: has ? t.homeMetaDescription(name) : t.metaDescription2(name),
    alternates: pageAlternates(lang, "countries", market.slug),
    robots: has ? undefined : { index: false, follow: true },
  };
}

export default async function CountryPage({ params }: PageProps<"/[lang]/countries/[cc]">) {
  const { cc } = await params;
  const lang = await pageLang(params);
  const market = getMarketBySlug(cc);
  if (!market || market.slug === "es") notFound();
  const has = (await getMarketBrands(market.code)).length > 0;
  return (
    <div lang={market.locale === "es-419" ? undefined : lang === "es" ? market.locale : undefined}>
      {has ? <MarketHome market={market} lang={lang} /> : <ResearchState market={market} lang={lang} sources={MARKET_SOURCES[market.code] ?? []} />}
    </div>
  );
}
