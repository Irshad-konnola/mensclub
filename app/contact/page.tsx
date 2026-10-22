import type { Metadata } from "next";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ContactContent } from "./ContactContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mensclubstore.in";

export const metadata: Metadata = {
  title: "Contact MensClub Malappuram — Call, WhatsApp or Visit",
  description:
    "Get in touch with MensClub Malappuram. Call us, WhatsApp, or send a message — we'll respond within the hour during store hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MensClub — Let's Talk",
    description: "Reach the MensClub team in Malappuram.",
    url: "/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact MensClub Malappuram",
  description: "Get in touch with MensClub Malappuram. Phone, WhatsApp, and showroom visits across 3 branches.",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "ClothingStore",
    name: "MensClub Malappuram",
    telephone: "+91 98959 78299",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Down Hill",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      postalCode: "676519",
      addressCountry: "IN",
    },
  },
};

export default function ContactPage() {
  return (
    <SiteLayout hideFab>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <PageHero eyebrow="Get in Touch" title="Let's talk." subtitle="Questions, custom requests, or just want to say hello — we're here." />
      <ContactContent />
    </SiteLayout>
  );
}
