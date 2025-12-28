# ZONEX - Premium Navy Blue + Light Grey Design System

A modern, engineering-grade website built with Next.js, TypeScript, and Framer Motion, featuring a sophisticated navy blue and light grey color palette.

## Design Philosophy

- **Feel**: Engineering-grade, corporate confidence, longevity, precision
- **Look**: Clean, architectural, structured, timeless
- **Mood**: Calm power (not aggressive, not startup-ish)

## Color System

### Primary Palette
- **Navy Blue**: Deep, elegant, slightly desaturated backgrounds
- **Light Grey**: Clean, airy, architectural surfaces
- **White**: Text and negative space
- **Steel Blue Accent**: Controlled industrial accent (#2F80ED)

### Color Tokens
All colors are defined as CSS variables in `app/globals.css`:
- `--navy-900`: #0B1C2D (main background)
- `--navy-800`: #12263A (section background)
- `--navy-700`: #1A3550 (hover / depth)
- `--grey-100`: #F4F6F8 (light sections)
- `--grey-200`: #E6E9ED (cards, surfaces)
- `--accent`: #2F80ED (steel blue)

## Typography

- **Display**: Sora (headlines, big numbers, hero titles)
- **Body**: Inter (paragraphs, UI, forms)
- **Mono**: JetBrains Mono (labels, stats, metadata, project specs)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Zonex/
├── app/
│   ├── globals.css      # Design tokens and global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Navigation.tsx   # Navbar with scroll effects
│   ├── Hero.tsx         # Hero section with Z monogram
│   ├── Projects.tsx     # Project showcase
│   ├── About.tsx        # About section
│   └── Footer.tsx       # Footer with watermark
└── package.json
```

## Features

- ✅ Premium Navy Blue + Light Grey design system
- ✅ Engineering-grade typography (Sora, Inter, JetBrains Mono)
- ✅ Animated Z monogram line-draw
- ✅ Section reveals with fade + vertical motion
- ✅ Grid overlay on navy sections
- ✅ Subtle noise texture across site
- ✅ Project cards with technical overlays
- ✅ Responsive design
- ✅ Smooth animations with Framer Motion

## Build

```bash
npm run build
```

## Design Principles

- Accent color used sparingly (5-8% of UI max)
- White space and hierarchy do the heavy lifting
- Everything feels "built", not "decorated"
- Alternating navy and light grey sections for visual rhythm



