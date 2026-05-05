import { notFound } from "next/navigation";
import { FormShell } from "@/components/FormShell";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { resolveSlugContext } from "@/lib/portal/slug";
import { createChangeOrderAction } from "../actions";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function NewChangeOrderPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();

  async function action(_prev: unknown, fd: FormData) {
    "use server";
    return await createChangeOrderAction(ctx!.orgId, proposalId, slug, fd);
  }

  return (
    <section className="flex flex-col gap-4 max-w-2xl">
      <header>
        <h2 className="text-lg font-semibold">Request a change order</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Drop the details below. We'll respond with a written quote and a signature line.
        </p>
      </header>
      <FormShell action={action} submitLabel="Submit Change Order" cancelHref={`/p/${slug}/proposals/${proposalId}/change-orders`}>
        <FormField label="Title" htmlFor="title">
          <Input id="title" name="title" required placeholder="e.g. Add evening tech for May 22" />
        </FormField>
        <FormField label="Reason" htmlFor="reason">
          <Input id="reason" name="reason" placeholder="Why this change?" />
        </FormField>
        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            className="w-full min-h-[120px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-sm"
          />
        </FormField>
        <FormField label="Estimated Cost Delta (USD)" htmlFor="delta">
          <Input id="delta" name="delta" type="number" step="0.01" placeholder="385.00" />
        </FormField>
        <FormField label="Schedule Delta (days)" htmlFor="schedule_delta">
          <Input id="schedule_delta" name="schedule_delta" type="number" defaultValue={0} />
        </FormField>
      </FormShell>
    </section>
  );
}
