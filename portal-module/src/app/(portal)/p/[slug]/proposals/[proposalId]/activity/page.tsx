import { notFound } from "next/navigation";
import { ActivityFeed } from "@/components/proposals/ActivityFeed";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listActivity } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function ActivityPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const items = await listActivity(ctx.orgId, proposalId, 200);
  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-semibold">Activity</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          The full audit trail. Append-only — every gate check, signature, comment, and upload lands here.
        </p>
      </header>
      <ActivityFeed items={items} />
    </section>
  );
}
