import type { ActivityKind, ProposalActivity } from "@/lib/proposals/portal/types";

const KIND_LABEL: Record<ActivityKind, string> = {
  phase_started: "Phase started",
  phase_completed: "Phase completed",
  gate_item_checked: "Gate item checked",
  gate_item_unchecked: "Gate item un-checked",
  change_order_submitted: "Change order submitted",
  change_order_approved: "Change order approved",
  change_order_rejected: "Change order rejected",
  revision_opened: "Revision opened",
  revision_commented: "Revision comment",
  revision_resolved: "Revision resolved",
  approval_requested: "Approval requested",
  approval_signed: "Approval signed",
  approval_rejected: "Approval rejected",
  file_uploaded: "File uploaded",
  file_deleted: "File deleted",
  note: "Note",
};

const KIND_TONE: Record<ActivityKind, string> = {
  phase_started: "var(--color-info-fg)",
  phase_completed: "var(--color-success-fg)",
  gate_item_checked: "var(--color-success-fg)",
  gate_item_unchecked: "var(--color-warning-fg)",
  change_order_submitted: "var(--color-info-fg)",
  change_order_approved: "var(--color-success-fg)",
  change_order_rejected: "var(--color-danger-fg)",
  revision_opened: "var(--color-info-fg)",
  revision_commented: "var(--color-fg-muted)",
  revision_resolved: "var(--color-success-fg)",
  approval_requested: "var(--color-warning-fg)",
  approval_signed: "var(--color-success-fg)",
  approval_rejected: "var(--color-danger-fg)",
  file_uploaded: "var(--color-fg-muted)",
  file_deleted: "var(--color-fg-muted)",
  note: "var(--color-fg-muted)",
};

export function ActivityFeed({ items }: { items: ProposalActivity[] }) {
  if (items.length === 0) {
    return (
      <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
        No activity yet.
      </div>
    );
  }
  return (
    <ol className="surface-raised flex flex-col divide-y divide-[var(--color-border-subtle)] rounded-lg overflow-hidden">
      {items.map((a) => {
        const summary =
          (a.payload as { title?: string; number?: number; body?: string; reason?: string })
            ?.title ||
          (a.payload as { number?: number })?.number?.toString() ||
          "";
        return (
          <li key={a.id} className="flex items-start gap-4 px-5 py-4">
            <div
              className="mt-1 shrink-0 w-2 h-2 rounded-full"
              style={{ background: KIND_TONE[a.kind] }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{KIND_LABEL[a.kind]}</div>
              <div className="text-sm text-[var(--color-fg-muted)] mt-0.5 truncate">
                {a.actor_label ? `${a.actor_label} · ` : ""}
                {summary}
              </div>
            </div>
            <div className="text-right shrink-0 text-xs text-[var(--color-fg-muted)] tabular-nums">
              {new Date(a.created_at).toLocaleString()}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
