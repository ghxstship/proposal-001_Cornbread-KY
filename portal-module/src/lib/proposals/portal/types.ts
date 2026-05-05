// Proposals — Lifecycle Execution Layer
// Types for the post-approval client portal. Mirrors the migration in
// supabase/migrations/20260428_000033_proposals_lifecycle.sql.

export type PhaseState = "locked" | "active" | "gate_pending" | "complete";
export type PhasePricing = "complimentary" | "priced" | "monthly";

export type ChangeOrderState =
  | "draft"
  | "submitted"
  | "client_approved"
  | "client_rejected"
  | "countered"
  | "void";

export type RevisionState =
  | "open"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "cancelled";

export type RevisionAssetKind = "image" | "pdf" | "video" | "file" | "link";

export type ApprovalKind =
  | "gate"
  | "sow"
  | "invoice"
  | "change_order"
  | "revision"
  | "deliverable"
  | "general";

export type ApprovalState = "pending" | "approved" | "rejected" | "cancelled";

export type ProposalFileKind =
  | "sow"
  | "invoice"
  | "condition_report"
  | "proof"
  | "deliverable"
  | "inventory"
  | "photograph"
  | "misc";

export type ActivityKind =
  | "phase_started"
  | "phase_completed"
  | "gate_item_checked"
  | "gate_item_unchecked"
  | "change_order_submitted"
  | "change_order_approved"
  | "change_order_rejected"
  | "revision_opened"
  | "revision_commented"
  | "revision_resolved"
  | "approval_requested"
  | "approval_signed"
  | "approval_rejected"
  | "file_uploaded"
  | "file_deleted"
  | "note";

// ─── Domain rows ────────────────────────────────────────────────────────

export type ProposalPhase = {
  id: string;
  org_id: string;
  proposal_id: string;
  position: number;
  num: string;
  name: string;
  tag: string | null;
  pricing: PhasePricing;
  accent: string | null;
  narrative: string | null;
  state: PhaseState;
  unlocks_label: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalPhaseLineItem = {
  id: string;
  org_id: string;
  phase_id: string;
  position: number;
  name: string;
  description: string | null;
  qty_label: string | null;
  rate_label: string | null;
  subtotal_cents: number;
  is_optional: boolean;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalPhaseGateItem = {
  id: string;
  org_id: string;
  phase_id: string;
  position: number;
  label: string;
  completed_at: string | null;
  completed_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalChangeOrderLineItem = {
  name: string;
  description?: string;
  qty_label?: string;
  rate_label?: string;
  subtotal_cents: number;
};

export type ProposalChangeOrder = {
  id: string;
  org_id: string;
  proposal_id: string;
  phase_id: string | null;
  number: number;
  title: string;
  description: string | null;
  reason: string | null;
  line_items: ProposalChangeOrderLineItem[];
  total_delta_cents: number;
  schedule_delta_days: number;
  state: ChangeOrderState;
  submitted_at: string | null;
  submitted_by: string | null;
  signed_at: string | null;
  signed_by: string | null;
  signed_name: string | null;
  signed_email: string | null;
  signature_meta: Record<string, unknown> | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalRevision = {
  id: string;
  org_id: string;
  proposal_id: string;
  phase_id: string | null;
  number: number;
  title: string;
  description: string | null;
  asset_kind: RevisionAssetKind;
  asset_url: string | null;
  asset_storage_path: string | null;
  asset_mime: string | null;
  state: RevisionState;
  opened_by: string | null;
  opened_at: string;
  resolved_by: string | null;
  resolved_at: string | null;
  due_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalRevisionAnchor = {
  x: number; // 0..1
  y: number; // 0..1
  w?: number;
  h?: number;
};

export type ProposalRevisionComment = {
  id: string;
  org_id: string;
  revision_id: string;
  parent_id: string | null;
  author_id: string | null;
  author_label: string | null;
  body: string;
  anchor: ProposalRevisionAnchor | null;
  is_resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalApproval = {
  id: string;
  org_id: string;
  proposal_id: string;
  kind: ApprovalKind;
  ref_id: string | null;
  title: string;
  body: string | null;
  state: ApprovalState;
  requested_at: string;
  requested_by: string | null;
  signed_at: string | null;
  signed_by: string | null;
  signed_name: string | null;
  signed_email: string | null;
  signature_meta: Record<string, unknown> | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalFile = {
  id: string;
  org_id: string;
  proposal_id: string;
  phase_id: string | null;
  kind: ProposalFileKind;
  name: string;
  description: string | null;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_by: string | null;
  uploaded_at: string;
  deleted_at: string | null;
};

export type ProposalActivity = {
  id: string;
  org_id: string;
  proposal_id: string;
  actor_id: string | null;
  actor_label: string | null;
  kind: ActivityKind;
  ref_id: string | null;
  payload: Record<string, unknown>;
  created_at: string;
};

// ─── Composed views ─────────────────────────────────────────────────────

export type PhaseWithItems = ProposalPhase & {
  line_items: ProposalPhaseLineItem[];
  gate_items: ProposalPhaseGateItem[];
};

export type ProposalDashboardData = {
  proposal: { id: string; title: string; amount_cents: number | null; status: string };
  phases: PhaseWithItems[];
  open_change_orders: ProposalChangeOrder[];
  open_revisions: ProposalRevision[];
  pending_approvals: ProposalApproval[];
  recent_activity: ProposalActivity[];
  totals: {
    contracted_cents: number;
    change_order_delta_cents: number;
    grand_total_cents: number;
  };
};
