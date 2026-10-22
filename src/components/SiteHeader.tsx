import Image from "next/image";
import Link from "next/link";
import { HeaderNav, type NavLink } from "@/components/HeaderNav";
import { MARKET_INFO } from "@/data/market-info";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";
import { listMarkets } from "@/lib/markets";

export function SiteHeader({ lang }: { lang: Lang }) {
  const t = getDict(lang).nav;
  const links: readonly NavLink[] = [
    { href: localHref(lang, "sportsBetting"), label: t.sportsBetting },
    { href: localHref(lang, "casinos"), label: t.casinos },
    { href: localHref(lang, "bonuses"), label: t.bonuses },
    { href: localHref(lang, "reviews"), label: t.reviews },
    { href: localHref(lang, "compare"), label: t.compare },
    { href: localHref(lang, "guides"), label: t.guides },
    { href: localHref(lang, "news"), label: t.news },
    { href: localHref(lang, "responsible"), label: t.responsible },
  ];
  const markets: readonly NavLink[] = listMarkets().map((m) => ({
    href: m.slug === "es" ? localHref(lang, "home") : localHref(lang, "countries", m.slug),
    label: `${MARKET_INFO[m.code]?.flag ?? ""} ${m.name[lang]}`,
  }));
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link href={localHref(lang, "home")} className="logo-link" aria-label="ApuestaLoHoy">
          <Image src="/logo.png" alt="ApuestaLoHoy.com" width={168} height={61} priority />
        </Link>
        <HeaderNav lang={lang} links={links} markets={markets} />
      </div>
    </header>
  );
}
