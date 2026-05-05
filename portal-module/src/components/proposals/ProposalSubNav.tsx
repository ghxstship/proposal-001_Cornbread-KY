"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  base: string;
};

const TABS = [
  { slug: "", label: "Overview" },
  { slug: "lifecycle", label: "Lifecycle" },
  { slug: "approvals", label: "Approvals" },
  { slug: "change-orders", label: "Change Orders" },
  { slug: "revisions", label: "Revisions" },
  { slug: "files", label: "Files" },
  { slug: "activity", label: "Activity" },
];

export function ProposalSubNav({ base }: Props) {
  const pathname = usePathname();
  return (
    <nav className="surface-inset flex items-center gap-1 overflow-x-auto rounded-lg p-1">
      {TABS.map((t) => {
        const href = t.slug ? `${base}/${t.slug}` : base;
        const active = t.slug
          ? pathname === href || pathname?.startsWith(`${href}/`)
          : pathname === base;
        return (
          <Link
            key={t.slug || "overview"}
            href={href}
            className={`nav-item whitespace-nowrap ${active ? "nav-item--active" : ""}`}
            data-active={active ? "true" : undefined}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
