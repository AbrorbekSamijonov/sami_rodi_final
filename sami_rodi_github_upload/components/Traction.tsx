import { CheckCircle2, Circle } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { MILESTONES } from "@/lib/config";

export default function Traction() {
  return (
    <SectionWrapper id="roadmap" alt eyebrow="Traction & roadmap" title="From research to rooftops">
      <ol className="relative max-w-3xl space-y-7 border-l-2 border-line pl-8">
        {MILESTONES.map((m) => (
          <li key={m.title} className="relative">
            <span className="absolute -left-[2.6rem] top-0.5 rounded-full bg-white">
              {m.done ? <CheckCircle2 className="h-6 w-6 text-energy" aria-label="Completed" /> : <Circle className="h-6 w-6 text-slate-300" aria-label="Planned" />}
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{m.when}{!m.done && " · planned"}</p>
            <h3 className="font-display text-lg font-semibold text-navy">{m.title}</h3>
            <p className="text-slate-600">{m.body}</p>
          </li>
        ))}
      </ol>

    </SectionWrapper>
  );
}
