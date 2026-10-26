"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  dark?: boolean;
  alt?: boolean;
  children: React.ReactNode;
  className?: string;
};

/** Consistent section chrome: spacing, heading block and fade/slide-up on scroll. */
export default function SectionWrapper({ id, title, eyebrow, intro, dark, alt, children, className = "" }: Props) {
  const reduce = useReducedMotion();
  const bg = dark ? "bg-navy text-slate-200" : alt ? "bg-white" : "bg-mist";
  return (
    <section id={id} className={`relative ${bg} py-20 sm:py-28 ${className}`}>
      {dark && <div className="cell-grid pointer-events-none absolute inset-0" aria-hidden="true" />}
      <div className="relative mx-auto max-w-content px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {(title || eyebrow) && (
            <header className="mb-12 max-w-3xl">
              {eyebrow && (
                <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-amber-light" : "text-amber-700"}`}>
                  <span className="h-px w-8 bg-current" aria-hidden="true" />
                  {eyebrow}
                </p>
              )}
              {title && <h2 className={`font-display text-3xl font-semibold leading-tight sm:text-5xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>}
              {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{intro}</p>}
            </header>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
