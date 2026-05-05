"use client";

import { FormShell, type FormState } from "@/components/FormShell";
import { Input } from "@/components/ui/Input";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";

type Props = {
  signAction: (prev: FormState, fd: FormData) => Promise<FormState>;
  rejectAction: (prev: FormState, fd: FormData) => Promise<FormState>;
  alreadySigned?: boolean;
  signedName?: string | null;
  signedAt?: string | null;
};

export function ChangeOrderSignBlock({
  signAction,
  rejectAction,
  alreadySigned,
  signedName,
  signedAt,
}: Props) {
  if (alreadySigned) {
    return (
      <Alert tone="success" title="Signed">
        Approved by {signedName || "the client"}
        {signedAt ? ` on ${new Date(signedAt).toLocaleString()}` : ""}.
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FormShell action={signAction} submitLabel="Approve & Sign" className="surface-raised space-y-4 p-6">
        <h3 className="text-base font-semibold">Approve this change order</h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Typing your full name and email below constitutes electronic acceptance under the master
          services agreement (S18 — Change Orders).
        </p>
        <FormField label="Full Name" htmlFor="signed_name">
          <Input id="signed_name" name="signed_name" required />
        </FormField>
        <FormField label="Email" htmlFor="signed_email">
          <Input id="signed_email" name="signed_email" type="email" required />
        </FormField>
      </FormShell>

      <FormShell action={rejectAction} submitLabel="Reject" className="surface-raised space-y-4 p-6">
        <h3 className="text-base font-semibold">Reject or counter</h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          Send a brief reason. We'll come back with a counter or close it out — your call.
        </p>
        <FormField label="Reason" htmlFor="reason">
          <Input id="reason" name="reason" required />
        </FormField>
      </FormShell>
    </div>
  );
}
