/** English (UK). Plain wording, British spelling. `Dict` is the shape es.ts must match. */
export const en = {
  htmlLang: "en-GB",
  siteTitle: "Betting sites in Spanish-speaking countries, compared",
  siteDescription:
    "Compare betting sites for Spanish-speaking countries. Brands checked against official licence registers are marked as verified; the rest are listed as not verified. Reviews and plain guides.",
  skip: "Skip to content",
  homeLabel: "Home",

  nav: {
    sportsBetting: "Sports Betting",
    casinos: "Online Casinos",
    bonuses: "Bonuses",
    reviews: "Reviews",
    compare: "Compare",
    guides: "Guides",
    news: "News",
    responsible: "Responsible Gambling",
    country: "Country",
    language: "Language",
    openMenu: "Open menu",
    main: "Main",
  },

  sponsor: { meta: "18+ · Featured · T&Cs apply", featured: "Featured", close: "Close" },

  ads: {
    topPicksKicker: (country: string) => `Top picks · ${country}`,
    topPicksTitle: "Top picks",
    topPicksText: "Licensed bookmakers worth a look. Each one is on the official register, and the button takes you to its own site.",
    visit: "Visit site →",
    licensedBy: (reg: string) => `Licensed by ${reg}`,
    stripLabel: "Featured",
    stripAge: "Ad · 18+",
    partnersTitle: "Featured betting partners",
    partnersTag: "AD",
    advert: "Advertisement · 18+",
    headline: (name: string) => `Bet with ${name}`,
    cta: "Visit site →",
    sponsored: "Sponsored · T&Cs apply",
    tcs: "T&Cs apply · 18+",
  },

  common: {
    betNow: "Bet Now",
    readReview: "Read full review",
    verified: "Verified",
    seeAll: "See all →",
    viewPromotions: "View promotions",
    claim: "Visit site",
    promoHeadline: "Promotions for registered customers: check today's offers",
    promoDetail:
      "Registered customers may find cashback, free bets and better odds on the bookmaker's own promotions page. Offers change often, so read the current terms before you join.",
    wagering: "Wagering requirement: to be confirmed",
    licensedBy: (reg: string, country: string) => `Licensed by ${reg} to operate in ${country}.`,
    casino: "Casino",
    notReviewed: "Not reviewed yet.",
    position: (n: number) => `Position ${n}`,
    loading: "Loading…",
    age: "18+",
  },

  filter: {
    search: "Search bookmakers",
    placeholder: "Name or website",
    country: "Filter by country",
    all: "All",
    count: (shown: number, total: number) => `${shown} of ${total} bookmakers`,
    none: "No bookmakers match your search.",
    clear: "Clear filters",
  },

  home: {
    kicker: () => "Betting guide · Spanish-speaking countries",
    title: () => "Betting sites across the Spanish-speaking world, compared and checked",
    lede: () =>
      "Compare bookmakers and casinos open to players in Spanish-speaking countries. Reviews, licence details, bonuses and guides sit side by side, and every claim links to its source.",
    statListed: "bookmakers listed",
    statCasino: "also licensed for casino games",
    chips: ["Sources always shown", "No made-up bonuses", "Licences rechecked every 90 days"],
    ctaSports: "Sports betting",
    ctaCasinos: "Casinos",
    ctaBonuses: "Bonuses",
    otherMarkets: "Other markets",
    seeAllMarkets: "See all →",
    offersKicker: "Offers · October 2026",
    offersTitle: "Welcome offers",
    offersText:
      "We only show a specific offer once we have confirmed it on the bookmaker's own site. Until then, the button takes you to their site.",
    rowsKicker: "Bookmakers",
    rowsTitle: "Bookmakers we cover",
    rowsText: "Real, licensed operators. Each review says exactly what we have and haven't checked.",
    casinosKicker: "Casinos",
    casinosTitle: "Online casinos we cover",
    casinosText: "Bookmakers that also hold a casino licence on the official register.",
    verifiedKicker: "Checked",
    verifiedTitle: "Verified operators",
    verifiedLink: "See reviews →",
    moreKicker: "Markets",
    moreTitle: "More countries",
    moreLink: "See countries →",
    guidesKicker: "Learn",
    guidesTitle: "Latest guides",
    newsKicker: "Newsroom",
    newsTitle: "Latest news",
  },

  rg: {
    kicker: "Play responsibly",
    title: "Betting should be entertainment, never a way to make money.",
    text: "See the limit tools, self-exclusion options and support organisations available in your country.",
    button: "Learn more",
  },

  footer: {
    tagline: "Betting guides for Spanish speakers, country by country.",
    age: "18+. Please gamble responsibly.",
    explore: "Explore",
    learn: "Learn",
    markets: "Markets",
    company: "Company",
    allCountries: "All countries",
    sister: "Sister company",
    fine:
      "ApuestaLoHoy may earn an affiliate commission when you visit and sign up with a bookmaker through our links, at no extra cost to you. This does not affect our editorial ratings. Our lists come from each regulator's official register.",
    rights: "© 2026 ApuestaLoHoy. All rights reserved.",
    langLabel: "Language",
  },

  directory: {
    title: "Sports betting",
    metaTitle: "Licensed bookmakers in Spain, Colombia and Peru",
    metaDescription:
      "Every bookmaker we list is on the official licence register of its country. Search by name, website or country.",
    lede: "Real, licensed operators. Each review shows exactly what we have and haven't checked.",
  },

  casinosPage: {
    title: "Online casinos",
    metaTitle: "Licensed online casinos in Spain and Peru",
    metaDescription: "Operators with a casino licence on the official DGOJ and MINCETUR registers.",
    lede: "These operators hold a casino licence as well as a sports betting licence on the official register. Colombia is missing because its register does not say which type of game each operator offers.",
  },

  bonusesPage: {
    title: "Bonuses and promotions",
    metaTitle: "Bookmaker bonuses and promotions",
    metaDescription: "How we handle bonuses: we only show offers we have confirmed on the bookmaker's own site.",
    lede: "We don't publish any offer we haven't confirmed on the bookmaker's own site. None are confirmed at the moment, so each bookmaker below takes you to its own site.",
    notice:
      "Rules on welcome bonuses and advertising differ from country to country. Always read the bookmaker's terms and wagering requirements. 18+.",
    kicker: "Promotions",
    featured: "Featured bookmakers",
  },

  reviewsPage: {
    title: "Bookmaker reviews",
    metaTitle: "Bookmaker reviews",
    metaDescription: "Reviews of bookmakers that are on the official licence register in Spain, Colombia and Peru.",
    lede: "One page per bookmaker and country. Each shows the licence details we have checked and marks everything else as not reviewed yet.",
  },

  comparePage: {
    title: "Compare bookmakers",
    metaTitle: "Compare licensed bookmakers",
    metaDescription: "Side-by-side table of licensed bookmakers: country, operating company, website and licence type.",
    lede: "A side-by-side look at the facts we have checked on the official registers. We don't compare odds or bonuses because we haven't confirmed them.",
    cols: { brand: "Bookmaker", country: "Country", company: "Operating company", site: "Website", licence: "Licence", casino: "Casino" },
    yes: "Yes",
    no: "No",
  },

  guidesPage: {
    title: "Betting guides",
    metaTitle: "Betting guides",
    metaDescription: "Plain guides to odds, bet types, checking a licence and betting responsibly.",
    lede: "Short, practical guides. Updated 21 October 2026.",
    updated: "Updated",
    disclaimer: "This guide is for information only and cannot promise any result. 18+. Please gamble responsibly.",
    inThisPage: "On this page",
  },

  newsPage: {
    heading: "Latest Betting and Licence News",
    all: "All",
    showMore: "Show {n} more articles",
    sourceLabel: "Source",
    allStories: "All stories",
    read: "Read the story",
    title: "News",
    metaTitle: "Betting news and licence updates",
    metaDescription: "Licence and regulation updates from the Spanish-speaking betting markets, each with its sources.",
    lede: "Regulation and licence news from the markets we cover. Every story lists where the information came from.",
    sources: "Sources",
    by: "By the ApuestaLoHoy newsroom",
  },

  rgPage: {
    title: "Responsible gambling",
    metaTitle: "Responsible gambling",
    metaDescription: "Warning signs, limits and where to get help if betting stops being fun.",
    lede: "Betting should be entertainment with a cost you accept in advance. It is not a way to make money.",
    h1: "Keep it fun",
    p1: "Only bet what you can afford to lose. Decide your budget and your time limit before you start, and stick to them.",
    h2: "Warning signs",
    signs: [
      "You bet more money, or for longer, than you planned.",
      "You try to win back losses by betting more.",
      "You borrow money to bet, or hide how much you bet.",
      "You feel irritable or anxious when you can't bet.",
    ],
    h3: "Tools that help",
    tools: [
      "Deposit limits and session reminders, which licensed operators offer.",
      "Self-exclusion, which blocks your account for a set time.",
      "Cool-off breaks if you need a short pause.",
    ],
    h4: "Getting help",
    help: "Support services depend on the country you live in. Start with your regulator's website:",
    regulators: [
      { label: "Spain: DGOJ", url: "https://www.ordenacionjuego.es" },
      { label: "Colombia: Coljuegos", url: "https://www.coljuegos.gov.co" },
      { label: "Peru: MINCETUR", url: "https://www.gob.pe/mincetur" },
    ],
    adults: "This site is for adults only (18+).",
  },

  countriesPage: {
    title: "Betting by country",
    metaTitle: "Betting by country: legal status and licensed bookmakers",
    metaDescription: "Where online betting stands in each Spanish-speaking country and where our lists come from.",
    lede: "Spain, Colombia and Peru have lists we can check against an official register. The other countries are on hold until we can do the same.",
    tiers: { PRIORITY: "Priority", GROWTH: "Growth", WATCHING: "Watching" },
    notListed: (country: string) => `We don't list any bookmakers for ${country} yet.`,
    notListedText:
      "We only publish a bookmaker once it appears on the country's official register, or we can otherwise confirm its licence. We look at this market again regularly.",
    sources: "Sources we used",
    allLaws: "See the legal position in every market →",
    metaTitle2: (country: string) => `Betting in ${country}: legal position`,
    metaDescription2: (country: string) => `Where online betting stands in ${country} and why we don't list bookmakers there yet.`,
    homeMetaTitle: (country: string) => `Betting sites in ${country}, compared`,
    homeMetaDescription: (country: string) =>
      `Compare betting sites in ${country}: reviews, guides, and a clear mark showing which brands we have checked against official sources and which we haven't.`,
  },

  listed: {
    badge: "Not verified",
    title: (country: string) => `Brands listed for ${country}`,
    text: "These brands are on our list for this market, which includes grey-market operators. We haven't checked them against a regulator's register, so we can't say they are licensed or that they accept customers here. Check the law where you live and the operator's own terms before you join.",
    reviewTitle: (name: string, country: string) => `${name} in ${country}: listed, not verified`,
    reviewText: (name: string, country: string) =>
      `${name} is on our list for ${country}. We haven't verified a licence, an operating company or a website for this market, and we haven't reviewed its odds, bonuses or payments. Treat everything about it as unchecked.`,
    back: (country: string) => `Back to ${country}`,
  },

  lawsPage: {
    title: "Betting laws",
    metaTitle: "Betting laws by country",
    metaDescription: "A short summary of the legal position on online betting in each market, with the sources we used.",
    lede: "This is a summary for information only, not legal advice. It's based on sources we read on 21 October 2026, and the rules change often.",
    noSources: "We haven't found reliable sources for this country yet.",
  },

  aboutPage: {
    title: "About us",
    metaTitle: "About ApuestaLoHoy",
    metaDescription: "Who we are, how we check bookmakers and how we earn money.",
    sections: [
      {
        h: "Who we are",
        p: [
          "ApuestaLoHoy helps Spanish speakers find licensed bookmakers. We start from the official register in each country and only list operators we can find there.",
          "This site is for adults only (18+).",
        ],
      },
      {
        h: "How we check a bookmaker",
        p: [
          "First we check the country. Every country has a status, from still being researched through to approved for promotion. Only approved countries show a list.",
          "Then we check the operator. It must appear on the regulator's public register, and we keep the source and the date we looked. A check older than 90 days stops being shown.",
          "Finally we check the link. A button only appears if it goes to the operator's own registered website or an approved affiliate address.",
        ],
      },
      {
        h: "What we don't do",
        p: ["We don't invent ratings, reviews, bonuses or logos. If we can't prove something, we leave it out or mark it as not reviewed yet."],
      },
      {
        h: "How we earn money",
        p: [
          "We may earn a commission when you visit and sign up with a bookmaker through our links, at no extra cost to you. At the moment, our buttons go straight to the bookmakers' own websites. This does not change which bookmakers we list or how we describe them.",
        ],
      },
      {
        h: "Where our lists come from",
        p: ["Spain: the DGOJ public register. Colombia: Coljuegos' list of online operators. Peru: MINCETUR's register of authorisation holders."],
      },
    ],
  },

  privacyPage: {
    title: "Privacy and cookies",
    metaTitle: "Privacy and cookies",
    metaDescription: "What data this site collects (currently none) and how we use cookies.",
    sections: [
      { h: "Your data", p: ["This site has no accounts or forms and does not use analytics, so we don't collect personal data from you. Our hosting provider may log basic technical details, such as your IP address, for security."] },
      { h: "Cookies", p: ["We don't use analytics or advertising cookies. We only use storage that the site needs to work."] },
      { h: "If this changes", p: ["If we add analytics, click tracking or sign-up forms, we'll update this page first and ask for your consent where the law requires it."] },
    ],
    updated: "Last updated 21 October 2026. A legal specialist should review this text before commercial launch.",
  },

  review: {
    crumbBookmakers: "Bookmakers",
    statusLabel: "Review status:",
    statusText: (name: string, reg: string) =>
      `real brand (${name}), licence confirmed on the official ${reg} register. Everything else on this page (markets, bonus, ratings, pros and cons) has not been independently checked yet, so treat it as pending until the full review is done.`,
    lastChecked: (date: string) => `Last checked: ${date}.`,
    source: "Source:",
    operator: "Operating company",
    domain: "Official website",
    country: "Country",
    overview: "Overview",
    overviewText: (name: string, reg: string, country: string, entity: string, licence: string, domain: string) =>
      `${name} appears on the ${reg} register as a licensed operator in ${country}, run by ${entity}. Licence: ${licence}. Licensed website: ${domain}.`,
    overviewPending:
      "The rest of this page (markets, bonus, payment methods) hasn't been checked directly and should be treated as pending.",
    markets: "Markets",
    sports: "Sports betting",
    sportsText: "Licence confirmed on the register.",
    casinoYes: "Also licensed for casino games.",
    casinoNo: "No casino licence shown on the register we checked.",
    live: "Live betting",
    streaming: "Streaming",
    payments: "Payment methods",
    paymentsCard: "Deposits and withdrawals",
    licences: "Licences",
    officialRegister: "Official register",
    company: "Company",
    countriesCovered: (country: string, date: string) => `Countries covered: ${country}. Checked on ${date}.`,
    pros: "Pros",
    cons: "Cons",
    prosItem: (reg: string, country: string) => `Licensed by ${reg} to operate in ${country}`,
    rg: "Responsible gambling",
    rgItems: [
      "Check the deposit limits and self-exclusion tools the operator offers.",
      "We haven't confirmed how this bookmaker applies them yet.",
    ],
    history: "History",
    historyText: (reg: string, licence: string) => `Licensed according to the ${reg} register (${licence}).`,
    screenshots: "Screenshots",
    screenshotsText: "We haven't sourced licensed screenshots for this bookmaker yet.",
    bonus: "Bonus",
    similarKicker: "Alternatives",
    similarTitle: "Similar bookmakers",
    metaTitle: (name: string, country: string) => `${name} in ${country}: review and licence check`,
    metaDescription: (name: string, reg: string, country: string) =>
      `${name} appears on the ${reg} register as a licensed operator in ${country}. Company, website and licence checked.`,
  },

  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    home: "Back to the home page",
  },

  products: { sports: "Sports betting", casino: "Casino" },
};

export type Dict = typeof en;
