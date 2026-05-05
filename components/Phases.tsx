"use client";

import { useState } from "react";
import { phases, type Phase } from "@/lib/content";

const COLOR: Record<Phase["color"], { accent: string; soft: string }> = {
  orange: { accent: "#C5883F", soft: "bg-orange/5" },
  cedar: { accent: "#44382A", soft: "bg-cedar/5" },
  cannabis: { accent: "#3D441D", soft: "bg-cannabis/5" },
  foil: { accent: "#DD9F48", soft: "bg-foil/10" },
};

const STATUS_STYLE: Record<Phase["status"], string> = {
  Included: "bg-cannabis text-mist",
  "Per-Event": "bg-orange text-mist",
};

function PhaseCard({ phase }: { phase: Phase }) {
  const [open, setOpen] = useState(false);
  const c = COLOR[phase.color];

  return (
    <div className="border border-cedar rounded-sm overflow-hidden bg-mist">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 text-left transition-colors ${c.soft} hover:bg-buttermilk/60 border-l-[6px]`}
        style={{ borderLeftColor: c.accent }}
      >
        <div
          className="font-display text-[28px] md:text-[34px] leading-none w-12 md:w-14 shrink-0"
          style={{ color: c.accent }}
        >
          {phase.num}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <div className="font-head font-bold text-[20px] md:text-[24px] text-cedar leading-tight">
              {phase.name}
            </div>
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-[3px] rounded-sm ${STATUS_STYLE[phase.status]}`}
            >
              {phase.status}
            </span>
          </div>
          <div className="font-head italic text-[13px] md:text-[14px] text-muted">
            {phase.tag}
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 font-mono text-[16px] transition-transform"
          style={{
            borderColor: c.accent,
            color: open ? "#FCF8F1" : c.accent,
            background: open ? c.accent : "transparent",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </div>
      </button>

      <div
        className={`transition-all overflow-hidden ${open ? "max-h-[6000px]" : "max-h-0"}`}
      >
        <div className="px-5 md:px-7 py-6 md:py-8 border-t border-rule">
          <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-ink/85 mb-6 max-w-3xl">
            {phase.narrative}
          </p>

          {/* Milestone Gate */}
          <div
            className="border-2 rounded-sm p-5 md:p-6 bg-mist"
            style={{ borderColor: c.accent }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-2.5 h-2.5 rotate-45"
                style={{ background: c.accent }}
              />
              <div
                className="eyebrow"
                style={{ color: c.accent }}
              >
                Milestone Gate / {phase.gate.title}
              </div>
            </div>
            <ul className="flex flex-col gap-2 mb-4">
              {phase.gate.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-body text-[14px] md:text-[15px] leading-relaxed text-ink/85"
                >
                  <span className="text-muted font-mono text-[12px] shrink-0 mt-1">▢</span>
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="font-mono text-[11px] uppercase tracking-[0.18em] pt-3 border-t border-rule"
              style={{ color: c.accent }}
            >
              → Unlocks: {phase.gate.unlocks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Phases() {
  return (
    <section id="phases" className="px-5 md:px-10 py-20 md:py-28 border-t border-rule paper-grain">
      <div className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 md:gap-12 items-end">
        <div>
          <div className="eyebrow mb-3">Section / 04 — Production Lifecycle</div>
          <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95] text-cedar">
            Five phases.
            <br />
            <span className="text-orange">Each one ends in a sign-off.</span>
          </h2>
        </div>
        <p className="font-head italic text-[18px] md:text-[20px] text-muted leading-snug">
          Discovery, Procurement, Logistics, Install, Strike & Storage. Each
          phase ends at a milestone gate — and the next phase doesn't open
          until the gate is signed. The lifecycle is the same on every event
          in the 2026 calendar.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        {phases.map((p) => (
          <PhaseCard key={p.id} phase={p} />
        ))}
      </div>
    </section>
  );
}
