import Link from "next/link";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";

export function RgBanner({ lang }: { lang: Lang }) {
  const t = getDict(lang).rg;
  return (
    <div className="rg-banner">
      <div>
        <p className="kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p>{t.text}</p>
      </div>
      <Link className="btn btn--outline" href={localHref(lang, "responsible")}>{t.button}</Link>
    </div>
  );
}
