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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mensclubstore.in";

export const metadata: Metadata = {
  title: "MensClub Malappuram — Premium Men's Clothing Since 2002",
  description:
    "Malappuram's trusted menswear store since 2002. Premium shirts, trousers, Kerala Kasavu dhothi & ethnic wear across Down Hill, Perinthalmanna & Kizhisseri.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MensClub Malappuram — Premium Men's Clothing Since 2002",
    description: "25 years. 3 stores. Malappuram's destination for premium menswear and Kasavu dhothi.",
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

const faqs = [
  {
    q: "Where are MensClub stores located in Malappuram district?",
    a: "MensClub operates 3 premier showrooms across Malappuram: our flagship store at Down Hill (Malappuram 676519), our Perinthalmanna branch near the KSRTC Bus Stand (679322), and our Kizhisseri branch (673641)."
  },
  {
    q: "What types of men's clothing collections do you stock?",
    a: "We curate a full spectrum of premium menswear, including corporate formal shirts, breathable pure linen casuals, tailored formal trousers and chinos, traditional Kerala Kasavu dhothi (mundu), wedding sherwanis, festive kurtas, and luxury leather accessories."
  },
  {
    q: "Do you offer custom fitting and bespoke tailoring services?",
    a: "Yes. MensClub provides master in-house tailoring and custom fitting services across all branches. Whether you need customized trouser lengths, bespoke shirt fittings, or wedding attire alterations, our tailors ensure a clean, tailored drape."
  },
  {
    q: "What are the store timings for MensClub branches?",
    a: "All three MensClub stores are open 7 days a week, Monday through Sunday, from 9:30 AM to 9:30 PM."
  },
  {
    q: "Can I check current stock or order via WhatsApp?",
    a: "Yes! You can connect with our team directly on WhatsApp (+91 98959 78299) to enquire about specific collections, wedding party orders, or check current offers and sizes before visiting."
  }
];

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "@id": `${SITE_URL}/#store`,
  name: "MensClub Malappuram",
  image: `${SITE_URL}/assets/hero.jpg`,
  description:
    "Malappuram's trusted premium men's clothing store since 2002. Formal shirts, linen trousers, traditional Kerala Kasavu mundu, and festive ethnic wear across 3 stores.",
  url: SITE_URL,
  telephone: "+91 9895978299",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, UPI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Down Hill",
    addressLocality: "Malappuram",
    addressRegion: "Kerala",
    postalCode: "676519",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0510,
    longitude: 76.0711,
  },
  department: [
    {
      "@type": "ClothingStore",
      name: "MensClub Perinthalmanna",
      telephone: "+91 9895978299",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near KSRTC Bus Stand",
        addressLocality: "Perinthalmanna",
        addressRegion: "Kerala",
        postalCode: "679322",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ClothingStore",
      name: "MensClub Kizhisseri",
      telephone: "+91 9895978299",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kizhisseri Main Road",
        addressLocality: "Kizhisseri",
        addressRegion: "Kerala",
        postalCode: "673641",
        addressCountry: "IN",
      },
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:30",
      closes: "21:30",
    },
  ],
  foundingDate: "2002",
  areaServed: "Malappuram District, Kerala",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a
    }
  }))
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              <p className="mt-4 text-accent-rust font-label text-[11px] tracking-[0.22em] uppercase font-semibold">
                Premium Men&apos;s Clothing Store · Shirts, Trousers, Kasavu Dhothi &amp; Wedding Wear
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-ink/65 text-lg md:text-xl max-w-md leading-relaxed">
                Twenty-five years. Three stores. One quietly trusted name in men&apos;s fashion.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/collections" className="bg-ink px-7 py-4 font-label text-[11px] tracking-[0.2em] uppercase text-paper hover:bg-accent-rust transition inline-flex items-center gap-2">
                  Explore Menswear Collections <ArrowRight size={14} />
                </Link>
                <Link href="/branches" className="border border-ink/30 px-7 py-4 font-label text-[11px] tracking-[0.2em] uppercase text-ink hover:bg-ink hover:text-paper transition">
                  Visit Our 3 Stores
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
                        <span>Explore {c.name || "Collection"}</span>
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

      {/* CRAFTSMANSHIP & HERITAGE DETAIL */}
      <section className="bg-cream py-20 md:py-28 border-b border-ink/10">
        <div className="container-x">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <div className="font-label text-accent-rust text-[11px] tracking-[0.25em] uppercase mb-3">
                Crafted For Malappuram
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
                Authentic fabrics, time-honored tailoring, and everyday comfort.
              </h2>
              <p className="mt-5 text-ink/70 text-lg leading-relaxed">
                For over 25 years, MensClub has been the quintessential destination for men&apos;s fashion in Malappuram. From high-grade Giza cotton formal shirts to handwoven Kerala Kasavu dhothis, every garment on our shelves reflects a standard of quality built for life in Kerala.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="border border-ink/10 bg-paper p-8 h-full">
                <div className="font-label text-accent-rust text-xs tracking-wider uppercase mb-2">01 · Premium Fabrics</div>
                <h3 className="font-display text-2xl mb-3 text-ink">Bespoke Cottons &amp; Linens</h3>
                <p className="text-ink/65 text-sm leading-relaxed">
                  Engineered for Kerala&apos;s tropical climate, our 100% pure linen shirts and compact cotton trousers offer unmatched breathability, crease resistance, and day-long comfort.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="border border-ink/10 bg-paper p-8 h-full">
                <div className="font-label text-accent-rust text-xs tracking-wider uppercase mb-2">02 · Kerala Heritage</div>
                <h3 className="font-display text-2xl mb-3 text-ink">Kasavu Dhothi &amp; Ethnic Wear</h3>
                <p className="text-ink/65 text-sm leading-relaxed">
                  Celebrate Onam, Eid, weddings, and family milestones in authentic Kasavu mundu, festive wedding jubbas, and finely crafted sherwanis sourced directly from master weavers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="border border-ink/10 bg-paper p-8 h-full">
                <div className="font-label text-accent-rust text-xs tracking-wider uppercase mb-2">03 · Custom Tailoring</div>
                <h3 className="font-display text-2xl mb-3 text-ink">In-House Master Stitching</h3>
                <p className="text-ink/65 text-sm leading-relaxed">
                  Need a personalized cut? Our seasoned in-store tailors provide precise measurements, custom adjustments, and bespoke stitching services to guarantee a flawless drape.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-paper py-24 md:py-32">
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
                <article className="border border-ink/10 p-8 bg-cream h-full flex flex-col">
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

      {/* FAQ SECTION */}
      <section className="bg-cream py-20 md:py-28 border-y border-ink/10">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <div className="font-label text-accent-rust text-[11px] tracking-[0.25em] uppercase mb-3">
                Got Questions?
              </div>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                Frequently Asked <span className="font-italic-serif text-accent-rust">Questions</span>
              </h2>
              <p className="mt-4 text-ink/65 text-base">
                Everything you need to know about visiting MensClub showrooms, collections, and custom fittings in Malappuram.
              </p>
            </Reveal>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-ink/10">
            {faqs.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 80}>
                <div className="py-7">
                  <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-ink/70 text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Reveal delay={300}>
              <a
                href="https://wa.me/919895978299?text=Hello%20MensClub%2C%20I%20have%20a%20question%20about%20your%20clothing%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 font-label text-[11px] tracking-[0.2em] uppercase hover:bg-accent-rust transition-colors"
              >
                Ask Us on WhatsApp <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
      
      {/* BRANCH CTA */}
      <section className="bg-paper py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ background: "radial-gradient(50% 50% at 50% 50%, oklch(0.94 0.05 38 / 0.5), transparent 70%)" }} />
        <div className="container-x relative text-center">
          <Reveal>
            <MapPin className="text-accent-rust mx-auto mb-6" size={28} strokeWidth={1.5} />
            <h2 className="font-display text-5xl md:text-7xl leading-[1.02] max-w-4xl mx-auto tracking-tight">
              Three stores.<br />All in <span className="font-italic-serif text-accent-rust">Malappuram.</span>
            </h2>
            <p className="mt-6 text-ink/60 max-w-md mx-auto">
              Find us at <strong>Down Hill</strong>, <strong>Perinthalmanna</strong>, and <strong>Kizhisseri</strong>. Wherever you are in Malappuram district, there&apos;s a MensClub nearby.
            </p>
            <Link href="/branches" className="mt-10 inline-flex items-center gap-2 bg-ink px-8 py-4 font-label text-[11px] tracking-[0.22em] uppercase text-paper hover:bg-accent-rust transition-colors">
              View Store Locations &amp; Timings <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}