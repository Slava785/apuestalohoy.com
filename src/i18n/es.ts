import type { Dict } from "@/i18n/en";

/** Español. Neutro y claro; tuteo. */
export const es: Dict = {
  htmlLang: "es",
  siteTitle: "Casas de apuestas en países de habla hispana, comparadas",
  siteDescription:
    "Compara casas de apuestas de países de habla hispana. Las marcas comprobadas en los registros oficiales de licencias van marcadas como verificadas; el resto aparece como sin verificar. Reseñas y guías claras.",
  skip: "Saltar al contenido",
  homeLabel: "Inicio",

  nav: {
    sportsBetting: "Apuestas deportivas",
    casinos: "Casinos online",
    bonuses: "Bonos",
    reviews: "Reseñas",
    compare: "Comparar",
    guides: "Guías",
    news: "Noticias",
    responsible: "Juego responsable",
    country: "País",
    language: "Idioma",
    openMenu: "Abrir menú",
    main: "Principal",
  },

  sponsor: { meta: "+18 · Destacado · Aplican T&C", featured: "Destacados", close: "Cerrar" },

  ads: {
    topPicksKicker: (country: string) => `Selección · ${country}`,
    topPicksTitle: "Nuestra selección",
    topPicksText: "Casas de apuestas con licencia que merece la pena mirar. Todas figuran en el registro oficial y el botón te lleva a su web.",
    visit: "Visitar web →",
    licensedBy: (reg: string) => `Autorizada por ${reg}`,
    stripLabel: "Destacados",
    stripAge: "Publicidad · +18",
    partnersTitle: "Casas de apuestas destacadas",
    partnersTag: "AD",
    advert: "Publicidad · +18",
    headline: (name: string) => `Apuesta con ${name}`,
    cta: "Visitar web →",
    sponsored: "Patrocinado · Aplican T&C",
    tcs: "Aplican T&C · +18",
  },

  common: {
    betNow: "Apostar ahora",
    readReview: "Leer reseña completa",
    verified: "Verificado",
    seeAll: "Ver todo →",
    viewPromotions: "Ver promociones",
    claim: "Visitar web",
    promoHeadline: "Promociones para clientes registrados: consulta las ofertas del día",
    promoDetail:
      "Los clientes registrados pueden encontrar cashback, apuestas gratuitas y mejores cuotas en la página de promociones de la casa. Las ofertas cambian a menudo, así que lee las condiciones vigentes antes de registrarte.",
    wagering: "Requisito de apuesta: por confirmar",
    licensedBy: (reg: string, country: string) => `Autorizada por ${reg} para operar en ${country}.`,
    casino: "Casino",
    notReviewed: "Aún sin revisar.",
    position: (n: number) => `Posición ${n}`,
    loading: "Cargando…",
    age: "+18",
  },

  filter: {
    search: "Buscar casa de apuestas",
    placeholder: "Nombre o web",
    country: "Filtrar por país",
    all: "Todos",
    count: (shown: number, total: number) => `${shown} de ${total} casas de apuestas`,
    none: "Ninguna casa de apuestas coincide con tu búsqueda.",
    clear: "Borrar filtros",
  },

  home: {
    kicker: () => "Guía de apuestas · Países de habla hispana",
    title: () => "Casas de apuestas en el mundo hispanohablante, comparadas y comprobadas",
    lede: () =>
      "Compara casas de apuestas y casinos abiertos a jugadores de países de habla hispana. Reseñas, datos de la licencia, bonos y guías en un solo sitio, y cada dato enlaza a su fuente.",
    statListed: "casas de apuestas listadas",
    statCasino: "también con licencia de casino",
    chips: ["Fuentes siempre visibles", "Ningún bono inventado", "Licencias revisadas cada 90 días"],
    ctaSports: "Apuestas deportivas",
    ctaCasinos: "Casinos",
    ctaBonuses: "Bonos",
    otherMarkets: "Otros mercados",
    seeAllMarkets: "Ver todos →",
    offersKicker: "Ofertas · octubre de 2026",
    offersTitle: "Ofertas de bienvenida",
    offersText:
      "Solo mostramos una oferta concreta cuando la hemos confirmado en la web de la casa de apuestas. Hasta entonces, el botón te lleva a su web.",
    rowsKicker: "Casas de apuestas",
    rowsTitle: "Casas de apuestas que analizamos",
    rowsText: "Operadores reales y con licencia. Cada reseña dice qué hemos comprobado y qué no.",
    casinosKicker: "Casinos",
    casinosTitle: "Casinos online que analizamos",
    casinosText: "Casas de apuestas que además tienen licencia de casino en el registro oficial.",
    verifiedKicker: "Comprobadas",
    verifiedTitle: "Operadores verificados",
    verifiedLink: "Ver reseñas →",
    moreKicker: "Mercados",
    moreTitle: "Más países",
    moreLink: "Ver países →",
    guidesKicker: "Aprende",
    guidesTitle: "Últimas guías",
    newsKicker: "Redacción",
    newsTitle: "Últimas noticias",
  },

  rg: {
    kicker: "Juega con responsabilidad",
    title: "Apostar debe ser entretenimiento, nunca una forma de ganar dinero.",
    text: "Consulta las herramientas de límites, la autoexclusión y las organizaciones de ayuda de tu país.",
    button: "Más información",
  },

  footer: {
    tagline: "Guías de apuestas en español, país por país.",
    age: "+18. Juega con responsabilidad.",
    explore: "Explorar",
    learn: "Aprender",
    markets: "Mercados",
    company: "Empresa",
    allCountries: "Todos los países",
    sister: "Sitio hermano",
    fine:
      "ApuestaLoHoy puede recibir una comisión de afiliado cuando visitas una casa de apuestas y te registras a través de nuestros enlaces, sin coste adicional para ti. Esto no afecta a nuestras valoraciones. Nuestras listas salen del registro oficial de cada regulador.",
    rights: "© 2026 ApuestaLoHoy. Todos los derechos reservados.",
    langLabel: "Idioma",
  },

  directory: {
    title: "Apuestas deportivas",
    metaTitle: "Casas de apuestas con licencia en España, Colombia y Perú",
    metaDescription:
      "Todas las casas de apuestas que listamos figuran en el registro oficial de licencias de su país. Busca por nombre, web o país.",
    lede: "Operadores reales y con licencia. Cada reseña dice qué hemos comprobado y qué no.",
  },

  casinosPage: {
    title: "Casinos online",
    metaTitle: "Casinos online con licencia en España y Perú",
    metaDescription: "Operadores con licencia de casino en los registros oficiales de la DGOJ y de MINCETUR.",
    lede: "Estos operadores tienen licencia de casino además de la de apuestas deportivas en el registro oficial. Colombia no aparece porque su registro no indica qué tipo de juego ofrece cada operador.",
  },

  bonusesPage: {
    title: "Bonos y promociones",
    metaTitle: "Bonos y promociones de casas de apuestas",
    metaDescription: "Cómo tratamos los bonos: solo mostramos ofertas que hemos confirmado en la web de la casa de apuestas.",
    lede: "No publicamos ninguna oferta que no hayamos confirmado en la web de la casa de apuestas. Ahora mismo no hay ninguna confirmada, así que cada casa de abajo te lleva a su propia web.",
    notice:
      "Las normas sobre bonos de bienvenida y publicidad cambian de un país a otro. Lee siempre las condiciones y los requisitos de apuesta del operador. +18.",
    kicker: "Promociones",
    featured: "Casas de apuestas destacadas",
  },

  reviewsPage: {
    title: "Reseñas de casas de apuestas",
    metaTitle: "Reseñas de casas de apuestas",
    metaDescription: "Reseñas de casas de apuestas que figuran en el registro oficial de licencias de España, Colombia y Perú.",
    lede: "Una página por casa de apuestas y país. Cada una muestra los datos de licencia que hemos comprobado y marca todo lo demás como pendiente de revisar.",
  },

  comparePage: {
    title: "Comparar casas de apuestas",
    metaTitle: "Comparar casas de apuestas con licencia",
    metaDescription: "Tabla para comparar casas de apuestas con licencia: país, empresa operadora, web y tipo de licencia.",
    lede: "Los datos que hemos comprobado en los registros oficiales, uno al lado del otro. No comparamos cuotas ni bonos porque no los hemos confirmado.",
    cols: { brand: "Casa de apuestas", country: "País", company: "Empresa operadora", site: "Web", licence: "Licencia", casino: "Casino" },
    yes: "Sí",
    no: "No",
  },

  guidesPage: {
    title: "Guías de apuestas",
    metaTitle: "Guías de apuestas",
    metaDescription: "Guías claras sobre cuotas, tipos de apuesta, cómo comprobar una licencia y cómo apostar con responsabilidad.",
    lede: "Guías breves y prácticas. Actualizadas el 21 de octubre de 2026.",
    updated: "Actualizada",
    disclaimer: "Esta guía es solo informativa y no garantiza ningún resultado. +18. Juega con responsabilidad.",
    inThisPage: "En esta página",
  },

  newsPage: {
    heading: "Últimas noticias de apuestas y licencias",
    all: "Todas",
    showMore: "Mostrar {n} noticias más",
    sourceLabel: "Fuente",
    allStories: "Todas las noticias",
    read: "Leer la noticia",
    title: "Noticias",
    metaTitle: "Noticias de apuestas y novedades de licencias",
    metaDescription: "Novedades de licencias y regulación en los mercados de apuestas de habla hispana, cada una con sus fuentes.",
    lede: "Noticias de regulación y licencias de los mercados que cubrimos. Cada noticia indica de dónde sale la información.",
    sources: "Fuentes",
    by: "Por la redacción de ApuestaLoHoy",
  },

  rgPage: {
    title: "Juego responsable",
    metaTitle: "Juego responsable",
    metaDescription: "Señales de alerta, límites y dónde pedir ayuda si apostar deja de ser un juego.",
    lede: "Apostar debe ser entretenimiento con un coste que aceptas de antemano. No es una forma de ganar dinero.",
    h1: "Que siga siendo divertido",
    p1: "Apuesta solo lo que puedas permitirte perder. Decide tu presupuesto y tu límite de tiempo antes de empezar, y respétalos.",
    h2: "Señales de alerta",
    signs: [
      "Apuestas más dinero, o durante más tiempo, de lo que habías previsto.",
      "Intentas recuperar lo perdido apostando más.",
      "Pides dinero prestado para apostar o escondes cuánto apuestas.",
      "Te irritas o te agobias cuando no puedes apostar.",
    ],
    h3: "Herramientas que ayudan",
    tools: [
      "Límites de depósito y avisos de tiempo, que ofrecen los operadores con licencia.",
      "Autoexclusión, que bloquea tu cuenta durante un tiempo determinado.",
      "Pausas de enfriamiento si necesitas parar un momento.",
    ],
    h4: "Dónde pedir ayuda",
    help: "Los servicios de ayuda dependen del país donde vives. Empieza por la web de tu regulador:",
    regulators: [
      { label: "España: DGOJ", url: "https://www.ordenacionjuego.es" },
      { label: "Colombia: Coljuegos", url: "https://www.coljuegos.gov.co" },
      { label: "Perú: MINCETUR", url: "https://www.gob.pe/mincetur" },
    ],
    adults: "Este sitio es solo para mayores de edad (+18).",
  },

  countriesPage: {
    title: "Apuestas por país",
    metaTitle: "Apuestas por país: situación legal y licencias",
    metaDescription: "Cómo están las apuestas en línea en cada país de habla hispana y de dónde salen nuestras listas.",
    lede: "España, Colombia y Perú tienen listas que podemos contrastar con un registro oficial. El resto de países está en espera hasta que podamos hacer lo mismo.",
    tiers: { PRIORITY: "Prioridad", GROWTH: "Crecimiento", WATCHING: "En observación" },
    notListed: (country: string) => `Todavía no listamos casas de apuestas de ${country}.`,
    notListedText:
      "Solo publicamos una casa de apuestas cuando figura en el registro oficial del país o podemos confirmar su licencia de otra forma. Volvemos a revisar este mercado con regularidad.",
    sources: "Fuentes que hemos usado",
    allLaws: "Ver la situación legal de todos los mercados →",
    metaTitle2: (country: string) => `Apuestas en ${country}: situación legal`,
    metaDescription2: (country: string) => `Cómo están las apuestas en línea en ${country} y por qué todavía no listamos casas de apuestas allí.`,
    homeMetaTitle: (country: string) => `Casas de apuestas en ${country}, comparadas`,
    homeMetaDescription: (country: string) =>
      `Compara casas de apuestas en ${country}: reseñas, guías y una marca clara que indica qué casas hemos comprobado en fuentes oficiales y cuáles no.`,
  },

  listed: {
    badge: "Sin verificar",
    title: (country: string) => `Marcas listadas para ${country}`,
    text: "Estas marcas figuran en nuestra lista de este mercado, que incluye operadores de mercado gris. No las hemos comprobado en el registro de ningún regulador, así que no podemos decir que tengan licencia ni que acepten clientes aquí. Consulta la ley de tu país y las condiciones del operador antes de registrarte.",
    reviewTitle: (name: string, country: string) => `${name} en ${country}: listada, sin verificar`,
    reviewText: (name: string, country: string) =>
      `${name} figura en nuestra lista de ${country}. No hemos verificado licencia, empresa operadora ni web para este mercado, y no hemos revisado sus cuotas, bonos ni pagos. Trata todo lo que se dice de ella como no comprobado.`,
    back: (country: string) => `Volver a ${country}`,
  },

  lawsPage: {
    title: "Leyes de apuestas",
    metaTitle: "Leyes de apuestas por país",
    metaDescription: "Resumen de la situación legal de las apuestas en línea en cada mercado, con las fuentes que hemos usado.",
    lede: "Es un resumen informativo, no asesoramiento legal. Se basa en fuentes que leímos el 21 de octubre de 2026, y las normas cambian a menudo.",
    noSources: "Todavía no hemos encontrado fuentes fiables sobre este país.",
  },

  aboutPage: {
    title: "Sobre nosotros",
    metaTitle: "Sobre ApuestaLoHoy",
    metaDescription: "Quiénes somos, cómo comprobamos las casas de apuestas y cómo ganamos dinero.",
    sections: [
      {
        h: "Quiénes somos",
        p: [
          "ApuestaLoHoy ayuda a los hispanohablantes a encontrar casas de apuestas con licencia. Partimos del registro oficial de cada país y solo listamos los operadores que encontramos en él.",
          "Este sitio es solo para mayores de edad (+18).",
        ],
      },
      {
        h: "Cómo comprobamos una casa de apuestas",
        p: [
          "Primero comprobamos el país. Cada país tiene un estado, desde «en estudio» hasta «aprobado para promoción». Solo los países aprobados muestran una lista.",
          "Después comprobamos el operador. Debe figurar en el registro público del regulador, y guardamos la fuente y la fecha en que lo miramos. Una comprobación de más de 90 días deja de mostrarse.",
          "Por último comprobamos el enlace. Un botón solo aparece si lleva a la web registrada del operador o a una dirección de afiliado aprobada.",
        ],
      },
      {
        h: "Lo que no hacemos",
        p: ["No inventamos puntuaciones, opiniones, bonos ni logotipos. Si no podemos demostrar algo, lo dejamos fuera o lo marcamos como pendiente de revisar."],
      },
      {
        h: "Cómo ganamos dinero",
        p: [
          "Podemos recibir una comisión cuando visitas una casa de apuestas y te registras a través de nuestros enlaces, sin coste adicional para ti. Ahora mismo nuestros botones llevan directamente a las webs de las casas de apuestas. Esto no cambia qué casas listamos ni cómo las describimos.",
        ],
      },
      {
        h: "De dónde salen nuestras listas",
        p: ["España: el registro público de la DGOJ. Colombia: el listado de operadores en línea de Coljuegos. Perú: el registro de titulares de autorización de MINCETUR."],
      },
    ],
  },

  privacyPage: {
    title: "Privacidad y cookies",
    metaTitle: "Privacidad y cookies",
    metaDescription: "Qué datos recoge este sitio (ahora mismo ninguno) y cómo usamos las cookies.",
    sections: [
      { h: "Tus datos", p: ["Este sitio no tiene cuentas ni formularios y no usa analítica, así que no recogemos datos personales tuyos. Nuestro proveedor de alojamiento puede registrar datos técnicos básicos, como la dirección IP, por seguridad."] },
      { h: "Cookies", p: ["No usamos cookies de analítica ni de publicidad. Solo usamos el almacenamiento que el sitio necesita para funcionar."] },
      { h: "Si esto cambia", p: ["Si añadimos analítica, seguimiento de clics o formularios, actualizaremos esta página antes y te pediremos consentimiento cuando la ley lo exija."] },
    ],
    updated: "Última actualización: 21 de octubre de 2026. Un especialista legal debe revisar este texto antes del lanzamiento comercial.",
  },

  review: {
    crumbBookmakers: "Casas de apuestas",
    statusLabel: "Estado de la reseña:",
    statusText: (name: string, reg: string) =>
      `marca real (${name}), licencia confirmada en el registro oficial de ${reg}. El resto de esta página (mercados, bono, valoraciones, pros y contras) aún no se ha comprobado de forma independiente, así que considéralo pendiente hasta que la reseña esté completa.`,
    lastChecked: (date: string) => `Última comprobación: ${date}.`,
    source: "Fuente:",
    operator: "Empresa operadora",
    domain: "Web oficial",
    country: "País",
    overview: "Resumen",
    overviewText: (name: string, reg: string, country: string, entity: string, licence: string, domain: string) =>
      `${name} figura en el registro de ${reg} como operador con licencia en ${country}, a través de ${entity}. Licencia: ${licence}. Web autorizada: ${domain}.`,
    overviewPending:
      "El resto de esta página (mercados, bono, métodos de pago) no se ha comprobado directamente y debe considerarse pendiente.",
    markets: "Mercados",
    sports: "Apuestas deportivas",
    sportsText: "Licencia confirmada en el registro.",
    casinoYes: "También con licencia de casino.",
    casinoNo: "No consta licencia de casino en el registro que hemos consultado.",
    live: "Apuestas en directo",
    streaming: "Streaming",
    payments: "Métodos de pago",
    paymentsCard: "Depósitos y retiradas",
    licences: "Licencias",
    officialRegister: "Registro oficial",
    company: "Empresa",
    countriesCovered: (country: string, date: string) => `Países cubiertos: ${country}. Comprobado el ${date}.`,
    pros: "Pros",
    cons: "Contras",
    prosItem: (reg: string, country: string) => `Autorizada por ${reg} para operar en ${country}`,
    rg: "Juego responsable",
    rgItems: [
      "Comprueba los límites de depósito y la autoexclusión que ofrece el operador.",
      "Todavía no hemos confirmado cómo los aplica esta casa de apuestas.",
    ],
    history: "Historia",
    historyText: (reg: string, licence: string) => `Autorizada según el registro de ${reg} (${licence}).`,
    screenshots: "Capturas",
    screenshotsText: "Todavía no tenemos capturas con licencia de esta casa de apuestas.",
    bonus: "Bono",
    similarKicker: "Alternativas",
    similarTitle: "Casas de apuestas similares",
    metaTitle: (name: string, country: string) => `${name} en ${country}: reseña y comprobación de licencia`,
    metaDescription: (name: string, reg: string, country: string) =>
      `${name} figura en el registro de ${reg} como operador con licencia en ${country}. Empresa, web y licencia comprobadas.`,
  },

  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o se ha movido.",
    home: "Volver al inicio",
  },

  products: { sports: "Apuestas deportivas", casino: "Casino" },
};
