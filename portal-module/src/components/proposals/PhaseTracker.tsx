import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PhaseStatusChip } from "./PhaseStatusChip";
import {
  formatCents,
  phaseProgress,
  phaseSubtotalCents,
} from "@/lib/proposals/portal/lifecycle";
import type { PhaseWithItems } from "@/lib/proposals/portal/types";

type Props = {
  phases: PhaseWithItems[];
  base: string; // base href for /lifecycle
};

export function PhaseTracker({ phases, base }: Props) {
  return (
    <ol className="flex flex-col gap-3">
      {phases.map((p) => {
        const pp = phaseProgress(p);
        const subtotal = phaseSubtotalCents(p);
        const subtotalDisplay =
          p.pricing === "complimentary"
            ? "Complimentary"
            : subtotal === 0
              ? "Included"
              : formatCents(subtotal);
        return (
          <li key={p.id}>
            <Link
              href={`${base}/${p.id}`}
              className="surface-raised hover-lift block rounded-lg p-5 no-underline"
              data-state={p.state}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="text-3xl font-bold tabular-nums leading-none text-[var(--color-fg-muted)]">
                    {p.num}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
                      <PhaseStatusChip state={p.state} />
                    </div>
                    {p.tag ? (
                      <p className="text-sm text-[var(--color-fg-muted)] mt-1">{p.tag}</p>
                    ) : null}
                    {p.gate_items.length > 0 ? (
                      <div className="mt-3">
                        <ProgressBar value={pp.completed} max={pp.total} label="Gate" />
                        <p className="text-xs text-[var(--color-fg-muted)] mt-1 tabular-nums">
                          {pp.completed} / {pp.total} gate items complete
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">
                    Subtotal
                  </div>
                  <div className="text-lg font-semibold">{subtotalDisplay}</div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
