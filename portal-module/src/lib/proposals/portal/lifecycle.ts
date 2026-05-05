import type { PhaseWithItems } from "./types";

export type PhaseProgress = {
  completed: number;
  total: number;
  pct: number;
};

export function phaseProgress(phase: PhaseWithItems): PhaseProgress {
  const total = phase.gate_items.length;
  const completed = phase.gate_items.filter((g) => g.completed_at).length;
  return {
    completed,
    total,
    pct: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function lifecycleProgress(phases: PhaseWithItems[]): PhaseProgress {
  const totals = phases.reduce(
    (acc, p) => {
      const pp = phaseProgress(p);
      acc.completed += pp.completed;
      acc.total += pp.total;
      return acc;
    },
    { completed: 0, total: 0 },
  );
  return {
    ...totals,
    pct: totals.total === 0 ? 0 : Math.round((totals.completed / totals.total) * 100),
  };
}

export function activePhase(phases: PhaseWithItems[]): PhaseWithItems | null {
  return (
    phases.find((p) => p.state === "active") ??
    phases.find((p) => p.state === "gate_pending") ??
    null
  );
}

export function nextLockedPhase(phases: PhaseWithItems[]): PhaseWithItems | null {
  return phases.find((p) => p.state === "locked") ?? null;
}

export function phasesByState(phases: PhaseWithItems[]) {
  return {
    complete: phases.filter((p) => p.state === "complete"),
    active: phases.filter((p) => p.state === "active" || p.state === "gate_pending"),
    locked: phases.filter((p) => p.state === "locked"),
  };
}

export function phaseSubtotalCents(phase: PhaseWithItems, includeOptional = false): number {
  return phase.line_items
    .filter((li) => includeOptional || !li.is_optional)
    .reduce((sum, li) => sum + (li.subtotal_cents || 0), 0);
}

export function formatCents(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export const PHASE_STATE_COPY: Record<string, { label: string; tone: string }> = {
  locked: { label: "Locked", tone: "neutral" },
  active: { label: "Active", tone: "info" },
  gate_pending: { label: "Awaiting Gate", tone: "warning" },
  complete: { label: "Complete", tone: "success" },
};
