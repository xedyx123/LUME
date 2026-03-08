# Mobile Design — Lume Skill Reference

Mobile is NOT a scaled-down desktop. It's a different medium.
Award-winning sites treat mobile as a first-class experience with its own choreography.

---

## The Golden Rules

1. **No cursor effects on touch** — detect with `(hover: none)` media query, disable entirely
2. **No hover states on touch** — replace with tap/active states
3. **Horizontal scroll → vertical stack** — pinned horizontal panels become swipeable or stacked vertically
4. **Animations: simpler, faster** — mobile CPUs are weaker; cut animation count by 50%, duration by 30%
5. **Typography: still bold** — `clamp()` scales down, but hero text should still dominate the viewport

---

## 1. Detect Touch vs. Mouse — The Right Way

```css
/* Disable cursor on touch devices */
@media (hover: none) and (pointer: coarse) {
  * { cursor: auto !important; }
  .cursor-dot,
  .cursor-ring { display: none !important; }
}

/* Hover effects only on true pointer devices */
@media (hover: hover) and (pointer: fine) {
  .btn-magnetic:hover { transform: scale(1.05); }
  .card:hover { transform: translateY(-4px); }
}
```

```javascript
// JS detection — more reliable than media queries for GSAP
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

if (!isTouchDevice()) {
  // Initialize cursor, magnetic effects, card tilt
  initCustomCursor();
  initMagneticButtons();
  initCardTilt();
}
```

---

## 2. Mobile Navigation Patterns

### Bottom Sheet Menu (modern, thumb-friendly)
```html
<nav class="mobile-nav">
  <button class="nav-toggle" aria-label="Menu">
    <span></span><span></span>
  </button>
</nav>

<div class="mobile-sheet" aria-hidden="true">
  <div class="mobile-sheet-inner">
    <a href="/">Home</a>
    <a href="/work">Work</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</div>

<style>
.mobile-sheet {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 2rem;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  z-index: 1000;
  box-shadow: 0 -20px 60px rgba(0,0,0,0.1);
}
.mobile-sheet.open { transform: translateY(0); }
</style>
```

### Full-screen Overlay (cinematic feel)
```css
.mobile-menu-overlay {
  position: fixed; inset: 0;
  background: #0a0a0a;
  z-index: 999;
  display: flex; flex-direction: column;
  justify-content: center; padding: 2rem;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.mobile-menu-overlay.open {
  clip-path: inset(0 0 0% 0);
}
.mobile-menu-overlay a {
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: 700;
  color: #fff;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  transform: translateX(-20px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.mobile-menu-overlay.open a {
  transform: translateX(0);
  opacity: 1;
}
/* Stagger each link */
.mobile-menu-overlay.open a:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu-overlay.open a:nth-child(2) { transition-delay: 0.15s; }
.mobile-menu-overlay.open a:nth-child(3) { transition-delay: 0.2s; }
.mobile-menu-overlay.open a:nth-child(4) { transition-delay: 0.25s; }
```

---

## 3. Horizontal Scroll → Mobile Fallback

Desktop pinned horizontal scroll panels should become either:

### Option A: Swipeable carousel (preserves horizontal feel)
```css
/* Mobile: horizontal swipe */
@media (max-width: 768px) {
  .h-scroll-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .h-scroll-wrapper::-webkit-scrollbar { display: none; }
  .h-scroll-track {
    display: flex;
    width: max-content; /* Let content determine width */
    transform: none !important; /* Disable GSAP on mobile */
  }
  .h-panel {
    width: 85vw;
    scroll-snap-align: start;
    flex-shrink: 0;
  }
}
```

```javascript
// Disable GSAP horizontal scroll on mobile
if (!isTouchDevice()) {
  // Initialize GSAP horizontal scroll
  initHorizontalScroll();
}
// On mobile, native CSS scroll-snap handles it
```

### Option B: Vertical stack (simpler, fully accessible)
```css
@media (max-width: 768px) {
  .h-scroll-track {
    flex-direction: column;
    width: 100%;
  }
  .h-panel {
    width: 100%;
    height: auto;
    min-height: 60vh;
  }
}
```

---

## 4. Responsive Typography — Full Scale

```css
:root {
  /* Fluid type scale — works from 320px to 1920px */
  --text-hero:    clamp(2.8rem, 10vw, 12rem);   /* Main headline */
  --text-display: clamp(2rem, 6vw, 7rem);        /* Section titles */
  --text-h1:      clamp(1.6rem, 4vw, 4rem);
  --text-h2:      clamp(1.3rem, 3vw, 2.5rem);
  --text-h3:      clamp(1.1rem, 2vw, 1.75rem);
  --text-body:    clamp(0.95rem, 1.5vw, 1.1rem); /* Min 16px on mobile */
  --text-small:   clamp(0.8rem, 1.2vw, 0.9rem);
  --text-label:   0.75rem; /* Fixed — labels don't need to scale */
}

h1 { font-size: var(--text-hero); }
h2 { font-size: var(--text-display); }
p  { font-size: var(--text-body); }

/* Line heights per size */
.text-hero    { line-height: 0.92; }
.text-display { line-height: 1.0; }
.text-body    { line-height: 1.65; }
```

---

## 5. Touch-Optimized Interactions

### Tap targets — minimum 44×44px (Apple HIG / WCAG)
```css
/* Every clickable element must be at least 44×44px */
a, button, [role="button"], input, select, textarea {
  min-height: 44px;
  min-width: 44px;
}

/* For small visual elements, use padding to extend hit area */
.icon-button {
  width: 20px; height: 20px; /* Visual size */
  padding: 12px; /* Extends touch target to 44×44 */
}
```

### Active states (replace hover on touch)
```css
@media (hover: none) {
  .btn:active {
    transform: scale(0.97);
    opacity: 0.85;
    transition: transform 0.1s, opacity 0.1s;
  }
  .card:active {
    transform: scale(0.99);
  }
}
```

---

## 6. GSAP Animations — Mobile Performance Budget

On mobile, animate LESS but with equal intention:

```javascript
// Detect if we should reduce animation complexity
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

function getAnimationConfig() {
  if (prefersReducedMotion) {
    return { duration: 0, stagger: 0 }; // Skip entirely
  }
  if (isMobile) {
    return { duration: 0.5, stagger: 0.05 }; // Faster, less stagger
  }
  return { duration: 0.8, stagger: 0.08 }; // Full desktop experience
}

const { duration, stagger } = getAnimationConfig();

// Apply to all scroll reveals
gsap.from('.reveal-item', {
  scrollTrigger: { trigger: '.reveal-section', start: 'top 85%' },
  y: isMobile ? 20 : 40, // Smaller movement on mobile
  opacity: 0,
  duration,
  stagger,
  ease: 'power2.out',
});
```

---

## 7. Pinned Sections — Mobile Fix

GSAP `pin: true` can cause issues on mobile. Always add a mobile guard:

```javascript
ScrollTrigger.create({
  trigger: '.pinned-section',
  pin: true,
  start: 'top top',
  end: '+=200%',
  scrub: 1,
  // Disable pinning on mobile — it causes scroll jank
  invalidateOnRefresh: true,
  onRefresh: self => {
    if (window.innerWidth < 768) self.disable();
    else self.enable();
  }
});
```

---

## 8. Preloader — Mobile Optimization

```javascript
// Skip preloader on mobile (users expect faster load, less patience for intros)
const shouldShowPreloader = !isTouchDevice() && !prefersReducedMotion;

if (shouldShowPreloader) {
  initPreloader();
} else {
  // Immediately show content, just fade in
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
}
```

---

## 9. Mobile-First Breakpoints (use in every build)

```css
/* Mobile first — build up, not down */
/* Base styles = mobile */

@media (min-width: 480px)  { /* Large phones */ }
@media (min-width: 768px)  { /* Tablets */ }
@media (min-width: 1024px) { /* Small laptops — enable desktop features */ }
@media (min-width: 1280px) { /* Desktop */ }
@media (min-width: 1920px) { /* Large screens */ }

/* Enable desktop-only features */
@media (min-width: 1024px) and (hover: hover) {
  /* Cursor effects, hover states, complex animations */
}
```

---

## 10. The Mobile Checklist (add to every build)

- [ ] Custom cursor hidden on touch (`@media (hover: none)`)
- [ ] Horizontal scroll has touch fallback
- [ ] All tap targets ≥ 44×44px  
- [ ] Body font ≥ 16px (no iOS auto-zoom)
- [ ] Navigation accessible with thumb (bottom of screen, or large touch targets)
- [ ] GSAP animations simplified (50% fewer, 30% faster)
- [ ] Pinned sections disabled or tested on real mobile device
- [ ] Preloader skipped or shortened on mobile
- [ ] No `position: fixed` elements that block content on small screens
- [ ] Tested on real iPhone + Android (not just DevTools)
