# Proposal Client Portal — Turnkey Module

A drop-in proposal lifecycle portal for the flyingbluewhale stack
(Next.js 15 App Router + Supabase + Tailwind + the existing
`(portal)/p/[slug]/client/proposals/...` route group).

Adds, on top of the existing `proposals` table:

- **8-phase production lifecycle** (Discovery → Concept → Engineering →
  Fabrication → Logistics → Installation → Activation → Legacy) with
  per-phase milestone gates, status enum, and auto-unlock-on-approval
- **Change orders** with auto-numbering, requested → priced → decided
  state machine, and approve/reject sign-off
- **Revision rounds** (proofing) with multiple proofs per round and
  approve / changes-requested / reject decisions
- **Approvals** as a generic e-signature surface — phase gates, SOWs,
  change orders, revisions, final invoices
- **Files** indexed by category (proposal, sow, invoice, proof,
  condition_report, contract, other) — designed against the existing
  `proposals` Supabase Storage bucket
- **Activity log** with one row per state transition, fed by every
  mutation via the `log_proposal_activity()` RPC

All state lives in Supabase, scoped by `org_id` via the existing
`is_org_member()` RLS helper. Wires into the existing client portal
sub-nav so the surface lives at:

```
/p/[slug]/client/proposals/[proposalId]
                            /lifecycle
                            /change-orders        (+ /new, + /[coId])
                            /revisions            (+ /new, + /[revisionId])
                            /approvals            (+ /[approvalId])
                            /files
                            /activity
```

---

## Files in this module

### Migration (apply via Supabase MCP `apply_migration`)

```
supabase/migrations/20260430_000033_proposal_portal.sql
```

Contains:
- 8 tables: `proposal_phase_states`, `proposal_gate_items`,
  `proposal_change_orders`, `proposal_revision_rounds`,
  `proposal_revisions`, `proposal_approvals`, `proposal_files`,
  `proposal_activity`
- 3 enums: `proposal_phase_status`, `change_order_state`,
  `revision_state`, `approval_state`
- RLS policies (all `is_org_member(org_id)`)
- `log_proposal_activity()` SQL helper RPC
- Auto-numbering trigger for change orders
- `seed_cornbread_abbey_road(org_slug)` SQL function — idempotent demo seed

### Server-side library

```
src/lib/proposals/portal/types.ts       — discriminated unions + label maps
src/lib/proposals/portal/queries.ts     — list/get + summary
src/lib/proposals/portal/mutations.ts   — toggleGate, approvePhase, createCO,
                                          decideCO, createRound, decideRound,
                                          signApproval, declineApproval
                                          — every mutation logs activity
```

### Routes (Next.js App Router)

```
src/app/(portal)/p/[slug]/client/proposals/[proposalId]/
├── layout.tsx                      — sub-nav + ModuleHeader + PortalRail
├── page.tsx                        — Overview (metric cards, phase preview,
│                                     three open-items columns, activity)
├── lifecycle/
│   ├── page.tsx                    — Per-phase progress + milestone gates
│   ├── PhaseGateForm.tsx           — Client component (toggle, approve)
│   └── actions.ts                  — toggleGateAction, approvePhaseAction
├── change-orders/
│   ├── page.tsx                    — Index list
│   ├── new/page.tsx                — FormShell create form
│   ├── [coId]/page.tsx             — Detail
│   ├── [coId]/ChangeOrderDecision.tsx
│   └── actions.ts                  — create + decide actions
├── revisions/
│   ├── page.tsx                    — Index list
│   ├── new/page.tsx                — FormShell create form
│   ├── [revisionId]/page.tsx       — Detail (with proof grid)
│   ├── [revisionId]/RevisionDecision.tsx
│   └── actions.ts                  — create + decide actions
├── approvals/
│   ├── page.tsx                    — Index list
│   ├── [approvalId]/page.tsx       — Detail
│   ├── [approvalId]/ApprovalSignBlock.tsx
│   └── actions.ts                  — sign + decline actions
├── files/
│   └── page.tsx                    — Index list (with category badges)
└── activity/
    └── page.tsx                    — Full audit trail
```

### Touched (one-line edits)

```
src/app/(portal)/p/[slug]/client/proposals/page.tsx
  — wraps title + adds "Open →" column linking into the new portal
```

---

## Install into another flyingbluewhale-style project

1. Apply the migration (`apply_migration` in Supabase MCP, or
   `supabase db push` if you keep the SQL file in `supabase/migrations/`).

2. Copy the files above into the target project.
   Imports use only existing flyingbluewhale primitives —
   no new npm dependencies.

3. (Optional) Run the seed function once to drop the Cornbread demo:

   ```sql
   select seed_cornbread_abbey_road('demo');
   ```

   Replace `'demo'` with whatever org slug exists in the target.

4. Make sure the visiting user is a member of that org (the migration's
   RLS gate is `is_org_member(org_id)`, so non-members get a 404).

5. The new client-proposals index page links into the portal — but if
   you skip step 5 in the touched-files list, users can still navigate
   manually to `/p/[slug]/client/proposals/[proposalId]`.

---

## Convention compliance (flyingbluewhale CLAUDE.md)

- ✅ External features under `/p/[slug]/...`, never `/console/*`
- ✅ Server actions colocated as `actions.ts`, shaped as
  `(prev, fd) => Promise<FormState>` for `useActionState`
- ✅ Forms use `<FormShell action={...}>` from `src/components/FormShell.tsx`
- ✅ Server reads via `createClient()` (`src/lib/supabase/server.ts`)
- ✅ All endpoints scoped by `org_id` via `is_org_member()` RLS
- ✅ UI primitives only: `Button`, `Badge`, `Alert`, `MetricCard`,
  `ProgressBar`, `FormField`, `Checkbox`, `StatusBadge`
- ✅ Activity log fed via the `log_proposal_activity()` RPC (matching
  the audit log pattern from `audit_log`)

---

## Demo seed reference

Calling `seed_cornbread_abbey_road('demo')` produces:

| Slot                     | State                                             |
| ------------------------ | ------------------------------------------------- |
| Project slug             | `cornbread-abbey-road`                            |
| Proposal title           | Cornbread × Abbey Road on the River 2026          |
| Phase 01 Discovery       | `complete` (4/4 gates done)                       |
| Phase 02 Concept         | `in_review` (2/4 gates done)                      |
| Phase 03 Engineering     | `active` (0/4 gates done)                         |
| Phases 04–08             | `locked`                                          |
| Change orders            | #1 `priced` ($510), #2 `requested` ($485)         |
| Revision round           | Round 2 — Greenery palette (3 proofs)             |
| Approvals                | Phase 02 gate `pending`, SOW `signed`             |
| Files                    | SOW V1, Proposal V1, MSA V3                       |
| Activity                 | 7 entries spanning send → SOW → phase moves → CO  |

Demo URL after login:
```
/p/cornbread-abbey-road/client/proposals/<id>
```
The seed function returns the proposal id; or query
`select id from proposals where title like 'Cornbread%' limit 1;`
