# Feature: Fixing image updates on theme switch

- **Status:** Draft
- **Created:** 2026-10-05

## Problem / Motivation
When switching from light to dark, the images stay lightened; when switching from dark to light, the images stay darkened. The images don't pick up the brightness level of the new theme.

## Description
When the theme is switched (light to dark or dark to light), the images should update to the brightness level defined for that theme.

## User Stories
- None specified

## Requirements
- Fix the issue above: images must reflect the correct brightness for the active theme immediately after switching.
- There may be a component reload issue; the fix may need to reload/re-render the images.

## Non-Goals
- None specified

## Acceptance Criteria
- [ ] None specified

## Technical Notes
None

## Points to Keep in Mind
None
