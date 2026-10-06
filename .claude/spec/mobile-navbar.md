# Feature: Mobile Navbar

- **Status:** Draft
- **Created:** 2026-09-05

## Problem / Motivation
The existing `SideNav` (fixed right-side, vertically-centered, label + dot per section, indigo active state) was built and shipped for desktop and currently renders identically at every screen size. On mobile it's unusable — the text labels are too cramped next to the fixed `ThemeToggle` button and against the narrower viewport.

## Description
Below the `md` (768px) breakpoint, `SideNav` switches to a mobile-specific presentation combining two pieces:
1. The same fixed, vertically-centered dot column stays on screen at all times, but with labels hidden — dots only, still clickable to jump to a section and still reflecting the currently active section.
2. A hamburger icon, fixed directly below `ThemeToggle` in the top-right corner, opens a full-screen overlay menu listing all section labels (Intro, Services, Skills, Work, About). Tapping a label closes the overlay and scrolls to that section. The currently active section is highlighted in this overlay too.

At `md` and above, behavior is unchanged from the already-shipped desktop `SideNav` (full label + dot list, no hamburger, no overlay).

## User Stories
- As a mobile visitor, I want a small always-visible indicator of which section I'm in and a quick way to jump between sections, without labels crowding the screen.
- As a mobile visitor, I want a way to see all section names at once (not just dots) and tap directly to the one I want.
- As a mobile visitor, I want the current section to stay visually highlighted whether I'm looking at the dots or the open menu.

## Requirements
- Below the `md` (768px) breakpoint, `SideNav`'s existing label+dot list hides its text labels, showing dots only, in the same fixed right-side vertically-centered position as desktop.
- Dots-only mode keeps existing click-to-scroll and active/inactive dot styling (indigo filled dot for the active section, muted for others) exactly as already implemented.
- A hamburger icon button appears below the `md` breakpoint, fixed in the top-right corner directly below `ThemeToggle` (`top-4 right-4`, untouched) — i.e. roughly `top-16 right-4`, not overlapping it.
- Tapping the hamburger opens a full-screen overlay listing all five section labels (Intro, Services, Skills, Work, About).
- The overlay highlights the current section's label (reusing the same active-section state already computed by `SideNav`'s scroll-spy) exactly as the desktop nav does.
- Tapping a label in the overlay closes the overlay and smooth-scrolls to that section (reusing the existing click-to-scroll logic).
- The overlay has its own close affordance (tapping the hamburger again, an explicit close icon, or a tap outside the list) so it doesn't only close via selecting a section.
- At `md` and above, nothing changes from the currently shipped desktop behavior: full label+dot nav, no hamburger, no overlay rendered.

## Non-Goals
- No changes to desktop nav behavior — the already-shipped `SideNav` experience at `md` and above stays exactly as-is.
- No new Contact section/link — same exclusion as the desktop spec; Contact stays out until a Contact section exists.
- No deep animation/motion polish on the overlay open/close beyond a basic show/hide transition.

## Acceptance Criteria
- [ ] Below 768px width, the nav shows dots only (no text labels) in the same fixed, vertically-centered position as desktop.
- [ ] Below 768px width, a hamburger icon is fixed at the top-right, directly below `ThemeToggle`, with no visual overlap between the two.
- [ ] Tapping the hamburger opens a full-screen overlay listing Intro, Services, Skills, Work, About.
- [ ] The dot column and the overlay both highlight whichever section is currently in view, staying in sync with each other and with the scroll position.
- [ ] Tapping a label in the overlay closes it and smooth-scrolls to that section.
- [ ] The overlay can be closed without selecting a section (re-tapping the hamburger, a close icon, or tapping outside the list).
- [ ] At 768px and above, the page is pixel-identical to the current shipped desktop nav (no hamburger, no overlay, labels visible).
- [ ] `ThemeToggle` is unchanged and never overlapped by the hamburger icon or the overlay's own close affordance.

## Technical Notes
- Breakpoint: use the project's existing custom Tailwind breakpoint `md:768px` (already defined in `globals.css`'s `@theme inline`, already used elsewhere in the codebase) rather than introducing a new one.
- Reuse `SideNav.tsx`'s existing `activeId` state (from its scroll-spy `useEffect`) as the single source of truth for both the dots-only column and the overlay's highlighted label — do not duplicate scroll-spy logic.
- Reuse the existing `handleClick(id)` click-to-scroll function for the overlay's tap-to-navigate links.
- Hamburger and overlay likely belong inside `SideNav.tsx` itself (or a small sibling component it renders), conditionally shown via the same breakpoint, so there's one component owning nav state instead of two nav implementations drifting apart.
- `ThemeToggle.tsx` remains untouched per the desktop spec's constraint — the hamburger is a separate fixed element positioned to sit directly below it without modifying `ThemeToggle.tsx`.
