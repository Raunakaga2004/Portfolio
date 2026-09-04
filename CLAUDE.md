# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)

There is no test setup in this repo (no test runner configured).

## Architecture

This is Raunak Agarwal's personal portfolio site: a Next.js 15 (App Router) single-page site with one long scrolling page, animated with GSAP.

- `src/app/page.tsx` is a server component (`'use server'`) that renders `ClientWrapper`. It currently has a lot of commented-out code for fetching skills/projects/contacts from an API (`/api/skill/all`, `/api/project/all`, `/api/contact/all`) — that data-fetching layer is not implemented yet; project/skill data is hard-coded directly in `ClientWrapper.tsx` instead (see `projectTechStack`).
- `src/app/ClientWrapper.tsx` ("use client") is where almost all of the actual page content and behavior lives — it's a single large component containing every page section (intro, "How I Can Help", skills, projects, about me) as one continuous scrollable div. Sections are marked with the `.page-section` class and `id`s (`#offer-parent`, `#skill-parent`, `#work`, etc.) that the GSAP scroll animations target by selector.
- Animations are built with two `useGSAP` hooks in `ClientWrapper.tsx`:
  - One drives scroll-linked animations (`ScrollTrigger`/`ScrollSmoother`, scoped to `scrollPageRef`) — logo pinning, blur/fade of intro content, and the offer cards sliding in as you scroll.
  - One drives the initial intro timeline (scoped to `containerRef`) — the oval shape, name logo, hero image, and CTA buttons animating in on load.
  - Both use `gsap.matchMedia()` with `isLaptop` (`min-width: 1024px`) / `isSmallMobile` (`min-width: 320px`) breakpoints to branch animation values for desktop vs. mobile; when changing animation values, update both branches.
- `src/lib/auth.ts` sets up NextAuth with a `CredentialsProvider` gated by `ADMIN_PAGE_USERNAME`/`ADMIN_PAGE_PASSWORD`/`NEXTAUTH_SECRET` env vars, with a `/login` sign-in page — this is scaffolding for an admin panel (mentioned in the portfolio's own "Portfolio" project blurb) that isn't wired up to any routes yet.
- `src/utils/font.ts` centralizes the two custom Google fonts (Qwigley for the name logo, Poppins for body text) used via `.className`/`.variable`; `Geist`/`Geist_Mono` are loaded separately in `src/app/layout.tsx`.
- Styling is Tailwind v4 (`@theme inline` in `src/app/globals.css` defines the color tokens `--color-primary`, `--color-secondary`, `--color-fortext`, `--color-backgroundcolor`, `--color-projectDiv` and custom breakpoints `xs`(320px)/`sm`(360px)/`md`(768px)/`lg`(1024px)) plus a few hand-written utility classes in the same file (`.hide-scrollbar`, `.skill-box`, `.projectDiv`).
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
