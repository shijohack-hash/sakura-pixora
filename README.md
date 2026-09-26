# Pixora — AI-Powered Product Media Studio

Built for **Pixels to Products — Cloudinary AI Hackathon 2026**.

## What's in this build (Phase 1 + 2)

- Full design system: colors, type, spacing, buttons, cards — as Tailwind tokens in `tailwind.config.ts` and `app/globals.css`.
- Landing page (`app/page.tsx`): hero with a draggable before/after slider, workflow steps, feature grid, "one image → full kit" showcase, CTA, footer.
- Dashboard (`app/dashboard`): sidebar nav, quick actions, recent projects grid, storage widget, pro-tip card.
- `lib/cloudinary.ts`: the service-layer abstraction the real Cloudinary integration (Phase 4) will fill in. It throws clear errors instead of faking success, so the UI's existing error states get exercised honestly.

## Run it

```bash
cd pixora
npm install
npm run dev
```

Then open **http://localhost:3000** for the landing page, and **http://localhost:3000/dashboard** for the dashboard.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Cloudinary setup (for Phase 4)

Copy `.env.example` to `.env.local` and fill in your values from the [Cloudinary console](https://console.cloudinary.com):

```bash
cp .env.example .env.local
```

## Project structure

```
app/
  layout.tsx          root layout, fonts (Instrument Sans + Inter)
  page.tsx             landing page
  dashboard/
    layout.tsx         sidebar + topbar shell
    page.tsx            dashboard home
components/
  Logo.tsx
  BeforeAfterSlider.tsx
  marketing/           landing page sections
  dashboard/            sidebar, quick actions, project card, widgets
lib/
  cloudinary.ts         Cloudinary service layer (Phase 4 target)
```

## Roadmap (remaining phases)

3. Upload workspace + drag-and-drop zone
4. Real Cloudinary integration (uploads, background removal, transforms)
5. Background remover editor page
6. AI background / AI scene generation
7. Smart resize + multi-format export
8. Projects + asset library (search, filters, grid/list)
9. Bulk editor, responsive polish, empty/loading/error states everywhere
10. Deployment + demo run-through

## Design direction

White/off-white surfaces, deep navy for structure and dark sections, a single teal accent used deliberately (primary actions, active states) rather than washed across every card. No purple gradients, no glassmorphism, no generic AI-app chrome.
