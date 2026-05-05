import Link from "next/link";
import { notFound } from "next/navigation";
import { ChangeOrderSignBlock } from "@/components/proposals/ChangeOrderSignBlock";
import { Badge } from "@/components/ui/Badge";
import { resolveSlugContext } from "@/lib/portal/slug";
import { formatCents } from "@/lib/proposals/portal/lifecycle";
import { getChangeOrder } from "@/lib/proposals/portal/queries";
import type { FormState } from "@/components/FormShell";
import { signChangeOrderAction, rejectChangeOrderAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string; coId: string }> };

export default async function ChangeOrderDetailPage({ params }: Props) {
  const { slug, proposalId, coId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const co = await getChangeOrder(ctx.orgId, coId);
  if (!co || co.proposal_id !== proposalId) notFound();

  async function sign(_prev: FormState, fd: FormData): Promise<FormState> {
    "use server";
    return await signChangeOrderAction(ctx!.orgId, proposalId, coId, slug, fd);
  }
  async function reject(_prev: FormState, fd: FormData): Promise<FormState> {
    "use server";
    return await rejectChangeOrderAction(ctx!.orgId, proposalId, coId, slug, fd);
  }

  return (
    <article className="flex flex-col gap-6">
      <Link href={`/p/${slug}/proposals/${proposalId}/change-orders`} className="text-sm text-[var(--color-accent)] hover:underline">
        ← Change Orders
      </Link>
      <header className="surface-raised rounded-lg p-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-[var(--color-fg-muted)]">CO #{String(co.number).padStart(2, "0")}</span>
            <Badge tone="info">{co.state.replace("_", " ")}</Badge>
          </div>
          <div className="text-right">
            <div className="eyebrow">Cost Delta</div>
            <div className="text-2xl font-semibold tabular-nums">
              {co.total_delta_cents > 0 ? "+" : ""}
              {formatCents(co.total_delta_cents)}
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold">{co.title}</h2>
        {co.description ? <p className="text-sm mt-2">{co.description}</p> : null}
        {co.reason ? (
          <p className="text-sm mt-2 text-[var(--color-fg-muted)]">
            <span className="eyebrow mr-2">Reason</span>
            {co.reason}
          </p>
        ) : null}
      </header>

      {co.line_items.length > 0 ? (
        <section className="surface-raised rounded-lg overflow-hidden">
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
              {co.line_items.map((li, i) => (
                <tr key={i}>
                  <td>
                    <div className="font-medium">{li.name}</div>
                    {li.description ? (
                      <div className="text-sm text-[var(--color-fg-muted)] mt-0.5">{li.description}</div>
                    ) : null}
                  </td>
                  <td className="hidden md:table-cell text-sm tabular-nums">{li.qty_label || "—"}</td>
                  <td className="hidden md:table-cell text-sm tabular-nums">{li.rate_label || "—"}</td>
                  <td className="text-right font-semibold tabular-nums">
                    {formatCents(li.subtotal_cents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <ChangeOrderSignBlock
        signAction={sign}
        rejectAction={reject}
        alreadySigned={co.state === "client_approved"}
        signedName={co.signed_name}
        signedAt={co.signed_at}
      />
    </article>
  );
}
