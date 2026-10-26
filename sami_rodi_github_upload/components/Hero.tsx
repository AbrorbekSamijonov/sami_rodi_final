"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FlaskConical, Hourglass, ShieldCheck } from "lucide-react";
import HeroPanel from "./HeroPanel";
import { PATENT, PATENT_LABEL, TRUST_CLAIMS } from "@/lib/config";

const HEADLINE = "Solar panels that don't burn out in the shade.".split(" ");
const TRUST_ICONS = [FlaskConical, ShieldCheck, Hourglass];

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden bg-navy pb-16 pt-44 text-white sm:pt-48">
      <div className="cell-grid absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-content items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <motion.a
            href={PATENT.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group mb-7 inline-flex items-center gap-4 rounded-md border border-amber/60 bg-amber/10 py-2 pl-2 pr-5 transition-colors hover:bg-amber/20"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded bg-amber text-navy"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></span>
            <span className="text-left">
              <span className="block text-sm font-bold uppercase tracking-[0.18em] text-amber-light">{PATENT_LABEL}</span>
              <span className="block text-xs text-slate-300 group-hover:text-white">Utility model, Dnipro National University, 2020 · View record →</span>
            </span>
          </motion.a>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {HEADLINE.map((w, i) => (
              <motion.span key={i} className="mr-[0.25em] inline-block" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: "easeOut" }}>
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            SamiRodi&apos;s CPCF cell protection prevents hotspot overheating and the cumulative cell damage behind early panel replacement, so your panels keep producing, for 5% below the market average price.
          </motion.p>

          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.95, ease: "easeOut" }} className="mt-9 flex flex-wrap gap-4">
            <a href="#contact" className="btn-brass">Get a Quote</a>
            <a href="#technology" className="btn-ghost">See How It Works</a>
          </motion.div>
        </div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
          <HeroPanel />
        </motion.div>
      </div>

      <ul className="relative mx-auto mt-16 flex max-w-content flex-wrap justify-center gap-x-10 gap-y-3 border-t border-white/10 px-5 pt-8 text-sm text-slate-300 sm:px-8">
        {TRUST_CLAIMS.map((t, i) => {
          const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
          return <li key={t} className="flex items-center gap-2"><Icon className="h-4 w-4 text-amber" aria-hidden="true" />{t}</li>;
        })}
      </ul>
    </section>
  );
}
