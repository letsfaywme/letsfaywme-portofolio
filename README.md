# Fayakun · Portofolio

A premium interactive portfolio — built with Next.js 16, featuring WebGL ray effects, custom cursor, smooth animations, and a dark/light theme system.

**Live → [letsfaywme.my.id](https://letsfaywme.my.id)**

---

## Stack

| Area | |
|------|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion, GSAP |
| WebGL | ogl (hero rays) |
| Fonts | Syne, DM Sans, JetBrains Mono |
| Icons | React Icons |
| Email | Resend |

---

## Running Locally

```bash
npm install
npm run dev       # dev server
npm run build     # production build
npm run start     # serve production
npm run lint      # lint
```

---

## Env

```env
RESEND_API_KEY=re_xxx
```

---

## Structure

```
app/
  api/contact/        Resend email API
  components/
    layout/           Navbar, Footer
    sections/         Hero, About, Skills, Projects, etc.
    ui/               Reusable components
  hooks/              Custom React hooks
  lib/                Data & utilities
  globals.css         Global styles & CSS variables
  layout.tsx          Root layout
  page.tsx            Home page
  icon.svg            Favicon
public/               Static assets
```

---

## Credits

Designed & built by [Fayakun](https://github.com/letsfaywme).
