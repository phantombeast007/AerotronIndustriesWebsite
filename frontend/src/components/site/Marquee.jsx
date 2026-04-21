import React from "react";
import { MARQUEE } from "../../lib/data";

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section
      data-testid="stats-marquee"
      className="bg-slate-950 text-white border-y border-slate-800 overflow-hidden"
    >
      <div className="flex whitespace-nowrap marquee-track py-5">
        {items.map((m, i) => (
          <div
            key={i}
            className="flex items-center gap-10 px-10 font-mono text-xs sm:text-sm tracking-[0.2em]"
          >
            <span className="text-[color:var(--brand)]">+</span>
            <span>{m}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
