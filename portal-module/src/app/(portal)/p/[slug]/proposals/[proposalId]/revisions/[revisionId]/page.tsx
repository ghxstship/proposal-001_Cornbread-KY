import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RevisionCommentThread } from "@/components/proposals/RevisionCommentThread";
import { RevisionMarkup } from "@/components/proposals/RevisionMarkup";
import { resolveSlugContext } from "@/lib/portal/slug";
import { getRevision, listRevisionComments } from "@/lib/proposals/portal/queries";
import { addRevisionCommentAction, resolveRevisionAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string; revisionId: string }> };

export default async function RevisionDetailPage({ params }: Props) {
  const { slug, proposalId, revisionId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const [revision, comments] = await Promise.all([
    getRevision(ctx.orgId, revisionId),
    listRevisionComments(ctx.orgId, revisionId),
  ]);
  if (!revision || revision.proposal_id !== proposalId) notFound();

  async function addComment(body: string, anchor: { x: number; y: number } | null) {
    "use server";
    await addRevisionCommentAction(ctx!.orgId, proposalId, revisionId, slug, body, anchor);
  }
  async function approve() {
    "use server";
    await resolveRevisionAction(ctx!.orgId, proposalId, revisionId, slug, "approved");
  }
  async function requestChanges() {
    "use server";
    await resolveRevisionAction(ctx!.orgId, proposalId, revisionId, slug, "changes_requested");
  }

  return (
    <article className="flex flex-col gap-6">
      <Link
        href={`/p/${slug}/proposals/${proposalId}/revisions`}
        className="text-sm text-[var(--color-accent)] hover:underline"
      >
        ← Revisions
      </Link>
      <header className="surface-raised rounded-lg p-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-mono text-sm text-[var(--color-fg-muted)]">
            R{String(revision.number).padStart(2, "0")}
          </span>
          <Badge tone="info">{revision.state.replace("_", " ")}</Badge>
        </div>
        <h2 className="text-xl font-semibold">{revision.title}</h2>
        {revision.description ? (
          <p className="text-sm mt-2">{revision.description}</p>
        ) : null}
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {revision.asset_kind === "image" && revision.asset_url ? (
            <RevisionMarkup
              imageUrl={revision.asset_url}
              comments={comments}
              addCommentAction={addComment}
            />
          ) : revision.asset_url ? (
            <div className="surface-inset rounded-lg p-6">
              <p className="text-sm text-[var(--color-fg-muted)] mb-3">
                External {revision.asset_kind} asset:
              </p>
              <a
                href={revision.asset_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-accent)] hover:underline break-all"
              >
                {revision.asset_url}
              </a>
            </div>
          ) : (
            <div className="surface-inset rounded-lg p-6 text-sm text-[var(--color-fg-muted)]">
              No asset attached.
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          <div className="surface-raised rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">Comments</h3>
            <RevisionCommentThread comments={comments} />
          </div>
          {revision.state !== "approved" && revision.state !== "cancelled" ? (
            <div className="surface-raised flex flex-col gap-2 rounded-lg p-4">
              <h3 className="text-sm font-semibold">Resolve this round</h3>
              <form action={approve}>
                <Button type="submit" className="w-full">Approve</Button>
              </form>
              <form action={requestChanges}>
                <Button type="submit" variant="secondary" className="w-full">
                  Request Changes
                </Button>
              </form>
            </div>
          ) : null}
        </aside>
      </section>
    </article>
  );
}
