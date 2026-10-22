"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";

export type NewsItem = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly category: string;
  readonly date: string;
  readonly dateLabel: string;
  readonly variant: "shield" | "chip" | "pin";
  readonly source: string;
};

const BLOCK: Record<NewsItem["variant"], string> = { shield: "var(--gold)", chip: "var(--green)", pin: "#7fb7ff" };
const ICON: Record<NewsItem["variant"], React.ReactNode> = {
  shield: <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Zm-1.5 12.5-3-3 1.4-1.4 1.6 1.6 4.1-4.1 1.4 1.4-5.5 5.5Z" fill="currentColor" />,
  chip: <path d="M9 2v3H7a2 2 0 0 0-2 2v2H2v2h3v2H2v2h3v2a2 2 0 0 0 2 2h2v3h2v-3h2v3h2v-3h2a2 2 0 0 0 2-2v-2h3v-2h-3v-2h3V9h-3V7a2 2 0 0 0-2-2h-2V2h-2v3h-2V2H9Zm-2 5h10v10H7V7Zm3 3v4h4v-4h-4Z" fill="currentColor" />,
  pin: <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" />,
};

function Story({ a, href, lead }: { a: NewsItem; href: string; lead?: boolean }) {
  return (
    <Link className={lead ? "story story--lead" : "story"} href={href}>
      <span className="story__cover" aria-hidden="true">
        <span className="story__block" style={{ background: BLOCK[a.variant] }}>
          <svg width={lead ? 64 : 40} height={lead ? 64 : 40} viewBox="0 0 24 24">{ICON[a.variant]}</svg>
        </span>
        <span className="badge badge--ghost story__tag">{a.category}</span>
      </span>
      <time className="story__date" dateTime={a.date}>{a.dateLabel}</time>
      <h3>{a.title}</h3>
      {lead ? <p className="story__summary">{a.summary}</p> : null}
      <span className="story__by"><b>{a.source}</b></span>
    </Link>
  );
}

/** Lead story beside a 2x2 grid, category tabs and a "show more" button, as on casino.org/news. */
export function NewsGrid({ lang, items, basePath }: { lang: Lang; items: readonly NewsItem[]; basePath: string }) {
  const t = getDict(lang).newsPage;
  const [tab, setTab] = useState("ALL");
  const [expanded, setExpanded] = useState(false);
  const categories = useMemo(() => [...new Set(items.map((i) => i.category))], [items]);
  const shown = useMemo(() => (tab === "ALL" ? items : items.filter((i) => i.category === tab)), [items, tab]);
  const [lead, ...rest] = shown;
  const top = rest.slice(0, 4);
  const more = rest.slice(4);

  return (
    <>
      <div className="tabs" role="tablist" aria-label={t.title}>
        <button type="button" role="tab" aria-selected={tab === "ALL"} onClick={() => { setTab("ALL"); setExpanded(false); }}>{t.all}</button>
        {categories.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={tab === c} onClick={() => { setTab(c); setExpanded(false); }}>{c}</button>
        ))}
      </div>
      {lead ? (
        <div className="news-top">
          <Story a={lead} href={`${basePath}#${lead.slug}`} lead />
          <div className="news-top__grid">{top.map((a) => <Story key={a.slug} a={a} href={`${basePath}#${a.slug}`} />)}</div>
        </div>
      ) : null}
      {more.length > 0 ? (
        <>
          {expanded ? <div className="news-more">{more.map((a) => <Story key={a.slug} a={a} href={`${basePath}#${a.slug}`} />)}</div> : null}
          {!expanded ? (
            <p className="news-showmore">
              <button type="button" className="btn btn--outline" onClick={() => setExpanded(true)}>{t.showMore.replace("{n}", String(more.length))}</button>
            </p>
          ) : null}
        </>
      ) : null}
    </>
  );
}
