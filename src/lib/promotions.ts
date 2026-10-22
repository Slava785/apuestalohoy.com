import { canShowAffiliateLink, canShowEditorialListing } from "@/lib/eligibility";
import type { AffiliateLink, BrandMarket, Market } from "@/lib/types";

export type Brand = { readonly id: string; readonly name: string; readonly slug: string };

export type Offer = {
  readonly brandId: string;
  readonly countryCode: string;
  readonly headline: string;
  readonly termsUrl: string | null;
  readonly expiresAt: Date | null;
};

export type CommercialData = {
  readonly brands: readonly Brand[];
  readonly brandMarkets: readonly BrandMarket[];
  readonly links: readonly AffiliateLink[];
  readonly offers: readonly Offer[];
};

export type Promotable = {
  readonly brand: Brand;
  readonly linkId: string;
  readonly offer: Offer | null;
};

/**
 * Everything that may be shown for a market. Brands failing the gate are
 * dropped; an offer failing its own terms/expiry check is hidden while the
 * brand listing stays.
 */
export function listPromotable(data: CommercialData, market: Market, now: Date): readonly Promotable[] {
  return data.brands.flatMap((brand) => {
    const brandMarket =
      data.brandMarkets.find((bm) => bm.brandId === brand.id && bm.countryCode === market.code) ?? null;
    const link = data.links.find((l) => l.brandId === brand.id && l.countryCode === market.code) ?? null;
    if (!canShowAffiliateLink({ now, market, brandMarket, link }).allowed || !link) return [];

    const offer = data.offers.find((o) => o.brandId === brand.id && o.countryCode === market.code) ?? null;
    const offerOk = offer && canShowAffiliateLink({ now, market, brandMarket, link, promotion: offer }).allowed;
    return [{ brand, linkId: link.id, offer: offerOk ? offer : null }];
  });
}

export type EditorialEntry = { readonly brand: Brand; readonly record: BrandMarket };

/** Informational directory entries: verified register records, no affiliate link required. */
export function listEditorial(data: CommercialData, market: Market, now: Date): readonly EditorialEntry[] {
  return data.brands.flatMap((brand) => {
    const record = data.brandMarkets.find((bm) => bm.brandId === brand.id && bm.countryCode === market.code);
    return record && canShowEditorialListing(market, record, now).allowed ? [{ brand, record }] : [];
  });
}
