# MensClub Malappuram

The official web application for MensClub, Malappuram's trusted premium men's clothing destination since 2002. Built with modern web technologies, the platform features a highly optimized, fully responsive design, integrated with a headless CMS for seamless content management.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://sanity.io/) (Embedded Next Studio)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom `tw-animate-css` and framer-motion concepts

## ✨ Key Features

- **Sanity CMS Integration**: Manage seasonal offers/posters and collections dynamically via the built-in `/studio` admin dashboard without writing any code.
- **WhatsApp Integration**: Contact forms and branch links automatically generate pre-filled, professional WhatsApp messages to the store's primary number.
- **SEO Optimized**: Fully configured OpenGraph metadata, JSON-LD schema for Local Businesses, dynamic Next.js sitemaps, and optimized image loading.
- **Responsive Aesthetics**: A premium, minimalist UI inspired by editorial design—fluid typography, curated color palettes, and engaging micro-interactions.

## 📦 Local Development

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Rename `.env.local.example` (or create a `.env.local` file) in the root directory and add your Sanity project details:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site, and [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity CMS admin panel.

## 🌐 Deployment & Production

This project is optimized for deployment on [Vercel](https://vercel.com). 

1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. **Important:** Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to your Vercel Environment Variables.
4. Deploy.

*Note: You must also add your live production URL to your Sanity project's CORS Origins list at [manage.sanity.io](https://manage.sanity.io) to ensure the CMS functions properly on the live site.*

## 📂 Project Structure

- `/app`: Next.js App Router containing all pages, global layouts, and SEO configurations.
- `/app/studio`: The embedded Sanity CMS admin dashboard.
- `/components`: Reusable UI components (`Layout`, `Reveal`, `Marquee`, etc.).
- `/sanity`: Schema definitions (`collection`, `poster`) and Sanity client configuration.
- `/public/assets`: Static assets, brand imagery, and the site favicon.

---

*Designed & developed for MensClub Malappuram.*
