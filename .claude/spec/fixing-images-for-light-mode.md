# Feature: Fixing images for light mode

- **Status:** Draft
- **Created:** 2026-10-05

## Problem / Motivation
Images are far too dark in the light theme, so the face in the image is not visible.

## Description
Apply image filters (e.g. brightness) in light mode only, to lighten the images so they are clearly visible.

## User Stories
- As a visitor using light mode, I want to clearly view the image and the face in it.

## Requirements
- The face in the image must be clearly visible in light mode.
- Lightening is done with image filters.
- Dark mode must not change; the fix is specific to light mode.

## Non-Goals
- Any change to dark mode appearance.

## Acceptance Criteria
- [ ] In light mode, the face in the image is clearly visible (verified manually).
- [ ] Dark mode looks identical to before (verified manually).

## Technical Notes
None

## Points to Keep in Mind
None
