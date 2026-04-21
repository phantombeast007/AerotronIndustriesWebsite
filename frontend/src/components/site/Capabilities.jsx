import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CAPABILITIES } from "../../lib/data";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      data-testid="capabilities-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
              // 01 · Capabilities
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] text-slate-950">
              Tooling built like
              <br />
              flight hardware.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-slate-600 leading-relaxed max-w-lg">
              From first concept to production handover, every mould and fixture we release is
              validated against measurable tolerances, cycle life targets and part-level
              repeatability.
            </p>
          </div>
        </div>

        <div className="border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <motion.a
              key={c.code}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group border-slate-200 border-b md:border-b md:[&:nth-last-child(-n+2)]:border-b lg:[&:nth-last-child(-n+3)]:border-b md:border-r lg:[&:nth-child(3n)]:border-r-0 md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r md:last:border-b-0 p-8 md:p-10 hover:bg-slate-50 transition-colors cursor-pointer relative"
              data-testid={`capability-${c.code.toLowerCase()}`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400">
                  / {c.code}
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-slate-400 group-hover:text-[color:var(--brand)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
                />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-slate-950 mb-4">
                {c.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
