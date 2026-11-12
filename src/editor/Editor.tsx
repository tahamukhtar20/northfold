// The block editor: page picker, block list, live preview and field inspector,
// with undo/redo, autosave to this browser, translation status and JSON import/export.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, ExternalLink, FilePlus2, Languages, Monitor, Moon, Redo2, RotateCcw, Smartphone, Sun, Tablet, Undo2, Upload, X } from "lucide-react";
import { missing, pagePath, t, validateSite } from "../content/schema.ts";
import type { Lang, PageKind, Site } from "../content/schema.ts";
import { clearDraft, loadDraft, saveDraft } from "../content/draft.ts";
import { Logo } from "../site/Layout.tsx";
import { createHistory, push, redo, undo } from "./history.ts";
import { addBlock, addPage, duplicateBlock, moveBlock, moveItem, removeBlock, removePage, setBlockField, setPageField } from "./ops.ts";
import type { Key } from "./ops.ts";
import { BlockInspector, PageInspector } from "./Inspector.tsx";
import { Modal } from "./Modal.tsx";
import { Outline } from "./Outline.tsx";
import type { FromPreview, ToPreview } from "./Preview.tsx";
import "../styles/editor.css";

const DEVICES = { desktop: { w: null, icon: Monitor, label: "Desktop" }, tablet: { w: 820, icon: Tablet, label: "Tablet" }, phone: { w: 390, icon: Smartphone, label: "Phone" } } as const;
type Device = keyof typeof DEVICES;
type Panel = "blocks" | "preview" | "edit";

function readParams(site: Site) {
  const q = new URLSearchParams(location.search);
  const page = site.pages.some((p) => p.id === q.get("page")) ? q.get("page")! : "home";
  const lang: Lang = q.get("lang") === "de" ? "de" : "en";
  return { page, lang };
}

function ago(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 5) return "just now";
  if (s < 60) return `${s} s ago`;
  const m = Math.round(s / 60);
  return m < 60 ? `${m} min ago` : `${Math.round(m / 60)} h ago`;
}

export default function Editor({ published }: { published: Site }) {
  const initial = useMemo(() => loadDraft(), []);
  const [hist, setHist] = useState(() => createHistory(initial?.site ?? published));
  const site = hist.present;
  const [{ page: pageId, lang }, setView] = useState(() => readParams(initial?.site ?? published));
  const [selected, setSelected] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [theme, setTheme] = useState<"light" | "dark">(() => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"));
  const [panel, setPanel] = useState<Panel>("preview");
  const [savedAt, setSavedAt] = useState<number | null>(initial?.savedAt ?? null);
  const [now, setNow] = useState(Date.now());
  const [notice, setNotice] = useState<{ kind: "ok" | "bad"; text: string; detail?: string[] } | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);
  const [confirm, setConfirm] = useState<"reset" | "deletePage" | null>(null);
  const [newPage, setNewPage] = useState<{ kind: PageKind; title: string } | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const ready = useRef(false);
  const scrollNext = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const page = site.pages.find((p) => p.id === pageId) ?? site.pages[0];
  const block = page.blocks.find((b) => b.id === selected) ?? null;

  // The editor chrome follows the theme the person chose for the preview.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.title = `Editing ${t(page.title, "en")} · Northfold`;
  }, [theme, page]);

  // Keep the address in sync so a reload or a shared link opens the same page.
  useEffect(() => {
    history.replaceState(null, "", `/edit?page=${encodeURIComponent(page.id)}&lang=${lang}`);
  }, [page.id, lang]);

  // Autosave a moment after typing stops: only real changes are written, and a site that
  // matches the published one again (say, after undoing everything) removes the draft.
  const publishedJson = useMemo(() => JSON.stringify(published), [published]);
  const lastSaved = useRef<string | null>(initial ? JSON.stringify(initial.site) : null);
  useEffect(() => {
    const id = setTimeout(() => {
      const json = JSON.stringify(site);
      if (json === (lastSaved.current ?? publishedJson)) return;
      try {
        if (json === publishedJson) {
          clearDraft();
          lastSaved.current = null;
          setSavedAt(null);
        } else {
          setSavedAt(saveDraft(site));
          lastSaved.current = json;
        }
      } catch {
        setNotice({ kind: "bad", text: "Could not save in this browser. Export the JSON to keep your work." });
      }
    }, 400);
    return () => clearTimeout(id);
  }, [site, publishedJson]);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!notice || notice.detail) return;
    const id = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(id);
  }, [notice]);

  const commit = useCallback((next: Site, group: string | null = null) => setHist((h) => push(h, next, group)), []);
  const doUndo = useCallback(() => setHist((h) => undo(h)), []);
  const doRedo = useCallback(() => setHist((h) => redo(h)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      // Inside a dialog, Ctrl+Z belongs to the text field, not to the site's history.
      if (!mod || (e.target as Element).closest?.("[role=dialog]")) return;
      const k = e.key.toLowerCase();
      if (k === "z" && !e.shiftKey) (e.preventDefault(), doUndo());
      else if ((k === "z" && e.shiftKey) || k === "y") (e.preventDefault(), doRedo());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doUndo, doRedo]);

  // If undo removes the selected block or page, fall back gracefully.
  useEffect(() => {
    if (selected && !page.blocks.some((b) => b.id === selected)) setSelected(null);
  }, [page, selected]);
  useEffect(() => {
    if (!site.pages.some((p) => p.id === pageId)) setView((v) => ({ ...v, page: "home" }));
  }, [site, pageId]);

  // ---------- preview ----------
  const send = useCallback(() => {
    const w = frame.current?.contentWindow;
    if (!w || !ready.current) return;
    const msg: ToPreview = { type: "render", site, pageId: page.id, lang, selected, theme, scroll: scrollNext.current };
    scrollNext.current = false;
    w.postMessage(msg, location.origin);
  }, [site, page.id, lang, selected, theme]);
  useEffect(send, [send]);
  useEffect(() => {
    const onMessage = (e: MessageEvent<FromPreview>) => {
      if (e.origin !== location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "ready") {
        ready.current = true;
        send();
      } else if (e.data?.type === "select") {
        setSelected(e.data.id);
        setPanel((p) => (p === "preview" ? "edit" : p));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [send]);

  const select = (id: string | null) => {
    scrollNext.current = true;
    setSelected(id);
  };

  // ---------- edits ----------
  /** `merge` is false for structural edits (adding or removing list items), which are always their own undo step. */
  const onField = (path: Key[], value: unknown, merge = true) => {
    if (!block) return;
    commit(setBlockField(site, page.id, block.id, path, value), merge ? `${block.id}:${path.join(".")}` : null);
  };
  const onItemMove = (listPath: Key[], from: number, to: number) => block && commit(moveItem(site, page.id, block.id, listPath, from, to));
  const onAdd = (type: string) => {
    const at = selected ? page.blocks.findIndex((b) => b.id === selected) + 1 : page.blocks.length;
    const [next, id] = addBlock(site, page.id, type, at);
    commit(next);
    select(id);
    setPanel("edit");
  };

  const goPage = (id: string, l: Lang = lang) => {
    setView({ page: id, lang: l });
    setSelected(null);
    setConfirm(null);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(site, null, 1)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "northfold-site.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  const importJson = async (file: File | undefined) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const problems = validateSite(data);
      const fatal = problems.filter((p) => p.fatal);
      if (fatal.length) return setNotice({ kind: "bad", text: "That file is not a usable Northfold site.", detail: fatal.slice(0, 8).map((p) => `${p.path}: ${p.message}`) });
      commit(data as Site);
      goPage((data as Site).pages.some((p) => p.id === page.id) ? page.id : "home");
      setNotice({ kind: "ok", text: problems.length ? `Imported, with ${problems.length} things to fix.` : "Imported." });
    } catch {
      setNotice({ kind: "bad", text: "That file is not valid JSON." });
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };
  const reset = () => {
    clearDraft();
    lastSaved.current = null;
    setHist(createHistory(published));
    setSavedAt(null);
    setConfirm(null);
    goPage(published.pages.some((p) => p.id === page.id) ? page.id : "home");
    setNotice({ kind: "ok", text: "Back to the published site. Your edits were removed from this browser." });
  };
  const createPage = () => {
    if (!newPage?.title.trim()) return;
    const [next, id] = addPage(site, newPage.kind, newPage.title.trim());
    commit(next);
    setNewPage(null);
    goPage(id);
  };

  // ---------- translation status ----------
  const untranslated = useMemo(
    () =>
      site.pages.flatMap((p) =>
        missing({ title: p.title, summary: p.summary }, "de")
          .map((m) => ({ page: p, block: null as string | null, path: m.path, en: m.text.en }))
          .concat(p.blocks.flatMap((b) => missing(b.data, "de").map((m) => ({ page: p, block: b.id, path: m.path, en: m.text.en })))),
      ),
    [site],
  );
  const pageUntranslated = untranslated.filter((u) => u.page.id === page.id).length;
  const problems = useMemo(() => validateSite(site), [site]);
  const groups: [PageKind, string][] = [
    ["page", "Pages"],
    ["case", "Case studies"],
    ["post", "Journal"],
  ];
  const dw = DEVICES[device].w;

  return (
    <div className={`editor panel-${panel}`}>
      <header className="ebar">
        <a className="elogo" href={pagePath(page, lang)} title="Back to the site">
          <Logo name="Northfold" />
          <span className="muted">Editor</span>
        </a>
        <label className="sr" htmlFor="page-pick">
          Page
        </label>
        <select id="page-pick" className="page-pick" value={page.id} onChange={(e) => goPage(e.target.value)}>
          {groups.map(([kind, label]) => (
            <optgroup key={kind} label={label}>
              {site.pages
                .filter((p) => p.kind === kind)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {t(p.title, "en") || "(untitled)"}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <button type="button" className="eicon" onClick={() => setNewPage({ kind: "page", title: "" })} aria-label="New page" title="New page">
          <FilePlus2 size={16} />
        </button>
        <div className="seg" role="group" aria-label="Preview language">
          {(["en", "de"] as const).map((l) => (
            <button key={l} type="button" className={l === lang ? "on" : ""} aria-pressed={l === lang} onClick={() => setView((v) => ({ ...v, lang: l }))}>
              {l.toUpperCase()}
              {l === "de" && pageUntranslated > 0 && <i className="dot warn" aria-label={`${pageUntranslated} not translated on this page`} />}
            </button>
          ))}
        </div>
        <div className="sp" />
        <span className="saved" aria-live="polite">
          {savedAt ? `Saved in this browser · ${ago(now - savedAt)}` : "Published version"}
        </span>
        <button type="button" className="eicon" onClick={doUndo} disabled={!hist.past.length} aria-label="Undo" title="Undo (Ctrl+Z)">
          <Undo2 size={16} />
        </button>
        <button type="button" className="eicon" onClick={doRedo} disabled={!hist.future.length} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">
          <Redo2 size={16} />
        </button>
        <button type="button" className="ebtn line hide-md" onClick={() => setShowTranslations(true)}>
          <Languages size={15} aria-hidden /> German <span className="count">{untranslated.length}</span>
        </button>
        <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(e) => importJson(e.target.files?.[0])} />
        <button type="button" className="eicon" onClick={() => fileInput.current?.click()} aria-label="Import JSON" title="Import JSON">
          <Upload size={16} />
        </button>
        <button type="button" className="eicon" onClick={exportJson} aria-label="Export JSON" title="Export JSON">
          <Download size={16} />
        </button>
        <button type="button" className="eicon" onClick={() => setConfirm("reset")} disabled={!savedAt} aria-label="Discard local edits" title="Discard local edits">
          <RotateCcw size={16} />
        </button>
        <a className="ebtn" href={pagePath(page, lang)} target="_blank" rel="noopener">
          View site <ExternalLink size={14} aria-hidden />
        </a>
      </header>

      <nav className="tabs" aria-label="Editor panels">
        {(["blocks", "preview", "edit"] as const).map((p) => (
          <button key={p} type="button" className={panel === p ? "on" : ""} aria-pressed={panel === p} onClick={() => setPanel(p)}>
            {p === "blocks" ? "Blocks" : p === "preview" ? "Preview" : "Edit"}
          </button>
        ))}
      </nav>

      <main className="ebody">
        <aside className="outline" aria-label="Blocks">
          <Outline
            page={page}
            selected={selected}
            onSelect={(id) => {
              select(id);
              setPanel("edit");
            }}
            onMove={(from, to) => commit(moveBlock(site, page.id, from, to))}
            onAdd={onAdd}
            onDuplicate={(id) => {
              const [next, nid] = duplicateBlock(site, page.id, id);
              commit(next);
              select(nid);
            }}
            onRemove={(id) => {
              commit(removeBlock(site, page.id, id));
              setSelected(null);
              setNotice({ kind: "ok", text: "Block deleted. Undo brings it back." });
            }}
          />
        </aside>

        <section className="canvas" aria-label="Preview">
          <div className="canvas-bar">
            <div className="seg" role="group" aria-label="Preview width">
              {(Object.keys(DEVICES) as Device[]).map((d) => {
                const Icon = DEVICES[d].icon;
                return (
                  <button key={d} type="button" className={d === device ? "on" : ""} aria-pressed={d === device} onClick={() => setDevice(d)} title={DEVICES[d].label}>
                    <Icon size={15} aria-hidden /> <span className="hide-md">{DEVICES[d].label}</span>
                  </button>
                );
              })}
            </div>
            <span className="url mono">{`northfold.tahamukhtar.com${pagePath(page, lang)}`}</span>
            <button type="button" className="eicon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Light preview" : "Dark preview"} title="Light or dark">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <div className="frame-wrap">
            <iframe
              ref={frame}
              title="Page preview"
              src="/preview"
              style={{ width: dw ? `${dw}px` : "100%" }}
              onLoad={() => frame.current?.contentWindow?.postMessage({ type: "ping" }, location.origin)}
            />
          </div>
        </section>

        <aside className="insp" aria-label="Edit">
          {block ? (
            <BlockInspector key={block.id} block={block} onChange={onField} onMove={onItemMove} />
          ) : (
            <PageInspector
              site={site}
              page={page}
              onChange={(path, value) => commit(setPageField(site, page.id, path, value), `page:${page.id}:${path.join(".")}`)}
              confirmingDelete={confirm === "deletePage"}
              setConfirmingDelete={(v) => setConfirm(v ? "deletePage" : null)}
              onDelete={() => {
                commit(removePage(site, page.id));
                goPage("home");
                setNotice({ kind: "ok", text: "Page deleted. Undo brings it back." });
              }}
            />
          )}
          {problems.length > 0 && (
            <p className="site-problems">
              {problems.length === 1 ? "1 problem" : `${problems.length} problems`} across the site.{" "}
              <button type="button" className="linklike" onClick={() => setNotice({ kind: "bad", text: "Problems across the site", detail: problems.slice(0, 12).map((p) => `${p.path}: ${p.message}`) })}>
                Show
              </button>
            </p>
          )}
        </aside>
      </main>

      {notice && (
        <div className={`toast ${notice.kind}`} role="status">
          <div>
            <b>{notice.text}</b>
            {notice.detail && (
              <ul>
                {notice.detail.map((d) => (
                  <li key={d} className="mono">
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="button" className="mini" aria-label="Close" onClick={() => setNotice(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {confirm === "reset" && (
        <Modal labelledBy="reset-title" onClose={() => setConfirm(null)}>
            <h2 id="reset-title">Discard your local edits?</h2>
            <p>The editor goes back to the published site and your edits are removed from this browser. Export the JSON first if you want to keep them.</p>
            <div className="row">
              <button type="button" className="ebtn danger-btn" onClick={reset} data-autofocus>
                Discard edits
              </button>
              <button type="button" className="ebtn line" onClick={exportJson}>
                Export JSON first
              </button>
              <button type="button" className="ebtn line" onClick={() => setConfirm(null)}>
                Cancel
              </button>
            </div>
        </Modal>
      )}

      {newPage && (
        <Modal labelledBy="new-title" onClose={() => setNewPage(null)} onSubmit={createPage}>
            <h2 id="new-title">New page</h2>
            <div className="seg wide" role="group" aria-label="Kind of page">
              {groups.map(([kind, label]) => (
                <button key={kind} type="button" className={newPage.kind === kind ? "on" : ""} aria-pressed={newPage.kind === kind} onClick={() => setNewPage({ ...newPage, kind })}>
                  {label.replace(/s$/, "").replace("Journal", "Journal post")}
                </button>
              ))}
            </div>
            <label className="field">
              <span className="field-head">Title</span>
              <input data-autofocus value={newPage.title} maxLength={90} onChange={(e) => setNewPage({ ...newPage, title: e.target.value })} />
            </label>
            <div className="row">
              <button type="submit" className="ebtn" disabled={!newPage.title.trim()}>
                Create page
              </button>
              <button type="button" className="ebtn line" onClick={() => setNewPage(null)}>
                Cancel
              </button>
            </div>
        </Modal>
      )}

      {showTranslations && (
        <Modal labelledBy="tr-title" wide onClose={() => setShowTranslations(false)}>
            <div className="modal-head">
              <h2 id="tr-title">German translation</h2>
              <button type="button" className="mini" aria-label="Close" onClick={() => setShowTranslations(false)}>
                <X size={14} />
              </button>
            </div>
            {untranslated.length === 0 ? (
              <p>Everything is translated. New text you add will show up here until it has a German version.</p>
            ) : (
              <>
                <p>{untranslated.length} texts have no German version yet; German pages show the English text in their place.</p>
                <ul className="tr-list">
                  {untranslated.map((u, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => {
                          goPage(u.page.id, "de");
                          if (u.block) select(u.block);
                          setPanel("edit");
                          setShowTranslations(false);
                        }}
                      >
                        <span className="tr-page">{t(u.page.title, "en")}</span>
                        <span className="tr-text">{u.en}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
        </Modal>
      )}
    </div>
  );
}
