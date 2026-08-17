import type { Metadata } from "next";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Phone, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Branches — Visit MensClub in Malappuram | 3 Stores",
  description:
    "Find MensClub stores in Malappuram. Three locations, directions, phone numbers and store timings.",
  alternates: { canonical: "/branches" },
  openGraph: {
    title: "MensClub Branches in Malappuram",
    description: "Three stores across Malappuram. Find the one nearest you.",
    url: "/branches",
  },
};

const branches = [
  {
    name: "MensClub — Main Branch",
    addr: "Down Hill, Malappuram, Kerala 676519",
    phone: "+91 98959 78299",
    tel: "+919895978299",
    hours: "Mon–Sun 9:30AM–9:30PM",
  },
  {
    name: "MensClub — Perinthalmanna",
    addr: "Perinthalmanna, Malappuram, Kerala 679322",
    phone: "+91 98959 78299",
    tel: "+919895978299",
    hours: "Mon–Sun 9AM–10PM",
  },
  {
    name: "MensClub — Kizhisseri",
    addr: "Kizhisseri, Malappuram, Kerala 673641",
    phone: "+91 98959 78299",
    tel: "+919895978299",
    hours: "Mon–Sun 9AM–10PM",
  },
];

export default function BranchesPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Our Stores" title="Find us in Malappuram." subtitle="Three branches, one promise. Walk in and see what we mean." />

      <section className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-10 md:gap-14">
          {branches.map((b, i) => {
            // Create a search query for the Google Maps Embed using the store name and address
            const mapQuery = encodeURIComponent(`${b.name}, ${b.addr}`);
            
            return (
              <Reveal key={b.name} delay={i * 80}>
                <article className="grid md:grid-cols-2 gap-8 md:gap-12 border-t border-ink/10 pt-10 md:pt-14">
                  
                  {/* Google Maps Embed */}
                  <div className="relative w-full aspect-[4/3] md:aspect-[5/4] bg-ink/5 overflow-hidden">
                    <iframe
                      title={`Map to ${b.name}`}
                      src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust">Branch 0{i + 1}</div>
                    <h2 className="font-display text-3xl md:text-4xl mt-3 tracking-tight">{b.name}</h2>

                    <ul className="mt-8 space-y-5 text-ink/80">
                      <li className="flex gap-4">
                        <MapPin size={18} className="text-accent-rust mt-1 shrink-0" />
                        <span>{b.addr}</span>
                      </li>
                      <li className="flex gap-4">
                        <Phone size={18} className="text-accent-rust mt-1 shrink-0" />
                        <a href={`tel:${b.tel}`} className="hover:text-accent-rust transition-colors">{b.phone}</a>
                      </li>
                      <li className="flex gap-4">
                        <Clock size={18} className="text-accent-rust mt-1 shrink-0" />
                        <span>{b.hours}</span>
                      </li>
                    </ul>

                    <div className="mt-auto pt-8 flex flex-wrap gap-3">
                      <a
                        href={`https://maps.google.com/?q=${mapQuery}`}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-ink text-paper px-6 py-3 font-label text-[11px] tracking-[0.22em] uppercase hover:bg-accent-rust inline-flex items-center gap-2 transition-colors"
                      >
                        Get Directions <ArrowRight size={14} />
                      </a>
                      <a
                        href={`https://wa.me/${b.tel.replace('+', '')}?text=Hello%20MensClub%20${encodeURIComponent(b.name.replace('MensClub — ', ''))}%2C%20I%20would%20like%20to%20know%20more%20about%20your%20collections.`}
                        target="_blank" rel="noopener noreferrer"
                        className="border border-ink/30 px-6 py-3 font-label text-[11px] tracking-[0.22em] uppercase text-ink hover:bg-ink hover:text-paper inline-flex items-center gap-2 transition-colors"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Timings */}
      <section className="bg-cream py-20 md:py-28 border-t border-ink/10">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-4">Store Timings</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              When to <span className="font-italic-serif text-accent-rust">find us.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <table className="mt-10 w-full text-left">
              <tbody className="divide-y divide-ink/15">
                {[
                  ["Monday – Sunday", "9:00 AM – 10:00 PM"],
                  ["Public Holidays", "10:00 AM – 6:00 PM"],
                ].map(([day, time]) => (
                  <tr key={day}>
                    <td className="py-5 font-label text-[11px] tracking-[0.2em] uppercase text-ink/70">{day}</td>
                    <td className="py-5 text-right font-display text-xl md:text-2xl text-ink">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}