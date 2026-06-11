# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `npm run dev` - Starts Vite dev server with HMR. Accessible at http://localhost:5173
- **Build**: `npm run build` - Compiles TypeScript and bundles with Vite for production
- **Type check**: `npm run typecheck` - Run TypeScript compiler in check-only mode (useful for pre-commit validation)
- **Lint**: `npm run lint` - Run ESLint on all TypeScript/TSX files
- **Preview**: `npm run preview` - Preview production build locally

## Architecture Overview

This is a TypeScript + React + Vite portfolio site using React Router for multi-page navigation.

### Core Stack
- **UI Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **3D Rendering**: Three.js + React Three Fiber for 3D scenes
- **Animations**: GSAP (with ScrollTrigger) for timeline-based animations, Framer Motion for component-level motion, Lenis for smooth scroll physics
- **Routing**: React Router v7

### Color Palette (CSS Custom Properties)
The custom color scheme is configured in `src/index.css` using Tailwind's `@theme`:
- `--color-butter`: `#ffe600` (primary yellow accent)
- `--color-jet`: `#0a0a0a` (primary black/text)
- `--color-paper`: `#ffffff` (white)
- `--color-cyan`: `#00f5ff`, `--color-magenta`: `#ff00cc`, `--color-greenneon`: `#00ff88`, `--color-orange`: `#ff4500`, `--color-lavender`: `#d4b8ff`, `--color-mint`: `#b8ffd4`

All color values are exposed as CSS custom properties for use in both Tailwind and direct CSS.

### Project Structure

```
src/
├── pages/                     # Page components (Home, About, Works, Contact)
├── components/
│   ├── Layout/               # Layout providers & UI shells
│   │   ├── SmoothScrollProvider.tsx    # Lenis scroll context & GSAP integration
│   │   ├── Navigation.tsx              # Primary nav component
│   │   ├── CustomCursor.tsx            # Custom cursor behavior
│   │   ├── OvalLogo.tsx                # Logo component
│   ├── Three/                # Three.js/React Three Fiber components
│   │   ├── HeroObject.tsx    # Main 3D scene (Canvas-based)
│   │   ├── PointCloud.tsx    # Point cloud geometry
│   ├── Sections/             # Full-width page sections
│   │   ├── HomeSection.tsx, ExperienceSection.tsx, ProjectsSection.tsx, etc.
│   ├── Animations/           # Reusable animation components
│   │   ├── GlitchText.tsx    # Glitch effect
│   │   ├── ScrollReveal.tsx  # Scroll-triggered reveal animations
│   ├── ui/                   # Generic UI components
│   │   └── PageTransition.tsx
│   └── data/
│       └── resume.ts         # Structured resume/CV data
├── main.tsx                  # App entry (BrowserRouter, Analytics)
├── App.tsx                   # Route definitions
└── index.css                 # Tailwind imports + @theme customization
```

### Key Patterns

#### Scroll Animations (GSAP + Lenis)
- `SmoothScrollProvider` is a context provider that:
  - Creates a Lenis instance for smooth scroll physics
  - Syncs GSAP's ScrollTrigger with Lenis scroll events
  - Registers the Lenis RAF loop with GSAP's ticker
- Use `useLenis()` hook to access the scroll instance from child components
- GSAP animations use `ScrollTrigger` for scroll-linked triggers

#### 3D Scenes (React Three Fiber)
- Scenes are built with `<Canvas>` from `@react-three/fiber`
- Use `useFrame` hook for animation loops (called on every render)
- Models use Three.js material properties directly (e.g., `meshStandardMaterial`, emissive intensity)
- Post-processing effects via `@react-three/postprocessing` (e.g., ChromaticAberration)

#### Routing & Page Transitions
- Routes defined in `App.tsx` using React Router v7
- `PageTransitionOverlay` component handles transition animations between pages
- All pages are full-height sections wrapped in `SmoothScrollProvider`

### TypeScript Configuration

- **Target**: ES2022
- **Strict mode**: Enabled with `noUnusedLocals` and `noUnusedParameters`
- **Path aliases**: `@/*` resolves to `./src/*` (configured in both `tsconfig.app.json` and `vite.config.ts`)
- **Module resolution**: bundler (for ESM)

### ESLint Rules

- Extends `@eslint/js`, `typescript-eslint`, and React plugin configs
- Custom rule: unused variables matching uppercase or underscore patterns (`^[A-Z_]`) are ignored (useful for intentionally unused exports, component props)

### Styling Notes

- Tailwind v4 is integrated via the Vite plugin (no `tailwind.config.ts` needed if using `@theme`)
- Custom fonts are loaded via Google Fonts in `index.html`
- Use CSS custom properties for theming (especially colors defined in `@theme`)
- Tailwind class aliases are defined in `@theme` (e.g., `--color-primary` maps to jet black)

### Analytics

Vercel Analytics is integrated in `main.tsx` and automatically tracks page views and interactions.

## Conversion Notes

This codebase was recently converted from JavaScript to TypeScript. Some files were deleted during the conversion:
- Old JSX components (replaced by TSX equivalents)
- Old Vite config (replaced by TS version)
- jsconfig.json (replaced by tsconfig.json)

The new TS structure maintains the same component organization and patterns.
