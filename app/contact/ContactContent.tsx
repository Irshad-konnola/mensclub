"use client";

import { useState, useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";

export function ContactContent() {
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const message = messageRef.current?.value || "";

    const text = `Hello MensClub, my name is ${name} (${phone}).\n\n${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919895978299?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-x grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Left: details */}
        <Reveal>
          <div>
            <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-4">Reach Us Directly</div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              The fastest way to a <span className="font-italic-serif text-accent-rust">tailored answer.</span>
            </h2>

            <ul className="mt-10 space-y-7">
              <li className="flex gap-5 border-b border-ink/10 pb-6">
                <Phone className="text-accent-rust mt-1 shrink-0" size={20} />
                <div>
                  <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Phone</div>
                  <a href="tel:+919895978299" className="mt-1 block font-display text-2xl hover:text-accent-rust">+91 98959 78299</a>
                </div>
              </li>
              <li className="flex gap-5 border-b border-ink/10 pb-6">
                <MessageCircle className="text-accent-rust mt-1 shrink-0" size={20} />
                <div>
                  <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">WhatsApp</div>
                  <a href="https://wa.me/919895978299?text=Hello%20MensClub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20collections." target="_blank" rel="noopener noreferrer" className="mt-1 block font-display text-2xl hover:text-accent-rust">+91 98959 78299</a>
                </div>
              </li>
              <li className="flex gap-5 border-b border-ink/10 pb-6">
                <Mail className="text-accent-rust mt-1 shrink-0" size={20} />
                <div>
                  <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Email</div>
                  <a href="mailto:hello@mensclub.in" className="mt-1 block font-display text-2xl hover:text-accent-rust">hello@mensclub.in</a>
                </div>
              </li>
              <li className="flex gap-5">
                <Clock className="text-accent-rust mt-1 shrink-0" size={20} />
                <div>
                  <div className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/50">Hours</div>
                  <div className="mt-1 text-ink/80">Mon–Sun 9AM–10PM</div>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={120}>
          <form
            onSubmit={handleFormSubmit}
            className="bg-cream border border-ink/10 text-ink p-8 md:p-12"
          >
            <div className="font-label text-[11px] tracking-[0.25em] uppercase text-accent-rust mb-4">Send a Message</div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight">
              We'll reply <span className="font-italic-serif text-accent-rust">within the hour.</span>
            </h3>

            <div className="mt-10 space-y-6">
              <div>
                <label className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/60">Name</label>
                <input ref={nameRef} required type="text" className="mt-2 w-full bg-transparent border-b border-ink/30 py-3 outline-none focus:border-accent-rust transition" placeholder="Your name" />
              </div>
              <div>
                <label className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/60">Phone</label>
                <input ref={phoneRef} required type="tel" className="mt-2 w-full bg-transparent border-b border-ink/30 py-3 outline-none focus:border-accent-rust transition" placeholder="+91 " />
              </div>
              <div>
                <label className="font-label text-[11px] tracking-[0.22em] uppercase text-ink/60">Message</label>
                <textarea ref={messageRef} required rows={4} className="mt-2 w-full bg-transparent border-b border-ink/30 py-3 outline-none focus:border-accent-rust transition resize-none" placeholder="Tell us what you're looking for" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full bg-ink text-paper py-4 font-label text-[11px] tracking-[0.22em] uppercase hover:bg-accent-rust transition"
            >
              {sent ? "Thank you — we'll be in touch" : "Send Message"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
