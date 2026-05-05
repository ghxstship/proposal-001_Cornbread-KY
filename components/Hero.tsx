import Image from "next/image";
import { project, abbeyTotals, formatUSD } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden px-5 pb-20 pt-[120px] md:px-10 md:pt-[140px] paper-grain"
    >
      {/* Meta bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-b border-rule pb-5">
        {[
          { label: "Proposal ID", value: project.proposalId },
          { label: "Prepared For", value: project.preparedFor },
          { label: "Event Window", value: project.eventDates },
          { label: "Valid Through", value: project.validThrough },
        ].map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <span className="eyebrow">{m.label}</span>
            <span className="font-head text-[17px] md:text-[20px] tracking-wide">
              {m.value}
            </span>
          </div>
        ))}
      </div>

      {/* Client x Producer */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-center border-b border-rule pb-10">
        <div className="flex justify-start">
          <Image
            src="/logos/wordmark-orange-tagline.png"
            alt="Cornbread Hemp — This is the good life"
            width={520}
            height={220}
            priority
            className="h-auto w-full max-w-[420px]"
          />
        </div>
        <div className="hidden md:flex items-center justify-center">
          <span className="font-western text-[44px] leading-none text-cedar/60">
            ×
          </span>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="eyebrow">Produced By</span>
          <div className="font-display text-[28px] md:text-[34px] leading-[1.0] tracking-[0.01em] text-cedar">
            AGV MIAMI
          </div>
          <div className="font-head italic text-[15px] text-muted">
            Experiential Fabrication & Production
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-western uppercase text-[clamp(40px,9vw,140px)] leading-[0.95] tracking-[0.01em] mt-12 text-cedar">
        Abbey Road
        <span className="block text-orange">on the River</span>
      </h1>

      <div className="mt-6 font-head italic text-[clamp(22px,3vw,36px)] text-muted">
        Cornbread Hemp, lit over the Ohio for five nights.
      </div>

      {/* Lower row */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-cedar pt-10">
        <div>
          <div className="font-head italic text-[clamp(24px,3vw,42px)] leading-[1.1] text-cedar">
            May 19: the activation comes home.
            <br />
            May 20: VIP-ready by sunset.
            <br />
            May 26: it heads to Miami.
          </div>
        </div>
        <div>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-ink">
            AGV Miami runs Cornbread Hemp's activation through{" "}
            <strong className="bg-orange/20 px-1 font-medium">
              Abbey Road on the River 2026
            </strong>
            : pickup in Louisville, install at RiverStage, long-haul return to
            the AGV warehouse for storage. Pricing is modular —
            per-activation{" "}
            <strong className="text-cedar">
              {formatUSD(abbeyTotals.perActivation)}
            </strong>
            , one-time upgrades{" "}
            <strong className="text-cedar">
              {formatUSD(abbeyTotals.upgrades)}
            </strong>
            . Engagement total:{" "}
            <strong className="bg-orange/20 px-1 font-medium">
              {formatUSD(abbeyTotals.net)}
            </strong>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#investment"
              className="bg-orange text-mist px-7 py-[16px] font-mono text-[12px] uppercase tracking-[0.2em] no-underline hover:bg-orange-dark transition-colors rounded-sm"
            >
              See the Pricing
            </a>
            <a
              href="#calendar"
              className="border border-cedar bg-transparent px-7 py-[16px] font-mono text-[12px] uppercase tracking-[0.2em] text-cedar no-underline hover:bg-cedar hover:text-mist transition-colors rounded-sm"
            >
              2026 Calendar
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-10 hidden md:flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="h-10 w-px bg-muted animate-pulse-line" />
        Scroll / Proposal
      </div>
    </section>
  );
}
