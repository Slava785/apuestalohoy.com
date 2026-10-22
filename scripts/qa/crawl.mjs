#!/usr/bin/env node
/**
 * Full-site crawl used by the QA, SEO and Content agents.
 * Usage: node scripts/qa/crawl.mjs http://localhost:3000
 * Checks every sitemap URL plus every internal link found: status, title, description, canonical,
 * hreflang, one h1, html lang, JSON-LD, UK spelling (English pages), brand images and /go links.
 */
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const US_WORDS = /\b(analy[sz]e[sd]?|analyzing|authoriz\w*|organiz\w*|recogniz\w*|optimiz\w*|summariz\w*|colors?|favorites?|centers?|sportsbooks?|bettors?|gray|defense|behavior|catalog|fulfill|labeled|canceled|traveling)\b/i;
const failures = [];
const fail = (url, msg) => failures.push(`${url}  ${msg}`);

const text = async (url, opts) => {
  const r = await fetch(url, { redirect: "manual", ...opts });
  return { status: r.status, headers: r.headers, body: r.status === 200 ? await r.text() : "" };
};

async function pool(items, n, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: n }, async () => { for (let x; (x = queue.shift()) !== undefined;) await fn(x); }));
}

const strip = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ");

// 1. Discover pages from the sitemap, then follow internal links.
const sitemap = await text(`${BASE}/sitemap.xml`);
if (sitemap.status !== 200) { console.error("sitemap.xml not reachable:", sitemap.status); process.exit(1); }
const seen = new Set([...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
const queue = [...seen];
const goLinks = new Set();
const images = new Set();
const pages = [];

while (queue.length) {
  const batch = queue.splice(0, 6);
  await Promise.all(batch.map(async (path) => {
    const res = await text(BASE + path);
    pages.push(path);
    if (res.status !== 200) return fail(path, `status ${res.status}`);
    const html = res.body;
    const lang = path.split("/")[1];
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
    const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "";
    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? "";
    const htmlLang = /<html[^>]*lang="([^"]*)"/.exec(html)?.[1] ?? "";
    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (title.length < 10 || title.length > 80) fail(path, `title length ${title.length}: "${title}"`);
    if (desc.length < 50 || desc.length > 180) fail(path, `description length ${desc.length}`);
    if (!canonical) fail(path, "missing canonical");
    if (h1s !== 1) fail(path, `${h1s} h1 elements`);
    if (!["en", "es"].includes(lang)) fail(path, "unexpected language segment");
    if ((lang === "en" && htmlLang !== "en-GB") || (lang === "es" && htmlLang !== "es")) fail(path, `html lang "${htmlLang}"`);
    for (const l of ["en", "es", "x-default"]) if (!new RegExp(`hrefLang="${l}"|hreflang="${l}"`, "i").test(html)) fail(path, `missing hreflang ${l}`);
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { fail(path, "invalid JSON-LD"); }
    }
    if (/undefined|\[object Object\]|NaN/.test(strip(html))) fail(path, "text contains undefined / [object Object] / NaN");
    if (lang === "en") { const m = US_WORDS.exec(strip(html)); if (m) fail(path, `American English: "${m[0]}"`); }
    for (const m of html.matchAll(/href="([^"#?]+)[^"]*"/g)) {
      const h = m[1];
      if (h.startsWith("/go/")) goLinks.add(h);
      else if (/^\/(en|es)(\/|$)/.test(h) && !seen.has(h)) { seen.add(h); queue.push(h); }
    }
    for (const m of html.matchAll(/src="(\/brands\/[^"]+)"/g)) images.add(m[1]);
  }));
}

// 2. Brand images exist.
await pool([...images], 8, async (img) => { const r = await fetch(BASE + img, { method: "HEAD" }); if (r.status !== 200) fail(img, `image status ${r.status}`); });

// 3. Every ad / click-out link redirects to an https site.
await pool([...goLinks], 8, async (go) => {
  const r = await fetch(BASE + go, { redirect: "manual" });
  const loc = r.headers.get("location") ?? "";
  if (r.status !== 302 || !loc.startsWith("https://")) fail(go, `click-out status ${r.status} location "${loc}"`);
});

// 4. Machine-readable extras.
for (const extra of ["/robots.txt", "/llms.txt", "/icon.png", "/logo.png"]) {
  const r = await fetch(BASE + extra, { method: "HEAD" });
  if (r.status !== 200) fail(extra, `status ${r.status}`);
}

console.log(`Crawled ${pages.length} pages, ${images.size} brand images, ${goLinks.size} click-out links.`);
if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n` + failures.map((f) => " - " + f).join("\n"));
  process.exit(1);
}
console.log("All checks passed.");
