import type { ProposalRevisionComment } from "@/lib/proposals/portal/types";

export function RevisionCommentThread({ comments }: { comments: ProposalRevisionComment[] }) {
  if (comments.length === 0) {
    return (
      <div className="text-sm text-[var(--color-fg-muted)]">
        No comments yet. Click on the image to drop a pin or post a general comment.
      </div>
    );
  }
  return (
    <ol className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
      {comments.map((c, i) => {
        const anchored = !!c.anchor;
        return (
          <li key={c.id} className="flex items-start gap-3 py-3">
            <div
              className={`shrink-0 w-7 h-7 rounded-full text-xs font-bold tabular-nums flex items-center justify-center ${
                anchored ? "bg-[var(--color-accent)] text-white" : "surface-inset"
              }`}
            >
              {anchored ? i + 1 : "·"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{c.author_label || "Client"}</span>
                <span className="text-xs text-[var(--color-fg-muted)]">
                  {new Date(c.created_at).toLocaleString()}
                </span>
                {c.is_resolved ? (
                  <span className="text-xs uppercase tracking-wide text-[var(--color-success-fg)]">
                    Resolved
                  </span>
                ) : null}
              </div>
              <p className="text-sm mt-1 whitespace-pre-wrap">{c.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
