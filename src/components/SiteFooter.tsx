import Image from "next/image";
import Link from "next/link";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang, type RouteKey } from "@/i18n/config";

export function SiteFooter({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const n = d.nav;
  const r = (key: RouteKey, label: string, child?: string): [string, string] => [localHref(lang, key, child), label];
  const columns: { title: string; links: [string, string][] }[] = [
    { title: d.footer.explore, links: [r("reviews", n.reviews), r("sportsBetting", n.sportsBetting), r("casinos", n.casinos), r("bonuses", n.bonuses), r("compare", n.compare)] },
    { title: d.footer.learn, links: [r("guides", n.guides), r("news", n.news), r("laws", d.lawsPage.title)] },
    { title: d.footer.markets, links: [r("countries", d.footer.allCountries), [localHref(lang, "home"), lang === "es" ? "España" : "Spain"], r("countries", lang === "es" ? "Colombia" : "Colombia", "co"), r("countries", lang === "es" ? "Perú" : "Peru", "pe")] },
    { title: d.footer.company, links: [r("about", d.aboutPage.title), r("responsible", n.responsible), r("privacy", d.privacyPage.title)] },
  ];
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Image src="/logo.png" alt="ApuestaLoHoy.com" width={140} height={51} />
          <p>{d.footer.tagline}</p>
          <p className="footer__age">{d.footer.age}</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>{c.links.map(([href, label]) => <li key={`${href}-${label}`}><Link href={href}>{label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="wrap footer__fine">
        <p>{d.footer.fine}</p>
        <p className="footer__sister">
          {d.footer.sister}:{" "}
          <a href="https://apostarhoje.net/" target="_blank" rel="noopener">ApostarHoje.net</a>
        </p>
        <p>{d.footer.rights}</p>
      </div>
    </footer>
  );
}
