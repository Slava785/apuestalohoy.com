import { notFound } from "next/navigation";
import { isLang, type Lang } from "@/i18n/config";

/** Resolves and validates the [lang] segment. */
export async function pageLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
