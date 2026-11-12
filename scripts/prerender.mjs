// Writes a static HTML file for every page and language into dist/, plus the editor shells,
// a root page that picks a language, and a 404 page.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { render, paths } = await import(join(root, "dist-server", "entry-server.js"));
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function page({ html, title, description, lang }) {
  return template
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace("<title>Northfold</title>", `<title>${esc(title)}</title>`)
    .replace('<meta name="description" content="" />', `<meta name="description" content="${esc(description)}" />`)
    .replace("<!--app-->", html);
}
function write(path, html) {
  const file = join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

let n = 0;
for (const p of paths()) {
  write(p, page(render(p)));
  n++;
}
// Shells rendered in the browser.
write("edit", page({ html: "", title: "Editor · Northfold", description: "Edit the Northfold site.", lang: "en" }));
write("preview", page({ html: "", title: "Preview · Northfold", description: "", lang: "en" }));
// The root picks English or German in the browser; without JavaScript it links both.
write("", page({ html: '<p style="padding:40px;font-family:sans-serif"><a href="/en">English</a> · <a href="/de">Deutsch</a></p>', title: "Northfold", description: "", lang: "en" }));
// Cloudflare serves the nearest 404.html, so each language gets its own.
writeFileSync(join(dist, "404.html"), page(render("/en/__missing__")));
for (const l of ["en", "de"]) writeFileSync(join(dist, l, "404.html"), page(render(`/${l}/__missing__`)));
rmSync(join(root, "dist-server"), { recursive: true, force: true });
console.log(`prerendered ${n} pages`);
