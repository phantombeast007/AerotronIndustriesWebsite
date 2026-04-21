import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { PRODUCTS } from "../../lib/data";

export default function Hero() {
  const heroImg = PRODUCTS[0].image;
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-white bg-blueprint"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-6"
            data-testid="hero-eyebrow"
          >
            // Toolroom · Est. Bengaluru · 20+ Years
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] text-slate-950"
            data-testid="hero-title"
          >
            Precision that
            <br />
            <span className="text-[color:var(--brand)]">runs production.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-xl text-base md:text-lg text-slate-600 leading-relaxed"
            data-testid="hero-subtitle"
          >
            Aerotron Industries designs and builds die-casting moulds, plastic injection tools,
            jigs, fixtures and PCBA tooling for the world’s most demanding sectors — from aerospace
            to power grid infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[color:var(--brand)] hover:bg-[color:var(--brand-hover)] text-white px-7 py-4 text-sm font-semibold transition-colors"
              data-testid="hero-cta-quote"
            >
              Request a Quote <ArrowDownRight size={18} />
            </a>
            <a
              href="#capabilities"
              className="inline-flex items-center gap-3 border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-7 py-4 text-sm font-semibold transition-colors"
              data-testid="hero-cta-capabilities"
            >
              Explore Capabilities
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 relative"
          data-testid="hero-visual"
        >
          <div className="border border-slate-900 bg-slate-50 p-3 relative">
            <div className="absolute -top-3 left-4 bg-white px-2 font-mono text-[10px] tracking-[0.2em] text-slate-500">
              FIG.01 · HPDC PORTFOLIO
            </div>
            <img src={heroImg} alt="Aluminium die-cast parts" className="w-full h-auto" />
            <div className="absolute -bottom-3 right-4 bg-[color:var(--brand)] px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-white">
              SCALE 1:1
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
