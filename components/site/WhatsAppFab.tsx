import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919895978299?text=Hello%20MensClub%2C%20I%20would%20like%20to%20know%20more%20about%20your%20collections."
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full grid place-items-center text-white animate-pulse-ring"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle size={26} />
    </a>
  );
}
