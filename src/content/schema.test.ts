import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BLOCKS, missing, newBlock, pagePath, resolvePath, t, validateBlock, validateSite } from "./schema.ts";
import type { Site } from "./schema.ts";

const site: Site = JSON.parse(readFileSync(new URL("./site.json", import.meta.url), "utf8"));
const clone = (): Site => structuredClone(site);

test("the bundled site is valid", () => {
  assert.deepEqual(validateSite(site), []);
});

test("the bundled site is fully translated into German", () => {
  assert.deepEqual(missing(site, "de").map((m) => m.path), []);
});

test("paths round-trip for every page in every language", () => {
  for (const p of site.pages) for (const lang of ["en", "de"] as const) {
    const r = resolvePath(site, pagePath(p, lang));
    assert.equal(r?.page.id, p.id, pagePath(p, lang));
    assert.equal(r?.lang, lang);
  }
  assert.equal(pagePath({ kind: "page", slug: "" }, "de"), "/de");
  assert.equal(resolvePath(site, "/fr/work"), null);
  assert.equal(resolvePath(site, "/en/nope"), null);
  assert.equal(resolvePath(site, "/en/work/nope"), null);
});

test("German falls back to English, including blank translations", () => {
  assert.equal(t({ en: "Hi", de: "Hallo" }, "de"), "Hallo");
  assert.equal(t({ en: "Hi" }, "de"), "Hi");
  assert.equal(t({ en: "Hi", de: "  " }, "de"), "Hi");
});

test("validation catches the common mistakes", () => {
  const s = clone();
  s.pages[1].slug = "";
  s.pages[2].blocks[0].data.heading = { en: "" };
  s.pages[0].blocks.push({ id: s.pages[0].blocks[0].id, type: "quote", data: { text: { en: "x" }, name: "" } });
  s.nav.push({ label: { en: "Ghost" }, page: "ghost" });
  const msgs = validateSite(s).map((p) => p.message);
  assert.ok(msgs.some((m) => m.includes("share the address")), msgs.join("\n"));
  assert.ok(msgs.includes("Heading is required"));
  assert.ok(msgs.some((m) => m.startsWith("Duplicate block id")));
  assert.ok(msgs.includes("Name is required"));
  assert.ok(msgs.some((m) => m.includes("missing page")));
  assert.deepEqual(validateSite({ version: 2 }).length, 1);
});

test("length limits, list sizes and link targets are enforced", () => {
  const long = { id: "x", type: "stats", data: { items: [{ value: "1234567890123", label: { en: "a" } }] } };
  const msgs = validateBlock(long).map((p) => p.message);
  assert.ok(msgs.includes("Figures needs at least 2"));
  assert.ok(msgs.includes("Value is longer than 12 characters"));
  const badLink = { id: "y", type: "cta", data: { heading: { en: "Go" }, button: { label: { en: "Go" }, href: "javascript:alert(1)" } } };
  assert.ok(validateBlock(badLink).some((p) => p.message.includes("target must start")));
});

test("every block type starts from data that only lacks required text", () => {
  for (const def of BLOCKS) {
    const problems = validateBlock(newBlock(def.type));
    assert.ok(problems.every((p) => p.message.endsWith("is required")), `${def.type}: ${problems.map((p) => p.message).join("; ")}`);
  }
});

test("missing translations are reported by path", () => {
  const s = clone();
  s.pages[0].blocks[0].data.intro = { en: "New intro" };
  assert.deepEqual(missing(s, "de").map((m) => m.path), ["pages[0].blocks[0].data.intro"]);
});
