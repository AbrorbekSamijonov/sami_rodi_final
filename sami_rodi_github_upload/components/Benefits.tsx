"use client";

import { motion } from "framer-motion";
import { Hourglass, PiggyBank, CloudSun, Flame, TreePine, BadgeCheck } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import AnimatedCounter from "./AnimatedCounter";
import { STATS } from "@/lib/config";

const BENEFITS = [
  { icon: Hourglass, title: "Protects against cumulative damage", body: "Avoiding repeated reverse-overload events avoids the stacking power loss measured in lab tests." },
  { icon: PiggyBank, title: "Protection at a lower price", body: "Priced 5% below the market average module price." },
  { icon: CloudSun, title: "Cell-level isolation", body: "Limits power in the shaded cell itself, not a whole group of cells." },
  { icon: Flame, title: "Reduced hotspot risk", body: "The 0.50 mm design kept a thermal safety margin of at least 48.2 K in all 625 simulated scenarios." },
  { icon: TreePine, title: "Resettable and passive", body: "The polymer layer returns to its conducting state when it cools. No added electronics." },
  { icon: BadgeCheck, title: "Patent-registered foundation", body: "Builds on Ukrainian utility model UA 141608 and peer-reviewed research." },
];

export default function Benefits() {
  return (
    <SectionWrapper id="benefits" alt eyebrow="Benefits" title="Built for the roofs you actually have">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
            className="lift rounded-lg border border-line border-t-2 border-t-navy bg-mist p-7 transition-shadow duration-200 hover:shadow-soft"
          >
            <span className="mb-5 inline-flex text-amber-700">
              <b.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-semibold text-navy">{b.title}</h3>
            <p className="mt-2 text-slate-600">{b.body}</p>
          </motion.article>
        ))}
      </div>

      <div className="relative mt-14 overflow-hidden rounded-lg bg-navy p-8 text-white sm:p-12 border border-amber/30">
        <div className="cell-grid absolute inset-0" aria-hidden="true" />
        <dl className="relative grid gap-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-6xl font-semibold text-amber-light"><AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} /></dd>
              <dt className="mt-2 text-slate-300">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="relative mt-8 text-xs text-slate-400">Placeholder figures. Replace in lib/config.ts with verified data.</p>
      </div>
    </SectionWrapper>
  );
}
