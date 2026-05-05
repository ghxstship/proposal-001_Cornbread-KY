import { ProposalSubNav } from "@/components/proposals/ProposalSubNav";
import { resolveSlugContext } from "@/lib/portal/slug";
import { getDashboardData } from "@/lib/proposals/portal/queries";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string; proposalId: string }>;
};

export default async function ProposalPortalLayout({ children, params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();

  const data = await getDashboardData(ctx.orgId, proposalId);
  if (!data) notFound();

  const base = `/p/${slug}/proposals/${proposalId}`;

  return (
    <div className="page-shell-content flex flex-col gap-6">
      <header className="surface-raised flex flex-col gap-3 rounded-lg p-6">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <div className="eyebrow">Proposal</div>
            <h1 className="text-2xl font-semibold leading-tight">{data.proposal.title}</h1>
          </div>
          <div className="text-right">
            <div className="eyebrow">Status</div>
            <div className="text-sm font-medium uppercase tracking-wide">{data.proposal.status}</div>
          </div>
        </div>
        <ProposalSubNav base={base} />
      </header>
      {children}
    </div>
  );
}
