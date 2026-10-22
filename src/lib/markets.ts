import { MARKETS } from "@/data/markets";
import type { Lang } from "@/i18n/config";
import type { Market } from "@/lib/types";

export function listMarkets(): readonly Market[] {
  return MARKETS;
}

export function getMarketBySlug(slug: string): Market | null {
  return MARKETS.find((m) => m.slug === slug) ?? null;
}

export function formatMoney(market: Market, amount: number, lang: Lang): string {
  return new Intl.NumberFormat(market.locale === "es-419" ? (lang === "es" ? "es" : "en-GB") : market.locale, {
    style: "currency",
    currency: market.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
