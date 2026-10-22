import type { GuideBlock } from "@/content/guides";
import type { Lang } from "@/i18n/config";

type L<T> = Readonly<Record<Lang, T>>;

export type Article = {
  readonly slug: string;
  readonly category: L<string>;
  readonly variant: "shield" | "chip" | "pin";
  /** ISO date this story was added to the site. Dates of the events are in the text. */
  readonly date: string;
  readonly title: L<string>;
  readonly summary: L<string>;
  readonly body: L<readonly GuideBlock[]>;
  readonly sources: readonly { readonly label: string; readonly url: string }[];
};

const p = (text: string): GuideBlock => ({ type: "p", text });
const LICENCES = { en: "Licences", es: "Licencias" };
const REGULATION = { en: "Regulation", es: "Regulación" };
const MARKETS = { en: "Markets", es: "Mercados" };
const D = "2026-10-21";

export const ARTICLES: readonly Article[] = [
  {
    slug: "peru-mincetur-44-licensed-platforms",
    category: LICENCES, variant: "shield", date: D,
    title: { en: "Peru: MINCETUR lists 44 sports betting platforms with a current licence", es: "Perú: MINCETUR registra 44 plataformas de apuestas deportivas con autorización vigente" },
    summary: { en: "The official register shows 49 remote sports betting authorisations, five of them temporarily suspended.", es: "El registro oficial muestra 49 autorizaciones de apuestas deportivas a distancia, cinco de ellas suspendidas temporalmente." },
    body: {
      en: [
        p("MINCETUR's public register of authorisation holders, which we read on 21 October 2026, contains 49 remote sports betting authorisations. Of those, 44 are current and five are shown as temporarily suspended."),
        p("Each entry gives the company, website, registration number and the resolution that granted it. Platforms operating without authorisation can be blocked: MINCETUR has reported 86 blocks during 2026, with another 157 platforms lined up for blocking."),
        p("We only list the current platforms and check the register again every 90 days."),
      ],
      es: [
        p("El registro público de titulares de autorización de MINCETUR, que consultamos el 21 de octubre de 2026, contiene 49 autorizaciones de apuestas deportivas a distancia. De ellas, 44 están vigentes y cinco figuran con suspensión temporal."),
        p("Cada entrada indica la empresa, la web, el número de registro y la resolución que la concedió. Las plataformas que operan sin autorización pueden ser bloqueadas: MINCETUR ha informado de 86 bloqueos en 2026 y de otras 157 plataformas pendientes de bloqueo."),
        p("Solo listamos las plataformas vigentes y volvemos a comprobar el registro cada 90 días."),
      ],
    },
    sources: [
      { label: "MINCETUR · Authorisation holders", url: "https://apuestasdeportivas.mincetur.gob.pe/Titulares_autorizacion.html" },
      { label: "MINCETUR · Blocking of unlicensed platforms", url: "https://www.gob.pe/institucion/mincetur/noticias/1452104-mincetur-bloquea-50-plataformas-de-juegos-a-distancia-y-apuestas-deportivas-que-operaban-sin-autorizacion" },
    ],
  },
  {
    slug: "spain-46-bookmakers-on-the-dgoj-register",
    category: LICENCES, variant: "shield", date: D,
    title: { en: "Spain: 46 licensed bookmakers with a live website on the DGOJ register", es: "España: 46 casas de apuestas con licencia y web activa en el registro de la DGOJ" },
    summary: { en: "The register lists 78 operators. 47 hold the sports betting licence, and one of them has no gambling website.", es: "El registro incluye 78 operadores. 47 tienen la licencia de apuestas deportivas y uno de ellos no tiene web de juego." },
    body: {
      en: [
        p("The DGOJ's search tool for licensed operators shows 78 companies. Filter by the sports betting licence (\"apuestas deportivas de contrapartida\"), the standard one for bookmakers, and 47 remain. One of those has no gambling website, so we list 46."),
        p("The register gives every company's authorised websites. Checking that the address matches exactly is the simplest way to avoid copycat sites."),
      ],
      es: [
        p("El buscador de operadores con licencia de la DGOJ muestra 78 empresas. Si filtras por la licencia de apuestas deportivas de contrapartida, la habitual en las casas de apuestas, quedan 47. Una de ellas no tiene web de juego, así que listamos 46."),
        p("El registro indica las webs autorizadas de cada empresa. Comprobar que la dirección coincide exactamente es la forma más sencilla de evitar sitios que imitan a otros."),
      ],
    },
    sources: [{ label: "DGOJ · Licensed operators search", url: "https://www.ordenacionjuego.es/operadores-juego/operadores-licencia/operadores?licences=72" }],
  },
  {
    slug: "colombia-coljuegos-14-online-operators",
    category: LICENCES, variant: "chip", date: D,
    title: { en: "Colombia: Coljuegos lists 14 online gambling operators", es: "Colombia: Coljuegos lista 14 operadores de juegos por internet" },
    summary: { en: "The official list, last changed on 13 October 2026, gives each brand, company, website and contract number.", es: "El listado oficial, modificado por última vez el 13 de octubre de 2026, incluye marca, empresa, web y número de contrato." },
    body: {
      en: [
        p("Coljuegos publishes the list of operators authorised to run online games. On 21 October 2026 it showed 14, with .co or .com.co websites and a contract number for each."),
        p("Resolution 20231000019054 of 2023 says adverts for these games must carry the words \"Autorizado por COLJUEGOS\", a responsible gambling message and an over-18 notice, and must not be aimed at minors."),
      ],
      es: [
        p("Coljuegos publica la lista de operadores autorizados para juegos por internet. El 21 de octubre de 2026 figuraban 14, con webs .co o .com.co y un número de contrato cada una."),
        p("La Resolución 20231000019054 de 2023 establece que la publicidad de estos juegos debe incluir la frase «Autorizado por COLJUEGOS», un mensaje de juego responsable y un aviso de mayoría de edad, y que no puede dirigirse a menores."),
      ],
    },
    sources: [
      { label: "Coljuegos · Games operated over the internet", url: "https://www.coljuegos.gov.co/publicaciones/juegosonline_pub" },
      { label: "CMS · Betting advertising guidelines", url: "https://cms.law/es/col/publication/lineamientos-de-publicidad-en-las-apuestas-deportivas" },
    ],
  },
  {
    slug: "chile-supreme-court-unlicensed-online-gambling",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Chile: Supreme Court rules unlicensed online gambling is illegal", es: "Chile: la Corte Suprema declara ilícito el juego online sin autorización" },
    summary: { en: "While a bill sits in the Senate, online betting isn't authorised in Chile, so we list no bookmakers there.", es: "Mientras un proyecto de ley espera en el Senado, las apuestas online no están autorizadas en Chile, así que no listamos casas de apuestas." },
    body: {
      en: [
        p("According to legal analysis and press reports, the Supreme Court of Chile decided in September 2025 that unlicensed online gambling is illegal under current law, and ordered dozens of web addresses to be blocked."),
        p("The bill that would regulate online betting (bulletin 14838-03) passed the Chamber of Deputies in 2023 and was still in the Senate in the latest reports we found. That's why Chile is marked as restricted on this site."),
      ],
      es: [
        p("Según análisis jurídicos y la prensa, la Corte Suprema de Chile resolvió en septiembre de 2025 que el juego online sin autorización es ilícito con la ley actual y ordenó bloquear decenas de direcciones web."),
        p("El proyecto de ley que regularía las apuestas en línea (boletín 14838-03) fue aprobado por la Cámara en 2023 y seguía en el Senado en las últimas informaciones que hemos encontrado. Por eso Chile figura como mercado restringido en esta web."),
      ],
    },
    sources: [
      { label: "Primicias · Supreme Court of Chile", url: "https://www.primicias.ec/deportes/futbol/corte-suprema-chile-bloqueo-casas-apuestas-linea-ilegalidad-106330/" },
      { label: "ECIJA · The legal picture in Chile", url: "https://www.ecija.com/actualidad-insights/el-escenario-legal-de-las-apuestas-en-linea-en-chile-riesgos-vacios-normativos-y-proyecto-de-ley/" },
    ],
  },
  {
    slug: "dominican-republic-law-86-26",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Dominican Republic: Law 86-26 will require online operators to be licensed", es: "República Dominicana: la Ley 86-26 exigirá licencia a los operadores por internet" },
    summary: { en: "The new law creates a gambling regulator and covers online platforms. No licence holders have been published yet.", es: "La nueva ley crea un regulador del juego y abarca las plataformas en línea. Todavía no hay titulares publicados." },
    body: {
      en: [
        p("According to Dominican law firms, Law 86-26, published in the Official Gazette (no. 11263) on 2 October 2026, creates the General Directorate of Gambling and says only licensed companies may run gambling over the internet."),
        p("Until that regulator publishes its list of licence holders, we don't list Dominican bookmakers. Our betting laws page keeps a short summary of every market."),
      ],
      es: [
        p("Según despachos de abogados dominicanos, la Ley 86-26, publicada en la Gaceta Oficial (n.º 11263) el 2 de octubre de 2026, crea la Dirección General de Juegos de Azar y establece que solo las empresas con licencia pueden operar juegos de azar por internet."),
        p("Hasta que ese regulador publique su lista de titulares, no listamos casas de apuestas dominicanas. En nuestra página de leyes de apuestas mantenemos un resumen breve de cada mercado."),
      ],
    },
    sources: [{ label: "FC Abogados · Online betting under Law 86-26", url: "https://fc-abogados.com/apuestas-por-internet-en-republica-dominicana-nuevas-licencias-impuestos-y-bloqueo-de-plataformas-bajo-la-ley-86-26/" }],
  },
  {
    slug: "mexico-congress-asks-for-a-public-permit-register",
    category: MARKETS, variant: "pin", date: D,
    title: { en: "Mexico: Congress asks Segob to publish a register of betting permits", es: "México: el Congreso pide a Segob que publique un registro de permisos de apuestas" },
    summary: { en: "There's no public list of online betting permit holders, which is why we don't list Mexican bookmakers yet.", es: "No existe una lista pública de titulares de permisos de apuestas en línea, y por eso todavía no listamos casas de apuestas mexicanas." },
    body: {
      en: [
        p("In May 2026 a member of Mexico's Congress asked the Interior Ministry (Segob) to publish an open register of every current permit for casinos and online betting platforms, including their websites. The current register was described as scattered and hard to follow."),
        p("A 1947 law still governs gambling in Mexico, and the 2023 rules that updated it are being challenged in court. Until a clear register exists, we can't check Mexican bookmakers against an official source."),
      ],
      es: [
        p("En mayo de 2026 un diputado mexicano pidió a la Secretaría de Gobernación (Segob) que publique un registro abierto de todos los permisos vigentes de casinos y plataformas de apuestas en línea, con sus dominios. Se describió el registro actual como disperso y difícil de seguir."),
        p("Una ley de 1947 sigue regulando el juego en México y las normas de 2023 que la actualizaron están recurridas en los tribunales. Mientras no exista un registro claro, no podemos comprobar a las casas de apuestas mexicanas con una fuente oficial."),
      ],
    },
    sources: [
      { label: "Focus Gaming News · Congress asks for a public licence register", url: "https://focusgn.com/latinoamerica/el-congreso-mexicano-pide-un-registro-publico-de-licencias-para-casinos-y-apuestas-online" },
      { label: "Yogonet · Congress demands a public register", url: "https://www.yogonet.com/latinoamerica/noticias/2026/05/27/109102-el-congreso-mexicano-exige-a-la-segob-un-registro-publico-de-licencias-de-apuestas-y-casinos" },
    ],
  },
  {
    slug: "argentina-licences-are-province-by-province",
    category: MARKETS, variant: "pin", date: D,
    title: { en: "Argentina: a licence in one province doesn't cover another", es: "Argentina: una licencia de una provincia no vale en otra" },
    summary: { en: "Each province and Buenos Aires city regulates separately. Santa Fe awarded four licences in June 2026, according to one report.", es: "Cada provincia y la ciudad de Buenos Aires regulan por separado. Santa Fe adjudicó cuatro licencias en junio de 2026, según una información." },
    body: {
      en: [
        p("Argentina's 23 provinces and Buenos Aires city each have their own rules. Around twenty jurisdictions now have regulated markets, others are still deciding, and at least one, Santiago del Estero, bans online betting. Licensed operators use .bet.ar websites."),
        p("A June 2026 report said Santa Fe had awarded four licences to run online betting platforms, with 180 days to start. Because eligibility depends on the province, we haven't listed Argentine bookmakers until we can check each one against its provincial register."),
      ],
      es: [
        p("Las 23 provincias argentinas y la ciudad de Buenos Aires tienen cada una sus propias normas. Unas veinte jurisdicciones ya tienen mercados regulados, otras aún lo estudian y al menos una, Santiago del Estero, prohíbe las apuestas en línea. Los operadores con licencia usan webs .bet.ar."),
        p("Una información de junio de 2026 decía que Santa Fe había adjudicado cuatro licencias para operar plataformas de apuestas en línea, con 180 días para empezar. Como la autorización depende de la provincia, no listamos casas de apuestas argentinas hasta poder comprobar cada una en su registro provincial."),
      ],
    },
    sources: [
      { label: "Yogonet · Online casinos in Buenos Aires city and province", url: "https://www.yogonet.com/latinoamerica/noticias/2026/03/25/108080-como-es-la-reglamentacion-de-los-casinos-online-en-caba-y-en-la-provincia-de-buenos-aires" },
      { label: "SiGMA · Santa Fe sports betting licences 2026", url: "https://sigma.world/es/news/licencias-apuestas-deportivas-santa-fe-2026/" },
    ],
  },
  {
    slug: "panama-law-527-blocks-unlicensed-sites",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Panama: new law lets the regulator block unlicensed betting sites", es: "Panamá: una nueva ley permite al regulador bloquear sitios de apuestas sin licencia" },
    summary: { en: "Law 527, published on 28 May 2026, allows blocking and fines of up to one million balboas.", es: "La Ley 527, publicada el 28 de mayo de 2026, permite bloquear sitios y multar hasta con un millón de balboas." },
    body: {
      en: [
        p("According to press reports, Panama's Law 527 was published on 28 May 2026. It lets the Gaming Control Board order the blocking of betting sites without a current licence, sets spending and time limits for players and requires stronger identity checks. Companies that break the rules face fines of up to one million balboas."),
        p("Panama has no official public list of licensed online operators, and the unofficial lists we found disagree. That's why we don't list Panamanian bookmakers yet."),
      ],
      es: [
        p("Según la prensa, la Ley 527 de Panamá se publicó el 28 de mayo de 2026. Permite a la Junta de Control de Juegos ordenar el bloqueo de sitios de apuestas sin licencia vigente, fija límites de gasto y de tiempo para los jugadores y exige controles de identidad más estrictos. Las empresas que incumplan se exponen a multas de hasta un millón de balboas."),
        p("Panamá no tiene una lista pública oficial de operadores en línea con licencia y las listas no oficiales que encontramos no coinciden. Por eso todavía no listamos casas de apuestas panameñas."),
      ],
    },
    sources: [
      { label: "La Estrella de Panamá · Tighter controls on digital betting", url: "https://www.laestrella.com.pa/panama/nacional/panama-endurece-controles-sobre-apuestas-digitales-HN22852410" },
      { label: "SiGMA · Panama Law 527", url: "https://sigma.world/es/news/apuestas-en-linea-panama-ley-527/" },
    ],
  },
  {
    slug: "ecuador-new-sports-law-and-licence-rules",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Ecuador: new sports law sets licence rules for betting platforms", es: "Ecuador: la nueva ley del deporte fija reglas de licencia para las plataformas de apuestas" },
    summary: { en: "The law came into force on 11 February 2026 and its regulations followed on 12 June. No list of licence holders yet.", es: "La ley entró en vigor el 11 de febrero de 2026 y su reglamento llegó el 12 de junio. Todavía no hay lista de titulares." },
    body: {
      en: [
        p("Ecuador's new Sports Law came into force on 11 February 2026 and covers sports betting. Its regulations, issued on 12 June 2026, say betting platforms, local or foreign, need a licence of up to five years, according to press reports."),
        p("A tax authority ruling in April 2026 also put 15% VAT on online betting promotion. We haven't found an official list of licence holders, so we don't list Ecuadorian bookmakers yet."),
      ],
      es: [
        p("La nueva Ley del Deporte de Ecuador entró en vigor el 11 de febrero de 2026 y abarca las apuestas deportivas. Según la prensa, su reglamento, emitido el 12 de junio de 2026, establece que las plataformas de apuestas, nacionales o extranjeras, necesitan una licencia de hasta cinco años."),
        p("Una resolución de la autoridad tributaria de abril de 2026 también aplicó un 15 % de IVA a la difusión de apuestas en línea. No hemos encontrado un listado oficial de titulares, así que todavía no listamos casas de apuestas ecuatorianas."),
      ],
    },
    sources: [
      { label: "Primicias · Regulations of the Sports Law", url: "https://www.primicias.ec/deportes/pronosticos-deportivos-apuestas-reglamento-ley-deporte-130298/" },
      { label: "Vistazo · Tax collection from betting sites", url: "https://www.vistazo.com/amp/portafolio/economia/2026-05-30-ecuador-enfrenta-retos-captar-mayor-recaudacion-sitios-apuestas-deportivas-CA11005632" },
    ],
  },
  {
    slug: "uruguay-blocks-more-than-1700-betting-sites",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Uruguay: more than 1,700 unlicensed betting sites blocked", es: "Uruguay: más de 1.700 sitios de apuestas sin licencia bloqueados" },
    summary: { en: "The national lottery directorate says only one platform is licensed, and unauthorised gambling adverts are banned.", es: "La Dirección Nacional de Loterías dice que solo una plataforma tiene licencia y que la publicidad de juego no autorizado está prohibida." },
    body: {
      en: [
        p("Uruguay's lottery directorate (DNLQ) said that by April 2026 it had blocked more than 1,700 betting websites operating without authorisation. Under Law 19.535, any online gambling service without authorisation is illegal."),
        p("The DNLQ names a single licensed platform, Supermatch. Advertising unauthorised gambling is also banned and media can be told to stop. For those reasons we don't list other bookmakers in Uruguay."),
      ],
      es: [
        p("La Dirección Nacional de Loterías y Quinielas (DNLQ) de Uruguay informó de que, a abril de 2026, había bloqueado más de 1.700 webs de apuestas que operaban sin autorización. Según la Ley 19.535, cualquier servicio de juego en línea sin autorización es ilegal."),
        p("La DNLQ señala una única plataforma con licencia, Supermatch. También está prohibida la publicidad de juego no autorizado y se puede ordenar a los medios que la retiren. Por eso no listamos otras casas de apuestas en Uruguay."),
      ],
    },
    sources: [
      { label: "Yogonet · Uruguay warns about illegal betting ahead of the World Cup", url: "https://www.yogonet.com/latinoamerica/noticias/2026/04/15/108474-uruguay-loterias-y-quinielas-advierte-sobre-apuestas-online-ilegales-de-cara-al-mundial-2026" },
      { label: "SiGMA · 1,700 sites blocked in Uruguay", url: "https://sigma.world/es/news/juego-online-uruguay-1700-sitios-bloqueados/" },
    ],
  },
  {
    slug: "paraguay-one-sports-betting-concession",
    category: REGULATION, variant: "pin", date: D,
    title: { en: "Paraguay: one company holds the sports betting concession until 2028", es: "Paraguay: una sola empresa tiene la concesión de apuestas deportivas hasta 2028" },
    summary: { en: "A new law allows up to three operators per type of game, but no new tender has been completed.", es: "Una nueva ley permite hasta tres operadores por modalidad de juego, pero no se ha completado ninguna licitación nueva." },
    body: {
      en: [
        p("Paraguay's gambling regulator says Daruma SAM, which runs the Aposta.la brand, is the only authorised operator of sports betting for as long as its concession lasts. Reports say it was renewed in 2022 to run until 2028."),
        p("Law 7.438 allows up to three operators per type of game, and the regulator has looked at holding a new tender. Until that happens, we don't list other bookmakers in Paraguay."),
      ],
      es: [
        p("El regulador del juego de Paraguay indica que Daruma SAM, que opera la marca Aposta.la, es el único operador autorizado de apuestas deportivas mientras dure su concesión. Según las informaciones, se renovó en 2022 hasta 2028."),
        p("La Ley 7.438 permite hasta tres operadores por modalidad de juego y el regulador ha estudiado convocar una nueva licitación. Mientras no ocurra, no listamos otras casas de apuestas en Paraguay."),
      ],
    },
    sources: [
      { label: "Focus Gaming News · Paraguay confirms its sports betting operator", url: "https://focusgn.com/latinoamerica/paraguay-confirma-operador-de-apuestas-deportivas" },
      { label: "Focus Gaming News · Why Conajzar may re-tender sports betting", url: "https://focusgn.com/latinoamerica/por-que-la-conajzar-de-paraguay-estudia-licitar-nuevamente-las-apuestas-deportivas" },
    ],
  },
  {
    slug: "costa-rica-bills-to-regulate-online-gambling",
    category: MARKETS, variant: "pin", date: D,
    title: { en: "Costa Rica: still no licensing system, with bills before the legislature", es: "Costa Rica: sigue sin sistema de licencias, con proyectos de ley en la Asamblea" },
    summary: { en: "The gaming board wants tougher rules on illegal gambling, but reports on the status of the bills conflict.", es: "La junta del juego quiere normas más duras contra el juego ilegal, pero las informaciones sobre el estado de los proyectos no coinciden." },
    body: {
      en: [
        p("Costa Rica has no local licensing system for online gambling. Two bills have been discussed: file 25.057, which the gaming board (JPS) asked lawmakers to prioritise in late 2025, and file 25.600, which would make the JPS the single regulator for lotteries, sports betting and digital casinos."),
        p("Reports disagree on what happened to 25.057: one says it was rejected in early 2026, and we couldn't confirm that on the official site. Until there's a licensing system, we don't list bookmakers in Costa Rica."),
      ],
      es: [
        p("Costa Rica no tiene un sistema local de licencias para el juego en línea. Se han debatido dos proyectos: el expediente 25.057, que la Junta de Protección Social (JPS) pidió priorizar a finales de 2025, y el 25.600, que convertiría a la JPS en el único regulador de loterías, apuestas deportivas y casinos digitales."),
        p("Las informaciones no coinciden sobre lo ocurrido con el 25.057: una dice que se rechazó a principios de 2026 y no hemos podido confirmarlo en la web oficial. Mientras no haya un sistema de licencias, no listamos casas de apuestas en Costa Rica."),
      ],
    },
    sources: [
      { label: "Focus Gaming News · Project 25.057 in Costa Rica", url: "https://focusgn.com/latinoamerica/la-jps-de-costa-rica-acelera-el-debate-del-proyecto-25-057-para-frenar-el-avance-del-juego-ilegal" },
      { label: "SiGMA · Reform against illegal betting in Costa Rica", url: "https://sigma.world/es/news/reforma-apuestas-ilegales-costa-rica/" },
    ],
  },
];

export const getArticle = (slug: string): Article | null => ARTICLES.find((a) => a.slug === slug) ?? null;
