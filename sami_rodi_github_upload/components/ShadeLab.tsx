"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { PER_EVENT_LOSS } from "@/data/charts";

const COLS = 6, ROWS = 4, W = 46, H = 38, G = 6, X0 = 8, Y0 = 8;
const cx = (c: number) => X0 + c * (W + G) + W / 2;
const cy = (r: number) => Y0 + r * (H + G) + H / 2;

// Peak temperatures for the animation. SamiRodi's peak is grounded in the 2026 paper:
// switching temperature 373.15 K (100 °C) minus the ≥48.2 K safety margin ≈ 52 °C.
const PEAK_STANDARD = 120;
const PEAK_PROTECTED = 52;
const AMBIENT = 25;

type Pos = { r: number; c: number };

function pathFor(shaded: Pos, protectedMode: boolean) {
  const order: Pos[] = [];
  for (let r = 0; r < ROWS; r++) for (let k = 0; k < COLS; k++) order.push({ r, c: r % 2 === 0 ? k : COLS - 1 - k });
  const pts: string[] = [];
  order.forEach((p, i) => {
    const hit = p.r === shaded.r && p.c === shaded.c;
    if (protectedMode && hit && i > 0 && i < order.length - 1) {
      const a = order[i - 1], b = order[i + 1];
      const gap = Y0 + p.r * (H + G) - G / 2 + (p.r === 0 ? H + G : 0);
      pts.push(`L${cx(a.c)},${cy(a.r)}`, `L${cx(a.c)},${gap}`, `L${cx(b.c)},${gap}`);
      return;
    }
    pts.push(`${pts.length ? "L" : "M"}${cx(p.c)},${cy(p.r)}`);
  });
  return pts.join(" ");
}

function Panel({ label, protectedMode, shaded, heat, events, onPick }: { label: string; protectedMode: boolean; shaded: Pos; heat: number; events: number; onPick: (p: Pos) => void }) {
  const temp = Math.round(AMBIENT + heat * ((protectedMode ? PEAK_PROTECTED : PEAK_STANDARD) - AMBIENT));
  const power = protectedMode ? 100 : Math.max(0, 100 - PER_EVENT_LOSS.pmax * events);
  const hot = !protectedMode && heat > 0.35;
  return (
    <div className={`rounded-lg border p-5 ${protectedMode ? "border-amber/70 bg-navy-700/60" : "border-white/15 bg-white/[0.03]"}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-white">{label}</h3>
        <span className={`rounded px-2.5 py-1 text-xs font-semibold ${protectedMode ? "bg-amber text-navy" : "bg-white/10 text-slate-300"}`}>{protectedMode ? "CPCF" : "Conventional"}</span>
      </div>
      <svg viewBox="0 0 320 190" className="w-full" role="group" aria-label={`${label}: 24-cell panel`}>
        <defs><filter id={`g-${label}`}><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        {Array.from({ length: ROWS * COLS }, (_, i) => {
          const r = Math.floor(i / COLS), c = i % COLS;
          const isShaded = r === shaded.r && c === shaded.c;
          const x = X0 + c * (W + G), y = Y0 + r * (H + G);
          return (
            <g key={i} role="button" tabIndex={0} aria-label={`Shade cell row ${r + 1}, column ${c + 1}`} className="cursor-pointer" onClick={() => onPick({ r, c })} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onPick({ r, c }))}>
              <rect x={x} y={y} width={W} height={H} rx={3} fill="#1B3A57" stroke="#2B5379" strokeWidth={0.8} />
              <line x1={x + W / 2} y1={y + 3} x2={x + W / 2} y2={y + H - 3} stroke="#2B5379" strokeWidth={0.5} />
              {isShaded && (
                <>
                  <rect x={x} y={y} width={W} height={H} rx={3} fill={hot ? "#D6453D" : protectedMode ? "#334155" : "#1B3A57"} fillOpacity={protectedMode ? 0.4 + heat * 0.6 : heat} stroke={protectedMode ? "#C9A24A" : hot ? "#FCA5A5" : "none"} strokeWidth={protectedMode ? 1.6 : 1} filter={hot ? `url(#g-${label})` : undefined} className={hot ? "heat-shimmer" : undefined} />
                  <rect x={x} y={y} width={W} height={H} rx={3} fill="#000" opacity={heat * 0.55} />
                  {!protectedMode && events > 0 && <path d={`M${x + 8},${y + 6} l7,9 l-5,5 l9,10`} fill="none" stroke="#FCA5A5" strokeWidth={1.2} opacity={0.9} />}
                  {protectedMode && heat > 0.3 && <text x={x + W / 2} y={y + H / 2 + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="#E2C67E">ISOLATED</text>}
                </>
              )}
            </g>
          );
        })}
        <path d={pathFor(shaded, protectedMode)} fill="none" stroke={protectedMode ? "#E2C67E" : hot ? "#FCA5A5" : "#E2C67E"} strokeWidth={1.8} strokeLinejoin="round" opacity={0.9} className="flow-dash" />
      </svg>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        <div><dt className="text-xs uppercase tracking-wider text-slate-400">Shaded-cell temp</dt><dd className={`font-display text-3xl font-semibold ${hot ? "text-red-300" : "text-white"}`}>{temp}°C</dd></div>
        <div><dt className="text-xs uppercase tracking-wider text-slate-400">Panel max power</dt><dd className={`font-display text-3xl font-semibold ${power < 100 ? "text-red-300" : "text-emerald-300"}`}>{power.toFixed(1)}%</dd></div>
      </dl>
      <div className="mt-3 h-1.5 overflow-hidden rounded bg-white/10" aria-hidden="true"><div className={`h-full transition-all duration-500 ${power < 100 ? "bg-heat" : "bg-energy"}`} style={{ width: `${power}%` }} /></div>
    </div>
  );
}

/** Side-by-side shade event: conventional panel vs SamiRodi panel. Illustrative, grounded in the papers' numbers. */
export default function ShadeLab() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [shaded, setShaded] = useState<Pos>({ r: 1, c: 2 });
  const [heat, setHeat] = useState(0);
  const [events, setEvents] = useState(0);
  const [running, setRunning] = useState(false);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (running) return;
    setRunning(true);
    const start = performance.now();
    const up = reduce ? 1 : 2200, hold = reduce ? 1 : 900, down = reduce ? 1 : 1200;
    const step = (now: number) => {
      const t = now - start;
      if (t < up) setHeat(t / up);
      else if (t < up + hold) setHeat(1);
      else if (t < up + hold + down) setHeat(1 - (t - up - hold) / down);
      else {
        setHeat(0);
        setEvents((e) => e + 1);
        setRunning(false);
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [running, reduce]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (inView && !reduce) run(); }, [inView]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-lg bg-navy p-5 text-slate-200 shadow-soft sm:p-8">
      <div className="cell-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-light">Live comparison</p>
            <p className="mt-1 max-w-xl text-slate-300">Run a shade event. Click any cell to choose which one gets shaded. Each event on the conventional panel costs about {PER_EVENT_LOSS.pmax}% of its maximum power, as measured in the monograph.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={run} disabled={running} className="btn-brass disabled:opacity-60"><Play className="h-4 w-4" aria-hidden="true" />Trigger shade event</button>
            <button onClick={() => { setEvents(0); setHeat(0); }} disabled={running} className="btn-ghost"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset</button>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel label="Conventional panel" protectedMode={false} shaded={shaded} heat={heat} events={events} onPick={setShaded} />
          <Panel label="SamiRodi panel" protectedMode shaded={shaded} heat={heat} events={events} onPick={setShaded} />
        </div>
        <p className="mt-4 text-xs text-slate-400">Illustration. SamiRodi peak temperature follows the 2026 simulation (switching temperature 100 °C minus a ≥48.2 K safety margin). Conventional-panel temperature is illustrative. SamiRodi power retention reflects design intent and is pending experimental validation.</p>
      </div>
    </div>
  );
}
