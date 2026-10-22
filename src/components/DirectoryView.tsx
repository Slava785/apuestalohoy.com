import { BrandListFilter } from "@/components/BrandListFilter";
import { MARKET_INFO } from "@/data/market-info";
import type { Lang } from "@/i18n/config";
import { countryName, toCardData } from "@/lib/brand-card";
import { getAllBrands } from "@/lib/market-brands";

/** Directory of every market with verified operators. */
export async function DirectoryView({ lang, onlyCasino = false, variant = "rows" }: { lang: Lang; onlyCasino?: boolean; variant?: "rows" | "grid" }) {
  const rows = (await getAllBrands()).map((b) => toCardData(b, lang));
  const scoped = onlyCasino ? rows.filter((r) => r.products.includes("casino")) : rows;
  const codes = [...new Set(scoped.map((r) => r.countryCode))];
  const countries = codes.map((c) => ({ code: c, name: countryName(c, lang), flag: MARKET_INFO[c]?.flag ?? "" }));
  return <BrandListFilter lang={lang} rows={rows} countries={countries} onlyCasino={onlyCasino} variant={variant} />;
}
