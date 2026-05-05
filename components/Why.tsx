import { whyItems } from "@/lib/content";

export default function Why() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28 border-t border-rule">
      <div className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-12 items-end">
        <div>
          <div className="eyebrow mb-3">Section / 06 — Why AGV Miami</div>
          <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95] text-cedar">
            One producer.
            <br />
            <span className="text-orange">One warehouse.</span>
            <br />
            Four events on the calendar.
          </h2>
        </div>
        <p className="font-head italic text-[18px] md:text-[22px] text-muted leading-snug">
          AGV Miami runs the activation around the way Cornbread already
          operates — deploy, store, deploy again. Four reasons it lands well
          on the 2026 calendar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-cedar rounded-sm overflow-hidden bg-mist">
        {whyItems.map((w, i) => (
          <div
            key={w.num}
            className={`p-7 md:p-9 ${i % 2 === 0 ? "md:border-r" : ""} ${
              i < whyItems.length - 2 ? "md:border-b" : ""
            } ${i < whyItems.length - 1 ? "border-b md:border-b-0" : ""} ${
              i < whyItems.length - 2 ? "md:border-b" : ""
            } border-rule`}
          >
            <div className="font-mono text-[13px] tracking-[0.25em] text-orange mb-3">
              {w.num}
            </div>
            <h3 className="font-display text-[26px] md:text-[30px] leading-tight text-cedar mb-3">
              {w.title}
            </h3>
            <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-ink/85">
              {w.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
