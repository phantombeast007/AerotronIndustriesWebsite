import React from "react";
import { BRAND, CONTACT } from "../../lib/data";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-slate-950 text-white relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 pt-20 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 border-b border-slate-800 pb-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={BRAND.logo} alt="Aerotron" className="h-12 w-12 rounded-sm" />
              <div>
                <div className="font-display text-xl">AEROTRON INDUSTRIES</div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-slate-400">
                  PRECISION TOOLROOM · BENGALURU
                </div>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Die-casting moulds, plastic injection tools, jigs, fixtures, PCBA tooling and NPD —
              engineered for mission-critical production.
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--brand)] mb-4">
              // Office
            </div>
            {CONTACT.office.lines.map((l, i) => (
              <div key={i} className="text-sm text-slate-300">
                {l}
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color:var(--brand)] mb-4">
              // Factory
            </div>
            {CONTACT.factory.lines.map((l, i) => (
              <div key={i} className="text-sm text-slate-300">
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-8 border-b border-slate-800">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
              Phone
            </div>
            {CONTACT.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, "")}`}
                className="block text-slate-200 hover:text-[color:var(--brand)]"
              >
                {p}
              </a>
            ))}
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
              Email
            </div>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-slate-200 hover:text-[color:var(--brand)] break-all"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
              Certifications
            </div>
            <div className="text-slate-200">ISO 9001:2015 Certified</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500">
          <div>© {new Date().getFullYear()} Aerotron Industries · All rights reserved</div>
          <div>Designed & engineered in Bengaluru, India</div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none select-none mt-14 -mb-8 font-display text-[22vw] leading-none text-slate-900/80 tracking-tighter text-center"
        >
          AEROTRON
        </div>
      </div>
    </footer>
  );
}
