import React from "react";
import { motion } from "framer-motion";
import { PRODUCT_CATEGORIES } from "../../lib/data";

export default function Products() {
  return (
    <section id="products" data-testid="products-section" className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
              // 02 · Products & Tooling
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] text-slate-950 max-w-2xl">
              Parts shipped. Programs launched.
            </h2>
          </div>
          <p className="text-slate-600 max-w-sm">
            A snapshot from our floor — plastic enclosures, die-cast parts, production moulds and
            EMS tooling built for high-mix, high-stakes programs.
          </p>
        </div>

        <div className="space-y-20">
          {PRODUCT_CATEGORIES.map((cat, ci) => (
            <Category key={cat.id} cat={cat} index={ci} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Category({ cat, index }) {
  return (
    <div data-testid={`product-category-${cat.id}`}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 pb-4 border-b border-slate-300">
        <div>
          <div className="font-mono text-[11px] tracking-[0.25em] text-[color:var(--brand)] mb-2">
            / CATEGORY {cat.code} · {cat.tag}
          </div>
          <h3 className="font-display text-3xl md:text-4xl text-slate-950">{cat.title}</h3>
        </div>
        <p className="text-sm text-slate-600 max-w-md md:text-right">{cat.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 auto-rows-[14rem] sm:auto-rows-[14rem] lg:auto-rows-[15rem]">
        {cat.items.map((p, i) => (
          <motion.figure
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`relative group bg-white border border-slate-900 overflow-hidden ${p.span || ""}`}
            data-testid={`product-${cat.id}-${i}`}
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--brand)] mb-1">
                {p.tag}
              </div>
              <div className="font-display text-base md:text-lg text-white leading-tight">
                {p.name}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
