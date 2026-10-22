import type { BrandMarket } from "@/lib/types";
import type { Brand } from "@/lib/promotions";

/**
 * Owner-listed brands for the markets without a verified regulator register (owner-supplied list,
 * 2026-10-22, includes grey-market brands). Records are "listed": shown on the country page with a
 * "not verified" label and never in verified directories, never with a click-out link, and never in
 * RESTRICTED or research-pending markets (canShowListedBrand). Listing is NOT a claim that a brand
 * is licensed or accepts customers there. Add evidenceUrl + verifiedAt and set "verified" to promote.
 * The list's offshore/crypto "research candidates" are deliberately not loaded.
 *
 * Regulator sources to verify against (from the same list):
 *  MX SEGOB permits · AR ALEA (by province) · DO Dirección de Casinos y Juegos de Azar online list.
 */
const CANDIDATES: Readonly<Record<string, readonly string[]>> = {
  MX: ["Caliente", "Codere", "Strendus", "Playdoit", "Bet365", "Big Bola", "Ganabet", "Logrand", "Winpot", "Betway", "Betcris", "Apuesta Total", "Casino Palace", "Yak", "Crown City", "PlayCity", "Casino Jubilee", "Betsson"],
  AR: ["Bet365", "Betano", "Betsson", "BetWarrior", "Bplay", "Codere", "Jugadon", "Super7", "Betfun", "PlayUZU", "Casino Buenos Aires Online", "Sportsbet.io"],
  CL: ["Coolbet", "Betsson", "Bet365", "Betcris", "Rivalo", "1xBet", "Betano", "JugaBet", "Rojabet", "Latamwin", "Estelarbet", "Novibet", "Betway", "Betfair", "Bwin", "Marathonbet", "Pinnacle", "Sportingbet", "BetWarrior"], // stored, but hidden while CL is RESTRICTED
  EC: ["Ecuabet", "Bet593", "Betcris", "Betano", "Bet365", "Codere", "Betsson", "Sportbet", "Latamwin", "Rojabet", "Estelarbet", "JugaBet", "Novibet", "Betway"],
  UY: ["Supermatch", "Bet365", "Betsson", "Codere", "Bwin", "Betano", "1xBet", "Betcris", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  PY: ["Aposta.la", "Daruma SAM", "Bet365", "Betcris", "Betsson", "Betano", "1xBet", "Bwin", "Codere", "Rojabet", "Latamwin", "Estelarbet"],
  BO: ["Bet365", "Betcris", "1xBet", "Betsson", "Betano", "Codere", "Bwin", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  CR: ["Betcris", "Bet365", "Caliente", "Codere", "Sportingbet", "Betsson", "Bplay", "1xBet", "Rivalo", "Rojabet", "Latamwin", "Estelarbet"],
  PA: ["Betcris", "Bet365", "Codere", "Bwin", "Betsson", "Caliente", "1xBet", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  DO: ["SuperBets", "Betcris", "Juancito Sport", "GoGo Sport", "Orobet", "VIP987", "Appuesta", "Bet365", "1xBet", "Betsson", "Codere", "Betano", "Bwin", "Caliente", "Rojabet", "Latamwin", "Estelarbet"],
  GT: ["Bet365", "Betcris", "1xBet", "Betsson", "Codere", "Caliente", "Betano", "Bwin", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  HN: ["Betcris", "Bet365", "1xBet", "Betsson", "Codere", "Caliente", "Betano", "Bwin", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  SV: ["Betcris", "Bet365", "1xBet", "Betsson", "Codere", "Caliente", "Betano", "Bwin", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  NI: ["Betcris", "Bet365", "1xBet", "Betsson", "Codere", "Caliente", "Betano", "Bwin", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  VE: ["Bet365", "1xBet", "Betcris", "Betsson", "Codere", "Bwin", "Caliente", "Betano", "Sportingbet", "Rojabet", "Latamwin", "Estelarbet"],
  CU: ["Bet365", "1xBet", "Betcris", "Betsson"],
  GQ: ["Bet365", "Betcris", "1xBet", "Betsson"],
};

const toId = (name: string) =>
  name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const entries = Object.entries(CANDIDATES).flatMap(([countryCode, names]) =>
  [...new Set(names)].map((name) => ({ name, id: toId(name), countryCode })),
);

export const brandsIntl: readonly Brand[] = [...new Map(entries.map((e) => [e.id, { id: e.id, name: e.name, slug: e.id }])).values()];

export const brandMarketsIntl: readonly BrandMarket[] = entries.map((e) => ({
  brandId: e.id,
  countryCode: e.countryCode,
  verification: "listed" as const,
  evidenceUrl: null,
  verifiedAt: null,
}));
