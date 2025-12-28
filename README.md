# CreateVyral — Where Influence Becomes Impact

CreateVyral is an influencer marketing marketplace connecting brands, creators, and learners. Built with React, Vite and Tailwind CSS, this repository contains a production-ready starter for an ultra-premium platform (design system, pages, dashboards, and seeded sample data).

Quick Links
- Website: (local dev) http://localhost:5173 (Vite default) or http://localhost:5174 (fallback)
- Repo branch: `rebrand/createvyral-v1`
- Backup tag: `backup/pre-rebrand-20251228`

Getting started (local development)

1. Install dependencies

```bash
npm ci
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

Project Structure Highlights
- src/Components — UI and page components (cards, dashboard widgets, promos)
- src/Pages — All pages (Landing, Onboarding, Home, Search, Campaigns, Courses, Dashboards)
- src/Entities — Data models (Creator, Influencer, Campaign, ServiceRequest)
- src/Components/ui — Design system building blocks (Button, Input, Label, GlassCard, AnimatedGradientBg, FusionLogo, etc.)
- src/Components/data — Seed data (sample creators, influencers, courses, campaigns)

Design & Brand
- Tagline: **Where Influence Becomes Impact**
- Logo: https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f0f1978791959e9444ac5/a976ca7d4_image.png
- Color system and visual tokens are configured in `tailwind.config.js` (primary gradient: #ec4899 → #8b5cf6 → #3b82f6)

Development Notes
- Uses Base44 SDK stubs/integration for auth and file uploads (see `src/api/base44Client.js`).
- Animations are implemented with Framer Motion.
- Charts use Recharts.
- Routing via React Router DOM.

How you can contribute
- Work on an item from the todo list in the `rebrand/createvyral-v1` branch.
- Open a PR back to `main` when ready and include a brief description of changes and screenshots for UI work.

Deployment
- Recommended: Vercel or Netlify. Ensure environment variables required for Base44 SDK are set in the deployment settings.

License & Contact
- MIT License (change as needed)
- For access or collaboration, open issues or PRs on GitHub.

---

This repository is actively being rebranded to CreateVyral. If you need help running the app locally, or want me to continue implementing pages and the full design system, tell me which features to prioritize next (Landing, Onboarding flows, or Dashboards).
