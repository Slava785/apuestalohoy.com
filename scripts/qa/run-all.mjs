#!/usr/bin/env node
/** Runs every agent's checks in order and prints one report. Usage: node scripts/qa/run-all.mjs */
import { spawn, spawnSync } from "node:child_process";

const PORT = 3250;
const results = [];
const run = (agent, label, cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: false });
  results.push({ agent, label, ok: r.status === 0 });
};

run("content / news / brand", "unit tests (copy, news sources, logos, eligibility)", "npx", ["vitest", "run"]);
run("qa", "production build", "npx", ["next", "build"]);

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 8000));
run("qa / seo-geo", "full-site crawl (status, metadata, hreflang, JSON-LD, UK spelling, ads, images)", "node", ["scripts/qa/crawl.mjs", `http://localhost:${PORT}`]);
server.kill();
run("qa / brand-design", "browser and accessibility tests", "npx", ["playwright", "test", "--reporter=line"]);

console.log("\n=== Agent report ===");
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  [${r.agent}]  ${r.label}`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
