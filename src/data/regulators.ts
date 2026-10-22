import type { Lang } from "@/i18n/config";

export type RegulatorInfo = {
  /** Name as used in a sentence ("licensed by ___"), per language. */
  readonly name: Readonly<Record<Lang, string>>;
  readonly label: string;
  readonly registerLabel: Readonly<Record<Lang, string>>;
  /** Legend that must accompany promotion where the regulator requires one (Colombia). */
  readonly legend?: string;
};

export const REGULATORS: Readonly<Record<string, RegulatorInfo>> = {
  ES: { name: { en: "the DGOJ", es: "la DGOJ" }, label: "DGOJ", registerLabel: { en: "DGOJ public register", es: "registro público de la DGOJ" } },
  CO: { name: { en: "Coljuegos", es: "Coljuegos" }, label: "Coljuegos", registerLabel: { en: "Coljuegos official list", es: "listado oficial de Coljuegos" }, legend: "Autorizado por COLJUEGOS" },
  PE: { name: { en: "MINCETUR", es: "MINCETUR" }, label: "MINCETUR", registerLabel: { en: "MINCETUR official register", es: "registro oficial de MINCETUR" } },
};
