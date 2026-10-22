import Link from "next/link";
import type { Article } from "@/content/news";
import { formatDate, getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";

export const COVER: Record<Article["variant"], { bg: string; icon: React.ReactNode }> = {
  shield: { bg: "var(--gold)", icon: <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Zm-1.5 12.5-3-3 1.4-1.4 1.6 1.6 4.1-4.1 1.4 1.4-5.5 5.5Z" fill="currentColor" /> },
  chip: { bg: "var(--green)", icon: <path d="M9 2v3H7a2 2 0 0 0-2 2v2H2v2h3v2H2v2h3v2a2 2 0 0 0 2 2h2v3h2v-3h2v3h2v-3h2a2 2 0 0 0 2-2v-2h3v-2h-3v-2h3V9h-3V7a2 2 0 0 0-2-2h-2V2h-2v3h-2V2H9Zm-2 5h10v10H7V7Zm3 3v4h4v-4h-4Z" fill="currentColor" /> },
  pin: { bg: "#7fb7ff", icon: <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor" /> },
};

export function NewsCard({ a, lang }: { a: Article; lang: Lang }) {
  const cover = COVER[a.variant];
  return (
    <Link className="news-card" href={`${localHref(lang, "news")}#${a.slug}`}>
      <div className="news-cover" aria-hidden="true">
        <div className="news-cover__block" style={{ background: cover.bg }}>
          <svg width="34" height="34" viewBox="0 0 24 24">{cover.icon}</svg>
        </div>
        <span className="badge badge--ghost news-cover__tag">{a.category[lang]}</span>
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span className="badge badge--line">{a.category[lang]}</span>
          <time dateTime={a.date}>{formatDate(lang, a.date)}</time>
        </div>
        <h3>{a.title[lang]}</h3>
        <p>{a.summary[lang]}</p>
        <small>{getDict(lang).newsPage.by}</small>
      </div>
    </Link>
  );
}
