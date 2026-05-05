"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/components/FormShell";
import { withAuth } from "@/lib/auth";
import {
  commentOnRevision,
  openRevision,
  resolveRevision,
} from "@/lib/proposals/portal/mutations";
import type { RevisionAssetKind, RevisionState } from "@/lib/proposals/portal/types";

export async function openRevisionAction(
  orgId: string,
  proposalId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const title = String(fd.get("title") || "").trim();
  if (!title) return { error: "Title is required.", fieldErrors: { title: "Required" } };
  const description = String(fd.get("description") || "").trim() || null;
  const assetKind = (String(fd.get("asset_kind") || "image") as RevisionAssetKind) || "image";
  const assetUrl = String(fd.get("asset_url") || "").trim() || null;

  const r = await openRevision({
    orgId,
    proposalId,
    title,
    description,
    assetKind,
    assetUrl,
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
  });

  revalidatePath(`/p/${slug}/proposals/${proposalId}/revisions`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
  redirect(`/p/${slug}/proposals/${proposalId}/revisions/${r.id}`);
}

export async function addRevisionCommentAction(
  orgId: string,
  proposalId: string,
  revisionId: string,
  slug: string,
  body: string,
  anchor: { x: number; y: number; w?: number; h?: number } | null,
) {
  const session = await withAuth();
  await commentOnRevision({
    orgId,
    proposalId,
    revisionId,
    body,
    anchor,
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/revisions/${revisionId}`);
}

export async function resolveRevisionAction(
  orgId: string,
  proposalId: string,
  revisionId: string,
  slug: string,
  state: RevisionState,
) {
  const session = await withAuth();
  await resolveRevision({
    orgId,
    proposalId,
    revisionId,
    state: state === "approved" || state === "changes_requested" || state === "cancelled" ? state : "approved",
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
  });
  revalidatePath(`/p/${slug}/proposals/${proposalId}/revisions/${revisionId}`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}/revisions`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
}
