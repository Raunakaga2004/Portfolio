# Feature: Admin Section Forms

- **Status:** Draft
- **Created:** 2026-10-30

## Problem / Motivation
All portfolio content is hardcoded in `src/app/ClientWrapper.tsx`, so every content change (a new project, a skill, updated contact details) requires a code edit and redeploy. The admin should be able to edit content directly from `/admin` and have it go live without a redeploy.

## Description
Extend the existing auth-gated `/admin` page with one tab per homepage section — Home, Skills, Work, Experience, About, Contact. Each tab holds a form to edit that section's content: edit text/fields, add, remove, and reorder items (projects, skills, jobs, etc.), and upload images. Every item has a show/hide toggle. Each tab has a preview toggle that, when switched on, renders how the section will look with the current form values. Content is stored in Neon Postgres (images in the Neon `assets` bucket), and the homepage reads from the database instead of hardcoded content. The database is seeded with the currently hardcoded content so the site looks identical on day one.

## User Stories
- As the site owner (logged-in admin), I want a tab per section in `/admin` so I can find and edit any part of my portfolio quickly.
- As the site owner, I want to add, remove, reorder, and edit items and upload images, so I can keep projects, skills, and experience current without touching code.
- As the site owner, I want a show/hide toggle per item, so I can temporarily hide content without deleting it.
- As the site owner, I want to toggle a preview of a section, so I can check how my changes look before relying on them.
- As the site owner, I want to edit my contact details from the Contact tab.

## Requirements
- `/admin` (already auth-gated via NextAuth) shows tabs: Home, Skills, Work, Experience, About, Contact.
- Each tab has a form to edit that section's fields; list-based sections support add, remove, and reorder of items.
- Image fields support upload to the Neon `assets` bucket; the database stores the object key, not the bytes.
- Every item (and section where it makes sense) has a show/hide toggle; hidden content does not render on the homepage.
- Each tab has a preview toggle that renders the section using the current form values.
- Contact tab edits the owner's contact details (not visitor messages).
- All form input is validated with zod on the server before writing to the database; validation errors are shown in the form.
- All write endpoints / server actions require an authenticated admin session.
- The homepage reads all section content from the database instead of hardcoded values in `ClientWrapper.tsx`.
- A seed script populates the database with the content currently hardcoded in `ClientWrapper.tsx`.

## Non-Goals
- None specified

## Acceptance Criteria
- [ ] `/admin` shows six tabs (Home, Skills, Work, Experience, About, Contact), each with a working form.
- [ ] Editing a field in admin and saving shows the change on the homepage without a redeploy.
- [ ] Items can be added, removed, and reordered, and the homepage reflects the new order.
- [ ] Hiding an item via its toggle removes it from the homepage; un-hiding restores it.
- [ ] Uploading an image stores it in the `assets` bucket and it displays on the homepage.
- [ ] The preview toggle on each tab renders the section with the current form values.
- [ ] Invalid input is rejected by zod validation with a visible error message.
- [ ] Write endpoints reject unauthenticated requests.
- [ ] After running the seed, the homepage looks identical to the current hardcoded version.

## Technical Notes
- **DB:** Neon Postgres (`DATABASE_URL` pooled for app traffic, `DATABASE_URL_UNPOOLED` for migrations). Existing `pg` pool in `src/lib/db.ts`.
- **ORM:** Prisma — `.gitignore` already ignores `/src/generated/prisma`. Use the `@prisma/adapter-pg` driver adapter so Prisma reuses the existing `pg` setup; run migrations against `DATABASE_URL_UNPOOLED`.
- **Validation:** zod schemas per section, shared between form and server.
- **Storage:** Neon Object Storage, private `assets` bucket via `files-sdk` (`src/lib/storage.ts`). Private bucket → serve images via presigned URLs (or switch bucket to `public_read` + CDN).
- **Auth:** existing NextAuth setup (`src/lib/auth.ts`, `src/app/admin/page.tsx`).
- **Content source today:** sections in `src/app/ClientWrapper.tsx` (ids: `home`, `skill-parent`, `work`, `experience`, `about`, `contact`). Old commented-out `skillsType` (id, name, description, status, show, iconURL, category[]) in `src/app/page.tsx` is a useful starting shape for Skills.
- Dev-only health route at `src/app/api/health/route.ts` can be removed once real data flows.

## Points to Keep in Mind
- Preview is a simple toggle per tab, shown whenever the admin wants it — not a separate preview page or draft/publish workflow.
- Seed must cover everything currently hardcoded.
