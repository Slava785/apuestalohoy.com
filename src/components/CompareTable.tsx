"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";
import type { BrandCardData } from "@/lib/brand-card";

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function CompareTable({ lang, rows }: { lang: Lang; rows: readonly BrandCardData[] }) {
  const d = getDict(lang);
  const t = d.comparePage;
  const [query, setQuery] = useState("");
  const id = useId();
  const shown = useMemo(() => {
    const q = normalize(query.trim());
    return q ? rows.filter((r) => normalize(`${r.name} ${r.entity} ${r.domain} ${r.countryName}`).includes(q)) : rows;
  }, [rows, query]);

  return (
    <>
      <div className="filter">
        <div>
          <label htmlFor={id}>{d.filter.search}</label>
          <input id={id} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={d.filter.placeholder} autoComplete="off" />
        </div>
      </div>
      <p className="muted" role="status">{d.filter.count(shown.length, rows.length)}</p>
      <div className="table-wrap">
        <table className="compare">
          <caption className="sr-only">{t.title}</caption>
          <thead>
            <tr>
              <th scope="col">{t.cols.brand}</th><th scope="col">{t.cols.country}</th><th scope="col">{t.cols.company}</th>
              <th scope="col">{t.cols.site}</th><th scope="col">{t.cols.licence}</th><th scope="col">{t.cols.casino}</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.slug}>
                <th scope="row"><Link href={localHref(lang, "bookmakers", r.slug)}>{r.name}</Link></th>
                <td>{r.flag} {r.countryName}</td>
                <td>{r.entity}</td>
                <td>{r.domain}</td>
                <td>{r.licence}</td>
                <td>{r.products.includes("casino") ? t.yes : t.no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
