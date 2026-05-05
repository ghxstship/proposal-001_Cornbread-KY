import "server-only";

import { createClient } from "@/lib/supabase/server";
import type {
  PhaseWithItems,
  ProposalActivity,
  ProposalApproval,
  ProposalChangeOrder,
  ProposalDashboardData,
  ProposalFile,
  ProposalPhase,
  ProposalPhaseGateItem,
  ProposalPhaseLineItem,
  ProposalRevision,
  ProposalRevisionComment,
} from "./types";

// ─── Phase reads ────────────────────────────────────────────────────────

export async function listPhases(
  orgId: string,
  proposalId: string,
): Promise<PhaseWithItems[]> {
  const supabase = await createClient();
  const { data: phases, error } = await supabase
    .from("proposal_phases")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .order("position", { ascending: true });
  if (error) throw error;
  if (!phases?.length) return [];

  const phaseIds = phases.map((p) => p.id);

  const [{ data: lineItems }, { data: gateItems }] = await Promise.all([
    supabase
      .from("proposal_phase_line_items")
      .select("*")
      .eq("org_id", orgId)
      .in("phase_id", phaseIds)
      .order("position", { ascending: true }),
    supabase
      .from("proposal_phase_gate_items")
      .select("*")
      .eq("org_id", orgId)
      .in("phase_id", phaseIds)
      .order("position", { ascending: true }),
  ]);

  return phases.map((p: ProposalPhase) => ({
    ...p,
    line_items: ((lineItems ?? []) as ProposalPhaseLineItem[]).filter((li) => li.phase_id === p.id),
    gate_items: ((gateItems ?? []) as ProposalPhaseGateItem[]).filter((gi) => gi.phase_id === p.id),
  }));
}

export async function getPhase(
  orgId: string,
  phaseId: string,
): Promise<PhaseWithItems | null> {
  const supabase = await createClient();
  const { data: phase, error } = await supabase
    .from("proposal_phases")
    .select("*")
    .eq("org_id", orgId)
    .eq("id", phaseId)
    .maybeSingle();
  if (error) throw error;
  if (!phase) return null;

  const [{ data: lineItems }, { data: gateItems }] = await Promise.all([
    supabase
      .from("proposal_phase_line_items")
      .select("*")
      .eq("org_id", orgId)
      .eq("phase_id", phaseId)
      .order("position", { ascending: true }),
    supabase
      .from("proposal_phase_gate_items")
      .select("*")
      .eq("org_id", orgId)
      .eq("phase_id", phaseId)
      .order("position", { ascending: true }),
  ]);

  return {
    ...(phase as ProposalPhase),
    line_items: (lineItems ?? []) as ProposalPhaseLineItem[],
    gate_items: (gateItems ?? []) as ProposalPhaseGateItem[],
  };
}

// ─── Change orders ──────────────────────────────────────────────────────

export async function listChangeOrders(
  orgId: string,
  proposalId: string,
): Promise<ProposalChangeOrder[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_change_orders")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .order("number", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProposalChangeOrder[];
}

export async function getChangeOrder(orgId: string, coId: string): Promise<ProposalChangeOrder | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_change_orders")
    .select("*")
    .eq("org_id", orgId)
    .eq("id", coId)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as ProposalChangeOrder | null;
}

// ─── Revisions ──────────────────────────────────────────────────────────

export async function listRevisions(
  orgId: string,
  proposalId: string,
): Promise<ProposalRevision[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_revisions")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .order("number", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProposalRevision[];
}

export async function getRevision(orgId: string, revisionId: string): Promise<ProposalRevision | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_revisions")
    .select("*")
    .eq("org_id", orgId)
    .eq("id", revisionId)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as ProposalRevision | null;
}

export async function listRevisionComments(
  orgId: string,
  revisionId: string,
): Promise<ProposalRevisionComment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_revision_comments")
    .select("*")
    .eq("org_id", orgId)
    .eq("revision_id", revisionId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ProposalRevisionComment[];
}

// ─── Approvals ──────────────────────────────────────────────────────────

export async function listApprovals(
  orgId: string,
  proposalId: string,
): Promise<ProposalApproval[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_approvals")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .order("requested_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProposalApproval[];
}

export async function getApproval(orgId: string, approvalId: string): Promise<ProposalApproval | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_approvals")
    .select("*")
    .eq("org_id", orgId)
    .eq("id", approvalId)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as ProposalApproval | null;
}

// ─── Files ──────────────────────────────────────────────────────────────

export async function listFiles(
  orgId: string,
  proposalId: string,
): Promise<ProposalFile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_files")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .is("deleted_at", null)
    .order("uploaded_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProposalFile[];
}

// ─── Activity ───────────────────────────────────────────────────────────

export async function listActivity(
  orgId: string,
  proposalId: string,
  limit = 50,
): Promise<ProposalActivity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proposal_activity")
    .select("*")
    .eq("org_id", orgId)
    .eq("proposal_id", proposalId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ProposalActivity[];
}

// ─── Composite dashboard read ───────────────────────────────────────────

export async function getDashboardData(
  orgId: string,
  proposalId: string,
): Promise<ProposalDashboardData | null> {
  const supabase = await createClient();
  const { data: proposal, error } = await supabase
    .from("proposals")
    .select("id, title, amount_cents, status")
    .eq("org_id", orgId)
    .eq("id", proposalId)
    .maybeSingle();
  if (error) throw error;
  if (!proposal) return null;

  const [phases, changeOrders, revisions, approvals, activity] = await Promise.all([
    listPhases(orgId, proposalId),
    listChangeOrders(orgId, proposalId),
    listRevisions(orgId, proposalId),
    listApprovals(orgId, proposalId),
    listActivity(orgId, proposalId, 10),
  ]);

  const contracted = phases.reduce(
    (sum, p) =>
      sum +
      p.line_items
        .filter((li) => !li.is_optional)
        .reduce((s, li) => s + (li.subtotal_cents || 0), 0),
    0,
  );
  const coDelta = changeOrders
    .filter((co) => co.state === "client_approved")
    .reduce((s, co) => s + (co.total_delta_cents || 0), 0);

  return {
    proposal: proposal as ProposalDashboardData["proposal"],
    phases,
    open_change_orders: changeOrders.filter(
      (co) => co.state === "submitted" || co.state === "draft" || co.state === "countered",
    ),
    open_revisions: revisions.filter(
      (r) => r.state === "open" || r.state === "in_review" || r.state === "changes_requested",
    ),
    pending_approvals: approvals.filter((a) => a.state === "pending"),
    recent_activity: activity,
    totals: {
      contracted_cents: contracted,
      change_order_delta_cents: coDelta,
      grand_total_cents: contracted + coDelta,
    },
  };
}
