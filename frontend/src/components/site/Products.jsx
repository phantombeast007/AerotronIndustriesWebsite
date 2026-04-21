import React from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "../../lib/data";

export default function Products() {
  return (
    <section id="products" data-testid="products-section" className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
              // 02 · Products
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] text-slate-950 max-w-2xl">
              Parts shipped. Programs launched.
            </h2>
          </div>
          <p className="text-slate-600 max-w-sm">
            A snapshot from our floor — AIS-140 enclosures, IP69 housings, aerospace die-cast,
            wave-solder fixtures and power-grid components.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-[18rem] lg:auto-rows-[16rem]">
          {PRODUCTS.map((p, i) => (
            <motion.figure
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative group bg-white border border-slate-900 overflow-hidden ${p.span || ""}`}
              data-testid={`product-card-${i}`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--brand)] mb-1">
                  {p.tag}
                </div>
                <div className="font-display text-lg text-white">{p.name}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
