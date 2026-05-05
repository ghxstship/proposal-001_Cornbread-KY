# Route Inventory

All routes live under flyingbluewhale's existing `(portal)` shell at
`data-platform="gvteway"` (blue brand overlay). Authorization boundary is the
project slug — only members of the project's org can read.

| Path | File | Purpose |
|------|------|---------|
| `/p/[slug]/proposals/[proposalId]` | `page.tsx` | Dashboard — summary cards, top phases, queues, activity preview |
| `/p/[slug]/proposals/[proposalId]/lifecycle` | `lifecycle/page.tsx` | All 8 phases with progress |
| `/p/[slug]/proposals/[proposalId]/lifecycle/[phaseId]` | `lifecycle/[phaseId]/page.tsx` | Phase detail — line items + gate checklist |
| `/p/[slug]/proposals/[proposalId]/change-orders` | `change-orders/page.tsx` | Change order queue |
| `/p/[slug]/proposals/[proposalId]/change-orders/new` | `change-orders/new/page.tsx` | Submit a new change order |
| `/p/[slug]/proposals/[proposalId]/change-orders/[coId]` | `change-orders/[coId]/page.tsx` | CO detail — line items, sign or reject |
| `/p/[slug]/proposals/[proposalId]/revisions` | `revisions/page.tsx` | Revision rounds |
| `/p/[slug]/proposals/[proposalId]/revisions/new` | `revisions/new/page.tsx` | Open a new revision round |
| `/p/[slug]/proposals/[proposalId]/revisions/[revisionId]` | `revisions/[revisionId]/page.tsx` | Anchored image markup + comment thread |
| `/p/[slug]/proposals/[proposalId]/approvals` | `approvals/page.tsx` | Pending + resolved approvals |
| `/p/[slug]/proposals/[proposalId]/approvals/[approvalId]` | `approvals/[approvalId]/page.tsx` | Approval detail with sign block |
| `/p/[slug]/proposals/[proposalId]/files` | `files/page.tsx` | File browser + uploader |
| `/p/[slug]/proposals/[proposalId]/activity` | `activity/page.tsx` | Full audit log |

## Server actions

| Action | File | Trigger |
|--------|------|---------|
| `toggleGateItemAction` | `lifecycle/actions.ts` | Check / un-check a gate item; auto-advances phase state via DB trigger |
| `createChangeOrderAction` | `change-orders/actions.ts` | New CO from `/new` form; redirects to list |
| `signChangeOrderAction` | `change-orders/actions.ts` | Client signature on CO detail |
| `rejectChangeOrderAction` | `change-orders/actions.ts` | Client reject with reason |
| `openRevisionAction` | `revisions/actions.ts` | New revision round; redirects to detail |
| `addRevisionCommentAction` | `revisions/actions.ts` | Post a comment (with optional anchor) |
| `resolveRevisionAction` | `revisions/actions.ts` | Approve / request changes / cancel |
| `signApprovalAction` | `approvals/actions.ts` | Sign a pending approval |
| `rejectApprovalAction` | `approvals/actions.ts` | Reject a pending approval |
| `uploadFileAction` | `files/actions.ts` | Upload to `proposals` bucket + record in `proposal_files` |
| `signedDownloadUrlAction` | `files/actions.ts` | 60-second signed URL for a file |

## Database tables (all extend, none replace)

- `proposal_phases` — 8-phase lifecycle, FK to `proposals(id)`
- `proposal_phase_line_items` — line items per phase
- `proposal_phase_gate_items` — milestone checklist per phase
- `proposal_change_orders` — change orders, FK to `proposals(id)`
- `proposal_revisions` — revision rounds
- `proposal_revision_comments` — threaded comments with optional anchor
- `proposal_approvals` — sign-off queue across kinds
- `proposal_files` — file index (storage in existing `proposals` bucket)
- `proposal_activity` — append-only audit log

## Triggers

- `proposal_phase_gate_items_advance` — when all gate items on a phase complete,
  marks the phase `complete` and unlocks the next phase to `active`
- `proposal_change_orders_notify` — fires `notifications` row to all internal
  org members on CO state transitions
