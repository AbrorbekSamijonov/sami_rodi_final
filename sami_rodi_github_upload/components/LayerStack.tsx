"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const LAYERS = [
  { name: "Tempered glass", color: "#7FA6C9", note: "Weather protection and light transmission." },
  { name: "Encapsulant", color: "#A9BFD3", note: "Seals the cells against moisture." },
  { name: "Silicon solar cell", color: "#1B3A57", note: "Generates power. When shaded, this is where a hotspot forms." },
  { name: "CPCF layer", color: "#C9A24A", note: "SamiRodi's CPCF layer. Conducts normally, then resistance rises sharply near the switching temperature, limiting current in that cell. It resets when it cools. 0.50 mm in the 2026 study.", hero: true },
  { name: "Backsheet", color: "#5B6B7D", note: "Rear protection and insulation." },
];

/** Exploded cross-section of a SamiRodi cell. Hover or focus a layer to read about it. */
export default function LayerStack() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(3);
  const spread = inView || reduce ? 64 : 14;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2">
      <svg viewBox="0 0 420 380" className="w-full" role="img" aria-label="Exploded view of a solar cell stack with the CPCF layer highlighted beneath the silicon cell">
        {LAYERS.map((l, i) => {
          const y = 30 + i * spread;
          const on = active === i;
          return (
            <motion.g key={l.name} animate={{ y: reduce ? y : y, opacity: on ? 1 : 0.55 }} initial={false} transition={{ duration: 0.6, ease: "easeOut" }} style={{ cursor: "pointer" }} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0} aria-label={l.name}>
              <polygon points="210,0 400,40 210,80 20,40" fill={l.color} stroke={on ? "#0A1522" : "#fff"} strokeWidth={on ? 2 : 1} />
              <polygon points="20,40 210,80 210,90 20,50" fill={l.color} style={{ filter: "brightness(.75)" }} />
              <polygon points="210,80 400,40 400,50 210,90" fill={l.color} style={{ filter: "brightness(.6)" }} />
              {l.hero && on && <polygon points="210,10 380,44 210,78 40,44" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 4" className="flow-dash" />}
            </motion.g>
          );
        })}
      </svg>
      <ol className="space-y-2">
        {LAYERS.map((l, i) => (
          <li key={l.name}>
            <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-pressed={active === i} className={`w-full rounded-md border p-4 text-left transition-all duration-200 ${active === i ? "border-amber bg-white shadow-soft" : "border-line bg-transparent hover:border-amber/60"}`}>
              <span className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-sm" style={{ background: l.color }} aria-hidden="true" />
                <span className={`font-display text-lg font-semibold ${l.hero ? "text-amber-700" : "text-navy"}`}>{l.name}</span>
              </span>
              {active === i && <span className="mt-2 block text-sm leading-relaxed text-slate-600">{l.note}</span>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
