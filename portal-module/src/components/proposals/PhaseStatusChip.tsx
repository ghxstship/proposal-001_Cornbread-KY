import { StatusChip } from "@/components/ui/StatusChip";
import type { PhaseState } from "@/lib/proposals/portal/types";

const MAP: Record<PhaseState, { label: string; tone: "neutral" | "info" | "warning" | "success" }> = {
  locked: { label: "Locked", tone: "neutral" },
  active: { label: "Active", tone: "info" },
  gate_pending: { label: "Awaiting Gate", tone: "warning" },
  complete: { label: "Complete", tone: "success" },
};

export function PhaseStatusChip({ state }: { state: PhaseState }) {
  const m = MAP[state];
  return <StatusChip tone={m.tone}>{m.label}</StatusChip>;
}
