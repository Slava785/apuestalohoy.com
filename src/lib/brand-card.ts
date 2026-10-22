import { MARKET_INFO } from "@/data/market-info";
import { REGULATORS } from "@/data/regulators";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";
import { getMarketBySlug } from "@/lib/markets";
import type { MarketBrand } from "@/lib/market-brands";

/** Props-only shape so cards render identically on the server and inside client filters. */
export type BrandCardData = {
  readonly slug: string;
  readonly name: string;
  readonly countryCode: string;
  readonly countryName: string;
  readonly flag: string;
  readonly descriptor: string;
  readonly legend: string | null;
  readonly products: readonly ("sports" | "casino")[];
  readonly domain: string;
  readonly entity: string;
  readonly licence: string;
};

export function countryName(code: string, lang: Lang): string {
  const m = getMarketBySlug(code.toLowerCase());
  return m ? m.name[lang] : code;
}

export function toCardData(b: MarketBrand, lang: Lang): BrandCardData {
  const reg = REGULATORS[b.countryCode];
  const country = countryName(b.countryCode, lang);
  return {
    slug: b.slug,
    name: b.name,
    countryCode: b.countryCode,
    countryName: country,
    flag: MARKET_INFO[b.countryCode]?.flag ?? "",
    descriptor: getDict(lang).common.licensedBy(reg?.name[lang] ?? "the regulator", country),
    legend: reg?.legend ?? null,
    products: b.products,
    domain: b.domain,
    entity: b.entity,
    licence: b.licence,
  };
}
