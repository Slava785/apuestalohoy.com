"use client";

import { useState } from "react";
import { LogoTile } from "@/components/LogoTile";
import { useRailBrands, type RailData } from "@/components/market-context";
import { getDict } from "@/i18n/dict";
import type { Lang } from "@/i18n/config";

export function SponsorBar({ data, lang }: { data: RailData; lang: Lang }) {
  const [closed, setClosed] = useState(false);
  const { brands } = useRailBrands(data);
  const t = getDict(lang);
  const brand = brands[0];
  if (closed || !brand) return null;
  return (
    <div className="sponsor-bar">
      <div className="wrap sponsor-bar__row">
        <div className="sponsor-bar__who">
          <LogoTile name={brand.name} slug={brand.slug} size={36} />
          <div>
            <div className="sponsor-bar__name">{brand.name}</div>
            <div className="sponsor-bar__meta">{t.sponsor.meta}</div>
          </div>
        </div>
        <a className="btn btn--green btn--sm" href={`/go/${brand.slug}`} rel="noopener noreferrer nofollow sponsored" target="_blank">{t.common.betNow}</a>
        <button type="button" className="sponsor-bar__close" aria-label={t.sponsor.close} onClick={() => setClosed(true)}>×</button>
      </div>
    </div>
  );
}
