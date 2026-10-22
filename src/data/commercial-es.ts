import type { BrandMarket } from "@/lib/types";
import type { Brand } from "@/lib/promotions";

/**
 * Spain: DGOJ public register of operators, filtered to the licence type
 * "Apuestas deportivas de contrapartida" (sportsbook). Checked 2026-10-21; the register shows
 * no per-row date. Operators without a gaming website (e.g. Kaizen Gaming XYZ PLC) are omitted.
 * Brand names are the operator's own sportsbook brand taken from its listed domains.
 */
const DGOJ_REGISTER =
  "https://www.ordenacionjuego.es/operadores-juego/operadores-licencia/operadores?licences=72";
const DGOJ_CHECKED = new Date("2026-10-21T00:00:00Z");
const LICENCE = "Licencia de apuestas deportivas de contrapartida";

/** Operators that also hold a DGOJ casino licence (slots, roulette, blackjack, punto y banca or poker). */
const CASINO_ENTITIES = new Set<string>([
  "888 ONLINE GAMES ESPAÑA, S.A.",
  "ARTXIBET 2022 SA",
  "BANEGRAS UNIÓN, SA",
  "BEATYA ONLINE, S.A.",
  "BETFAIR INTERNATIONAL SPAIN SA",
  "BETWAY SPAIN, S.A.",
  "CASINO BARCELONA INTERACTIVO, SA",
  "CASUMO SPAIN, PLC",
  "CODERE ONLINE, SAU",
  "COMAR INVERSIONES, SA",
  "Casino Marbella Interactive, S.A",
  "DIGITAL DISTRIBUTION MANAGEMENT IBÉRICA, SA",
  "DZBT Deportes, S.A",
  "EBINGO ONLINE ESPAÑA, SA",
  "EFBET, PLC",
  "EKASA APUESTAS ONLINE, SA",
  "ELECTRAWORKS CEUTA ,SA",
  "ESGAMING, SAU",
  "ESTRELLA SOL INTERACTIVE S.A.",
  "EURASIA SOLUTIONS, PLC",
  "EUROAPUESTAS ONLINE, SAU",
  "EUROBOX, SA",
  "GAMES SPAIN OPERATIONS, S.A.",
  "GAMESYS SPAIN, S.A.",
  "GIGA GAME ONLINE, SA",
  "GOLDEN PARK GAMES, SA",
  "IBERIX GAMING, S.A. UNIPERSONAL",
  "INTERWETTEN ESPAÑA, PLC",
  "LEOESP, S.A.",
  "LUCKIA GAMES, SA",
  "MRG SPAIN, PLC",
  "MURCIAPUESTA ONLINE, SA",
  "PAF GAMES,SA",
  "PREMIÈRE MEGAPLEX, PLC",
  "RANK DIGITAL CEUTA,S.A",
  "RFRANCO DIGITAL, SAU",
  "SPORTIUM APUESTAS DIGITAL, SA",
  "SUERTIA INTERACTIVA, SA",
  "TSG INTERACTIVE SPAIN SA",
  "VERAMATIC ONLINE, SA",
  "VERSUS ONLINE, SA",
  "WAGERFAIR, S.A.",
  "WHG Ceuta, S.A.",
  "WINAMAX, SA",
]);

const ROWS: readonly (readonly [id: string, name: string, entity: string, domain: string])[] = [
  ["888sport", "888sport", "888 ONLINE GAMES ESPAÑA, S.A.", "www.888sport.es"],
  ["kirolbet", "Kirolbet", "ARTXIBET 2022 SA", "apuestas.kirolbet.es"],
  ["juegging", "Juegging", "BANEGRAS UNIÓN, SA", "apuestas.juegging.es"],
  ["admiralbet", "AdmiralBet", "BEATYA ONLINE, S.A.", "www.admiralbet.es"],
  ["betfair", "Betfair", "BETFAIR INTERNATIONAL SPAIN SA", "apuestas.betfair.es"],
  ["betway", "Betway", "BETWAY SPAIN, S.A.", "www.betway.es"],
  ["casino-barcelona", "Casino Barcelona", "CASINO BARCELONA INTERACTIVO, SA", "www.casinobarcelona.es"],
  ["marca-apuestas", "Marca Apuestas", "Casino Marbella Interactive, S.A", "marcaapuestas.es"],
  ["casumo", "Casumo", "CASUMO SPAIN, PLC", "www.casumo.es"],
  ["codere", "Codere", "CODERE ONLINE, SAU", "www.codere.es"],
  ["casino-gran-v-a", "Casino Gran Vía", "COMAR INVERSIONES, SA", "www.casinogranvia.es"],
  ["bet777", "Bet777", "DIGITAL DISTRIBUTION MANAGEMENT IBÉRICA, SA", "www.bet777.es"],
  ["dazn-bet", "DAZN Bet", "DZBT Deportes, S.A", "daznbet.es"],
  ["ebingo", "eBingo", "EBINGO ONLINE ESPAÑA, SA", "ebingo.es"],
  ["efbet", "Efbet", "EFBET, PLC", "www.efbet.es"],
  ["retabet", "Retabet", "EKASA APUESTAS ONLINE, SA", "www.retabet.es"],
  ["bwin", "Bwin", "ELECTRAWORKS CEUTA ,SA", "www.bwin.es"],
  ["casino-gran-madrid", "Casino Gran Madrid", "ESGAMING, SAU", "www.granmadrid.es"],
  ["sol-casino", "Sol Casino", "ESTRELLA SOL INTERACTIVE S.A.", "www.solcasino.es"],
  ["dafabet", "Dafabet", "EURASIA SOLUTIONS, PLC", "www.dafabet.es"],
  ["paston", "Paston", "EUROAPUESTAS ONLINE, SAU", "www.paston.es"],
  ["tonybet", "TonyBet", "EUROBOX, SA", "www.tonybet.es"],
  ["monopoly-casino", "Monopoly Casino", "GAMES SPAIN OPERATIONS, S.A.", "www.monopolycasino.es"],
  ["botemania", "Botemania", "GAMESYS SPAIN, S.A.", "www.botemania.es"],
  ["pause-play", "Pause & Play", "GIGA GAME ONLINE, SA", "www.casinopauseandplay.es"],
  ["golden-park", "Golden Park", "GOLDEN PARK GAMES, SA", "www.goldenpark.es"],
  ["bet365", "bet365", "HILLSIDE NEW MEDIA MALTA, PLC", "www.bet365.es"],
  ["betinia", "Betinia", "IBERIX GAMING, S.A. UNIPERSONAL", "www.betinia.es"],
  ["interwetten", "Interwetten", "INTERWETTEN ESPAÑA, PLC", "www.interwetten.es"],
  ["leovegas", "LeoVegas", "LEOESP, S.A.", "www.leovegas.es"],
  ["luckia", "Luckia", "LUCKIA GAMES, SA", "www.luckia.es"],
  ["mr-green", "Mr Green", "MRG SPAIN, PLC", "www.mrgreen.es"],
  ["aupabet", "Aupabet", "MURCIAPUESTA ONLINE, SA", "www.aupabet.es"],
  ["paf", "Paf", "PAF GAMES,SA", "www.paf.es"],
  ["betsson", "Betsson", "PREMIÈRE MEGAPLEX, PLC", "www.betsson.es"],
  ["yosports", "Yosports", "RANK DIGITAL CEUTA,S.A", "www.yosports.es"],
  ["yaass-casino", "Yaass Casino", "RFRANCO DIGITAL, SAU", "www.yaasscasino.es"],
  ["sportium", "Sportium", "SPORTIUM APUESTAS DIGITAL, SA", "www.sportium.es"],
  ["olybet", "Olybet", "SUERTIA INTERACTIVA, SA", "olybet.es"],
  ["pokerstars-sports", "PokerStars Sports", "TSG INTERACTIVE SPAIN SA", "www.pokerstarssports.es"],
  ["jokerbet", "Jokerbet", "VERAMATIC ONLINE, SA", "www.jokerbet.es"],
  ["versus", "Versus", "VERSUS ONLINE, SA", "www.versus.es"],
  ["1xbet", "1xBet", "WAGERFAIR, S.A.", "www.1xbet.es"],
  ["william-hill", "William Hill", "WHG Ceuta, S.A.", "www.williamhill.es"],
  ["winamax", "Winamax", "WINAMAX, SA", "www.winamax.es"],
  ["zebet", "ZEbet", "ZEBETTING Y GAMING ESPAÑA, SA", "www.zebet.es"],
];

export const brandsEs: readonly Brand[] = ROWS.map(([id, name]) => ({ id, name, slug: id }));

export const brandMarketsEs: readonly BrandMarket[] = ROWS.map(([id, , entity, domain]) => ({
  brandId: id,
  countryCode: "ES",
  verification: "verified",
  evidenceUrl: DGOJ_REGISTER,
  verifiedAt: DGOJ_CHECKED,
  operatorEntity: entity,
  officialDomain: domain,
  licenceRef: LICENCE,
  products: CASINO_ENTITIES.has(entity) ? ["sports", "casino"] : ["sports"],
}));
