import { Handshake, Package, Building2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { BUSINESS_MODEL } from "@/lib/config";

const ICONS = [Package, Handshake, Building2];

export default function BusinessModel() {
  return (
    <SectionWrapper id="business" eyebrow="Business model" title="How SamiRodi makes money">
      <div className="grid gap-6 md:grid-cols-3">
        {BUSINESS_MODEL.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <article key={b.title} className="lift rounded-lg border border-line border-t-2 border-t-navy bg-white p-7 shadow-soft">
              <span className="mb-5 inline-flex text-amber-700"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="font-display text-lg font-semibold text-navy">{b.title}</h3>
              <p className="mt-2 text-slate-600">{b.body}</p>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
