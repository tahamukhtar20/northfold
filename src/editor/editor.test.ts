import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateSite } from "../content/schema.ts";
import type { Site } from "../content/schema.ts";
import { addBlock, addPage, duplicateBlock, getIn, moveBlock, moveItem, removeBlock, removePage, setBlockField, slugify, uniqueSlug } from "./ops.ts";
import { createHistory, LIMIT, MERGE_MS, push, redo, undo } from "./history.ts";

const site: Site = JSON.parse(readFileSync(new URL("../content/site.json", import.meta.url), "utf8"));
const home = site.pages[0];

test("field edits are immutable and land at the path", () => {
  const b = home.blocks[2];
  const next = setBlockField(site, "home", b.id, ["items", 1, "title", "de"], "Neu");
  assert.equal(getIn(next.pages[0].blocks[2].data, ["items", 1, "title", "de"]), "Neu");
  assert.notEqual(getIn(site.pages[0].blocks[2].data, ["items", 1, "title", "de"]), "Neu");
  assert.equal(next.pages[1], site.pages[1], "untouched pages are shared");
});

test("blocks move, duplicate, add and remove", () => {
  const ids = home.blocks.map((b) => b.id);
  assert.deepEqual(moveBlock(site, "home", 0, 2).pages[0].blocks.map((b) => b.id), [ids[1], ids[2], ids[0], ...ids.slice(3)]);
  assert.equal(moveBlock(site, "home", 0, 99), site);
  const [dup, dupId] = duplicateBlock(site, "home", ids[1]);
  assert.equal(dup.pages[0].blocks[2].id, dupId);
  assert.deepEqual(dup.pages[0].blocks[2].data, home.blocks[1].data);
  const [added, newId] = addBlock(site, "home", "quote", 1);
  assert.equal(added.pages[0].blocks[1].id, newId);
  assert.equal(removeBlock(added, "home", newId).pages[0].blocks.length, home.blocks.length);
  assert.deepEqual(validateSite(dup), []);
});

test("list items reorder within bounds", () => {
  const b = home.blocks[1];
  const moved = moveItem(site, "home", b.id, ["items"], 0, 3);
  assert.equal((getIn(moved.pages[0].blocks[1].data, ["items", 3, "value"]) as string), "14");
  assert.equal(moveItem(site, "home", b.id, ["items"], 0, 9), site);
});

test("new pages get unique slugs; the home page cannot be removed", () => {
  const [s1, id1] = addPage(site, "post", "Why we release every two weeks");
  assert.equal(s1.pages.find((p) => p.id === id1)!.slug, "why-we-release-every-two-weeks-2");
  assert.deepEqual(validateSite(s1), []);
  assert.equal(removePage(site, "home"), site);
  const noAbout = removePage(site, "about");
  assert.ok(!noAbout.nav.some((n) => n.page === "about"));
  assert.equal(slugify("Über uns & Größe!"), "uber-uns-grosse");
  assert.equal(uniqueSlug(site, "page", "about", "about"), "about");
});

test("undo merges typing in one field and caps its length", () => {
  let h = createHistory(0);
  h = push(h, 1, "f", 1000);
  h = push(h, 2, "f", 1000 + MERGE_MS - 1);
  h = push(h, 3, "g", 1000 + MERGE_MS);
  assert.deepEqual(h.past, [0, 2]);
  h = undo(h);
  assert.equal(h.present, 2);
  h = undo(h);
  assert.equal(h.present, 0);
  h = redo(redo(h));
  assert.equal(h.present, 3);
  h = undo(h);
  h = push(h, 9);
  assert.deepEqual(h.future, [], "a new edit clears redo");
  let big = createHistory(0);
  for (let i = 1; i <= LIMIT + 50; i++) big = push(big, i);
  assert.equal(big.past.length, LIMIT);
});
