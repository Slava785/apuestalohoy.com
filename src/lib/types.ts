export const COUNTRY_STATUSES = [
  "RESEARCH_PENDING",
  "RESEARCH_COMPLETE",
  "LEGAL_REVIEW_REQUIRED",
  "APPROVED_FOR_EDITORIAL_CONTENT",
  "APPROVED_FOR_AFFILIATE_PROMOTION",
  "RESTRICTED",
  "DO_NOT_PROMOTE",
] as const;
export type CountryStatus = (typeof COUNTRY_STATUSES)[number];

export type Market = {
  readonly code: string; // ISO 3166-1 alpha-2, upper case
  readonly slug: string; // URL segment, lower case
  readonly name: Readonly<Record<"en" | "es", string>>;
  readonly locale: string; // BCP 47, e.g. es-MX
  readonly currency: string; // ISO 4217
  readonly status: CountryStatus;
  readonly priority: "launch-candidate" | "later" | "unassessed";
};

/** "listed": owner-listed brand with no regulator evidence; shown only with a "not verified" label. */
export type VerificationStatus = "pending" | "listed" | "verified" | "rejected";
export type ApprovalStatus = "draft" | "approved" | "revoked";

export type BrandMarket = {
  readonly brandId: string;
  readonly countryCode: string;
  readonly verification: VerificationStatus;
  readonly evidenceUrl: string | null;
  readonly verifiedAt: Date | null;
  /** Register data, shown in the informational directory. */
  readonly operatorEntity?: string;
  readonly officialDomain?: string;
  readonly licenceRef?: string;
  /** Products the operator is registered for in this market. */
  readonly products?: readonly ("sports" | "casino")[];
};

export type AffiliateLink = {
  readonly id: string;
  readonly brandId: string;
  readonly countryCode: string;
  readonly destination: string;
  readonly approval: ApprovalStatus;
  /** Hostnames the affiliate programme allows as destinations. */
  readonly allowedHosts: readonly string[];
};

export type Promotion = {
  readonly termsUrl: string | null;
  readonly expiresAt: Date | null;
};

export type Campaign = {
  readonly id: string;
  readonly approval: ApprovalStatus;
  readonly startsAt: Date;
  readonly endsAt: Date;
  readonly countryCodes: readonly string[];
  readonly brandId: string;
};

export type Denial = { readonly allowed: false; readonly reason: string };
export type Allowed = { readonly allowed: true };
export type GateResult = Allowed | Denial;
