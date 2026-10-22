import Link from "next/link";
import type { Guide } from "@/content/guides";
import { localHref, type Lang } from "@/i18n/config";

export function GuideCard({ g, lang }: { g: Guide; lang: Lang }) {
  return (
    <Link className="guide-card" href={`${localHref(lang, "guides")}#${g.slug}`}>
      <span className="kicker">{g.category[lang]}</span>
      <h3>{g.title[lang]}</h3>
      <p>{g.summary[lang]}</p>
    </Link>
  );
}
