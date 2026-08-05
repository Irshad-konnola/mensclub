import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mensclubmalappuram.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MensClub — Premium Men's Clothing in Malappuram, Kerala",
    template: "%s",
  },
  description:
    "MensClub is Malappuram's trusted premium men's clothing destination since 2001. Shirts, trousers, dhothi, ethnic wear across 3 branches.",
  authors: [{ name: "MensClub Malappuram" }],
  openGraph: {
    siteName: "MensClub",
    type: "website",
    title: "MensClub — Premium Men's Clothing in Malappuram, Kerala",
    description:
      "MensClub is Malappuram's trusted premium men's clothing destination since 2001. Shirts, trousers, dhothi, ethnic wear across 3 branches.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/acf48859-2733-4de9-9cf1-f31a2a24e770/id-preview-c32f4368--44f3393f-0ecd-4abe-8e48-aaaf0ba6eced.lovable.app-1782754962904.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MensClub — Premium Men's Clothing in Malappuram, Kerala",
    description:
      "MensClub is Malappuram's trusted premium men's clothing destination since 2001. Shirts, trousers, dhothi, ethnic wear across 3 branches.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/acf48859-2733-4de9-9cf1-f31a2a24e770/id-preview-c32f4368--44f3393f-0ecd-4abe-8e48-aaaf0ba6eced.lovable.app-1782754962904.png",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
