import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { ActivityKind } from "./types";

type LogActivityArgs = {
  orgId: string;
  proposalId: string;
  actorId?: string | null;
  actorLabel?: string | null;
  kind: ActivityKind;
  refId?: string | null;
  payload?: Record<string, unknown>;
};

/**
 * Append an entry to proposal_activity. Append-only — no updates allowed
 * by RLS. Failures here are logged but do not throw, so a transient failure
 * never breaks the user-facing action.
 */
export async function logActivity(args: LogActivityArgs): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("proposal_activity").insert({
    org_id: args.orgId,
    proposal_id: args.proposalId,
    actor_id: args.actorId ?? null,
    actor_label: args.actorLabel ?? null,
    kind: args.kind,
    ref_id: args.refId ?? null,
    payload: args.payload ?? {},
  });
  if (error) {
    console.warn("[proposals/portal] activity log failed", error.message);
  }
}
