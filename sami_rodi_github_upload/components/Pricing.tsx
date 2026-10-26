"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { COMPARISON, PRICE_BASIS, PRICING, marketPrice } from "@/lib/config";

function priceLabel(p: { price: number | null; currency: string }) {
  if (p.price === null) return "Contact us";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: p.currency, maximumFractionDigits: 0 }).format(p.price);
}

export default function Pricing() {
  return (
    <SectionWrapper id="pricing" alt eyebrow="Pricing" title="Premium protection, fair price" intro="Upfront cost comparable to conventional panels, with a much lower cost over the life of the system.">
      <div className="grid gap-6 md:grid-cols-3">
        {PRICING.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            className={`flex flex-col rounded-lg border p-8 ${p.highlighted ? "border-amber bg-navy text-white shadow-soft" : "border-line bg-mist"}`}
          >
            {p.highlighted && <span className="mb-3 w-fit rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber-light">Most popular</span>}
            <h3 className={`font-display text-xl font-semibold ${p.highlighted ? "text-white" : "text-navy"}`}>{p.name}</h3>
            <p className={`mt-1 text-sm ${p.highlighted ? "text-slate-300" : "text-slate-600"}`}>{p.blurb}</p>
            <p className="mt-6 font-display text-3xl font-bold">{priceLabel(p)}{p.price !== null && <span className="ml-1 text-base font-medium opacity-70">/ panel</span>}</p>
            {p.watts && <p className="mt-1 text-xs opacity-70">≈ ${(p.price! / p.watts).toFixed(2)}/W · market average ≈ ${marketPrice(p.watts)}</p>}
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-energy" aria-hidden="true" />{f}</li>
              ))}
            </ul>
            <a href="#contact" className={`mt-8 rounded-md px-6 py-3 text-center text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 ${p.highlighted ? "bg-amber text-navy hover:bg-amber-light hover:shadow-glow" : "bg-navy text-white hover:bg-panel"}`}>
              {p.cta}
            </a>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[520px] text-left text-sm">
          <caption className="sr-only">Standard panel versus SamiRodi panel</caption>
          <thead className="bg-navy text-white">
            <tr><th scope="col" className="p-4 font-medium"><span className="sr-only">Feature</span></th><th scope="col" className="p-4 font-medium">Standard panel</th><th scope="col" className="p-4 font-medium text-amber-light">SamiRodi</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {COMPARISON.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="p-4 font-medium text-navy">{r.label}</th>
                <td className="p-4 text-slate-600">{r.standard}</td>
                <td className="p-4 font-medium text-navy">{r.samirodi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-slate-500">Prices exclude installation. Priced at the market average module price minus 5% (market basis: <a href={PRICE_BASIS.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{PRICE_BASIS.sourceLabel}</a>). Contact us for a custom quote.</p>
    </SectionWrapper>
  );
}
