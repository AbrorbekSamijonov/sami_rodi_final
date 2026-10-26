// Chart data below is taken from the two papers cited on the site.
// Source A: Tonkoshkur et al., monograph (2021), Table 5.2.
// Source B: Korsunskyi & Nakashydze, Vidnovluvana Energetyka 3(86), 2026.

import { marketPrice, samirodiPrice } from "@/lib/config";

// Source A, Table 5.2: average relative decrease per reverse-breakdown cycle of an unprotected cell.
// Damage is reported as additive (cumulative), so the cumulative curve is a linear extrapolation.
export const PER_EVENT_LOSS = { pmax: 3.5, isc: 1.5 };
export const overloadData = Array.from({ length: 11 }, (_, n) => ({
  events: n,
  pmax: +(100 - PER_EVENT_LOSS.pmax * n).toFixed(1),
  isc: +(100 - PER_EVENT_LOSS.isc * n).toFixed(1),
}));

// Source B, Results: efficiency ranged 0.72–0.97 over 625 simulations.
export const climateData = [
  { zone: "Cool climates (high-latitude winters)", low: 95, high: 97 },
  { zone: "Hot climates (equatorial summers)", low: 72, high: 80 },
];

// Price comparison from lib/config.ts assumption (market average + 10%).
export const priceData = [
  { name: "400W panel", market: marketPrice(400), samirodi: samirodiPrice(400) },
  { name: "450W panel", market: marketPrice(450), samirodi: samirodiPrice(450) },
];
