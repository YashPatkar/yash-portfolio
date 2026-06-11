# design.md — Portfolio Design System
> Inspired by buttermax.net — bold, maximalist, Three.js-heavy aesthetic
> Updated: Multi-page architecture with animated page transitions

---

## Core Design Philosophy

This is **maximalist editorial design**. Every element is intentional and loud. Typography is oversized and bleed-edge. Color is used as a weapon — not decoration. 3D objects exist in the same space as flat text. The overall feeling is: a backend engineer who is also extremely precise about presentation.

Do not be timid. Do not center everything. Do not use safe colors. Do not use subtle shadows. This design demands presence.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Butter Yellow** | `#FFE600` | Primary background, hero, dominant surface, PAGE TRANSITION PANEL |
| **Jet Black** | `#0A0A0A` | Secondary background, footer, dark sections, type on yellow |
| **Pure White** | `#FFFFFF` | Contrast elements, text on dark, button fills |
| **Neon Cyan** | `#00F5FF` | Glitch accent, particle glow, highlight traces |
| **Hot Magenta** | `#FF00CC` | Glitch artifact, secondary neon accent |
| **Neon Green** | `#00FF88` | Occasional text shimmer, glitch line |

### Rules
- Yellow and black are the primary language. Never use grey as a background.
- Neon colors appear **only** in glitch effects, particle systems, and hover transitions.
- The footer is always black with yellow type or elements.
- The page transition overlay is always **Butter Yellow `#FFE600`** — no exceptions.

---

## Typography

### Typefaces

| Role | Font | Style |
|------|------|-------|
| **Display / Hero** | `Anton`, `Bebas Neue`, or `Black Han Sans` | Black weight, all caps, ultra-condensed |
| **Handwritten / Script** | `Caveat`, `Permanent Marker` | Script overlays on headings (e.g. `packar.`, `honest.`, `notes.`, `works.`) |
| **Body / UI** | `Space Mono` or `IBM Plex Mono` | Monospace, small size, tracking-wide |
| **Labels / Tags** | Same monospace as body | Uppercase, letter-spacing: 0.15em |

### Scale
```
Hero text:        clamp(80px, 12vw, 180px)   — bleeds off screen intentionally
Section heading:  clamp(48px, 8vw, 120px)    — all caps, fills width
Sub-label:        12–14px, monospace, caps   — "WHO WE ARE", category labels
Body copy:        16–18px                    — used sparingly
```

### Type Behavior
- Hero text **breaks out of the container** — letters crop at viewport edge intentionally.
- Two type styles coexist: massive grotesque all-caps AND loose handwritten script layered on top.
- Text is used graphically — it is a shape, not just content.
- Line breaks are art-directed — not just responsive wrapping.
- Mixed typography on one line: `I BUILD BACKEND SYSTEMS THAT STAY` (grotesque black) + `honest.` (script).

---

## Page Transition — HIGHEST PRIORITY ANIMATION

This is the signature interaction from buttermax.net. Every single route change must use this.

### Mechanism
A full-viewport **Butter Yellow** (`#FFE600`) panel slides across the screen between every route change.

```
Phase 1 — Cover:   Panel enters from LEFT → RIGHT    (x: -100% → 0%)   400ms  ease: power4.inOut
Phase 2 — Hold:    Panel sits covering screen         (stays at 0%)      150ms  (new page mounts underneath)
Phase 3 — Reveal:  Panel exits to RIGHT               (x: 0% → 100%)    400ms  ease: power4.inOut
Total time: ~950ms per transition
```

- Panel `z-index: 9999` — above EVERYTHING, including navbar.
- During Phase 2, the new page is already mounted and rendered underneath. There is zero flash or blank screen.
- On **initial page load**: run Phase 3 only — panel was covering, slides out to reveal.
- The navbar: either sits above the panel (z-index higher) or fades out before panel enters and fades back after reveal. Your choice — keep it consistent.
- No other transition style is acceptable. No fades, no crossfades, no slides of content. Only this yellow panel.

---

## Navigation (All Pages)

- Brand/logo: top-left, monospace bold, all caps — `BACKEND_DEV` or `YASH PATKAR`.
- Right side: pill/outlined buttons — `WORKS`, `ABOUT`, `CONTACT` and a filled `HIRE_ME` button.
- Hamburger/menu icon top-left becomes X when menu is open. On open: full-screen or sidebar menu.
- On dark/black sections: nav text and borders invert to yellow.
- `position: fixed`, always visible, minimal height.
- Active route: current nav link gets underline or filled state.

---

## Footer (All Pages)

- Black background, always.
- Brand name bottom-left, monospace small.
- Copyright line: `©2024_BACKEND_ARCHITECT_ALL_RIGHTS_RESERVED`
- Social links: `GITHUB | LINKEDIN | DOCS` separated by pipes, or pill icon links bottom-right.
- Optional bleed text at very bottom edge: `BUILT × SHIP` in massive ghost/faded type.
- Scrolling marquee ticker above footer on some pages: `SYSTEMS 2024 • SYSTEM UPDATING IN PROGRESS •`

---

## Pages & Routes

---

### `/` — Home

The home page is a **punchy overview** — not a dump of everything. It routes the visitor to where they need to go. Each section is short.

**Section 1: Hero** — Yellow full-bleed
- Giant display: `YASH` in grotesque + `packar.` in script overlaid/beside it.
- Tagline below in small monospace: `Software Engineer with X years of hands-on experience...`
- Two CTA buttons: `GET IN TOUCH` (black fill, white text) and `VIEW_WORKS` (outlined).
- Optional: `● OPEN TO WORK` status pill in top area.
- Optional Three.js: 3D monitor/gadget, mouse-reactive, right side.
- Quick links row below buttons: `FULL SUMMARY ↗` `EMAIL ↗`

**Section 2: Stats Bar** — Black background
- 4 stats in 2×2 grid or single row: `PROJECTS_COMPLETED: 42+` / `LINES_OF_CODE: 1M+` / `UPTIME_RECORD: 99.9%` / `TECH_STACK: Go/K8s`
- Stat labels: tiny monospace. Numbers: massive display font.

**Section 3: Intro Statement** — Yellow background
- One statement: `I BUILD BACKEND SYSTEMS THAT STAY honest.` — fills full viewport width.
- Short paragraph below, 2–3 sentences, monospace small.
- Side columns: small info blocks (education, experience, location) in monospace.

**Section 4: Technical Overview (short)** — Black background
- `BUILT FOR CORRECTNESS & performance.` heading.
- Skills listed in a bordered grid — 6 categories: LANGUAGES, BACKEND, DATABASES, FRONTEND, DEVOPS & TOOLS, AI/LLM. Each box has 2–3 items in small monospace.
- `VIEW STACK DETAILS →` link to `/about`.

**Section 5: Works Preview** — Yellow background
- `ALL works.` heading (grotesque + script mix).
- Show 2 project cards side by side (not all projects — just 2). Each card: project name, one-line description, `VIEW →` link.
- `MORE SOON.` if there are fewer projects.
- `START A PROJECT →` link top-right.

**Section 6: Experience** — Black background
- `FIELD notes.` heading.
- 2 experience entries: company name in large display, role below, date range left, short description. `READ →` arrow right.

**Section 7: Footer CTA** — Yellow/Black
- `REACH OUT.` in massive bleed type.
- Email address.
- Social pill links.
- Then standard footer.

---

### `/works` — All Works

**Hero** — Black background
- `ALL WORKS.` in massive yellow display type, bleeds edges.
- Animated yellow blob shapes around the text (Three.js or CSS).
- Subtitle: `A CURATED SELECTION OF INDUSTRIAL-GRADE BACKEND ARCHITECTURES AND FULL-STACK SYSTEMS BUILT FOR SCALE AND PERFORMANCE.` — monospace, small, ~50% width.
- `TOTAL_DEPLOYMENTS: 42` badge — monospace, outlined pill.

**Project List** — Alternating yellow / black or all black
- Each project is a full-width section separated by 1px dividers.
- Structure per project:
  ```
  [FULL-WIDTH DARK PHOTO]
  CATEGORY_LABEL          [YEAR BADGE]
  PROJECT NAME            (massive display, bleeds right edge)
  2–3 line description    (monospace)
  [TAG] [TAG] [TAG]       (outlined monospace pills)
  ```
- Photo: dark-toned, moody. Servers, terminals, dashboards.
- Project name: large enough that it clips at the right viewport edge.

**End of List**
- `MORE SOON.` in massive faded/ghost-outline yellow type on black.
- `SYSTEM_UPDATING_IN_PROGRESS` in tiny monospace below.
- `OPEN FOR COLLABORATION` as bleed text or marquee.

---

### `/about` — About & Technical Arsenal

**Hero** — Yellow background
- `I BUILD BACKEND SYSTEMS THAT STAY HONEST.` — fills full screen, multiple stacked lines, each line its own row in massive type.

**Philosophy** — Black background
- Short paragraph: `Architecting resilient infrastructure where logic is law. My approach is rooted in industrial precision...`
- `STABILITY_FIRST` and `ZERO_LATENCY_MINDSET` as small tag pills.
- Version badge: `EST. 2018 / V.04_STABLE` in a monospace bordered box.

**Technical Arsenal** — Yellow background
- `TECHNICAL ARSENAL` as section heading.
- Subtitle in monospace below.
- Skills in bordered boxes (1px border, sharp corners, no radius):
  - `LANGUAGES` → Go/Golang: Advanced, Rust: Intermediate, Python: Advanced, TypeScript: Expert
  - `BACKEND` → gRPC: High-Freq, REST_JS: Architect, Microservices: Decoupled, Kafka: Streaming
  - `DATABASES` → PostgreSQL: Relational, Redis: Caching, MongoDB: NoSQL, Elasticsearch: Search
  - `DEVOPS` → Kubernetes: Orchestration, Docker: Containers, Terraform: IaC, AWS/GCP: Cloud
- Each category box: category name as large header + icon, skills listed below with level label, thin line dividers between skills.

**The Architect** — Black background
- `THE ARCHITECT` as heading.
- Bio paragraph 3–4 sentences.
- `READ_FULL_MANIFESTO →` CTA link.

---

### `/contact` — Reach Out

**Hero** — Yellow background
- `REACH OUT.` in massive display type. Stack it vertically so it fills the screen:
  ```
  REACH
  OUT.
  ```
  Each word on its own line, massive, bleed edges.
- Availability statement below in monospace: `AVAILABLE FOR ARCHITECTURAL CONSULTING, BACKEND DEVELOPMENT, AND SYSTEM OPTIMIZATION. LET'S BUILD SOMETHING INDESTRUCTIBLE.`
- `DOWNLOAD_RESUME ⬇` — large full-width black button, monospace text.

**Contact Cards** — Yellow background, 1px bordered boxes stacked
- Card 1: `@` symbol large → `EMAIL` as large heading → `hello@yourdomain.dev` as monospace link.
- Card 2: `◎` symbol → `BASE` as large heading → `MUMBAI, INDIA [19.0760° N, 72.8777° E]` monospace.
- Card 3: `⟨⟩` symbol → `SOCIAL` as large heading → `GITHUB_ [01]`, `LINKEDIN_ [02]`, `DOCS_ [03]` as stacked links.

**Location Map** — Black background
- Dark circuit-board or coordinate grid (Three.js or SVG).
- Glowing dot marking Mumbai's coordinates.
- `CURRENT_COORDINATES: MUMBAI_SECTOR_CENTRAL` in monospace overlay.
- `READY FOR ONSITE WORKSHOPS OR REMOTE DEEP-DIVES ACROSS ALL TIMEZONES.`

**Ticker + Footer**
- Scrolling marquee: `TS 2024 • SYSTEMS • BUILT × SHIP •` repeating, large ghost text.
- Standard footer below.

---

## 3D & Three.js

### Hero 3D Object (Home page)
- A 3D monitor or retro gadget — mouse-reactive, parallax rotation ±15deg using lerp.
- Floats on Y-axis with slow sine wave.
- Glitch/chromatic aberration via post-processing.
- `<Canvas gl={{ alpha: true }}>` — transparent background, sits over hero.

### Point Cloud (Works hero or between-section)
- 8000 points, organic blob shape.
- Simplex-noise displacement animation.
- Monochrome on black.

### Fluid Blobs (Works hero, Contact)
- Morphing yellow blob shapes.
- React to mouse proximity.

### Location Map (Contact)
- Custom dark grid with glowing coordinate marker for Mumbai.

---

## Animation & Motion

### Scroll
- Lenis everywhere. All scroll animations hooked to Lenis, not native scroll.
- Parallax: large text moves at 0.85× scroll speed.
- Section reveal: `translateY(40px) → 0`, opacity `0 → 1`, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`.

### Text
- Hero: GSAP SplitText character reveal — letters slide up from clip mask, stagger 0.03s.
- Section headings: word-by-word slide-up on scroll enter.
- Glitch text: fires on hover + every 6–10 seconds randomly on hero.

### Cursor
- 12px circle, lerp 0.12, `position: fixed`, `pointer-events: none`.
- Hover active elements: 48px, `mix-blend-mode: difference`.
- `cursor: none` on body always.

### Glitch Effect
```css
@keyframes glitch {
  0%   { transform: translate(0); }
  20%  { transform: translate(-3px, 2px); clip-path: inset(20% 0 60% 0); }
  40%  { transform: translate(3px, -2px); clip-path: inset(60% 0 20% 0); }
  60%  { transform: translate(-2px, 1px); clip-path: inset(40% 0 40% 0); }
  80%  { transform: translate(2px, -1px); clip-path: inset(10% 0 80% 0); }
  100% { transform: translate(0); }
}
```
Three.js: `ChromaticAberration` offset spikes to `0.015` on trigger, lerps back to `0.003`.

---

## What To Avoid

- No `border-radius` on cards/containers (pill buttons excepted).
- No gradients as backgrounds.
- No grey. Ever.
- No subtle drop shadows.
- No centered layouts as default.
- No icon libraries — custom SVGs only.
- No timid animations.
- No React component library visual components.
- No fades or crossfades for page transitions — yellow panel only.
