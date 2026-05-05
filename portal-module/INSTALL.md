# Drop-In Install Guide

Target repo: `flyingbluewhale` at `/Users/julianclarkson/Documents/flyingbluewhale`

This module is structured to mirror flyingbluewhale's exact paths. Importing is a
copy operation followed by one migration and one nav entry.

## 1. Apply the database migration

```bash
# Use the Supabase MCP — never hand-edit the remote DB.
# In Claude Code: mcp__supabase__apply_migration with the file body.
```

Source: `portal-module/supabase/migrations/20260428_000033_proposals_lifecycle.sql`

The migration is **idempotent**: every `create table` is `if not exists`, every enum is
guarded with `do $$ begin … exception when duplicate_object then null; end $$`, and
triggers are dropped before re-create.

## 2. Copy the files into flyingbluewhale

```bash
SRC="$HOME/Documents/cornbread-abbey/portal-module"
DST="$HOME/Documents/flyingbluewhale"

# Lib (types, queries, mutations, seed, activity, lifecycle)
cp -R "$SRC/src/lib/proposals/portal" "$DST/src/lib/proposals/"

# Slug context helper (or merge with whatever exists at $DST/src/lib/portal/)
mkdir -p "$DST/src/lib/portal"
cp -n "$SRC/src/lib/portal/slug.ts" "$DST/src/lib/portal/slug.ts"

# Components
cp -R "$SRC/src/components/proposals/." "$DST/src/components/proposals/"

# Routes
cp -R "$SRC/src/app/(portal)/p/[slug]/proposals" "$DST/src/app/(portal)/p/[slug]/"

# Migration
cp "$SRC/supabase/migrations/20260428_000033_proposals_lifecycle.sql" \
   "$DST/supabase/migrations/"
```

If `flyingbluewhale/src/components/proposals/` already has files (`PhaseBlock.tsx`,
`ProposalBlockRenderer.tsx`), the new components from this module **do not collide** —
this module adds new files prefixed with portal-specific names (`PhaseTracker`,
`PhaseGateChecklist`, `ChangeOrderCard`, etc.).

## 3. Wire the portal nav

Add a "Proposals" entry to the portal rail. In `flyingbluewhale/src/lib/nav.ts`,
locate `portalNav` (or whichever export drives the `(portal)` shell sidebar) and
append:

```ts
{
  href: (slug: string) => `/p/${slug}/proposals`,
  label: "Proposals",
  icon: "FileSignature",
  // visible to: client, owner, admin, controller, project_manager
}
```

## 4. Seed the Cornbread Abbey Road proposal

Once the migration is applied and a `proposals` row exists for Cornbread Hemp ×
Abbey Road on the River 2026, run the idempotent seed:

```ts
// scripts/seed-cornbread-abbey.ts
import { seedCornbreadAbbeyProposal } from "@/lib/proposals/portal/seed";

await seedCornbreadAbbeyProposal({
  orgId: "<cornbread-org-id>",
  proposalId: "<existing-proposals-row-id>",
});
```

Or call it from a one-shot server action in `(platform)/console`.

The seed is idempotent — phases match by `(proposal_id, position)`, line items and
gate items are replaced on each run.

## 5. Storage bucket

The `proposals` bucket already exists in flyingbluewhale (declared in
`supabase/migrations/20260416_000009_storage_buckets.sql`). The `files` route uses
it via `createServiceClient().storage.from("proposals")`.

If you want to surface signed download URLs through `/api/v1`, add a thin route
handler at:

```
src/app/api/v1/proposals/[proposalId]/files/[fileId]/download/route.ts
```

That handler should call `signedDownloadUrlAction(orgId, fileId)` from
`src/app/(portal)/p/[slug]/proposals/[proposalId]/files/actions.ts` and 302 to
the returned signed URL.

## 6. Stubs entry

Append the new routes to `scripts/routes.txt` so the stub generator stays in sync:

```
(portal)/p/[slug]/proposals
(portal)/p/[slug]/proposals/[proposalId]
(portal)/p/[slug]/proposals/[proposalId]/lifecycle
(portal)/p/[slug]/proposals/[proposalId]/lifecycle/[phaseId]
(portal)/p/[slug]/proposals/[proposalId]/change-orders
(portal)/p/[slug]/proposals/[proposalId]/change-orders/new
(portal)/p/[slug]/proposals/[proposalId]/change-orders/[coId]
(portal)/p/[slug]/proposals/[proposalId]/revisions
(portal)/p/[slug]/proposals/[proposalId]/revisions/new
(portal)/p/[slug]/proposals/[proposalId]/revisions/[revisionId]
(portal)/p/[slug]/proposals/[proposalId]/approvals
(portal)/p/[slug]/proposals/[proposalId]/approvals/[approvalId]
(portal)/p/[slug]/proposals/[proposalId]/files
(portal)/p/[slug]/proposals/[proposalId]/activity
```

## 7. Capability matrix (optional)

If you want to gate write actions per-role at the app layer (in addition to RLS),
add the following capabilities to `src/lib/auth.ts`:

| Capability                       | owner | admin | controller | project_manager | client | guest |
|----------------------------------|:-----:|:-----:|:----------:|:---------------:|:------:|:-----:|
| `proposals:phase:gate:check`     |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:change_order:create`  |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:change_order:sign`    |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:revision:open`        |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:revision:resolve`     |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:approval:sign`        |   ✓   |   ✓   |     ✓      |                 |   ✓    |       |
| `proposals:file:upload`          |   ✓   |   ✓   |     ✓      |        ✓        |   ✓    |       |
| `proposals:file:delete`          |   ✓   |   ✓   |     ✓      |                 |        |       |

Then wrap each server action with `await assertCapability(session, "proposals:…")`
before the write.

## 8. Test it

Sign in as a member of the Cornbread org and navigate to:

```
/p/cornbread-abbey/proposals/<proposal-id>
```

You should see the dashboard with eight phases, the lifecycle progress meter, and
empty change-order / revision / approval queues.

## What's deliberately out of scope

- **Email notifications** — the migration adds a `proposal_change_orders_notify`
  trigger that writes to the existing `notifications` table; surfacing those into
  email digests uses the existing `webhook_endpoints` plumbing in migration #27.
- **PDF export of change orders** — flyingbluewhale already has `src/lib/pdf/proposal.tsx`.
  Reuse the same library when you wire CO PDF download.
- **Stripe payment on signed CO** — when a CO crosses to `client_approved`, a
  follow-up trigger or app-side hook can create the corresponding `invoices` row.
- **Webhook outbox** — kind `proposal.change_order.signed`, `proposal.gate.complete`,
  etc. should be added to `webhook_endpoints.events` allowlist for delivery.
