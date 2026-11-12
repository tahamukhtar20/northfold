// A whole public page for a path, used by the prerenderer and the browser alike.
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_LANG, LANGS, resolvePath, t } from "../content/schema.ts";
import type { Lang, Site } from "../content/schema.ts";
import { loadDraft } from "../content/draft.ts";
import { PageBlocks } from "./Blocks.tsx";
import { Layout } from "./Layout.tsx";
import { UI_TEXT } from "./ui.ts";

export function pageTitle(site: Site, path: string): { title: string; description: string; lang: Lang; found: boolean } {
  const r = resolvePath(site, path);
  if (!r) {
    const lang = (LANGS as readonly string[]).includes(path.split("/")[1]) ? (path.split("/")[1] as Lang) : DEFAULT_LANG;
    return { title: `${UI_TEXT[lang].notFoundTitle} · ${site.name}`, description: "", lang, found: false };
  }
  const { page, lang } = r;
  const title = page.kind === "page" && page.slug === "" ? site.name : `${t(page.title, lang)} · ${site.name}`;
  return { title, description: t(page.summary, lang), lang, found: true };
}

export function SitePage({ site, path, banner }: { site: Site; path: string; banner?: ReactNode }) {
  const r = resolvePath(site, path);
  const lang = r?.lang ?? pageTitle(site, path).lang;
  if (!r) {
    const ui = UI_TEXT[lang];
    return (
      <Layout site={site} page={null} lang={lang} banner={banner}>
        <section className="hero">
          <h1>{ui.notFoundTitle}</h1>
          <p className="lead">{ui.notFoundBody}</p>
          <div className="actions">
            <a className="btn" href={`/${lang}`}>
              {ui.home}
            </a>
          </div>
        </section>
      </Layout>
    );
  }
  return (
    <Layout site={site} page={r.page} lang={lang} banner={banner}>
      <PageBlocks site={site} page={r.page} lang={lang} />
    </Layout>
  );
}

const HIDE_KEY = "northfold.hideDraft";

/**
 * In the browser: first render exactly what was prerendered (so hydration matches),
 * then switch to the visitor's local edits from the editor, if there are any.
 */
export function SiteClient({ published, path }: { published: Site; path: string }) {
  const [draft, setDraft] = useState<Site | null>(null);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setDraft(loadDraft()?.site ?? null);
    try {
      setHidden(sessionStorage.getItem(HIDE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);
  const site = draft && !hidden ? draft : published;
  useEffect(() => {
    document.title = pageTitle(site, path).title;
  }, [site, path]);
  const lang = pageTitle(site, path).lang;
  const ui = UI_TEXT[lang];
  const pageId = resolvePath(site, path)?.page.id ?? "home";
  // Hiding the edits lasts for this tab only; the draft itself is never deleted from here.
  const setHide = (v: boolean) => {
    setHidden(v);
    try {
      if (v) sessionStorage.setItem(HIDE_KEY, "1");
      else sessionStorage.removeItem(HIDE_KEY);
    } catch {
      /* ignore */
    }
  };
  const banner = draft ? (
    <div className="draft-bar" role="status">
      <span>{hidden ? ui.draftHidden : ui.draftBanner}</span>
      <a href={`/edit?page=${encodeURIComponent(pageId)}&lang=${lang}`}>{ui.draftOpen}</a>
      <button type="button" onClick={() => setHide(!hidden)}>
        {hidden ? ui.draftShow : ui.draftDiscard}
      </button>
    </div>
  ) : null;
  return <SitePage site={site} path={path} banner={banner} />;
}
