import type { Lang } from "@/i18n/config";

type Text = Readonly<Record<Lang, string>>;

export type MarketInfo = {
  readonly flag: string;
  readonly tier: "PRIORITY" | "GROWTH" | "WATCHING";
  /** Legal position in one or two sentences (docs/06-country-register.md, research of 2026-10-21). */
  readonly summary: Text;
  /** Brand ids in editorial feature order, from the owner's candidate lists. */
  readonly featured: readonly string[];
};

const t = (en: string, es: string): Text => ({ en, es });

export const MARKET_INFO: Readonly<Record<string, MarketInfo>> = {
  ES: { flag: "🇪🇸", tier: "PRIORITY", featured: ["bet365", "betfair", "betway", "sportium", "codere", "888sport", "bwin", "luckia"],
    summary: t("Online betting is regulated by the DGOJ. Only companies on its public register may operate.", "Las apuestas online están reguladas por la DGOJ. Solo pueden operar las empresas de su registro público.") },
  MX: { flag: "🇲🇽", tier: "PRIORITY", featured: [],
    summary: t("A 1947 federal law and permits from Segob apply. There is no public register of online operators, so the brands we list here are not verified.", "Se aplica una ley federal de 1947 y permisos de Segob. No hay un registro público de operadores en línea, así que las marcas que listamos aquí no están verificadas.") },
  CO: { flag: "🇨🇴", tier: "PRIORITY", featured: ["wplay", "betplay", "rushbet", "codere", "betsson", "zamba"],
    summary: t("Coljuegos licenses online operators and publishes its official list, with .co websites and contract numbers.", "Coljuegos autoriza a los operadores en línea y publica su listado oficial, con webs .co y números de contrato.") },
  AR: { flag: "🇦🇷", tier: "PRIORITY", featured: [],
    summary: t("Regulation is provincial, and a licence in one province doesn't cover another. We're checking province by province.", "La regulación es provincial y una licencia de una provincia no vale en otra. Lo estamos comprobando provincia por provincia.") },
  PE: { flag: "🇵🇪", tier: "PRIORITY", featured: ["inkabet", "teapuesto", "apuesta-total", "betsson", "bet365", "coolbet", "doradobet"],
    summary: t("MINCETUR authorises remote sports betting platforms under Law 31557 and publishes a register of licence holders.", "MINCETUR autoriza las plataformas de apuestas deportivas a distancia según la Ley 31557 y publica un registro de titulares.") },
  CL: { flag: "🇨🇱", tier: "GROWTH", featured: [],
    summary: t("In September 2025 the Supreme Court ruled that unlicensed online gambling is illegal. A bill is still in the Senate, so we don't list bookmakers.", "En septiembre de 2025 la Corte Suprema declaró ilícito el juego online no autorizado. Hay un proyecto de ley en el Senado, así que no listamos casas de apuestas.") },
  EC: { flag: "🇪🇨", tier: "GROWTH", featured: [],
    summary: t("The 2026 Sports Law and its regulations require platforms to hold a licence. There is no official list of holders yet.", "La Ley del Deporte de 2026 y su reglamento exigen licencia a las plataformas. Todavía no hay un listado oficial de titulares.") },
  CR: { flag: "🇨🇷", tier: "GROWTH", featured: [], summary: t("There is no local licensing system for online gambling. Bills are going through the legislature.", "No hay un sistema local de licencias para el juego en línea. Hay proyectos de ley en trámite.") },
  PA: { flag: "🇵🇦", tier: "GROWTH", featured: [], summary: t("The Gaming Control Board issues licences and, since Law 527 of 2026, can block unlicensed sites. There is no official public list.", "La Junta de Control de Juegos concede licencias y, desde la Ley 527 de 2026, puede bloquear sitios sin licencia. No hay una lista pública oficial.") },
  DO: { flag: "🇩🇴", tier: "GROWTH", featured: [], summary: t("Law 86-26 of October 2026 creates a new regulator and requires online operators to hold a licence. No holders have been published yet.", "La Ley 86-26 de octubre de 2026 crea un nuevo regulador y exige licencia a los operadores en línea. Todavía no se han publicado titulares.") },
  UY: { flag: "🇺🇾", tier: "WATCHING", featured: [], summary: t("Unauthorised online gambling is illegal and the regulator has blocked more than 1,700 sites. There is a single licensed platform.", "El juego online no autorizado es ilegal y el regulador ha bloqueado más de 1.700 sitios. Solo hay una plataforma con licencia.") },
  PY: { flag: "🇵🇾", tier: "WATCHING", featured: [], summary: t("One company holds an exclusive sports betting concession until 2028, so we don't list others.", "Una sola empresa tiene la concesión exclusiva de apuestas deportivas hasta 2028, así que no listamos otras.") },
  BO: { flag: "🇧🇴", tier: "WATCHING", featured: [], summary: t("The gaming authority says no online platforms are authorised and has reported unlicensed ones.", "La autoridad del juego dice que no hay plataformas en línea autorizadas y ha denunciado a las que operan sin licencia.") },
  GT: { flag: "🇬🇹", tier: "WATCHING", featured: [], summary: t("There is a legal gap for online gambling, and a bill to regulate it is pending.", "Hay un vacío legal para el juego en línea y está pendiente un proyecto de ley que lo regule.") },
  HN: { flag: "🇭🇳", tier: "WATCHING", featured: [], summary: t("Online gambling sits in a legal grey area with no specific regime.", "El juego en línea está en una zona gris legal, sin un régimen específico.") },
  SV: { flag: "🇸🇻", tier: "WATCHING", featured: [], summary: t("We haven't found a general law covering online betting.", "No hemos encontrado una ley general que regule las apuestas en línea.") },
  NI: { flag: "🇳🇮", tier: "WATCHING", featured: [], summary: t("The casino law covers physical venues. There are no licences for online operators.", "La ley de casinos regula los locales físicos. No hay licencias para operadores en línea.") },
  VE: { flag: "🇻🇪", tier: "WATCHING", featured: [], summary: t("Online gambling is neither expressly banned nor authorised, and there is no licensing regime.", "El juego en línea no está prohibido ni autorizado de forma expresa y no hay régimen de licencias.") },
  PR: { flag: "🇵🇷", tier: "WATCHING", featured: [], summary: t("A US territory with licences from its Gaming Commission. Online accounts must be registered in person.", "Territorio de EE. UU. con licencias de su Comisión de Juegos. Las cuentas en línea se registran en persona.") },
  CU: { flag: "🇨🇺", tier: "WATCHING", featured: [], summary: t("We haven't found a reliable source on the legal position, so we're only watching.", "No hemos encontrado una fuente fiable sobre la situación legal, así que solo la observamos.") },
  GQ: { flag: "🇬🇶", tier: "WATCHING", featured: [], summary: t("A licensing framework was announced in 2025, but the information available isn't official.", "En 2025 se anunció un marco de licencias, pero la información disponible no es oficial.") },
};
