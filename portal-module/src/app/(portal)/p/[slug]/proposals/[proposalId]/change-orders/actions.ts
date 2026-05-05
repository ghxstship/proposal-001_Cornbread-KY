"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/components/FormShell";
import { withAuth } from "@/lib/auth";
import {
  createChangeOrder,
  rejectChangeOrder,
  signChangeOrder,
} from "@/lib/proposals/portal/mutations";

export async function createChangeOrderAction(
  orgId: string,
  proposalId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const title = String(fd.get("title") || "").trim();
  if (!title) return { error: "Title is required.", fieldErrors: { title: "Required" } };
  const description = String(fd.get("description") || "").trim() || null;
  const reason = String(fd.get("reason") || "").trim() || null;
  const delta = Number(fd.get("delta") || 0);
  const scheduleDelta = Number(fd.get("schedule_delta") || 0);
  const totalDeltaCents = Math.round(delta * 100);

  const lineItems = totalDeltaCents
    ? [{ name: title, description: description ?? undefined, subtotal_cents: totalDeltaCents }]
    : [];

  await createChangeOrder({
    orgId,
    proposalId,
    title,
    description,
    reason,
    lineItems,
    scheduleDeltaDays: scheduleDelta,
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
  });

  revalidatePath(`/p/${slug}/proposals/${proposalId}/change-orders`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
  redirect(`/p/${slug}/proposals/${proposalId}/change-orders`);
}

export async function signChangeOrderAction(
  orgId: string,
  proposalId: string,
  coId: string,
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
  await signChangeOrder({
    orgId,
    proposalId,
    coId,
    userId: session.userId,
    userLabel: session.user?.name ?? null,
    signedName,
    signedEmail,
    signatureMeta: { ts: new Date().toISOString() },
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/change-orders/${coId}`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}/change-orders`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
  return { ok: true };
}

export async function rejectChangeOrderAction(
  orgId: string,
  proposalId: string,
  coId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const reason = String(fd.get("reason") || "").trim();
  if (!reason) return { error: "Reason required.", fieldErrors: { reason: "Required" } };
  await rejectChangeOrder({
    orgId,
    proposalId,
    coId,
    userId: session.userId,
    userLabel: session.user?.name ?? null,
    reason,
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/change-orders/${coId}`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}/change-orders`);
  return { ok: true };
}
