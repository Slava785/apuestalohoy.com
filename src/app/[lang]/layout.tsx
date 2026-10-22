import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import { FeaturedRail } from "@/components/FeaturedRail";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SponsorBar } from "@/components/SponsorBar";
import type { RailData } from "@/components/market-context";
import { getDict } from "@/i18n/dict";
import { LANGS } from "@/i18n/config";
import { pageLang } from "@/lib/page-lang";
import { getActiveMarketCodes, getMarketBrands } from "@/lib/market-brands";
import { listMarkets } from "@/lib/markets";
import "../globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const serif = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apuestalohoy.com";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await pageLang(params);
  const d = getDict(lang);
  return {
    metadataBase: new URL(SITE),
    title: { default: `${d.siteTitle} | ApuestaLoHoy`, template: "%s | ApuestaLoHoy" },
    description: d.siteDescription,
    openGraph: {
      type: "website",
      siteName: "ApuestaLoHoy",
      locale: lang === "es" ? "es_ES" : "en_GB",
      images: [{ url: "/logo.png", width: 2079, height: 756, alt: "ApuestaLoHoy.com" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

const ORG_JSON_LD = { "@context": "https://schema.org", "@type": "Organization", name: "ApuestaLoHoy", url: SITE, logo: `${SITE}/logo.png` };

async function loadRail(): Promise<RailData> {
  // Every market gets a key; markets without verified operators map to [] so no brand is shown on their pages.
  const active = new Set(await getActiveMarketCodes());
  const entries = await Promise.all(
    listMarkets().map(async (m) => [
      m.slug,
      active.has(m.code) ? (await getMarketBrands(m.code)).slice(0, 9).map((b) => ({ name: b.name, slug: b.slug })) : [],
    ] as const),
  );
  return Object.fromEntries(entries);
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await pageLang(params);
  const rail = await loadRail();
  return (
    <html lang={getDict(lang).htmlLang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#content">{getDict(lang).skip}</a>
        <SponsorBar data={rail} lang={lang} />
        <SiteHeader lang={lang} />
        <FeaturedRail data={rail} lang={lang} />
        <main id="content">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
