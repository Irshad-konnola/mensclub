import type { Metadata } from "next";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ContactContent } from "./ContactContent";

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

export default function ContactPage() {
  return (
    <SiteLayout hideFab>
      <PageHero eyebrow="Get in Touch" title="Let's talk." subtitle="Questions, custom requests, or just want to say hello — we're here." />
      <ContactContent />
    </SiteLayout>
  );
}
