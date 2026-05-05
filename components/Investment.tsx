import {
  pricingSections,
  abbeyComposition,
  abbeyTotals,
  calendar2026,
  calendar2026Totals,
  dayRates,
  tlRates,
  notes,
  pricingLineByNum,
  formatUSD,
  type PricingSection,
  type CalendarEvent,
} from "@/lib/content";

const SECTION_ACCENT: Record<
  PricingSection["key"],
  { label: string; ring: string; chip: string }
> = {
  perActivation: {
    label: "Recurring",
    ring: "border-orange",
    chip: "bg-orange text-mist",
  },
  perMonth: {
    label: "Monthly",
    ring: "border-cannabis",
    chip: "bg-cannabis text-mist",
  },
  upgrades: {
    label: "Upgrade",
    ring: "border-cedar",
    chip: "bg-cedar text-mist",
  },
  addOns: {
    label: "Optional",
    ring: "border-foil",
    chip: "bg-foil/40 text-cedar",
  },
};

const STATUS_TONE: Record<CalendarEvent["status"], string> = {
  Quoting: "bg-orange text-mist",
  Held: "bg-foil/40 text-cedar",
  Confirmed: "bg-cannabis text-mist",
};

function basisLabel(line: { basis: string; startingAt?: boolean }) {
  const prefix = line.startingAt ? "Starting at, " : "";
  return prefix + line.basis;
}

export default function Investment() {
  return (
    <section
      id="investment"
      className="px-5 md:px-10 py-20 md:py-28 border-t border-rule bg-buttermilk/40"
    >
      {/* Section heading */}
      <div className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 md:gap-12 items-end">
        <div>
          <div className="eyebrow mb-3">Section / 05 — Investment</div>
          <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95] text-cedar">
            Modular by design.
            <br />
            <span className="text-orange">Pay for what you run.</span>
          </h2>
        </div>
        <p className="font-head italic text-[18px] md:text-[20px] text-muted leading-snug">
          {notes.pricing} Per-activation, per-month, one-time, and optional
          add-ons — every line itemized at a published rate.
        </p>
      </div>

      {/* Pricing sections — modular cards */}
      <div className="mb-16 flex flex-col gap-6">
        {pricingSections.map((section) => {
          const accent = SECTION_ACCENT[section.key];
          return (
            <div
              key={section.key}
              className={`border-2 ${accent.ring} bg-mist rounded-sm overflow-hidden`}
            >
              <div className="px-5 md:px-7 py-5 border-b border-rule flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-buttermilk/40">
                <div>
                  <div className="eyebrow mb-1">{section.title}</div>
                  <div className="font-head italic text-[15px] text-muted">
                    {section.subtitle}
                  </div>
                </div>
                <span
                  className={`self-start md:self-auto font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm ${accent.chip}`}
                >
                  {accent.label}
                </span>
              </div>
              <div>
                {section.lines.map((li) => (
                  <div
                    key={li.num}
                    className="grid grid-cols-[auto_1fr_auto] gap-4 px-5 md:px-7 py-5 border-b border-rule last:border-b-0"
                  >
                    <div className="font-mono text-[11px] text-muted pt-1 w-7 shrink-0">
                      {String(li.num).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="font-head font-semibold text-[16px] text-cedar leading-snug">
                        {li.name}
                      </div>
                      <div className="mt-1 font-body text-[13px] leading-relaxed text-ink/75 max-w-2xl">
                        {li.description}
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap pt-0.5 flex flex-col items-end gap-0.5">
                      <span className="font-display text-[20px] leading-none text-cedar">
                        {li.startingAt ? "from " : ""}
                        {formatUSD(li.price)}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        {basisLabel(li)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Abbey Road — applied composition */}
      <div className="mb-16">
        <div className="mb-5">
          <div className="eyebrow mb-2">Abbey Road · Applied Composition</div>
          <h3 className="font-display text-[28px] md:text-[34px] leading-tight text-cedar">
            What this engagement adds up to.
          </h3>
          <p className="mt-2 font-head italic text-[16px] text-muted max-w-2xl">
            The lines pulled for this specific deployment, with any
            event-level notes called out next to the rate.
          </p>
        </div>
        <div className="border-2 border-cedar bg-mist rounded-sm overflow-hidden">
          {abbeyComposition.map((c) => {
            const line = pricingLineByNum(c.pricingLineNum);
            if (!line) return null;
            return (
              <div
                key={c.pricingLineNum}
                className="grid grid-cols-[auto_1fr_auto] gap-4 px-5 md:px-7 py-4 border-b border-rule last:border-b-0"
              >
                <div className="font-mono text-[11px] text-muted pt-1 w-7 shrink-0">
                  {String(c.pricingLineNum).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-head font-semibold text-[15px] text-cedar">
                    {line.name}
                  </div>
                  {c.rationale && (
                    <div className="mt-1 font-body italic text-[12px] text-muted">
                      {c.rationale}
                    </div>
                  )}
                </div>
                <div className="text-right whitespace-nowrap pt-1 font-head font-bold text-[15px] text-cedar">
                  {formatUSD(c.amount)}
                </div>
              </div>
            );
          })}
          <div className="grid grid-cols-[1fr_auto] px-5 md:px-7 py-4 bg-buttermilk/60 border-t-2 border-cedar gap-3 items-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Per activation {formatUSD(abbeyTotals.perActivation)} · Upgrades {formatUSD(abbeyTotals.upgrades)}
            </div>
            <div className="text-right">
              <div className="eyebrow text-muted">Engagement Net</div>
              <div className="font-display text-[28px] leading-none text-orange-dark">
                {formatUSD(abbeyTotals.net)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2026 Calendar */}
      <div id="calendar" className="mb-16">
        <div className="mb-5">
          <div className="eyebrow mb-2">2026 Calendar</div>
          <h3 className="font-display text-[28px] md:text-[34px] leading-tight text-cedar">
            Four events. Same rate card. Logistics scales with distance.
          </h3>
          <p className="mt-2 font-head italic text-[16px] text-muted max-w-2xl">
            Each event applies the same per-activation rate card. The
            lighting upgrade lands once and amortizes across the calendar;
            storage runs in the months between deployments.
          </p>
        </div>
        <div className="border-2 border-cedar rounded-sm overflow-hidden bg-mist">
          <div className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_120px_140px] gap-3 px-5 md:px-6 py-3 bg-cedar text-mist text-[10px]">
            <div className="eyebrow text-mist/70">Event</div>
            <div className="eyebrow text-mist/70">City</div>
            <div className="eyebrow text-mist/70">Dates</div>
            <div className="eyebrow text-mist/70">One-Way Miles</div>
            <div className="eyebrow text-mist/70 text-center">Status</div>
            <div className="eyebrow text-mist/70 text-right">Per Event</div>
          </div>
          {calendar2026.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-[1.6fr_1fr_1.1fr_1fr_120px_140px] gap-3 px-5 md:px-6 py-4 border-b border-rule last:border-b-0 items-center"
            >
              <div>
                <div className="font-head font-bold text-[15px] text-cedar leading-tight">
                  {e.shortName}
                </div>
                <div className="font-body italic text-[12px] text-muted mt-0.5 max-w-md">
                  {e.notes}
                </div>
              </div>
              <div className="font-mono text-[12px] text-cedar">{e.city}</div>
              <div className="font-mono text-[12px] text-cedar">{e.dates}</div>
              <div className="font-mono text-[12px] text-muted">
                {e.oneWayMiles.toLocaleString()} mi ·{" "}
                {e.market === "local" ? "local" : "out-of-market"}
              </div>
              <div className="text-center">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-[3px] rounded-sm ${STATUS_TONE[e.status]}`}
                >
                  {e.status}
                </span>
              </div>
              <div className="text-right">
                <div className="font-head font-bold text-[15px] text-orange-dark">
                  {formatUSD(e.perActivationCost + e.plantsCost)}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  + plants
                </div>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_auto] px-5 md:px-6 py-4 bg-buttermilk/60 border-t-2 border-cedar gap-3 items-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Annual production · 4 events + year-1 lighting upgrade
            </div>
            <div className="text-right">
              <div className="font-head font-bold text-[16px] text-cedar">
                {formatUSD(calendar2026Totals.productionAnnual)}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                + storage at {formatUSD(1500)}/mo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Day rate card */}
      <div className="mb-16">
        <div className="mb-5">
          <div className="eyebrow mb-2">Day Rate Card</div>
          <h3 className="font-display text-[28px] md:text-[34px] leading-tight text-cedar">
            How a day is priced.
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {dayRates.map((r) => (
            <div
              key={r.role}
              className="border-2 border-cedar bg-mist rounded-sm p-6"
            >
              <div className="eyebrow text-orange mb-2">{r.role}</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display text-[36px] leading-none text-cedar">
                  {formatUSD(r.dayRate)}
                </span>
                <span className="font-mono text-[12px] text-muted">/ day</span>
              </div>
              <div className="font-mono text-[12px] text-muted mb-2">
                Hourly equiv: ${r.hourlyEquiv.toFixed(2)}
              </div>
              <p className="font-body text-[14px] leading-relaxed text-ink/85">
                {r.notes}
              </p>
            </div>
          ))}
        </div>
        <div className="border border-cedar bg-mist rounded-sm overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 px-5 md:px-6 py-3 bg-cedar text-mist">
            <div className="eyebrow text-mist/70">Travel & Logistics</div>
            <div className="eyebrow text-mist/70">Local</div>
            <div className="eyebrow text-mist/70">Out-of-Market</div>
            <div className="eyebrow text-mist/70">Basis</div>
          </div>
          {tlRates.map((r) => (
            <div
              key={r.item}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 px-5 md:px-6 py-4 border-b border-rule last:border-b-0 items-start"
            >
              <div>
                <div className="font-head font-semibold text-[15px] text-cedar">
                  {r.item}
                </div>
                {r.notes && (
                  <div className="font-body italic text-[12px] text-muted mt-0.5">
                    {r.notes}
                  </div>
                )}
              </div>
              <div className="font-mono text-[13px] text-cedar">
                {r.local !== null ? formatUSD(r.local) : "—"}
              </div>
              <div className="font-mono text-[13px] text-cedar">
                {formatUSD(r.outOfMarket)}
              </div>
              <div className="font-mono text-[12px] text-muted">{r.basis}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 border border-cedar bg-mist rounded-sm">
          <div className="eyebrow mb-3 text-orange">Deposit & Balance</div>
          <p className="font-body text-[15px] leading-relaxed text-ink/90">
            {notes.deposit}
          </p>
        </div>
        <div className="p-6 border border-cedar bg-mist rounded-sm">
          <div className="eyebrow mb-3 text-orange">Cancellation</div>
          <p className="font-body text-[14px] leading-relaxed text-ink/90">
            {notes.cancellation}
          </p>
        </div>
        <div className="p-6 border border-cedar bg-mist rounded-sm">
          <div className="eyebrow mb-3 text-orange">Change Orders</div>
          <p className="font-body text-[14px] leading-relaxed text-ink/90">
            {notes.changeOrders}
          </p>
        </div>
        <div className="p-6 border border-cedar bg-mist rounded-sm">
          <div className="eyebrow mb-3 text-orange">Payment & Insurance</div>
          <p className="font-body text-[14px] leading-relaxed text-ink/90">
            {notes.paymentMethods}
          </p>
          <p className="font-body text-[14px] leading-relaxed text-ink/90 mt-2">
            {notes.insurance}
          </p>
        </div>
      </div>
    </section>
  );
}
