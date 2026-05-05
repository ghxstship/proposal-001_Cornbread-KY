"use server";

import { revalidatePath } from "next/cache";
import type { FormState } from "@/components/FormShell";
import { withAuth } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/server";
import { recordFileUpload } from "@/lib/proposals/portal/mutations";

const PROPOSALS_BUCKET = "proposals";

export async function uploadFileAction(
  orgId: string,
  proposalId: string,
  slug: string,
  fd: FormData,
): Promise<FormState> {
  const session = await withAuth();
  const file = fd.get("file") as File | null;
  const name = String(fd.get("name") || "").trim();
  const description = String(fd.get("description") || "").trim() || null;
  const kind = String(fd.get("kind") || "misc");

  if (!file || !name) {
    return {
      error: "Name and file are required.",
      fieldErrors: { name: name ? "" : "Required", file: file ? "" : "Required" },
    };
  }

  const supabase = createServiceClient();
  const ext = file.name.split(".").pop() || "bin";
  const storagePath = `${orgId}/${proposalId}/${Date.now()}-${name.replace(/[^a-z0-9_.-]/gi, "_")}.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from(PROPOSALS_BUCKET)
    .upload(storagePath, file, { contentType: file.type, upsert: false });
  if (uploadErr) return { error: uploadErr.message };

  await recordFileUpload({
    orgId,
    proposalId,
    kind,
    name,
    description,
    storagePath,
    mimeType: file.type || null,
    sizeBytes: file.size,
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
  });

  revalidatePath(`/p/${slug}/proposals/${proposalId}/files`);
  revalidatePath(`/p/${slug}/proposals/${proposalId}`);
  return { ok: true };
}

/**
 * Generate a 60-second signed URL for a file. Mounted at:
 *   GET /api/v1/proposals/[proposalId]/files/[fileId]/download
 * (Add a thin route file in src/app/api/v1/proposals/[proposalId]/files/[fileId]/download/route.ts
 *  that calls this action and 302-redirects to the signed URL.)
 */
export async function signedDownloadUrlAction(orgId: string, fileId: string): Promise<string | null> {
  await withAuth();
  const supabase = createServiceClient();
  const { data: file } = await supabase
    .from("proposal_files")
    .select("storage_path, org_id")
    .eq("id", fileId)
    .maybeSingle();
  if (!file || file.org_id !== orgId) return null;
  const { data, error } = await supabase.storage
    .from(PROPOSALS_BUCKET)
    .createSignedUrl(file.storage_path, 60);
  if (error) return null;
  return data?.signedUrl ?? null;
}
