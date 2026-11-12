// A dialog that behaves: Escape and the backdrop close it, Tab stays inside it,
// and focus returns to whatever opened it.
import { useEffect, useRef } from "react";
import type { FormEvent, ReactNode } from "react";

type Props = { labelledBy: string; onClose: () => void; children: ReactNode; wide?: boolean; onSubmit?: () => void };

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select, textarea, a[href], [tabindex]:not([tabindex="-1"])';

export function Modal({ labelledBy, onClose, children, wide, onSubmit }: Props) {
  const box = useRef<HTMLElement | null>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const el = box.current!;
    // Focus the element marked autoFocus, else the first control.
    (el.querySelector<HTMLElement>("[data-autofocus]") ?? el.querySelector<HTMLElement>(FOCUSABLE))?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close.current();
      } else if (e.key === "Tab") {
        const items = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)];
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, []);

  const common = {
    className: `modal${wide ? " wide" : ""}`,
    role: "dialog",
    "aria-modal": true,
    "aria-labelledby": labelledBy,
    onClick: (e: { stopPropagation: () => void }) => e.stopPropagation(),
  } as const;
  return (
    <div className="modal-back" onClick={onClose}>
      {onSubmit ? (
        <form
          {...common}
          ref={(n) => (box.current = n)}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
        </form>
      ) : (
        <div {...common} ref={(n) => (box.current = n)}>
          {children}
        </div>
      )}
    </div>
  );
}
