# Feature: Vertical Side Navbar

- **Status:** Draft
- **Created:** 2026-09-05

## Problem / Motivation
The portfolio site currently has no navigation component at all. Visitors scrolling through the single-page layout (intro, "How I Can Help", skills, work, about) have no persistent way to see where they are or jump directly to a section.

## Description
A fixed, vertical navigation list positioned on the right edge of the viewport, vertically centered — matching the provided reference image: dark background, each item shown as a label plus a small dot indicator, with the active section's link highlighted in indigo (filled dot + colored text) and inactive links shown muted/gray. The nav integrates with the site's existing custom GSAP `ScrollTrigger`-based scroller (not native window scroll) both to smooth-scroll to a section on click and to update the active link as the user scrolls (scroll-spy).

The existing fixed `ThemeToggle` button (`top-4 right-4`) is left exactly as-is — this spec does not move, restyle, or otherwise touch it. The new nav must be positioned so it does not overlap it.

Per the reference image, the nav lists: Home, Services, Skills, Work, About. **Contact is intentionally excluded** — there is no dedicated Contact section in the codebase yet, and building one is out of scope for this spec.

## User Stories
- As a visitor, I want a persistent nav so I can quickly jump to any section of the portfolio without scrolling manually.
- As a visitor, I want the nav to show which section I'm currently viewing, so I always know where I am on the page.
- As a visitor, I want the theme toggle to stay easily reachable and visually consistent with the rest of the nav.

## Requirements
- Fixed vertical nav list, right-aligned, vertically centered in the viewport, visible at all scroll positions.
- Renders one entry per section: Home, Services, Skills, Work, About (Contact omitted for now).
- Each entry shows a label and a dot indicator, styled per the reference image (dark background, indigo active state with filled dot; muted/gray inactive state).
- Clicking an entry smooth-scrolls the app's custom GSAP scroller to the corresponding section.
- The active entry updates automatically via scroll-spy as the user scrolls through sections (driven by the existing `ScrollTrigger` setup, consistent with how section animations are already triggered).
- `ThemeToggle` is left untouched (no repositioning, restyling, or code changes); the new nav must be laid out so it doesn't overlap it.
- Visual styling (colors, fonts) is consistent with the existing theme tokens (`--color-primary`, `--color-secondary`, `text-fortext`, the indigo accent introduced in the recent theme commit) and fonts (`sora`, `workSans` from `@/utils/font`).

## Non-Goals
- No new Contact section/anchor — the Contact link is left out of the nav until a Contact section exists (separate future task).
- No deep GSAP/animation polish on the nav itself beyond basic active-state transitions and smooth-scroll-to-section.
- Final responsive/mobile treatment (same vertical nav vs. a different mobile pattern) is not decided in this spec — see Technical Notes.
- No changes to `ThemeToggle` (position, styling, or behavior) — it stays exactly as it is today.

## Acceptance Criteria
- [ ] Nav is fixed, right-aligned, and vertically centered, and stays visible while scrolling through every section.
- [ ] Nav lists exactly: Home, Services, Skills, Work, About — each with a label and dot indicator matching the reference image style.
- [ ] The entry for the section currently in view is visually distinguished (indigo text + filled dot); all other entries are muted.
- [ ] Clicking any nav entry scrolls the custom GSAP scroller to that section (not a native jump/reload).
- [ ] `ThemeToggle` is unchanged (still `top-4 right-4`, same styling/behavior) and does not overlap the new nav.
- [ ] Existing section content, layout, and GSAP animations show no visual regressions.
- [ ] Nav renders correctly in both light and dark theme.

## Technical Notes
- Section elements already exist with class `.page-section`; some already have ids usable as scroll targets (`#offer-parent` = Services, `#skill-parent` = Skills, `#work` = Work). The intro section (Home) and the About Me section currently lack explicit ids — these will need ids added as anchor targets.
- Scrolling is driven by a custom container (`scrollPageRef` in `ClientWrapper.tsx`) with GSAP `ScrollTrigger` configured via `scroller: containerElement`, not native window scroll. Both the nav's click-to-scroll and its scroll-spy active-state logic must integrate with this custom scroller (e.g. GSAP's `ScrollToPlugin`/`ScrollTrigger` against the same scroller ref) rather than `window.scrollTo` or a window-based `IntersectionObserver`.
- `ThemeToggle.tsx` is currently `fixed top-4 right-4 z-50` and rendered globally in `layout.tsx`. It stays exactly as-is (no repositioning, restyling, or code changes) — the new nav is a separate fixed element and must be laid out to avoid colliding with it.
- Responsive behavior (same vertical nav on mobile vs. a different mobile pattern) is an open decision — default to keeping the same vertical nav unless it proves unusable on small screens; revisit during implementation.

## Completion Checklist
- [ ] All requirements above are implemented
- [ ] All acceptance criteria pass
- [ ] Edge cases and error states are handled
- [ ] Automated tests cover the new behavior (unit/integration as appropriate)
- [ ] Existing functionality has no regressions
- [ ] Code has been reviewed
- [ ] Relevant documentation updated
- [ ] Verified against the reference image in both light and dark theme
- [ ] Scroll-spy and click-to-scroll confirmed working against the app's custom GSAP `ScrollTrigger` scroller, not just native window scroll
