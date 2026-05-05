import "server-only";

import { createServiceClient } from "@/lib/supabase/server";

/**
 * Idempotent seed for the Cornbread Hemp × Abbey Road on the River 2026
 * proposal. Mirrors the lifecycle defined in cornbread-abbey/lib/content.ts.
 *
 * Usage (one-shot from a server action or admin script):
 *
 *   import { seedCornbreadAbbeyProposal } from "@/lib/proposals/portal/seed";
 *   await seedCornbreadAbbeyProposal({ orgId, proposalId });
 *
 * Re-running is safe — phases are matched by (proposal_id, position).
 */

type SeedArgs = {
  orgId: string;
  proposalId: string;
};

type SeedLineItem = {
  name: string;
  description: string;
  qty_label: string;
  rate_label: string;
  subtotal_cents: number;
  is_optional?: boolean;
  note?: string;
};

type SeedPhase = {
  position: number;
  num: string;
  name: string;
  tag: string;
  pricing: "complimentary" | "priced" | "monthly";
  accent: string;
  narrative: string;
  state: "locked" | "active" | "gate_pending" | "complete";
  unlocks_label: string;
  line_items: SeedLineItem[];
  gate_items: string[];
};

const PHASES: SeedPhase[] = [
  {
    position: 1,
    num: "01",
    name: "Discovery & Creative Brief",
    tag: "Consultation + Brief Alignment + Schedule Lock",
    pricing: "complimentary",
    accent: "cannabis",
    narrative:
      "We open with a focused discovery pass. The activation already exists — our job in this phase is to catalogue what it is today, confirm what changes it needs for an outdoor Jeffersonville run, and lock the schedule against the two working days that matter: May 19 and May 26.",
    state: "active",
    unlocks_label: "Phase 02: Concept Adaptation & Visualization",
    line_items: [
      {
        name: "Pre-Event Virtual Walkthrough",
        description:
          "60-minute working session with Cornbread, the current Louisville vendor, and the RiverStage venue contact.",
        qty_label: "1 session",
        rate_label: "Complimentary",
        subtotal_cents: 0,
        note: "Held May 12",
      },
      {
        name: "Creative Brief — This Engagement",
        description:
          "Formalized brief capturing activation asset list, outdoor adaptation requirements, planter specifications, lighting intent, and operational constraints.",
        qty_label: "1 document",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
      {
        name: "Schedule & Critical Path Lock",
        description:
          "Date-stamped schedule pinning every milestone from approval through storage intake.",
        qty_label: "1 schedule",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
    ],
    gate_items: [
      "Signed creative brief with engagement parameters",
      "Confirmed venue access windows — May 19 and May 26",
      "Designated Cornbread representative assigned as PM counterpart",
      "Final planter count locked against vendor inventory",
    ],
  },
  {
    position: 2,
    num: "02",
    name: "Concept Adaptation & Visualization",
    tag: "Greenery Palette + Lighting Design + Outdoor Adaptation",
    pricing: "complimentary",
    accent: "orange",
    narrative:
      "The spatial design is already Cornbread's. We adapt it for outdoor deployment — three concrete documents: greenery palette, lighting design, and outdoor adaptation pass.",
    state: "locked",
    unlocks_label: "Phase 03: Engineering & Technical Development",
    line_items: [
      {
        name: "Greenery Palette & Specification",
        description: "Reference board and spec sheet for artificial botanicals.",
        qty_label: "1 deliverable",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
      {
        name: "Lighting Design Document",
        description:
          "Fixture positions plotted against the activation floor plan. Color presets and timer schedule.",
        qty_label: "1 document",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
      {
        name: "Outdoor Adaptation Notes",
        description: "Annotated PDF flagging UV exposure, wind load, drainage considerations.",
        qty_label: "1 document",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
    ],
    gate_items: [
      "Written approval of greenery palette",
      "Sign-off on lighting positions and timer schedule",
      "Confirmation of outdoor adaptation notes",
      "Approval to advance to engineering",
    ],
  },
  {
    position: 3,
    num: "03",
    name: "Engineering & Technical Development",
    tag: "Lighting Load Plan + Anchor Spec + Weather Plan",
    pricing: "complimentary",
    accent: "foil",
    narrative:
      "Three engineering documents: lighting load and power plan, planter anchor specification, weather contingency plan with abort triggers written down.",
    state: "locked",
    unlocks_label: "Phase 04: Fabrication & Procurement",
    line_items: [
      {
        name: "Lighting Load & Power Plan",
        description: "Circuit mapping, amperage draw, IP65 cable spec against a single 20A venue drop.",
        qty_label: "1 plan",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
      {
        name: "Planter Anchor Specification",
        description: "Anchor stake count, orientation, load rating for a 5-day outdoor run.",
        qty_label: "1 spec",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
      {
        name: "Weather Contingency Plan",
        description: "Documented abort triggers, protect-in-place protocols, PM decision tree.",
        qty_label: "1 plan",
        rate_label: "Complimentary",
        subtotal_cents: 0,
      },
    ],
    gate_items: [
      "Signed load & power plan against venue drop",
      "Approved anchor specification for planter ring",
      "Weather contingency plan distributed to all parties",
      "PE stamp obtained if required",
    ],
  },
  {
    position: 4,
    num: "04",
    name: "Fabrication & Procurement",
    tag: "Greenery Build + Lighting Kit Assembly + QC",
    pricing: "priced",
    accent: "orange",
    narrative:
      "The existing activation needs no fabrication. This phase covers the new elements: artificial greenery for the planter ring and the owned LED lighting kit.",
    state: "locked",
    unlocks_label: "Phase 05: Logistics & Pre-Deployment",
    line_items: [
      {
        name: "Artificial Greenery — Hero Botanicals",
        description: "One hero botanical per planter. UV-stable, outdoor-rated, FR-certified.",
        qty_label: "6 units",
        rate_label: "$125 / unit",
        subtotal_cents: 75000,
      },
      {
        name: "Artificial Greenery — Fill & Trailing Vine",
        description: "Ornamental grasses, trailing vine, fill material per planter.",
        qty_label: "6 planters",
        rate_label: "$85 / planter",
        subtotal_cents: 51000,
      },
      {
        name: "Planter Prep & Anchor Kit",
        description: "Base filler, hidden anchor stakes per engineering spec, trim kit.",
        qty_label: "6 planters",
        rate_label: "$45 / planter",
        subtotal_cents: 27000,
      },
      {
        name: "LED Uplight Fixtures — 40W RGBW",
        description: "Six fixtures to Cornbread's asset register. Outdoor-rated, DMX-addressable.",
        qty_label: "6 fixtures",
        rate_label: "$165 / fixture",
        subtotal_cents: 99000,
      },
      {
        name: "DMX Controller + Astronomical Timer",
        description: "Rackmount controller with astronomical clock, pre-programmed scenes.",
        qty_label: "1 controller",
        rate_label: "$285 flat",
        subtotal_cents: 28500,
      },
      {
        name: "Power Distro + Weather-Rated Cabling",
        description: "Gang box, IP65 cabling, strain relief, inline fuses.",
        qty_label: "1 kit",
        rate_label: "$195 flat",
        subtotal_cents: 19500,
      },
      {
        name: "Live Greenery Substitution",
        description: "Regional nursery sourcing — alternative to artificial.",
        qty_label: "6 planters",
        rate_label: "$165 / planter",
        subtotal_cents: 99000,
        is_optional: true,
        note: "Alternative, not additive",
      },
      {
        name: "Lighting Weekly Rental",
        description: "Weekly rental in place of the owned kit.",
        qty_label: "1 week",
        rate_label: "$1,450 flat",
        subtotal_cents: 145000,
        is_optional: true,
        note: "Alternative, not additive",
      },
    ],
    gate_items: [
      "All greenery units received, color-checked, and trim-prepped",
      "All lighting fixtures bench-tested against DMX cue stack",
      "Crate-up complete with condition photography filed",
      "Ship-out manifest reconciled against line items",
    ],
  },
  {
    position: 5,
    num: "05",
    name: "Logistics & Pre-Deployment",
    tag: "Louisville Pickup + Transit + Return",
    pricing: "priced",
    accent: "foil",
    narrative:
      "Two runs, one crew, one truck, full chain-of-custody. Load out in Louisville on May 19, run to Jeffersonville. Return on May 26.",
    state: "locked",
    unlocks_label: "Phase 06: Installation & Environment Build",
    line_items: [
      {
        name: "Pickup Crew — Louisville Load-Out",
        description: "Two-person crew, 4-hour call, blanket-wrap and pad kit.",
        qty_label: "2 crew × 4 hrs",
        rate_label: "$85 / hr",
        subtotal_cents: 68000,
      },
      {
        name: "Box Truck Rental — 16' with Lift Gate",
        description: "Two-day rental covering pickup-day and strike-day.",
        qty_label: "2 days",
        rate_label: "$240 / day",
        subtotal_cents: 48000,
      },
      {
        name: "Transit — Louisville → Jeffersonville",
        description: "Direct run, ~15 miles, ~25 minutes.",
        qty_label: "1 leg",
        rate_label: "$185 flat",
        subtotal_cents: 18500,
      },
      {
        name: "Return Transit — Jeffersonville → Warehouse",
        description: "Post-strike return run on May 26.",
        qty_label: "1 leg",
        rate_label: "$185 flat",
        subtotal_cents: 18500,
      },
      {
        name: "Cargo Insurance",
        description: "Standard cargo coverage at full replacement value, both transit legs.",
        qty_label: "2 legs",
        rate_label: "$85 / leg",
        subtotal_cents: 17000,
      },
      {
        name: "Condition Photography & Manifest",
        description: "Pre-ship and post-arrival photography, four touchpoints.",
        qty_label: "4 touchpoints",
        rate_label: "$65 / touchpoint",
        subtotal_cents: 26000,
      },
      {
        name: "Enhanced Cargo Insurance",
        description: "Upgraded coverage above standard limits.",
        qty_label: "2 legs",
        rate_label: "$145 / leg",
        subtotal_cents: 29000,
        is_optional: true,
      },
    ],
    gate_items: [
      "Louisville load-out manifest signed by current vendor",
      "Jeffersonville delivery receipt signed by venue contact",
      "Asset condition documented at both touchpoints",
      "50% balance payment confirmed before install crew call",
    ],
  },
  {
    position: 6,
    num: "06",
    name: "Installation & Environment Build",
    tag: "Tuesday, May 19 — Call 07:00",
    pricing: "priced",
    accent: "orange",
    narrative:
      "One day. Three install crew, one PM. Structural elements first, graphics and planter ring second, lighting last. Lit, timed, and walk-through approved before crew release.",
    state: "locked",
    unlocks_label: "Phase 07: Activation & Live Operations",
    line_items: [
      {
        name: "Install Crew — 3 Technicians",
        description: "Experienced install crew with tools and hardware.",
        qty_label: "3 crew × 10 hrs",
        rate_label: "$85 / hr",
        subtotal_cents: 255000,
      },
      {
        name: "Project Manager — Install Day",
        description: "Dedicated PM on site for the full install window.",
        qty_label: "1 PM × 10 hrs",
        rate_label: "$110 / hr",
        subtotal_cents: 110000,
      },
      {
        name: "Lighting Install + Programming",
        description: "Cue build, scene programming, timer setup, dark-test after sunset.",
        qty_label: "1 tech × 4 hrs",
        rate_label: "$95 / hr",
        subtotal_cents: 38000,
      },
      {
        name: "Consumables & Hardware Kit",
        description: "Fasteners, zip ties, gaff, leveling shims.",
        qty_label: "1 kit",
        rate_label: "$145 flat",
        subtotal_cents: 14500,
      },
      {
        name: "Venue Coordination Fee",
        description: "RiverStage load-in scheduling, dock assignment, credential management.",
        qty_label: "1 activation",
        rate_label: "$185 flat",
        subtotal_cents: 18500,
      },
      {
        name: "Time-Lapse Documentation",
        description: "Fixed-camera time-lapse of the full build.",
        qty_label: "1 deliverable",
        rate_label: "$485 flat",
        subtotal_cents: 48500,
        is_optional: true,
      },
    ],
    gate_items: [
      "All elements placed per approved floor plan",
      "Lighting dark-test complete and timer confirmed",
      "Client walk-through inspection complete",
      "Punch list documented and remediated before crew release",
    ],
  },
  {
    position: 7,
    num: "07",
    name: "Activation & Live Operations",
    tag: "May 21 — 25 / Timer-Driven + Remote PM on Standby",
    pricing: "complimentary",
    accent: "cannabis",
    narrative:
      "Five event days. No crew on site. Lighting runs on a timer. Remote PM reachable 10:00 — 23:00 daily.",
    state: "locked",
    unlocks_label: "Phase 08: Strike, Storage & Legacy",
    line_items: [
      {
        name: "Timer-Driven Lighting Operation",
        description: "Astronomical timer brings fixtures up at sunset.",
        qty_label: "5 event days",
        rate_label: "Included",
        subtotal_cents: 0,
        note: "Included in install",
      },
      {
        name: "Remote PM — On-Call Support Line",
        description: "Dedicated support line staffed 10:00 — 23:00 daily across the event run.",
        qty_label: "5 event days",
        rate_label: "Included",
        subtotal_cents: 0,
        note: "Included in project management",
      },
      {
        name: "Daily Environment Check-In",
        description: "Written status check each event morning by 09:00.",
        qty_label: "5 reports",
        rate_label: "Included",
        subtotal_cents: 0,
        note: "Included in project management",
      },
      {
        name: "On-Call Evening Tech",
        description: "On-site technician during live event hours.",
        qty_label: "per evening",
        rate_label: "$385 / night",
        subtotal_cents: 0,
        is_optional: true,
        note: "Only if scope changes",
      },
    ],
    gate_items: [
      "Event period concluded at RiverStage",
      "Cornbread confirms asset disposition: all assets enter storage",
      "Remote support line stood down",
      "Strike crew briefed against the original floor plan",
    ],
  },
  {
    position: 8,
    num: "08",
    name: "Strike, Storage & Legacy",
    tag: "Tuesday, May 26 + Ongoing Monthly",
    pricing: "priced",
    accent: "cedar",
    narrative:
      "Strike is clean and fast. Assets enter the Secure Asset Storage Program on the same truck. Inventory reconciliation goes on the record the same day.",
    state: "locked",
    unlocks_label: "Warranty period begins (14 days) / Next deployment primed",
    line_items: [
      {
        name: "Strike Crew — 3 Technicians",
        description: "Systematic disassembly, planter deconstruction, lighting teardown, pad-and-load.",
        qty_label: "3 crew × 8 hrs",
        rate_label: "$85 / hr",
        subtotal_cents: 204000,
      },
      {
        name: "Project Manager — Strike Day",
        description: "PM on site for the full strike window.",
        qty_label: "1 PM × 8 hrs",
        rate_label: "$110 / hr",
        subtotal_cents: 88000,
      },
      {
        name: "Strike Consumables",
        description: "Replacement tape, shrink wrap, strapping, anti-scuff liner.",
        qty_label: "1 kit",
        rate_label: "$95 flat",
        subtotal_cents: 9500,
      },
      {
        name: "Storage Intake & Tagging",
        description: "One-time intake into the Secure Asset Storage Program.",
        qty_label: "1 intake",
        rate_label: "$185 flat",
        subtotal_cents: 18500,
      },
      {
        name: "Secure Asset Storage — Month One",
        description: "Climate-monitored, tracked in ATLVS, access by appointment.",
        qty_label: "1 month",
        rate_label: "$485 / month",
        subtotal_cents: 48500,
        note: "3-month minimum",
      },
      {
        name: "12-Month Storage Contract",
        description: "Lock the monthly rate. Receive 2 months complimentary.",
        qty_label: "12 months",
        rate_label: "$485 × 10",
        subtotal_cents: 485000,
        is_optional: true,
        note: "Saves $970 vs month-to-month",
      },
      {
        name: "Portfolio Photography",
        description: "Commissioned installation photography for both portfolios.",
        qty_label: "1 shoot",
        rate_label: "$1,250 flat",
        subtotal_cents: 125000,
        is_optional: true,
      },
    ],
    gate_items: [
      "Strike complete at RiverStage — site restoration confirmed",
      "Post-event inventory report filed to Cornbread",
      "Storage agreement in force — Month One paid, recurring billing active",
      "Final invoice settled including all change orders",
    ],
  },
];

export async function seedCornbreadAbbeyProposal(args: SeedArgs): Promise<{
  inserted_phases: number;
  inserted_line_items: number;
  inserted_gate_items: number;
}> {
  const supabase = createServiceClient();
  let insertedPhases = 0;
  let insertedLineItems = 0;
  let insertedGateItems = 0;

  for (const phase of PHASES) {
    // Upsert phase by (proposal_id, position)
    const { data: existing } = await supabase
      .from("proposal_phases")
      .select("id")
      .eq("proposal_id", args.proposalId)
      .eq("position", phase.position)
      .maybeSingle();

    let phaseId: string;
    if (existing) {
      phaseId = (existing as { id: string }).id;
      await supabase
        .from("proposal_phases")
        .update({
          num: phase.num,
          name: phase.name,
          tag: phase.tag,
          pricing: phase.pricing,
          accent: phase.accent,
          narrative: phase.narrative,
          state: phase.state,
          unlocks_label: phase.unlocks_label,
        })
        .eq("id", phaseId);
    } else {
      const { data: inserted, error } = await supabase
        .from("proposal_phases")
        .insert({
          org_id: args.orgId,
          proposal_id: args.proposalId,
          position: phase.position,
          num: phase.num,
          name: phase.name,
          tag: phase.tag,
          pricing: phase.pricing,
          accent: phase.accent,
          narrative: phase.narrative,
          state: phase.state,
          unlocks_label: phase.unlocks_label,
        })
        .select("id")
        .single();
      if (error || !inserted) throw error ?? new Error("phase insert failed");
      phaseId = (inserted as { id: string }).id;
      insertedPhases += 1;
    }

    // Replace line items + gate items (idempotent)
    await supabase.from("proposal_phase_line_items").delete().eq("phase_id", phaseId);
    if (phase.line_items.length) {
      const { error } = await supabase.from("proposal_phase_line_items").insert(
        phase.line_items.map((li, i) => ({
          org_id: args.orgId,
          phase_id: phaseId,
          position: i + 1,
          name: li.name,
          description: li.description,
          qty_label: li.qty_label,
          rate_label: li.rate_label,
          subtotal_cents: li.subtotal_cents,
          is_optional: li.is_optional ?? false,
          note: li.note ?? null,
        })),
      );
      if (error) throw error;
      insertedLineItems += phase.line_items.length;
    }

    await supabase.from("proposal_phase_gate_items").delete().eq("phase_id", phaseId);
    if (phase.gate_items.length) {
      const { error } = await supabase.from("proposal_phase_gate_items").insert(
        phase.gate_items.map((label, i) => ({
          org_id: args.orgId,
          phase_id: phaseId,
          position: i + 1,
          label,
        })),
      );
      if (error) throw error;
      insertedGateItems += phase.gate_items.length;
    }
  }

  return {
    inserted_phases: insertedPhases,
    inserted_line_items: insertedLineItems,
    inserted_gate_items: insertedGateItems,
  };
}
