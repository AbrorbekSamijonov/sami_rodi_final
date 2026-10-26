import Logo from "./Logo";
import { BRAND, PATENT, PATENT_LABEL } from "@/lib/config";

const LINKS = [
  { href: "/#technology", label: "Technology" },
  { href: "/#research", label: "Research" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Logo className="text-white" />
            <p className="mt-4 text-sm leading-relaxed">{BRAND.mission}</p>
            <a href={`mailto:${BRAND.contactEmail}`} className="mt-4 inline-block text-sm text-amber-light underline-offset-4 hover:underline">{BRAND.contactEmail}</a>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {LINKS.map((l) => <li key={l.label}><a href={l.href} className="hover:text-amber">{l.label}</a></li>)}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <p>© 2025 {BRAND.name}. All rights reserved.</p>
          <p><a href={PATENT.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-amber">{PATENT_LABEL}</a></p>
        </div>
      </div>
    </footer>
  );
}
