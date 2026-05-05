import { notFound } from "next/navigation";
import { FileList } from "@/components/proposals/FileList";
import { FormShell } from "@/components/FormShell";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { Select } from "@/components/ui/Select";
import { resolveSlugContext } from "@/lib/portal/slug";
import { listFiles } from "@/lib/proposals/portal/queries";
import { uploadFileAction } from "./actions";
import { signedDownloadUrlAction } from "./actions";
import type { ProposalFile } from "@/lib/proposals/portal/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string; proposalId: string }> };

export default async function FilesPage({ params }: Props) {
  const { slug, proposalId } = await params;
  const ctx = await resolveSlugContext(slug);
  if (!ctx) notFound();
  const files = await listFiles(ctx.orgId, proposalId);

  async function upload(_prev: unknown, fd: FormData) {
    "use server";
    return await uploadFileAction(ctx!.orgId, proposalId, slug, fd);
  }

  // Build a static download URL helper that points to the signed-URL action
  const downloadUrlFor = (f: ProposalFile) =>
    `/api/v1/proposals/${proposalId}/files/${f.id}/download`;

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-lg font-semibold">Files</h2>
        <p className="text-sm text-[var(--color-fg-muted)]">
          SOWs, invoices, condition reports, proofs, deliverables. Stored securely in the
          <code className="mx-1">proposals</code> bucket.
        </p>
      </header>

      <FormShell action={upload} submitLabel="Upload" className="surface-raised space-y-4 p-6">
        <h3 className="text-base font-semibold">Upload a file</h3>
        <FormField label="Kind" htmlFor="kind">
          <Select id="kind" name="kind" defaultValue="misc">
            <option value="sow">SOW</option>
            <option value="invoice">Invoice</option>
            <option value="condition_report">Condition Report</option>
            <option value="proof">Proof</option>
            <option value="deliverable">Deliverable</option>
            <option value="inventory">Inventory</option>
            <option value="photograph">Photograph</option>
            <option value="misc">Other</option>
          </Select>
        </FormField>
        <FormField label="Name" htmlFor="name">
          <Input id="name" name="name" required />
        </FormField>
        <FormField label="Description" htmlFor="description">
          <Input id="description" name="description" />
        </FormField>
        <FormField label="File" htmlFor="file">
          <Input id="file" name="file" type="file" required />
        </FormField>
      </FormShell>

      <FileList files={files} downloadUrlFor={downloadUrlFor} />
    </section>
  );
}
