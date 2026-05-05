import { formatCents } from "@/lib/proposals/portal/lifecycle";
import type { ProposalPhaseLineItem } from "@/lib/proposals/portal/types";

export function PhaseLineItems({ items }: { items: ProposalPhaseLineItem[] }) {
  if (items.length === 0) {
    return (
      <div className="text-sm text-[var(--color-fg-muted)]">No line items.</div>
    );
  }

  const core = items.filter((li) => !li.is_optional);
  const optional = items.filter((li) => li.is_optional);

  return (
    <div className="flex flex-col gap-6">
      {core.length > 0 ? (
        <Group title="Core Deliverables" items={core} />
      ) : null}
      {optional.length > 0 ? (
        <Group title="Options & Add-Ons" items={optional} optional />
      ) : null}
    </div>
  );
}

function Group({
  title,
  items,
  optional = false,
}: {
  title: string;
  items: ProposalPhaseLineItem[];
  optional?: boolean;
}) {
  return (
    <div>
      <div className="eyebrow mb-2">{title}</div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Line Item</th>
            <th className="hidden md:table-cell">Quantity</th>
            <th className="hidden md:table-cell">Rate</th>
            <th className="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((li) => {
            const display =
              li.subtotal_cents > 0
                ? formatCents(li.subtotal_cents)
                : li.note?.toLowerCase().includes("included") ||
                    li.rate_label?.toLowerCase() === "included"
                  ? "Included"
                  : li.rate_label?.toLowerCase() === "complimentary"
                    ? "Complimentary"
                    : "—";
            return (
              <tr key={li.id} data-optional={optional ? "true" : undefined}>
                <td>
                  <div className="font-medium">{li.name}</div>
                  {li.description ? (
                    <div className="text-sm text-[var(--color-fg-muted)] mt-0.5">
                      {li.description}
                    </div>
                  ) : null}
                  {li.note ? (
                    <div className="eyebrow mt-1">{li.note}</div>
                  ) : null}
                </td>
                <td className="hidden md:table-cell text-sm text-[var(--color-fg-muted)] tabular-nums">
                  {li.qty_label || "—"}
                </td>
                <td className="hidden md:table-cell text-sm text-[var(--color-fg-muted)] tabular-nums">
                  {li.rate_label || "—"}
                </td>
                <td className="text-right font-semibold tabular-nums">{display}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
