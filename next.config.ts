import type { NextConfig } from "next";
import { ROUTES } from "./src/i18n/config";

/** Spanish URLs point at the same pages as the English folders. */
function spanishRewrites() {
  const rules = Object.values(ROUTES).flatMap(({ en, es }) => {
    if (!en || String(en) === String(es)) return [];
    return [
      { source: `/es/${es}`, destination: `/es/${en}` },
      { source: `/es/${es}/:child`, destination: `/es/${en}/:child` },
    ];
  });
  return rules;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return spanishRewrites();
  },
  async redirects() {
    // Spain is the home page market, so its country page is the home page.
    return [
      { source: "/:lang(en|es)/countries/es", destination: "/:lang", permanent: true },
      { source: "/:lang(en|es)/paises/es", destination: "/:lang", permanent: true },
    ];
  },
};

export default nextConfig;
