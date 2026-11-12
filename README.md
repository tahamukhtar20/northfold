# Northfold

The website of a fictional software studio, built on a small block-based content system with its own editor. Every page is typed data; the same renderer produces the static site, the editor's live preview and the server-side prerender.

Live at [northfold.tahamukhtar.com](https://northfold.tahamukhtar.com). Press "Edit this page" on any page to open the editor.

This is an anonymised client project. The original 2023 build was an agency site in Next.js with English and German; this version keeps the bilingual setup and dark mode, replaces the placeholder content with a fictional studio, and turns the content model into the project itself.

## Content model

`src/content/schema.ts` describes ten block types (hero, key figures, cards, text, steps, quote, page list, facts, call to action, contact) as field lists. The renderer, the editor's forms and the validator all read the same descriptions, so adding a block type is one entry.

- Text is translatable: `{ "en": "…", "de": "…" }`. English is required; German falls back to English and missing translations are reported by path.
- Validation separates content mistakes (an empty required heading, a slug used twice, a link target that is not `/`, `http(s)://` or `mailto:`) from structural ones that would stop a page from rendering.
- Pages are ordinary pages, case studies (`/work/…`) or journal posts (`/journal/…`).

## Editor

`/edit` opens the editor on any page:

- Blocks can be added, duplicated, deleted and reordered by dragging or with Alt+Arrow keys.
- The preview runs in an iframe at real widths (desktop, tablet, phone) and in light or dark; clicking a block in the preview selects it.
- Forms are generated from the schema, with English and German side by side, length limits and inline problems.
- Undo and redo (Ctrl+Z, Ctrl+Shift+Z) merge typing in one field into one step.
- Edits autosave to the browser. The public pages then show those edits with a banner, until they are hidden or discarded.
- A list of every text without a German version links straight to it.
- The whole site exports to JSON and imports back, with validation.

Nothing is sent to a server; the published site always comes from `src/content/site.json`.

## The site

- Every page and language is prerendered to static HTML at build time (`src/entry-server.tsx`, `scripts/prerender.mjs`) and hydrated in the browser.
- The home page's animation shows bookings travelling from depots into a hub, with a live feed and counters (`src/site/HeroVisual.tsx`).
- Sections reveal on scroll, figures count up and cards follow the pointer (`src/site/motion.ts`). With reduced motion or without JavaScript, everything is visible and still.

## Development

```bash
npm install
npm test            # schema, validation, paths, editor operations, undo
npm run dev         # http://localhost:4470 (client-rendered)
npm run build       # type-check, build, prerender into dist/
npx wrangler dev    # serve dist/ as it is deployed
npx wrangler deploy
```

## License

[MIT](LICENSE)
