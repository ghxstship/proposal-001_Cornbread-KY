import { project } from "@/lib/content";

const FACTS = [
  { label: "Event", value: project.event, meta: "Beatles tribute festival" },
  { label: "Venue", value: project.venue, meta: project.city },
  { label: "Event Dates", value: project.eventDates, meta: "5 event days" },
  { label: "Setup", value: project.setupDate, meta: "07:00 call" },
  { label: "VIP Opening", value: project.vipOpening, meta: "Lighting live by sunset" },
  { label: "Teardown", value: project.teardownDate, meta: "07:00 call" },
  { label: "Pickup Origin", value: "Louisville, KY", meta: project.originVendor },
  { label: "Storage Destination", value: "Miami, FL", meta: project.storageDestination },
];

export default function EventFacts() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28 border-t border-rule">
      <div className="flex items-end justify-between mb-10 md:mb-14 gap-6 flex-wrap">
        <div>
          <div className="eyebrow mb-3">Section / 01 — Engagement at a Glance</div>
          <h2 className="font-display text-[clamp(38px,6vw,72px)] leading-[0.95] text-cedar">
            The facts,
            <br />
            pinned to the board.
          </h2>
        </div>
        <p className="max-w-md font-head italic text-[18px] text-muted leading-snug">
          Dates locked, origin confirmed, footprint known. If anything on this
          list changes, the invoice changes with it — that's how we keep it fair.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-cedar rounded-sm overflow-hidden bg-mist">
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className={`p-5 md:p-6 flex flex-col gap-2 ${
              i % 4 !== 3 ? "md:border-r" : ""
            } ${i < FACTS.length - 4 ? "md:border-b" : ""} ${
              i % 2 !== 1 ? "border-r" : ""
            } ${i < FACTS.length - 2 ? "border-b" : ""} border-rule`}
          >
            <div className="eyebrow">{f.label}</div>
            <div className="font-head font-semibold text-[18px] md:text-[20px] leading-tight text-cedar">
              {f.value}
            </div>
            <div className="font-body italic text-[13px] text-muted mt-auto">
              {f.meta}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
