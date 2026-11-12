// Right-hand panel: the selected block's fields, or the page's own settings.
import { useMemo } from "react";
import { Trash2 } from "lucide-react";
import { blockDef, missing, validateBlock } from "../content/schema.ts";
import type { Block, Page, Site, Text } from "../content/schema.ts";
import { FieldEditor } from "./Fields.tsx";
import type { Change } from "./Fields.tsx";
import type { Key } from "./ops.ts";
import { uniqueSlug } from "./ops.ts";

type BlockProps = { block: Block; onChange: Change; onMove: (listPath: Key[], from: number, to: number) => void };

export function BlockInspector({ block, onChange, onMove }: BlockProps) {
  const def = blockDef(block.type);
  if (!def) return <p className="hint bad">Unknown block type "{block.type}".</p>;
  const problems = validateBlock(block);
  const untranslated = missing(block.data, "de").length;
  return (
    <div className="insp-body">
      <div className="insp-title">
        <h2>{def.name}</h2>
        <span className="mono tag">{def.type}</span>
      </div>
      <p className="hint">{def.description}</p>
      {(problems.length > 0 || untranslated > 0) && (
        <div className="status-row">
          {problems.length > 0 && <span className="pill bad">{problems.length === 1 ? "1 problem" : `${problems.length} problems`}</span>}
          {untranslated > 0 && <span className="pill warn">{untranslated} not in German</span>}
        </div>
      )}
      {def.fields.map((f) => (
        <FieldEditor key={f.key} field={f} value={block.data[f.key]} path={[f.key]} onChange={onChange} onMove={onMove} problems={problems} idBase={block.id} />
      ))}
      <details className="raw">
        <summary>Block data (JSON)</summary>
        <pre className="mono">{JSON.stringify(block, null, 2)}</pre>
      </details>
    </div>
  );
}

type PageProps = {
  site: Site;
  page: Page;
  onChange: (path: Key[], value: unknown) => void;
  onDelete: () => void;
  confirmingDelete: boolean;
  setConfirmingDelete: (v: boolean) => void;
};

function TextPair({ id, label, value, onChange, textarea, max }: { id: string; label: string; value: Text; onChange: (l: "en" | "de", v: string) => void; textarea?: boolean; max: number }) {
  const Input = textarea ? "textarea" : "input";
  return (
    <div className="field">
      <div className="field-head">
        <span>{label}</span>
      </div>
      {(["en", "de"] as const).map((l) => (
        <div className="lang-row" key={l}>
          <label className="lang-tag" htmlFor={`${id}-${l}`}>
            {l.toUpperCase()}
          </label>
          <Input id={`${id}-${l}`} value={value[l] ?? ""} maxLength={max} rows={textarea ? 2 : undefined} placeholder={l === "de" ? value.en : ""} onChange={(e) => onChange(l, e.target.value)} />
        </div>
      ))}
      {!!value.en.trim() && !value.de?.trim() && <p className="hint warn">Not translated. The German page shows the English text.</p>}
    </div>
  );
}

export function PageInspector({ site, page, onChange, onDelete, confirmingDelete, setConfirmingDelete }: PageProps) {
  // Decided once per page, so emptying another page's address does not turn it into the home page's form.
  const isHome = useMemo(() => page.kind === "page" && page.slug === "" && site.pages.filter((p) => p.kind === "page" && p.slug === "").length === 1, [page.id]);
  const base = page.kind === "case" ? "/work/" : page.kind === "post" ? "/journal/" : "/";
  const slugTaken = !isHome && uniqueSlug(site, page.kind, page.slug, page.id) !== page.slug;
  return (
    <div className="insp-body">
      <div className="insp-title">
        <h2>Page settings</h2>
        <span className="mono tag">{page.kind === "case" ? "case study" : page.kind === "post" ? "journal post" : "page"}</span>
      </div>
      <p className="hint">Select a block in the list or the preview to edit it.</p>
      <TextPair id="title" label="Title" value={page.title} max={90} onChange={(l, v) => onChange(["title", l], v)} />
      <TextPair id="summary" label="Summary (lists and search results)" value={page.summary} max={200} textarea onChange={(l, v) => onChange(["summary", l], v)} />
      {!isHome && (
        <div className="field">
          <div className="field-head">
            <label htmlFor="slug">Address</label>
          </div>
          <div className="slug">
            <span className="mono">/en{base}</span>
            <input id="slug" className="mono" value={page.slug} aria-invalid={slugTaken || !page.slug} onChange={(e) => onChange(["slug"], e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
          </div>
          {slugTaken && <p className="hint bad">Another page already uses this address.</p>}
          {!page.slug && <p className="hint bad">The address cannot be empty.</p>}
        </div>
      )}
      {page.kind !== "page" && (
        <div className="field">
          <div className="field-head">
            <label htmlFor="date">Date</label>
          </div>
          <input id="date" type="date" value={page.date ?? ""} onChange={(e) => onChange(["date"], e.target.value)} />
        </div>
      )}
      {!isHome && (
        <div className="danger">
          {confirmingDelete ? (
            <>
              <p className="hint">Delete “{page.title.en}” and its {page.blocks.length} blocks? You can undo this.</p>
              <div className="row">
                <button type="button" className="ebtn danger-btn" onClick={onDelete}>
                  Delete page
                </button>
                <button type="button" className="ebtn line" onClick={() => setConfirmingDelete(false)}>
                  Keep it
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="ebtn line" onClick={() => setConfirmingDelete(true)}>
              <Trash2 size={14} aria-hidden /> Delete this page
            </button>
          )}
        </div>
      )}
    </div>
  );
}
