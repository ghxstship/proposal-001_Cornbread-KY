import { Badge } from "@/components/ui/Badge";
import type { ProposalFile, ProposalFileKind } from "@/lib/proposals/portal/types";

const KIND_LABEL: Record<ProposalFileKind, string> = {
  sow: "SOW",
  invoice: "Invoice",
  condition_report: "Condition Report",
  proof: "Proof",
  deliverable: "Deliverable",
  inventory: "Inventory",
  photograph: "Photograph",
  misc: "File",
};

export function FileList({
  files,
  downloadUrlFor,
}: {
  files: ProposalFile[];
  downloadUrlFor: (file: ProposalFile) => string;
}) {
  if (files.length === 0) {
    return (
      <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
        No files yet.
      </div>
    );
  }
  return (
    <ul className="surface-raised divide-y divide-[var(--color-border-subtle)] rounded-lg overflow-hidden">
      {files.map((f) => (
        <li key={f.id} className="flex items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <Badge tone="neutral">{KIND_LABEL[f.kind]}</Badge>
            <div className="min-w-0">
              <a
                href={downloadUrlFor(f)}
                className="text-sm font-medium hover:underline truncate block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {f.name}
              </a>
              {f.description ? (
                <div className="text-xs text-[var(--color-fg-muted)] truncate">
                  {f.description}
                </div>
              ) : null}
            </div>
          </div>
          <div className="text-right shrink-0 text-xs text-[var(--color-fg-muted)] tabular-nums">
            <div>{new Date(f.uploaded_at).toLocaleDateString()}</div>
            {f.size_bytes ? <div>{(f.size_bytes / 1024).toFixed(0)} KB</div> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
