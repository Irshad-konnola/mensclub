import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function SiteLayout({ children, hideFab = false }: { children: ReactNode; hideFab?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {!hideFab && <WhatsAppFab />}
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="relative bg-paper text-ink overflow-hidden border-b border-ink/10">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
        background: "radial-gradient(60% 60% at 50% 30%, oklch(0.96 0.03 38 / 0.5), transparent 70%)"
      }} />
      <div className="container-x relative py-24 md:py-36">
        {eyebrow && (
          <div className="font-label text-accent-rust text-[11px] tracking-[0.25em] uppercase mb-5">{eyebrow}</div>
        )}
        <h1 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl tracking-tight">
          {title.split(/(\s+)/).map((part, i) => {
            // italicize the last word for editorial accent
            const words = title.trim().split(/\s+/);
            const lastWord = words[words.length - 1];
            if (part.trim() === lastWord && i === title.split(/(\s+)/).length - 1) {
              return <span key={i} className="font-italic-serif text-accent-rust">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          })}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl text-ink/65 text-lg leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export function Placeholder({ label, className = "aspect-[3/4]" }: { label: string; className?: string }) {
  return (
    <div className={`relative ${className} bg-stone overflow-hidden group`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-60 transition">
        <span className="font-label text-ink/70 text-xs tracking-[0.3em] uppercase">{label}</span>
      </div>
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #000 0 1px, transparent 1px 12px)"
      }} />
    </div>
  );
}
