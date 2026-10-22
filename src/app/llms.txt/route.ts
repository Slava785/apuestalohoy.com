import { ARTICLES } from "@/content/news";
import { GUIDES } from "@/content/guides";
import { localHref } from "@/i18n/config";
import { getActiveMarketCodes, getMarketBrands } from "@/lib/market-brands";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apuestalohoy.com";

/** Plain-text summary for AI search engines: what the site is, where facts come from, and the key pages. */
export async function GET() {
  const codes = await getActiveMarketCodes();
  const counts = await Promise.all(codes.map(async (c) => `${c}: ${(await getMarketBrands(c)).length}`));
  const lines = [
    "# ApuestaLoHoy",
    "",
    "> Betting guides for Spanish speakers. We only list bookmakers that appear on a country's official licence register, and every page says what we have and haven't checked.",
    "",
    "## Facts",
    `- Languages: English (UK) at ${SITE}/en and Spanish at ${SITE}/es.`,
    `- Markets with listings (bookmakers per country): ${counts.join(", ")}.`,
    "- Sources: DGOJ register (Spain), Coljuegos list (Colombia), MINCETUR register (Peru). Checked 21 October 2026 and rechecked every 90 days.",
    "- We don't publish ratings, bonuses or reviews we haven't confirmed. Pages mark them as not reviewed yet.",
    "- Links to bookmakers are sponsored (rel=sponsored). We may earn a commission. Adults only (18+).",
    "",
    "## Key pages",
    `- [Sports betting directory](${SITE}${localHref("en", "sportsBetting")})`,
    `- [Compare bookmakers](${SITE}${localHref("en", "compare")})`,
    `- [Betting laws by country](${SITE}${localHref("en", "laws")})`,
    `- [News](${SITE}${localHref("en", "news")}): ${ARTICLES.length} sourced stories`,
    `- [Guides](${SITE}${localHref("en", "guides")}): ${GUIDES.map((g) => g.title.en).join("; ")}`,
    `- [Responsible gambling](${SITE}${localHref("en", "responsible")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
