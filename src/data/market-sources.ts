export type Source = { readonly label: string; readonly url: string };

/** Sources behind each market summary (docs/06-country-register.md), checked 2026-10-21. */
export const MARKET_SOURCES: Readonly<Record<string, readonly Source[]>> = {
  ES: [{ label: "DGOJ · Operadores con licencia", url: "https://www.ordenacionjuego.es/operadores-juego/operadores-licencia/operadores" }],
  CO: [
    { label: "Coljuegos · Juegos operados por internet", url: "https://www.coljuegos.gov.co/publicaciones/juegosonline_pub" },
    { label: "CMS · Lineamientos de publicidad", url: "https://cms.law/es/col/publication/lineamientos-de-publicidad-en-las-apuestas-deportivas" },
  ],
  PE: [
    { label: "MINCETUR · Titulares de autorización", url: "https://apuestasdeportivas.mincetur.gob.pe/Titulares_autorizacion.html" },
    { label: "MINCETUR · Bloqueo de plataformas", url: "https://www.gob.pe/institucion/mincetur/noticias/1452104-mincetur-bloquea-50-plataformas-de-juegos-a-distancia-y-apuestas-deportivas-que-operaban-sin-autorizacion" },
  ],
  MX: [{ label: "Focus Gaming News · El Congreso pide un registro público de licencias", url: "https://focusgn.com/latinoamerica/el-congreso-mexicano-pide-un-registro-publico-de-licencias-para-casinos-y-apuestas-online" }],
  AR: [{ label: "Yogonet · Casinos online en CABA y provincia de Buenos Aires", url: "https://www.yogonet.com/latinoamerica/noticias/2026/03/25/108080-como-es-la-reglamentacion-de-los-casinos-online-en-caba-y-en-la-provincia-de-buenos-aires" }],
  CL: [
    { label: "Primicias · Corte Suprema de Chile", url: "https://www.primicias.ec/deportes/futbol/corte-suprema-chile-bloqueo-casas-apuestas-linea-ilegalidad-106330/" },
    { label: "ECIJA · Escenario legal en Chile", url: "https://www.ecija.com/actualidad-insights/el-escenario-legal-de-las-apuestas-en-linea-en-chile-riesgos-vacios-normativos-y-proyecto-de-ley/" },
  ],
  EC: [{ label: "Vistazo · Recaudación en apuestas deportivas", url: "https://www.vistazo.com/amp/portafolio/economia/2026-05-30-ecuador-enfrenta-retos-captar-mayor-recaudacion-sitios-apuestas-deportivas-CA11005632" }],
  PA: [{ label: "La Estrella de Panamá · Controles sobre apuestas digitales", url: "https://www.laestrella.com.pa/panama/nacional/panama-endurece-controles-sobre-apuestas-digitales-HN22852410" }],
  DO: [{ label: "FC Abogados · Ley 86-26", url: "https://fc-abogados.com/apuestas-por-internet-en-republica-dominicana-nuevas-licencias-impuestos-y-bloqueo-de-plataformas-bajo-la-ley-86-26/" }],
  UY: [{ label: "Focus Gaming News · Uruguay prohíbe el iGaming", url: "https://focusgn.com/latinoamerica/uruguay-tambien-prohibe-igaming" }],
  PY: [{ label: "Focus Gaming News · Paraguay confirma operador de apuestas deportivas", url: "https://focusgn.com/latinoamerica/paraguay-confirma-operador-de-apuestas-deportivas" }],
  BO: [{ label: "Yogonet · La autoridad del juego denuncia una plataforma ilegal", url: "https://www.yogonet.com/latinoamerica/noticias/2025/07/04/104836-bolivia-la-autoridad-del-juego-denuncia-una-plataforma-de-apuestas-ilegales" }],
  CR: [{ label: "Focus Gaming News · Proyecto 25.057 en Costa Rica", url: "https://focusgn.com/latinoamerica/la-jps-de-costa-rica-acelera-el-debate-del-proyecto-25-057-para-frenar-el-avance-del-juego-ilegal" }],
  GT: [{ label: "SoloAzar · Guatemala y el vacío legal del juego online", url: "https://soloazar.com/en/category/analysis/guatemala-caught-in-the-legal-vacuum-of-online-gambling" }],
};
