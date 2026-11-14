# Rozetka 2.0 — Frontend

The storefront and seller dashboard for a multi-vendor marketplace.

## Features

- Browse, search, and filter products. Choose variants, save favorites, and leave ratings.
- Manage a shopping cart and check out through monobank.
- Sign in by email, Google, or Facebook and manage your profile and sessions.
- Manage stores and products as a seller. Admins manage catalog and blog content.
- Articles, blog categories, and catalog categories use incremental static regeneration (ISR) with a 60-second revalidation interval.

## Tech Stack

Next.js App Router, React, TypeScript, Tailwind CSS, TanStack Query, Jotai, React Hook Form, and Zod.

## Local Setup

1. Install Bun and start the [Rozetka 2.0 backend](https://github.com/dBerezuk/rozetka-2.0-back-end).
2. Copy [`.env.example`](.env.example) to `.env.local`. By default, the storefront uses the API at `http://localhost:4000`.
3. Install dependencies and start the dev server.

   ```bash
   bun install
   bun run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

For a production build, set `NEXT_PUBLIC_SITE_URL` to the public storefront URL and run `bun run build`. Keep the API reachable during the build to pre-render routes from `generateStaticParams`. Run `bun run start` to serve the build locally.
