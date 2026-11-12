// Server-side render of one public page, used by scripts/prerender.mjs at build time.
import { renderToString } from "react-dom/server";
import published from "./content/site.json";
import { LANGS, pagePath } from "./content/schema.ts";
import type { Site } from "./content/schema.ts";
import { SitePage, pageTitle } from "./site/SitePage.tsx";

const site = published as unknown as Site;

export function render(path: string) {
  const html = renderToString(<SitePage site={site} path={path} />);
  return { html, ...pageTitle(site, path) };
}

/** Every public path, in every language. */
export function paths(): string[] {
  return site.pages.flatMap((p) => LANGS.map((l) => pagePath(p, l)));
}
