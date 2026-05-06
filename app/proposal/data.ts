// Cornbread Hemp × AGV Miami — Abbey Road on the River 2026
// Activation Deployment Program proposal data.
// Engagement model: modular execution-only deployment (no creative refab,
// no engineering build) — per-activation, per-month, one-time upgrades,
// and optional add-ons. Composed against an applied Abbey Road engagement
// and a four-event 2026 calendar projection.

export type Money = number; // dollars

// ─────────────────────────────────────────────────────────────────────────
// Document
// ─────────────────────────────────────────────────────────────────────────

export const CBH_THEME = {
  primary: "#C5883F", // Cornbread orange
  primaryDark: "#8E5C24", // burnt orange
  secondary: "#3A2A1B", // cedar
  accent: "#3D441D", // cannabis green
  paper: "#FAF5E8", // buttermilk paper
  ink: "#1F1611", // near-black ink
};

export const CBH_DOC = {
  client: "Cornbread Hemp",
  clientLong: "Cornbread Hemp, Inc.",
  producer: "AGV Miami",
  producerLong: "AGV Miami, LLC",
  contactClient: "Jess Gago",
  contactClientTitle: "Brand Activations Manager, Cornbread Hemp",
  contactProducer: "julian@agvmiami.com",
  venue: "RiverStage · Big Four Station Park",
  city: "Jeffersonville, IN",
  docNumber: "AGORA-CBH-001",
  version: "v2.1 — May 5, 2026",
  validity: "Valid for thirty (30) calendar days from the version date.",
  programWindow: "2026 Cornbread Activation Calendar",
  paymentDepositPct: 50,
  paymentBalancePct: 50,
  preparedOn: "May 5, 2026",
};

// ─────────────────────────────────────────────────────────────────────────
// Modular Pricing — per-activation, per-month, upgrades, optional add-ons
// Replaces tiered build menu since Cornbread is execution-only deployment.
// ─────────────────────────────────────────────────────────────────────────

export type PricingGroupId = "perActivation" | "perMonth" | "upgrades" | "addOns";

export type PricingBasis =
  | "per activation"
  | "per month"
  | "per instance"
  | "one-time";

export type PricingLine = {
  num: number;
  name: string;
  description: string;
  price: Money;
  basis: PricingBasis;
  startingAt?: boolean;
};

export type PricingGroup = {
  id: PricingGroupId;
  num: string;
  title: string;
  pitch: string;
  fitFor: string;
  lines: PricingLine[];
};

export const CBH_PRICING_GROUPS: PricingGroup[] = [
  {
    id: "perActivation",
    num: "01",
    title: "Per Activation",
    pitch: "What moves with each event.",
    fitFor: "Quoted to the event — three lines, no surprises.",
    lines: [
      {
        num: 1,
        name: "Build & Strike — Logistics",
        description:
          "Truck rental, fuel, freight insurance, and round-trip transport from the AGV Miami warehouse to the venue. Long-haul routes (1,000+ miles one-way) noted on the calendar; baseline holds for routes inside that window.",
        price: 4500,
        basis: "per activation",
      },
      {
        num: 2,
        name: "Build & Strike — Labor (Local Hires)",
        description:
          "Two-crew lift sourced near the venue for build and strike days through the AGV regional partner network, supervised on site by the AGV producer.",
        price: 1800,
        basis: "per activation",
      },
      {
        num: 3,
        name: "Build & Strike — Travel & Lodging (1–2 AGV Crew)",
        description:
          "Round-trip travel and lodging for the AGV producer (and second lead on long-haul routes). Itemized at cost — same per diem and lodging rates published below.",
        price: 2500,
        basis: "per activation",
      },
    ],
  },
  {
    id: "perMonth",
    num: "02",
    title: "Per Month",
    pitch: "Where the asset lives between events.",
    fitFor: "Climate-monitored, alarmed, on a 48-hour mobilization clock.",
    lines: [
      {
        num: 4,
        name: "Storage — Monthly Hold (NYC or Miami)",
        description:
          "Climate-monitored, alarmed warehouse hold at the AGV facility of choice. Includes inventory tracking, condition logging, and 48-hour mobilization for the next event on the calendar.",
        price: 1500,
        basis: "per month",
      },
    ],
  },
  {
    id: "upgrades",
    num: "03",
    title: "Upgrades",
    pitch: "Investments in the activation itself.",
    fitFor: "Plants ride per event; lighting lands once and amortizes.",
    lines: [
      {
        num: 5,
        name: "Plants — Foliage Rental (Per Activation Instance)",
        description:
          "Commercial-grade outdoor artificial foliage scaled to the planter ring. Sourced, planted, and pulled each instance — the same kit redeploys cleanly across the calendar.",
        price: 1200,
        basis: "per instance",
      },
      {
        num: 6,
        name: "Lighting — Upgrade + Routine Maintenance",
        description:
          "One-time fixture purchase tuned for evening illumination, with astronomical timer programming and a single venue drop. Routine maintenance is carried forward across deployments at no surcharge.",
        price: 4500,
        basis: "one-time",
      },
    ],
  },
  {
    id: "addOns",
    num: "04",
    title: "Optional Add-Ons",
    pitch: "Available on request, quoted before execution.",
    fitFor: "Pre-deployment refresh and rebrand passes — when the moment calls for it.",
    lines: [
      {
        num: 7,
        name: "Maintenance — Pre-Deployment Activation Refresh",
        description:
          "A pre-event touch-up pass: paint, hardware, finishes, and lighting recalibration. Quoted to scope at request, scaled to the condition of the asset on intake.",
        price: 2500,
        basis: "per instance",
        startingAt: true,
      },
      {
        num: 8,
        name: "Refab — Pre-Deployment Activation Rebrand",
        description:
          "Graphics, wraps, or finish refresh aligned with a new campaign or partnership. Quoted to scope at request — designed at the front end so the rebrand lands clean on the activation it travels to.",
        price: 7500,
        basis: "per instance",
        startingAt: true,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Abbey Road — applied composition pulled from the rate card.
// ─────────────────────────────────────────────────────────────────────────

export type AbbeyComposition = {
  pricingLineNum: number;
  amount: Money;
  rationale?: string;
};

export const CBH_ABBEY_COMPOSITION: AbbeyComposition[] = [
  {
    pricingLineNum: 1,
    amount: 4500,
    rationale: "Asymmetric route — short Louisville pickup, long Miami return absorbed inside the baseline.",
  },
  { pricingLineNum: 2, amount: 1800 },
  { pricingLineNum: 3, amount: 2500 },
  { pricingLineNum: 5, amount: 1200 },
  {
    pricingLineNum: 6,
    amount: 4500,
    rationale: "Year-1 only — the lighting upgrade carries the calendar forward.",
  },
];

export const CBH_ABBEY_TOTALS = {
  perActivation:
    CBH_ABBEY_COMPOSITION.filter((c) => [1, 2, 3].includes(c.pricingLineNum)).reduce(
      (s, c) => s + c.amount,
      0,
    ),
  upgrades:
    CBH_ABBEY_COMPOSITION.filter((c) => [5, 6].includes(c.pricingLineNum)).reduce(
      (s, c) => s + c.amount,
      0,
    ),
  net: CBH_ABBEY_COMPOSITION.reduce((s, c) => s + c.amount, 0),
};

// ─────────────────────────────────────────────────────────────────────────
// Activation Sites — 2026 calendar, four events, same rate card applied.
// ─────────────────────────────────────────────────────────────────────────

export type EventStatus = "Confirmed" | "Quoting" | "Held";
export type Market = "local" | "out_of_market";

export type ActivationSite = {
  id: string;
  tag: string;
  name: string;
  city: string;
  dates: string;
  setup: string;
  strike: string;
  market: Market;
  oneWayMiles: number;
  perEvent: Money;
  plants: Money;
  status: EventStatus;
  body: string;
};

export const CBH_SITES: ActivationSite[] = [
  {
    id: "abbey-road",
    tag: "01",
    name: "Abbey Road on the River",
    city: "Jeffersonville, IN",
    dates: "May 21 — 25, 2026",
    setup: "Tue, May 19",
    strike: "Tue, May 26",
    market: "out_of_market",
    oneWayMiles: 1200,
    perEvent: 8800,
    plants: 1200,
    status: "Quoting",
    body: "Anchor engagement on the 2026 calendar. Asymmetric haul — short Louisville pickup at the holding vendor, long Miami return to the AGV warehouse. Build complete and walk-through signed by end of day Tuesday, May 19; activation lit and VIP-ready for the opening party Wednesday evening, May 20.",
  },
  {
    id: "mn-yacht-club",
    tag: "02",
    name: "Minnesota Yacht Club Festival",
    city: "St. Paul, MN",
    dates: "Jul 17 — 19, 2026",
    setup: "Wed, Jul 15",
    strike: "Mon, Jul 20",
    market: "out_of_market",
    oneWayMiles: 1800,
    perEvent: 8800,
    plants: 1200,
    status: "Held",
    body: "Longest haul on the calendar. Two-driver rotation built into the logistics line. Round-trip from the AGV Miami warehouse; storage runs through the months between deployments at the published monthly rate.",
  },
  {
    id: "nc-folk-festival",
    tag: "03",
    name: "North Carolina Folk Festival",
    city: "Greensboro, NC",
    dates: "Sept 18 — 20, 2026",
    setup: "Wed, Sept 16",
    strike: "Mon, Sept 21",
    market: "out_of_market",
    oneWayMiles: 800,
    perEvent: 8800,
    plants: 1200,
    status: "Held",
    body: "Mid-haul outdoor deployment. Single-driver routing each way. Power drop and rain-day protocol confirmed with the venue at the discovery gate; lighting timer recut to the local sunset window.",
  },
  {
    id: "fin-fest",
    tag: "04",
    name: "Fin Fest",
    city: "St. Petersburg, FL",
    dates: "Nov 13 — 14, 2026",
    setup: "Wed, Nov 11",
    strike: "Sat, Nov 15",
    market: "local",
    oneWayMiles: 270,
    perEvent: 5300,
    plants: 1200,
    status: "Held",
    body: "In-market for AGV Miami. Day trips for crew; no lodging line. Lowest cost-per-event on the calendar — a clean year-end deployment that sets the asset up for winter storage and the 2027 cycle.",
  },
];

export const CBH_CALENDAR_TOTALS = {
  productionAnnual:
    CBH_SITES.reduce((s, e) => s + e.perEvent + e.plants, 0) + 4500,
  storageAnnualMidpoint: 1500 * 11,
};

// ─────────────────────────────────────────────────────────────────────────
// Scope Taxonomy — Components × Services. Tier-agnostic; each node either
// applies to every deployment or is called out as a per-event variable.
// ─────────────────────────────────────────────────────────────────────────

export type ScopeNode = {
  id: string;
  num: string;
  kind: "Components" | "Services";
  name: string;
  sub: string;
  narrative: string;
};

export const CBH_TAXONOMY: ScopeNode[] = [
  // COMPONENTS
  {
    id: "asset",
    num: "01",
    kind: "Components",
    name: "Existing Activation Asset",
    sub: "Cornbread-Owned Build · Inventory · Condition",
    narrative:
      "The Cornbread-owned activation as it exists today — structure, planters, finishes. AGV Miami catalogues the inventory at the discovery gate, reconciles it against the holding vendor manifest at pickup, and returns it on condition. No structural changes to the existing build inside this engagement.",
  },
  {
    id: "plants",
    num: "02",
    kind: "Components",
    name: "Artificial Foliage (Plants)",
    sub: "Outdoor-Grade · Planter Ring Fitment · Per-Event Rental",
    narrative:
      "Commercial-grade outdoor artificial foliage scaled to the existing planter count. Sourced and crated at AGV Miami, planted and weighted on build day, returned with the truck on strike. Same kit redeploys clean across the calendar.",
  },
  {
    id: "lighting",
    num: "03",
    kind: "Components",
    name: "Lighting Kit",
    sub: "Evening Illumination · Astronomical Timer · Single Venue Drop",
    narrative:
      "Evening illumination kit programmed to an astronomical timer — up at sunset, down at venue call. Single drop off the venue's electrical supply. The lighting upgrade is a one-time purchase that titles to Cornbread on final payment, with routine maintenance carried forward across deployments.",
  },
  {
    id: "transport-hw",
    num: "04",
    kind: "Components",
    name: "Transport & Staging Hardware",
    sub: "Crating · Dunnage · Reusable Packing",
    narrative:
      "Pad kits, blanket-wrap, dunnage, and reusable packing assembled to the asset's footprint. Built once, reused across every install / strike cycle on the calendar.",
  },
  // SERVICES
  {
    id: "logistics",
    num: "05",
    kind: "Services",
    name: "Logistics & Transport",
    sub: "Truck · Driver · Cargo Insurance · Chain-of-Custody",
    narrative:
      "Round-trip transport from the AGV Miami warehouse to the venue and back. 26' box truck, fuel, driver, and cargo insurance at full replacement value. Long-haul routes get a two-driver rotation; chain-of-custody documentation at every touchpoint.",
  },
  {
    id: "install",
    num: "06",
    kind: "Services",
    name: "Build Day Labor",
    sub: "AGV Producer · Local Hires · Walk-Through Sign-Off",
    narrative:
      "AGV producer on the ground. Two-crew lift sourced near the venue. Structure places first, planter ring with installed greenery second, lighting last. Cornbread + venue walk-through sign-off before crew release.",
  },
  {
    id: "strike",
    num: "07",
    kind: "Services",
    name: "Strike Day Labor",
    sub: "AGV Producer · Local Hires · Pad & Reload",
    narrative:
      "AGV producer on the ground. Strike crew sourced near the venue. Full breakdown, pad, and reload for long-haul return. Site restoration confirmed by venue contact.",
  },
  {
    id: "storage",
    num: "08",
    kind: "Services",
    name: "Storage Program",
    sub: "Climate-Monitored · Alarmed · 48-Hour Mobilization",
    narrative:
      "After every event the asset returns to the AGV Miami warehouse — climate-monitored, alarmed, inventoried. The first month of storage rides on the activation invoice; recurring storage bills monthly thereafter.",
  },
  {
    id: "pm",
    num: "09",
    kind: "Services",
    name: "Project Management & Client Services",
    sub: "Senior Producer · Vendor Liaison · COI · Reconciliation",
    narrative:
      "Dedicated senior producer from contract execution through closeout — single point of contact for Cornbread, the holding vendor, and the venue. Includes COI coordination, change-order administration, and post-event reconciliation.",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Production Lifecycle — five execution phases with milestone gates.
// Cornbread is execution-only (no engineering or creative refab inside
// this engagement), so the standard 8-phase shop lifecycle reduces to
// five logistics-led phases. Each phase ends in a written sign-off gate.
// ─────────────────────────────────────────────────────────────────────────

export type PhaseId = "discovery" | "procurement" | "logistics" | "install" | "strike";

export type LifecyclePhase = {
  id: PhaseId;
  num: string;
  name: string;
  intent: string;
  milestones: string[];
  deliverables: string[];
  gate: string;
};

export const CBH_LIFECYCLE: LifecyclePhase[] = [
  {
    id: "discovery",
    num: "01",
    name: "Discovery & Asset Brief",
    intent: "Activation kickoff, inventory reconciliation with the holding vendor, schedule lock against the working dates.",
    milestones: [
      "Brief intake from Cornbread brand activations",
      "Asset inventory reconciled with the holding vendor (planter count, structural elements, finishes)",
      "Load-out and load-in windows confirmed against the venue calendar",
      "Cornbread point of contact designated and authorized to sign change orders",
    ],
    deliverables: [
      "Signed Activation Brief",
      "Working Production Timeline",
      "Stakeholder & Approvals Roster",
    ],
    gate: "Brief Approved → advance to Procurement",
  },
  {
    id: "procurement",
    num: "02",
    name: "Procurement — Greenery & Lighting",
    intent: "Plants sourced and crated; lighting kit reserved, bench-tested, and timer-programmed.",
    milestones: [
      "Outdoor artificial foliage sourced, color-matched, and crated for transit",
      "Lighting kit reserved, bench-tested, and programmed against the timer cue",
      "Outdoor weather and abort-trigger contingency plan distributed to both parties",
      "50% deposit invoiced and cleared before crew call",
    ],
    deliverables: ["Plants Crated & Manifested", "Lighting Kit Reserved & Tested", "Deposit Cleared Receipt"],
    gate: "Procurement Complete + Deposit Cleared → advance to Logistics",
  },
  {
    id: "logistics",
    num: "03",
    name: "Logistics & Transport",
    intent: "Truck roll, holding-vendor pickup, direct run to venue with chain-of-custody intact.",
    milestones: [
      "Truck and driver depart AGV Miami warehouse",
      "Origin load-out manifest signed by holding vendor",
      "Direct run to venue with cargo insurance in force",
      "Destination delivery receipt signed by venue contact",
    ],
    deliverables: ["Origin Manifest Signed", "Destination Receipt Signed", "Asset Condition Photo Log"],
    gate: "All Elements Received & Inventoried → advance to Install",
  },
  {
    id: "install",
    num: "04",
    name: "Install & Walk-Through",
    intent: "Build day — structure, planter ring, lighting, walk-through sign-off ahead of the activation window.",
    milestones: [
      "Structural elements placed per the floor plan",
      "Planter ring installed with foliage weighted and dressed",
      "Lighting dark-test complete; astronomical timer cues confirmed",
      "Cornbread + venue walk-through complete; punch list closed",
    ],
    deliverables: ["Fully Installed Activation", "Walk-Through Sign-Off", "Punch List Closed"],
    gate: "Cornbread / Venue Walk-Through Sign-Off → activation window opens",
  },
  {
    id: "strike",
    num: "05",
    name: "Strike, Long-Haul Return & Storage",
    intent: "Post-activation strike, long-haul return to the AGV Miami warehouse, asset entered into the storage program.",
    milestones: [
      "Strike triggered on activation window close",
      "Plaza / venue restoration confirmed by venue ops",
      "Outbound freight to AGV Miami warehouse with manifest and condition report",
      "Asset entered into the Storage Program · final invoice issued",
    ],
    deliverables: ["Site Restored", "Asset Returned to AGV Miami Warehouse", "Post-Event Reconciliation Report"],
    gate: "Final Reconciliation → engagement closed",
  },
];

// Phase deadlines per the Abbey Road working dates.
// Single cadence — Cornbread runs one execution speed, calibrated to the
// build truck's eight-day round trip from Miami.
export const CBH_PHASE_DEADLINES: Record<PhaseId, string> = {
  discovery: "T-3 Weeks",
  procurement: "T-2 Weeks",
  logistics: "T-1 Day (Truck Departs T-2 Days)",
  install: "Build Day (Activation Day -2)",
  strike: "Strike Day (Activation Day +1)",
};

// Workback key — Abbey Road specific dates.
export const CBH_WORKBACK: { phase: string; milestone: string; date: string }[] = [
  { phase: "Discovery & Asset Brief", milestone: "Brief intake", date: "April 28, 2026" },
  { phase: "Discovery & Asset Brief", milestone: "Inventory reconciled", date: "May 5, 2026" },
  { phase: "Procurement", milestone: "Plants sourced + crated", date: "May 8, 2026" },
  { phase: "Procurement", milestone: "Lighting bench-tested", date: "May 11, 2026" },
  { phase: "Pre-Event Walkthrough", milestone: "Virtual walkthrough · balance due", date: "May 12, 2026" },
  { phase: "Logistics", milestone: "Truck departs AGV Miami", date: "May 18, 2026" },
  { phase: "Logistics", milestone: "Louisville pickup · Jeffersonville delivery", date: "May 19, 2026" },
  { phase: "Install", milestone: "Build day · walk-through sign-off", date: "May 19, 2026" },
  { phase: "VIP Opening", milestone: "Activation lit by sunset", date: "May 20, 2026" },
  { phase: "Show Run", milestone: "Public event days · timer-driven", date: "May 21–25, 2026" },
  { phase: "Strike", milestone: "Strike + long-haul return", date: "May 26, 2026" },
  { phase: "Storage Intake", milestone: "Asset enters Storage Program", date: "May 28, 2026" },
];

// ─────────────────────────────────────────────────────────────────────────
// Standard Exclusions, Terms, Change Orders.
// ─────────────────────────────────────────────────────────────────────────

export const CBH_EXCLUSIONS = [
  {
    term: "On-Site Show-Day Coverage",
    body: "AGV Miami's scope ends at the build-day walk-through and resumes at strike. On-site coverage during show days is not included; remote support line is staffed during venue hours for any venue or vendor punch-list items. On-site coverage is available as a written change order.",
  },
  {
    term: "Structural & Engineering Changes",
    body: "Modifications to the existing Cornbread-owned activation — fabrication, structural rework, engineering documentation, PE stamps, load calculations — are outside this engagement. AGV Miami is happy to scope a separate engagement for structural work on request.",
  },
  {
    term: "Creative Refresh & Content Production",
    body: "Graphics rewrap, scenic refresh, photo / video capture, and content production are not included in the per-activation rate. Pre-Deployment Refresh and Pre-Deployment Rebrand are available as written change orders quoted to scope.",
  },
  {
    term: "Talent, Programming & Hospitality",
    body: "Brand ambassadors, on-site staffing, hospitality F&B, sampling product, and any activation programming are Cornbread-direct. AGV Miami's scope is the deployment lifecycle — pickup through strike — not the show itself.",
  },
  {
    term: "Venue Fees & Permits",
    body: "Venue access fees, fire-marshal application fees, plaza power-use surcharges, and any venue-required deposits are Cornbread-direct or pass-through at cost on written authorization.",
  },
  {
    term: "Travel & Per-Diem (Cap on Pass-Through)",
    body: "Travel and lodging for the AGV crew are itemized at cost on the published rate card and capped inside the per-activation Travel & Lodging line. Anything that exceeds the cap is quoted as a single Travel Pass-Through change order before booking.",
  },
];

export const CBH_TERMS = [
  {
    section: "1",
    title: "Acceptance & Execution",
    body: "Execution of this proposal authorizes AGV Miami to commence procurement, logistics, and crew lock for the active engagement on the 2026 calendar. Execution may be effected via wet signature or the embedded digital signature interface; each is legally equivalent. This proposal is valid for thirty (30) calendar days from the version date.",
  },
  {
    section: "2",
    title: "Scope & Change Orders",
    body: "Any modification to the scope, working dates, route, or modular composition after written approval requires a formally executed Change Order signed by both parties. Verbal approvals do not constitute binding authorization. Change Orders are invoiced separately and do not alter the base composition unless expressly stated.",
  },
  {
    section: "3",
    title: "Payment Terms",
    body: "50% deposit due upon written approval of this Scope of Work (proposal execution). 50% balance due on or before May 12, 2026 (pre-event walkthrough date) for the Abbey Road engagement; subsequent calendar events bill against their own SOWs. Storage bills monthly net-15 after the first month. Payment via ACH or domestic wire. Late payments accrue interest at 1.5% per month.",
  },
  {
    section: "4",
    title: "Asset Custody & Insurance",
    body: "AGV Miami carries $2M general liability and standard cargo coverage at full replacement value through every leg of transport and the storage program. Certificates of Insurance issued naming Cornbread Hemp, the venue, and any required additional insureds on request. Asset condition is documented at every touchpoint with photo + written log.",
  },
  {
    section: "5",
    title: "Cancellation & Force Majeure",
    body: "Full refund if cancelled before May 5. 50% refund between May 5 and May 12. No refund after May 12 (truck, driver, plants, and lighting locked). Force majeure events suspend the engagement with mutual written acknowledgment; truck and crew commitments already incurred are passed through at cost.",
  },
  {
    section: "6",
    title: "Confidentiality",
    body: "This proposal — including pricing, modular composition, route detail, and the 2026 calendar projection — is confidential between AGV Miami and Cornbread Hemp. Distribution outside the parties' authorized representatives requires written consent.",
  },
];

export const CBH_CHANGE_ORDERS = [
  {
    name: "On-Site Show-Day Coverage",
    body: "AGV producer or specialized tech on the ground during show days — refresh, repair, or in-window punch-list response. Quoted per-day at the published Producer / PM or Specialized Crew day rate.",
    price: "From $850 / day",
  },
  {
    name: "Pre-Deployment Refresh",
    body: "A pre-event touch-up pass on paint, hardware, finishes, and lighting calibration. Scaled to the asset's condition on intake. Scheduled into the pre-deployment window so it lands clean on the truck.",
    price: "From $2,500 / instance",
  },
  {
    name: "Pre-Deployment Rebrand",
    body: "Graphics, wraps, or finish refresh aligned with a new campaign or partnership. Designed at the front end and prepped in shop before the build truck rolls.",
    price: "From $7,500 / instance",
  },
  {
    name: "Calendar Bundle Discount",
    body: "When 4+ events are committed inside a single 12-month window, integrated truck routing and storage continuity reduce per-activation logistics by 6–10%. Stacks on the published rate card.",
    price: "6–10% per activation",
  },
  {
    name: "Travel Pass-Through (Above Cap)",
    body: "If non-default travel or lodging is required beyond the per-activation line cap, billed at cost with receipts as a single Travel Pass-Through change order on written authorization.",
    price: "At cost",
  },
  {
    name: "Additional Storage (Beyond Standard Footprint)",
    body: "Storage beyond the activation's standard footprint — overflow pallets, additional environmental control — billed monthly per pallet.",
    price: "$400 / pallet / month",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

export function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function fmtRange(base: number, ceiling: number): string {
  return `${fmtMoney(base)} – ${fmtMoney(ceiling)}`;
}

export function pricingLineByNum(num: number): PricingLine | undefined {
  for (const group of CBH_PRICING_GROUPS) {
    const line = group.lines.find((l) => l.num === num);
    if (line) return line;
  }
  return undefined;
}

export function basisLabel(line: PricingLine): string {
  const prefix = line.startingAt ? "Starting at, " : "";
  return prefix + line.basis;
}
