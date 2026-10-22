import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/en", "/es", "/en/sports-betting", "/es/apuestas-deportivas", "/en/bookmakers/bet365-es", "/en/compare", "/en/reviews", "/en/countries/pe", "/en/countries/cl", "/en/countries", "/en/news", "/es/noticias", "/en/guides", "/en/betting-laws", "/en/about", "/en/responsible-gambling", "/en/privacy"];

for (const path of PAGES) {
  test(`no WCAG A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
  });
}
