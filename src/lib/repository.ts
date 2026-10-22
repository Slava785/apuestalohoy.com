import { commercialData } from "@/data/commercial";
import type { AffiliateLink, BrandMarket } from "@/lib/types";
import type { Brand, CommercialData } from "@/lib/promotions";

export type { Brand };

/** Data-access seam; swapped for Postgres (docs/02) without touching callers. */
export interface CommercialRepository {
  all(): CommercialData;
  listBrandMarkets(countryCode: string): Promise<readonly BrandMarket[]>;
  getBrand(id: string): Promise<Brand | null>;
  getAffiliateLink(id: string): Promise<AffiliateLink | null>;
}

export const staticRepository = (data: CommercialData): CommercialRepository => ({
  all: () => data,
  listBrandMarkets: async (code) => data.brandMarkets.filter((bm) => bm.countryCode === code),
  getBrand: async (id) => data.brands.find((b) => b.id === id) ?? null,
  getAffiliateLink: async (id) => data.links.find((l) => l.id === id) ?? null,
});

export const repository: CommercialRepository = staticRepository(commercialData);
