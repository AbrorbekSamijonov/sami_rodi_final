"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLS = 4;
const ROWS = 3;
const W = 84, H = 64, GX = 10, GY = 10, X0 = 12, Y0 = 22;
const SHADED = { r: 1, c: 1 };

const cx = (c: number) => X0 + c * (W + GX) + W / 2;
const cy = (r: number) => Y0 + r * (H + GY) + H / 2;

/** Serpentine current path through the string; detours around the shaded cell when protected. */
function currentPath(protectedMode: boolean) {
  const pts: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    const cols = r % 2 === 0 ? [0, 1, 2, 3] : [3, 2, 1, 0];
    for (const c of cols) {
      if (protectedMode && r === SHADED.r && c === SHADED.c) {
        const gap = Y0 + r * (H + GY) - GY / 2;
        pts.push(`L${cx(c + 1)},${gap}`, `L${cx(c - 1)},${gap}`);
        continue;
      }
      pts.push(`${pts.length ? "L" : "M"}${cx(c)},${cy(r)}`);
    }
  }
  return pts.join(" ");
}

/** Animated panel: loops between a standard panel (hot shaded cell) and the SamiRodi state. */
export default function HeroPanel() {
  const reduce = useReducedMotion();
  const [prot, setProt] = useState(false);

  useEffect(() => {
    if (reduce) {
      setProt(true);
      return;
    }
    const id = setInterval(() => setProt((p) => !p), 4500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="relative rounded-lg border border-white/15 bg-navy-700/60 p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between px-1 text-xs font-medium">
          <span className={`rounded px-3 py-1 transition-colors duration-500 ${prot ? "bg-energy/20 text-emerald-300" : "bg-heat/20 text-red-300"}`}>
            {prot ? "SamiRodi panel: cell isolated" : "Standard panel: hotspot forming"}
          </span>
          <span className="text-slate-400">{prot ? "~50°C" : "100°C+"}</span>
        </div>
        <svg viewBox="0 0 400 260" role="img" aria-label="Animated solar panel: a shaded cell overheats in a standard panel, but is isolated in a SamiRodi panel while current flows around it." className="w-full">
          <defs>
            <linearGradient id="cellFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1E4A7C" />
              <stop offset="1" stopColor="#12355B" />
            </linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const r = Math.floor(i / COLS), c = i % COLS;
            const shaded = r === SHADED.r && c === SHADED.c;
            const x = X0 + c * (W + GX), y = Y0 + r * (H + GY);
            return (
              <g key={i}>
                <rect x={x} y={y} width={W} height={H} rx={6} fill="url(#cellFill)" stroke="#2B5E96" strokeWidth={1} />
                {[1, 2].map((k) => (
                  <line key={k} x1={x + (W / 3) * k} y1={y + 4} x2={x + (W / 3) * k} y2={y + H - 4} stroke="#2B5E96" strokeWidth={0.6} opacity={0.7} />
                ))}
                {shaded && (
                  <>
                    <rect
                      x={x} y={y} width={W} height={H} rx={6}
                      fill={prot ? "#334155" : "#D6453D"}
                      stroke={prot ? "#2E9E6B" : "#FCA5A5"}
                      strokeWidth={prot ? 2 : 1.5}
                      filter={prot ? undefined : "url(#glow)"}
                      className={prot ? undefined : "heat-shimmer"}
                      style={{ transition: "fill .6s ease, stroke .6s ease" }}
                    />
                    <text x={cx(c)} y={cy(r) + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">
                      {prot ? "CPCF active" : "Shaded"}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          <path d={currentPath(prot)} fill="none" stroke="#0B1F3A" strokeWidth={5} strokeLinejoin="round" opacity={0.5} />
          <path d={currentPath(prot)} fill="none" stroke={prot ? "#2E9E6B" : "#F7C948"} strokeWidth={2.5} strokeLinejoin="round" className="flow-dash" />
        </svg>
      </div>
    </div>
  );
}
