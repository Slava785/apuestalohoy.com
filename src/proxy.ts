import { NextResponse, type NextRequest } from "next/server";
import { getDict } from "@/i18n/dict";
import { commercialData } from "@/data/commercial";
import { isLang, localHref, preferredLang, ROUTES, routeKeyForSlug } from "@/i18n/config";
import { brandSlug } from "@/lib/market-brands";
import { listMarkets } from "@/lib/markets";

const COUNTRY_SLUGS = new Set(listMarkets().map((m) => m.slug));
const BRAND_SLUGS = new Set(commercialData.brandMarkets.map((bm) => brandSlug(bm.brandId, bm.countryCode)));

/** Unknown URLs get a real 404 (not a 200 "not found" page), and each page keeps one canonical URL. */
export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  const notFound = () => {
    const lang = isLang(parts[0] ?? "") ? (parts[0] as "en" | "es") : preferredLang(request.headers.get("accept-language"));
    const t = getDict(lang).notFound;
    const html = `<!doctype html><html lang="${getDict(lang).htmlLang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${t.title} | ApuestaLoHoy</title><style>body{margin:0;font:16px/1.6 system-ui,sans-serif;background:#faf8f2;color:#0b1620;display:grid;min-height:100vh;place-items:center;text-align:center;padding:1rem}h1{font-size:2rem;margin:0 0 .5rem}a{color:#1e6a15;font-weight:700}</style></head><body><main><h1>${t.title}</h1><p>${t.text}</p><p><a href="/${lang}">${t.home}</a></p></main></body></html>`;
    return new NextResponse(html, { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
  };

  if (parts.length === 0) {
    return NextResponse.redirect(new URL(`/${preferredLang(request.headers.get("accept-language"))}`, request.url), 307);
  }
  const [first, slug, child, ...rest] = parts;
  if (first === "go") return NextResponse.next();
  if (!isLang(first)) return notFound();
  if (slug === undefined) return NextResponse.next();

  const key = routeKeyForSlug(slug);
  if (!key || key === "home" || rest.length > 0) return notFound();

  const ok =
    key === "countries" ? child === undefined || COUNTRY_SLUGS.has(child)
    : key === "bookmakers" ? child !== undefined && BRAND_SLUGS.has(child)
    : child === undefined;
  if (!ok) return notFound();

  // English slug under /es (or the reverse) redirects to the language's own slug.
  if (slug !== ROUTES[key][first]) return NextResponse.redirect(new URL(localHref(first, key, child), request.url), 308);
  return NextResponse.next();
}

export const config = {
  // Skip Next internals and any path with a file extension (icon.png, logo.png, sitemap.xml, robots.txt).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
