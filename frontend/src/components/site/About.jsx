import React from "react";
import { motion } from "framer-motion";
import { STATS } from "../../lib/data";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="border border-slate-900 overflow-hidden relative">
            <img
              src="https://images.pexels.com/photos/10406128/pexels-photo-10406128.jpeg"
              alt="CNC milling machine working on metal"
              className="w-full h-full object-cover aspect-[4/5]"
            />
            <div className="absolute top-4 left-4 bg-white px-2 py-1 font-mono text-[10px] tracking-[0.2em]">
              FIG.02 · FLOOR
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-8 order-1 lg:order-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
            // 04 · About Aerotron
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] text-slate-950 mb-8">
            Two decades of
            <br />
            tools that refuse to fail.
          </h2>
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              Aerotron Industries was built on a simple premise: a mould, a fixture, a tool is only
              as valuable as the consistency of every part it produces for the next ten years. That
              belief has shaped every program we’ve taken on for over 20 years.
            </p>
            <p>
              From our Bengaluru toolroom and adjacent production floor, we deliver die-casting
              moulds, plastic injection tools, jigs, fixtures, PCBA/EMS tooling and NPD
              engineering — plus end-to-end production of plastic and aluminium parts for
              mission-critical applications.
            </p>
          </div>

          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 border border-slate-200"
            data-testid="about-stats"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 border-slate-200 border-r last:border-r-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
              >
                <div className="font-mono text-5xl text-slate-950 font-bold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
