import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Plane,
  Zap,
  Radio,
  BatteryCharging,
  Shield,
} from "lucide-react";
import { INDUSTRIES } from "../../lib/data";

const ICONS = {
  Automotive: Car,
  Aerospace: Plane,
  "Power Grid": Zap,
  Telecom: Radio,
  "EV Mobility": BatteryCharging,
  Defense: Shield,
};

export default function Industries() {
  return (
    <section
      id="industries"
      data-testid="industries-section"
      className="py-24 md:py-32 bg-slate-950 text-white bg-blueprint-dark"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
              // 03 · Industries Served
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1]">
              Six sectors.
              <br />
              One standard.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-slate-400 leading-relaxed">
              Our tools land in places where failure isn’t an option — substations, cockpits,
              telematics stacks, EV battery packs and defense electronics.
            </p>
          </div>
        </div>

        <div className="border border-slate-800 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ICONS[ind.name] || Zap;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group border-slate-800 border-b md:[&:nth-last-child(-n+3)]:border-b lg:[&:nth-last-child(-n+6)]:border-b-0 border-r [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(6n)]:border-r-0 p-6 md:p-8 hover:bg-slate-900 transition-colors"
                data-testid={`industry-${ind.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <Icon
                    size={28}
                    className="text-slate-400 group-hover:text-[color:var(--brand)] transition-colors"
                    strokeWidth={1.25}
                  />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                    / {ind.code}
                  </span>
                </div>
                <div className="font-display text-xl">{ind.name}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
