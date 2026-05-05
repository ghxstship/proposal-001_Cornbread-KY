import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ChangeOrderCard } from "@/components/proposals/ChangeOrderCard";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listChangeOrders } from "@/lib/proposals/portal/queries";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function ChangeOrdersPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const orders = await listChangeOrders(ctx.orgId, proposalId);
  const base = `/p/${slug}/proposals/${proposalId}/change-orders`;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold">Change Orders</h2>
          <p className="text-sm text-[var(--color-fg-muted)]">
            Every scope change is logged here as a numbered, signable record.
          </p>
        </div>
        <Button asChild>
          <Link href={`${base}/new`}>Request a change</Link>
        </Button>
      </header>
      {orders.length === 0 ? (
        <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
          No change orders yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((co) => (
            <ChangeOrderCard key={co.id} changeOrder={co} href={`${base}/${co.id}`} />
          ))}
        </div>
      )}
    </section>
  );
}
