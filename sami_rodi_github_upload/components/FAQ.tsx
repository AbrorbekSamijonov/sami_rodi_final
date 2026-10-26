"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { FAQS } from "@/lib/config";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionWrapper id="faq" eyebrow="FAQ" title="Common questions">
      <div className="max-w-3xl divide-y divide-line lift rounded-lg border border-line bg-white">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <h3>
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-navy sm:p-6"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {f.q}
                  <Plus className={`h-5 w-5 shrink-0 text-amber transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 leading-relaxed text-slate-600 sm:px-6">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
