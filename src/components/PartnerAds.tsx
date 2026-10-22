import { LogoTile, brandColours } from "@/components/LogoTile";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";
import type { BrandCardData } from "@/lib/brand-card";

const sponsoredLink = { rel: "noopener noreferrer nofollow sponsored", target: "_blank" } as const;

/** Sidebar "Featured betting partners" panel of brand-coloured ad cards (News and Guides pages). */
export function PartnerAds({ brands, lang }: { brands: readonly BrandCardData[]; lang: Lang }) {
  const t = getDict(lang).ads;
  return (
    <aside className="partners" aria-label={t.partnersTitle}>
      <div className="partners__head"><span>{t.partnersTitle}</span><b>{t.partnersTag}</b></div>
      {brands.map((b) => {
        const c = brandColours(b.slug, b.name);
        return (
          <div key={b.slug} className={`ad ad--${c.tone}`} style={{ background: c.bg }}>
            <span className="ad__tag">{t.advert}</span>
            <div className="ad__who">
              <LogoTile name={b.name} slug={b.slug} size={44} />
              <div><strong>{b.name}</strong><small>{b.descriptor}</small></div>
            </div>
            <p className="ad__headline">{t.headline(b.name)}</p>
            <p className="ad__fine">{t.tcs}</p>
            <a className="ad__cta" href={`/go/${b.slug}`} {...sponsoredLink}>{t.cta}</a>
            <p className="ad__foot"><span>{t.sponsored}</span><span>{t.partnersTag}</span></p>
          </div>
        );
      })}
    </aside>
  );
}
