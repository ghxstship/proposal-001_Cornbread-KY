import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { RevisionRoundCard } from "@/components/proposals/RevisionRoundCard";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listRevisions } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function RevisionsPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const revisions = await listRevisions(ctx.orgId, proposalId);
  const base = `/p/${slug}/proposals/${proposalId}/revisions`;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold">Proofing & Revisions</h2>
          <p className="text-sm text-[var(--color-fg-muted)]">
            Markup proofs, leave anchored comments, approve when ready.
          </p>
        </div>
        <Button asChild>
          <Link href={`${base}/new`}>Open a revision round</Link>
        </Button>
      </header>
      {revisions.length === 0 ? (
        <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
          No revision rounds yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {revisions.map((r) => (
            <RevisionRoundCard key={r.id} revision={r} href={`${base}/${r.id}`} />
          ))}
        </div>
      )}
    </section>
  );
}
