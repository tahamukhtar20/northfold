// Pure edits on a site. Each returns a new site and leaves the old one untouched,
// which is what makes undo and redo a matter of keeping old values.
import { newBlock, newId } from "../content/schema.ts";
import type { Block, Page, PageKind, Site } from "../content/schema.ts";

export type Key = string | number;

function setIn(value: unknown, path: Key[], next: unknown): unknown {
  if (path.length === 0) return next;
  const [k, ...rest] = path;
  if (Array.isArray(value)) {
    const copy = value.slice();
    copy[k as number] = setIn(copy[k as number], rest, next);
    return copy;
  }
  const obj = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  return { ...obj, [k]: setIn(obj[k as string], rest, next) };
}

export function getIn(value: unknown, path: Key[]): unknown {
  return path.reduce<unknown>((v, k) => (v && typeof v === "object" ? (v as Record<Key, unknown>)[k] : undefined), value);
}

const mapPage = (site: Site, pageId: string, f: (p: Page) => Page): Site => ({
  ...site,
  pages: site.pages.map((p) => (p.id === pageId ? f(p) : p)),
});
const mapBlocks = (site: Site, pageId: string, f: (b: Block[]) => Block[]) => mapPage(site, pageId, (p) => ({ ...p, blocks: f(p.blocks) }));

/** Set a value inside a block's data, e.g. path ["items", 2, "title", "de"]. */
export function setBlockField(site: Site, pageId: string, blockId: string, path: Key[], value: unknown): Site {
  return mapBlocks(site, pageId, (bs) => bs.map((b) => (b.id === blockId ? { ...b, data: setIn(b.data, path, value) as Block["data"] } : b)));
}

export function setPageField(site: Site, pageId: string, path: Key[], value: unknown): Site {
  return mapPage(site, pageId, (p) => setIn(p, path, value) as Page);
}

export function moveBlock(site: Site, pageId: string, from: number, to: number): Site {
  const n = site.pages.find((p) => p.id === pageId)?.blocks.length ?? 0;
  // A move that changes nothing returns the same site, so it does not become an undo step.
  if (from === to || from < 0 || to < 0 || from >= n || to >= n) return site;
  return mapBlocks(site, pageId, (bs) => {
    const copy = bs.slice();
    const [b] = copy.splice(from, 1);
    copy.splice(to, 0, b);
    return copy;
  });
}

/** Insert a new block of `type` at `index`; returns the site and the new block's id. */
export function addBlock(site: Site, pageId: string, type: string, index: number): [Site, string] {
  const b = newBlock(type);
  return [mapBlocks(site, pageId, (bs) => [...bs.slice(0, index), b, ...bs.slice(index)]), b.id];
}

export function duplicateBlock(site: Site, pageId: string, blockId: string): [Site, string] {
  const id = newId();
  return [
    mapBlocks(site, pageId, (bs) => {
      const i = bs.findIndex((b) => b.id === blockId);
      if (i < 0) return bs;
      return [...bs.slice(0, i + 1), { ...structuredClone(bs[i]), id }, ...bs.slice(i + 1)];
    }),
    id,
  ];
}

export function removeBlock(site: Site, pageId: string, blockId: string): Site {
  return mapBlocks(site, pageId, (bs) => bs.filter((b) => b.id !== blockId));
}

/** Move an item inside a list field. */
export function moveItem(site: Site, pageId: string, blockId: string, listPath: Key[], from: number, to: number): Site {
  const block = site.pages.find((p) => p.id === pageId)?.blocks.find((b) => b.id === blockId);
  const list = getIn(block?.data, listPath);
  if (!Array.isArray(list) || to < 0 || to >= list.length) return site;
  const copy = list.slice();
  const [x] = copy.splice(from, 1);
  copy.splice(to, 0, x);
  return setBlockField(site, pageId, blockId, listPath, copy);
}

export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "page"
  );
}

/** A unique slug within the pages of the same kind. */
export function uniqueSlug(site: Site, kind: PageKind, base: string, except?: string): string {
  const taken = new Set(site.pages.filter((p) => p.kind === kind && p.id !== except).map((p) => p.slug));
  let s = base, n = 2;
  while (taken.has(s)) s = `${base}-${n++}`;
  return s;
}

export function addPage(site: Site, kind: PageKind, title: string): [Site, string] {
  const id = `${kind}-${newId()}`;
  const page: Page = {
    id,
    kind,
    slug: uniqueSlug(site, kind, slugify(title)),
    title: { en: title },
    summary: { en: "" },
    ...(kind === "page" ? {} : { date: new Date().toISOString().slice(0, 10) }),
    blocks: [{ ...newBlock("hero"), data: { heading: { en: title }, intro: { en: "" }, buttons: [] } }],
  };
  return [{ ...site, pages: [...site.pages, page] }, id];
}

/** Remove a page and any navigation entry pointing at it. The home page cannot be removed. */
export function removePage(site: Site, pageId: string): Site {
  const page = site.pages.find((p) => p.id === pageId);
  if (!page || (page.kind === "page" && page.slug === "")) return site;
  return { ...site, pages: site.pages.filter((p) => p.id !== pageId), nav: site.nav.filter((n) => n.page !== pageId) };
}
