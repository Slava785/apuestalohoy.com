import type { Lang } from "@/i18n/config";

export type GuideBlock =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly text: string }
  | { readonly type: "ul"; readonly items: readonly string[] };

type L<T> = Readonly<Record<Lang, T>>;

export type Guide = {
  readonly slug: string;
  readonly category: L<string>;
  readonly title: L<string>;
  readonly summary: L<string>;
  readonly updated: string; // ISO date
  readonly body: L<readonly GuideBlock[]>;
};

export const GUIDES: readonly Guide[] = [
  {
    slug: "how-to-read-odds",
    category: { en: "Odds", es: "Cuotas" },
    title: { en: "How to read betting odds", es: "Cómo leer las cuotas de una apuesta" },
    summary: {
      en: "What decimal odds mean, how to work out what you'd win and what chance they imply.",
      es: "Qué significa una cuota decimal, cómo calcular lo que cobrarías y qué probabilidad refleja.",
    },
    updated: "2026-10-21",
    body: {
      en: [
        { type: "p", text: "Odds tell you how much you get back for each unit you stake. Most bookmakers aimed at Spanish speakers show them as decimals, for example 2.50." },
        { type: "h2", text: "Working out what you'd win" },
        { type: "p", text: "Stake 10 at odds of 2.50 and win, and you get 25 back: your 10 plus 15 profit. If you lose, you lose the 10. The sums are: return = stake × odds, and profit = return − stake." },
        { type: "h2", text: "The chance hidden in the odds" },
        { type: "p", text: "Divide 1 by the odds to see the chance the bookmaker is giving that result. 1 ÷ 2.50 = 0.40, so 40%. Add up those chances for every outcome in a match and the total comes to more than 100%. The extra is the bookmaker's margin, and it's why betting isn't a reliable way to make money." },
        { type: "h2", text: "Accumulators" },
        { type: "p", text: "In an accumulator you multiply the odds of each selection: 1.80 × 2.10 × 1.50 = 5.67. Every selection has to win, so the real chance of being paid falls quickly with each one you add." },
        { type: "ul", items: ["Check the final odds before you confirm.", "Big odds mean an unlikely result, not a bargain.", "Decide how much you can afford to lose before you bet."] },
      ],
      es: [
        { type: "p", text: "La cuota te dice cuánto recibes por cada unidad que apuestas. La mayoría de las casas para hispanohablantes la muestran en formato decimal, por ejemplo 2,50." },
        { type: "h2", text: "Cómo calcular lo que cobrarías" },
        { type: "p", text: "Si apuestas 10 a cuota 2,50 y aciertas, recibes 25: tus 10 más 15 de beneficio. Si fallas, pierdes los 10. Las cuentas son: cobro = apuesta × cuota y beneficio = cobro − apuesta." },
        { type: "h2", text: "La probabilidad que esconde la cuota" },
        { type: "p", text: "Divide 1 entre la cuota para ver la probabilidad que la casa da a ese resultado. 1 ÷ 2,50 = 0,40, es decir, un 40 %. Si sumas esas probabilidades para todos los resultados de un partido, el total pasa del 100 %. Ese exceso es el margen de la casa y es la razón por la que apostar no es una forma fiable de ganar dinero." },
        { type: "h2", text: "Apuestas combinadas" },
        { type: "p", text: "En una combinada se multiplican las cuotas de cada selección: 1,80 × 2,10 × 1,50 = 5,67. Tienen que acertar todas, así que la probabilidad real de cobrar baja rápido con cada selección que añades." },
        { type: "ul", items: ["Mira la cuota final antes de confirmar.", "Una cuota alta indica un resultado poco probable, no una ganga.", "Decide cuánto puedes permitirte perder antes de apostar."] },
      ],
    },
  },
  {
    slug: "how-to-check-a-bookmaker-is-licensed",
    category: { en: "Licences", es: "Licencias" },
    title: { en: "How to check a bookmaker is licensed", es: "Cómo comprobar si una casa de apuestas tiene licencia" },
    summary: {
      en: "The steps for looking a bookmaker up on your country's official register before you sign up.",
      es: "Los pasos para buscar una casa de apuestas en el registro oficial de tu país antes de registrarte.",
    },
    updated: "2026-10-21",
    body: {
      en: [
        { type: "p", text: "A site can look professional and still not be licensed. Checking takes a couple of minutes and is done on your country's regulator's website." },
        { type: "h2", text: "The steps" },
        { type: "ul", items: [
          "Find your country's regulator. In Spain it's the DGOJ, in Colombia Coljuegos and in Peru MINCETUR.",
          "Open the official register from the regulator's own site, not from a link someone sent you.",
          "Search for the company or brand and compare the website address letter by letter with the bookmaker's. A similar address isn't the same one.",
          "Check that the licence covers sports betting.",
          "If it isn't listed, don't sign up or deposit.",
        ] },
        { type: "h2", text: "Official registers" },
        { type: "p", text: "Spain: ordenacionjuego.es, under licensed operators. Colombia: coljuegos.gov.co, under games operated over the internet. Peru: MINCETUR's register of authorisation holders. Each lists the companies and their websites." },
        { type: "p", text: "A licence means the operator meets the regulator's requirements. It doesn't mean betting is safe or that you'll win." },
      ],
      es: [
        { type: "p", text: "Una web puede parecer profesional y no tener licencia. Comprobarlo lleva un par de minutos y se hace en la web del regulador de tu país." },
        { type: "h2", text: "Los pasos" },
        { type: "ul", items: [
          "Identifica el regulador de tu país. En España es la DGOJ, en Colombia Coljuegos y en Perú MINCETUR.",
          "Abre el registro oficial desde la web del regulador, no desde un enlace que te hayan enviado.",
          "Busca la empresa o la marca y compara la dirección web letra por letra con la de la casa de apuestas. Una dirección parecida no es la misma.",
          "Comprueba que la licencia incluya apuestas deportivas.",
          "Si no aparece, no te registres ni ingreses dinero.",
        ] },
        { type: "h2", text: "Registros oficiales" },
        { type: "p", text: "España: ordenacionjuego.es, en operadores con licencia. Colombia: coljuegos.gov.co, en juegos operados por internet. Perú: el registro de titulares de autorización de MINCETUR. Todos incluyen las empresas y sus webs." },
        { type: "p", text: "Tener licencia significa que el operador cumple los requisitos del regulador. No significa que apostar sea seguro ni que vayas a ganar." },
      ],
    },
  },
  {
    slug: "betting-responsibly",
    category: { en: "Responsible gambling", es: "Juego responsable" },
    title: { en: "Betting responsibly: limits and warning signs", es: "Apostar con cabeza: límites y señales de alerta" },
    summary: {
      en: "How to set limits, which warning signs matter and when to ask for help.",
      es: "Cómo fijar límites, qué señales de alerta importan y cuándo pedir ayuda.",
    },
    updated: "2026-10-21",
    body: {
      en: [
        { type: "p", text: "Betting should be entertainment with a cost you accept in advance. It isn't a source of income, and it isn't a way to win back losses." },
        { type: "h2", text: "Set your limits first" },
        { type: "ul", items: ["A monthly budget you could lose without it hurting.", "A time limit for each session.", "Use the deposit limits and reminders that licensed operators offer."] },
        { type: "h2", text: "Warning signs" },
        { type: "ul", items: ["You bet more money, or for longer, than you meant to.", "You chase losses by betting more.", "You borrow money to bet, or hide your betting.", "You feel irritable or anxious when you can't bet."] },
        { type: "h2", text: "If you recognise any of these" },
        { type: "p", text: "Take a break, use the operator's self-exclusion tools and talk to someone you trust. Help services depend on your country, so start with your regulator's website. This site is for adults only (18+)." },
      ],
      es: [
        { type: "p", text: "Apostar debe ser entretenimiento con un coste que aceptas de antemano. No es una fuente de ingresos ni una forma de recuperar pérdidas." },
        { type: "h2", text: "Fija tus límites antes de empezar" },
        { type: "ul", items: ["Un presupuesto mensual que podrías perder sin que te afecte.", "Un límite de tiempo por sesión.", "Usa los límites de depósito y los recordatorios que ofrecen los operadores con licencia."] },
        { type: "h2", text: "Señales de alerta" },
        { type: "ul", items: ["Apuestas más dinero, o durante más tiempo, de lo que querías.", "Intentas recuperar lo perdido apostando más.", "Pides dinero prestado para apostar o escondes que apuestas.", "Te irritas o te agobias cuando no puedes apostar."] },
        { type: "h2", text: "Si reconoces alguna" },
        { type: "p", text: "Haz una pausa, usa las herramientas de autoexclusión del operador y habla con alguien de confianza. Los servicios de ayuda dependen de tu país, así que empieza por la web de tu regulador. Este sitio es solo para mayores de edad (+18)." },
      ],
    },
  },
  {
    slug: "single-accumulator-and-system-bets",
    category: { en: "Bet types", es: "Tipos de apuesta" },
    title: { en: "Single, accumulator and system bets: what's the difference?", es: "Apuesta simple, combinada y de sistema: en qué se diferencian" },
    summary: {
      en: "The three most common bet types, each with a worked example and how risky it is.",
      es: "Los tres formatos más habituales, con un ejemplo de cada uno y su nivel de riesgo.",
    },
    updated: "2026-10-21",
    body: {
      en: [
        { type: "p", text: "Most bookmakers offer three basic bet types. Knowing the difference helps you decide how much risk you're taking on each bet." },
        { type: "h2", text: "Single bet" },
        { type: "p", text: "You back one result. Stake 10 at odds of 1.90 and win, and you get 19 back. It's the simplest type and the least up and down." },
        { type: "h2", text: "Accumulator" },
        { type: "p", text: "Several selections in one bet, with their odds multiplied. Stake 10 at 1.50 × 2.00 × 1.80 and the total odds are 5.40, so you'd get 54 back, but one losing selection loses the lot." },
        { type: "h2", text: "System bet" },
        { type: "p", text: "A system splits your selections into several smaller accumulators, so you can still be paid if one or two lose. It costs more because each combination carries its own stake." },
        { type: "ul", items: ["More selections mean a bigger possible win but a much lower chance of being paid.", "Decide the total you can afford to lose before you confirm.", "No bet type removes the bookmaker's margin."] },
      ],
      es: [
        { type: "p", text: "Casi todas las casas de apuestas ofrecen tres tipos básicos de apuesta. Conocer la diferencia te ayuda a decidir cuánto riesgo asumes en cada una." },
        { type: "h2", text: "Apuesta simple" },
        { type: "p", text: "Apuestas a un solo resultado. Si apuestas 10 a cuota 1,90 y aciertas, recibes 19. Es el tipo más sencillo y el de menos altibajos." },
        { type: "h2", text: "Apuesta combinada" },
        { type: "p", text: "Varias selecciones en una sola apuesta, con sus cuotas multiplicadas. Con 10 a 1,50 × 2,00 × 1,80 la cuota total es 5,40 y cobrarías 54, pero si falla una selección lo pierdes todo." },
        { type: "h2", text: "Apuesta de sistema" },
        { type: "p", text: "Un sistema divide tus selecciones en varias combinadas más pequeñas, de modo que aún puedes cobrar si fallan una o dos. Cuesta más porque cada combinación lleva su propia apuesta." },
        { type: "ul", items: ["Más selecciones suponen un premio posible mayor, pero mucha menos probabilidad de cobrar.", "Decide el total que puedes permitirte perder antes de confirmar.", "Ningún tipo de apuesta elimina el margen de la casa."] },
      ],
    },
  },
];
