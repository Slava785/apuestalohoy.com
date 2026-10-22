import type { MetadataRoute } from "next";
import { LANGS, localHref, ROUTES, type RouteKey } from "@/i18n/config";
import { getActiveMarketCodes, getMarketBrands } from "@/lib/market-brands";
import { listMarkets } from "@/lib/markets";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apuestalohoy.com";

type Entry = { key: RouteKey; child?: string };

/** Only markets with real, approved content are listed; each URL carries its language alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const active = await getActiveMarketCodes();
  const activeSet = new Set(active);
  const pageKeys = (Object.keys(ROUTES) as RouteKey[]).filter((k) => k !== "bookmakers" && k !== "countries");
  const entries: Entry[] = [
    ...pageKeys.map((key) => ({ key })),
    { key: "countries" as const },
    ...listMarkets().filter((m) => activeSet.has(m.code) && m.slug !== "es").map((m) => ({ key: "countries" as const, child: m.slug })),
    ...(await Promise.all(active.map((c) => getMarketBrands(c)))).flat().map((b) => ({ key: "bookmakers" as const, child: b.slug })),
  ];
  return entries.flatMap((e) =>
    LANGS.map((lang) => ({
      url: `${BASE}${localHref(lang, e.key, e.child)}`,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `${BASE}${localHref(l, e.key, e.child)}`])) },
    })),
  );
}
