"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/collections", label: "Collections" },
  { to: "/branches", label: "Branches" },
  { to: "/contact", label: "Contact" },
] as const;

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md text-ink border-b border-ink/10">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-baseline gap-2 text-ink" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-tight">MensClub</span>
          <span className="font-italic-serif text-sm text-accent-rust hidden sm:inline">est. 2001</span>
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {links.map(l => (
            <Link
              key={l.to}
              href={l.to}
              className={cn(
                "font-label text-[11px] tracking-[0.2em] uppercase transition hover:text-ink",
                isActive(pathname, l.to) ? "text-ink" : "text-ink/60"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="https://wa.me/919895978299"
            target="_blank"
            rel="noopener"
            className="bg-ink text-paper px-5 py-2.5 font-label text-[11px] tracking-[0.18em] uppercase transition hover:bg-accent-rust"
          >
            WhatsApp Us
          </a>
        </div>
        <button
          className="md:hidden text-ink"
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-paper border-t border-ink/10">
          <nav className="container-x flex flex-col py-6 gap-5">
            {links.map(l => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-label text-sm tracking-[0.2em] uppercase",
                  isActive(pathname, l.to) ? "text-accent-rust" : "text-ink/70"
                )}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919895978299"
              target="_blank"
              rel="noopener"
              className="mt-2 bg-ink text-paper px-5 py-3 font-label text-xs tracking-[0.18em] uppercase text-center"
            >
              WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
