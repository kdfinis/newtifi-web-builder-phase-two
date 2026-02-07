# Membership2 Visual Implementation – Summary

## What Was Done

- **Reference**: Membership2 (old site) used as **visual inspiration only** — not replacing the Membership route.
- **Site-wide application**: Same patterns applied everywhere:
  - **Heroes**: Overline (`text-xs uppercase tracking-[0.35em]`) + large H1 (`font-extralight tracking-[0.12em] uppercase`), navy→teal gradient.
  - **Sections**: Section overlines + H2s `font-extralight tracking-[0.12em] uppercase`.
  - **Cards**: `rounded-2xl`, `border border-gray-200`, `shadow-sm` (no shadow-lg/border-2).
  - **Buttons**: Pill style `rounded-full text-xs uppercase tracking-[0.2em]` for primary/secondary CTAs.
  - **Inputs**: `rounded-lg`, `focus:ring-newtifi-teal/20`.
- **Typography pass**: More caps, less bold — `font-bold` → `font-extralight`/`font-light`, `font-semibold` → `font-light`, with `uppercase` + tracking on headings/labels. Global heading default in `index.css`: `font-weight: 200`, `letter-spacing: 0.05em`.
- **Scope**: All main pages, auth, dashboards, publishing/journal pages, admin, shared UI (Button, Card, Input, Textarea, Navbar, Footer, AuthModal, etc.).

## What Went Well

- Single reference (Membership2), consistent patterns, no new global theme.
- Full coverage; build passes.

## Watch Out For

- **Over-light typography**: Tables, stats, or dense UI might need a local override (e.g. `font-semibold` or normal case) if something feels too light.
- **Global h1–h6 rule** in `index.css` — override with a class on specific headings if needed.
- **Accessibility**: Extralight + all-caps can be harder for some users; consider reverting to `font-light` for long copy or critical labels if feedback suggests it.

## Quick Reference

- **Typography utilities** (in `src/index.css`): `.overline`, `.heading-hero`, `.heading-section`, `.heading-card`, `.label-caps`, `.section-title`.
- **Reference file**: `src/pages/Membership2.tsx` (do not wire route to it; use as visual reference only).
