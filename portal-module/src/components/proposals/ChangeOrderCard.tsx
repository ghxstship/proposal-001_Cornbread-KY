import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatCents } from "@/lib/proposals/portal/lifecycle";
import type { ChangeOrderState, ProposalChangeOrder } from "@/lib/proposals/portal/types";

const STATE_TONE: Record<ChangeOrderState, "neutral" | "info" | "warning" | "success" | "danger"> = {
  draft: "neutral",
  submitted: "info",
  client_approved: "success",
  client_rejected: "danger",
  countered: "warning",
  void: "neutral",
};
const STATE_LABEL: Record<ChangeOrderState, string> = {
  draft: "Draft",
  submitted: "Awaiting Sign-Off",
  client_approved: "Approved",
  client_rejected: "Rejected",
  countered: "Countered",
  void: "Void",
};

export function ChangeOrderCard({
  changeOrder,
  href,
}: {
  changeOrder: ProposalChangeOrder;
  href: string;
}) {
  const co = changeOrder;
  return (
    <Link href={href} className="surface-raised hover-lift block rounded-lg p-5 no-underline">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[var(--color-fg-muted)]">
              CO #{String(co.number).padStart(2, "0")}
            </span>
            <Badge tone={STATE_TONE[co.state]}>{STATE_LABEL[co.state]}</Badge>
          </div>
          <h3 className="text-base font-semibold leading-tight">{co.title}</h3>
          {co.description ? (
            <p className="text-sm text-[var(--color-fg-muted)] mt-1 line-clamp-2">{co.description}</p>
          ) : null}
        </div>
        <div className="text-right shrink-0">
          <div className="eyebrow">Delta</div>
          <div
            className={`text-lg font-semibold tabular-nums ${
              co.total_delta_cents > 0
                ? "text-[var(--color-fg)]"
                : co.total_delta_cents < 0
                  ? "text-[var(--color-success-fg)]"
                  : ""
            }`}
          >
            {co.total_delta_cents > 0 ? "+" : ""}
            {formatCents(co.total_delta_cents)}
          </div>
          {co.schedule_delta_days !== 0 ? (
            <div className="text-xs text-[var(--color-fg-muted)] mt-0.5">
              {co.schedule_delta_days > 0 ? "+" : ""}
              {co.schedule_delta_days}d schedule
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
