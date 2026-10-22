"use client";

import { usePathname } from "next/navigation";
import { routeKeyForSlug } from "@/i18n/config";

export type RailBrand = { readonly name: string; readonly slug: string };
export type RailData = Readonly<Record<string, readonly RailBrand[]>>;

/** Picks the market whose page the visitor is on; defaults to Spain (the home page market). */
export function useRailBrands(data: RailData): { slug: string; brands: readonly RailBrand[] } {
  const [, , route = "", child = ""] = usePathname().split("/");
  const slug = routeKeyForSlug(route) === "countries" && child in data ? child : "es";
  return { slug, brands: data[slug] ?? [] };
}
