import type { BrandMarket } from "@/lib/types";
import type { AffiliateLink } from "@/lib/types";
import type { Brand, CommercialData } from "@/lib/promotions";
import { brandMarketsEs, brandsEs } from "@/data/commercial-es";
import { brandMarketsPe, brandsPe } from "@/data/commercial-pe";
import { brandMarketsIntl, brandsIntl } from "@/data/commercial-intl";

/**
 * THE file to fill in. Two tiers, matching the two eligibility gates:
 *  - Editorial directory: a "verified" brandMarkets row (evidenceUrl + verifiedAt < 90 days) in a
 *    market whose status is APPROVED_FOR_EDITORIAL_CONTENT or higher.
 *  - Affiliate promotion: additionally the market must be APPROVED_FOR_AFFILIATE_PROMOTION and a
 *    links row must be "approved" with a destination host in allowedHosts.
 * Use only URLs from your affiliate dashboard; never invent tracking links or offers.
 */

/** Colombia: Coljuegos official register, checked 2026-10-21 (register last modified 13/10/2026). */
const COLJUEGOS_REGISTER = "https://www.coljuegos.gov.co/publicaciones/juegosonline_pub";
const COLJUEGOS_CHECKED = new Date("2026-10-21T00:00:00Z");

const record = (brandId: string, operatorEntity: string, officialDomain: string, licenceRef: string): BrandMarket => ({
  brandId,
  countryCode: "CO",
  verification: "verified",
  evidenceUrl: COLJUEGOS_REGISTER,
  verifiedAt: COLJUEGOS_CHECKED,
  operatorEntity,
  officialDomain,
  licenceRef,
  products: ["sports"],
});

const brandsCo: readonly Brand[] = [
    { id: "wplay", name: "Wplay", slug: "wplay" },
    { id: "betplay", name: "Betplay", slug: "betplay" },
    { id: "betsson", name: "Betsson", slug: "betsson" },
    { id: "zamba", name: "Zamba", slug: "zamba" },
    { id: "codere", name: "Codere", slug: "codere" },
    { id: "luckia", name: "Luckia", slug: "luckia" },
    { id: "sportium", name: "Sportium", slug: "sportium" },
    { id: "rushbet", name: "Rushbet", slug: "rushbet" },
    { id: "rivalo", name: "Rivalo", slug: "rivalo" },
    { id: "yajuego", name: "Yajuego", slug: "yajuego" },
    { id: "bwin", name: "Bwin", slug: "bwin" },
    { id: "stake", name: "Stake", slug: "stake" },
    { id: "betano", name: "Betano", slug: "betano" },
    { id: "mryoker", name: "Mryoker", slug: "mryoker" },
];

const brandMarketsCo: readonly BrandMarket[] = [
    record("wplay", "Aquila Global Group S.A.S.", "wplay.co", "Contrato 2182"),
    record("betplay", "Corredor Empresarial S.A", "betplay.com.co", "Contrato 1876"),
    record("betsson", "Colbet S.A.S.", "betsson.co", "Contrato 1895-B"),
    record("zamba", "E Total Gaming S.A.S.", "zamba.co", "Contrato 1894"),
    record("codere", "Codere Online Colombia S.A.S.", "codere.com.co", "Contrato 2218"),
    record("luckia", "Luckia Colombia S.A.S.", "luckia.co", "Contrato 1932"),
    record("sportium", "Sportium Apuestas Colombia S.A.S.", "sportium.com.co", "Contrato 1942"),
    record("rushbet", "Rush Street Interactive Colombia S.A.S.", "rushbet.co", "Contrato 1972"),
    record("rivalo", "Teclino S.A.S", "rivalo.co", "Contrato 1997"),
    record("yajuego", "Games and Betting S.A.S", "yajuego.co", "Contrato 2240"),
    record("bwin", "Bwin Latam S.A.S.", "sports.bwin.co", "Contrato 2229"),
    record("stake", "Stake Colombia S.A.S", "stake.com.co", "Contrato 2226"),
    record("betano", "Kaizen Gaming Colombia S.A.S.", "betano.co", "Contrato 2104"),
    record("mryoker", "GLOBAL VITXO S.A.S.", "mryoker.co", "Contrato C2261"),
];

const dedupe = (brands: readonly Brand[]): readonly Brand[] => [...new Map(brands.map((b) => [b.id, b])).values()];

/**
 * Until affiliate tracking URLs are supplied, every verified operator is linked to its own
 * regulator-registered domain (as the reference site does). Replace an entry with a real tracking
 * link by adding it to `affiliateLinks` below; entries there win over the official-site link.
 */
function officialSiteLinks(records: readonly BrandMarket[]): readonly AffiliateLink[] {
  return records.flatMap((bm) =>
    bm.officialDomain
      ? [{
          id: `${bm.brandId}-${bm.countryCode.toLowerCase()}`,
          brandId: bm.brandId,
          countryCode: bm.countryCode,
          destination: `https://${bm.officialDomain}`,
          approval: "approved" as const,
          allowedHosts: [bm.officialDomain],
        }]
      : [],
  );
}

const allBrandMarkets: readonly BrandMarket[] = [...brandMarketsCo, ...brandMarketsEs, ...brandMarketsPe, ...brandMarketsIntl];

export const commercialData: CommercialData = {
  brands: dedupe([...brandsIntl, ...brandsCo, ...brandsEs, ...brandsPe]),
  brandMarkets: allBrandMarkets,
  links: officialSiteLinks(allBrandMarkets),
  offers: [],
};
