# Symbiosys Technologies — Corporate Website

A premium, highly-interactive corporate website for **Symbiosys Technologies**, built as a modern single-page experience with cinematic animations, glassmorphism, and a brand-aligned design system.

> Inspired by the polish of award-winning agency sites — **not copied**. The design, layout, copy, and interactions are original to Symbiosys Technologies.

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** (custom brand design system)
- **Framer Motion** — scroll reveals, carousels, layout animations, text reveals
- **Three.js** — animated 3D network of glowing nodes in the hero (lazy-loaded)
- **Lenis** — buttery smooth scrolling
- **React Icons** — iconography

## Brand & Design System

| Token | Value |
| --- | --- |
| Deep Navy | `#062B45` |
| Royal Blue | `#0A4D80` |
| Orange | `#F58220` |
| Yellow | `#FFC107` |
| Green | `#7BC043` |
| Cyan | `#00B5E2` |

- Fonts: **Space Grotesk** (display) + **Plus Jakarta Sans** / **Inter** (body)
- Logo faithfully recreated as SVG in `src/components/Logo.tsx` (unchanged in form & colour), favicon in `public/logo-mark.svg`
- Reusable primitives in `src/components/ui/` (Reveal, Counter, MagneticButton, SectionHeading)

## Sections

Hero · About (timeline, mission/vision/values, stat counters) · Services (10 cards, 3D tilt) · Why Choose Us · Technologies (15 tools) · Portfolio (filterable) · Industries · Testimonials (carousel) · Process (7-step timeline) · Careers · Contact (floating-label form + map) · Footer (newsletter, social, animated divider)

## Getting Started

```bash
npm install
npm run dev      # start dev server -> http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Notes

- The Three.js hero and all major motion respect `prefers-reduced-motion`.
- The Three.js bundle is code-split and lazy-loaded so it never blocks first paint.
- Contact form and newsletter are front-end only (wire them to your backend / email service).
- The map iframe points to Visakhapatnam — update `src` in `src/components/Contact.tsx` with your exact address embed.
