import "server-only";

import { createClient } from "@/lib/supabase/server";
import { logActivity } from "./activity";
import type {
  ApprovalKind,
  ProposalChangeOrder,
  ProposalChangeOrderLineItem,
  RevisionAssetKind,
} from "./types";

// ─── Phase gate items ──────────────────────────────────────────────────

export async function setGateItemComplete(args: {
  orgId: string;
  proposalId: string;
  gateItemId: string;
  userId: string | null;
  userLabel?: string | null;
  complete: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proposal_phase_gate_items")
    .update({
      completed_at: args.complete ? new Date().toISOString() : null,
      completed_by: args.complete ? args.userId : null,
    })
    .eq("id", args.gateItemId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: args.complete ? "gate_item_checked" : "gate_item_unchecked",
    refId: args.gateItemId,
    payload: {},
  });
}

// ─── Change orders ─────────────────────────────────────────────────────

export async function createChangeOrder(args: {
  orgId: string;
  proposalId: string;
  phaseId?: string | null;
  title: string;
  description?: string | null;
  reason?: string | null;
  lineItems: ProposalChangeOrderLineItem[];
  scheduleDeltaDays?: number;
  userId: string | null;
  userLabel?: string | null;
}): Promise<ProposalChangeOrder> {
  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("proposal_change_orders")
    .select("number")
    .eq("proposal_id", args.proposalId)
    .order("number", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextNumber = ((maxRow as { number?: number } | null)?.number ?? 0) + 1;
  const totalDelta = args.lineItems.reduce((sum, li) => sum + (li.subtotal_cents || 0), 0);

  const { data, error } = await supabase
    .from("proposal_change_orders")
    .insert({
      org_id: args.orgId,
      proposal_id: args.proposalId,
      phase_id: args.phaseId ?? null,
      number: nextNumber,
      title: args.title,
      description: args.description ?? null,
      reason: args.reason ?? null,
      line_items: args.lineItems,
      total_delta_cents: totalDelta,
      schedule_delta_days: args.scheduleDeltaDays ?? 0,
      state: "submitted",
      submitted_at: new Date().toISOString(),
      submitted_by: args.userId,
    })
    .select("*")
    .single();
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "change_order_submitted",
    refId: (data as ProposalChangeOrder).id,
    payload: { number: nextNumber, total_delta_cents: totalDelta, title: args.title },
  });

  return data as ProposalChangeOrder;
}

export async function signChangeOrder(args: {
  orgId: string;
  proposalId: string;
  coId: string;
  userId: string | null;
  userLabel?: string | null;
  signedName: string;
  signedEmail: string;
  signatureMeta?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("proposal_change_orders")
    .update({
      state: "client_approved",
      signed_at: now,
      signed_by: args.userId,
      signed_name: args.signedName,
      signed_email: args.signedEmail,
      signature_meta: args.signatureMeta ?? null,
    })
    .eq("id", args.coId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? args.signedName,
    kind: "change_order_approved",
    refId: args.coId,
    payload: { signed_name: args.signedName, signed_email: args.signedEmail },
  });
}

export async function rejectChangeOrder(args: {
  orgId: string;
  proposalId: string;
  coId: string;
  userId: string | null;
  userLabel?: string | null;
  reason: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proposal_change_orders")
    .update({
      state: "client_rejected",
      rejection_reason: args.reason,
    })
    .eq("id", args.coId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "change_order_rejected",
    refId: args.coId,
    payload: { reason: args.reason },
  });
}

// ─── Revisions ─────────────────────────────────────────────────────────

export async function openRevision(args: {
  orgId: string;
  proposalId: string;
  phaseId?: string | null;
  title: string;
  description?: string | null;
  assetKind: RevisionAssetKind;
  assetUrl?: string | null;
  assetStoragePath?: string | null;
  assetMime?: string | null;
  dueAt?: string | null;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { data: maxRow } = await supabase
    .from("proposal_revisions")
    .select("number")
    .eq("proposal_id", args.proposalId)
    .order("number", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextNumber = ((maxRow as { number?: number } | null)?.number ?? 0) + 1;

  const { data, error } = await supabase
    .from("proposal_revisions")
    .insert({
      org_id: args.orgId,
      proposal_id: args.proposalId,
      phase_id: args.phaseId ?? null,
      number: nextNumber,
      title: args.title,
      description: args.description ?? null,
      asset_kind: args.assetKind,
      asset_url: args.assetUrl ?? null,
      asset_storage_path: args.assetStoragePath ?? null,
      asset_mime: args.assetMime ?? null,
      due_at: args.dueAt ?? null,
      opened_by: args.userId,
      state: "open",
    })
    .select("id")
    .single();
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "revision_opened",
    refId: (data as { id: string }).id,
    payload: { number: nextNumber, title: args.title, asset_kind: args.assetKind },
  });

  return data as { id: string };
}

export async function commentOnRevision(args: {
  orgId: string;
  proposalId: string;
  revisionId: string;
  body: string;
  parentId?: string | null;
  anchor?: { x: number; y: number; w?: number; h?: number } | null;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("proposal_revision_comments").insert({
    org_id: args.orgId,
    revision_id: args.revisionId,
    parent_id: args.parentId ?? null,
    author_id: args.userId,
    author_label: args.userLabel ?? null,
    body: args.body,
    anchor: args.anchor ?? null,
  });
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "revision_commented",
    refId: args.revisionId,
    payload: { body: args.body.slice(0, 140) },
  });
}

export async function resolveRevision(args: {
  orgId: string;
  proposalId: string;
  revisionId: string;
  state: "approved" | "changes_requested" | "cancelled";
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("proposal_revisions")
    .update({
      state: args.state,
      resolved_at: args.state === "approved" || args.state === "cancelled" ? now : null,
      resolved_by: args.state === "approved" || args.state === "cancelled" ? args.userId : null,
    })
    .eq("id", args.revisionId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "revision_resolved",
    refId: args.revisionId,
    payload: { state: args.state },
  });
}

// ─── Approvals ─────────────────────────────────────────────────────────

export async function requestApproval(args: {
  orgId: string;
  proposalId: string;
  kind: ApprovalKind;
  title: string;
  body?: string | null;
  refId?: string | null;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_approvals")
    .insert({
      org_id: args.orgId,
      proposal_id: args.proposalId,
      kind: args.kind,
      title: args.title,
      body: args.body ?? null,
      ref_id: args.refId ?? null,
      requested_by: args.userId,
      state: "pending",
    })
    .select("id")
    .single();
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "approval_requested",
    refId: (data as { id: string }).id,
    payload: { kind: args.kind, title: args.title },
  });

  return data as { id: string };
}

export async function signApproval(args: {
  orgId: string;
  proposalId: string;
  approvalId: string;
  signedName: string;
  signedEmail: string;
  userId: string | null;
  userLabel?: string | null;
  signatureMeta?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("proposal_approvals")
    .update({
      state: "approved",
      signed_at: now,
      signed_by: args.userId,
      signed_name: args.signedName,
      signed_email: args.signedEmail,
      signature_meta: args.signatureMeta ?? null,
    })
    .eq("id", args.approvalId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? args.signedName,
    kind: "approval_signed",
    refId: args.approvalId,
    payload: { signed_name: args.signedName, signed_email: args.signedEmail },
  });
}

export async function rejectApproval(args: {
  orgId: string;
  proposalId: string;
  approvalId: string;
  reason: string;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proposal_approvals")
    .update({
      state: "rejected",
      rejection_reason: args.reason,
    })
    .eq("id", args.approvalId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "approval_rejected",
    refId: args.approvalId,
    payload: { reason: args.reason },
  });
}

// ─── Files ─────────────────────────────────────────────────────────────

export async function recordFileUpload(args: {
  orgId: string;
  proposalId: string;
  phaseId?: string | null;
  kind: string;
  name: string;
  description?: string | null;
  storagePath: string;
  mimeType?: string | null;
  sizeBytes?: number | null;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_files")
    .insert({
      org_id: args.orgId,
      proposal_id: args.proposalId,
      phase_id: args.phaseId ?? null,
      kind: args.kind,
      name: args.name,
      description: args.description ?? null,
      storage_path: args.storagePath,
      mime_type: args.mimeType ?? null,
      size_bytes: args.sizeBytes ?? null,
      uploaded_by: args.userId,
    })
    .select("id")
    .single();
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "file_uploaded",
    refId: (data as { id: string }).id,
    payload: { kind: args.kind, name: args.name },
  });

  return data as { id: string };
}

export async function softDeleteFile(args: {
  orgId: string;
  proposalId: string;
  fileId: string;
  userId: string | null;
  userLabel?: string | null;
}) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proposal_files")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", args.fileId)
    .eq("org_id", args.orgId);
  if (error) throw error;

  await logActivity({
    orgId: args.orgId,
    proposalId: args.proposalId,
    actorId: args.userId,
    actorLabel: args.userLabel ?? null,
    kind: "file_deleted",
    refId: args.fileId,
  });
}
