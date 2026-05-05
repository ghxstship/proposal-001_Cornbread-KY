import { MetricCard } from "@/components/ui/MetricCard";
import { formatCents, lifecycleProgress } from "@/lib/proposals/portal/lifecycle";
import type { ProposalDashboardData } from "@/lib/proposals/portal/types";

export function ProposalSummaryCards({ data }: { data: ProposalDashboardData }) {
  const progress = lifecycleProgress(data.phases);
  const completePhases = data.phases.filter((p) => p.state === "complete").length;
  return (
    <div className="metric-grid">
      <MetricCard
        label="Lifecycle Progress"
        value={`${progress.pct}%`}
        meta={`${completePhases} of ${data.phases.length} phases complete`}
      />
      <MetricCard
        label="Contracted"
        value={formatCents(data.totals.contracted_cents)}
        meta={
          data.totals.change_order_delta_cents
            ? `+ ${formatCents(data.totals.change_order_delta_cents)} in approved change orders`
            : "No change orders"
        }
      />
      <MetricCard
        label="Open Revisions"
        value={String(data.open_revisions.length)}
        meta={
          data.open_revisions.length === 0
            ? "Nothing waiting"
            : `${data.open_revisions.length} round${data.open_revisions.length === 1 ? "" : "s"} pending review`
        }
      />
      <MetricCard
        label="Pending Approvals"
        value={String(data.pending_approvals.length)}
        meta={
          data.pending_approvals.length === 0
            ? "Nothing waiting"
            : `${data.pending_approvals.length} awaiting your sign-off`
        }
      />
    </div>
  );
}
