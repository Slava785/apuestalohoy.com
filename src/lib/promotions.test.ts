import { describe, expect, test } from "vitest";
import { listPromotable, type CommercialData } from "@/lib/promotions";
import type { Market } from "@/lib/types";

const NOW = new Date("2026-10-21T12:00:00Z");
const market = (status: Market["status"]): Market => ({
  code: "XX", slug: "xx", name: { en: "Testland", es: "Testland" }, locale: "es-XX", currency: "XXX", status, priority: "unassessed",
});

const data: CommercialData = {
  brands: [
    { id: "a", name: "Alfa", slug: "alfa" },
    { id: "b", name: "Beta", slug: "beta" },
  ],
  brandMarkets: [
    { brandId: "a", countryCode: "XX", verification: "verified", evidenceUrl: "https://r.example/a", verifiedAt: new Date("2026-10-01T00:00:00Z") },
    { brandId: "b", countryCode: "XX", verification: "pending", evidenceUrl: null, verifiedAt: null },
  ],
  links: [
    { id: "la", brandId: "a", countryCode: "XX", destination: "https://t.example/a", approval: "approved", allowedHosts: ["t.example"] },
    { id: "lb", brandId: "b", countryCode: "XX", destination: "https://t.example/b", approval: "approved", allowedHosts: ["t.example"] },
  ],
  offers: [
    { brandId: "a", countryCode: "XX", headline: "Oferta A", termsUrl: "https://t.example/terms", expiresAt: new Date("2026-12-01T00:00:00Z") },
    { brandId: "b", countryCode: "XX", headline: "Oferta B", termsUrl: "https://t.example/terms", expiresAt: new Date("2026-12-01T00:00:00Z") },
  ],
};

describe("listPromotable", () => {
  test("returns only brands that pass the gate, with their click-out id", () => {
    const r = listPromotable(data, market("APPROVED_FOR_AFFILIATE_PROMOTION"), NOW);
    expect(r.map((x) => x.brand.name)).toEqual(["Alfa"]);
    expect(r[0].linkId).toBe("la");
    expect(r[0].offer?.headline).toBe("Oferta A");
  });

  test("returns nothing when the country is not approved", () => {
    expect(listPromotable(data, market("LEGAL_REVIEW_REQUIRED"), NOW)).toEqual([]);
  });

  test("keeps the brand but hides an offer that has expired", () => {
    const expired = { ...data, offers: [{ ...data.offers[0], expiresAt: new Date("2026-10-01T00:00:00Z") }] };
    const r = listPromotable(expired, market("APPROVED_FOR_AFFILIATE_PROMOTION"), NOW);
    expect(r).toHaveLength(1);
    expect(r[0].offer).toBeNull();
  });
});

import { listEditorial } from "@/lib/promotions";

describe("listEditorial", () => {
  test("lists verified brands once the market is approved for editorial content", () => {
    const r = listEditorial(data, market("APPROVED_FOR_EDITORIAL_CONTENT"), NOW);
    expect(r.map((x) => x.brand.name)).toEqual(["Alfa"]);
  });

  test("lists nothing while the market is still being researched or reviewed", () => {
    expect(listEditorial(data, market("RESEARCH_PENDING"), NOW)).toEqual([]);
    expect(listEditorial(data, market("LEGAL_REVIEW_REQUIRED"), NOW)).toEqual([]);
  });

  test("drops stale or evidence-less verifications", () => {
    const stale = { ...data, brandMarkets: [{ ...data.brandMarkets[0], verifiedAt: new Date("2026-01-01T00:00:00Z") }] };
    expect(listEditorial(stale, market("APPROVED_FOR_EDITORIAL_CONTENT"), NOW)).toEqual([]);
  });

  test("never needs an affiliate link", () => {
    const noLinks = { ...data, links: [] };
    expect(listEditorial(noLinks, market("APPROVED_FOR_EDITORIAL_CONTENT"), NOW)).toHaveLength(1);
  });
});
