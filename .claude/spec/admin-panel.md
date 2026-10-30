# Feature: Admin Panel

- **Status:** Draft
- **Created:** 2026-09-06

## Problem / Motivation
Right now there's no way to manage portfolio content (projects, resume, links, etc.) or view site activity (contact form submissions, visitor stats) without redeploying code. An authenticated admin panel is needed so these can be managed directly.

## Description
A route at `/admin` that is not linked from anywhere in the site's UI (no nav link, no button — reachable only by typing the URL directly). It sits behind authentication: "Sign in with Google" is the primary login method (no password to remember), with a hidden/secondary username-and-password fallback (toggle or query param to reveal it) whose credentials are hardcoded via environment variables. For this first version, the panel itself is just an auth-gated placeholder page — proving the login flow works. Content management and analytics/message viewing are future scope, built on top of this once auth is in place.

## User Stories
- As the site owner, I want to reach a hidden `/admin` route and sign in with my Google account, so I don't have to remember a separate password.
- As the site owner, I want a fallback username/password login (hardcoded via env vars) in case Google login isn't available or I'm signed into the wrong Google account.
- As a site visitor, I should never see any link, button, or UI affordance pointing to `/admin` — it's undiscoverable except by direct URL.

## Requirements
- Add a route at `/admin` with no navbar link, button, or any other UI reference to it anywhere on the site.
- `/admin` is auth-gated: unauthenticated visitors are redirected to a login view (not the panel content).
- Primary login: "Sign in with Google" (OAuth) — successful login grants access to `/admin`.
- Secondary/fallback login: a username + password form, hidden by default (shown via a toggle or query param), checked against credentials hardcoded in environment variables (not stored in a database).
- Once authenticated (either method), `/admin` renders a simple placeholder page confirming the logged-in state — no real admin features yet.
- Session/auth state persists across page reloads (standard session/cookie behavior) until logout or expiry.

## Non-Goals
- No multi-user support, roles, or permissions — single admin (site owner) only.
- No mobile-specific admin UI — desktop-only is acceptable for this version.
- No actual content-management or analytics/message-viewing features yet — that's future work once auth lands.

## Acceptance Criteria
- [ ] No link, button, or visible UI element anywhere on the site points to `/admin`.
- [ ] Visiting `/admin` while logged out shows a login screen, not admin content.
- [ ] "Sign in with Google" successfully authenticates and lands the user on the `/admin` placeholder page.
- [ ] The hidden username/password fallback form is reachable (via toggle or query param) and authenticates correctly against env-var-defined credentials.
- [ ] After login (either method), reloading `/admin` keeps the user authenticated (no re-login required until session expiry/logout).
- [ ] Logging out (or session expiry) redirects back to the login screen on next `/admin` visit.

## Technical Notes
None

## Points to Keep in Mind
None
