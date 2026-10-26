"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, PATENT, PATENT_LABEL } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a href={PATENT.url} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center justify-center gap-2 bg-amber px-4 text-xs font-semibold tracking-wide text-navy transition-colors hover:bg-amber-light">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        <span className="uppercase">{PATENT_LABEL}</span>
        <span className="hidden sm:inline">· Built on patent-registered research · View the record →</span>
      </a>
      <div className={`transition-all duration-300 ${scrolled || open ? "border-b border-white/10 bg-navy/90 shadow-lg backdrop-blur-md" : "bg-navy/40 backdrop-blur-sm"}`}>
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
          <a href="#top" className="text-white" aria-label="SamiRodi home"><Logo /></a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative text-sm font-medium text-slate-200 transition-colors hover:text-amber-light">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-brass hidden !px-5 !py-2 sm:inline-flex">Get a Quote</a>
            <button className="rounded-md p-2 text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed inset-x-0 bottom-0 top-[100px] bg-navy md:hidden">
            <ul className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map((l) => (
                <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-4 font-display text-xl text-slate-100 hover:bg-white/5">{l.label}</a></li>
              ))}
              <li className="mt-4"><a href="#contact" onClick={() => setOpen(false)} className="btn-brass w-full">Get a Quote</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
