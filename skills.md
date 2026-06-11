# skills.md — Portfolio UI Build Instructions
> For Claude Code (Opus) building Yash's portfolio.
> Stack: Vite + React + TypeScript. Always read design.md alongside this file.
> Mode: REFACTOR — the single-page site already exists. Do NOT rebuild from scratch.

---

## Context

The portfolio is already built as a single-page React + TypeScript + Vite app with the yellow/black buttermax-inspired design. The task is to **split it into multiple pages** using React Router and wire up the buttermax-style yellow panel page transition between every route.

Do not touch or rewrite existing styling, Three.js setup, or component internals unless explicitly told to. Lift sections out of the single page and move them into their own route files.

---

## Stack

```
Vite + React + TypeScript     (already set up — do not change)
React Router DOM v6+          (add if not already present)
Three.js via @react-three/fiber + @react-three/drei  (already set up)
GSAP 3+ with ScrollTrigger + SplitText               (already set up)
Lenis                                                 (already set up)
Tailwind CSS 3+               (layout/spacing only)
matter-js                     (contact page physics — add if needed)
```

---

## Target Route Structure

```
/                   Home — short overview, hero, stats, intro, preview of works + skills + experience
/works              All Works — full project list with photos
/about              About + Technical Arsenal + The Architect
/contact            Reach Out — contact cards, location map, download resume
```

---

## Step-by-Step Refactor Plan

Follow these steps in order. Complete each before moving to the next.

### Step 1 — Install React Router (if not present)

```bash
npm install react-router-dom
```

### Step 2 — Set Up Router in main.tsx

```tsx
// src/main.tsx
import { BrowserRouter } from 'react-router-dom'

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### Step 3 — Create Page Transition System (DO THIS BEFORE ROUTES)

This is the most critical piece. Build it first, test it, then add routes.

Create `src/components/ui/PageTransition.tsx`:

```tsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

// The yellow panel that covers the screen between routes
export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (isFirstRender.current) {
      // Initial load: panel was covering, slide it out (Phase 3 only)
      isFirstRender.current = false
      gsap.set(overlay, { x: '0%' })
      gsap.to(overlay, {
        x: '100%',
        duration: 0.4,
        ease: 'power4.inOut',
        delay: 0.1,
      })
      return
    }

    // Route change: full cover → reveal cycle
    const tl = gsap.timeline()
    tl.set(overlay, { x: '-100%' })
      .to(overlay, { x: '0%', duration: 0.4, ease: 'power4.inOut' })         // Phase 1: cover
      .to(overlay, { x: '0%', duration: 0.15 })                               // Phase 2: hold
      .to(overlay, { x: '100%', duration: 0.4, ease: 'power4.inOut' })        // Phase 3: reveal

  }, [location.pathname])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFE600',
        zIndex: 9999,
        transform: 'translateX(-100%)',
        pointerEvents: 'none',
      }}
    />
  )
}
```

**IMPORTANT**: Do not scroll or reset scroll position during the transition. Let the new page appear at the top naturally after mount. Add `window.scrollTo(0, 0)` at the START of Phase 2 (inside the timeline callback), not before.

```tsx
tl.set(overlay, { x: '-100%' })
  .to(overlay, { x: '0%', duration: 0.4, ease: 'power4.inOut' })
  .call(() => { window.scrollTo(0, 0) })   // scroll reset while panel is covering
  .to(overlay, { x: '0%', duration: 0.15 })
  .to(overlay, { x: '100%', duration: 0.4, ease: 'power4.inOut' })
```

Also pause Lenis during transition and resume after:
```tsx
// In the transition effect, import your lenis instance and:
lenis.stop()   // before tl starts
// resume after final tween completes:
tl.call(() => lenis.start(), [], '+=0')  // at end of timeline
```

### Step 4 — App.tsx Route Setup

```tsx
// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { PageTransitionOverlay } from './components/ui/PageTransition'
import { Navbar } from './components/ui/Navbar'
import { CustomCursor } from './components/ui/CustomCursor'
import Home from './pages/Home'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <CustomCursor />
      <PageTransitionOverlay />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}
```

### Step 5 — Create Page Files

Create these files if they don't exist:
```
src/pages/Home.tsx
src/pages/Works.tsx
src/pages/About.tsx
src/pages/Contact.tsx
```

Each page file imports the relevant section components and composes them. Do not write section logic inside the page file — keep page files as composition only.

### Step 6 — Lift Sections from Single Page

Take each section component that currently lives inline in the single page and assign it to its correct page:

| Section Component | Goes To Page |
|---|---|
| `<Hero />` | `Home.tsx` |
| `<StatsBar />` or equivalent | `Home.tsx` |
| `<IntroStatement />` | `Home.tsx` |
| `<SkillsOverview />` / `<TechnicalGrid />` | `Home.tsx` (keep short version) + `About.tsx` (full version) |
| `<WorksPreview />` (2 projects) | `Home.tsx` |
| `<Experience />` / `<FieldNotes />` | `Home.tsx` |
| `<WorksGrid />` / `<AllWorks />` (full list) | `Works.tsx` |
| `<TechnicalArsenal />` | `About.tsx` |
| `<TheArchitect />` / bio section | `About.tsx` |
| `<ReachOut />` / contact section | `Contact.tsx` |
| `<LocationMap />` | `Contact.tsx` |
| `<Footer />` | ALL pages (render at bottom of each page) |

**Rule**: If a section has a "short" version on home and a "full" version on its own page, create two variants. For skills: `<SkillsGrid brief />` on home, `<TechnicalArsenal />` on about.

### Step 7 — Update All Internal Links

Replace every `<a href="#section">` or scroll-to-anchor with `<Link to="/route">` from React Router.

```tsx
// BEFORE
<a href="#works">VIEW ALL WORKS</a>

// AFTER
import { Link } from 'react-router-dom'
<Link to="/works">VIEW ALL WORKS</Link>
```

Do NOT use `<a>` for internal navigation — it causes a full page reload which breaks the transition.

### Step 8 — Active Nav State

In Navbar, use `useLocation()` to mark the active route:

```tsx
import { useLocation, Link } from 'react-router-dom'

const { pathname } = useLocation()

// Apply active class when pathname matches
<Link
  to="/works"
  className={pathname === '/works' ? 'nav-active' : ''}
>
  WORKS
</Link>
```

### Step 9 — Re-init Lenis and ScrollTrigger on Route Change

After each route change, GSAP ScrollTrigger instances from the previous page must be killed and re-initialized for the new page.

```tsx
// In each page component's useEffect:
import ScrollTrigger from 'gsap/ScrollTrigger'

useEffect(() => {
  ScrollTrigger.refresh()
  return () => {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }
}, [])
```

Also call `lenis.scrollTo(0, { immediate: true })` after route mounts (inside the transition overlay after Phase 2).

---

## Navigation Links Reference

| Label | Route | Notes |
|---|---|---|
| Brand name / Logo | `/` | Always links home |
| `WORKS` | `/works` | |
| `ABOUT` | `/about` | |
| `CONTACT` | `/contact` | |
| `HIRE_ME` | `/contact` | Filled button variant |
| Back arrow `←` | `history.back()` or `-1` | On inner pages |

---

## What Home Page Shows vs What Goes to Sub-pages

**Home shows:**
- Hero (full)
- Stats bar (full)
- Intro statement (full)
- Technical grid — brief, 6 categories, 2–3 items each, link to `/about`
- Works preview — 2 projects only, link to `/works`
- Experience — 2 entries, condensed, no link needed
- Footer CTA + footer

**Home does NOT show:**
- Full project list with photos (that's `/works`)
- Full technical arsenal with skill levels (that's `/about`)
- Contact cards or location map (that's `/contact`)

---

## Contact Page Extras

If not already built, add these to `/contact`:

**Scrolling Ticker Marquee:**
```tsx
// Infinite horizontal scroll using GSAP or CSS animation
<div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
  <div style={{ display: 'inline-block', animation: 'ticker 20s linear infinite' }}>
    TS 2024 • SYSTEMS • BUILT × SHIP • OPEN FOR COLLABORATION •&nbsp;
  </div>
</div>

@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
// Duplicate the content so it loops seamlessly
```

**Resume Download Button:**
```tsx
<a
  href="/resume.pdf"
  download
  style={{
    display: 'block',
    background: '#0A0A0A',
    color: '#FFE600',
    fontFamily: 'Space Mono, monospace',
    fontSize: '14px',
    letterSpacing: '0.15em',
    padding: '20px 32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    border: 'none',
    width: '100%',
    textAlign: 'center',
  }}
>
  DOWNLOAD_RESUME ⬇
</a>
```

---

## Performance Rules

- Every `<Canvas>` must have `dpr={[1, 1.5]}`.
- Use `Suspense` + `useGLTF.preload()` for all 3D models.
- `ScrollTrigger.refresh()` after fonts load and after each route mount.
- Lenis: `lenis.stop()` during transition, `lenis.start()` after reveal completes.
- `will-change: transform` on animated elements, remove after animation ends.
- Kill all ScrollTrigger instances on page unmount.

---

## What You Must Never Do

- Do not use `<a>` for internal links — use React Router `<Link>` only.
- Do not use fade/crossfade for page transitions — yellow panel only.
- Do not reset scroll position BEFORE the panel covers the screen — users will see the jump.
- Do not add `overflow: hidden` to `<body>` — breaks Lenis.
- Do not use `position: sticky` for navbar — use `position: fixed`.
- Do not rebuild components that already exist — lift and reuse them.
- Do not use framer-motion or react-spring — GSAP only for timelines.
- Do not use any component library for visual elements.
- Do not add grey to any background.
- Do not kill GSAP ScrollTrigger instances before the page unmounts — do it in the useEffect cleanup.

---

## Working with This File

**In Claude Code**: Start a session with:
> "Read `design.md` and `skills.md` first. The project is a single-page Vite + React + TypeScript portfolio. Refactor it into multiple pages using React Router following the exact instructions in `skills.md`. Start with Step 1 and confirm each step before proceeding."

Give Claude Code one step at a time if it tends to go off-course. The page transition (Step 3) is the most complex — test it in isolation before adding all routes.
