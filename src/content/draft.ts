// The editor's working copy, kept in this browser. The published site.json never changes.
import { validateSite } from "./schema.ts";
import type { Site } from "./schema.ts";

const KEY = "northfold.draft";

export type Draft = { site: Site; savedAt: number };

export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    // A broken or outdated draft is ignored rather than crashing the site.
    if (!d || typeof d.savedAt !== "number" || validateSite(d.site).some((p) => p.fatal)) return null;
    return d;
  } catch {
    return null;
  }
}

export function saveDraft(site: Site): number {
  const savedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify({ site, savedAt }));
  return savedAt;
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
