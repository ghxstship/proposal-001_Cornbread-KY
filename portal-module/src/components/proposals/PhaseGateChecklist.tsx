"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import type { ProposalPhaseGateItem } from "@/lib/proposals/portal/types";

type Props = {
  items: ProposalPhaseGateItem[];
  toggleAction: (gateItemId: string, complete: boolean) => Promise<void>;
};

export function PhaseGateChecklist({ items, toggleAction }: Props) {
  const [pending, start] = useTransition();
  return (
    <ul className="flex flex-col divide-y divide-[var(--color-border-subtle)]">
      {items.map((g) => {
        const checked = !!g.completed_at;
        return (
          <li key={g.id} className="flex items-start gap-3 py-3">
            <Checkbox
              checked={checked}
              disabled={pending}
              onCheckedChange={(v) =>
                start(async () => {
                  await toggleAction(g.id, !!v);
                })
              }
              aria-label={g.label}
            />
            <div className="flex-1">
              <div className={`text-sm ${checked ? "line-through text-[var(--color-fg-muted)]" : ""}`}>
                {g.label}
              </div>
              {checked && g.completed_at ? (
                <div className="text-xs text-[var(--color-fg-muted)] mt-0.5">
                  Checked {new Date(g.completed_at).toLocaleString()}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
