/**
 * Central site configuration.
 * Every claim, price, stat and link shown on the site comes from here or /data/charts.ts.
 * Items marked TODO still need a verified value from the team.
 */

export const BRAND = {
  name: "SamiRodi",
  tagline: "Shade-Resilient Solar Panels",
  mission: "Solar panels built to keep producing, even when part of the panel is in shade.",
  contactEmail: "hello@samirodi.com", // TODO: replace with real contact email
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://samirodi.com",
};

/**
 * Foundation patent. Source: Ukrainian IP register (iprop-ua.com).
 * IMPORTANT: this is a utility model owned by Oles Honchar Dnipro National University, and the register
 * marks it "Дію патенту припинено" (no longer in force). Do not describe it as SamiRodi's own or active patent.
 */
export const PATENT = {
  number: "UA 141608",
  kind: "Utility model (Ukraine)",
  application: "u201907663",
  filed: "8 July 2019",
  granted: "27 April 2020",
  owner: "Oles Honchar Dnipro National University",
  inventors: "A. S. Tonkoshkur, A. V. Ivanchenko, V. O. Makarov",
  ipc: "H02H 1/00",
  status: "No longer in force",
  url: "https://iprop-ua.com/inv/46ilg1mq/",
};
export const PATENT_LABEL = `Foundation patent ${PATENT.number}`;
export const hasValue = (s: string) => !s.startsWith("TODO");

export const TRUST_CLAIMS = [
  "Peer-reviewed research (2026)",
  "Built on patent-registered research",
  "Modeled across 625 global scenarios",
];

/** Source for the price assumption below. TODO: replace with distributor quotes. */
export const PRICE_BASIS = {
  marketPerWatt: 0.4, // USD/W, midpoint of $0.30–$0.50/W 2026 module-only range (SunHub)
  premium: -0.05, // SamiRodi priced 5% below the market average
  sourceLabel: "SunHub, Solar Panel Price Per Watt in 2026",
  sourceUrl: "https://www.sunhub.com/blog/solar-panel-price-per-watt/",
};
export const marketPrice = (watts: number) => Math.round(watts * PRICE_BASIS.marketPerWatt);
export const samirodiPrice = (watts: number) => Math.round(watts * PRICE_BASIS.marketPerWatt * (1 + PRICE_BASIS.premium));

/** Figures taken directly from the published papers. */
export const STATS = [
  { value: 625, prefix: "", suffix: "", label: "global climate scenarios simulated" },
  { value: 48, prefix: "≥", suffix: " K", label: "thermal safety margin below switching temperature (48.2 K)" },
  { value: 97, prefix: "up to ", suffix: "%", label: "net electrical efficiency in cool climates (simulation)" },
];

export const PAPERS = [
  {
    id: "paper-2026",
    title: "A multi-objective optimization of conductive polymer composite fuses for enhanced solar cell protection and efficiency",
    authors: "R. Korsunskyi, L. Nakashydze",
    venue: "Vidnovluvana Energetyka (Renewable Energy), No. 3/2026, pp. 246–252",
    doi: "https://doi.org/10.36296/1819-8058.2026.3(86).246-252",
    summary:
      "Simulates a CPCF-protected silicon cell in 625 global scenarios (latitudes −60° to +60°, full year). The 0.50 mm design never reached its switching temperature in normal operation (safety margin ≥ 48.2 K) and delivered net electrical efficiency from 0.72 in equatorial summers up to 0.97 in polar winters. It identifies a performance “Golden Zone” near ±55° latitude and concludes CPCF protection is most viable in temperate-to-polar climates.",
  },
  {
    id: "monograph-2021",
    title: "Application of polymer posistor nanocomposites in systems for protecting photovoltaic components of solar arrays from electrical overloads",
    authors: "A. S. Tonkoshkur, A. V. Ivanchenko, L. V. Nakashydze, A. Yu. Lyashkov, I. V. Gomilko",
    venue: "Monograph, Primedia eLaunch, Boston, USA (2021), ISBN 978-1-63972-054-5",
    doi: "https://doi.org/10.46299/978-1-63972-054-5",
    summary:
      "Foundational monograph from Oles Honchar Dnipro National University. Shows experimentally that each reverse-overload event cuts an unprotected silicon cell's maximum power by about 3.5% on average, that this damage accumulates, and that a posistor (resettable-fuse) layer in thermal contact with the cell can limit power on a shaded or faulty cell.",
  },
];

export const TEAM = [
  { name: "Rodion Korsunskyi", role: "Founder", bio: "Lead researcher and first author of the CPCF optimization studies. Student at Bowdoin College, Brunswick, Maine, USA.", orcid: "https://orcid.org/0009-0001-5361-0641" },
  { name: "Abrorbek Samijonov", role: "Co-founder", bio: "Co-founder of SamiRodi. Student at Bowdoin College, Brunswick, Maine, USA.", orcid: "" },
  { name: "Prof. Liliia Nakashydze", role: "Scientific advisor", bio: "Doctor of Technical Sciences, Senior Research Fellow, Oles Honchar Dnipro National University, Ukraine. Co-author of the CPCF research.", orcid: "https://orcid.org/0000-0003-3990-6718" },
];

export const RESEARCH = {
  authors: [
    { name: "Rodion Korsunskyi", role: "Founder, first author", affiliation: "Student, Bowdoin College, Brunswick, Maine, USA", orcid: "https://orcid.org/0009-0001-5361-0641" },
    { name: "Liliia Nakashydze", role: "Co-author, research collaborator", affiliation: "Doctor of Technical Sciences, Oles Honchar Dnipro National University, Ukraine", orcid: "https://orcid.org/0000-0003-3990-6718" },
  ],
  chartSource: "Korsunskyi & Nakashydze (2026) and Tonkoshkur et al. (2021)",
};

export const LIMITATIONS = [
  "The 2026 results are simulation-based; experimental validation of the full design is the next step.",
  "Net efficiency falls to about 0.72 in hot equatorial climates (a ~25% penalty), so SamiRodi targets temperate-to-cool markets first.",
  "Lifespan gains follow from avoiding cumulative reverse-overload damage; long-term field data is still to be collected.",
];

export const MARKET = {
  newGW2025: 698,
  cumulativeTW: 3,
  distributedGW: 288,
  utilitySharePct: 59,
  source: "IEA PVPS, Snapshot of Global PV Markets 2026",
  sourceUrl: "https://iea-pvps.org/wp-content/uploads/2026/05/Snapshot-2026-FS.pdf",
};
const spendB = (gw: number) => Math.round((gw * 1e9 * PRICE_BASIS.marketPerWatt) / 1e9);
export const MARKET_SPEND = { totalB: spendB(MARKET.newGW2025), distributedB: spendB(MARKET.distributedGW) };

export const PRICING = [
  { id: "res-400", name: "Residential Panel 400W", watts: 400, price: samirodiPrice(400), currency: "USD", blurb: "For typical rooftop systems with occasional shade.", features: ["Per-cell CPCF protection", "Resettable hotspot isolation", "Standard mounting", "Warranty: contact us"], cta: "Get a Quote", highlighted: false },
  { id: "res-450", name: "Residential Panel 450W", watts: 450, price: samirodiPrice(450), currency: "USD", blurb: "Higher output for space-constrained roofs.", features: ["Per-cell CPCF protection", "Resettable hotspot isolation", "Higher power density", "Warranty: contact us"], cta: "Get a Quote", highlighted: true },
  { id: "commercial", name: "Commercial / Bulk", watts: null as number | null, price: null as number | null, currency: "USD", blurb: "Volume pricing for installers, developers and commercial roofs.", features: ["Volume pricing", "Technical support", "Custom logistics", "Licensing & OEM options"], cta: "Contact Us", highlighted: false },
];

export const COMPARISON = [
  { label: "Upfront price (400W)", standard: `≈ $${marketPrice(400)}`, samirodi: `≈ $${samirodiPrice(400)} (5% below)` },
  { label: "Hotspot protection level", standard: "Group of cells (bypass diodes)", samirodi: "Individual cell (CPCF)" },
  { label: "Reverse-overload damage", standard: "Cumulative, ~3.5% max power per event (lab)", samirodi: "Cell isolated as it heats (design intent)" },
  { label: "Warranty", standard: "Varies by maker", samirodi: "Contact us" },
];

export const BUSINESS_MODEL = [
  { title: "Premium panels via installers", body: "Sell SamiRodi panels through installers and distributors at 5% below the market average module price." },
  { title: "Licensing & OEM", body: "License the CPCF layer to panel manufacturers who want per-cell protection in their own lines." },
  { title: "Commercial & bulk projects", body: "Volume supply for commercial rooftops and developers where shade and degradation risk drive lifetime cost." },
];

export const COMPETITION = [
  { label: "Protection granularity", diodes: "Group of cells (substring)", mlpe: "Whole module", us: "Individual cell" },
  { label: "Acts inside the cell stack", diodes: "No", mlpe: "No", us: "Yes: layer under each cell" },
  { label: "Extra active electronics", diodes: "No", mlpe: "Yes", us: "No (passive polymer layer)" },
  { label: "Resets automatically", diodes: "n/a", mlpe: "n/a", us: "Yes: returns to conducting state on cooling" },
];

export const MILESTONES = [
  { when: "2021", title: "Foundational monograph published", body: "Primedia eLaunch, Boston: experiments on posistor protection of PV cells.", done: true },
  { when: "2025", title: "Thermal-electrical model of the cell + CPCF", body: "Vidnovluvana Energetyka 3(82), 2025.", done: true },
  { when: "2026", title: "Peer-reviewed optimization study", body: "625 global scenarios, published in Vidnovluvana Energetyka 3(86), Sept 2026.", done: true },
  { when: "2020", title: "Foundation patent registered", body: "Ukrainian utility model UA 141608, Oles Honchar Dnipro National University.", done: true },
  { when: "Next", title: "Secure our own IP position", body: "License the university IP and/or file new claims on the per-cell design.", done: false },
  { when: "Next", title: "Prototype cells and lab validation", body: "Build working CPCF-integrated cells and measure shaded-cell temperature and output.", done: false },
  { when: "Next", title: "Certification testing", body: "IEC 61215 / IEC 61730 qualification with an accredited lab.", done: false },
  { when: "Next", title: "Field pilot and manufacturing partner", body: "Pilot rooftop installs and a contract manufacturer for first production runs.", done: false },
];

export const FAQS = [
  { q: "How does CPCF work?", a: "A conductive polymer composite layer sits in thermal contact with each cell. It conducts normally at everyday temperatures. When a shaded cell heats toward the switching temperature, the polymer expands, the conductive paths separate and resistance rises by orders of magnitude, limiting power in that cell. When it cools, the layer returns to its conducting state." },
  { q: "Is it compatible with existing inverters?", a: "The protection happens inside the panel, so the panel is designed to behave as a standard module electrically. Contact us to confirm compatibility with your inverter." },
  { q: "What's the warranty?", a: "Warranty terms are being finalized. Contact us for current terms." },
  { q: "How is this different from bypass diodes?", a: "Bypass diodes protect groups of cells. CPCF protects each individual cell, so a single shaded cell can be limited without switching off a whole group." },
  { q: "Is it patented?", a: "The underlying idea is documented in Ukrainian utility model patent UA 141608 (Oles Honchar Dnipro National University, granted 2020), which is no longer in force. Contact us about our IP position and licensing." },
  { q: "Is it proven?", a: "It is backed by peer-reviewed research: a 2026 simulation study across 625 global scenarios and earlier laboratory work on posistor protection. Experimental validation of the full panel and field data are the next milestones." },
  { q: "How do I order?", a: "Use the form below to request a quote. Our team will reply with availability, pricing and lead times." },
  { q: "Where do you ship?", a: "We are starting with temperate-to-cool climates, where the research shows the best results. Contact us about your location." },
];

export const NAV_LINKS = [
  { href: "#technology", label: "Technology" },
  { href: "#research", label: "Research" },
  { href: "#market", label: "Market" },
  { href: "#team", label: "Team" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];
