# Feature: Hero to Service Switch Animation

- **Status:** Draft
- **Created:** 2026-10-06

## Problem / Motivation
The current hero-to-services transition looks odd. The image blurs and moves upward as it leaves, which feels wrong. (The section is also not scrollable yet, but that is a separate follow-up; the animation comes first.)

## Description
On scroll from hero to services, the hero image and the shape behind it should blur and fade into the background without moving upward. The other hero details keep moving upward as they do today. Scrolling back up from services to hero reverses the effect.

## User Stories
- As a visitor scrolling from the hero to the services section, I want the image and shape to blur and fade in place instead of drifting upward, so the transition feels smooth.

## Requirements
- Trigger is scroll.
- Hero image: keep the existing blur, add a fade-out, and remove the upward movement.
- Shape behind the image: fade out without moving.
- Scrolling up from services to hero reverses the animation (image and shape un-blur and fade back in, still without moving).
- Other hero details keep moving upward as they do now.

## Non-Goals
- Do not change the name animation.
- Do not change the text or buttons.
- Do not make the section scrollable (separate follow-up).
- Do not change anything other than the image and shape.

## Acceptance Criteria
- [ ] On scroll down, the image blurs and fades out with no vertical movement.
- [ ] On scroll down, the shape behind the image fades out with no vertical movement.
- [ ] On scroll up from services, the image and shape reverse back to their hero state.
- [ ] The name animation, text, and buttons behave exactly as before.

## Technical Notes
None

## Points to Keep in Mind
None
