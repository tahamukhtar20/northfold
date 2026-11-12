// Runs inside the editor's iframe, so the preview gets real viewport widths and the
// site's own styles. The editor sends the draft by postMessage; clicks on blocks go back.
import { useEffect, useRef, useState } from "react";
import type { Lang, Site } from "../content/schema.ts";
import { PageBlocks } from "../site/Blocks.tsx";
import { Layout } from "../site/Layout.tsx";

export type ToPreview = { type: "render"; site: Site; pageId: string; lang: Lang; selected: string | null; theme: "light" | "dark"; scroll: boolean };
export type FromPreview = { type: "ready" } | { type: "select"; id: string };

export default function Preview() {
  const [msg, setMsg] = useState<ToPreview | null>(null);
  const last = useRef<string | null>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.data?.type !== "render") return;
      setMsg(e.data as ToPreview);
    };
    // Links and forms do nothing in the preview; the page is for looking at.
    const onClick = (e: Event) => {
      if ((e.target as Element).closest?.("a, button[type=submit]")) e.preventDefault();
    };
    const onSubmit = (e: Event) => e.preventDefault();
    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    parent.postMessage({ type: "ready" } satisfies FromPreview, location.origin);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  useEffect(() => {
    if (!msg) return;
    document.documentElement.dataset.theme = msg.theme;
    // Bring a block into view when it is selected from the editor, not when clicked here.
    if (msg.scroll && msg.selected && msg.selected !== last.current) {
      const id = msg.selected;
      requestAnimationFrame(() => document.querySelector(`[data-id="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
    last.current = msg.selected;
  }, [msg]);

  if (!msg) return null;
  const page = msg.site.pages.find((p) => p.id === msg.pageId);
  if (!page) return null;
  return (
    <Layout site={msg.site} page={page} lang={msg.lang} preview>
      <PageBlocks
        site={msg.site}
        page={page}
        lang={msg.lang}
        selected={msg.selected}
        onSelect={(id) => parent.postMessage({ type: "select", id } satisfies FromPreview, location.origin)}
      />
    </Layout>
  );
}
