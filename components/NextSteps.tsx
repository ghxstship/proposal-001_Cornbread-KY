import { project, abbeyTotals, formatUSD } from "@/lib/content";

const STEPS = [
  {
    num: "01",
    label: "Sign the SOW",
    detail:
      "One Statement of Work pinned to the rate card and the May 19 / May 26 working dates. References the executed Master Services Agreement.",
  },
  {
    num: "02",
    label: "50% deposit wires",
    detail:
      "ACH or wire to AGV Miami, LLC. Invoice auto-generated on counter-signature. Travel & lodging pass-through itemized at-cost on a separate post-event line.",
  },
  {
    num: "03",
    label: "May 12 walkthrough",
    detail:
      "Virtual walkthrough with Cornbread, the Louisville holding vendor, and the RiverStage venue contact. Final planter count and lighting confirmation. Balance due same day.",
  },
  {
    num: "04",
    label: "May 18 truck rolls from Miami",
    detail:
      "Truck and driver depart the AGV Miami warehouse for an overnight haul to Louisville. 07:00 May 19 pickup, install signed off before the VIP opening Wednesday evening.",
  },
];

export default function NextSteps() {
  return (
    <section
      id="next-steps"
      className="px-5 md:px-10 py-20 md:py-28 border-t border-rule"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-start">
        <div>
          <div className="eyebrow mb-3">Section / 08 — Next Steps</div>
          <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95] text-cedar">
            Four moves
            <br />
            <span className="text-orange">to build day.</span>
          </h2>
          <p className="mt-8 max-w-xl font-head italic text-[18px] text-muted leading-snug">
            The longest lead on this engagement is the Miami → Louisville
            truck roll. Lock the deposit before May 12 so the truck
            departs on May 18 and the activation is VIP-ready Wednesday
            evening, May 20.
          </p>

          <ol className="mt-10 flex flex-col gap-5">
            {STEPS.map((s) => (
              <li
                key={s.num}
                className="grid grid-cols-[60px_1fr] gap-5 items-start p-5 md:p-6 border border-cedar bg-mist rounded-sm"
              >
                <div className="font-display text-[28px] md:text-[32px] leading-none text-orange">
                  {s.num}
                </div>
                <div>
                  <div className="font-head font-semibold text-[18px] md:text-[20px] text-cedar">
                    {s.label}
                  </div>
                  <p className="mt-1 font-body text-[14px] md:text-[15px] leading-relaxed text-ink/85">
                    {s.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Approval card */}
        <div className="sticky top-28 p-7 md:p-9 border-2 border-cedar bg-cedar text-mist rounded-sm">
          <div className="eyebrow text-orange mb-3">This Proposal</div>
          <div className="font-display text-[26px] md:text-[32px] leading-tight mb-5">
            {project.event}
          </div>
          <div className="flex flex-col gap-3 border-t border-mist/20 pt-5 mb-6">
            <div className="flex justify-between gap-4 font-body text-[14px]">
              <span className="text-mist/70">Proposal</span>
              <span className="font-mono">{project.proposalId}</span>
            </div>
            <div className="flex justify-between gap-4 font-body text-[14px]">
              <span className="text-mist/70">Producer</span>
              <span>{project.producer}</span>
            </div>
            <div className="flex justify-between gap-4 font-body text-[14px]">
              <span className="text-mist/70">Prepared For</span>
              <span>{project.preparedFor}</span>
            </div>
            <div className="flex justify-between gap-4 font-body text-[14px]">
              <span className="text-mist/70">Prepared On</span>
              <span>{project.preparedOn}</span>
            </div>
            <div className="flex justify-between gap-4 font-body text-[14px]">
              <span className="text-mist/70">Valid Through</span>
              <span>{project.validThrough}</span>
            </div>
          </div>

          <div className="py-5 border-y border-mist/20 mb-6">
            <div className="eyebrow text-mist/70 mb-1">Engagement Net</div>
            <div className="font-display text-[44px] md:text-[52px] leading-none text-orange">
              {formatUSD(abbeyTotals.net)}
            </div>
            <div className="font-body italic text-[13px] text-mist/70 mt-2">
              Per-activation {formatUSD(abbeyTotals.perActivation)} +
              upgrades {formatUSD(abbeyTotals.upgrades)}
            </div>
          </div>

          <a
            href={`mailto:${project.producerEmail}?subject=Cornbread × Abbey Road 2026 — Approved&body=Hi Julian%2C%0A%0AWe%27re a go on the Abbey Road proposal (${project.proposalId}). Please send the SOW and invoice for the 50%25 deposit.%0A%0AThanks%2C`}
            className="block text-center bg-orange text-cedar px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] hover:bg-mist transition-colors rounded-sm mb-3"
          >
            Approve & Request SOW
          </a>
          <a
            href={`mailto:${project.producerEmail}?subject=Cornbread × Abbey Road 2026 — Questions`}
            className="block text-center border border-mist/40 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] hover:bg-mist/10 transition-colors rounded-sm"
          >
            Send Questions
          </a>
        </div>
      </div>
    </section>
  );
}
