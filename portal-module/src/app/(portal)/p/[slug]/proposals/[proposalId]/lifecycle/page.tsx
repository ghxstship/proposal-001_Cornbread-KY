import { notFound } from "next/navigation";
import { PhaseTracker } from "@/components/proposals/PhaseTracker";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listPhases } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; proposalId: string }>;
};

export default async function LifecyclePage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const phases = await listPhases(ctx.orgId, proposalId);
  const base = `/p/${slug}/proposals/${proposalId}/lifecycle`;

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-semibold">Production Lifecycle</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Eight phases. One invoice. Click any phase to see line items and the milestone gate.
        </p>
      </header>
      <PhaseTracker phases={phases} base={base} />
    </section>
  );
}
