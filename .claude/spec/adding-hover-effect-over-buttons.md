# Feature: Adding Hover Effect Over Buttons

- **Status:** Draft
- **Created:** 2026-10-06

## Problem / Motivation
Buttons across the website are styled inconsistently. A single reusable button component will make them consistent and give them a uniform hover effect.

## Description
Create a general-purpose, reusable Button component with configurable label, colors, hover colors (for both dark and light mode), and style variant (outline or filled). Replace the existing ad-hoc buttons on the website with it.

## User Stories
- As a visitor, I want buttons to look and behave consistently (including a hover effect) so the site feels cohesive and the experience is better.
- As the site owner, I want one reusable button component so future buttons stay consistent without duplicated styling.

## Requirements
- Reusable Button component with props:
  - `onClick` — click handler
  - `label` — button text
  - `color` and `hoverColor` — dark mode colors
  - `lightModeColor` and `lightModeHoverColor` — light mode colors
  - `variant` — styling: `outline` or `filled`
  - `href` — renders as a link when provided
  - `type`, `disabled`, `className`
  - `icon` (optional)
- Works in both light and dark mode.
- Replace the existing buttons with the new component:
  - Resume
  - View my work
  - GitHub link
  - Live link
  - Hire me
- Keep the current design and make no major visual changes, so design consistency is preserved.
- GitHub link and live link keep their current border radius.

## Non-Goals
- Major redesign of button visuals.
- Changing the border radius of the GitHub link and live link buttons.
- Replacing buttons other than Resume, View my work, GitHub link, Live link and Hire me.

## Acceptance Criteria
- [ ] Button component exists and accepts all the props listed above.
- [ ] Resume, View my work, GitHub link, Live link and Hire me buttons use the component.
- [ ] Hover visibly changes the color in both light and dark mode.
- [ ] Both `outline` and `filled` variants render correctly.
- [ ] GitHub and live link buttons keep their current border radius.
- [ ] Verified manually by the user.

## Technical Notes
None. The color format (Tailwind classes, CSS variables or hex) and the component location (e.g. `src/components/Button.tsx`) are left to implementation.

## Points to Keep in Mind
None
