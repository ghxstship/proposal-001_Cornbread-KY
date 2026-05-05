# Proposals — Lifecycle Execution Portal

Self-contained client-portal feature module for tracking a proposal from approval
through Phase 08 close. Targets `flyingbluewhale` and ships drop-in ready.

## What this gives you

A `/p/[slug]/proposals/[proposalId]` portal under the existing `(portal)` shell with:

- **Dashboard** — lifecycle progress, contracted total, open queues, recent activity
- **Lifecycle** — eight-phase tracker with milestone gates and per-phase line items
- **Phase detail** — gate checklist (toggleable), full line-item table, narrative
- **Change orders** — request, list, sign or reject, full audit trail per CO
- **Revisions / proofing** — anchored image markup, threaded comments, approve / changes-requested
- **Approvals** — gate sign-offs, SOWs, invoices, change orders, revisions in one queue
- **Files** — uploads to the existing `proposals` Supabase bucket, signed download URLs
- **Activity** — append-only audit log surfaced to the client

## What you also get

- **Idempotent migration** (`20260428_000033_proposals_lifecycle.sql`) — 9 tables, 8 enums,
  2 triggers (auto-advance phase on full gate, notify on CO state), 3 helper SQL functions
- **Notification triggers** wired into the existing `notifications` table (kind: `proposal`)
- **RLS** — every table org-scoped via `is_org_member(org_id)`; writes gated app-side
- **Idempotent seed** for the Cornbread × Abbey Road on the River 2026 proposal —
  every phase, line item, and gate item from `cornbread-abbey/lib/content.ts`

## File layout (mirrors flyingbluewhale paths)

```
src/
├─ app/(portal)/p/[slug]/proposals/[proposalId]/
│  ├─ layout.tsx                                    # sub-nav + proposal header
│  ├─ page.tsx                                      # dashboard
│  ├─ lifecycle/page.tsx                            # 8-phase tracker
│  ├─ lifecycle/[phaseId]/page.tsx                  # phase detail
│  ├─ lifecycle/actions.ts                          # toggleGateItemAction
│  ├─ change-orders/                                # list, new, [coId], actions
│  ├─ revisions/                                    # list, new, [revisionId], actions
│  ├─ approvals/                                    # list, [approvalId], actions
│  ├─ files/                                        # list+upload, actions
│  └─ activity/page.tsx
├─ components/proposals/
│  ├─ ProposalSubNav.tsx
│  ├─ ProposalSummaryCards.tsx
│  ├─ PhaseTracker.tsx
│  ├─ PhaseStatusChip.tsx
│  ├─ PhaseGateChecklist.tsx
│  ├─ PhaseLineItems.tsx
│  ├─ ChangeOrderCard.tsx
│  ├─ ChangeOrderSignBlock.tsx
│  ├─ RevisionRoundCard.tsx
│  ├─ RevisionMarkup.tsx
│  ├─ RevisionCommentThread.tsx
│  ├─ ApprovalCard.tsx
│  ├─ ApprovalSignBlock.tsx
│  ├─ FileList.tsx
│  └─ ActivityFeed.tsx
├─ lib/
│  ├─ portal/slug.ts                                # resolveSlugContext()
│  └─ proposals/portal/
│     ├─ types.ts
│     ├─ queries.ts
│     ├─ mutations.ts
│     ├─ activity.ts
│     ├─ lifecycle.ts
│     ├─ seed.ts                                    # seedCornbreadAbbeyProposal()
│     └─ index.ts
supabase/migrations/
└─ 20260428_000033_proposals_lifecycle.sql
```

## Conventions followed

- **App Router**: `src/app/(portal)/...`, `dynamic = "force-dynamic"` on all read pages
- **Server actions** in `actions.ts` next to pages, return `FormState`, feed `useActionState`
- **Forms** wrapped in `<FormShell action={…}>` from `@/components/FormShell`
- **UI primitives** from `@/components/ui/*` (Button, Input, Badge, ProgressBar, FormField, MetricCard, StatusChip, Alert, Select, Checkbox)
- **Auth gating** via `withAuth()` from `@/lib/auth` — every server action gets a session before any write
- **Supabase**: `@supabase/ssr` clients from `@/lib/supabase/server` (cookie session) and `createServiceClient()` (storage uploads only)
- **Path alias**: `@/*` → `./src/*`
- **Tailwind v4** tokens: `surface`, `surface-raised`, `surface-inset`, `metric-grid`, `data-table`, `nav-item`, `eyebrow`, `hover-lift` — uses what's already in `globals.css`

## Install

See [INSTALL.md](./INSTALL.md). Five steps: migration → copy → nav → seed → done.

## What this module does NOT touch

- The existing `proposals` table schema. We only **extend** with new tables that FK to `proposals(id)`.
- The existing `(portal)` shell layout, auth resolver, or persona routing.
- The existing public token-based proposal viewer at `src/app/proposals/[token]/`.
- The existing console at `src/app/(platform)/console/proposals/`.
- Any other domain (advancing, sales, finance, ops, etc.).

This is purely additive.
