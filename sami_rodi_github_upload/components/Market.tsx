import SectionWrapper from "./SectionWrapper";
import { COMPETITION, MARKET, MARKET_SPEND, PRICE_BASIS } from "@/lib/config";

export default function Market() {
  const stats = [
    { v: `${MARKET.newGW2025} GW`, l: "new solar PV installed worldwide in 2025" },
    { v: `~${MARKET.cumulativeTW} TW`, l: "cumulative installed capacity" },
    { v: `${MARKET.distributedGW} GW`, l: "of 2025 additions were distributed (rooftop-type) PV" },
  ];
  return (
    <SectionWrapper id="market" alt eyebrow="Market" title="A very large market, losing value to shade and heat" intro="Solar is the fastest-growing source of new power. Every rooftop with trees, chimneys or dust is a place where cell-level protection matters.">
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.l} className="lift rounded-lg border border-line border-t-2 border-t-navy bg-mist p-7">
            <p className="font-display text-4xl font-bold text-navy">{s.v}</p>
            <p className="mt-2 text-slate-600">{s.l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Source: <a href={MARKET.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{MARKET.source}</a>. Our estimate: at ${PRICE_BASIS.marketPerWatt.toFixed(2)}/W, annual module spend is about ${MARKET_SPEND.totalB}B globally, of which about ${MARKET_SPEND.distributedB}B is distributed PV.
      </p>

      <h3 className="mt-16 font-display text-2xl font-semibold text-navy">How we compare</h3>
      <div className="mt-6 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[620px] text-left text-sm">
          <caption className="sr-only">Comparison of SamiRodi with bypass diodes and module-level electronics</caption>
          <thead className="bg-navy text-white">
            <tr><th scope="col" className="p-4"><span className="sr-only">Feature</span></th><th scope="col" className="p-4 font-medium">Bypass diodes</th><th scope="col" className="p-4 font-medium">Optimizers / microinverters</th><th scope="col" className="p-4 font-medium text-amber-light">SamiRodi CPCF</th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {COMPETITION.map((r) => (
              <tr key={r.label}><th scope="row" className="p-4 font-medium text-navy">{r.label}</th><td className="p-4 text-slate-600">{r.diodes}</td><td className="p-4 text-slate-600">{r.mlpe}</td><td className="p-4 font-medium text-navy">{r.us}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}
