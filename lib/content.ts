// ====================================================================
// CORNBREAD HEMP × ABBEY ROAD ON THE RIVER 2026
// Activation Asset Management Proposal — v2.1
// Producer: AGV Miami, LLC
// ====================================================================
// Modular deployment service for activation owners.
// Per-activation, per-month, one-time, and optional add-ons —
// each line itemized at a published rate, no markup on pass-through.
// v1.0 archive retained at lib/content.v1.ts.
// ====================================================================

export const project = {
  proposalId: "CBH-ABR-2026-V2.1",
  previousVersion: "CBH-ABR-2026-V1.0",
  client: "Cornbread Hemp",
  producer: "AGV Miami",
  producerLegal: "AGV Miami, LLC",
  producerEmail: "julian@agvmiami.com",
  event: "Abbey Road on the River 2026",
  venue: "RiverStage / Big Four Station Park",
  city: "Jeffersonville, IN",
  eventDates: "May 21 — 25, 2026",
  setupDate: "Tuesday, May 19, 2026",
  vipOpening: "Wednesday, May 20, 2026 (evening)",
  teardownDate: "Tuesday, May 26, 2026",
  originVendor: "Current vendor facility — Louisville, KY",
  storageDestination: "AGV Miami warehouse — Miami, FL",
  transitDistance: "Louisville → Jeffersonville: ~15 mi · Return to Miami: ~1,200 mi",
  footprint: "Existing 20' × 20' activation + planter ring",
  preparedFor: "Jess Gago",
  preparedForTitle: "Brand Activations Manager, Cornbread Hemp",
  preparedBy: "AGV Miami",
  preparedOn: "May 5, 2026",
  validThrough: "May 12, 2026",
  market: "out_of_market" as "local" | "out_of_market",
};

// ====================================================================
// KEY DATES — timeline
// ====================================================================

export type KeyDate = {
  num: string;
  date: string;
  day: string;
  label: string;
  detail: string;
  crewCall?: string;
  status: "lead" | "setup" | "live" | "strike";
};

export const keyDates: KeyDate[] = [
  {
    num: "01",
    date: "May 12",
    day: "Tuesday",
    label: "Pre-Event Walkthrough",
    detail:
      "Virtual walkthrough with Cornbread, the current Louisville vendor, and the venue contact. Lock load-out window, planter count, lighting plan, and dock assignment. Final balance due same day.",
    status: "lead",
  },
  {
    num: "02",
    date: "May 18",
    day: "Monday",
    label: "Truck Roll — Miami → Louisville",
    detail:
      "Truck and driver depart the AGV Miami warehouse. Overnight transit positions for a 07:00 May 19 pickup at the holding vendor.",
    status: "setup",
  },
  {
    num: "03",
    date: "May 19",
    day: "Tuesday",
    label: "Build Day — Pickup, Transport, Install",
    detail:
      "07:00 call in Louisville. Inventory and load. Direct 15-mile run to Jeffersonville. Structure placed, planter ring planted, lighting timed against sunset. Walk-through sign-off before crew release. The activation is lit and ready ahead of the VIP opening on Wednesday evening.",
    crewCall: "07:00 — 19:00",
    status: "setup",
  },
  {
    num: "04",
    date: "May 20 — 25",
    day: "Wed — Mon",
    label: "Show Run",
    detail:
      "VIP opening Wednesday evening. Five public event days. Lighting runs on the astronomical timer. Remote support line open during venue hours for any venue or vendor punch-list items.",
    status: "live",
  },
  {
    num: "05",
    date: "May 26",
    day: "Tuesday",
    label: "Strike + Long-Haul Return",
    detail:
      "07:00 strike at RiverStage. Pad, reload, and depart for the AGV Miami warehouse. Inventory reconciliation and condition report filed within 48 hours of warehouse intake. The asset enters the Storage Program on the same intake.",
    crewCall: "07:00 — 17:00",
    status: "strike",
  },
];

// ====================================================================
// DELIVERABLES — declarative
// ====================================================================

export type Deliverable = {
  num: string;
  title: string;
  body: string;
};

export const deliverables: Deliverable[] = [
  {
    num: "01",
    title: "Louisville Pickup, Chain-of-Custody Intact.",
    body:
      "AGV Miami arrives at the holding vendor at 07:00 on May 19. Blanket-wrap and component pad kit. The manifest is reconciled against the vendor's inventory before the truck moves, and condition photography is filed to the project log before the truck leaves Louisville.",
  },
  {
    num: "02",
    title: "Direct Transport to RiverStage.",
    body:
      "A single 15-mile run, Louisville to Jeffersonville, no stops. Structural elements place first, planter ring with installed greenery second, lighting last. The Cornbread point of contact and the venue contact walk through the activation before crew release.",
  },
  {
    num: "03",
    title: "Greenery Sourced, Planted, and Weighted.",
    body:
      "Commercial-grade outdoor artificial foliage scaled to the existing planter count. Sourced and crated at AGV Miami, planted and weighted on build day, returned with the truck on May 26.",
  },
  {
    num: "04",
    title: "Lighting On, Timer-Driven.",
    body:
      "An evening lighting kit programmed to an astronomical timer — up at sunset, down at venue call. Single drop off the venue's electrical supply. Routine maintenance carries forward across deployments.",
  },
  {
    num: "05",
    title: "Strike, Long-Haul Return, and Storage.",
    body:
      "Full breakdown at 07:00 on May 26. Long-haul return to the AGV Miami warehouse — climate-monitored, alarmed, inventoried. The asset is staged and ready on 48 hours' notice for the next deployment on the calendar.",
  },
  {
    num: "06",
    title: "Modular Pricing, Published Rates.",
    body:
      "Per-activation, per-month, one-time, and optional add-ons — each line itemized at a published rate. Travel and lodging pass through at cost. Compose what you need for each event; nothing billed that wasn't signed.",
  },
];

// ====================================================================
// 5-PHASE LIFECYCLE — logistics-led
// ====================================================================

export type PhaseStatus = "Included" | "Per-Event";

export type PhaseGate = {
  title: string;
  items: string[];
  unlocks: string;
};

export type Phase = {
  id: string;
  num: string;
  name: string;
  tag: string;
  color: "orange" | "cedar" | "cannabis" | "foil";
  status: PhaseStatus;
  narrative: string;
  gate: PhaseGate;
};

export const phases: Phase[] = [
  {
    id: "discovery",
    num: "01",
    name: "Discovery & Asset Brief",
    tag: "Inventory + Schedule Lock + Vendor Coordination",
    color: "cannabis",
    status: "Included",
    narrative:
      "We open with a focused discovery pass. The activation already exists — our job here is to catalogue it, coordinate the load-out window with the holding vendor in Louisville, and lock the schedule against the two working days that matter: May 19 and May 26.",
    gate: {
      title: "Brief Sign-Off",
      items: [
        "Asset inventory reconciled with the holding vendor (planter count, structural elements, finishes)",
        "Load-out and load-in windows confirmed (May 19 / May 26)",
        "VIP opening readiness target locked (Wednesday evening, May 20)",
        "Cornbread point of contact designated and authorized to sign change orders",
      ],
      unlocks: "Phase 02: Procurement (Greenery + Lighting)",
    },
  },
  {
    id: "procurement",
    num: "02",
    name: "Procurement — Greenery & Lighting",
    tag: "Plants + Lighting Kit",
    color: "orange",
    status: "Included",
    narrative:
      "Two procurement workstreams run in parallel. Outdoor artificial greenery is specced and sourced against the planter count. The lighting kit is reserved against a single-drop venue plan. Both are bench-tested and crated for the build truck before May 18.",
    gate: {
      title: "Procurement Complete",
      items: [
        "Foliage sourced, color-matched, and crated for transit",
        "Lighting kit reserved, bench-tested, and programmed against the timer cue",
        "Outdoor weather and abort-trigger contingency plan distributed to both parties",
        "50% deposit received and cleared before crew call",
      ],
      unlocks: "Phase 03: Logistics",
    },
  },
  {
    id: "logistics",
    num: "03",
    name: "Logistics — Miami → Louisville → Jeffersonville",
    tag: "Truck Roll + Pickup + Direct Run",
    color: "foil",
    status: "Included",
    narrative:
      "Truck and driver depart AGV Miami on May 18 for an overnight haul to Louisville. 07:00 May 19 pickup at the holding vendor with full chain-of-custody documentation. Direct 15-mile run to Jeffersonville. Cargo insurance covers every leg at full replacement value.",
    gate: {
      title: "Delivery Confirmed",
      items: [
        "Origin load-out manifest signed by the holding vendor",
        "Destination delivery receipt signed by the venue contact (RiverStage)",
        "Asset condition documented at both touchpoints (photo + written log)",
        "Truck and driver positioned for end-of-day install hand-off",
      ],
      unlocks: "Phase 04: Install",
    },
  },
  {
    id: "installation",
    num: "04",
    name: "Install — Build Day",
    tag: "Tuesday, May 19 — VIP-Ready Wednesday Evening",
    color: "orange",
    status: "Included",
    narrative:
      "One build day. AGV producer on the ground; local crew sourced near the venue for the lift. Structural elements place first, planter ring with installed greenery second, lighting last. The activation is lit, timed, and walk-through approved ahead of the VIP opening on Wednesday evening.",
    gate: {
      title: "Acceptance Walk-Through",
      items: [
        "All elements placed per the floor plan",
        "Greenery installed and weighted in the planter ring",
        "Lighting dark-test complete; astronomical timer cues confirmed",
        "Cornbread + venue walk-through complete; punch list closed before crew release",
      ],
      unlocks: "Phase 05: Strike, Return & Storage",
    },
  },
  {
    id: "legacy",
    num: "05",
    name: "Strike, Long-Haul Return & Storage",
    tag: "Tuesday, May 26 + Ongoing Storage",
    color: "cedar",
    status: "Included",
    narrative:
      "07:00 strike at RiverStage. Truck loads and departs for the AGV Miami warehouse. The kit enters the Storage Program on intake — climate-monitored, alarmed, and ready to deploy to the next calendar event on 48 hours' notice.",
    gate: {
      title: "Project Close",
      items: [
        "Strike complete and site restoration confirmed by venue",
        "Long-haul return completed with chain-of-custody intact",
        "Post-event inventory and condition report filed to Cornbread within 48 hours",
        "Storage Program active; final invoice settled including any signed change orders",
      ],
      unlocks: "Next deployment (see 2026 calendar)",
    },
  },
];

// ====================================================================
// MODULAR PRICING — per-activation, per-month, one-time, add-ons
// All line items priced under $15K. Compose what each event requires.
// ====================================================================

export type PricingGroup = "perActivation" | "perMonth" | "upgrades" | "addOns";

export type PricingBasis =
  | "per activation"
  | "per month"
  | "per instance"
  | "one-time";

export type PricingLine = {
  num: number;
  name: string;
  description: string;
  price: number;
  basis: PricingBasis;
  startingAt?: boolean;
};

export type PricingSection = {
  key: PricingGroup;
  title: string;
  subtitle: string;
  lines: PricingLine[];
};

export const pricingSections: PricingSection[] = [
  {
    key: "perActivation",
    title: "Per Activation",
    subtitle:
      "What moves with each event. Three lines, fully published.",
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
          "Two-crew lift sourced near the venue for build and strike days. Vetted through the AGV regional partner network and supervised on site by the AGV producer.",
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
    key: "perMonth",
    title: "Per Month",
    subtitle: "Where the asset lives between events.",
    lines: [
      {
        num: 4,
        name: "Storage — Monthly Hold (NYC or Miami)",
        description:
          "Climate-monitored, alarmed warehouse hold at the AGV facility of choice. Includes inventory tracking, condition logging, and 48-hour mobilization for the next calendar event.",
        price: 1500,
        basis: "per month",
      },
    ],
  },
  {
    key: "upgrades",
    title: "Upgrades",
    subtitle: "Investments in the activation itself.",
    lines: [
      {
        num: 5,
        name: "Plants — Foliage Rental (Per Activation Instance)",
        description:
          "Commercial-grade outdoor artificial foliage scaled to the planter ring. Sourced, planted, and pulled each instance — same kit re-deploys cleanly across the calendar.",
        price: 1200,
        basis: "per instance",
      },
      {
        num: 6,
        name: "Lighting — Upgrade + Routine Maintenance",
        description:
          "One-time fixture purchase tuned for evening illumination, with astronomical timer programming and a single venue drop. Routine maintenance is carried forward across deployments.",
        price: 4500,
        basis: "one-time",
      },
    ],
  },
  {
    key: "addOns",
    title: "Optional Add-Ons",
    subtitle: "Available on request, quoted before execution.",
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

// ====================================================================
// ABBEY ROAD — applied composition
// Pulls line items from the pricing sections and notes any per-event lifts
// ====================================================================

export type AbbeyComposition = {
  pricingLineNum: number;
  quantity: number;
  amount: number;
  rationale?: string;
};

export const abbeyComposition: AbbeyComposition[] = [
  { pricingLineNum: 1, quantity: 1, amount: 4500, rationale: "Asymmetric route — short Louisville pickup, long Miami return absorbed inside the baseline." },
  { pricingLineNum: 2, quantity: 1, amount: 1800 },
  { pricingLineNum: 3, quantity: 1, amount: 2500 },
  { pricingLineNum: 5, quantity: 1, amount: 1200 },
  { pricingLineNum: 6, quantity: 1, amount: 4500, rationale: "Year-1 only — covers the full year's deployments thereafter." },
];

export const abbeyTotals = {
  perActivation:
    abbeyComposition
      .filter((c) => [1, 2, 3].includes(c.pricingLineNum))
      .reduce((s, c) => s + c.amount, 0),
  upgrades:
    abbeyComposition
      .filter((c) => [5, 6].includes(c.pricingLineNum))
      .reduce((s, c) => s + c.amount, 0),
  net: abbeyComposition.reduce((s, c) => s + c.amount, 0),
};

// ====================================================================
// 2026 CALENDAR — applied per-activation costs
// ====================================================================

export type EventStatus = "Confirmed" | "Quoting" | "Held";
export type Market = "local" | "out_of_market";

export type CalendarEvent = {
  id: string;
  shortName: string;
  fullName: string;
  city: string;
  dates: string;
  setup: string;
  strike: string;
  market: Market;
  oneWayMiles: number;
  perActivationCost: number;
  plantsCost: number;
  status: EventStatus;
  notes: string;
};

export const calendar2026: CalendarEvent[] = [
  {
    id: "abbey-road",
    shortName: "Abbey Road on the River",
    fullName: "Abbey Road on the River 2026",
    city: "Jeffersonville, IN",
    dates: "May 21 — 25, 2026",
    setup: "Tue, May 19",
    strike: "Tue, May 26",
    market: "out_of_market",
    oneWayMiles: 1200,
    perActivationCost: 8800,
    plantsCost: 1200,
    status: "Quoting",
    notes:
      "Anchor engagement. Asymmetric haul: short Louisville pickup, long Miami return. VIP opening ready Wednesday evening.",
  },
  {
    id: "mn-yacht-club",
    shortName: "MN Yacht Club Festival",
    fullName: "Minnesota Yacht Club Festival",
    city: "St. Paul, MN",
    dates: "Jul 17 — 19, 2026",
    setup: "Wed, Jul 15",
    strike: "Mon, Jul 20",
    market: "out_of_market",
    oneWayMiles: 1800,
    perActivationCost: 8800,
    plantsCost: 1200,
    status: "Held",
    notes:
      "Longest haul on the calendar. Two-driver rotation built into the logistics line.",
  },
  {
    id: "nc-folk-festival",
    shortName: "NC Folk Festival",
    fullName: "North Carolina Folk Festival",
    city: "Greensboro, NC",
    dates: "Sept 18 — 20, 2026",
    setup: "Wed, Sept 16",
    strike: "Mon, Sept 21",
    market: "out_of_market",
    oneWayMiles: 800,
    perActivationCost: 8800,
    plantsCost: 1200,
    status: "Held",
    notes:
      "Mid-haul, single-driver. Confirm power drop and rain-day protocol with venue at the discovery gate.",
  },
  {
    id: "fin-fest",
    shortName: "Fin Fest",
    fullName: "Fin Fest",
    city: "St. Petersburg, FL",
    dates: "Nov 13 — 14, 2026",
    setup: "Wed, Nov 11",
    strike: "Sat, Nov 15",
    market: "local",
    oneWayMiles: 270,
    perActivationCost: 5300,
    plantsCost: 1200,
    status: "Held",
    notes:
      "Local-market deployment. Day trips for crew, no lodging line. Lowest cost-per-event on the calendar.",
  },
];

export const calendar2026Totals = {
  productionAnnual:
    calendar2026.reduce(
      (s, e) => s + e.perActivationCost + e.plantsCost,
      0,
    ) + 4500, // year-1 lighting upgrade applied once
  storageAnnualMidpoint: 1500 * 11,
};

// ====================================================================
// RATE CARD — labor + travel transparency
// ====================================================================

export type DayRate = {
  role: "Producer / Project Manager" | "Specialized Crew" | "General Crew";
  dayRate: number;
  hourlyEquiv: number;
  notes: string;
};

export const dayRates: DayRate[] = [
  {
    role: "Producer / Project Manager",
    dayRate: 850,
    hourlyEquiv: 106.25,
    notes:
      "AGV producer on the ground. Owns scope, schedule, vendor liaison, and Cornbread communication.",
  },
  {
    role: "Specialized Crew",
    dayRate: 600,
    hourlyEquiv: 75,
    notes:
      "Trade-skilled labor: lighting techs, AV / audio engineers, scenic carpenters, riggers. Reserved as needed on a per-event basis.",
  },
  {
    role: "General Crew",
    dayRate: 400,
    hourlyEquiv: 50,
    notes:
      "Generalist labor sourced near the venue: build, strike, runners. The default crew composition on the Cornbread calendar.",
  },
];

export type TLRate = {
  item: string;
  local: number | null;
  outOfMarket: number;
  basis: string;
  notes?: string;
};

export const tlRates: TLRate[] = [
  {
    item: "Per diem (M&IE)",
    local: 50,
    outOfMarket: 75,
    basis: "per person-day",
    notes: "Meals + incidentals. Out-of-market reflects GSA M&IE rates.",
  },
  {
    item: "Lodging",
    local: null,
    outOfMarket: 150,
    basis: "per person-night",
    notes:
      "Two crew nights typical for a build-day deployment; long-haul drivers add transit nights as actual.",
  },
  {
    item: "Truck rental + fuel",
    local: 350,
    outOfMarket: 350,
    basis: "per truck-day",
    notes:
      "26' box truck, all-in. Long-haul fuel pass-through at receipt for routes over 600 miles.",
  },
];

// ====================================================================
// NOTES — terms block
// ====================================================================

export const notes = {
  pricing:
    "Compose what each event requires; every line carries a published rate.",
  deposit:
    "50% deposit due on signature. Balance due May 12, 2026 (pre-event walkthrough).",
  cancellation:
    "Full refund if cancelled before May 5. 50% refund between May 5 — May 12. No refund after May 12 (truck, driver, plants, and lighting locked).",
  changeOrders:
    "Anything added — additional crew, on-site coverage, refresh, rebrand — is quoted as a written change order before execution. Nothing billed that wasn't signed.",
  paymentMethods:
    "ACH or wire. Net 15 on post-event invoices. Reference the proposal ID on every remittance.",
  insurance:
    "AGV Miami carries $2M general liability and standard cargo coverage. Certificate of insurance available on request with Abbey Road on the River and Cornbread Hemp as additional insureds.",
  outOfMarket:
    "Travel and lodging passes through at cost — every dollar itemized in the rate card below.",
  versionControl:
    "v2.1 supersedes prior revisions. The full v1.0 archive is retained at lib/content.v1.ts for reference.",
};

// ====================================================================
// CONTRACT REFERENCES
// ====================================================================

export const contractRefs = [
  { ref: "S2", label: "Scope of Work" },
  { ref: "S4", label: "Client Responsibilities" },
  { ref: "S6.1", label: "Shipping & Delivery" },
  { ref: "S6.2", label: "Installation" },
  { ref: "S6.4", label: "Storage" },
  { ref: "S6.5", label: "Strike & Disposal" },
  { ref: "S7.1", label: "Insurance" },
  { ref: "S10.2", label: "Venue Compliance" },
  { ref: "S13", label: "Equipment Rental" },
  { ref: "S15.5", label: "Damage & Wear" },
  { ref: "S18", label: "Change Orders" },
];

// ====================================================================
// WHY AGV MIAMI
// ====================================================================

export type WhyItem = {
  num: string;
  title: string;
  body: string;
};

export const whyItems: WhyItem[] = [
  {
    num: "/ 01",
    title: "Built Around Your Activation.",
    body:
      "The pricing follows the way Cornbread already operates — deploy, store, deploy again. Per-activation costs move with each event; storage runs monthly; upgrades land once. No bundles you have to talk your way out of.",
  },
  {
    num: "/ 02",
    title: "The Asset Comes Home.",
    body:
      "After every event the activation returns to the AGV Miami warehouse — climate-monitored, alarmed, on a 48-hour mobilization clock. The next deployment doesn't start from zero.",
  },
  {
    num: "/ 03",
    title: "Local Crew, AGV Lead.",
    body:
      "Build and strike crews are sourced near each venue through the AGV regional partner network and supervised by the AGV producer on the ground. Travel costs stay tight; quality stays consistent.",
  },
  {
    num: "/ 04",
    title: "One Calendar, Four Events.",
    body:
      "Abbey Road, Minnesota Yacht Club, NC Folk Festival, Fin Fest — same modular pricing applied to each, with logistics lines that follow distance. Plan the year together; AGV plans truck routing, crew calls, and storage continuity around it.",
  },
];

// ====================================================================
// FAQ
// ====================================================================

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "How does the modular pricing work?",
    a: "Every line item carries a published rate and a clear basis — per activation, per month, per instance, or one-time. For each event, we apply only the lines that fit the engagement. Nothing bundled, nothing assumed. Compose what's needed and AGV invoices to the composition.",
  },
  {
    q: "Why is AGV Miami the right home for the asset?",
    a: "AGV operates climate-monitored warehouses in Miami and NYC, with the regional crew network to deploy out of either coast. Aligning producer and storage on a single entity simplifies billing, COI, and chain-of-custody across the calendar — and shortens the time between 'next event confirmed' and 'asset on the truck.'",
  },
  {
    q: "Will the activation be ready for the VIP opening on Wednesday evening?",
    a: "Yes. Build day is Tuesday, May 19, with sign-off and crew release before end of day. Wednesday is buffer — the activation is lit, timer-programmed, and ready for the VIP opening that evening.",
  },
  {
    q: "Why does Abbey Road have a longer transport line on the back end?",
    a: "The route is asymmetric: the pickup leg is short (Louisville to Jeffersonville, 15 mi), the return leg is long (Jeffersonville to AGV Miami, ~1,200 mi). The other 2026 events are round-trips from the Miami warehouse, so logistics scales to a single one-way distance.",
  },
  {
    q: "What's the difference between Refresh and Rebrand?",
    a: "Refresh is cosmetic — a pre-deployment touch-up pass on paint, hardware, finishes, and lighting calibration. Rebrand is a graphics or finish change tied to a new campaign or partnership. Both are quoted to scope at request and scheduled into the pre-deployment window.",
  },
  {
    q: "Who owns the artificial plants and lighting?",
    a: "Plants are rented per activation instance — same kit re-deploys cleanly across the calendar. The lighting upgrade is a one-time purchase that titles to Cornbread on final payment, with routine maintenance carried forward.",
  },
  {
    q: "What if Abbey Road on the River gets rained out?",
    a: "Strike, return, and storage still happen on May 26 regardless of attendance. Truck and crew are locked on May 12 per the cancellation terms; the long-haul return is contractually firm.",
  },
];

// ====================================================================
// HELPERS
// ====================================================================

export function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPct(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(n);
}

export function pricingLineByNum(num: number): PricingLine | undefined {
  for (const section of pricingSections) {
    const line = section.lines.find((l) => l.num === num);
    if (line) return line;
  }
  return undefined;
}
