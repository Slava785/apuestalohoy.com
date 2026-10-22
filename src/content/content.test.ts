import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { commercialData } from "@/data/commercial";
import { BRAND_LOGOS } from "@/data/brand-logos";
import { MARKET_INFO } from "@/data/market-info";
import { GUIDES } from "@/content/guides";
import { ARTICLES } from "@/content/news";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";
import { LANGS } from "@/i18n/config";

const US_WORDS = /\b(analy[sz]e[sd]?|analyzing|authoriz\w*|organiz\w*|recogniz\w*|optimiz\w*|summariz\w*|colors?|favorites?|centers?|sportsbooks?|bettors?|gray|defense|behavior|catalog|fulfill|labeled|canceled|traveling)\b/i;
const JARGON = /\b(leverag\w*|seamless\w*|robust|comprehensive|delve\w*|landscape|tailored|cutting-edge|empower\w*|unlock\w*|elevate\w*|streamlin\w*|holistic|game-chang\w*|world-class|state-of-the-art)\b/i;

const englishStrings = (): string[] => {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") out.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(en);
  for (const g of GUIDES) { out.push(g.title.en, g.summary.en, g.category.en); g.body.en.forEach((b) => walk(b)); }
  for (const a of ARTICLES) { out.push(a.title.en, a.summary.en, a.category.en); a.body.en.forEach((b) => walk(b)); }
  for (const m of Object.values(MARKET_INFO)) out.push(m.summary.en);
  return out;
};

describe("news agent: every story is sourced and bilingual", () => {
  test.each(ARTICLES.map((a) => [a.slug, a] as const))("%s", (_slug, a) => {
    expect(a.sources.length).toBeGreaterThan(0);
    for (const s of a.sources) { expect(s.url).toMatch(/^https:\/\//); expect(s.label.length).toBeGreaterThan(3); }
    for (const l of LANGS) {
      expect(a.title[l].length).toBeGreaterThan(15);
      expect(a.summary[l].length).toBeGreaterThan(30);
      expect(a.body[l].length).toBeGreaterThan(1);
    }
    expect(Number.isNaN(Date.parse(a.date))).toBe(false);
  });
  test("slugs are unique", () => expect(new Set(ARTICLES.map((a) => a.slug)).size).toBe(ARTICLES.length));
});

describe("content agent: guides and dictionaries", () => {
  test("guides exist in both languages", () => {
    for (const g of GUIDES) for (const l of LANGS) { expect(g.title[l]).toBeTruthy(); expect(g.body[l].length).toBeGreaterThan(2); }
  });
  test("Spanish dictionary has every English key", () => {
    const keys = (o: unknown, p = ""): string[] => (o && typeof o === "object" && !Array.isArray(o) ? Object.entries(o).flatMap(([k, v]) => keys(v, `${p}.${k}`)) : [p]);
    expect(keys(es).sort()).toEqual(keys(en).sort());
  });
  test("English copy uses British spelling", () => {
    const bad = englishStrings().filter((s) => US_WORDS.test(s));
    expect(bad).toEqual([]);
  });
  test("English copy avoids stock jargon and em dashes", () => {
    const strings = englishStrings();
    expect(strings.filter((s) => JARGON.test(s))).toEqual([]);
    expect(strings.filter((s) => s.includes("—"))).toEqual([]);
  });
});

describe("brand and design agent: logos and colours", () => {
  const ids = [...new Set(commercialData.brands.map((b) => b.id))];
  /** Pending candidates (commercial-intl.ts) are hidden by the gate, so only verified brands need a logo. */
  const shownIds = [...new Set(commercialData.brandMarkets.filter((bm) => bm.verification === "verified").map((bm) => bm.brandId))];
  test("every logo in the manifest has a file and a valid colour", () => {
    for (const [id, logo] of Object.entries(BRAND_LOGOS)) {
      expect(existsSync(join(process.cwd(), "public", "brands", `${id}.png`)), id).toBe(true);
      expect(logo.bg).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
  test("most listed brands have a logo", () => {
    const withLogo = shownIds.filter((id) => BRAND_LOGOS[id]).length;
    expect(withLogo / shownIds.length).toBeGreaterThan(0.9);
  });
  test("every brand logo file belongs to a listed brand", () => {
    for (const id of Object.keys(BRAND_LOGOS)) expect(ids).toContain(id);
  });
});
