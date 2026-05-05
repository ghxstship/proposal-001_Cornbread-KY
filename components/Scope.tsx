import { deliverables } from "@/lib/content";

export default function Scope() {
  return (
    <section id="scope" className="px-5 md:px-10 py-20 md:py-28 border-t border-rule bg-cedar text-mist">
      <div className="mb-12 md:mb-16">
        <div className="eyebrow mb-3 text-orange">Section / 02 — Engagement</div>
        <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95]">
          What we're
          <br />
          <span className="text-orange">delivering.</span>
        </h2>
        <p className="mt-8 max-w-2xl font-head italic text-[18px] md:text-[22px] text-mist/80 leading-snug">
          Six deliverables. Two working days on the ground. Every statement
          below is what happens — declarative, not conditional on anything
          outside this page.
        </p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-mist/20">
        {deliverables.map((d, i) => (
          <li
            key={d.num}
            className={`grid grid-cols-[auto_1fr] gap-5 md:gap-7 py-8 md:py-10 pr-0 md:pr-10 border-b border-mist/20 ${
              i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
            }`}
          >
            <div className="font-display text-[30px] md:text-[36px] leading-none text-orange">
              {d.num}
            </div>
            <div>
              <h3 className="font-head font-semibold text-[22px] md:text-[26px] leading-snug text-mist mb-3">
                {d.title}
              </h3>
              <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-mist/85">
                {d.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
