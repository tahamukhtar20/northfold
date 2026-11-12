// The home page's product picture: bookings travel from depots into the Northfold hub
// while a live feed and counters update. Pure SVG/CSS motion, so it prerenders; the
// feed and counter only start ticking in the browser, and not at all with reduced motion.
import { useEffect, useState } from "react";
import { Check, Wifi } from "lucide-react";
import type { Lang } from "../content/schema.ts";

const DEPOTS = [
  { name: "Leeds", x: 64, y: 58 },
  { name: "York", x: 46, y: 140 },
  { name: "Hull", x: 40, y: 222 },
  { name: "Bradford", x: 50, y: 304 },
  { name: "Sheffield", x: 72, y: 382 },
];
const HUB = { x: 300, y: 220 };
const LOADS = { en: ["Pallet ×4", "Chilled ×2", "Parcel ×12", "Pallet ×1", "Bulk ×3", "Parcel ×7"], de: ["Palette ×4", "Kühlware ×2", "Paket ×12", "Palette ×1", "Schüttgut ×3", "Paket ×7"] };
const TEXT = {
  en: { title: "Halden Freight · bookings", live: "Live", today: "Bookings today", time: "Avg. booking", queue: "Offline queue", synced: "3 depots synced after an outage", uptime: "uptime, last 12 months" },
  de: { title: "Halden Freight · Buchungen", live: "Live", today: "Buchungen heute", time: "Ø Buchung", queue: "Offline-Warteschlange", synced: "3 Depots nach Ausfall abgeglichen", uptime: "Verfügbarkeit, 12 Monate" },
};

type Row = { id: number; depot: string; load: string; time: string };

function makeRow(id: number, lang: Lang, minutes: number): Row {
  const d = DEPOTS[(id * 3) % DEPOTS.length];
  const loads = LOADS[lang];
  const h = 9 + Math.floor(minutes / 60), m = minutes % 60;
  return { id, depot: d.name, load: loads[(id * 5) % loads.length], time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` };
}

const path = (d: { x: number; y: number }) => `M${d.x + 14} ${d.y} C ${d.x + 120} ${d.y}, ${HUB.x - 120} ${HUB.y}, ${HUB.x - 34} ${HUB.y}`;

export function HeroVisual({ lang }: { lang: Lang }) {
  const tx = TEXT[lang];
  const first = () => Array.from({ length: 5 }, (_, i) => makeRow(4 - i, lang, 42 - i * 3));
  const [rows, setRows] = useState<Row[]>(first);
  const [count, setCount] = useState(1284);

  useEffect(() => {
    setRows(first());
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 5, minutes = 43;
    const t = setInterval(() => {
      setRows((r) => [makeRow(id++, lang, minutes++), ...r].slice(0, 5));
      setCount((c) => c + 1);
    }, 1700);
    return () => clearInterval(t);
  }, [lang]);

  return (
    <div className="hv" aria-hidden>
      <div className="hv-window">
        <div className="hv-bar">
          <i />
          <i />
          <i />
          <span>{tx.title}</span>
          <b className="live">
            <span className="pulse" />
            {tx.live}
          </b>
        </div>
        <div className="hv-body">
          <svg className="hv-net" viewBox="0 0 360 440" role="presentation">
            <defs>
              <linearGradient id="hv-line" x1="0" x2="1">
                <stop offset="0" stopColor="var(--a1)" stopOpacity=".15" />
                <stop offset="1" stopColor="var(--a2)" stopOpacity=".6" />
              </linearGradient>
              <radialGradient id="hv-glow">
                <stop offset="0" stopColor="var(--a2)" stopOpacity=".55" />
                <stop offset="1" stopColor="var(--a2)" stopOpacity="0" />
              </radialGradient>
            </defs>
            {DEPOTS.map((d, i) => (
              <path key={d.name} id={`hv-p${i}`} d={path(d)} className="hv-path" stroke="url(#hv-line)" />
            ))}
            {DEPOTS.map((d, i) =>
              [0, 1].map((k) => (
                <g key={`${d.name}${k}`} className="hv-packet">
                  <circle r="9" fill="url(#hv-glow)" />
                  <rect x="-5" y="-3.5" width="10" height="7" rx="2" />
                  <animateMotion dur="2.8s" begin={`${(i * 0.53 + k * 1.4).toFixed(2)}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".5 0 .3 1">
                    <mpath href={`#hv-p${i}`} />
                  </animateMotion>
                </g>
              )),
            )}
            {DEPOTS.map((d) => (
              <g key={d.name} className="hv-depot" transform={`translate(${d.x} ${d.y})`}>
                <circle r="13" />
                <circle r="4" className="core" />
                <text x="0" y="28" textAnchor="middle">
                  {d.name}
                </text>
              </g>
            ))}
            <g className="hv-hub" transform={`translate(${HUB.x} ${HUB.y})`}>
              <circle r="56" className="ring r1" />
              <circle r="56" className="ring r2" />
              <circle r="34" className="hub" />
              <path d="M-11 -11h22v10l-10 12h-12z" className="mark" />
            </g>
          </svg>
          <div className="hv-side">
            <div className="hv-stat">
              <span>{tx.today}</span>
              <b>{count.toLocaleString(lang === "de" ? "de-DE" : "en-GB")}</b>
            </div>
            <div className="hv-stat two">
              <div>
                <span>{tx.time}</span>
                <b>1m 48s</b>
              </div>
              <div>
                <span>{tx.queue}</span>
                <b>0</b>
              </div>
            </div>
            <ul className="hv-feed">
              {rows.map((r) => (
                <li key={r.id}>
                  <Check size={13} className="ok" />
                  <span className="dep">{r.depot}</span>
                  <span className="load">{r.load}</span>
                  <span className="time">{r.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="hv-chip c1">
        <Wifi size={14} /> {tx.synced}
      </div>
      <div className="hv-chip c2">
        <b>99.98%</b> {tx.uptime}
      </div>
    </div>
  );
}
