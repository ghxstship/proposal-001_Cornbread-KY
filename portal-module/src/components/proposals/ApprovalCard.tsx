import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { ApprovalKind, ApprovalState, ProposalApproval } from "@/lib/proposals/portal/types";

const STATE_TONE: Record<ApprovalState, "neutral" | "info" | "warning" | "success" | "danger"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  cancelled: "neutral",
};
const STATE_LABEL: Record<ApprovalState, string> = {
  pending: "Awaiting Sign-Off",
  approved: "Approved",
  rejected: "Rejected",
  cancelled: "Cancelled",
};
const KIND_LABEL: Record<ApprovalKind, string> = {
  gate: "Gate Sign-Off",
  sow: "Statement of Work",
  invoice: "Invoice",
  change_order: "Change Order",
  revision: "Revision",
  deliverable: "Deliverable",
  general: "General",
};

export function ApprovalCard({
  approval,
  href,
}: {
  approval: ProposalApproval;
  href: string;
}) {
  return (
    <Link href={href} className="surface-raised hover-lift block rounded-lg p-5 no-underline">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="eyebrow">{KIND_LABEL[approval.kind]}</span>
            <Badge tone={STATE_TONE[approval.state]}>{STATE_LABEL[approval.state]}</Badge>
          </div>
          <h3 className="text-base font-semibold leading-tight">{approval.title}</h3>
          {approval.body ? (
            <p className="text-sm text-[var(--color-fg-muted)] mt-1 line-clamp-2">{approval.body}</p>
          ) : null}
        </div>
        <div className="text-right shrink-0 text-sm">
          <div className="eyebrow">Requested</div>
          <div className="tabular-nums">
            {new Date(approval.requested_at).toLocaleDateString()}
          </div>
          {approval.signed_at ? (
            <>
              <div className="eyebrow mt-1">Signed</div>
              <div className="tabular-nums">{new Date(approval.signed_at).toLocaleDateString()}</div>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
