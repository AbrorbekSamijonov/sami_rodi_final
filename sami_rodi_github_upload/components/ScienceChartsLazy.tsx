"use client";

import dynamic from "next/dynamic";

/** Charts load client-side only, after the initial page render. */
const ScienceCharts = dynamic(() => import("./ScienceCharts"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-mist" aria-hidden="true" />,
});

export default function ScienceChartsLazy() {
  return <ScienceCharts />;
}
