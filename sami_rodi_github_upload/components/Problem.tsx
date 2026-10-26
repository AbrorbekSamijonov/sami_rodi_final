"use client";

import { motion } from "framer-motion";
import { Flame, TrendingDown, Wallet } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

const CARDS = [
  { icon: Flame, title: "Hotspots", body: "A shaded cell is forced to dissipate power from its neighbors. Internal temperatures can exceed 400 °C and damage the cell (Tonkoshkur et al., 2021)." },
  { icon: TrendingDown, title: "Power loss", body: "In lab tests each reverse-overload event cut a cell's maximum power by about 3.5% on average, and the loss accumulates." },
  { icon: Wallet, title: "Early replacement costs", body: "Repeated heat stress accelerates degradation and can shorten the useful life of the whole panel." },
];

function StringIllustration() {
  const n = 8;
  return (
    <svg viewBox="0 0 640 110" className="w-full" role="img" aria-label="A string of eight solar cells in series; the fourth cell is shaded and glowing hot.">
      <defs>
        <filter id="pglow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <line x1="0" y1="55" x2="640" y2="55" stroke="#94A3B8" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => {
        const x = 12 + i * 78;
        const hot = i === 3;
        return (
          <g key={i}>
            <rect x={x} y={20} width={66} height={70} rx={8} fill={hot ? "#EF4444" : "#12355B"} stroke={hot ? "#FCA5A5" : "#2B5E96"} filter={hot ? "url(#pglow)" : undefined} className={hot ? "heat-shimmer" : undefined} />
            {hot && <text x={x + 33} y={60} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Hotspot</text>}
          </g>
        );
      })}
    </svg>
  );
}

export default function Problem() {
  return (
    <SectionWrapper id="problem" eyebrow="The problem" title="Partial shade is quietly destroying solar panels" intro="The cells in a panel are wired in series, like links in a chain. When one cell is shaded by leaves, dirt, a chimney or the edge of a cloud, it can't carry the current the rest of the string is pushing through it. It becomes reverse-biased and heats up into a hotspot. Over time that heat damages the cell, reduces output, and can lead to costly replacement.">
      <div className="mb-12 overflow-hidden lift rounded-lg border border-line bg-white p-6 shadow-soft">
        <StringIllustration />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className="lift rounded-lg border border-line border-t-2 border-t-navy bg-white p-7 shadow-soft"
          >
            <span className="mb-5 inline-flex text-amber-700">
              <c.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-xl font-semibold text-navy">{c.title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{c.body}</p>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
