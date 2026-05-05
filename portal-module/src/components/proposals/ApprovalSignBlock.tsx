"use client";

import { FormShell, type FormState } from "@/components/FormShell";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

type Props = {
  signAction: (prev: FormState, fd: FormData) => Promise<FormState>;
  rejectAction: (prev: FormState, fd: FormData) => Promise<FormState>;
  state: "pending" | "approved" | "rejected" | "cancelled";
  signedName?: string | null;
  signedAt?: string | null;
  rejectionReason?: string | null;
};

export function ApprovalSignBlock({
  signAction,
  rejectAction,
  state,
  signedName,
  signedAt,
  rejectionReason,
}: Props) {
  if (state === "approved") {
    return (
      <Alert tone="success" title="Approved">
        Signed by {signedName || "the client"}
        {signedAt ? ` on ${new Date(signedAt).toLocaleString()}` : ""}.
      </Alert>
    );
  }
  if (state === "rejected") {
    return (
      <Alert tone="danger" title="Rejected">
        {rejectionReason || "No reason recorded."}
      </Alert>
    );
  }
  if (state === "cancelled") {
    return <Alert tone="neutral" title="Cancelled">This approval was cancelled and no longer needs sign-off.</Alert>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormShell action={signAction} submitLabel="Approve & Sign" className="surface-raised space-y-4 p-6">
        <h3 className="text-base font-semibold">Approve</h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Typing your full name and email below constitutes electronic acceptance.
        </p>
        <FormField label="Full Name" htmlFor="signed_name">
          <Input id="signed_name" name="signed_name" required />
        </FormField>
        <FormField label="Email" htmlFor="signed_email">
          <Input id="signed_email" name="signed_email" type="email" required />
        </FormField>
      </FormShell>

      <FormShell action={rejectAction} submitLabel="Reject" className="surface-raised space-y-4 p-6">
        <h3 className="text-base font-semibold">Reject</h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Send a short reason. We'll regroup and come back with a revised request.
        </p>
        <FormField label="Reason" htmlFor="reason">
          <Input id="reason" name="reason" required />
        </FormField>
      </FormShell>
    </div>
  );
}
