"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SectionWrapper from "./SectionWrapper";
import { climateData, overloadData, priceData } from "@/data/charts";
import { PRICE_BASIS, RESEARCH } from "@/lib/config";

const C = { bad: "#D6453D", navy: "#16304A", amber: "#C9A24A", green: "#2E9E6B" };

function ChartCard({ title, caption, children }: { title: string; caption: string; children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <figure ref={ref} className="lift rounded-lg border border-line bg-white p-6 shadow-soft">
      <figcaption className="mb-1 font-display text-lg font-semibold text-navy">{title}</figcaption>
      <div className="h-72" role="img" aria-label={`${title}. ${caption}`}>
        {inView ? <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer> : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{caption}</p>
    </figure>
  );
}

const axis = { stroke: "#94A3B8", fontSize: 12 } as const;

export default function ScienceCharts() {
  return (
    <SectionWrapper id="science" eyebrow="The science" title="What the research shows" intro="Every number below comes from our published research. Nothing here is a marketing estimate, except the price comparison, which uses the stated market assumption.">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="The damage protection is built to prevent" caption="In laboratory tests, each reverse-overload event cut an unprotected cell's maximum power by about 3.5% on average, and the damage accumulates. Extrapolated linearly from the measured per-event loss.">
          <LineChart data={overloadData} margin={{ top: 10, right: 10, left: -10, bottom: 16 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="events" {...axis} label={{ value: "Reverse-overload events", position: "insideBottom", offset: -8, fontSize: 12, fill: "#64748B" }} />
            <YAxis {...axis} domain={[50, 100]} unit="%" />
            <Tooltip formatter={(v: number) => `${v}%`} /><Legend verticalAlign="top" height={30} />
            <Line type="monotone" dataKey="pmax" name="Max power remaining" stroke={C.bad} strokeWidth={2.5} dot={false} animationDuration={900} />
            <Line type="monotone" dataKey="isc" name="Short-circuit current remaining" stroke={C.navy} strokeWidth={2.5} dot={false} animationDuration={900} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Net efficiency of a CPCF-protected cell by climate" caption="After the small loss in the protective layer, net efficiency stays high in cool climates and drops in hot ones. This is why we are launching in temperate-to-cool markets first.">
          <BarChart data={climateData} margin={{ top: 10, right: 10, left: -10, bottom: 4 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="zone" {...axis} fontSize={11} />
            <YAxis {...axis} domain={[50, 100]} unit="%" />
            <Tooltip formatter={(v: number) => `${v}%`} /><Legend verticalAlign="top" height={30} />
            <Bar dataKey="low" name="Low end of range" fill={C.amber} animationDuration={900} radius={[6, 6, 0, 0]} />
            <Bar dataKey="high" name="High end of range" fill={C.green} animationDuration={900} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard title="Upfront price: market average vs SamiRodi" caption="SamiRodi panels are priced 5% below the market average module price, with cell-level protection included.">
            <BarChart data={priceData} margin={{ top: 10, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" {...axis} />
              <YAxis {...axis} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v: number) => `$${v}`} /><Legend verticalAlign="top" height={30} />
              <Bar dataKey="market" name="Market average" fill="#94A3B8" animationDuration={900} radius={[6, 6, 0, 0]} />
              <Bar dataKey="samirodi" name="SamiRodi" fill={C.navy} animationDuration={900} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Data: {RESEARCH.chartSource}. Market price basis: <a href={PRICE_BASIS.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-navy underline underline-offset-2">{PRICE_BASIS.sourceLabel}</a>. See the <a href="#research" className="font-medium text-navy underline underline-offset-2">Research</a> section.
      </p>
    </SectionWrapper>
  );
}
