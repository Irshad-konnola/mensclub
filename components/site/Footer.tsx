import Link from "next/link";
import { Facebook, Instagram, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cream text-ink border-t border-ink/10">
      <div className="container-x py-16 md:py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-3xl tracking-tight">MensClub</div>
          <p className="font-italic-serif text-accent-rust text-base mt-1">since two thousand one</p>
          <p className="mt-5 text-sm text-ink/60 max-w-xs leading-relaxed">
            Where Malappuram has been dressing well for over two decades.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition"><Instagram size={16} /></a>
            {/* <a href="#" aria-label="Facebook" className="h-9 w-9 grid place-items-center border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition"><Facebook size={16} /></a> */}
            <a href="tel:+919895978299" aria-label="Call" className="h-9 w-9 grid place-items-center border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition"><Phone size={16} /></a>
          </div>
        </div>

        <div>
          <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Explore</div>
          <ul className="mt-4 space-y-3 text-sm text-ink/75">
            <li><Link href="/" className="hover:text-accent-rust">Home</Link></li>
            <li><Link href="/about" className="hover:text-accent-rust">About</Link></li>
            <li><Link href="/collections" className="hover:text-accent-rust">Collections</Link></li>
            <li><Link href="/branches" className="hover:text-accent-rust">Branches</Link></li>
            <li><Link href="/contact" className="hover:text-accent-rust">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Main Branch</div>
          <address className="mt-4 not-italic text-sm text-ink/75 leading-relaxed">
            MensClub<br />
            Down Hill<br />
            Malappuram, Kerala 676519<br />
            India
          </address>
          <a href="tel:+919895978299" className="mt-3 inline-block text-sm hover:text-accent-rust">+91 98959 78299</a>
        </div>

        <div>
          <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Other Branches</div>
          <ul className="mt-4 space-y-4 text-sm text-ink/75 leading-relaxed">
            <li>Perinthalmanna<br />Malappuram, Kerala 679322</li>
            <li>Kizhisseri<br />Malappuram, Kerala 673641</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink/55">
          <div>© {new Date().getFullYear()} MensClub Malappuram. All rights reserved.</div>
          <div className="font-label tracking-[0.22em] uppercase">Est. 2001 · Malappuram · Kerala</div>
        </div>
      </div>
    </footer>
  );
}
