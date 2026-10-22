import type { Market } from "@/lib/types";

/**
 * Launch registry. Every market starts at RESEARCH_PENDING: a status is only
 * raised by a legal reviewer once evidence is attached (docs/03). Currency and
 * locale are formatting facts, not legal claims.
 */
// Statuses reflect docs/06-country-register.md (research of 2026-10-21); raise one only with legal sign-off.
const pending = (code: string, name: Market["name"], locale: string, currency: string): Market => ({
  code,
  slug: code.toLowerCase(),
  name,
  locale,
  currency,
  status: "RESEARCH_PENDING",
  priority: "unassessed",
});

export const MARKETS: readonly Market[] = [
  { ...pending("ES", { en: "Spain", es: "España" }, "es-ES", "EUR"), status: "APPROVED_FOR_AFFILIATE_PROMOTION", priority: "launch-candidate" },
  { ...pending("MX", { en: "Mexico", es: "México" }, "es-MX", "MXN"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("CO", { en: "Colombia", es: "Colombia" }, "es-CO", "COP"), status: "APPROVED_FOR_AFFILIATE_PROMOTION", priority: "launch-candidate" },
  { ...pending("AR", { en: "Argentina", es: "Argentina" }, "es-AR", "ARS"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("PE", { en: "Peru", es: "Perú" }, "es-PE", "PEN"), status: "APPROVED_FOR_AFFILIATE_PROMOTION", priority: "launch-candidate" },
  { ...pending("CL", { en: "Chile", es: "Chile" }, "es-CL", "CLP"), status: "RESTRICTED" },
  { ...pending("EC", { en: "Ecuador", es: "Ecuador" }, "es-EC", "USD"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("UY", { en: "Uruguay", es: "Uruguay" }, "es-419", "UYU"), status: "RESTRICTED" },
  { ...pending("PY", { en: "Paraguay", es: "Paraguay" }, "es-419", "PYG"), status: "RESTRICTED" },
  { ...pending("BO", { en: "Bolivia", es: "Bolivia" }, "es-419", "BOB"), status: "RESTRICTED" },
  { ...pending("VE", { en: "Venezuela", es: "Venezuela" }, "es-419", "VES"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("CR", { en: "Costa Rica", es: "Costa Rica" }, "es-419", "CRC"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("PA", { en: "Panama", es: "Panamá" }, "es-419", "USD"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("GT", { en: "Guatemala", es: "Guatemala" }, "es-419", "GTQ"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("SV", { en: "El Salvador", es: "El Salvador" }, "es-419", "USD"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("HN", { en: "Honduras", es: "Honduras" }, "es-419", "HNL"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("NI", { en: "Nicaragua", es: "Nicaragua" }, "es-419", "NIO"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("DO", { en: "Dominican Republic", es: "República Dominicana" }, "es-419", "DOP"), status: "LEGAL_REVIEW_REQUIRED" },
  pending("CU", { en: "Cuba", es: "Cuba" }, "es-419", "CUP"),
  { ...pending("PR", { en: "Puerto Rico", es: "Puerto Rico" }, "es-419", "USD"), status: "LEGAL_REVIEW_REQUIRED" },
  { ...pending("GQ", { en: "Equatorial Guinea", es: "Guinea Ecuatorial" }, "es-419", "XAF"), status: "LEGAL_REVIEW_REQUIRED" },
];
