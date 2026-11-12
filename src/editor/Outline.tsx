// Left-hand panel: the page's blocks in order. Drag to reorder (or Alt+Arrow keys),
// add a block below the selected one, duplicate or delete.
import { useState } from "react";
import type { DragEvent, KeyboardEvent } from "react";
import { ArrowDown, ArrowUp, Copy, GripVertical, Plus, Settings2, Trash2, X } from "lucide-react";
import { BLOCKS, blockDef, missing, t, validateBlock } from "../content/schema.ts";
import type { Block, Page, Text } from "../content/schema.ts";

/** A one-line description of a block's content for the list. */
function preview(b: Block): string {
  const d = b.data;
  for (const k of ["heading", "text", "body"]) {
    const v = d[k] as Text | undefined;
    if (v?.en?.trim()) return v.en;
  }
  if (Array.isArray(d.items))
    return (d.items as Record<string, unknown>[])
      .map((it) => (typeof it.value === "string" ? it.value : t((it.title ?? it.label) as Text, "en")))
      .filter(Boolean)
      .join(" · ");
  if (b.type === "pageList") return d.kind === "post" ? "Journal posts" : "Case studies";
  return "";
}

type Props = {
  page: Page;
  selected: string | null;
  onSelect: (id: string | null) => void;
  onMove: (from: number, to: number) => void;
  onAdd: (type: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
};

export function Outline({ page, selected, onSelect, onMove, onAdd, onDuplicate, onRemove }: Props) {
  const [adding, setAdding] = useState(false);
  const [drag, setDrag] = useState<{ from: number; over: number } | null>(null);

  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      e.preventDefault();
      onMove(i, e.key === "ArrowUp" ? i - 1 : i + 1);
    }
  };
  const dragProps = (i: number) => ({
    draggable: true,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(i));
      setDrag({ from: i, over: i });
    },
    onDragOver: (e: DragEvent) => {
      if (!drag) return;
      e.preventDefault();
      if (drag.over !== i) setDrag({ ...drag, over: i });
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      if (drag) onMove(drag.from, i);
      setDrag(null);
    },
    onDragEnd: () => setDrag(null),
  });

  return (
    <div className="outline-body">
      <button type="button" className={`page-row${selected === null ? " on" : ""}`} onClick={() => onSelect(null)}>
        <Settings2 size={15} aria-hidden /> Page settings
      </button>
      <h3 className="ehead">Blocks</h3>
      <ol className="blocks" aria-label="Blocks on this page">
        {page.blocks.map((b, i) => {
          const def = blockDef(b.type);
          const problems = validateBlock(b).length;
          const untranslated = missing(b.data, "de").length;
          const target = drag && drag.over === i && drag.from !== i ? (drag.from < i ? " drop-after" : " drop-before") : "";
          return (
            <li key={b.id} className={`blk${b.id === selected ? " on" : ""}${drag?.from === i ? " dragging" : ""}${target}`} {...dragProps(i)}>
              <span className="grip" aria-hidden>
                <GripVertical size={14} />
              </span>
              <button type="button" className="blk-main" onClick={() => onSelect(b.id)} onKeyDown={onKey(i)} aria-current={b.id === selected ? "true" : undefined} aria-keyshortcuts="Alt+ArrowUp Alt+ArrowDown">
                <span className="blk-name">
                  {def?.name ?? b.type}
                  {problems > 0 && <i className="dot bad" aria-label={`${problems} problems`} />}
                  {problems === 0 && untranslated > 0 && <i className="dot warn" aria-label={`${untranslated} not in German`} />}
                </span>
                <small>{preview(b) || "Empty"}</small>
              </button>
              {b.id === selected && (
                <span className="blk-tools">
                  <button type="button" className="mini" aria-label="Move up" disabled={i === 0} onClick={() => onMove(i, i - 1)}>
                    <ArrowUp size={14} />
                  </button>
                  <button type="button" className="mini" aria-label="Move down" disabled={i === page.blocks.length - 1} onClick={() => onMove(i, i + 1)}>
                    <ArrowDown size={14} />
                  </button>
                  <button type="button" className="mini" aria-label="Duplicate" onClick={() => onDuplicate(b.id)}>
                    <Copy size={14} />
                  </button>
                  <button type="button" className="mini" aria-label="Delete block" onClick={() => onRemove(b.id)}>
                    <Trash2 size={14} />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {adding ? (
        <div className="add-menu" role="menu" aria-label="Add a block">
          <div className="add-head">
            <span>{selected ? "Add below the selected block" : "Add at the end"}</span>
            <button type="button" className="mini" aria-label="Close" onClick={() => setAdding(false)}>
              <X size={14} />
            </button>
          </div>
          {BLOCKS.map((d) => (
            <button
              key={d.type}
              type="button"
              role="menuitem"
              onClick={() => {
                onAdd(d.type);
                setAdding(false);
              }}
            >
              <b>{d.name}</b>
              <small>{d.description}</small>
            </button>
          ))}
        </div>
      ) : (
        <button type="button" className="add" onClick={() => setAdding(true)}>
          <Plus size={15} aria-hidden /> Add block
        </button>
      )}
    </div>
  );
}
