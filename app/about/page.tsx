import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Award, Layers, HeartHandshake, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About MensClub — 25 Years of Menswear in Malappuram",
  description:
    "How MensClub became Malappuram's trusted name in men's clothing. From a single store in 2002 to three branches today.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About MensClub — Malappuram's Trusted Menswear Since 2002",
    description: "Built on trust. Woven in Malappuram. The MensClub story.",
    url: "/about",
    images: [
      {
        url: "/assets/about.jpg",
        width: 1200,
        height: 630,
        alt: "MensClub Malappuram Main Storefront - 25 years of premium menswear heritage",
      },
    ],
  },
};

const timeline = [
  { y: "2002", t: "Founded", d: "A single store opens on a quiet Malappuram street." },
  { y: "2008", t: "Branch 2", d: "Demand grows. A second location opens nearby." },
  { y: "2021", t: "Branch 3", d: "Expanding to serve more families across the district." },
  { y: "2026", t: "Goes Online", d: "Our story reaches beyond the storefront." },
];

const pillars = [
  { i: Award, t: "Quality", d: "Hand-picked fabrics. Trusted brands. Nothing on the rack we wouldn't wear." },
  { i: Layers, t: "Range", d: "From everyday formals to wedding sherwanis — one stop, every occasion." },
  { i: HeartHandshake, t: "Trust", d: "A handshake business. We remember your name, your size, your taste." },
  { i: Sparkles, t: "Experience", d: "Twenty-five years of dressing Malappuram. The craft is in the detail." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About MensClub" title="Built on trust. Woven in Malappuram." />

      {/* Story */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-x grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] bg-ink/5 overflow-hidden rounded-sm">
              <Image 
                src="/assets/about.jpg" 
                alt="MensClub Malappuram Main Storefront - 25 years of premium menswear heritage"
                fill
                priority // Tells Google and the browser to load this image immediately (Great for SEO & Core Web Vitals)
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-4">The Story</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">
                A family business with <span className="font-italic-serif text-accent-rust">deep roots.</span>
              </h2>
              <p className="mt-6 text-ink/70 leading-relaxed text-lg">
                MensClub began in 2002 with a single counter, two tailors, and a clear belief — that the men of Malappuram deserved better. Better fabrics. Better fits. Better service.
              </p>
              <p className="mt-4 text-ink/65 leading-relaxed">
                Twenty-five years on, three branches strong, that belief hasn't changed. Generations of Malappuram have stepped into our stores — for first interviews, wedding nights, Eid mornings, and quiet Sundays at home.
              </p>
              <p className="mt-4 text-ink/65 leading-relaxed">
                We carry shirts you'll wear for years and dhothi soft enough to feel like family. Everything we stock, we'd wear ourselves.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream py-24 md:py-32 border-y border-ink/10">
        <div className="container-x">
          <Reveal>
            <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-4">Our Journey</div>
            <h2 className="font-display text-4xl md:text-5xl mb-16 max-w-xl tracking-tight">
              A quarter century, one <span className="font-italic-serif text-accent-rust">milestone</span> at a time.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {timeline.map((m, i) => (
              <Reveal key={m.y} delay={i * 120}>
                <div className="relative pt-8 border-t border-ink/20">
                  <div className="absolute -top-px left-0 h-0.5 w-12 bg-accent-rust" />
                  <div className="font-display text-5xl text-ink tracking-tight">{m.y}</div>
                  <div className="mt-3 font-label text-[11px] tracking-[0.22em] uppercase text-ink/70">{m.t}</div>
                  <p className="mt-3 text-ink/60 text-sm leading-relaxed">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-16">
              <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-3">What We Stand For</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Four pillars. One <span className="font-italic-serif text-accent-rust">promise.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
            {pillars.map((p, i) => {
              const Icon = p.i;
              return (
                <Reveal key={p.t} delay={i * 80}>
                  <div className="bg-paper p-10 h-full">
                    <Icon className="text-accent-rust" size={30} strokeWidth={1.5} />
                    <h3 className="mt-6 font-display text-2xl tracking-tight">{p.t}</h3>
                    <p className="mt-3 text-ink/60 text-sm leading-relaxed">{p.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Big 25 */}
      <section className="bg-cream py-24 md:py-40 overflow-hidden border-t border-ink/10">
        <div className="container-x text-center">
          <Reveal>
            <div className="font-display text-[12rem] md:text-[20rem] leading-none text-ink tracking-tighter">25</div>
            <div className="font-italic-serif text-2xl md:text-3xl text-accent-rust -mt-4">years of dressing Malappuram</div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}