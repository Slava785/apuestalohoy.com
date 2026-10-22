import { describe, expect, test } from "vitest";
import { canServeCampaign, canShowAffiliateLink, canShowListedBrand } from "@/lib/eligibility";
import type { AffiliateLink, BrandMarket, Campaign, Market } from "@/lib/types";

const NOW = new Date("2026-10-21T12:00:00Z");

const market = (status: Market["status"]): Market => ({
  code: "XX",
  slug: "xx",
  name: { en: "Testland", es: "Testland" },
  locale: "es-XX",
  currency: "XXX",
  status,
  priority: "unassessed",
});

const brandMarket: BrandMarket = {
  brandId: "b1",
  countryCode: "XX",
  verification: "verified",
  evidenceUrl: "https://regulator.example/register/b1",
  verifiedAt: new Date("2026-09-15T00:00:00Z"),
};

const link: AffiliateLink = {
  id: "l1",
  brandId: "b1",
  countryCode: "XX",
  destination: "https://track.example/c?id=1",
  approval: "approved",
  allowedHosts: ["track.example"],
};

const input = {
  now: NOW,
  market: market("APPROVED_FOR_AFFILIATE_PROMOTION"),
  brandMarket,
  link,
};

describe("canShowAffiliateLink", () => {
  test("allows a fully verified, approved combination", () => {
    expect(canShowAffiliateLink(input)).toEqual({ allowed: true });
  });

  test.each([
    "RESEARCH_PENDING",
    "LEGAL_REVIEW_REQUIRED",
    "APPROVED_FOR_EDITORIAL_CONTENT",
    "RESTRICTED",
    "DO_NOT_PROMOTE",
  ] as const)("denies when country status is %s", (status) => {
    const result = canShowAffiliateLink({ ...input, market: market(status) });
    expect(result.allowed).toBe(false);
  });

  test("denies when brand is not verified for the market", () => {
    const result = canShowAffiliateLink({
      ...input,
      brandMarket: { ...brandMarket, verification: "pending" },
    });
    expect(result.allowed).toBe(false);
  });

  test("denies when verification evidence is missing", () => {
    const result = canShowAffiliateLink({
      ...input,
      brandMarket: { ...brandMarket, evidenceUrl: null },
    });
    expect(result.allowed).toBe(false);
  });

  test("denies when verification is older than 90 days", () => {
    const result = canShowAffiliateLink({
      ...input,
      brandMarket: { ...brandMarket, verifiedAt: new Date("2026-06-01T00:00:00Z") },
    });
    expect(result).toMatchObject({ allowed: false });
  });

  test("denies when brand market belongs to another country", () => {
    const result = canShowAffiliateLink({
      ...input,
      brandMarket: { ...brandMarket, countryCode: "YY" },
    });
    expect(result.allowed).toBe(false);
  });

  test("denies when the affiliate link is not approved", () => {
    const result = canShowAffiliateLink({ ...input, link: { ...link, approval: "draft" } });
    expect(result.allowed).toBe(false);
  });

  test("denies when destination host is not on the programme allow-list", () => {
    const result = canShowAffiliateLink({
      ...input,
      link: { ...link, destination: "https://evil.example/c" },
    });
    expect(result.allowed).toBe(false);
  });

  test("denies non-https destinations", () => {
    const result = canShowAffiliateLink({
      ...input,
      link: { ...link, destination: "http://track.example/c" },
    });
    expect(result.allowed).toBe(false);
  });

  test("denies when there is no brand market or link at all", () => {
    expect(canShowAffiliateLink({ ...input, brandMarket: null }).allowed).toBe(false);
    expect(canShowAffiliateLink({ ...input, link: null }).allowed).toBe(false);
  });

  test("denies expired or term-less promotions when one is supplied", () => {
    const expired = { termsUrl: "https://op.example/t", expiresAt: new Date("2026-10-01T00:00:00Z") };
    const noTerms = { termsUrl: null, expiresAt: new Date("2026-12-01T00:00:00Z") };
    expect(canShowAffiliateLink({ ...input, promotion: expired }).allowed).toBe(false);
    expect(canShowAffiliateLink({ ...input, promotion: noTerms }).allowed).toBe(false);
  });
});

describe("canServeCampaign", () => {
  const campaign: Campaign = {
    id: "c1",
    approval: "approved",
    startsAt: new Date("2026-10-01T00:00:00Z"),
    endsAt: new Date("2026-11-01T00:00:00Z"),
    countryCodes: ["XX"],
    brandId: "b1",
  };

  test("serves an approved, in-window, in-country campaign that passes the link gate", () => {
    expect(canServeCampaign({ ...input, campaign }).allowed).toBe(true);
  });

  test("denies outside the schedule window", () => {
    const late = { ...campaign, endsAt: new Date("2026-10-20T00:00:00Z") };
    expect(canServeCampaign({ ...input, campaign: late }).allowed).toBe(false);
    const early = { ...campaign, startsAt: new Date("2026-10-22T00:00:00Z") };
    expect(canServeCampaign({ ...input, campaign: early }).allowed).toBe(false);
  });

  test("denies unapproved campaigns and wrong countries", () => {
    expect(canServeCampaign({ ...input, campaign: { ...campaign, approval: "draft" } }).allowed).toBe(false);
    expect(canServeCampaign({ ...input, campaign: { ...campaign, countryCodes: ["YY"] } }).allowed).toBe(false);
  });

  test("denies when the underlying link gate fails", () => {
    const result = canServeCampaign({
      ...input,
      market: market("RESTRICTED"),
      campaign,
    });
    expect(result.allowed).toBe(false);
  });
});

describe("canShowListedBrand", () => {
  const listed: BrandMarket = { brandId: "b", countryCode: "ES", verification: "listed", evidenceUrl: null, verifiedAt: null };

  test("allows a listed brand in a legal-review market", () => {
    expect(canShowListedBrand(market("LEGAL_REVIEW_REQUIRED"), listed).allowed).toBe(true);
  });
  test.each(["RESTRICTED", "DO_NOT_PROMOTE", "RESEARCH_PENDING"] as const)("denies a listed brand in a %s market", (status) => {
    expect(canShowListedBrand(market(status), listed).allowed).toBe(false);
  });
  test("denies pending and verified records", () => {
    expect(canShowListedBrand(market("LEGAL_REVIEW_REQUIRED"), { ...listed, verification: "pending" }).allowed).toBe(false);
    expect(canShowListedBrand(market("LEGAL_REVIEW_REQUIRED"), { ...listed, verification: "verified" }).allowed).toBe(false);
  });
  test("denies a record from another country", () => {
    expect(canShowListedBrand(market("LEGAL_REVIEW_REQUIRED"), { ...listed, countryCode: "MX" }).allowed).toBe(false);
  });
});
