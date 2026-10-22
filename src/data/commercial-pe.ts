import type { BrandMarket } from "@/lib/types";
import type { Brand } from "@/lib/promotions";

/**
 * Peru: MINCETUR registry "Titulares de autorización de explotación", filtered to authorisation type
 * "APUESTAS DEPORTIVAS" with status VIGENTE (5 further holders were "SUSPENSION TEMPORAL" and are
 * excluded). Fetched 2026-10-21 from the registry's web service behind
 * apuestasdeportivas.mincetur.gob.pe. Brand names are derived from the operator's registered
 * domain unless the brand is widely known; the legal entity is the registry's company name.
 */
const MINCETUR_REGISTER = "https://apuestasdeportivas.mincetur.gob.pe/Titulares_autorizacion.html";
const MINCETUR_CHECKED = new Date("2026-10-21T00:00:00Z");

/** Domains that also hold an active MINCETUR "JUEGOS" (casino) authorisation. */
const CASINO_DOMAINS = new Set<string>([
  "1xbet.pe",
  "9r.com",
  "apuestatotal.com",
  "apuesto.com",
  "bet365.pe",
  "bet4.pe",
  "betano.pe",
  "betara.com",
  "betcris.pe",
  "betgol.pe",
  "betmaster.pe",
  "betsafe.pe",
  "betsson.pe",
  "betwarrior.pe",
  "betzar.com",
  "bonanzabet.pe",
  "caliente.pe",
  "casinoatlanticcity.com",
  "coolbet.pe",
  "doradobet.com",
  "fixplay.pe",
  "ganaexpress.bet",
  "inkabet.pe",
  "jokerbet.pe",
  "juegaenlinea.pe",
  "lafija.com",
  "masterbets365.com",
  "megapuesta.pe",
  "meridianbet.pe",
  "micasino.com",
  "montanabetapuestas.com",
  "olimpo.bet",
  "palmsbet.pe",
  "playuzu.pe",
  "retabet.pe",
  "rushbet.pe",
  "somoscasino.com",
  "stake.pe",
  "teapuesto.pe",
  "tinbet.pe",
  "tiorico.bet",
]);

const ROWS: readonly (readonly [id: string, name: string, entity: string, domain: string, ref: string])[] = [
  ["ganaexpress", "Ganaexpress", "COMPAÑIA PERUANA DE ENTRETENIMIENTO EN LINEA S.A.C.", "ganaexpress.bet", "Registro 21002582010000 · RD 2991 - 2024"],
  ["pentagol", "Pentagol", "COMPAÑIA T&C S.R.L.", "pentagol.pe", "Registro 21002580010000 · RD 2847 - 2024"],
  ["casino-atlantic-city", "Casino Atlantic City", "CORPORACION TURISTICA CURACAO B.V.", "casinoatlanticcity.com", "Registro 21002577010000 · RD 2846 - 2024"],
  ["caliente", "Caliente", "DEPORTES DIGITALES CALI S.A.C.", "caliente.pe", "Registro 21002589010000 · RD 3332 - 2024"],
  ["apuesta-total", "Apuesta Total", "FREE GAMES S.A.C.", "apuestatotal.com", "Registro 21002576010000 · RD 2656 - 2024"],
  ["fixplay", "Fixplay", "GADOLINIO SOCIEDAD ANONIMA CERRADA", "fixplay.pe", "Registro 21002571010000 · RD 2376 - 2024"],
  ["megapuesta", "Megapuesta", "GOLDEN COAST SOCIEDAD ANONIMA CERRADA", "megapuesta.pe", "Registro 21002609010000 · RD 4060 - 2024"],
  ["bet365", "bet365", "Hillside (Gibraltar Sports) LP", "bet365.pe", "Registro 21002578010000 · RD 2790 - 2024"],
  ["bet4", "Bet4", "HTECH PERU SOCIEDAD ANONIMA CERRADA-HTECH PERU S.A.C.", "bet4.pe", "Registro 21002597010000 · RD 3574 - 2024"],
  ["juegaenlinea", "Juegaenlinea", "INGUS BRIDGE PERU S.A.C.", "juegaenlinea.pe", "Registro 21002579010000 · RD 2794 - 2024"],
  ["doradobet", "Doradobet", "INTERPLAY WORD SAC", "doradobet.com", "Registro 21002564010000 · RD 1715 - 2024"],
  ["bonanzabet", "Bonanzabet", "INVERSIONES DE LA RIVERA S.A.C.", "bonanzabet.pe", "Registro 21002596010000 · RD 3565 - 2024"],
  ["tiorico", "Tiorico", "INVERSIONES ZANDOR SOCIEDAD ANONIMA CERRADA", "tiorico.bet", "Registro 21002615010000 · RD 4628 - 2024"],
  ["betara", "Betara", "INVESTMENT GESTION PERU S.A.C.", "betara.com", "Registro 21002563010000 · RD 1560 - 2024"],
  ["coolbet", "Coolbet", "JUEGOS A DISTANCIA SOCIEDAD ANONIMA CERRADA", "coolbet.pe", "Registro 21002581010000 · RD 2968 - 2024"],
  ["betano", "Betano", "KAIZEN GAMING PERU S.A.C.", "betano.pe", "Registro 21002562010000 · RD 1541 - 2024"],
  ["tinbet", "Tinbet", "KING TECH CORPORATION SOCIEDAD ANONIMA CERRADA", "tinbet.pe", "Registro 21002617010000 · RD 4643 - 2024"],
  ["olimpo", "Olimpo", "LA TINKA S.A.", "olimpo.bet", "Registro 21002567020000 · RD 000882 - 2026"],
  ["teapuesto", "Teapuesto", "LA TINKA S.A.", "teapuesto.pe", "Registro 21002567010000 · RD 2095 - 2024"],
  ["livesport", "Livesport", "LIVESPORT SAC", "livesport.pe", "Registro 21002583010000 · RD 3024 - 2024"],
  ["inkabet", "Inkabet", "LUCKY TORITO S.A.C.", "inkabet.pe", "Registro 21002603010000 · RD 3859 - 2024"],
  ["micasino", "Micasino", "MCSN GROUP PERU S.A.C.", "micasino.com", "Registro 21002607010000 · RD 3906 - 2024"],
  ["meridianbet", "Meridianbet", "MERIDIAN GAMING PERU S.A.C.", "meridianbet.pe", "Registro 21002588010000 · RD 3321 - 2024"],
  ["bet12", "Bet12", "MSA INVERSIONES S.A.C.", "bet12.pe", "Registro 21002659010000 · RD 5125 - 2026"],
  ["bestamerica", "Bestamerica", "MULTISERVIS MCC S.A.C", "bestamerica.pe", "Registro 21002634010000 · RD 2496 - 2025"],
  ["pe", "Pe", "PERUMATIC ENTERTAINMENT S.A.C.", "pe.aciertala.com", "Registro 21002619010000 · RD 4702 - 2024"],
  ["masterbets365", "Masterbets365", "PERUVIAN SOFTWARE SOLUTIONS SOCIEDAD ANONIMA CERRADA", "masterbets365.com", "Registro 21002569010000 · RD 2098 - 2024"],
  ["retabet", "Retabet", "RETABET PERU SOCIEDAD ANONIMA CERRADA - RETABET S.A.C.", "retabet.pe", "Registro 21002565010000 · RD 1767 - 2024"],
  ["rushbet", "Rushbet", "RUSH STREET INTERACTIVE PERU S.R.L.", "rushbet.pe", "Registro 21002601010000 · RD 3837 - 2024"],
  ["somoscasino", "Somoscasino", "SC ENTERTAINMENT S.A.C.", "somoscasino.com", "Registro 21002587010000 · RD 3275 - 2024"],
  ["betsafe", "Betsafe", "SFTG Limited", "betsafe.pe", "Registro 21002586020000 · RD 3386 - 2024"],
  ["betsson", "Betsson", "SFTG Limited", "betsson.pe", "Registro 21002586010000 · RD 3220 - 2024"],
  ["betmaster", "Betmaster", "SOLUTIONS COMPANY B & M PERU SOCIEDAD ANONIMA CERRADA", "betmaster.pe", "Registro 21002658010000 · RD 4654 - 2026"],
  ["9r", "9r", "SOLUTIONS COMPANY VICORPCAV S.A.C.", "9r.com", "Registro 21002590010000 · RD 3390 - 2024"],
  ["betwarrior", "BetWarrior", "SOUTHERN CROSS PERU S.A.C.", "betwarrior.pe", "Registro 21002570010000 · RD 2137 - 2024"],
  ["stake", "Stake", "STAKE PERÚ S.A.C.", "stake.pe", "Registro 21002621010000 · RD 4748 - 2024"],
  ["1xbet", "1xBet", "TERMINUS PLATFORM PERU SOCIEDAD ANONIMA CERRADA", "1xbet.pe", "Registro 21002610010000 · RD 4249 - 2024"],
  ["palmsbet", "Palmsbet", "TIB CONSULT SOCIEDAD ANONIMA CERRADA", "palmsbet.pe", "Registro 21002574010000 · RD 2638 - 2024"],
  ["betgol", "Betgol", "TINCO PERU SAC", "betgol.pe", "Registro 21002605010000 · RD 3911 - 2024"],
  ["montanabetapuestas", "Montanabetapuestas", "TOTORA SHIPPING S.A.C.", "montanabetapuestas.com", "Registro 21002614010000 · RD 4591 - 2024"],
  ["betcris", "Betcris", "TV GLOBAL ENTERPRISE LTD S.A.C.", "betcris.pe", "Registro 21002602010000 · RD 3839 - 2024"],
  ["lafija", "Lafija", "VIRTUAL PADLOCK SAC", "lafija.com", "Registro 21002592010000 · RD 3467 - 2024"],
  ["jokerbet", "Jokerbet", "WIN SISTEM PERU SOCIEDAD ANONIMA CERRADA - WIN SISTEM PERU S.A.C.", "jokerbet.pe", "Registro 21002568010000 · RD 2411 - 2024"],
  ["apuesto", "Apuesto", "51 GAMING S.A.C.", "apuesto.com", "Registro 21002616010000 · RD 4636 - 2024"],
];

export const brandsPe: readonly Brand[] = ROWS.map(([id, name]) => ({ id, name, slug: id }));

export const brandMarketsPe: readonly BrandMarket[] = ROWS.map(([id, , entity, domain, ref]) => ({
  brandId: id,
  countryCode: "PE",
  verification: "verified",
  evidenceUrl: MINCETUR_REGISTER,
  verifiedAt: MINCETUR_CHECKED,
  operatorEntity: entity,
  officialDomain: domain,
  licenceRef: ref,
  products: CASINO_DOMAINS.has(domain) ? ["sports", "casino"] : ["sports"],
}));
