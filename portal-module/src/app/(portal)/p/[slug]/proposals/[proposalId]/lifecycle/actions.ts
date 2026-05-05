"use server";

import { revalidatePath } from "next/cache";
import { withAuth } from "@/lib/auth";
import { setGateItemComplete } from "@/lib/proposals/portal/mutations";

export async function toggleGateItemAction(args: {
  orgId: string;
  proposalId: string;
  gateItemId: string;
  complete: boolean;
}) {
  const session = await withAuth();
  await setGateItemComplete({
    orgId: args.orgId,
    proposalId: args.proposalId,
    gateItemId: args.gateItemId,
    userId: session.userId,
    userLabel: session.user?.name ?? session.user?.email ?? null,
    complete: args.complete,
  });
  revalidatePath(`/p/[slug]/proposals/[proposalId]/lifecycle/[phaseId]`, "page");
  revalidatePath(`/p/[slug]/proposals/[proposalId]/lifecycle`, "page");
  revalidatePath(`/p/[slug]/proposals/[proposalId]`, "page");
}
