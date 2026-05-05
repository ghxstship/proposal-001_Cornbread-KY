import Link from "next/link";
import { notFound } from "next/navigation";
import { PhaseGateChecklist } from "@/components/proposals/PhaseGateChecklist";
import { PhaseLineItems } from "@/components/proposals/PhaseLineItems";
import { PhaseStatusChip } from "@/components/proposals/PhaseStatusChip";
import { resolveSlugContext } from "@/lib/portal/slug";
import {
  formatCents,
  phaseProgress,
  phaseSubtotalCents,
} from "@/lib/proposals/portal/lifecycle";
import { getPhase } from "@/lib/proposals/portal/queries";
import { toggleGateItemAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; proposalId: string; phaseId: string }>;
};

export default async function PhaseDetailPage({ params }: Props) {
  const { slug, proposalId, phaseId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const phase = await getPhase(ctx.orgId, phaseId);
  if (!phase || phase.proposal_id !== proposalId) notFound();

  const base = `/p/${slug}/proposals/${proposalId}/lifecycle`;
  const subtotal = phaseSubtotalCents(phase);
  const progress = phaseProgress(phase);
  const subtotalDisplay =
    phase.pricing === "complimentary"
      ? "Complimentary"
      : subtotal === 0
        ? "Included"
        : formatCents(subtotal);

  async function toggle(gateItemId: string, complete: boolean) {
    "use server";
    await toggleGateItemAction({
      orgId: ctx!.orgId,
      proposalId,
      gateItemId,
      complete,
    });
  }

  return (
    <article className="flex flex-col gap-6">
      <Link href={base} className="text-sm text-[var(--color-accent)] hover:underline">
        ← Lifecycle
      </Link>

      <header className="surface-raised flex flex-col gap-3 rounded-lg p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono text-sm text-[var(--color-fg-muted)]">Phase {phase.num}</div>
            <h2 className="text-2xl font-semibold leading-tight">{phase.name}</h2>
            {phase.tag ? (
              <p className="text-sm text-[var(--color-fg-muted)] mt-1">{phase.tag}</p>
            ) : null}
            <div className="mt-2">
              <PhaseStatusChip state={phase.state} />
            </div>
          </div>
          <div className="text-right">
            <div className="eyebrow">Subtotal</div>
            <div className="text-2xl font-semibold tabular-nums">{subtotalDisplay}</div>
            {phase.gate_items.length > 0 ? (
              <div className="text-xs text-[var(--color-fg-muted)] mt-1 tabular-nums">
                {progress.completed} / {progress.total} gate items
              </div>
            ) : null}
          </div>
        </div>
        {phase.narrative ? (
          <p className="text-sm leading-relaxed">{phase.narrative}</p>
        ) : null}
      </header>

      <section>
        <h3 className="eyebrow mb-2">Line Items</h3>
        <PhaseLineItems items={phase.line_items} />
      </section>

      {phase.gate_items.length > 0 ? (
        <section className="surface-raised rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold">Milestone Gate</h3>
            <span className="text-xs text-[var(--color-fg-muted)] tabular-nums">
              {progress.completed} / {progress.total} complete
            </span>
          </div>
          <PhaseGateChecklist items={phase.gate_items} toggleAction={toggle} />
          {phase.unlocks_label ? (
            <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)] text-xs uppercase tracking-wide text-[var(--color-accent)]">
              → Unlocks: {phase.unlocks_label}
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}
