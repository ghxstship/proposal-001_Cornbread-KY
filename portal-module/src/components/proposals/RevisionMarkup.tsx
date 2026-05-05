"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ProposalRevisionAnchor, ProposalRevisionComment } from "@/lib/proposals/portal/types";

type Props = {
  imageUrl: string;
  comments: ProposalRevisionComment[];
  addCommentAction: (body: string, anchor: ProposalRevisionAnchor | null) => Promise<void>;
};

/**
 * Lightweight image markup. Click anywhere on the image to drop an anchor,
 * type a comment, hit submit. Existing anchored comments render as numbered
 * pins at their normalized x/y position.
 */
export function RevisionMarkup({ imageUrl, comments, addCommentAction }: Props) {
  const [pendingAnchor, setPendingAnchor] = useState<ProposalRevisionAnchor | null>(null);
  const [body, setBody] = useState("");
  const [isPending, start] = useTransition();

  const anchored = comments.filter((c) => c.anchor);

  function onImageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (isPending) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setPendingAnchor({ x: clamp(x), y: clamp(y) });
  }

  function submit() {
    if (!body.trim()) return;
    const anchor = pendingAnchor;
    start(async () => {
      await addCommentAction(body.trim(), anchor);
      setBody("");
      setPendingAnchor(null);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="surface-inset relative overflow-hidden rounded-lg border border-[var(--color-border)]"
        onClick={onImageClick}
        style={{ cursor: pendingAnchor ? "crosshair" : "crosshair" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="Revision asset" className="block w-full h-auto select-none" draggable={false} />

        {anchored.map((c, i) => (
          <Pin key={c.id} anchor={c.anchor!} index={i + 1} title={c.body} resolved={c.is_resolved} />
        ))}

        {pendingAnchor ? (
          <Pin anchor={pendingAnchor} index={anchored.length + 1} title="New comment" pending />
        ) : null}
      </div>

      <div className="surface-raised flex flex-col gap-3 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="eyebrow">
            {pendingAnchor ? `Pinned at ${pct(pendingAnchor.x)}, ${pct(pendingAnchor.y)}` : "No pin — general comment"}
          </span>
          {pendingAnchor ? (
            <Button variant="ghost" size="sm" onClick={() => setPendingAnchor(null)} disabled={isPending}>
              Clear pin
            </Button>
          ) : null}
        </div>
        <Input
          placeholder="Leave a comment, request a change, or tag a region…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--color-fg-muted)]">⌘ + Enter to submit</span>
          <Button onClick={submit} disabled={!body.trim() || isPending}>
            {isPending ? "Posting…" : "Post comment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Pin({
  anchor,
  index,
  title,
  resolved,
  pending,
}: {
  anchor: ProposalRevisionAnchor;
  index: number;
  title: string;
  resolved?: boolean;
  pending?: boolean;
}) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-accent)] text-white text-xs font-bold tabular-nums w-7 h-7 flex items-center justify-center shadow-lg pointer-events-none"
      style={{
        left: `${anchor.x * 100}%`,
        top: `${anchor.y * 100}%`,
        opacity: resolved ? 0.55 : 1,
        background: pending ? "var(--color-warning)" : undefined,
      }}
      title={title}
    >
      {index}
    </span>
  );
}

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}
function pct(v: number) {
  return `${Math.round(v * 100)}%`;
}
