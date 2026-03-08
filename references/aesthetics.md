# Aesthetic Directions — Detailed Implementation Guide

Seven distinct aesthetic worlds. Choose ONE. Execute it completely.

---

## 1. DARK CINEMATIC
*Inspired by: landonorris.com, luxury automotive, editorial fashion*

**Feeling**: Powerful, exclusive, like a private VIP world. Every element earns its place.

**Color Palette**:
```css
--bg: #0c0c0c;
--text: #f4f0e8;           /* Warm white, not pure #fff */
--accent: #c8ff00;         /* Lime green — electric against dark */
--accent-alt: #ff5a1f;
--border: rgba(244,240,232,0.1);
```

**Font Pairing**:
```html
<!-- Option A: Sharp + Refined -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet">
--font-display: 'Bebas Neue';
--font-body: 'DM Sans';

<!-- Option B: Editorial luxury -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Inter:wght@300;400&display=swap" rel="stylesheet">
--font-display: 'Cormorant Garamond';
--font-body: 'Inter';
```

**Animation Style**:
- Slow, deliberate reveals (0.8–1.2s duration)
- Elements slide from below with `y: 60px` → `y: 0`
- No bouncing or elastic — pure `power3.out` easing
- Parallax on hero images (30% of scroll speed)
- Grain overlay at 0.04 opacity

**Key Techniques**:
- Full-bleed hero with video or cinematic photography
- Sticky nav that transitions from transparent → `background: rgba(12,12,12,0.8)` + `backdrop-filter: blur(20px)`
- Section titles in HUGE display type (`clamp(6rem, 14vw, 16rem)`)
- Horizontal scroll gallery for portfolio items
- Signature/logo SVG element as decorative detail

**Do NOT**:
- Use gradients (they feel cheap against this dark theme)
- Use rounded cards with heavy shadows
- Use bright, saturated colors for anything but the accent

---

## 2. PLAYFUL 3D WONDER
*Inspired by: igloo.inc, Pudgy Penguins, Studio Ghibli games*

**Feeling**: Pure joy. Like stumbling into a playground you didn't expect. Everything delights.

**Color Palette**:
```css
--bg: #f0f4ff;              /* Soft blue-white */
--text: #1a1a2e;
--accent: #ff6b35;          /* Warm orange */
--accent-2: #7c3aed;        /* Purple */
--accent-3: #10b981;        /* Teal */
--border: rgba(26,26,46,0.12);
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=Space+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
--font-display: 'Nunito';    /* Rounded, friendly */
--font-body: 'Space Grotesk';
```

**Animation Style**:
- Spring physics everywhere: `ease: 'elastic.out(1, 0.5)'`
- Things bounce in from below, wiggle on hover
- Fast transitions (0.3–0.5s) but with elastic tail
- Elements enter with scale: 0.8 → 1 AND y: 30 → 0
- 3D card tilts on hover for all cards
- Floating/bobbing idle animations on key elements

**Key Techniques**:
- Three.js 3D characters or objects as hero centerpiece
- Particle systems that respond to cursor
- Bold rounded corners everywhere (`border-radius: 20px` to `border-radius: 40px`)
- Multi-color sections (each section has its own color)
- Animated SVG illustrations
- Progress indicators as playful shapes, not boring bars

**Do NOT**:
- Use dark backgrounds (kills the lightness)
- Use thin fonts (weight 300 feels wrong here)
- Use straight geometric lines — prefer organic, curved paths

---

## 3. EDITORIAL LUXURY
*Inspired by: Vogue, LVMH brands, luxury watches, Bottega Veneta*

**Feeling**: Quiet confidence. Wealth that doesn't shout. Timeless rather than trendy.

**Color Palette**:
```css
--bg: #faf8f5;              /* Warm off-white / paper */
--text: #1c1c1c;
--accent: #8b6a3e;          /* Gold/warm brown */
--muted: #9e9e8e;
--border: rgba(28,28,28,0.12);
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Lato:wght@300;400&display=swap" rel="stylesheet">
--font-display: 'Playfair Display';
--font-body: 'Lato';
```

**Animation Style**:
- Fade-ins only — no sliding, no scaling
- Very slow (1s–1.5s) with `power1.out`
- Image reveals with a wipe: `clip-path: inset(100% 0 0 0)` → `inset(0% 0 0 0)`
- Horizontal lines that extend from left: `scaleX: 0` → `scaleX: 1`
- Counter numbers that increment slowly

**Key Techniques**:
- Magazine-style asymmetric layout (large image left, small text right OR vice versa)
- Pull quotes in large italic serif
- Numbered sections with thin horizontal rules
- Photography with a warm film-like treatment (CSS: `filter: sepia(0.15) contrast(1.05)`)
- Lots of whitespace — sections breathe

**Do NOT**:
- Use sans-serif for the main headlines (defeats the purpose)
- Use dark mode
- Use animations faster than 0.6s
- Use more than 3 typeface styles

---

## 4. BRUTALIST RAW POWER
*Inspired by: Balenciaga, anti-design, AWWWARDS 2020-2022 brutalist wave*

**Feeling**: Confrontational. Unashamed. You either love it or hate it. Memorable regardless.

**Color Palette**:
```css
--bg: #ffffff;              /* Or #000000 for dark brutal */
--text: #000000;            /* Or #ffffff */
--accent: #ff0000;          /* Pure red OR pure yellow */
--border: 3px solid #000;   /* Thick, visible borders */
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:wght@400;700&display=swap" rel="stylesheet">
--font-display: 'Anton';      /* Heavy, condensed */
--font-body: 'IBM Plex Mono'; /* Monospace for body = editorial brutalism */
```

**Animation Style**:
- Instant snaps with NO easing, or extreme `elastic.out`
- Hover: color inversion (black bg, white text → white bg, black text)
- Glitch effects: rapid position jitter
- No smooth scroll — native scroll preserves the raw feel
- Cursor: extra large, solid block, follows with zero lag

**Key Techniques**:
- OVERSIZED text that breaks the grid and overflows
- Thick borders and rules as design elements
- Black horizontal bars blocking/revealing content
- Tables used as layouts
- Navigation items with heavy border on hover
- Content that feels deliberately "broken"

**CSS snippet for glitch**:
```css
@keyframes glitch {
  0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
  20%  { clip-path: inset(92% 0 1% 0);  transform: translate(4px, 0); }
  40%  { clip-path: inset(43% 0 1% 0);  transform: translate(-2px, 0); }
  60%  { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
  80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-4px, 0); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(0); }
}
.glitch::before {
  content: attr(data-text);
  position: absolute; top: 0; left: 0;
  color: var(--accent);
  animation: glitch 0.3s infinite;
}
```

---

## 5. FUTURISTIC PRECISION
*Inspired by: Linear.app, Vercel, Raycast, Resend*

**Feeling**: Built for people who appreciate craft in tools. Smart, fast, frictionless.

**Color Palette**:
```css
--bg: #090909;
--bg-card: #111111;
--text: #ededed;
--text-muted: rgba(237,237,237,0.45);
--accent: #6ee7f7;          /* Cyan glow */
--accent-alt: #a78bfa;      /* Purple */
--border: rgba(237,237,237,0.08);
--glow: 0 0 40px rgba(110,231,247,0.15);
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
--font-display: 'Geist';
--font-mono: 'JetBrains Mono';  /* Used for labels, code, stats */
```

**Animation Style**:
- Fast and precise (0.15s–0.35s) — performant tools feel snappy
- Fade + tiny translate: `opacity: 0, y: 8` → done
- Glow appears on focus/hover (`box-shadow: var(--glow)`)
- Border glow: gradient border that sweeps on hover
- Shimmer effect on loading states

**Key Techniques**:
- Keyboard shortcut hints (`⌘K`, `⌃P`) as decorative UI
- Code blocks as design elements (syntax highlighted snippets)
- Grid of features with hover glow on individual cells
- Terminal/CLI animation for demos
- Glassmorphism cards: `background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid var(--border)`
- Subtle grid dot pattern as background texture

**Background grid dots**:
```css
.bg-grid {
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 30px 30px;
}
```

---

## 6. SOFT ORGANIC WARMTH
*Inspired by: Notion, Superhuman, Arc Browser, wellness brands*

**Feeling**: Calm, inviting, human. Like a beautiful notebook come to life.

**Color Palette**:
```css
--bg: #fefdf8;
--text: #2c2b2a;
--accent: #d97706;          /* Amber */
--accent-2: #059669;        /* Sage green */
--border: rgba(44,43,42,0.1);
--surface: rgba(44,43,42,0.04);
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap" rel="stylesheet">
--font-display: 'Fraunces';      /* Optical size serif — beautiful */
--font-body: 'Plus Jakarta Sans';
```

**Animation Style**:
- Gentle and natural — like breathing
- Fade + float: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- `ease: 'power2.out'` — nothing jarring
- Hover: very subtle lift `translateY(-3px)` + shadow increase
- Background color shifts on scroll between sections (soft hue transitions)

**Key Techniques**:
- Soft shadows (no hard box shadows: `0 2px 20px rgba(0,0,0,0.06)`)
- Illustrated icons or hand-drawn accents
- Testimonial cards with portrait photos in soft circles
- Organic blob shapes as backgrounds / section dividers
- Content that's genuinely readable (great line-height, max-width: 65ch for text)

---

## 7. RETRO-FUTURISTIC NEON
*Inspired by: Synthwave, Cyberpunk, Tron, early internet nostalgia reborn*

**Feeling**: Nostalgia for a future that never happened. Exciting. Technicolor dreams.

**Color Palette**:
```css
--bg: #050510;
--text: #e0e0ff;
--neon-pink: #ff2d78;
--neon-cyan: #00f5ff;
--neon-purple: #bf00ff;
--neon-yellow: #ffe600;
--grid-color: rgba(0,245,255,0.08);
```

**Font Pairing**:
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500&display=swap" rel="stylesheet">
--font-display: 'Orbitron';
--font-body: 'Rajdhani';
```

**Animation Style**:
- Scanline effects
- Text flicker with `@keyframes flicker`
- Neon glow pulsing: `text-shadow` animation
- Grid lines that appear on scroll
- CRT screen effects

**Neon glow text CSS**:
```css
.neon-text {
  color: var(--neon-cyan);
  text-shadow:
    0 0 7px var(--neon-cyan),
    0 0 21px var(--neon-cyan),
    0 0 42px rgba(0,245,255,0.4);
  animation: neon-flicker 4s infinite;
}
@keyframes neon-flicker {
  0%, 95%, 100% { opacity: 1; }
  96% { opacity: 0.8; }
  97% { opacity: 1; }
  98% { opacity: 0.85; }
  99% { opacity: 1; }
}
```

**Background perspective grid**:
```css
.retro-grid {
  background:
    linear-gradient(rgba(0,245,255,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,245,255,0.08) 1px, transparent 1px);
  background-size: 50px 50px;
  perspective: 500px;
  transform: rotateX(60deg);
  transform-origin: center top;
  height: 400px;
}
```
