"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getDict } from "@/i18n/dict";
import { LANGS, localHref, switchLangPath, type Lang } from "@/i18n/config";

export type NavLink = { readonly href: string; readonly label: string };

const LANG_NAMES: Record<Lang, string> = { en: "English", es: "Español" };

export function HeaderNav({ lang, links, markets }: { lang: Lang; links: readonly NavLink[]; markets: readonly NavLink[] }) {
  const t = getDict(lang).nav;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<"country" | "lang" | null>(null);
  const toggle = (m: "country" | "lang") => setMenu((cur) => (cur === m ? null : m));
  const close = () => { setOpen(false); setMenu(null); };

  return (
    <>
      <button type="button" className="burger" aria-expanded={open} aria-controls="main-nav" aria-label={t.openMenu} onClick={() => setOpen((v) => !v)}>☰</button>
      <nav id="main-nav" className="nav" aria-label={t.main} data-open={open}>
        {links.map((l) => (
          <Link key={l.href} className={l.href === localHref(lang, "responsible") ? "btn btn--gold btn--sm nav__rg" : "nav__link"} href={l.href} onClick={close}>{l.label}</Link>
        ))}
        <div className="nav__tools">
          <div className="nav__item" data-open={menu === "country"}>
            <button type="button" className="pill-btn" aria-expanded={menu === "country"} onClick={() => toggle("country")}>
              <span aria-hidden="true">🌐</span> {t.country}
            </button>
            <div className="nav__panel nav__panel--wide nav__panel--right">
              {markets.map((m) => <Link key={m.href} href={m.href} onClick={close}>{m.label}</Link>)}
            </div>
          </div>
          <div className="nav__item" data-open={menu === "lang"}>
            <button type="button" className="pill-btn" aria-expanded={menu === "lang"} aria-label={`${lang.toUpperCase()} · ${t.language}`} onClick={() => toggle("lang")}>
              {lang.toUpperCase()}
            </button>
            <div className="nav__panel nav__panel--right">
              {LANGS.map((l) => (
                <Link key={l} href={switchLangPath(pathname, l)} lang={l} hrefLang={l} aria-current={l === lang ? "true" : undefined} onClick={close}>
                  {LANG_NAMES[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
