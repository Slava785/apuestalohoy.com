# Agents

Five agents work on this site together. Their definitions are in `.claude/agents/`.

| Agent | Owns | Blocks a release when |
|---|---|---|
| qa-agent | Tests, crawl, browser and accessibility checks | Any page returns an error or 404, a logo or ad link is broken, a test fails |
| content-editor-agent | English (UK) and Spanish copy | American spelling, jargon, an unchecked claim, or English and Spanish disagree |
| seo-geo-agent | Titles, descriptions, canonical, hreflang, sitemap, structured data, llms.txt | A page lacks metadata, or a restricted market is indexed |
| news-agent | News stories and their sources | A story has no source, or is missing a language |
| brand-design-agent | Logos, brand colours, ad units, layout against the references | A logo sits on a mismatched colour, or an ad is on the wrong page |

## How they work together
1. Whoever changes something runs `npm test`. It already holds the content, news and brand rules.
2. The seo-geo-agent and content-editor-agent review any new or changed page.
3. The qa-agent builds the site, runs `npm run qa:crawl` and `npm run test:e2e`, and reports the exact URL for anything that fails.
4. Nothing is deployed until the qa-agent reports no open problems.

`npm run qa` runs the unit tests, the build and the browser tests. `npm run qa:crawl -- <url>` crawls a running site.
