"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#scope", label: "Engagement" },
  { href: "#timeline", label: "Timeline" },
  { href: "#phases", label: "Lifecycle" },
  { href: "#investment", label: "Investment" },
  { href: "#calendar", label: "2026 Calendar" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-rule px-5 md:px-10 transition-all duration-300 ${
        scrolled
          ? "py-2 md:py-3 bg-paper/90 backdrop-blur-md"
          : "py-4 md:py-5 bg-paper"
      }`}
    >
      <a href="#top" className="flex items-center gap-3 no-underline">
        <Image
          src="/logos/wordmark-orange.png"
          alt="Cornbread Hemp"
          width={140}
          height={36}
          priority
          className="h-8 w-auto md:h-9"
        />
        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.25em] text-muted border-l border-rule pl-3">
          × AGV MIAMI
        </span>
      </a>

      <div className="flex items-center gap-3 md:gap-6">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.2em] text-ink hover:text-orange-dark transition-colors"
          >
            {l.label}
          </a>
        ))}
        <span className="hidden lg:inline border-l border-rule pl-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          ABR / May 21 — 25, 2026
        </span>
        <a
          href="#next-steps"
          className="bg-cedar text-mist px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-orange transition-colors rounded-sm"
        >
          Approve
        </a>
      </div>
    </nav>
  );
}
