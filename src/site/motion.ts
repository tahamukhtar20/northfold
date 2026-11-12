// Small progressive enhancements for the public site. Without JavaScript, or with
// reduced motion, every element is simply visible and still.

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fade and lift [data-reveal] elements in as they scroll into view. */
function reveal(root: ParentNode) {
  const els = [...root.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")];
  if (reduced() || !("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((e) => io.observe(e));
  return () => io.disconnect();
}

/** Count [data-count] figures up from zero, keeping any prefix and suffix ("99.97%", "9 yrs"). */
function countUp(root: ParentNode) {
  if (reduced() || !("IntersectionObserver" in window)) return () => {};
  // Each figure counts once per page view; a re-run (draft shown or hidden) skips it.
  const els = [...root.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])")];
  const frames = new Map<HTMLElement, number>();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      el.dataset.counted = "";
      const text = el.dataset.count ?? el.textContent ?? "";
      const m = text.match(/^(\D*)(\d[\d,.]*)(.*)$/);
      if (!m) continue;
      const [, pre, num, post] = m;
      const decimals = (num.split(".")[1] ?? "").length;
      const target = Number(num.replace(/,/g, ""));
      if (!Number.isFinite(target)) continue;
      const start = performance.now(), dur = 1400;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = `${pre}${(target * eased).toFixed(decimals)}${post}`;
        if (t < 1) frames.set(el, requestAnimationFrame(step));
        else {
          el.textContent = text;
          frames.delete(el);
        }
      };
      frames.set(el, requestAnimationFrame(step));
    }
  }, { threshold: 0.6 });
  els.forEach((e) => io.observe(e));
  // Stopping mid-count puts the real figure back before React takes over again.
  return () => {
    io.disconnect();
    frames.forEach((id, el) => {
      cancelAnimationFrame(id);
      el.textContent = el.dataset.count ?? el.textContent;
    });
  };
}

/** Cards light up where the pointer is: sets --mx/--my on .spot elements. */
function spotlight() {
  const onMove = (e: PointerEvent) => {
    const card = (e.target as Element).closest?.<HTMLElement>(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  return () => document.removeEventListener("pointermove", onMove);
}

/** Header gets a solid background once the page scrolls. */
function header() {
  const top = document.querySelector(".top");
  const on = () => top?.classList.toggle("scrolled", scrollY > 8);
  on();
  addEventListener("scroll", on, { passive: true });
  return () => removeEventListener("scroll", on);
}

export function startMotion(root: ParentNode = document) {
  const stops = [reveal(root), countUp(root), spotlight(), header()];
  return () => stops.forEach((s) => s());
}
