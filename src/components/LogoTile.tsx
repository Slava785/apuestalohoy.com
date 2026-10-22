import { BRAND_LOGOS } from "@/data/brand-logos";

const PALETTE = ["#0b5d3b", "#1d3f72", "#7a1f2b", "#4a2a7a", "#8a4b08", "#0b6470", "#222b33", "#8a1f5c"];

function hash(s: string): number {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/** "bet365-es" -> "bet365". */
export const brandIdOf = (slug: string) => slug.replace(/-[a-z]{2}$/, "");

/** Brand colours for a slug: the logo's own background where we have a logo, otherwise a neutral colour. */
export function brandColours(slug: string, name: string): { bg: string; tone: "dark" | "light"; logo: string | null } {
  const id = brandIdOf(slug);
  const logo = BRAND_LOGOS[id];
  if (logo) return { bg: logo.bg, tone: logo.tone, logo: `/brands/${id}.png` };
  return { bg: PALETTE[hash(name) % PALETTE.length], tone: "dark", logo: null };
}

/**
 * Square brand tile. The tile takes the logo's own background colour, so the logo fills the card
 * with no visible edge. Brands without a logo get a lettered tile.
 */
export function LogoTile({ name, slug, size = 40 }: { name: string; slug?: string; size?: number }) {
  const c = brandColours(slug ?? name.toLowerCase(), name);
  return (
    <span className="logo-tile" style={{ "--s": `${size}px`, background: c.bg } as React.CSSProperties} aria-hidden="true">
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.logo} alt="" width={size} height={size} loading="lazy" decoding="async" />
      ) : (
        <span>{name.trim().charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}
