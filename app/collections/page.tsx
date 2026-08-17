import type { Metadata } from "next";
import Image from "next/image";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getCollectionsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Collections — Shirts, Trousers, Dhothi & Ethnic Wear | MensClub Malappuram",
  description:
    "Explore MensClub's curated menswear collections: formal shirts, casual linen, trousers, dhothi, ethnic occasion wear and accessories.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "MensClub Collections — Dressed for Every Occasion",
    description: "Six collections. One destination in Malappuram.",
    url: "/collections",
    images: [
      {
        url: "/assets/fromals-c.jpg",
        width: 1200,
        height: 630,
        alt: "MensClub Malappuram - Premium Menswear Collections",
      },
    ],
  },
};

const collections = [
  { 
    t: "Formal Shirts", 
    d: "Crisp cottons and structured weaves for boardrooms, weddings and weekday confidence.",
    img: "/assets/fromals-c.jpg",
    alt: "Premium men's formal shirts stacked neatly"
  },
  { 
    t: "Casual Linen Shirts", 
    d: "Breathable linens and soft cottons made for Kerala weather and easy evenings.",
    img: "/assets/linen-c.jpg",
    alt: "Men's casual linen shirts hanging on a rack"
  },
  { 
    t: "Trousers & Chinos", 
    d: "Tailored trousers, chinos, and denim — sharp lines and lived-in comfort.",
    img: "/assets/trousers-c.jpg",
    alt: "Custom tailored men's trousers and chinos"
  },
  { 
    t: "Dhothi & Mundu", 
    d: "The finest pure-cotton dhothi. From temple visits to family gatherings.",
    img: "/assets/mundu-c.jpg",
    alt: "Traditional Kerala Kasavu mundu and dhothi for men"
  },
  { 
    t: "Ethnic & Occasion Wear", 
    d: "Kurtas, sherwanis and jubbas — quietly grand pieces for the moments that matter.",
    img: "/assets/ethnic-c.jpg",
    alt: "Men's wedding sherwanis and ethnic kurtas"
  },
  { 
    t: "Accessories & Fabrics", 
    d: "Belts, wallets, ties and unstitched fabrics, hand-picked for the discerning man.",
    img: "/assets/fabrics-c.jpg",
    alt: "Premium men's leather belts, wallets, and accessories"
  },
];

export default async function CollectionsPage() {
  let sanityCollections = [];
  try {
    sanityCollections = await client.fetch(getCollectionsQuery);
  } catch (error) {
    console.error("Sanity fetch failed, falling back", error);
  }

  if (!sanityCollections || sanityCollections.length === 0) {
    sanityCollections = collections.map(c => ({ name: c.t, description: c.d, image: c.img, alt: c.alt }));
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Our Collections" title="Dressed for every occasion." subtitle="Six collections, one destination. Each piece chosen to last beyond the season." />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {sanityCollections.map((c: any, i: number) => (
              <Reveal key={c.name} delay={(i % 2) * 100}>
                <article className="group">
                  <div className="relative overflow-hidden aspect-[4/5] bg-ink/5">
                    <Image
                      src={c.image?.asset ? urlForImage(c.image)?.url() || "" : c.image}
                      alt={c.image?.alt || c.alt || c.name}
                      fill
                      priority={i < 2} // Load the first two images instantly for better SEO & UX
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <div className="font-display text-2xl text-ink tracking-tight">{c.name}</div>
                      <p className="mt-3 text-ink/60 leading-relaxed max-w-md">{c.description}</p>
                    </div>
                    <a href="/branches" className="shrink-0 mt-1 font-label text-[11px] tracking-[0.22em] uppercase text-accent-rust inline-flex items-center gap-1 hover:gap-2 transition-all">
                      View in Store <ArrowRight size={14} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal banner */}
      <section className="bg-cream py-20 md:py-28 border-t border-ink/10">
        <div className="container-x text-center">
          <Reveal>
            <div className="font-label text-[11px] tracking-[0.3em] uppercase text-accent-rust mb-5">New This Season</div>
            <h2 className="font-display text-4xl md:text-6xl max-w-3xl mx-auto leading-tight tracking-tight">
              New arrivals every season. <span className="font-italic-serif text-accent-rust">Visit our store.</span>
            </h2>
            <p className="mt-6 text-ink/60 max-w-lg mx-auto">Our racks change with the months — and with what Malappuram is wearing.</p>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}