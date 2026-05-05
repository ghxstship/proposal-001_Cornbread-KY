"use server";

import { revalidatePath } from "next/cache";
import type { FormState } from "@/components/FormShell";
import { withAuth } from "@/lib/auth";
import { rejectApproval, signApproval } from "@/lib/proposals/portal/mutations";

export async function signApprovalAction(
  orgId: string,
  proposalId: string,
  approvalId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const signedName = String(fd.get("signed_name") || "").trim();
  const signedEmail = String(fd.get("signed_email") || "").trim();
  if (!signedName || !signedEmail) {
    return {
      error: "Name and email required.",
      fieldErrors: {
        signed_name: signedName ? "" : "Required",
        signed_email: signedEmail ? "" : "Required",
      },
    };
  }
  await signApproval({
    orgId,
    proposalId,
    approvalId,
    signedName,
    signedEmail,
    userId: session.userId,
    userLabel: session.user?.name ?? null,
    signatureMeta: { ts: new Date().toISOString() },
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/approvals/${approvalId}`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}/approvals`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
  return { ok: true };
}

export async function rejectApprovalAction(
  orgId: string,
  proposalId: string,
  approvalId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const reason = String(fd.get("reason") || "").trim();
  if (!reason) return { error: "Reason required.", fieldErrors: { reason: "Required" } };
  await rejectApproval({
    orgId,
    proposalId,
    approvalId,
    reason,
    userId: session.userId,
    userLabel: session.user?.name ?? null,
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/approvals/${approvalId}`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}/approvals`);
  return { ok: true };
}
