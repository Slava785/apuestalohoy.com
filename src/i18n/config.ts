export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** Route keys. The app's folders use the English slug; Spanish slugs are rewritten to them (next.config.ts). */
export const ROUTES = {
  home: { en: "", es: "" },
  sportsBetting: { en: "sports-betting", es: "apuestas-deportivas" },
  casinos: { en: "online-casinos", es: "casinos-online" },
  bonuses: { en: "bonuses", es: "bonos" },
  reviews: { en: "reviews", es: "resenas" },
  compare: { en: "compare", es: "comparar" },
  guides: { en: "guides", es: "guias" },
  news: { en: "news", es: "noticias" },
  responsible: { en: "responsible-gambling", es: "juego-responsable" },
  countries: { en: "countries", es: "paises" },
  bookmakers: { en: "bookmakers", es: "casas-de-apuestas" },
  about: { en: "about", es: "sobre-nosotros" },
  laws: { en: "betting-laws", es: "leyes-de-apuestas" },
  privacy: { en: "privacy", es: "privacidad" },
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Public URL for a page in a language, e.g. localHref("es", "news") -> "/es/noticias". */
export function localHref(lang: Lang, key: RouteKey, child?: string): string {
  const slug = ROUTES[key][lang];
  const base = slug ? `/${lang}/${slug}` : `/${lang}`;
  return child ? `${base}/${child}` : base;
}

const keyBySlug = new Map<string, RouteKey>();
for (const [key, slugs] of Object.entries(ROUTES) as [RouteKey, Record<Lang, string>][]) {
  for (const slug of Object.values(slugs)) if (slug) keyBySlug.set(slug, key);
}

export const routeKeyForSlug = (slug: string): RouteKey | undefined => keyBySlug.get(slug);

/** Same page in another language; falls back to that language's home for unknown paths. */
export function switchLangPath(pathname: string, to: Lang): string {
  const [, , slug = "", child] = pathname.split("/");
  if (slug === "") return `/${to}`;
  const key = routeKeyForSlug(slug);
  return key ? localHref(to, key, child) : `/${to}`;
}

/** hreflang alternates for a page. */
export function alternatesFor(key: RouteKey, child?: string) {
  return {
    canonicalFor: (lang: Lang) => localHref(lang, key, child),
    languages: {
      en: localHref("en", key, child),
      es: localHref("es", key, child),
      "x-default": localHref("en", key, child),
    },
  };
}

export const pageAlternates = (lang: Lang, key: RouteKey, child?: string) => {
  const a = alternatesFor(key, child);
  return { canonical: a.canonicalFor(lang), languages: a.languages };
};

/** Detect a preferred language from an Accept-Language header. */
export function preferredLang(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("es") ? "es" : DEFAULT_LANG;
}
