import { notFound } from "next/navigation";
import { ApprovalCard } from "@/components/proposals/ApprovalCard";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listApprovals } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function ApprovalsPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const approvals = await listApprovals(ctx.orgId, proposalId);
  const base = `/p/${slug}/proposals/${proposalId}/approvals`;

  const pending = approvals.filter((a) => a.state === "pending");
  const decided = approvals.filter((a) => a.state !== "pending");

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-lg font-semibold">Approvals</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Gate sign-offs, SOWs, invoices, change orders — every signature lives here.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <h3 className="eyebrow">Awaiting Sign-Off</h3>
        {pending.length === 0 ? (
          <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
            Nothing waiting on you.
          </div>
        ) : (
          pending.map((a) => <ApprovalCard key={a.id} approval={a} href={`${base}/${a.id}`} />)
        )}
      </div>

      {decided.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="eyebrow">Resolved</h3>
          {decided.map((a) => <ApprovalCard key={a.id} approval={a} href={`${base}/${a.id}`} />)}
        </div>
      ) : null}
    </section>
  );
}
