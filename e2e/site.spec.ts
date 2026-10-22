import { expect, test } from "@playwright/test";

test("root redirects by browser language", async ({ request }) => {
  const en = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "en-GB,en;q=0.9" } });
  expect(en.status()).toBe(307);
  expect(en.headers().location).toMatch(/\/en$/);
  const es = await request.get("/", { maxRedirects: 0, headers: { "accept-language": "es-ES,es;q=0.9" } });
  expect(es.headers().location).toMatch(/\/es$/);
});

test("English home follows the reference structure", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-GB");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Licensed betting sites in Spain, compared and checked");
  await expect(page.locator(".sponsor-bar").getByRole("link", { name: "Bet Now" })).toBeVisible();
  for (const n of ["Sports Betting", "Online Casinos", "Bonuses", "Reviews", "Compare", "Guides", "News", "Responsible Gambling"]) {
    await expect(page.locator("nav#main-nav").getByRole("link", { name: n, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: /Country/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Language" })).toBeVisible();
  for (const h of ["Top picks", "Bookmakers we cover", "Verified operators", "Latest guides", "Latest news"]) {
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  }
  await expect(page.locator(".strip__card").first()).toBeVisible();
  await expect(page.locator(".pick").first().getByRole("link", { name: "Visit site →" })).toHaveAttribute("rel", /sponsored/);
});

test("Spanish home is in Spanish", async ({ page }) => {
  await page.goto("/es");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Casas de apuestas con licencia en España");
});

test("language and country dropdowns work", async ({ page }) => {
  await page.goto("/en/news");
  await page.getByRole("button", { name: "Language" }).click();
  await page.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(/\/es\/noticias$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Últimas noticias de apuestas y licencias");
  await page.getByRole("button", { name: /País/ }).click();
  await page.getByRole("link", { name: /Colombia/ }).first().click();
  await expect(page).toHaveURL(/\/es\/paises\/co$/);
});

test("directory lists every operator and filters by country and search", async ({ page }) => {
  await page.goto("/en/sports-betting");
  await expect(page.getByText("104 of 104 bookmakers")).toBeVisible();
  await page.getByRole("button", { name: /Colombia/ }).click();
  await expect(page.getByText("14 of 104 bookmakers")).toBeVisible();
  await page.getByRole("button", { name: "All" }).click();
  await page.getByLabel("Search bookmakers").fill("zzzz");
  await expect(page.getByText("No bookmakers match your search.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("104 of 104 bookmakers")).toBeVisible();
});

test("compare, reviews and casinos pages render", async ({ page }) => {
  await page.goto("/en/compare");
  await expect(page.locator("table.compare tbody tr")).toHaveCount(104);
  await page.goto("/en/reviews");
  await expect(page.getByText("104 of 104 bookmakers")).toBeVisible();
  await page.goto("/en/online-casinos");
  await expect(page.getByText(/\d+ of \d+ bookmakers/)).toBeVisible();
});

test("ads follow the sifufinds pattern: strip everywhere, tiles on home, sidebar on news and guides", async ({ page }) => {
  for (const path of ["/en", "/en/sports-betting", "/en/news", "/en/guides", "/es/noticias", "/en/bookmakers/bet365-es"]) {
    await page.goto(path);
    await expect(page.locator(".strip__card").first(), path).toBeVisible();
    // The brand-coloured card must use the logo's own background colour.
    const bg = await page.locator(".strip__card").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg, path).not.toBe("rgba(0, 0, 0, 0)");
  }
  await page.goto("/en");
  expect(await page.locator(".pick").count()).toBe(6);
  expect(await page.locator(".pick__art img").count()).toBeGreaterThan(3);
  for (const path of ["/en/news", "/en/guides"]) {
    await page.goto(path);
    await expect(page.locator(".partners .ad")).toHaveCount(3);
    await expect(page.locator(".partners").getByText("Advertisement · 18+").first()).toBeVisible();
  }
});

test("news page follows the casino.org layout", async ({ page }) => {
  await page.goto("/en/news");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Latest Betting and Licence News");
  await expect(page.locator(".story--lead")).toHaveCount(1);
  await expect(page.locator(".news-top__grid .story")).toHaveCount(4);
  await page.getByRole("button", { name: "Show 7 more articles" }).click();
  await expect(page.locator(".news-more .story")).toHaveCount(7);
  await page.getByRole("tab", { name: "Licences" }).click();
  await expect(page.locator(".story--lead")).toHaveCount(1);
  await expect(page.locator(".story").first()).toContainText("Source:");
  await page.goto("/es/noticias");
  await expect(page.getByRole("button", { name: "Mostrar 7 noticias más" })).toBeVisible();
});

test("guides and news hold their content on the page", async ({ page }) => {
  await page.goto("/en/guides");
  await expect(page.locator("article.article")).toHaveCount(4);
  await page.goto("/en/news");
  await expect(page.locator("article.article")).toHaveCount(12);
  await expect(page.locator("article.article h2", { hasText: "Peru: MINCETUR lists 44" })).toBeVisible();
  await page.goto("/es/noticias");
  await expect(page.locator("article.article h2", { hasText: "Perú: MINCETUR registra 44" })).toBeVisible();
});

test("review page shows licence evidence and honest pending status in both languages", async ({ page }) => {
  await page.goto("/en/bookmakers/bet365-es");
  await expect(page.getByText("Review status:")).toBeVisible();
  await expect(page.getByText("HILLSIDE NEW MEDIA MALTA, PLC").first()).toBeVisible();
  await expect(page.getByText("Not reviewed yet.").first()).toBeVisible();
  await page.goto("/es/casas-de-apuestas/bet365-es");
  await expect(page.getByText("Estado de la reseña:")).toBeVisible();
});

test("Colombia carries the Coljuegos legend; restricted markets show nothing to bet on", async ({ page }) => {
  await page.goto("/en/countries/co");
  await expect(page.getByText("Autorizado por COLJUEGOS").first()).toBeVisible();
  for (const cc of ["cl", "uy", "mx"]) {
    await page.goto(`/en/countries/${cc}`);
    await expect(page.getByText(/We don't list any bookmakers for/)).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByText("Bet Now")).toHaveCount(0);
  }
});

test("click-out redirects only to the stored official domain", async ({ request }) => {
  const ok = await request.get("/go/bet365-es", { maxRedirects: 0 });
  expect(ok.status()).toBe(302);
  expect(ok.headers().location).toBe("https://www.bet365.es/");
  for (const id of ["nope", "..%2Fetc", "https%3A%2F%2Fevil.example", "bet365-cl"]) {
    expect((await request.get(`/go/${id}`, { maxRedirects: 0 })).status(), id).toBe(404);
  }
});

test("sitemap has both languages with alternates and no restricted markets", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const p of ["/en/sports-betting", "/es/apuestas-deportivas", "/en/bookmakers/bet365-es", "/es/paises/co"]) expect(xml).toContain(p);
  expect(xml).toContain('hreflang="es"');
  for (const p of ["/en/countries/cl", "/en/countries/mx"]) expect(xml).not.toContain(p);
});

test("unknown paths 404 and slugs stay canonical", async ({ request }) => {
  for (const path of ["/xx", "/en/nope", "/en/countries/xx", "/en/bookmakers/nope-xx", "/en/guides/extra"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
  const wrongSlug = await request.get("/es/sports-betting", { maxRedirects: 0 });
  expect(wrongSlug.status()).toBe(308);
  expect(wrongSlug.headers().location).toMatch(/\/es\/apuestas-deportivas$/);
  expect((await request.get("/en/countries/es", { maxRedirects: 0 })).status()).toBe(308);
});

test("mobile menu works and nothing overflows at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const path of ["/en", "/en/sports-betting", "/en/bookmakers/bet365-es", "/en/compare", "/es"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), path).toBe(false);
  }
  await page.goto("/en");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator("nav#main-nav").getByRole("link", { name: "Responsible Gambling" })).toBeVisible();
});
