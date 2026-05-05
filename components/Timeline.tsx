import { keyDates } from "@/lib/content";

const STATUS_COLOR: Record<string, string> = {
  lead: "border-foil bg-foil/10 text-cedar",
  setup: "border-orange bg-orange/10 text-orange-dark",
  live: "border-cannabis bg-cannabis/10 text-cannabis",
  strike: "border-cedar bg-cedar/10 text-cedar",
};

const STATUS_LABEL: Record<string, string> = {
  lead: "Pre-Event",
  setup: "Setup Day",
  live: "Live",
  strike: "Strike Day",
};

export default function Timeline() {
  return (
    <section id="timeline" className="px-5 md:px-10 py-20 md:py-28 border-t border-rule">
      <div className="mb-12 md:mb-16">
        <div className="eyebrow mb-3">Section / 03 — Critical Path</div>
        <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95] text-cedar">
          Two working days.
          <br />
          <span className="text-orange">Five lit nights.</span>
        </h2>
        <p className="mt-8 max-w-2xl font-head italic text-[18px] text-muted leading-snug">
          May 19 and May 26 carry the weight. Everything in between runs on
          timers. One PM stays on call so nobody else has to.
        </p>
      </div>

      <ol className="flex flex-col gap-4 md:gap-5">
        {keyDates.map((d) => (
          <li
            key={d.num}
            className="grid grid-cols-[auto_1fr] md:grid-cols-[80px_180px_1fr_auto] gap-5 md:gap-8 items-start p-5 md:p-6 border border-rule bg-mist rounded-sm hover:shadow-card-hover transition-shadow"
          >
            <div className="font-display text-[28px] md:text-[34px] leading-none text-orange">
              {d.num}
            </div>
            <div>
              <div className="font-head font-semibold text-[22px] md:text-[26px] leading-tight text-cedar">
                {d.date}
              </div>
              <div className="font-body italic text-[13px] text-muted">
                {d.day}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="font-head font-semibold text-[17px] md:text-[19px] text-cedar mb-1">
                {d.label}
              </div>
              <p className="font-body text-[14px] md:text-[15px] leading-relaxed text-ink/85">
                {d.detail}
              </p>
              {d.crewCall && (
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Crew call: {d.crewCall}
                </div>
              )}
            </div>
            <div
              className={`col-span-2 md:col-span-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border rounded-sm ${STATUS_COLOR[d.status]}`}
            >
              {STATUS_LABEL[d.status]}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
