import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND } from "../../lib/data";

const LINKS = [
  { href: "#capabilities", label: "Capabilities" },
  { href: "#products", label: "Products" },
  { href: "#industries", label: "Industries" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-xl bg-white/80 border-b border-slate-200" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="nav-logo">
          <img src={BRAND.logo} alt="Aerotron" className="h-10 w-10 rounded-sm object-cover" />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg tracking-tight">AEROTRON</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Industries
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-700 hover:text-[color:var(--brand)] transition-colors"
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-[color:var(--brand)] hover:bg-[color:var(--brand-hover)] text-white px-5 py-3 text-sm font-semibold transition-colors"
          data-testid="nav-cta-quote"
        >
          Get a Quote
          <span aria-hidden>→</span>
        </a>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-6 py-4 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-slate-800 py-2"
                data-testid={`nav-mobile-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-[color:var(--brand)] text-white px-5 py-3 text-sm font-semibold text-center"
              data-testid="nav-mobile-cta"
            >
              Get a Quote →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
