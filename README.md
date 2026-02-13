# Quad Ride - Premium Motorcycle Rental & Tourism Frontend

Mobile-first luxury frontend built with Next.js App Router, Tailwind CSS, Framer Motion, React Hook Form, and Zod.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Custom i18n (JSON dictionaries + locale routing)

## i18n

- Default locale: French (`fr`)
- Secondary locale: English (`en`)
- Locale routing:
  - `/fr`
  - `/en`
- Dictionaries:
  - `messages/fr.json`
  - `messages/en.json`
- Language switcher in navbar preserves current page path.

## Main pages

- `/:locale` Home
- `/:locale/catalog` Activity catalog
- `/:locale/activity/:slug` Activity details + reservation form
- `/:locale/payment` Mobile Money payment placeholder
- `/:locale/confirmation` Reservation confirmation

## User flow

Home -> Catalog -> Activity Details -> Reservation -> Mobile Money Payment -> Confirmation

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (automatically redirected to `/fr`).
