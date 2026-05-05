import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { ProposalRevision, RevisionState } from "@/lib/proposals/portal/types";

const STATE_TONE: Record<RevisionState, "neutral" | "info" | "warning" | "success" | "danger"> = {
  open: "info",
  in_review: "info",
  changes_requested: "warning",
  approved: "success",
  cancelled: "neutral",
};
const STATE_LABEL: Record<RevisionState, string> = {
  open: "Open",
  in_review: "In Review",
  changes_requested: "Changes Requested",
  approved: "Approved",
  cancelled: "Cancelled",
};

export function RevisionRoundCard({
  revision,
  href,
  commentCount,
}: {
  revision: ProposalRevision;
  href: string;
  commentCount?: number;
}) {
  return (
    <Link href={href} className="surface-raised hover-lift block rounded-lg p-5 no-underline">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-[var(--color-fg-muted)]">
              R{String(revision.number).padStart(2, "0")}
            </span>
            <Badge tone={STATE_TONE[revision.state]}>{STATE_LABEL[revision.state]}</Badge>
            <span className="text-xs uppercase tracking-wide text-[var(--color-fg-muted)]">
              {revision.asset_kind}
            </span>
          </div>
          <h3 className="text-base font-semibold leading-tight">{revision.title}</h3>
          {revision.description ? (
            <p className="text-sm text-[var(--color-fg-muted)] mt-1 line-clamp-2">
              {revision.description}
            </p>
          ) : null}
        </div>
        <div className="text-right shrink-0">
          <div className="eyebrow">Opened</div>
          <div className="text-sm tabular-nums">
            {new Date(revision.opened_at).toLocaleDateString()}
          </div>
          {commentCount !== undefined ? (
            <div className="text-xs text-[var(--color-fg-muted)] mt-1">
              {commentCount} comment{commentCount === 1 ? "" : "s"}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
