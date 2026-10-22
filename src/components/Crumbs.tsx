import Link from "next/link";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apuestalohoy.com";

export function Crumbs({ lang, trail }: { lang: Lang; trail: readonly { label: string; href?: string }[] }) {
  const home = getDict(lang).homeLabel;
  const items = [{ label: home, href: localHref(lang, "home") }, ...trail];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.label, ...(t.href ? { item: `${SITE}${t.href}` } : {}) })),
  };
  return (
    <p className="crumbs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link href={localHref(lang, "home")}>{getDict(lang).homeLabel}</Link>
      {trail.map((t) => (
        <span key={t.label}> / {t.href ? <Link href={t.href}>{t.label}</Link> : t.label}</span>
      ))}
    </p>
  );
}
