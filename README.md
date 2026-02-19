# Driss Laaziri - Personal Portfolio

A modern full-stack style portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS. The project showcases professional experience, selected projects, technical skills, and a production-ready contact workflow.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000)](https://vercel.com/)

## Table of Contents

- [Overview](#overview)
- [Key Highlights](#key-highlights)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoint](#api-endpoint)
- [Security and Reliability Notes](#security-and-reliability-notes)
- [Deployment](#deployment)
- [Manual Test Checklist](#manual-test-checklist)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Author](#author)
- [Support](#support)

## Overview

This repository contains the source code for Driss Laaziri's portfolio website. It is designed as a high-performance single-page experience with dedicated sections for hero content, about summary, skills, experience, projects, and contact.

The project also includes:

- Dynamic project detail pages using route params.
- A downloadable resume flow served from an API route.
- Client-side EmailJS integration for contact submissions.
- PWA support via generated service worker files.

## Key Highlights

- Built with Next.js 15 App Router and TypeScript.
- Data-driven content using centralized `utils/Data/*` files.
- GSAP and Lottie integrations for motion-rich UI.
- Contact form with optional auto-reply email support.
- Resume download endpoint (`/api/resume`) with explicit PDF response headers.
- Production deployment optimized for Vercel.

## Features

### Landing and Navigation

- Sticky top navigation for smooth section access.
- Animated hero section with social links and CTA buttons.
- Scroll-based reveal effects across major sections.

### About, Skills, and Experience

- Structured personal summary and value proposition.
- Visual skill presentation with icon mapping.
- Timeline-like experience content driven by data files.

### Project Showcase

- Project cards on the home section.
- Dedicated projects listing page.
- Dynamic detail route at `/projects/[id]`.
- Highlights, gallery carousel, tools list, and role metadata per project.

### Contact Workflow

- Contact form with client-side validation.
- Email delivery through EmailJS SDK.
- Optional auto-reply flow for visitor confirmation emails.
- User feedback through success/error toasts.

### Resume Delivery

- `GET RESUME` button points to `/api/resume`.
- API route serves `public/Driss_Laaziri.pdf` as a downloadable file.

### Progressive Web App

- PWA integration through `@ducanh2912/next-pwa`.
- Service worker generation for caching/static asset behavior.
- Manifest route present for installable web-app metadata.

## Tech Stack

### Frontend

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- React Icons

### Motion and UI Enhancements

- GSAP
- Lottie React
- React Parallax Tilt
- Embla Carousel

### Contact and Integrations

- EmailJS Browser SDK

### Tooling

- ESLint
- Prettier
- Husky

## Architecture

```text
Personal-Portfolio-Website/
|-- public/
|   |-- Driss_Laaziri.pdf
|   |-- projects/
|   |-- lottie/
|   |-- svg/
|   |-- sw.js
|   |-- workbox-*.js
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   |-- resume/route.ts
|   |   |-- components/
|   |   |   |-- hero-section/
|   |   |   |-- about/
|   |   |   |-- skills/
|   |   |   |-- experience/
|   |   |   |-- projects/
|   |   |   |-- contact/
|   |   |-- projects/
|   |   |   |-- [id]/page.tsx
|   |   |-- layout.tsx
|   |   |-- page.tsx
|   |-- components/ui/
|-- utils/
|   |-- Data/
|   |   |-- PersonalData.ts
|   |   |-- projects-data.ts
|   |   |-- skills.ts
|   |   |-- experience.ts
|-- next.config.ts
|-- tailwind.config.ts
|-- package.json
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or Node.js 20+ recommended)
- npm
- Git

### Installation

1. Clone the repository.

```bash
git clone https://github.com/idriss112/personal-portfolio.git
cd personal-portfolio
```

2. Install dependencies.

```bash
npm install
```

3. Create `.env.local` in the project root.

4. Run the development server.

```bash
npm run dev
```

5. Open `http://localhost:3000`.

### Build and Lint

```bash
npm run lint
npm run build
```

## Environment Variables

Add the following variables in `.env.local` and in Vercel Project Settings.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TO_NAME=Driss Laaziri
NEXT_PUBLIC_EMAILJS_REPLY_TO=idrisslaaziri@gmail.com
```

Notes:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` are required.
- `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID` is optional but required for auto-reply behavior.
- Because these are `NEXT_PUBLIC_*` values, redeploy is required after changes on Vercel.

## API Endpoint

### `GET /api/resume`

Purpose:
Serves the resume file from `public/Driss_Laaziri.pdf`.

Behavior:

- Returns `application/pdf`.
- Forces file download with `Content-Disposition`.
- Returns `404` if file is missing.

## Security and Reliability Notes

- Contact form input is validated on the client before sending.
- API route for resume delivery handles missing-file fallback safely.
- PWA cache can serve stale assets after deployment; perform a hard refresh when validating critical updates.
- EmailJS production setup must include domain allowlisting for deployed domains.

## Deployment

### Vercel

1. Push latest code to GitHub.
2. Import repository in Vercel.
3. Add all required `NEXT_PUBLIC_EMAILJS_*` variables.
4. Deploy.
5. In EmailJS dashboard, allowlist your Vercel domain and any custom domain.
6. Redeploy if environment variables were added or changed.

## Manual Test Checklist

- [ ] Homepage renders correctly on desktop and mobile.
- [ ] Section navigation links scroll to correct sections.
- [ ] Projects list and project details pages load without errors.
- [ ] Contact form blocks invalid input and submits valid input.
- [ ] EmailJS receives messages in production.
- [ ] Auto-reply works when auto-reply template ID is configured.
- [ ] `GET RESUME` downloads the latest PDF.
- [ ] PWA behavior does not serve stale critical assets after deployment.

## Future Improvements

- Add server-side contact endpoint to reduce reliance on public client keys.
- Add integration tests for form submission flow.
- Add analytics event tracking for CTA clicks and resume downloads.
- Improve SEO metadata consistency and social preview assets.
- Add multilingual content support.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit changes with clear messages.
4. Push branch and open a pull request.

## Author

Driss Laaziri

- GitHub: https://github.com/idriss112
- LinkedIn: https://www.linkedin.com/in/idrisslzr/
- Email: idrisslaaziri@gmail.com

## Support

If you find an issue, open a GitHub issue in this repository.

For direct contact, email: idrisslaaziri@gmail.com
