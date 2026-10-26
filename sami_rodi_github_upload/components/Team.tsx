import { ExternalLink } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { TEAM, hasValue } from "@/lib/config";

export default function Team() {
  return (
    <SectionWrapper id="team" eyebrow="Team" title="The people behind the technology">
      <div className="grid gap-6 md:grid-cols-3">
        {TEAM.map((m) => (
          <article key={m.name} className="lift rounded-lg border border-line border-t-2 border-t-navy bg-white p-8">
            <span aria-hidden="true" className="mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-navy font-display text-2xl font-semibold text-amber-light">{m.name.replace("Prof. ", "").split(" ").map((w) => w[0]).join("")}</span>
            <h3 className="font-display text-2xl font-semibold text-navy">{m.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-amber-700">{m.role}</p>
            <p className="mt-3 leading-relaxed text-slate-600">{hasValue(m.bio) ? m.bio : m.bio.replace(/ TODO:.*$/, "")}</p>
            {m.orcid && <a href={m.orcid} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy underline underline-offset-4">ORCID profile <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm text-slate-500">Our work builds on the posistor-protection research of A. S. Tonkoshkur and colleagues at Oles Honchar Dnipro National University.</p>
    </SectionWrapper>
  );
}
