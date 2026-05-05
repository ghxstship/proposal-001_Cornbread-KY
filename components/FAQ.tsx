"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 md:px-10 py-20 md:py-28 border-t border-rule bg-cedar text-mist">
      <div className="mb-12 md:mb-16">
        <div className="eyebrow mb-3 text-orange">Section / 07 — Questions We Hear</div>
        <h2 className="font-display text-[clamp(38px,6vw,80px)] leading-[0.95]">
          The things
          <br />
          <span className="text-orange">you were about to ask.</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-0 border-t border-mist/20">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-mist/20">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-5 py-6 md:py-7 text-left hover:text-orange transition-colors"
              >
                <span className="font-head font-semibold text-[18px] md:text-[22px] leading-snug">
                  {f.q}
                </span>
                <span
                  className="shrink-0 w-9 h-9 rounded-full border-2 border-orange flex items-center justify-center font-mono text-[16px] transition-transform"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "none",
                    background: isOpen ? "#C5883F" : "transparent",
                    color: isOpen ? "#FCF8F1" : "#C5883F",
                  }}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  isOpen ? "max-h-96 pb-6 md:pb-8" : "max-h-0"
                }`}
              >
                <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-mist/85 max-w-3xl pr-14">
                  {f.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
