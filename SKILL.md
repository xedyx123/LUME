---
name: lume
description: Build award-winning frontend interfaces. Use for landing pages, portfolios, hero sections, or any UI needing premium animations, scroll storytelling, and Awwwards-level visual craft.
license: See LICENSE.txt
dependencies:
  npm: [gsap, lenis, split-type, three, framer-motion]
  cdn:
    gsap: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
    lenis: https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js
    split-type: https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js
---

# Awwwards-Quality Frontend Skill

This skill guides you to build **experiences**, not just websites. The difference between an Awwwards winner and a template is: intentionality, motion, typography, and the feeling the user walks away with.

Study these two winners before every build:
- **landonorris.com** — Cinematic scrollytelling, sticky sections, oversized editorial type, signature elements, immersive mobile UX
- **igloo.inc** — Developer Site of the Year 2024: delightful micro-animations, blazing performance, unique creative vision, every visit feels like the first time

---

## Phase 1: Define the Soul (Before Any Code)

Ask yourself — or the user — ONE question: **"What should someone feel 30 seconds after landing?"**

Then commit to an Emotional Direction:
- **Cinematic power** → full-bleed visuals, slow reveals, editorial pacing (Lando Norris)
- **Playful wonder** → bouncy physics, unexpected interactions, joy (Igloo, Pudgy Penguins)  
- **Refined luxury** → generous whitespace, serif elegance, restrained motion
- **Raw energy** → brutalist type, grain, high-contrast, aggressive cuts
- **Futuristic precision** → dark theme, glow accents, monospace details, neon traces
- **Editorial warmth** → newspaper-inspired grid, ink textures, humanity

**Never be neutral. Never be "clean and modern" without a soul.**

---

## Phase 2: The Anatomy of an Awwwards Winner

Every great site has these layers. Read `references/components.md` for implementation code for each.

### 2.1 — The Loading Experience
The first 2 seconds set everything. Do NOT show a blank white screen.
- **Preloader** with your aesthetic: number count-up, logo reveal, progress bar with grain
- **Page intro animation**: elements slide in staggered, text splits and rises, or a full-screen overlay peels away
- Rule: The loader should feel like a **theatre curtain rising**

### 2.2 — The Hero Section
This is the most important real estate. It must be unforgettable.

**Patterns that win:**
- **Kinetic typography**: Oversized headline split into chars/words, each animating in with stagger
- **Cursor parallax**: Elements subtly follow mouse movement (3–8% of mouse delta)  
- **Video/image underlaid under text**: Bold headline clips mask a background video (CSS `mix-blend-mode: multiply` or clip-path)
- **Scrolljack reveal**: Hero pins, then content reveals as user scrolls (GSAP ScrollTrigger `pin: true`)
- **Noise/grain overlay**: A subtle SVG filter or canvas grain adds cinematic texture
- **Signature elements**: Personal touches like Lando's handwritten signature SVG or LN logo

**Typography rules:**
- Use Google Fonts or Bunny Fonts from CDN — AVOID Inter, Roboto, Arial
- Great pairings: Clash Display + Cabinet Grotesk, Playfair Display + DM Sans, Bebas Neue + Lato, PP Neue Machina (via CDN), Anton + Libre Baskerville
- Headline: 8rem–20rem at desktop. Text IS the design.
- Tracking: `letter-spacing: -0.03em` for large display type. `letter-spacing: 0.15em` for small labels.

### 2.3 — Navigation
- **Minimal sticky nav** that transforms on scroll (transparent → frosted glass or solid)
- **Mega menu with images** (like Lando Norris: hover nav item → full preview image appears)
- **Magnetic buttons**: cursor attracts button slightly on hover (`transform: translate()`)
- **Hamburger → X**: Full-screen overlay menu with staggered link reveals

### 2.4 — Scroll Storytelling (Scrollytelling)
Turn vertical scroll into a narrative arc:
- **Pinned sections**: Section sticks while content animates past it
- **Horizontal scroll panels**: Pinned container, inner content scrolls horizontally
- **Parallax layers**: Background moves at 30% speed, midground at 60%, foreground at 100%
- **Progress-driven animations**: A timeline scrubs with scroll position (`scrub: 1`)
- **Counter animations**: Numbers count up when entering viewport
- **Image sequence**: Frame-by-frame video driven by scroll (advanced)

### 2.5 — Micro-Interactions & Hover States
These are what separates good from unforgettable:
- **Magnetic elements**: Buttons/links that attract the cursor slightly
- **Image hover**: Scale + reveal an overlay, or switch between two images (Lando helmets)
- **Link underline**: Custom SVG underline that draws on hover
- **Card tilt**: 3D perspective tilt following cursor (`rotateX`, `rotateY`)
- **Button fill**: Background color sweeps from left or corner on hover

### 2.6 — Typography in Motion
- **Split text reveal**: Each word/char animates in from below with overflow:hidden clip
- **Scramble text**: Characters randomize before settling (seen in cyber/tech sites)
- **Marquee/ticker**: Infinite horizontal scroll for logos, stats, or moods
- **Highlight on scroll**: Text gains a yellow highlighter background as it enters view
- **Variable font weight**: Font weight animates from thin→bold on hover or scroll

### 2.7 — Visual Atmosphere
The details that create "feeling":
- **Grain/noise overlay**: `filter: url(#noise)` SVG filter or canvas overlay at 3–8% opacity
- **Mesh gradient background**: Animated blobs of color that shift slowly (`@keyframes`)
- **Glassmorphism cards**: `backdrop-filter: blur(20px)`, semi-transparent borders
- **Custom cursor**: Replace default cursor with a circle that scales on hover + follows with lag
- **Color**: Pick ONE dominant, ONE accent. High contrast wins. Never >3 colors in a palette.
- **Dark mode**: Premium sites default to dark. Light background = editorial/luxury only.

### 2.8 — Performance Without Compromise
Award-winning sites are FAST. Never let visuals kill performance:
- Animate only `transform` and `opacity` (GPU-composited, no layout thrash)
- Lazy-load images with `loading="lazy"` and `IntersectionObserver`
- Use `will-change: transform` sparingly on animated elements
- Prefer CSS animations for simple transitions; JS (GSAP) for sequenced/scroll animations
- `requestAnimationFrame` for all canvas/JS animation loops

---

## Phase 3: Technology Stack by Context

### Pure HTML/CSS/JS (Claude.ai Artifacts, static files)
```
CDN libraries to import:
- GSAP + ScrollTrigger: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
- Lenis (smooth scroll): https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js  
- SplitType: https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js
- Three.js r128: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js
```

### React (Claude.ai Artifacts, Next.js)
```javascript
// Available: framer-motion, gsap, three (r128), lucide-react, recharts
// For scroll: use GSAP ScrollTrigger + Lenis (via CDN script tag in HTML, or npm in projects)
// For 3D: Three.js (avoid r142+ features like CapsuleGeometry)
// For spring physics: framer-motion's useSpring, useTransform
```

### Claude Code / Full Projects
```bash
npm install gsap lenis @studio-freight/lenis split-type three framer-motion
# For fonts: use @fontsource packages or Google Fonts CSS import
```

**Quick scaffold** — run this to bootstrap a full Next.js project with all deps + starter components pre-wired:
```bash
node .agent/skills/lume/scripts/scaffold.js my-project
```
This creates: Next.js 14 + TypeScript + Tailwind + gsap + lenis + split-type + `useLenis` hook + `CustomCursor` component + grain overlay CSS + cursor CSS — all ready to go.

---

## Phase 4: Signature Patterns — Implementation

Read `references/components.md` for full, copy-paste code for:
- Custom cursor with lag
- GSAP text split reveal  
- Smooth Lenis scroll setup
- Pinned horizontal scroll section
- Magnetic button effect
- Noise/grain overlay
- Mesh gradient animation
- Preloader with counter
- Mega menu with image preview
- Card 3D tilt on hover
- Infinite marquee ticker
- Parallax image section

Read `references/mobile.md` for mobile-specific patterns:
- Touch-safe animations (no cursor, no hover states)
- Mobile navigation (bottom sheet, full-screen overlay)
- Swipe gestures with Lenis
- Responsive typography with `clamp()`
- Performance budgets for mobile (60fps on mid-range devices)

---

## Phase 5: The Awwwards Checklist

Before finalizing, verify:

**Visual**
- [ ] Typography is oversized, distinctive, and NOT a generic font
- [ ] Color palette has a dominant + one accent, high contrast
- [ ] Grain/texture or visual atmosphere element exists
- [ ] Not a single generic shadow or generic border-radius:8px card

**Motion**
- [ ] Page load has a deliberate intro animation
- [ ] At least one scroll-triggered animation sequence
- [ ] Hover states on all interactive elements feel intentional
- [ ] No jarring or sudden jumps — everything eases

**Feel**
- [ ] There's something you've never seen before on this site
- [ ] The site communicates ONE clear emotion
- [ ] Mobile feels equally crafted (not an afterthought)
- [ ] Performance: only `transform` and `opacity` are animated

**Mobile (read references/mobile.md)**
- [ ] Custom cursor disabled on touch devices (`@media (hover: none)`)
- [ ] Horizontal scroll sections have touch fallback (vertical stack on mobile)
- [ ] Tap targets minimum 44×44px
- [ ] Font sizes minimum 16px on body (prevents iOS zoom)
- [ ] Animations simplified on mobile (fewer simultaneous, shorter duration)
- [ ] Tested on real device, not just browser DevTools

**Code**
- [ ] CSS custom properties (`--var`) for all colors, spacing, font sizes
- [ ] `overflow: hidden` on text containers for clean reveal animations
- [ ] Responsive typography with `clamp()`: `font-size: clamp(3rem, 8vw, 10rem)`
- [ ] `prefers-reduced-motion` media query respected

---

## Phase 6: Aesthetic Directions — Quick Reference

Read `references/aesthetics.md` for detailed implementation of:
- Dark cinematic (Lando Norris energy)
- Playful 3D wonder (Igloo/Pudgy style)  
- Editorial luxury (editorial magazine)
- Brutalist raw power
- Soft organic warmth
- Retro-futuristic neon
- Minimal Swiss precision

Each aesthetic has: color palette, font pairing, animation style, texture treatment, and component examples.

---

## Example Output

When this skill is applied correctly, the result looks like this:

```
INPUT:  "Build a landing page for my SaaS product"
OUTPUT: Next.js page with:
        - Preloader (00→100 counter, 800ms, then wipe reveal)
        - Hero: "Build Faster." split-text reveal, char by char, stagger 0.02s
        - Custom cursor: 6px dot + 36px lagging ring, scales on hover
        - Sticky nav: transparent → blur(20px) frosted on scroll
        - Pinned "problem" section: 3 statements appear one by one as user scrolls
        - Features grid: 12 cards, staggered fade+rise on viewport enter
        - Horizontal scroll: 4 panels showing product screenshots, scrub:1
        - Marquee ticker: "Fast · Reliable · Beautiful · Open Source · ..."
        - Grain overlay: 3% opacity on #fafafa background
        - CTA section: magnetic button, scramble text on hover
        - All fonts via @fontsource/geist, clamp() responsive scale
        - prefers-reduced-motion respected throughout
```

This is the bar. Every build should feel this intentional.

---

## Core Principle

> "What separates a website you remember from the thousands you don't? The animations made me feel like I wasn't just browsing — I was part of its story."

Build stories. Not pages.
