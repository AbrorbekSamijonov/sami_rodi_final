import { AlertCircle, BookOpen, ExternalLink, ScrollText } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { LIMITATIONS, PAPERS, PATENT, RESEARCH } from "@/lib/config";

export default function Research() {
  return (
    <SectionWrapper id="research" eyebrow="Research" title="Backed by research" intro="Our technology builds on peer-reviewed work and laboratory experiments from Oles Honchar Dnipro National University.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {PAPERS.map((p) => (
            <article key={p.id} className="lift rounded-lg border border-line bg-white p-8 shadow-soft">
              <span className="mb-4 inline-flex text-amber-700"><BookOpen className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="font-display text-xl font-semibold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{p.authors}</p>
              <p className="text-sm text-slate-500">{p.venue}</p>
              <p className="mt-4 leading-relaxed text-slate-600">{p.summary}</p>
              <a href={p.doi} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-panel">
                Read the paper <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {RESEARCH.authors.map((a) => (
              <li key={a.name}><a href={a.orcid} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-navy underline underline-offset-4 hover:text-panel">{a.name}&apos;s ORCID profile <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <article className="rounded-lg border border-amber/60 bg-navy p-8 text-slate-200 shadow-soft">
            <span className="mb-5 inline-flex text-amber-700"><ScrollText className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="font-display text-xl font-semibold text-white">Foundation patent</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-slate-400">Number</dt><dd className="font-medium text-white">{PATENT.number} ({PATENT.kind})</dd></div>
              <div><dt className="text-slate-400">Filed / granted</dt><dd className="font-medium text-white">{PATENT.filed} / {PATENT.granted}</dd></div>
              <div><dt className="text-slate-400">Owner</dt><dd className="font-medium text-white">{PATENT.owner}</dd></div>
              <div><dt className="text-slate-400">Status</dt><dd className="font-medium text-white">{PATENT.status}</dd></div>
            </dl>
            <a href={PATENT.url} target="_blank" rel="noopener noreferrer" className="btn-brass mt-6 w-full">View register entry <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          </article>
          <article className="lift rounded-lg border border-line bg-white p-8 shadow-soft">
            <span className="mb-4 inline-flex text-amber-700"><AlertCircle className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="font-display text-lg font-semibold text-navy">What the research does not yet show</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">{LIMITATIONS.map((l) => <li key={l}>{l}</li>)}</ul>
          </article>
        </div>
      </div>
    </SectionWrapper>
  );
}
