// Form controls generated from the block schema: one component per field kind.
import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { emptyData } from "../content/schema.ts";
import type { Field, Link, Problem, Text } from "../content/schema.ts";
import type { Key } from "./ops.ts";

/** `merge` false makes the change its own undo step (used for adding and removing list items). */
export type Change = (path: Key[], value: unknown, merge?: boolean) => void;
type Props = { field: Field; value: unknown; path: Key[]; onChange: Change; onMove: (listPath: Key[], from: number, to: number) => void; problems: Problem[]; idBase: string };

/** Problems whose path is this field (or inside it), as "a.b[2].c" strings. */
const fmt = (path: Key[]) => path.map((k) => (typeof k === "number" ? `[${k}]` : `.${k}`)).join("");
function problemsAt(problems: Problem[], path: Key[]) {
  const p = fmt(path);
  return problems.filter((x) => x.path === `block${p}` || x.path.startsWith(`block${p}.`)).map((x) => x.message);
}

function Counter({ value, max }: { value: string; max?: number }) {
  if (!max) return null;
  return <span className={`count${value.length > max * 0.9 ? " near" : ""}`}>{`${value.length}/${max}`}</span>;
}

function TextField({ field, value, path, onChange, problems, idBase }: Props) {
  if (field.kind !== "text" && field.kind !== "textarea") return null;
  const v = (value as Text) ?? { en: "" };
  const Input = field.kind === "textarea" ? "textarea" : "input";
  const msgs = problemsAt(problems, path);
  const untranslated = !!v.en.trim() && !v.de?.trim();
  return (
    <div className="field">
      <div className="field-head">
        <span>
          {field.label}
          {field.required && <i className="req" aria-label="required">*</i>}
        </span>
      </div>
      {(["en", "de"] as const).map((l) => {
        const id = `${idBase}-${fmt(path)}-${l}`;
        const s = v[l] ?? "";
        return (
          <div className="lang-row" key={l}>
            <label htmlFor={id} className="lang-tag">
              {l.toUpperCase()}
            </label>
            <Input
              id={id}
              value={s}
              maxLength={field.max}
              rows={field.kind === "textarea" ? 3 : undefined}
              placeholder={l === "de" ? v.en || "" : ""}
              aria-invalid={l === "en" && msgs.length > 0}
              onChange={(e) => onChange([...path, l], e.target.value)}
            />
            <Counter value={s} max={field.max} />
          </div>
        );
      })}
      {untranslated && <p className="hint warn">Not translated. The German page shows the English text.</p>}
      {msgs.map((m) => (
        <p className="hint bad" key={m}>
          {m}
        </p>
      ))}
    </div>
  );
}

function PlainField({ field, value, path, onChange, problems, idBase }: Props) {
  if (field.kind !== "plain") return null;
  const id = `${idBase}-${fmt(path)}`;
  const s = typeof value === "string" ? value : "";
  const msgs = problemsAt(problems, path);
  return (
    <div className="field">
      <div className="field-head">
        <label htmlFor={id}>
          {field.label}
          {field.required && <i className="req" aria-label="required">*</i>}
        </label>
        <Counter value={s} max={field.max} />
      </div>
      <input id={id} value={s} maxLength={field.max} placeholder={field.placeholder} aria-invalid={msgs.length > 0} onChange={(e) => onChange(path, e.target.value)} />
      {msgs.map((m) => (
        <p className="hint bad" key={m}>
          {m}
        </p>
      ))}
    </div>
  );
}

function LinkField(props: Props) {
  const { field, value, path, onChange, problems, idBase } = props;
  if (field.kind !== "link") return null;
  const v = (value as Link) ?? { label: { en: "" }, href: "/" };
  const id = `${idBase}-${fmt(path)}-href`;
  const msgs = problemsAt(problems, path).filter((m) => m.includes("target"));
  return (
    <div className="field link">
      <TextField {...props} field={{ key: "label", label: `${field.label} text`, kind: "text", max: 40 }} value={v.label} path={[...path, "label"]} />
      <div className="field-head">
        <label htmlFor={id}>{field.label} goes to</label>
      </div>
      <input id={id} className="mono" value={v.href} placeholder="/contact" aria-invalid={msgs.length > 0} onChange={(e) => onChange([...path, "href"], e.target.value)} />
      <p className="hint">A page like /work, or a full https:// address.</p>
      {msgs.map((m) => (
        <p className="hint bad" key={m}>
          {m}
        </p>
      ))}
    </div>
  );
}

function SelectField({ field, value, path, onChange, idBase }: Props) {
  if (field.kind !== "select") return null;
  const id = `${idBase}-${fmt(path)}`;
  const names: Record<string, string> = { case: "Case studies", post: "Journal posts", all: "All", none: "None", network: "Live booking network" };
  return (
    <div className="field">
      <div className="field-head">
        <label htmlFor={id}>{field.label}</label>
      </div>
      <select id={id} value={String(value ?? field.options[0])} onChange={(e) => onChange(path, e.target.value)}>
        {field.options.map((o) => (
          <option key={o} value={o}>
            {names[o] ?? o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** First readable text in a list item, for its collapsed header. */
function summary(item: unknown): string {
  for (const v of Object.values((item as Record<string, unknown>) ?? {})) {
    if (typeof v === "string" && v.trim()) return v;
    if (v && typeof v === "object" && typeof (v as Text).en === "string" && (v as Text).en.trim()) return (v as Text).en;
    if (v && typeof v === "object" && "label" in (v as object)) return summary(v);
  }
  return "";
}

function ListField(props: Props) {
  const { field, value, path, onChange, onMove, problems } = props;
  const [open, setOpen] = useState<number | null>(0);
  if (field.kind !== "list") return null;
  const items = Array.isArray(value) ? value : [];
  const canAdd = field.max === undefined || items.length < field.max;
  const canRemove = items.length > (field.min ?? 0);
  const msgs = problemsAt(problems, path).filter((m) => m.includes("at least") || m.includes("at most"));
  return (
    <div className="field list">
      <div className="field-head">
        <span>{field.label}</span>
        <span className="count">
          {items.length}
          {field.max ? `/${field.max}` : ""}
        </span>
      </div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const itemProblems = problemsAt(problems, [...path, i]).length;
        return (
          <div className={`item${isOpen ? " open" : ""}`} key={i}>
            <div className="item-head">
              <button type="button" className="item-toggle" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                {isOpen ? <ChevronDown size={15} aria-hidden /> : <ChevronRight size={15} aria-hidden />}
                <span className="item-name">
                  {field.itemLabel} {i + 1}
                  <small>{summary(item)}</small>
                </span>
                {itemProblems > 0 && <i className="dot bad" aria-label="has problems" />}
              </button>
              <button type="button" className="mini" aria-label={`Move ${field.itemLabel} ${i + 1} up`} disabled={i === 0} onClick={() => (onMove(path, i, i - 1), setOpen(i - 1))}>
                <ArrowUp size={14} />
              </button>
              <button type="button" className="mini" aria-label={`Move ${field.itemLabel} ${i + 1} down`} disabled={i === items.length - 1} onClick={() => (onMove(path, i, i + 1), setOpen(i + 1))}>
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                className="mini"
                aria-label={`Remove ${field.itemLabel} ${i + 1}`}
                disabled={!canRemove}
                title={canRemove ? undefined : `At least ${field.min} needed`}
                onClick={() => {
                  onChange(path, items.filter((_, j) => j !== i), false);
                  setOpen(null);
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
            {isOpen && (
              <div className="item-body">
                {field.item.map((sub) => (
                  <FieldEditor key={sub.key} {...props} field={sub} value={(item as Record<string, unknown>)?.[sub.key]} path={[...path, i, sub.key]} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <button
        type="button"
        className="add-item"
        disabled={!canAdd}
        onClick={() => {
          onChange(path, [...items, emptyData(field.item)], false);
          setOpen(items.length);
        }}
      >
        <Plus size={14} aria-hidden /> Add {field.itemLabel.toLowerCase()}
      </button>
      {msgs.map((m) => (
        <p className="hint bad" key={m}>
          {m}
        </p>
      ))}
    </div>
  );
}

export function FieldEditor(props: Props) {
  switch (props.field.kind) {
    case "text":
    case "textarea":
      return <TextField {...props} />;
    case "plain":
      return <PlainField {...props} />;
    case "link":
      return <LinkField {...props} />;
    case "select":
      return <SelectField {...props} />;
    case "list":
      return <ListField {...props} />;
  }
}
