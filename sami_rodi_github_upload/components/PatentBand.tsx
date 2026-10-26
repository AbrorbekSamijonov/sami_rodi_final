import { ExternalLink, FileCheck2 } from "lucide-react";
import { PATENT } from "@/lib/config";

/** Foundation-patent facts directly under the hero. Mirrors the official register entry. */
export default function PatentBand() {
  const rows = [
    { l: "Patent no.", v: PATENT.number },
    { l: "Granted", v: PATENT.granted },
    { l: "Owner", v: PATENT.owner },
    { l: "Status", v: PATENT.status },
  ];
  return (
    <section aria-label="Foundation patent" className="relative border-y border-amber/40 bg-panel text-white">
      <div className="mx-auto grid max-w-content gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_2fr_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <FileCheck2 className="h-10 w-10 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p className="font-display text-2xl font-semibold">Built on patent-registered research</p>
            <p className="text-sm text-slate-300">{PATENT.kind}, inventors {PATENT.inventors}.</p>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          {rows.map((r) => (<div key={r.l}><dt className="text-xs uppercase tracking-wider text-slate-400">{r.l}</dt><dd className="text-sm font-medium">{r.v}</dd></div>))}
        </dl>
        <a href={PATENT.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">View register entry <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
      </div>
    </section>
  );
}
