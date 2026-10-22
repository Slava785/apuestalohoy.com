import Link from "next/link";
import { LogoTile, brandColours } from "@/components/LogoTile";
import { getDict } from "@/i18n/dict";
import { localHref, type Lang } from "@/i18n/config";
import type { BrandCardData } from "@/lib/brand-card";

const sponsoredLink = { rel: "noopener noreferrer nofollow sponsored", target: "_blank" } as const;

export function BetButton({ slug, lang, label }: { slug: string; lang: Lang; label?: string }) {
  return (
    <a className="btn btn--green btn--block" href={`/go/${slug}`} {...sponsoredLink}>
      {label ?? getDict(lang).common.betNow}
    </a>
  );
}

export function ReviewButton({ slug, lang }: { slug: string; lang: Lang }) {
  return (
    <Link className="btn btn--outline btn--block" href={localHref(lang, "bookmakers", slug)}>
      {getDict(lang).common.readReview}
    </Link>
  );
}

export function Legend({ b }: { b: BrandCardData }) {
  return b.legend ? <p className="card__fine"><strong>{b.legend}</strong> · 18+</p> : null;
}

/** Top-pick tile: the logo fills a card in the brand's own colour, with the name on a pill. */
export function OfferCard({ b, lang }: { b: BrandCardData; lang: Lang }) {
  const t = getDict(lang);
  const c = brandColours(b.slug, b.name);
  return (
    <article className="pick">
      <a className="pick__art" href={`/go/${b.slug}`} style={{ background: c.bg }} {...sponsoredLink}>
        {c.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.logo} alt="" width={160} height={160} loading="lazy" decoding="async" />
        ) : (
          <span className="pick__letter" aria-hidden="true">{b.name.charAt(0).toUpperCase()}</span>
        )}
        <span className="pick__pill">{b.name} {b.countryName}</span>
      </a>
      <div className="pick__body">
        <p className="pick__line">{b.descriptor}</p>
        <Legend b={b} />
        <a className="btn btn--green btn--block" href={`/go/${b.slug}`} {...sponsoredLink}>{t.ads.visit}</a>
        <p className="card__fine">{t.ads.tcs}</p>
      </div>
    </article>
  );
}

/** Compact card for dark scrollers and "similar" lists. */
export function MiniCard({ b, lang }: { b: BrandCardData; lang: Lang }) {
  const t = getDict(lang).common;
  return (
    <article className="card">
      <div className="card__top">
        <LogoTile name={b.name} slug={b.slug} />
        <div>
          <h3>{b.name}</h3>
          <p>{b.countryName}</p>
        </div>
      </div>
      <div><span className="badge">{t.verified}</span></div>
      <p className="card__fine">{b.descriptor}</p>
      <Legend b={b} />
      <div className="card__actions">
        <BetButton slug={b.slug} lang={lang} />
        <ReviewButton slug={b.slug} lang={lang} />
      </div>
    </article>
  );
}

/** Directory row; `rank` shows the numbered circle used for the top list. */
export function BrandRow({ b, lang, rank }: { b: BrandCardData; lang: Lang; rank?: number }) {
  const t = getDict(lang).common;
  return (
    <li className="row">
      {rank ? <span className="row__rank" aria-label={t.position(rank)}>{rank}</span> : null}
      <div className="row__who">
        <LogoTile name={b.name} slug={b.slug} size={56} />
        <div>
          <h3>{b.name}</h3>
          <p>{b.descriptor}</p>
          <div className="row__badge"><span className="badge">{t.verified}</span></div>
        </div>
      </div>
      <div className="row__promo">
        <strong>{t.promoHeadline}</strong>
        <p>{t.promoDetail}</p>
        <div className="row__meta">
          <span className="badge badge--line">{b.flag} {b.countryName}</span>
          {b.products.includes("casino") ? <span className="badge badge--line">{t.casino}</span> : null}
          <span className="badge badge--line">{b.domain}</span>
        </div>
        <Legend b={b} />
      </div>
      <div className="row__actions">
        <BetButton slug={b.slug} lang={lang} />
        <ReviewButton slug={b.slug} lang={lang} />
      </div>
    </li>
  );
}
