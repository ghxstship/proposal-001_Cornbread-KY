import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ActivityFeed } from "@/components/proposals/ActivityFeed";
import { ApprovalCard } from "@/components/proposals/ApprovalCard";
import { ChangeOrderCard } from "@/components/proposals/ChangeOrderCard";
import { PhaseTracker } from "@/components/proposals/PhaseTracker";
import { ProposalSummaryCards } from "@/components/proposals/ProposalSummaryCards";
import { RevisionRoundCard } from "@/components/proposals/RevisionRoundCard";
import { resolveSlugContext } from "@/lib/portal/slug";
import { getDashboardData } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string; proposalId: string }>;
};

export default async function ProposalDashboardPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const data = await getDashboardData(ctx.orgId, proposalId);
  if (!data) notFound();

  const base = `/p/${slug}/proposals/${proposalId}`;

  return (
    <div className="flex flex-col gap-6">
      <ProposalSummaryCards data={data} />

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Production Lifecycle</h2>
            <Link href={`${base}/lifecycle`} className="text-sm text-[var(--color-accent)] hover:underline">
              See all phases →
            </Link>
          </header>
          <PhaseTracker phases={data.phases.slice(0, 4)} base={`${base}/lifecycle`} />
        </div>

        <div className="flex flex-col gap-6">
          <Section
            title="Pending Approvals"
            href={`${base}/approvals`}
            empty="Nothing waiting."
            count={data.pending_approvals.length}
          >
            {data.pending_approvals.slice(0, 3).map((a) => (
              <ApprovalCard key={a.id} approval={a} href={`${base}/approvals/${a.id}`} />
            ))}
          </Section>

          <Section
            title="Open Change Orders"
            href={`${base}/change-orders`}
            empty="No open change orders."
            count={data.open_change_orders.length}
          >
            {data.open_change_orders.slice(0, 3).map((co) => (
              <ChangeOrderCard
                key={co.id}
                changeOrder={co}
                href={`${base}/change-orders/${co.id}`}
              />
            ))}
          </Section>

          <Section
            title="Open Revisions"
            href={`${base}/revisions`}
            empty="No revision rounds in flight."
            count={data.open_revisions.length}
          >
            {data.open_revisions.slice(0, 3).map((r) => (
              <RevisionRoundCard key={r.id} revision={r} href={`${base}/revisions/${r.id}`} />
            ))}
          </Section>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <Link href={`${base}/activity`} className="text-sm text-[var(--color-accent)] hover:underline">
            Full log →
          </Link>
        </header>
        <ActivityFeed items={data.recent_activity} />
      </section>
    </div>
  );
}

function Section({
  title,
  href,
  empty,
  count,
  children,
}: {
  title: string;
  href: string;
  empty: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-fg-muted)]">
          {title}
        </h3>
        <Link href={href} className="text-xs text-[var(--color-accent)] hover:underline">
          View all
        </Link>
      </header>
      {count === 0 ? (
        <div className="surface-inset rounded-lg p-4 text-sm text-[var(--color-fg-muted)]">
          {empty}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{children}</div>
      )}
    </div>
  );
}
