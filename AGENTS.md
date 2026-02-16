# AGENTS.md

## Purpose

Guardrails for AI coding agents working in this repository.

## Operating Mode

- Autonomy: implement directly.
- Ask for approval only before risky changes.
- Share short progress updates with a brief reason.

## Risky Changes (Ask First)

- Deleting files, major refactors, destructive git actions.
- Changes to `next.config.ts` or `tailwind.config.ts`.
- Deployment config changes (for example: Vercel, Netlify, deploy workflows).
- Dependency major-version upgrades.
- SEO metadata changes, `manifest.json`, or PWA/service worker behavior.
- Environment variable or API key handling (`.env*`).
- Routing structure changes.

## Dependency Policy

- Allowed without asking: patch/minor updates for existing dependencies.
- Ask first: adding new packages or major dependency upgrades.

## UI/Brand Stability (Do Not Change Unless Requested)

- Blue/black/white color palette.
- Typography and font choices.
- Overall layout structure and spacing.
- Animations and transitions.
- Responsive breakpoints.
- Logo and branding elements.

## Scope Boundaries (Approval Required)

- `public/Pwa-logos/**`
- Manifest files (including `public/manifest*.json`)
- Service worker assets/config (`public/sw.js`, `public/workbox-*.js`)
- `next.config.ts`
- Deployment configs (`vercel.json`, `netlify.toml`, deploy workflow files)
- `.env*` files
- `package.json` when adding new dependencies

## Required Checks Before Marking Done

- `npm run build` (required)
- `npm run lint` (required when ESLint is configured)
- `npx tsc --noEmit` (recommended for TypeScript-heavy changes)

## Git Workflow

- Create a commit after each completed task.
- Use Conventional Commits.
- Examples:
  - `feat: add dark mode toggle`
  - `fix: resolve mobile nav overflow`
  - `style: update hero section spacing`

## Communication Style

- Keep updates short.
- Include a brief reason for key decisions.
- In final summaries, include:
  - what changed
  - checks run and results
  - any risks or approvals requested
