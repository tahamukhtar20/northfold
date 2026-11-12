import { StrictMode, lazy, Suspense } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import published from "./content/site.json";
import type { Site } from "./content/schema.ts";
import { SiteClient } from "./site/SitePage.tsx";
import "./styles/site.css";

const site = published as unknown as Site;
const root = document.getElementById("root")!;
const path = location.pathname.replace(/\/+$/, "") || "/";

// The editor is a separate chunk, so the public pages stay small.
const Editor = lazy(() => import("./editor/Editor.tsx"));
const Preview = lazy(() => import("./editor/Preview.tsx"));

if (path === "/edit" || path === "/preview") {
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={null}>{path === "/edit" ? <Editor published={site} /> : <Preview />}</Suspense>
    </StrictMode>,
  );
} else if (path === "/") {
  // The root only picks a language.
  location.replace(navigator.language?.toLowerCase().startsWith("de") ? "/de" : "/en");
} else {
  const app = (
    <StrictMode>
      <SiteClient published={site} path={path} />
    </StrictMode>
  );
  // Prerendered pages hydrate; in development there is nothing to hydrate.
  if (root.firstElementChild) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
