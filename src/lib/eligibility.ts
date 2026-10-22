import { safeDestination } from "@/lib/redirect";
import type {
  AffiliateLink,
  BrandMarket,
  Campaign,
  GateResult,
  Market,
  Promotion,
} from "@/lib/types";

/** Verification evidence older than this is treated as stale and blocks promotion. */
export const MAX_VERIFICATION_AGE_DAYS = 90;
const DAY_MS = 86_400_000;

const EDITORIAL_STATUSES: readonly Market["status"][] = [
  "APPROVED_FOR_EDITORIAL_CONTENT",
  "APPROVED_FOR_AFFILIATE_PROMOTION",
];

const deny = (reason: string): GateResult => ({ allowed: false, reason });

export type LinkGateInput = {
  readonly now: Date;
  readonly market: Market;
  readonly brandMarket: BrandMarket | null;
  readonly link: AffiliateLink | null;
  readonly promotion?: Promotion | null;
};

/**
 * The Promotion Gate. Every commercial surface (card, banner, click-out) must
 * pass this. It fails closed: the absence of any record is a denial.
 */
export function canShowAffiliateLink(input: LinkGateInput): GateResult {
  const { now, market, brandMarket, link, promotion } = input;

  if (market.status !== "APPROVED_FOR_AFFILIATE_PROMOTION") {
    return deny(`country ${market.code} is ${market.status}`);
  }
  if (!brandMarket || brandMarket.countryCode !== market.code) {
    return deny("no brand record for this market");
  }
  if (brandMarket.verification !== "verified") {
    return deny("brand not verified for this market");
  }
  if (!brandMarket.evidenceUrl || !brandMarket.verifiedAt) {
    return deny("brand verification has no evidence");
  }
  const ageDays = (now.getTime() - brandMarket.verifiedAt.getTime()) / DAY_MS;
  if (ageDays > MAX_VERIFICATION_AGE_DAYS) {
    return deny("brand verification is stale");
  }
  if (!link || link.countryCode !== market.code || link.brandId !== brandMarket.brandId) {
    return deny("no affiliate link for this brand and market");
  }
  if (link.approval !== "approved") {
    return deny("affiliate link not approved");
  }
  if (!safeDestination(link.destination, link.allowedHosts)) {
    return deny("affiliate destination not on the programme allow-list");
  }
  if (promotion) {
    if (!promotion.termsUrl) return deny("promotion has no terms URL");
    if (!promotion.expiresAt || promotion.expiresAt.getTime() <= now.getTime()) {
      return deny("promotion expired or has no expiry date");
    }
  }
  return { allowed: true };
}

export type CampaignGateInput = LinkGateInput & { readonly campaign: Campaign };

export function canServeCampaign(input: CampaignGateInput): GateResult {
  const { campaign, now, market } = input;
  if (campaign.approval !== "approved") return deny("campaign not approved");
  if (now < campaign.startsAt || now >= campaign.endsAt) return deny("campaign outside schedule");
  if (!campaign.countryCodes.includes(market.code)) return deny("campaign not targeted at this country");
  return canShowAffiliateLink(input);
}

/** Editorial eligibility: a verified, fresh register record in an editorially approved market. */
export function canShowEditorialListing(market: Market, record: BrandMarket, now: Date): GateResult {
  if (!EDITORIAL_STATUSES.includes(market.status)) return deny(`country ${market.code} is ${market.status}`);
  if (record.countryCode !== market.code || record.verification !== "verified") return deny("record not verified");
  if (!record.evidenceUrl || !record.verifiedAt) return deny("record has no evidence");
  if ((now.getTime() - record.verifiedAt.getTime()) / DAY_MS > MAX_VERIFICATION_AGE_DAYS) return deny("record is stale");
  return { allowed: true };
}

const LISTED_STATUSES: readonly Market["status"][] = [
  "LEGAL_REVIEW_REQUIRED",
  "APPROVED_FOR_EDITORIAL_CONTENT",
  "APPROVED_FOR_AFFILIATE_PROMOTION",
];

/**
 * Listed-only tier: an owner-listed brand with no regulator evidence. It may appear with a visible
 * "not verified" label, but never in markets that are restricted or still unresearched.
 */
export function canShowListedBrand(market: Market, record: BrandMarket): GateResult {
  if (record.countryCode !== market.code || record.verification !== "listed") return deny("record is not a listed brand");
  if (!LISTED_STATUSES.includes(market.status)) return deny(`country ${market.code} is ${market.status}`);
  return { allowed: true };
}
