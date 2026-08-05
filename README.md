# MensClub Malappuram — Next.js Site

This is the Next.js 16 (App Router) migration of the original Vite/TanStack Start
React site, built for strong SEO (server-rendered HTML, per-page metadata,
JSON-LD structured data, sitemap.xml, robots.txt).

## What changed vs. the original

- **Framework:** TanStack Start (Vite) → **Next.js App Router**
- **Routing:** file-based routes in `src/routes` → file-based routes in `app/`
  (`app/page.tsx`, `app/about/page.tsx`, `app/collections/page.tsx`,
  `app/branches/page.tsx`, `app/contact/page.tsx`)
- **SEO:** TanStack's `head()` config → Next's native `Metadata` API per page,
  plus new `app/sitemap.ts` and `app/robots.ts` (auto-generated, weren't
  present before)
- **Styling:** same Tailwind CSS v4 setup, same design tokens, same fonts
  (Fraunces / Instrument Serif / Space Grotesk / Inter), same colors,
  same responsive breakpoints — nothing visual changed
- **Components:** `Navbar`, `Footer`, `Layout`, `Marquee`, `Reveal`,
  `WhatsAppFab` ported 1:1; `Link`/routing hooks swapped for Next.js
  equivalents (`next/link`, `usePathname`)
- Unused shadcn/ui boilerplate (~40 files not referenced by any page) was
  left out to keep the project lean — nothing visible was removed.

All pages are **statically pre-rendered** (`○ Static` in the build output),
which is ideal for SEO and load speed.

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Environment variables

Set your real production domain so canonical URLs, sitemap, and OG tags are
correct:

```
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

Add this to a `.env.local` file (not committed) or your hosting provider's
environment settings. If unset, it defaults to a placeholder domain.

## Deploying

This app deploys cleanly to Vercel, Netlify, or any Node.js host:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx        # Root layout, global metadata, fonts
  page.tsx           # Home page
  about/page.tsx
  collections/page.tsx
  branches/page.tsx
  contact/
    page.tsx         # Server component (metadata)
    ContactContent.tsx  # Client component (interactive form)
  sitemap.ts         # Auto-generated /sitemap.xml
  robots.ts          # Auto-generated /robots.txt
  not-found.tsx       # Custom 404
  error.tsx           # Error boundary
  globals.css         # Tailwind v4 theme + custom styles
components/
  site/
    Navbar.tsx
    Footer.tsx
    Layout.tsx        # SiteLayout, PageHero, Placeholder
    Marquee.tsx
    Reveal.tsx         # Scroll-reveal animation
    WhatsAppFab.tsx
lib/
  utils.ts             # cn() className helper
```

## Notes

- Store photos are currently placeholder blocks (`<Placeholder>` component)
  — same as the original site. Swap these for real photos (e.g. via
  `next/image` for automatic optimization) whenever you have them.
- Update phone numbers, addresses, and branch details directly in each
  page file under `app/`.
