import { en, type Dict } from "@/i18n/en";
import { es } from "@/i18n/es";
import type { Lang } from "@/i18n/config";

const DICTS: Readonly<Record<Lang, Dict>> = { en, es };

export const getDict = (lang: Lang): Dict => DICTS[lang];

/** Date formatted for the language, e.g. "21 October 2026" / "21 de octubre de 2026". */
export function formatDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}
