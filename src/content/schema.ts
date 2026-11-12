// The content model: a site is pages, a page is an ordered list of typed blocks.
// Every block type is described once here; the renderer, the editor's forms and the
// validator all read these descriptions, so adding a block type is one entry.

export const LANGS = ["en", "de"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

/** Translatable text. English is required; other languages fall back to it. */
export type Text = { en: string; de?: string };

export type Link = { label: Text; href: string };

export type Field =
  | { key: string; label: string; kind: "text" | "textarea"; required?: boolean; max?: number }
  | { key: string; label: string; kind: "plain"; required?: boolean; max?: number; placeholder?: string }
  | { key: string; label: string; kind: "link" }
  | { key: string; label: string; kind: "select"; options: string[] }
  | { key: string; label: string; kind: "list"; item: Field[]; min?: number; max?: number; itemLabel: string };

export type BlockDef = { type: string; name: string; description: string; fields: Field[] };

const heading = (max = 90): Field => ({ key: "heading", label: "Heading", kind: "text", required: true, max });
const intro: Field = { key: "intro", label: "Intro", kind: "textarea", max: 400 };

export const BLOCKS: BlockDef[] = [
  {
    type: "hero",
    name: "Hero",
    description: "Large heading with an intro and up to two buttons.",
    fields: [
      heading(100),
      intro,
      { key: "buttons", label: "Buttons", kind: "list", itemLabel: "Button", max: 2, item: [{ key: "link", label: "Link", kind: "link" }] },
      { key: "visual", label: "Animation", kind: "select", options: ["none", "network"] },
    ],
  },
  {
    type: "stats",
    name: "Key figures",
    description: "Two to four numbers with a label each.",
    fields: [
      {
        key: "items",
        label: "Figures",
        kind: "list",
        itemLabel: "Figure",
        min: 2,
        max: 4,
        item: [
          { key: "value", label: "Value", kind: "plain", required: true, max: 12 },
          { key: "label", label: "Label", kind: "text", required: true, max: 60 },
        ],
      },
    ],
  },
  {
    type: "cards",
    name: "Cards",
    description: "A heading and a row of short cards.",
    fields: [
      heading(),
      intro,
      {
        key: "items",
        label: "Cards",
        kind: "list",
        itemLabel: "Card",
        min: 1,
        max: 6,
        item: [
          { key: "kicker", label: "Small label", kind: "text", max: 30 },
          { key: "title", label: "Title", kind: "text", required: true, max: 60 },
          { key: "text", label: "Text", kind: "textarea", max: 260 },
        ],
      },
    ],
  },
  {
    type: "text",
    name: "Text",
    description: "A heading and paragraphs. Blank lines separate paragraphs; lines starting with \"- \" make a list.",
    fields: [{ key: "heading", label: "Heading", kind: "text", max: 90 }, { key: "body", label: "Body", kind: "textarea", required: true, max: 4000 }],
  },
  {
    type: "steps",
    name: "Steps",
    description: "A numbered sequence, such as how a project runs.",
    fields: [
      heading(),
      intro,
      {
        key: "items",
        label: "Steps",
        kind: "list",
        itemLabel: "Step",
        min: 2,
        max: 8,
        item: [
          { key: "when", label: "When", kind: "text", max: 30 },
          { key: "title", label: "Title", kind: "text", required: true, max: 60 },
          { key: "text", label: "Text", kind: "textarea", max: 300 },
        ],
      },
    ],
  },
  {
    type: "quote",
    name: "Quote",
    description: "A client quote with the person's name and role.",
    fields: [
      { key: "text", label: "Quote", kind: "textarea", required: true, max: 400 },
      { key: "name", label: "Name", kind: "plain", required: true, max: 60 },
      { key: "role", label: "Role", kind: "text", max: 80 },
    ],
  },
  {
    type: "pageList",
    name: "Page list",
    description: "Lists case studies or journal posts automatically.",
    fields: [heading(), intro, { key: "kind", label: "Show", kind: "select", options: ["case", "post"] }, { key: "limit", label: "How many", kind: "select", options: ["3", "6", "all"] }],
  },
  {
    type: "facts",
    name: "Facts",
    description: "Label and value pairs, such as a case study's client, sector and duration.",
    fields: [
      {
        key: "items",
        label: "Facts",
        kind: "list",
        itemLabel: "Fact",
        min: 1,
        max: 8,
        item: [
          { key: "label", label: "Label", kind: "text", required: true, max: 30 },
          { key: "value", label: "Value", kind: "text", required: true, max: 80 },
        ],
      },
    ],
  },
  {
    type: "cta",
    name: "Call to action",
    description: "A closing band with one button.",
    fields: [heading(), intro, { key: "button", label: "Button", kind: "link" }],
  },
  {
    type: "contact",
    name: "Contact",
    description: "Contact details and an enquiry form.",
    fields: [
      heading(),
      intro,
      { key: "email", label: "Email", kind: "plain", required: true, max: 80 },
      { key: "phone", label: "Phone", kind: "plain", max: 40 },
      { key: "address", label: "Address", kind: "textarea", max: 200 },
    ],
  },
];

export const blockDef = (type: string) => BLOCKS.find((b) => b.type === type);

export type Block = { id: string; type: string; data: Record<string, unknown> };
export type PageKind = "page" | "case" | "post";
export type Page = {
  id: string;
  kind: PageKind;
  /** URL segment; "" for the home page. Case studies live under /work/, posts under /journal/. */
  slug: string;
  title: Text;
  summary: Text;
  /** ISO date, for posts and case studies. */
  date?: string;
  blocks: Block[];
};
export type NavItem = { label: Text; page: string };
export type Site = {
  version: 1;
  name: string;
  ticker: Text[];
  nav: NavItem[];
  footer: Text;
  pages: Page[];
};

// ---------- reading ----------

export function t(text: Text | undefined, lang: Lang): string {
  if (!text) return "";
  return (lang !== "en" && text[lang]?.trim()) || text.en;
}

export function pagePath(page: Pick<Page, "kind" | "slug">, lang: Lang): string {
  const base = page.kind === "case" ? "work/" : page.kind === "post" ? "journal/" : "";
  return `/${lang}/${base}${page.slug}`.replace(/\/$/, "") || `/${lang}`;
}

/** Find the page for a path like /de/work/freight. Returns null for unknown paths. */
export function resolvePath(site: Site, path: string): { lang: Lang; page: Page } | null {
  const parts = path.split("/").filter(Boolean);
  const lang = parts[0] as Lang;
  if (!LANGS.includes(lang)) return null;
  const rest = parts.slice(1);
  const kind: PageKind = rest[0] === "work" && rest.length === 2 ? "case" : rest[0] === "journal" && rest.length === 2 ? "post" : "page";
  const slug = kind === "page" ? rest.join("/") : rest[1];
  const page = site.pages.find((p) => p.kind === kind && p.slug === slug);
  return page ? { lang, page } : null;
}

// ---------- validation ----------

/** `fatal` marks data the renderer cannot use; the rest are content mistakes such as empty required text. */
export type Problem = { path: string; message: string; fatal?: true };

const isText = (v: unknown): v is Text => !!v && typeof v === "object" && typeof (v as Text).en === "string";

function checkField(f: Field, v: unknown, path: string, out: Problem[]) {
  const where = `${path}.${f.key}`;
  if (f.kind === "text" || f.kind === "textarea") {
    if (v === undefined) {
      if (f.required) out.push({ path: where, message: `${f.label} is required` });
      return;
    }
    if (!isText(v)) return void out.push({ path: where, message: `${f.label} must be translatable text`, fatal: true });
    if (f.required && !v.en.trim()) out.push({ path: where, message: `${f.label} is required` });
    for (const l of LANGS) {
      const s = v[l];
      if (s !== undefined && typeof s !== "string") out.push({ path: `${where}.${l}`, message: `${f.label} (${l}) must be text`, fatal: true });
      else if (f.max && s && s.length > f.max) out.push({ path: `${where}.${l}`, message: `${f.label} (${l}) is longer than ${f.max} characters` });
    }
  } else if (f.kind === "plain") {
    if (v === undefined || v === "") {
      if (f.required) out.push({ path: where, message: `${f.label} is required` });
    } else if (typeof v !== "string") out.push({ path: where, message: `${f.label} must be text`, fatal: true });
    else if (f.max && v.length > f.max) out.push({ path: where, message: `${f.label} is longer than ${f.max} characters` });
  } else if (f.kind === "link") {
    if (v === undefined) return;
    const l = v as Link;
    if (!l || !isText(l.label) || typeof l.href !== "string") out.push({ path: where, message: `${f.label} needs a label and a target`, fatal: true });
    else if (!/^(\/|https?:\/\/|mailto:)/.test(l.href)) out.push({ path: where, message: `${f.label} target must start with /, http(s):// or mailto:` });
  } else if (f.kind === "select") {
    if (v !== undefined && !f.options.includes(v as string)) out.push({ path: where, message: `${f.label} must be one of ${f.options.join(", ")}` });
  } else if (f.kind === "list") {
    const list = v ?? [];
    if (!Array.isArray(list)) return void out.push({ path: where, message: `${f.label} must be a list`, fatal: true });
    if (f.min !== undefined && list.length < f.min) out.push({ path: where, message: `${f.label} needs at least ${f.min}` });
    if (f.max !== undefined && list.length > f.max) out.push({ path: where, message: `${f.label} allows at most ${f.max}` });
    list.forEach((item, i) => {
      if (!item || typeof item !== "object") return void out.push({ path: `${where}[${i}]`, message: `${f.itemLabel} ${i + 1} is not an object`, fatal: true });
      for (const sub of f.item) checkField(sub, (item as Record<string, unknown>)[sub.key], `${where}[${i}]`, out);
    });
  }
}

export function validateBlock(b: Block, path = "block"): Problem[] {
  const out: Problem[] = [];
  const def = blockDef(b.type);
  if (!def) return [{ path, message: `Unknown block type "${b.type}"`, fatal: true }];
  if (!b.data || typeof b.data !== "object") return [{ path, message: "Block has no data", fatal: true }];
  for (const f of def.fields) checkField(f, b.data[f.key], `${path}`, out);
  return out;
}

/** Everything wrong with a site, as readable messages. An empty list means it is valid. */
export function validateSite(s: unknown): Problem[] {
  const out: Problem[] = [];
  const site = s as Site;
  if (!site || typeof site !== "object" || site.version !== 1) return [{ path: "site", message: "Not a Northfold site file (version 1)", fatal: true }];
  if (!Array.isArray(site.pages)) return [{ path: "site.pages", message: "Pages must be a list", fatal: true }];
  const ids = new Set<string>(), paths = new Set<string>();
  site.pages.forEach((p, i) => {
    const at = `pages[${i}]`;
    if (!p || typeof p.id !== "string") return void out.push({ path: at, message: "Page needs an id", fatal: true });
    if (ids.has(p.id)) out.push({ path: at, message: `Duplicate page id "${p.id}"` });
    ids.add(p.id);
    if (!["page", "case", "post"].includes(p.kind)) out.push({ path: at, message: `Unknown page kind "${p.kind}"` });
    if (typeof p.slug !== "string" || !/^[a-z0-9-]*(\/[a-z0-9-]+)*$/.test(p.slug)) out.push({ path: `${at}.slug`, message: "Slug may only use a-z, 0-9 and -" });
    else {
      const key = pagePath(p, "en");
      if (paths.has(key)) out.push({ path: `${at}.slug`, message: `Two pages share the address ${key}` });
      paths.add(key);
    }
    if (!isText(p.title) || !p.title.en.trim()) out.push({ path: `${at}.title`, message: "Page title is required" });
    if (!Array.isArray(p.blocks)) return void out.push({ path: `${at}.blocks`, message: "Blocks must be a list", fatal: true });
    const blockIds = new Set<string>();
    p.blocks.forEach((b, j) => {
      if (blockIds.has(b?.id)) out.push({ path: `${at}.blocks[${j}]`, message: `Duplicate block id "${b.id}"` });
      blockIds.add(b?.id);
      out.push(...validateBlock(b, `${at}.blocks[${j}]`));
    });
  });
  (site.nav ?? []).forEach((n, i) => {
    if (!ids.has(n.page)) out.push({ path: `nav[${i}]`, message: `Navigation points to a missing page "${n.page}"` });
  });
  return out;
}

// ---------- translation coverage ----------

/** Every translatable string in a value, with its path. */
export function texts(v: unknown, path = ""): { path: string; text: Text }[] {
  if (isText(v) && Object.keys(v).every((k) => (LANGS as readonly string[]).includes(k))) return [{ path, text: v }];
  if (Array.isArray(v)) return v.flatMap((x, i) => texts(x, `${path}[${i}]`));
  if (v && typeof v === "object") return Object.entries(v).flatMap(([k, x]) => (k === "id" || k === "type" ? [] : texts(x, path ? `${path}.${k}` : k)));
  return [];
}

/** Strings with English but no translation in `lang`. */
export function missing(v: unknown, lang: Lang): { path: string; text: Text }[] {
  if (lang === "en") return [];
  return texts(v).filter(({ text }) => text.en.trim() && !text[lang]?.trim());
}

// ---------- editing helpers ----------

export const newId = () => Math.random().toString(36).slice(2, 10);

/** Empty data for a new block, with list fields at their minimum length. */
export function emptyData(fields: Field[]): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.kind === "text" || f.kind === "textarea") data[f.key] = { en: "" };
    else if (f.kind === "plain") data[f.key] = "";
    else if (f.kind === "link") data[f.key] = { label: { en: "" }, href: "/" };
    else if (f.kind === "select") data[f.key] = f.options[0];
    else if (f.kind === "list") data[f.key] = Array.from({ length: f.min ?? 1 }, () => emptyData(f.item));
  }
  return data;
}

export function newBlock(type: string): Block {
  const def = blockDef(type);
  if (!def) throw new Error(`unknown block type ${type}`);
  return { id: newId(), type, data: emptyData(def.fields) };
}
