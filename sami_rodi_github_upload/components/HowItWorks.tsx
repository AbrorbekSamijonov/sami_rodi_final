"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import ShadeLab from "./ShadeLab";
import LayerStack from "./LayerStack";

const STEPS = [
  { t: "Shade hits a cell", d: "A leaf, dirt or a shadow covers a cell and it begins to heat up." },
  { t: "The CPCF layer responds", d: "The layer under the cell senses the temperature, and its resistance rises sharply." },
  { t: "Current is routed around it", d: "The protected cell is isolated and the rest of the panel keeps producing." },
];

export default function HowItWorks() {
  const [open, setOpen] = useState(false);
  return (
    <SectionWrapper id="technology" alt eyebrow="Technology" title="A smart layer under every cell" intro="Watch what happens to a conventional panel and a SamiRodi panel when the same cell is shaded.">
      <ShadeLab />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.li key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }} className="group bg-mist p-8 transition-colors duration-300 hover:bg-navy hover:text-white">
            <span className="font-display text-5xl font-semibold text-amber transition-transform duration-300 group-hover:translate-x-1">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl font-semibold text-navy group-hover:text-white">{s.t}</h3>
            <p className="mt-2 text-slate-600 group-hover:text-slate-300">{s.d}</p>
          </motion.li>
        ))}
      </ol>

      <h3 className="mb-8 mt-20 font-display text-3xl font-semibold text-navy">Inside the stack</h3>
      <LayerStack />

      <div className="mt-14 rounded-lg border border-line bg-mist">
        <button className="flex w-full items-center justify-between gap-4 p-6 text-left font-display text-xl font-semibold text-navy" aria-expanded={open} aria-controls="diode-faq" onClick={() => setOpen((v) => !v)}>
          How is this different from bypass diodes?
          <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div id="diode-faq" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
              <p className="px-6 pb-6 leading-relaxed text-slate-600">
                Bypass diodes protect groups of cells, typically 20 or more at a time. When shade triggers one, the whole group is switched out, including the sunlit cells in it, and the shaded cell can still heat up before that happens. SamiRodi&apos;s CPCF layer works at the level of each individual cell: it responds to that cell&apos;s own temperature and isolates only that cell, so the rest of the group keeps producing.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
