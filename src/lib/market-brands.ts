import { cacheLife } from "next/cache";
import { commercialData } from "@/data/commercial";
import { MARKET_INFO } from "@/data/market-info";
import { listMarkets, getMarketBySlug } from "@/lib/markets";
import { canShowListedBrand } from "@/lib/eligibility";
import { listPromotable } from "@/lib/promotions";

/** Plain, serialisable view of one brand in one market. Everything here has passed the Promotion Gate. */
export type MarketBrand = {
  readonly brandId: string;
  readonly name: string;
  /** Review page slug and click-out id, e.g. "bet365-es". */
  readonly slug: string;
  readonly countryCode: string;
  readonly entity: string;
  readonly domain: string;
  readonly licence: string;
  readonly products: readonly ("sports" | "casino")[];
  readonly verifiedAt: string;
  readonly evidenceUrl: string;
};

export const brandSlug = (brandId: string, countryCode: string) => `${brandId}-${countryCode.toLowerCase()}`;

/** Brands cleared for display in a market, owner-curated feature order first, then alphabetical. */
export async function getMarketBrands(countryCode: string): Promise<readonly MarketBrand[]> {
  "use cache";
  cacheLife("hours");

  const market = getMarketBySlug(countryCode.toLowerCase());
  if (!market) return [];
  const featured = MARKET_INFO[market.code]?.featured ?? [];
  const items = listPromotable(commercialData, market, new Date());

  const brands = items.flatMap(({ brand }) => {
    const record = commercialData.brandMarkets.find((bm) => bm.brandId === brand.id && bm.countryCode === market.code);
    if (!record?.verifiedAt || !record.evidenceUrl) return [];
    return [{
      brandId: brand.id,
      name: brand.name,
      slug: brandSlug(brand.id, market.code),
      countryCode: market.code,
      entity: record.operatorEntity ?? "",
      domain: record.officialDomain ?? "",
      licence: record.licenceRef ?? "",
      products: record.products ?? ["sports"],
      verifiedAt: record.verifiedAt.toISOString(),
      evidenceUrl: record.evidenceUrl,
    } satisfies MarketBrand];
  });

  const rank = (id: string) => {
    const i = featured.indexOf(id);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return [...brands].sort((a, b) => rank(a.brandId) - rank(b.brandId) || a.name.localeCompare(b.name, "es"));
}

/** Codes of markets that currently have at least one brand cleared for display. */
export async function getActiveMarketCodes(): Promise<readonly string[]> {
  "use cache";
  cacheLife("hours");
  const withBrands = await Promise.all(
    listMarkets().map(async (m) => ((await getMarketBrands(m.code)).length > 0 ? m.code : null)),
  );
  return withBrands.filter((c): c is string => c !== null);
}

export async function getAllBrands(): Promise<readonly MarketBrand[]> {
  const codes = await getActiveMarketCodes();
  return (await Promise.all(codes.map((c) => getMarketBrands(c)))).flat();
}

export async function getBrandBySlug(slug: string): Promise<MarketBrand | null> {
  const code = slug.split("-").pop()?.toUpperCase() ?? "";
  return (await getMarketBrands(code)).find((b) => b.slug === slug) ?? null;
}

/** A brand listed without regulator evidence. Never carries licence, entity or domain claims. */
export type ListedBrand = {
  readonly brandId: string;
  readonly name: string;
  readonly slug: string;
  readonly countryCode: string;
};

/** Owner-listed, not verified. Empty for restricted or unresearched markets. */
export async function getListedBrands(countryCode: string): Promise<readonly ListedBrand[]> {
  "use cache";
  cacheLife("hours");

  const market = getMarketBySlug(countryCode.toLowerCase());
  if (!market) return [];
  return commercialData.brandMarkets
    .filter((bm) => canShowListedBrand(market, bm).allowed)
    .flatMap((bm) => {
      const brand = commercialData.brands.find((b) => b.id === bm.brandId);
      return brand ? [{ brandId: brand.id, name: brand.name, slug: brandSlug(brand.id, market.code), countryCode: market.code }] : [];
    })
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function getListedBySlug(slug: string): Promise<ListedBrand | null> {
  const code = slug.split("-").pop()?.toUpperCase() ?? "";
  return (await getListedBrands(code)).find((b) => b.slug === slug) ?? null;
}

/** Codes of markets that show listed-only brands. */
export async function getListedMarketCodes(): Promise<readonly string[]> {
  const codes = await Promise.all(listMarkets().map(async (m) => ((await getListedBrands(m.code)).length > 0 ? m.code : null)));
  return codes.filter((c): c is string => c !== null);
}
