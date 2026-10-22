"use client";

import { useId, useMemo, useState } from "react";
import { BrandRow, MiniCard } from "@/components/BrandCards";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";
import type { BrandCardData } from "@/lib/brand-card";

type Props = {
  readonly lang: Lang;
  readonly rows: readonly BrandCardData[];
  readonly countries: readonly { code: string; name: string; flag: string }[];
  readonly onlyCasino?: boolean;
  readonly variant?: "rows" | "grid";
};

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function BrandListFilter({ lang, rows, countries, onlyCasino = false, variant = "rows" }: Props) {
  const t = getDict(lang).filter;
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("ALL");
  const id = useId();

  const base = useMemo(() => (onlyCasino ? rows.filter((r) => r.products.includes("casino")) : rows), [rows, onlyCasino]);
  const shown = useMemo(() => {
    const q = normalize(query.trim());
    return base.filter(
      (r) => (country === "ALL" || r.countryCode === country) && (!q || normalize(`${r.name} ${r.domain} ${r.countryName}`).includes(q)),
    );
  }, [base, query, country]);

  return (
    <>
      <div className="filter">
        <div>
          <label htmlFor={id}>{t.search}</label>
          <input id={id} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.placeholder} autoComplete="off" />
        </div>
        {countries.length > 1 ? (
          <div role="group" aria-label={t.country} className="pills">
            <button type="button" className="pill" aria-pressed={country === "ALL"} onClick={() => setCountry("ALL")}>{t.all}</button>
            {countries.map((c) => (
              <button key={c.code} type="button" className="pill" aria-pressed={country === c.code} onClick={() => setCountry(c.code)}>
                {c.flag} {c.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <p className="muted" role="status">{t.count(shown.length, base.length)}</p>
      {shown.length === 0 ? (
        <div className="empty">
          <p>{t.none}</p>
          <button type="button" className="btn btn--outline btn--sm" style={{ marginTop: "1rem" }} onClick={() => { setQuery(""); setCountry("ALL"); }}>{t.clear}</button>
        </div>
      ) : variant === "grid" ? (
        <div className="grid-3" style={{ marginTop: "1.25rem" }}>{shown.map((b) => <MiniCard key={b.slug} b={b} lang={lang} />)}</div>
      ) : (
        <ul className="rows" style={{ marginTop: "1.25rem" }}>{shown.map((b) => <BrandRow key={b.slug} b={b} lang={lang} />)}</ul>
      )}
    </>
  );
}
