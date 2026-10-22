"use client";

import { LogoTile, brandColours } from "@/components/LogoTile";
import { useRailBrands, type RailData } from "@/components/market-context";
import { REGULATORS } from "@/data/regulators";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";

/** Dark "Featured" strip of brand-coloured ad cards, shown on every page. */
export function FeaturedRail({ data, lang }: { data: RailData; lang: Lang }) {
  const { brands } = useRailBrands(data);
  const t = getDict(lang);
  const items = brands.slice(1, 9);
  if (items.length === 0) return null;
  return (
    <div className="strip" aria-label={t.ads.stripLabel}>
      <div className="wrap strip__row">
        <div className="strip__label">{t.ads.stripLabel}<small>{t.ads.stripAge}</small></div>
        <div className="strip__list">
          {items.map((b) => {
            const c = brandColours(b.slug, b.name);
            const cc = b.slug.split("-").pop()?.toUpperCase() ?? "";
            return (
              <a
                key={b.slug}
                className={`strip__card strip__card--${c.tone}`}
                style={{ background: c.bg }}
                href={`/go/${b.slug}`}
                rel="noopener noreferrer nofollow sponsored"
                target="_blank"
              >
                <LogoTile name={b.name} slug={b.slug} size={34} />
                <span className="strip__text">
                  <strong>{b.name}</strong>
                  <small>{t.ads.licensedBy(REGULATORS[cc]?.label ?? "")}</small>
                </span>
                <span className="strip__btn">{t.common.betNow} →</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
