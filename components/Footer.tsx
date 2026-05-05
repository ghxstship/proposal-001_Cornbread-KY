import Image from "next/image";
import { project, contractRefs } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="px-5 md:px-10 py-16 md:py-20 border-t-2 border-cedar bg-mist">
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10 md:gap-14 mb-12">
        <div>
          <Image
            src="/logos/wordmark-orange.png"
            alt="Cornbread Hemp"
            width={200}
            height={50}
            className="h-10 w-auto mb-5"
          />
          <p className="font-head italic text-[17px] text-cedar leading-snug max-w-sm">
            {project.event} — {project.city}
          </p>
          <p className="font-body text-[14px] text-muted mt-2">
            {project.eventDates}
          </p>
        </div>

        <div>
          <div className="eyebrow mb-3">Prepared By</div>
          <div className="font-head font-semibold text-[18px] text-cedar">
            {project.producerLegal}
          </div>
          <div className="font-body italic text-[14px] text-muted">
            Experiential Fabrication & Production
          </div>
          <a
            href={`mailto:${project.producerEmail}`}
            className="inline-block mt-3 font-mono text-[12px] text-orange-dark hover:text-orange underline decoration-dotted underline-offset-4"
          >
            {project.producerEmail}
          </a>
        </div>

        <div>
          <div className="eyebrow mb-3">Contract Refs</div>
          <div className="flex flex-wrap gap-1.5">
            {contractRefs.map((c) => (
              <span
                key={c.ref}
                className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-rule text-muted rounded-sm"
                title={c.label}
              >
                {c.ref}
              </span>
            ))}
          </div>
          <p className="font-body italic text-[12px] text-muted mt-3">
            Full master services agreement delivered with SOW.
          </p>
        </div>
      </div>

      <div className="rule-dot mb-8" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>© 2026 {project.producerLegal}. All rights reserved.</span>
        <span>
          {project.proposalId} — Prepared {project.preparedOn}
        </span>
      </div>
    </footer>
  );
}
