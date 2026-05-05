// ====================================================================
// CORNBREAD HEMP × ABBEY ROAD ON THE RIVER 2026
// Activation Asset Management Proposal — Content Source
// ====================================================================
// Edit pricing, scope, and copy here. Components read this module.
// Pricing model = the standardized three-tier rate card
// (COPPER / IRON / GOLD), day-rate transparent.
// Process model = the standardized 8-phase production lifecycle.
// ====================================================================

export const project = {
  proposalId: "CBH-ABR-2026-V1.0",
  client: "Cornbread Hemp",
  producer: "GHXSTSHIP Industries",
  partner: "Agora Graphics & Visuals",
  event: "Abbey Road on the River 2026",
  venue: "RiverStage / Big Four Station Park",
  city: "Jeffersonville, IN",
  eventDates: "May 21 — 25, 2026",
  setupDate: "Tuesday, May 19, 2026",
  teardownDate: "Tuesday, May 26, 2026",
  originVendor: "Current vendor facility — Louisville, KY",
  transitDistance: "~15 mi / 25 min one-way",
  footprint: "Existing 20' × 20' activation + planter ring",
  preparedFor: "Julian Clarkson",
  preparedForTitle: "Brand & Events, Cornbread Hemp",
  preparedBy: "GHXSTSHIP Industries × Agora Graphics",
  preparedOn: "May 1, 2026",
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
      "Virtual walkthrough with the Cornbread team, the current vendor, and the venue contact. Lock load-out window, planter count, lighting layout, and RiverStage dock assignment.",
    status: "lead",
  },
  {
    num: "02",
    date: "May 19",
    day: "Tuesday",
    label: "Build Day — Load-Out + Transport + Install",
    detail:
      "07:00 call at the current vendor in Louisville. Inventory, pad, and load. Direct run to Jeffersonville. Install by end of day: structure, graphics, planter ring, lighting programmed on a timer. Walk-through sign-off before crew release.",
    crewCall: "07:00 — 19:00",
    status: "setup",
  },
  {
    num: "03",
    date: "May 20",
    day: "Wednesday",
    label: "Dark Day / Remote Standby",
    detail:
      "Activation dark-tested and buttoned up. PM on remote standby for venue or vendor punch-list items. No on-site crew — the environment runs itself.",
    status: "live",
  },
  {
    num: "04",
    date: "May 21 — 25",
    day: "Thu — Mon",
    label: "Show Days",
    detail:
      "Five event days. Lighting runs on an astronomical timer — up at sunset, down at venue call. Remote support line staffed 10:00 — 23:00 daily. On-site staffing scales with the chosen tier.",
    status: "live",
  },
  {
    num: "05",
    date: "May 26",
    day: "Tuesday",
    label: "Strike Day — Return Transport",
    detail:
      "07:00 call at RiverStage. Full strike, pad, reload. Direct return to the GHXSTSHIP partner warehouse. Inventory reconciliation and condition report filed the same day. Assets enter the Secure Asset Storage Program.",
    crewCall: "07:00 — 17:00",
    status: "strike",
  },
];

// ====================================================================
// DELIVERABLES — declarative, confident, one voice
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
      "We arrive at the current vendor's facility at 07:00 on May 19. Crew sized to the chosen tier, blanket-wrap and component pad kit. The manifest is reconciled against the vendor's inventory before the truck moves. Condition photography is filed to the project log before we leave Louisville.",
  },
  {
    num: "02",
    title: "Direct Transport to RiverStage.",
    body:
      "A single 15-mile run, Louisville to Jeffersonville, no stops. The install crew expands to the tier-appropriate size on arrival. Structural elements place first, graphics and planter ring second, lighting last. A complete walk-through with the Cornbread team and venue contact happens before crew release.",
  },
  {
    num: "03",
    title: "Asset Refresh Scaled to Tier.",
    body:
      "COPPER redeploys the existing build clean. IRON refreshes graphics, adds custom fab accents, premium consumables, and an activation programming beat. GOLD extends the brand world with senior creative direction, premium fabrication, and lighting integration.",
  },
  {
    num: "04",
    title: "Show-Day Operations to Match Footprint.",
    body:
      "Crew staffing and content capture scale by tier. COPPER runs build + strike, lighting on timer. IRON staffs all five show days with photo + video and an activation moment. GOLD adds multi-cam content, talent integration, and a 3-person senior management team.",
  },
  {
    num: "05",
    title: "Strike, Return, and Storage.",
    body:
      "Full breakdown at 07:00 on May 26. Return transit to the GHXSTSHIP partner warehouse. Entry into the Secure Asset Storage Program — climate-monitored, inventoried via ATLVS, 48-hour mobilization guarantee for the next Cornbread deployment.",
  },
  {
    num: "06",
    title: "Day-Rate Transparent Pricing.",
    body:
      "Every dollar of labor is built from a published client-facing day rate: Producer / PM $850/day, Specialized Crew $600/day, General Crew $400/day. Every dollar of travel is rate-carded: per diem $50 local / $75 out-of-market, lodging $150/night, airfare $400 round-trip. Travel & lodging pass through at cost.",
  },
  {
    num: "07",
    title: "Tier You In, Not Tier You Up.",
    body:
      "Three tiers, fully inclusive. IRON includes everything in COPPER; GOLD includes everything in IRON. Pick the tier that matches the moment you want to make. Upgrade between contract and call sheet without renegotiating from zero.",
  },
];

// ====================================================================
// 8-PHASE PRODUCTION LIFECYCLE — process structure (no per-phase $)
// ====================================================================

export type PhaseStatus = "Included" | "Tier-Scaled";

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
  scaledByTier?: boolean;
  gate: PhaseGate;
};

export const phases: Phase[] = [
  {
    id: "discovery",
    num: "01",
    name: "Discovery & Creative Brief",
    tag: "Consultation + Brief Alignment + Schedule Lock",
    color: "cannabis",
    status: "Included",
    narrative:
      "We open with a focused discovery pass. The activation already exists — our job in this phase is to catalogue what it is today, confirm what changes it needs for an outdoor Jeffersonville run, and lock the schedule against the two working days that matter: May 19 and May 26.",
    gate: {
      title: "Creative Brief Sign-Off",
      items: [
        "Signed creative brief with engagement parameters and success metrics",
        "Venue access windows confirmed and locked (build day May 19 / strike day May 26)",
        "Client-side PM counterpart designated and authorized to sign (Cornbread)",
        "Existing-asset inventory reconciled with holding vendor (planter count, structural elements)",
      ],
      unlocks: "Phase 02: Concept Adaptation & Visualization",
    },
  },
  {
    id: "concept",
    num: "02",
    name: "Concept Adaptation & Visualization",
    tag: "Greenery Palette + Lighting Design + Outdoor Adaptation",
    color: "orange",
    status: "Tier-Scaled",
    scaledByTier: true,
    narrative:
      "COPPER delivers the spatial adaptation notes against the existing build. IRON adds refreshed graphics palettes and an activation programming concept. GOLD adds senior creative direction and a brand-world extension that lives beyond this single deployment.",
    gate: {
      title: "Concept Approval",
      items: [
        "Written approval of creative palette and material spec (greenery + finish)",
        "Lighting design and run-of-show schedule signed off (positions + timer cues)",
        "Environmental adaptation notes confirmed (outdoor weather, surface, sightlines)",
        "Written approval to advance to engineering (2 business-day review window)",
      ],
      unlocks: "Phase 03: Engineering & Technical Development",
    },
  },
  {
    id: "engineering",
    num: "03",
    name: "Engineering & Technical Development",
    tag: "Lighting Load Plan + Anchor Spec + Weather Plan",
    color: "foil",
    status: "Included",
    narrative:
      "Three engineering documents carry every tier. A lighting load plan that proves the kit draws safely off a single venue drop. An anchor specification that keeps the planter ring in place through a Midwest May. A weather plan with abort triggers written down so nothing gets decided at 2 AM in a tent.",
    gate: {
      title: "Engineering Approval",
      items: [
        "Load & power plan signed against venue electrical drop",
        "Anchor / mount specification approved for the deployment surface (planter ring)",
        "Weather and abort-trigger contingency plan distributed to all parties",
        "PE stamp obtained where jurisdiction or venue requires (flagged at pre-event walkthrough — May 12)",
      ],
      unlocks: "Phase 04: Fabrication & Procurement",
    },
  },
  {
    id: "fabrication",
    num: "04",
    name: "Fabrication & Procurement",
    tag: "Graphics + Greenery + Lighting + Custom Accents",
    color: "orange",
    status: "Tier-Scaled",
    scaledByTier: true,
    narrative:
      "COPPER redeploys the existing build clean — touch-up paint and minor repairs only. IRON refreshes graphics and adds one custom fab accent piece. GOLD adds premium fabrication, lighting integration, and additional scenic.",
    gate: {
      title: "Production Complete + QC Sign-Off",
      items: [
        "All fabrication elements received, color-checked, and trim-prepped to spec",
        "Lighting and AV fixtures bench-tested against the programmed cue stack",
        "Crate-up complete with condition photography filed to the project log",
        "Ship-out manifest reconciled against the tier line items and signed",
      ],
      unlocks: "Phase 05: Logistics & Pre-Deployment",
    },
  },
  {
    id: "logistics",
    num: "05",
    name: "Logistics & Pre-Deployment",
    tag: "Louisville Pickup + Transit + Return",
    color: "foil",
    status: "Included",
    narrative:
      "Round-trip transport between the current vendor's Louisville facility and RiverStage Jeffersonville. Cargo insurance covers both legs at full replacement value. Condition photography goes on the project log before and after every move. Transport scaled to a single $5,000 floor across all tiers.",
    gate: {
      title: "Delivery Confirmed + Venue Access",
      items: [
        "Origin load-out manifest signed by holding vendor (Louisville)",
        "Destination delivery receipt signed by venue contact (Jeffersonville / RiverStage)",
        "Asset condition documented at both touchpoints (photo + written log)",
        "50% deposit received and cleared before crew call",
      ],
      unlocks: "Phase 06: Installation & Environment Build",
    },
  },
  {
    id: "installation",
    num: "06",
    name: "Installation & Environment Build",
    tag: "Tuesday, May 19 — Call 07:00",
    color: "orange",
    status: "Tier-Scaled",
    scaledByTier: true,
    narrative:
      "One build day. Crew size scales by tier — COPPER: 1 PM + 2 crew, IRON: 2 PM + 3 crew, GOLD: 3 PM + 5 crew. Structural first, graphics and planter ring second, lighting last. The activation is lit, timed, and walk-through approved before crew release.",
    gate: {
      title: "Acceptance Walk-Through + Punch List",
      items: [
        "All elements placed and secured per approved floor plan",
        "Lighting / AV dark-test complete and timer or run-of-show cues confirmed",
        "Client walk-through inspection complete and signed (Cornbread + venue)",
        "Punch list documented and fully remediated before crew release",
      ],
      unlocks: "Phase 07: Activation & Live Operations",
    },
  },
  {
    id: "activation",
    num: "07",
    name: "Activation & Live Operations",
    tag: "May 21 — 25 / Five Show Days",
    color: "cannabis",
    status: "Tier-Scaled",
    scaledByTier: true,
    narrative:
      "COPPER runs lighting on a timer with a remote PM — no event-day crew. IRON staffs show days with crew + photo/video + an activation programming beat. GOLD adds multi-cam content, talent integration, and senior management on the floor.",
    gate: {
      title: "Activation Complete + Asset Directive",
      items: [
        "Event period concluded per contracted run (May 21 — 25 / RiverStage)",
        "Client confirms asset disposition: storage, redeployment, or decommission (Cornbread → storage)",
        "Content deliverables packaged and queued for handoff where in scope (IRON+)",
        "Strike crew briefed against the original floor plan and load-out manifest",
      ],
      unlocks: "Phase 08: Strike, Storage & Legacy",
    },
  },
  {
    id: "legacy",
    num: "08",
    name: "Strike, Storage & Legacy",
    tag: "Tuesday, May 26 + Ongoing Storage",
    color: "cedar",
    status: "Included",
    narrative:
      "Strike is clean and fast — crew sized to the tier. Assets enter the Secure Asset Storage Program on the same truck that brought them back. Inventory reconciliation goes on the record the same day. The kit is ready to deploy to the next Cornbread activation on 48 hours' notice. Storage carries forward at $1,500/month, included in COPPER and above.",
    gate: {
      title: "Project Close",
      items: [
        "Strike complete and site restoration confirmed by venue (RiverStage / May 26)",
        "Post-event inventory and condition report filed to client (Cornbread)",
        "Storage or asset-handoff agreement in force — recurring billing active where applicable",
        "Final invoice settled including any signed change orders",
      ],
      unlocks: "Warranty period begins (14 days) / Next deployment primed",
    },
  },
];

// ====================================================================
// THREE-TIER INVESTMENT MODEL
// ====================================================================

export type TierKey = "baseline" | "better" | "best";

export type Tier = {
  key: TierKey;
  name: "COPPER" | "IRON" | "GOLD";
  ordinal: 1 | 2 | 3;
  tagline: string;
  team: string;
  scope: string;
  sellPrice: number;
  recommended?: boolean;
  scopeBullets: string[];
};

export const tiers: Tier[] = [
  {
    key: "baseline",
    name: "COPPER",
    ordinal: 1,
    tagline: "Bring the build back to life.",
    team: "1 Mgmt + 2 Crew",
    scope:
      "Storage, maintenance, transport, build/strike of the existing build. The asset, deployed.",
    sellPrice: 25000,
    scopeBullets: [
      "Climate-controlled storage between deployments",
      "Maintenance & touch-up on existing build",
      "Round-trip transport (Louisville ↔ Jeffersonville)",
      "1 Producer × 3 days (advance + build + strike)",
      "2 Crew × 2 days (load-in + load-out, no show-day staffing)",
      "Lighting on timer; remote PM during show days",
      "Per diem for local market travel",
    ],
  },
  {
    key: "better",
    name: "IRON",
    ordinal: 2,
    tagline: "Refresh the look. Run the moment.",
    team: "2 Mgmt + 3 Crew",
    scope:
      "Everything in COPPER + refreshed graphics, expanded crew, photo + video team, custom fab refresh, activation programming, premium consumables.",
    sellPrice: 55900,
    recommended: true,
    scopeBullets: [
      "Everything in COPPER",
      "+1 Producer × 3 days (production manager coverage)",
      "Crew expanded to 3, working all 3 days (build / show / strike)",
      "Refreshed graphics & wraps on existing build",
      "One custom fab refresh / scenic accent",
      "Photo + video capture (half-day shoot, edited recap + gallery)",
      "Activation programming beat (interactive moment)",
      "Premium branded consumables + sampling materials",
    ],
  },
  {
    key: "best",
    name: "GOLD",
    ordinal: 3,
    tagline: "A new chapter, fully produced.",
    team: "3 Mgmt + 5 Crew",
    scope:
      "Everything in IRON + creative direction, premium custom fabrication, multi-cam content, talent integration, full senior management team.",
    sellPrice: 87700,
    scopeBullets: [
      "Everything in IRON",
      "+1 Senior Creative Producer × 3 days",
      "Crew expanded to 5 across all 3 days (full activation staffing)",
      "Premium custom fabrication + lighting integration",
      "Senior creative direction + brand-world extension",
      "Multi-cam content production (2 cam ops + edit + 3 cutdowns)",
      "Influencer / talent sourcing + coordination + content rights",
    ],
  },
];

// ====================================================================
// LINE ITEM DETAIL — every dollar, mapped to tier
// ====================================================================

export type LineItem = {
  num: number;
  category: "Asset" | "Logistics" | "Labor — Mgmt" | "Labor — Crew" | "Travel" | "Creative" | "Fabrication" | "Brand" | "Content" | "Programming" | "Talent";
  name: string;
  notes: string;
  cost: number;
  addedAt: TierKey;
};

export const lineItems: LineItem[] = [
  // COPPER
  { num: 1, category: "Asset", name: "Climate-controlled storage", notes: "Monthly storage of existing build between deployments", cost: 1500, addedAt: "baseline" },
  { num: 2, category: "Asset", name: "Maintenance & refurbishment", notes: "Touch-up paint, hardware, minor repairs to existing build", cost: 1500, addedAt: "baseline" },
  { num: 3, category: "Logistics", name: "Transport (round-trip)", notes: "Freight to venue and return — $5,000 floor", cost: 5000, addedAt: "baseline" },
  { num: 4, category: "Labor — Mgmt", name: "1 Producer × 3 days", notes: "Senior producer: advance + build + show + strike — $850/day", cost: 2550, addedAt: "baseline" },
  { num: 5, category: "Labor — Crew", name: "2 Crew × 2 days", notes: "Build + strike crew (load-in / load-out) — $400/day", cost: 1600, addedAt: "baseline" },
  { num: 6, category: "Travel", name: "Per diem (local market)", notes: "7 person-days × $50/day", cost: 350, addedAt: "baseline" },

  // IRON
  { num: 7, category: "Labor — Mgmt", name: "+1 Producer × 3 days", notes: "Production manager added: lead + PM coverage — $850/day", cost: 2550, addedAt: "better" },
  { num: 8, category: "Labor — Crew", name: "+1 Crew + extended days", notes: "Crew expanded to 3, working 3 days each (build / show / strike) — $400/day. Net delta = $2,000.", cost: 2000, addedAt: "better" },
  { num: 9, category: "Travel", name: "Per diem uplift", notes: "+8 person-days × $50/day", cost: 400, addedAt: "better" },
  { num: 10, category: "Creative", name: "Refreshed graphics & wraps", notes: "Refresh of print, graphics, and brand surfaces on existing build", cost: 2000, addedAt: "better" },
  { num: 11, category: "Fabrication", name: "Custom fab refresh / accent", notes: "One new signage or scenic accent piece, brand-aligned", cost: 2500, addedAt: "better" },
  { num: 12, category: "Brand", name: "Premium consumables & swag", notes: "Branded swag, sampling materials, takeaways — premium tier", cost: 2000, addedAt: "better" },
  { num: 13, category: "Content", name: "Photo + video capture", notes: "Photographer + videographer × half day, edited recap + gallery", cost: 2500, addedAt: "better" },
  { num: 14, category: "Programming", name: "Activation moment", notes: "Interactive element, props, on-brand engagement beat", cost: 1500, addedAt: "better" },

  // GOLD
  { num: 15, category: "Labor — Mgmt", name: "+1 Producer × 3 days", notes: "Senior creative producer added — $850/day", cost: 2550, addedAt: "best" },
  { num: 16, category: "Labor — Crew", name: "+2 Crew × 3 days", notes: "Crew expanded to 5 total (full activation staffing) — $400/day", cost: 2400, addedAt: "best" },
  { num: 17, category: "Travel", name: "Per diem uplift", notes: "+9 person-days × $50/day", cost: 450, addedAt: "best" },
  { num: 18, category: "Fabrication", name: "Premium custom fabrication", notes: "Lighting integration, additional scenic, premium finish package", cost: 3000, addedAt: "best" },
  { num: 19, category: "Creative", name: "Creative direction & design", notes: "Senior creative lead, design refresh, brand world extension", cost: 2500, addedAt: "best" },
  { num: 20, category: "Content", name: "Multi-camera content production", notes: "2 camera ops, full edit, recap reel + 3 social cutdowns", cost: 2500, addedAt: "best" },
  { num: 21, category: "Talent", name: "Influencer / talent integration", notes: "Talent sourcing, coordination, content rights", cost: 2500, addedAt: "best" },
];

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
    notes: "Senior producer, production manager, on-site lead. Owns scope, schedule, and client communication.",
  },
  {
    role: "Specialized Crew",
    dayRate: 600,
    hourlyEquiv: 75,
    notes: "Trade-skilled labor: lighting techs, AV / audio engineers, scenic carpenters, fabricators, riggers.",
  },
  {
    role: "General Crew",
    dayRate: 400,
    hourlyEquiv: 50,
    notes: "Generalist labor: build, strike, brand ambassadors, runners, activation staffing.",
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
    notes: "2 nights typical for a 3-day deployment.",
  },
  {
    item: "Airfare (round-trip)",
    local: null,
    outOfMarket: 400,
    basis: "per person",
    notes: "Mid-tier domestic air. KY ↔ FL typical.",
  },
];

// ====================================================================
// OUT-OF-MARKET TRAVEL UPLIFT (pass-through to client at cost)
// Jeffersonville, IN deployment — out-of-market for Tampa/Miami GHXSTSHIP base.
// ====================================================================

export type Uplift = {
  tier: TierKey;
  teamSize: number;
  airfare: number;
  lodging: number;
  perDiemUplift: number;
  total: number;
};

export const outOfMarketUplift: Record<TierKey, Uplift> = {
  baseline: { tier: "baseline", teamSize: 3, airfare: 1200, lodging: 900, perDiemUplift: 175, total: 2275 },
  better:   { tier: "better",   teamSize: 5, airfare: 2000, lodging: 1500, perDiemUplift: 375, total: 3875 },
  best:     { tier: "best",     teamSize: 8, airfare: 3200, lodging: 2400, perDiemUplift: 600, total: 6200 },
};

// ====================================================================
// RETAINER OPTION — multi-deploy annual packages
// ====================================================================

export type RetainerPackage = {
  name: "SEASONAL" | "YEAR-ROUND" | "FLAGSHIP";
  tier: "IRON" | "GOLD";
  deploysPerYear: number;
  alaCarteAnnual: number;
  retainerAnnual: number;
  clientSavings: number;
};

export const retainerPackages: RetainerPackage[] = [
  {
    name: "SEASONAL",
    tier: "IRON",
    deploysPerYear: 3,
    alaCarteAnnual: 167700,
    retainerAnnual: 150000,
    clientSavings: 17700,
  },
  {
    name: "YEAR-ROUND",
    tier: "IRON",
    deploysPerYear: 4,
    alaCarteAnnual: 223600,
    retainerAnnual: 200000,
    clientSavings: 23600,
  },
  {
    name: "FLAGSHIP",
    tier: "GOLD",
    deploysPerYear: 3,
    alaCarteAnnual: 263100,
    retainerAnnual: 235000,
    clientSavings: 28100,
  },
];

// ====================================================================
// NOTES — terms block
// ====================================================================

export const notes = {
  pricing:
    "Three pre-priced tiers, day-rate transparent. Day rates and travel rates are published below — pricing is derived from the rate card, not picked.",
  deposit: "50% deposit due on signature. Balance due May 12, 2026 (pre-event walkthrough).",
  cancellation:
    "Full refund if cancelled before May 5. 50% refund between May 5 — May 12. No refund after May 12 (crew, truck, and materials locked).",
  changeOrders:
    "Any scope change after May 12 is quoted as a written change order before execution. Nothing billed that wasn't signed.",
  paymentMethods:
    "ACH, wire, or check. Cornbread Hemp is net 15 on post-event invoices.",
  insurance:
    "GHXSTSHIP carries $2M general liability and standard cargo coverage. Certificate of insurance available on request with Abbey Road on the River and Cornbread Hemp as additional insured.",
  outOfMarket:
    "Abbey Road on the River is out-of-market for the GHXSTSHIP Tampa/Miami base. Travel & lodging is added as a pass-through line at cost — every dollar itemized in the rate card below.",
};

// ====================================================================
// CONTRACT REFERENCES
// ====================================================================

export const contractRefs = [
  { ref: "S2", label: "Scope of Work" },
  { ref: "S4", label: "Client Responsibilities" },
  { ref: "S5.6", label: "Overtime & After-Hours" },
  { ref: "S6.1", label: "Shipping & Delivery" },
  { ref: "S6.2", label: "Installation" },
  { ref: "S6.4", label: "Storage" },
  { ref: "S6.5", label: "Strike & Disposal" },
  { ref: "S7.1", label: "Insurance" },
  { ref: "S10.1", label: "Workplace Safety" },
  { ref: "S10.2", label: "Venue Compliance" },
  { ref: "S13", label: "Equipment Rental" },
  { ref: "S15.5", label: "Damage & Wear" },
  { ref: "S18", label: "Change Orders" },
];

// ====================================================================
// WHY GHXSTSHIP
// ====================================================================

export type WhyItem = {
  num: string;
  title: string;
  body: string;
};

export const whyItems: WhyItem[] = [
  {
    num: "/ 01",
    title: "Day-Rate Transparent.",
    body: "Every dollar of labor is built from a published client-facing day rate: Producer / PM $850/day, Specialized Crew $600/day, General Crew $400/day. Every dollar of travel is rate-carded. No bundled numbers. Change a day count and the line moves in front of you.",
  },
  {
    num: "/ 02",
    title: "Three Tiers, One Rate Card.",
    body: "COPPER, IRON, GOLD — fully inclusive, fully published. The price ladder ($25K → $55.9K → $87.7K) tracks the same line items at three depths of scope. Pick the tier that matches the moment; the math is the same.",
  },
  {
    num: "/ 03",
    title: "Eight-Phase Production Lifecycle.",
    body: "Every engagement runs through the same eight phases — Discovery through Legacy — with milestone gates between each. The process is the same at every tier; the team size and scope additions are what scale.",
  },
  {
    num: "/ 04",
    title: "Owned Assets, Not Rentals.",
    body: "The lighting kit and refreshed graphics stay on Cornbread's dedicated asset register. Storage, maintenance, and future deployment are accounted for in Phase 08. The next activation doesn't start from zero.",
  },
];

// ====================================================================
// FAQ
// ====================================================================

export type FAQ = { q: string; a: string };

export const faqs: FAQ[] = [
  {
    q: "Why three tiers and not a single number?",
    a: "Because the right answer depends on what moment you want this activation to make. COPPER redeploys the asset. IRON refreshes it and runs the show days. GOLD treats the activation as a brand chapter with senior creative and content. Pick the tier; the line items are identical across our books.",
  },
  {
    q: "Which tier do you recommend for Abbey Road on the River?",
    a: "IRON, because the brief explicitly added new scope (artificial greenery, lighting, planter ring) on top of the existing build — and the show is five event nights, not a one-day pop-up. IRON gives you refreshed graphics, on-site crew across all five nights, and a photo+video team. COPPER works if budget is fixed and we lean fully on the timer-driven lighting plan.",
  },
  {
    q: "Why is travel a separate line?",
    a: "Because it's a pass-through. Travel and lodging are itemized at the published rate-card so you can audit every dollar. Out-of-market deployments incur the rate-card uplift — for Jeffersonville, that's $2,275 (COPPER) / $3,875 (IRON) / $6,200 (GOLD).",
  },
  {
    q: "Can we mix tiers — IRON labor with COPPER content?",
    a: "Yes, but it's quoted as a custom build off the published day-rate card. The three tiers are pre-priced bundles; mixing means we re-derive from the rate card line by line. Cleaner to pick the tier and add line items.",
  },
  {
    q: "How does the retainer work?",
    a: "Three packages — SEASONAL (3 IRON deploys/year, $150K), YEAR-ROUND (4 IRON deploys/year, $200K), FLAGSHIP (3 GOLD deploys/year, $235K). Locking the calendar for the year amortizes producer and creative time across deployments. Cornbread saves $17.7K — $28.1K vs paying per deploy.",
  },
  {
    q: "What if we want to upgrade tier mid-engagement?",
    a: "Submit a change order before the build day call. Upgrade additions price at the published day rates — no penalty multiplier. Downgrade is allowed up to 14 days before build day; after that, crew is locked.",
  },
  {
    q: "Who owns the artificial plants and lighting after the event?",
    a: "Cornbread. Greenery and lighting are titled to the client on final payment reconciliation. Both enter storage under the Cornbread asset register and are pre-positioned for the next deployment.",
  },
  {
    q: "What if Abbey Road on the River gets rained out?",
    a: "Strike, return, and storage still happen on May 26 regardless of attendance. The weather clause in S15 protects both sides on the operational dates we've contracted. Show-day staffing (IRON and GOLD) is not refunded — crew is locked at contract.",
  },
];

// ====================================================================
// HELPERS
// ====================================================================

export function tierLineItems(tier: TierKey): LineItem[] {
  const order: TierKey[] = ["baseline", "better", "best"];
  const tierIdx = order.indexOf(tier);
  return lineItems.filter((li) => order.indexOf(li.addedAt) <= tierIdx);
}

export function tierCost(tier: TierKey): number {
  return tierLineItems(tier).reduce((sum, li) => sum + li.cost, 0);
}

export function tierByKey(key: TierKey): Tier {
  return tiers.find((t) => t.key === key)!;
}

export function recommendedTier(): Tier {
  return tiers.find((t) => t.recommended) ?? tiers[1];
}

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
