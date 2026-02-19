# Driss Laaziri Portfolio

A modern, animated portfolio website built with Next.js and TypeScript to showcase experience, projects, and technical skills.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [EmailJS Setup Notes](#emailjs-setup-notes)
- [Available Scripts](#available-scripts)
- [Deployment on Vercel](#deployment-on-vercel)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

## Overview

This project is a personal portfolio built with the Next.js App Router. It includes:

- A polished single-page experience with dedicated sections for Hero, About, Skills, Experience, Projects, and Contact.
- A dynamic project details page (`/projects/[id]`) for deeper project case studies.
- Resume download support through an API route.
- PWA support via service worker integration.

## Features

- Responsive design for desktop, tablet, and mobile.
- GSAP-powered motion and reveal animations.
- Dynamic project showcase with reusable data-driven cards.
- Contact form integration using EmailJS.
- Optional auto-reply email flow for contact submissions.
- Resume download endpoint at `/api/resume`.
- Progressive Web App support with `@ducanh2912/next-pwa`.

## Tech Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- UI: React 18
- Styling: Tailwind CSS
- Animations: GSAP, Lottie, React Parallax Tilt
- Contact delivery: EmailJS
- Icons: Lucide React, React Icons
- Code quality: ESLint, Prettier, Husky

## Project Structure

```text
Personal-Portfolio-Website/
|-- public/
|   |-- Driss_Laaziri.pdf
|   |-- lottie/
|   |-- projects/
|   |-- svg/
|   |-- sw.js
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   |-- resume/route.ts
|   |   |-- components/
|   |   |-- projects/
|   |   |   |-- [id]/page.tsx
|   |   |-- layout.tsx
|   |   |-- page.tsx
|-- utils/
|   |-- Data/
|   |   |-- PersonalData.ts
|   |   |-- projects-data.ts
|-- next.config.ts
|-- tailwind.config.ts
|-- package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/idriss112/personal-portfolio.git
cd personal-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create local environment file

Create a `.env.local` file in the project root using the variables below.

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Environment Variables

Add these variables to `.env.local` (local) and Vercel Project Settings (production):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TO_NAME=Driss Laaziri
NEXT_PUBLIC_EMAILJS_REPLY_TO=idrisslaaziri@gmail.com
```

## EmailJS Setup Notes

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` are required.
- `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID` is optional, but needed if you want confirmation emails back to users.
- In EmailJS, allowlist your deployment domains (Vercel URL and custom domain if used).
- After changing Vercel environment variables, redeploy the project.

## Available Scripts

- `npm run dev`: Start local development server.
- `npm run build`: Create production build.
- `npm run start`: Run production build locally.
- `npm run lint`: Run ESLint checks.
- `npm run format`: Format files with Prettier.

## Deployment on Vercel

1. Push the latest code to GitHub.
2. Import the repository in Vercel.
3. Add all `NEXT_PUBLIC_EMAILJS_*` variables in Project Settings -> Environment Variables.
4. Redeploy after adding/updating variables.
5. Test:
   - Contact form submission
   - Resume download (`GET RESUME`)
   - Project details pages

## Troubleshooting

- Contact form does not send:
  - Confirm all required EmailJS env vars exist in Vercel.
  - Redeploy after updating variables.
  - Check EmailJS domain allowlist.
- Resume downloads an old file:
  - Hard refresh (`Ctrl+F5`) due PWA/service worker cache.
  - Ensure `public/Driss_Laaziri.pdf` is updated and pushed.

## Author

Driss Laaziri

- GitHub: https://github.com/idriss112
- LinkedIn: https://www.linkedin.com/in/idrisslzr/
- Email: idrisslaaziri@gmail.com
