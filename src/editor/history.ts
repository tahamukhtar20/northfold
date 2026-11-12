// Undo and redo over immutable values. Typing into one field within a short pause is
// merged into a single step, so undo removes a word or a sentence, not a letter.

export type History<T> = { past: T[]; present: T; future: T[]; group: string | null; at: number };

export const LIMIT = 200;
export const MERGE_MS = 800;

export const createHistory = <T>(present: T): History<T> => ({ past: [], present, future: [], group: null, at: 0 });

/** Record `next`. Steps with the same `group` less than MERGE_MS apart replace each other. */
export function push<T>(h: History<T>, next: T, group: string | null = null, now = Date.now()): History<T> {
  if (Object.is(next, h.present)) return h;
  const merge = group !== null && group === h.group && now - h.at < MERGE_MS;
  const past = merge ? h.past : [...h.past, h.present].slice(-LIMIT);
  return { past, present: next, future: [], group, at: now };
}

export function undo<T>(h: History<T>): History<T> {
  if (!h.past.length) return h;
  return { past: h.past.slice(0, -1), present: h.past[h.past.length - 1], future: [h.present, ...h.future], group: null, at: 0 };
}

export function redo<T>(h: History<T>): History<T> {
  if (!h.future.length) return h;
  return { past: [...h.past, h.present], present: h.future[0], future: h.future.slice(1), group: null, at: 0 };
}
