import Link from "next/link";
import { notFound } from "next/navigation";
import { ApprovalSignBlock } from "@/components/proposals/ApprovalSignBlock";
import { Badge } from "@/components/ui/Badge";
import { resolveSlugContext } from "@/lib/portal/slug";
import { getApproval } from "@/lib/proposals/portal/queries";
import type { FormState } from "@/components/FormShell";
import { signApprovalAction, rejectApprovalAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string; approvalId: string }> };

export default async function ApprovalDetailPage({ params }: Props) {
  const { slug, proposalId, approvalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const approval = await getApproval(ctx.orgId, approvalId);
  if (!approval || approval.proposal_id !== proposalId) notFound();

  async function sign(_prev: FormState, fd: FormData): Promise<FormState> {
    "use server";
    return await signApprovalAction(ctx!.orgId, proposalId, approvalId, slug, fd);
  }
  async function reject(_prev: FormState, fd: FormData): Promise<FormState> {
    "use server";
    return await rejectApprovalAction(ctx!.orgId, proposalId, approvalId, slug, fd);
  }

  return (
    <article className="flex flex-col gap-6">
      <Link
        href={`/p/${slug}/proposals/${proposalId}/approvals`}
        className="text-sm text-[var(--color-accent)] hover:underline"
      >
        ← Approvals
      </Link>
      <header className="surface-raised rounded-lg p-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="eyebrow">{approval.kind.replace("_", " ")}</span>
          <Badge tone={approval.state === "approved" ? "success" : approval.state === "rejected" ? "danger" : "warning"}>
            {approval.state.replace("_", " ")}
          </Badge>
        </div>
        <h2 className="text-xl font-semibold">{approval.title}</h2>
        {approval.body ? <p className="text-sm mt-3 whitespace-pre-wrap">{approval.body}</p> : null}
      </header>

      <ApprovalSignBlock
        signAction={sign}
        rejectAction={reject}
        state={approval.state}
        signedName={approval.signed_name}
        signedAt={approval.signed_at}
        rejectionReason={approval.rejection_reason}
      />
    </article>
  );
}
