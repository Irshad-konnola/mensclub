import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/site/Marquee";
import { SiteLayout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getActivePostersQuery, getCollectionsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "MensClub Malappuram — Premium Men's Clothing Since 2002",
  description:
    "Malappuram's most trusted men's clothing store. Explore premium shirts, trousers, traditional Kerala dhothi, and ethnic wear across our Kottappadi, Perintalmanna, and Temple Road branches.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MensClub Malappuram — Premium Men's Clothing Since 2002",
    description: "25 years. 3 stores. One name. Malappuram's destination for premium menswear.",
    url: "/",
    images: [
      {
        url: "/assets/hero.jpg", 
        width: 1200,
        height: 630,
        alt: "MensClub Malappuram Storefront",
      },
    ],
  },
};

export const revalidate = 60;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "MensClub",
  image: "/assets/hero.jpg",
  description:
    "Premium men's clothing store in Malappuram, Kerala. Formal shirts, trousers, dhothi, and ethnic wear since 2002.",
  url: "https://yourwebsite.com",
  telephone: "+91 9895978299",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Temple Road, Near BSNL Exchange",
    addressLocality: "Malappuram",
    addressRegion: "Kerala",
    postalCode: "676505",
    addressCountry: "IN",
  },
  department: [
    {
      "@type": "ClothingStore",
      name: "MensClub Kottappadi",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kottappadi, Malappuram",
        addressRegion: "Kerala",
      }
    },
    {
      "@type": "ClothingStore",
      name: "MensClub Perintalmanna",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near KSRTC Bus Stand",
        addressLocality: "Perintalmanna",
        addressRegion: "Kerala",
        postalCode: "679322"
      }
    }
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "20:30",
    },
  ],
  foundingDate: "2002",
  areaServed: "Malappuram District, Kerala",
};

// Real, public Unsplash image URLs for preview
const collections = [
  { name: "Formal Shirts", image: "/assets/fromals.jpg", alt: "Premium men's formal shirts collection" },
  { name: "Casual Shirts", image: "/assets/casuals.jpg", alt: "Trending men's casual shirts" },
  { name: "Trousers", image: "/assets/trousers.jpg", alt: "Tailored men's trousers" },
  { name: "Dhothi", image: "/assets/dhoti-1.jpg", alt: "Traditional ethnic wear" },
  { name: "Ethnic Wear", image: "/assets/ethnic.jpg", alt: "Men's wedding sherwanis and kurtas" },
  { name: "Accessories", image: "/assets/accessories.jpg", alt: "Premium men's leather belts" },
];

const reviews = [
  { name: "Abdul Rahman", text: "Been buying my shirts from MensClub for over a decade. Quality and trust never fades.", role: "Malappuram" },
  { name: "Shameer K.", text: "The dhothi collection is unmatched. Staff knows exactly what suits each occasion.", role: "Perintalmanna" },
  { name: "Faisal P.", text: "Got my entire wedding wardrobe here. Premium fabrics, fair pricing, warm service.", role: "Kottappadi" },
];

export default async function HomePage() {
  let posters = [];
  let sanityCollections = [];
  try {
    posters = await client.fetch(getActivePostersQuery);
    sanityCollections = await client.fetch(getCollectionsQuery);
  } catch (error) {
    console.error("Sanity fetch failed, falling back", error);
  }

  if (!sanityCollections || sanityCollections.length === 0) {
    sanityCollections = collections;
  }

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center bg-paper text-ink overflow-hidden border-b border-ink/10">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          background: "radial-gradient(55% 55% at 80% 30%, oklch(0.94 0.05 38 / 0.6), transparent 70%), radial-gradient(45% 45% at 15% 80%, oklch(0.93 0.02 80 / 0.7), transparent 70%)"
        }} />
        
        <div className="container-x relative py-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <div className="font-label text-accent-rust text-[11px] tracking-[0.3em] uppercase mb-6">Malappuram · Est. 2002</div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-tight">
                Where Malappuram<br />
                gets <span className="font-italic-serif text-accent-rust">dressed.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-ink/65 text-lg md:text-xl max-w-md leading-relaxed">
                Twenty-five years. Three stores. One quietly trusted name.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/collections" className="bg-ink px-7 py-4 font-label text-[11px] tracking-[0.2em] uppercase text-paper hover:bg-accent-rust transition inline-flex items-center gap-2">
                  Explore Collections <ArrowRight size={14} />
                </Link>
                <Link href="/branches" className="border border-ink/30 px-7 py-4 font-label text-[11px] tracking-[0.2em] uppercase text-ink hover:bg-ink hover:text-paper transition">
                  Visit a Store
                </Link>
              </div>
            </Reveal>
          </div>
          
          <div className="md:col-span-5 hidden md:block">
            <Reveal delay={200}>
              <div className="relative aspect-[4/5] bg-ink/5 overflow-hidden">
                <Image 
                  src="/assets/hero.jpg" 
                  alt="Inside MensClub showcasing premium men's clothing"
                  fill
                  priority // Critical for LCP (Largest Contentful Paint) SEO metric
                  className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute -bottom-2 -left-2 bg-paper border border-ink/10 px-5 py-3 shadow-sm z-10">
                  <div className="font-italic-serif text-accent-rust text-xl">a quarter century</div>
                  <div className="font-label text-[10px] tracking-[0.22em] uppercase text-ink/60">of trust</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ANNOUNCEMENTS / OFFERS (From Sanity) */}
      {posters && posters.length > 0 && (
        <section className="bg-paper border-b border-ink/10 py-12 md:py-16">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
                <div>
                  <div className="font-label text-accent-rust text-[11px] tracking-[0.25em] uppercase mb-2">Announcements</div>
                  <h2 className="font-display text-3xl md:text-4xl tracking-tight">Special Offers</h2>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posters.map((poster: any, i: number) => (
                <Reveal key={poster._id} delay={i * 100}>
                  {poster.link ? (
                    <Link href={poster.link} className="block group relative aspect-[4/5] overflow-hidden bg-ink/5 rounded-sm">
                      <Image 
                        src={urlForImage(poster.image)?.url() || ""} 
                        alt={poster.image.alt || poster.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </Link>
                  ) : (
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink/5 rounded-sm border border-ink/10">
                      <Image 
                        src={urlForImage(poster.image)?.url() || ""} 
                        alt={poster.image.alt || poster.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="bg-paper border-b border-ink/10">
        <div className="container-x py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { n: "25", l: "Years in Business" },
            { n: "3", l: "Malappuram Branches" },
            { n: "10,000+", l: "Happy Customers" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <div>
                <div className="font-display text-6xl md:text-7xl text-ink tracking-tight">{s.n}</div>
                <div className="mt-3 font-label text-[11px] tracking-[0.25em] uppercase text-ink/55">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <div>
                <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-3">Our Collections</div>
                <h2 className="font-display text-4xl md:text-5xl max-w-xl tracking-tight">
                  Crafted for every <span className="font-italic-serif text-accent-rust">occasion</span> in a man's life.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Link href="/collections" className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/70 hover:text-accent-rust inline-flex items-center gap-2">
                View All <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sanityCollections.map((c: any, i: number) => (
              <Reveal key={c.name} delay={(i % 3) * 100}>
                <Link href="/collections" className="group block">
                  <div className="relative overflow-hidden aspect-[3/4] bg-ink/5">
                    <Image 
                      src={c.image?.asset ? urlForImage(c.image)?.url() || "" : c.image}
                      alt={c.image?.alt || c.alt || c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-300" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="font-label text-paper text-[11px] tracking-[0.22em] uppercase flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Explore</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 font-display text-lg group-hover:text-accent-rust transition-colors">{c.name}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-paper py-24 md:py-32 border-y border-ink/10">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <div className="font-label text-accent-rust text-[11px] tracking-[0.25em] uppercase mb-5">Our Story</div>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.02] tracking-tight">
                Trusted<br />since <span className="font-italic-serif text-accent-rust">2002.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <Reveal delay={120}>
              <p className="text-ink/75 text-lg leading-relaxed">
                MensClub opened its doors in 2002 with a quiet promise — to dress the men of Malappuram with fabrics they could trust and styles they could grow into. A single shop on a familiar street has, over twenty-five years, become three.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 text-ink/60 leading-relaxed">
                We are not a chain. We are a family business that remembers your name, your father's shirt size, and the season you got married. From everyday formals to wedding sherwanis and the finest dhothi, every piece is chosen with intention.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-label text-[11px] tracking-[0.22em] uppercase text-accent-rust hover:text-ink transition-colors">
                Read our story <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <div className="text-center mb-14">
              <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-3">What Malappuram Says</div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Words from our <span className="font-italic-serif text-accent-rust">regulars.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 100}>
                <article className="border border-ink/10 p-8 bg-paper h-full flex flex-col">
                  <div className="flex gap-1 text-accent-rust mb-5">
                    {[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="font-display text-xl leading-snug text-ink flex-1">&quot;{r.text}&quot;</p>
                  <div className="mt-6 pt-5 border-t border-ink/10">
                    <div className="font-label text-[11px] tracking-[0.2em] uppercase text-ink">{r.name}</div>
                    <div className="font-italic-serif text-base text-ink/60 mt-1">{r.role}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* BRANCH CTA */}
      <section className="bg-paper py-24 md:py-32 relative overflow-hidden border-t border-ink/10">
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ background: "radial-gradient(50% 50% at 50% 50%, oklch(0.94 0.05 38 / 0.5), transparent 70%)" }} />
        <div className="container-x relative text-center">
          <Reveal>
            <MapPin className="text-accent-rust mx-auto mb-6" size={28} strokeWidth={1.5} />
            <h2 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl mx-auto tracking-tight">
              Three stores.<br />All in <span className="font-italic-serif text-accent-rust">Malappuram.</span>
            </h2>
            <p className="mt-6 text-ink/60 max-w-md mx-auto">
              Find us at <strong>Kottappadi</strong>, <strong>Perintalmanna</strong>, and <strong>Temple Road</strong>. Wherever you are in town, there's a MensClub nearby.
            </p>
            <Link href="/branches" className="mt-10 inline-flex items-center gap-2 bg-ink px-8 py-4 font-label text-[11px] tracking-[0.22em] uppercase text-paper hover:bg-accent-rust transition-colors">
              Find a Branch <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}