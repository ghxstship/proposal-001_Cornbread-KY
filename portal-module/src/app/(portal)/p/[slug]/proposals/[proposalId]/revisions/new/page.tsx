import { notFound } from "next/navigation";
import { FormShell } from "@/components/FormShell";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { resolveSlugContext } from "@/lib/portal/slug";
import { openRevisionAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function NewRevisionPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();

  async function action(_prev: unknown, fd: FormData) {
    "use server";
    return await openRevisionAction(ctx!.orgId, proposalId, slug, fd);
  }

  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <header>
        <h2 className="text-lg font-semibold">Open a revision round</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Upload a proof or paste a link. Once opened, both sides can pin comments to specific
          regions of the asset.
        </p>
      </header>
      <FormShell
        action={action}
        submitLabel="Open Round"
        cancelHref={`/p/${slug}/proposals/${proposalId}/revisions`}
      >
        <FormField label="Title" htmlFor="title">
          <Input id="title" name="title" required placeholder="e.g. Greenery palette V1" />
        </FormField>
        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            className="w-full min-h-[120px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-sm"
            placeholder="What's in scope for this round? What feedback are you asking for?"
          />
        </FormField>
        <FormField label="Asset Kind" htmlFor="asset_kind">
          <Select id="asset_kind" name="asset_kind" defaultValue="image">
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="link">Link only</option>
            <option value="file">File</option>
          </Select>
        </FormField>
        <FormField label="Asset URL" htmlFor="asset_url">
          <Input id="asset_url" name="asset_url" placeholder="https://..." />
        </FormField>
      </FormShell>
    </section>
  );
}
