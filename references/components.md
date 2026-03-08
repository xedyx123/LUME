# Awwwards Component Library — Copy-Paste Implementations

This file contains ready-to-use code patterns for each signature component.
Import the right CDN scripts first (see SKILL.md Phase 3).

---

## 1. Custom Cursor with Lag Effect

```html
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>

<style>
* { cursor: none; }

.cursor-dot {
  position: fixed;
  width: 6px; height: 6px;
  background: #fff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
}

.cursor-ring {
  position: fixed;
  width: 36px; height: 36px;
  border: 1.5px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-color 0.3s;
}

/* Hover state — apply via JS adding class to body */
body.hovering .cursor-dot { width: 10px; height: 10px; background: var(--accent); }
body.hovering .cursor-ring { width: 60px; height: 60px; border-color: var(--accent); opacity: 0.5; }
</style>

<script>
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let ringX = 0, ringY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

// Ring follows with lerp lag
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover detection
document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});
</script>
```

---

## 2. GSAP Text Split Reveal (words rise up, overflow clipped)

```html
<h1 class="split-reveal">Design That Stops Time</h1>

<style>
.split-reveal .word {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  margin-right: 0.2em;
}
.split-reveal .char {
  display: inline-block;
  transform: translateY(110%);
}
</style>

<script>
// Requires: SplitType + GSAP + ScrollTrigger
document.querySelectorAll('.split-reveal').forEach(el => {
  const split = new SplitType(el, { types: 'words,chars' });
  
  gsap.from(split.chars, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
    },
    y: '110%',
    opacity: 0,
    duration: 0.7,
    stagger: 0.025,
    ease: 'power3.out',
  });
});
</script>
```

---

## 3. Lenis Smooth Scroll Setup + GSAP ScrollTrigger Integration

```javascript
// Setup — run before any ScrollTrigger animations
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

---

## 4. Pinned Horizontal Scroll Section

```html
<section class="h-scroll-wrapper">
  <div class="h-scroll-track">
    <div class="h-panel">Panel One</div>
    <div class="h-panel">Panel Two</div>
    <div class="h-panel">Panel Three</div>
    <div class="h-panel">Panel Four</div>
  </div>
</section>

<style>
.h-scroll-wrapper {
  overflow: hidden;
}
.h-scroll-track {
  display: flex;
  width: 400vw; /* panels × 100vw */
}
.h-panel {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
const track = document.querySelector('.h-scroll-track');
const panels = gsap.utils.toArray('.h-panel');

gsap.to(track, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.h-scroll-wrapper',
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => '+=' + track.offsetWidth,
  }
});
</script>
```

---

## 5. Magnetic Button Effect

```html
<button class="btn-magnetic" data-magnetic>
  <span>Explore Work</span>
</button>

<style>
.btn-magnetic {
  position: relative;
  padding: 1rem 2.5rem;
  border: 1.5px solid currentColor;
  border-radius: 100px;
  background: transparent;
  transition: background 0.3s, color 0.3s;
  overflow: hidden;
}

/* Fill sweep */
.btn-magnetic::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
}
.btn-magnetic:hover::before { transform: scaleX(1); }
.btn-magnetic:hover { color: #000; }
</style>

<script>
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  });
});
</script>
```

---

## 6. Noise/Grain Overlay (CSS + SVG)

```html
<!-- Add as last child of body -->
<div class="grain-overlay" aria-hidden="true"></div>

<svg width="0" height="0" style="position:absolute">
  <filter id="noise-filter">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
</svg>

<style>
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9990;
  pointer-events: none;
  opacity: 0.045;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}
</style>
```

---

## 7. Animated Mesh Gradient Background

```html
<div class="mesh-bg" aria-hidden="true"></div>

<style>
.mesh-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #0a0a0a;
  overflow: hidden;
}

.mesh-bg::before,
.mesh-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: mesh-drift 12s ease-in-out infinite alternate;
}

.mesh-bg::before {
  width: 60vw; height: 60vw;
  background: radial-gradient(circle, var(--accent, #6d28d9), transparent 70%);
  top: -20%; left: -10%;
  animation-delay: -6s;
}

.mesh-bg::after {
  width: 50vw; height: 50vw;
  background: radial-gradient(circle, #1a1a4e, transparent 70%);
  bottom: -20%; right: -10%;
}

@keyframes mesh-drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(5%, 8%) scale(1.08); }
  100% { transform: translate(-3%, 5%) scale(0.95); }
}
</style>
```

---

## 8. Preloader with Counter

```html
<div id="preloader">
  <div class="preloader-count">00</div>
  <div class="preloader-bar"><div class="preloader-fill"></div></div>
</div>

<style>
#preloader {
  position: fixed; inset: 0; z-index: 10000;
  background: #0a0a0a;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  transition: opacity 0.6s ease, visibility 0.6s ease;
}
#preloader.hidden { opacity: 0; visibility: hidden; }

.preloader-count {
  font-family: var(--font-display, monospace);
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #fff;
  line-height: 1;
}
.preloader-bar {
  width: 200px; height: 1px;
  background: rgba(255,255,255,0.2);
  margin-top: 2rem;
  overflow: hidden;
}
.preloader-fill {
  height: 100%;
  background: #fff;
  width: 0%;
  transition: width 0.05s linear;
}
</style>

<script>
const loader = document.getElementById('preloader');
const countEl = loader.querySelector('.preloader-count');
const fillEl = loader.querySelector('.preloader-fill');
let progress = 0;

const interval = setInterval(() => {
  progress += Math.random() * 8 + 2;
  if (progress >= 100) { progress = 100; clearInterval(interval); }
  countEl.textContent = String(Math.floor(progress)).padStart(2, '0');
  fillEl.style.width = progress + '%';
  if (progress >= 100) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger page intro animations here
    }, 200);
  }
}, 60);
</script>
```

---

## 9. Mega Menu with Image Preview (Lando Norris style)

```html
<nav class="nav">
  <ul class="nav-links">
    <li class="nav-item" data-preview="/img/about.jpg">
      <a href="/about">About</a>
    </li>
    <li class="nav-item" data-preview="/img/work.jpg">
      <a href="/work">Work</a>
    </li>
  </ul>
  <div class="nav-preview">
    <img class="nav-preview-img" src="" alt="" />
  </div>
</nav>

<style>
.nav-preview {
  position: fixed;
  top: 50%; right: 8vw;
  transform: translateY(-50%);
  width: 280px; height: 380px;
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.nav-preview.visible { opacity: 1; }
.nav-preview-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
</style>

<script>
const preview = document.querySelector('.nav-preview');
const previewImg = document.querySelector('.nav-preview-img');

document.querySelectorAll('.nav-item[data-preview]').forEach(item => {
  item.addEventListener('mouseenter', () => {
    previewImg.src = item.dataset.preview;
    preview.classList.add('visible');
  });
  item.addEventListener('mouseleave', () => {
    preview.classList.remove('visible');
  });
});
</script>
```

---

## 10. Card 3D Tilt on Hover

```javascript
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tiltX = y * -12;  // degrees
    const tiltY = x * 12;
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 800,
      ease: 'power1.out',
      duration: 0.3
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
  });
});
```

---

## 11. Infinite Marquee Ticker

```html
<div class="marquee" aria-label="Skills ticker">
  <div class="marquee-track">
    <span>Brand Identity</span>
    <span class="sep">✦</span>
    <span>Motion Design</span>
    <span class="sep">✦</span>
    <span>Creative Direction</span>
    <span class="sep">✦</span>
    <span>Web Development</span>
    <span class="sep">✦</span>
    <!-- Duplicate for seamless loop -->
    <span>Brand Identity</span>
    <span class="sep">✦</span>
    <span>Motion Design</span>
    <span class="sep">✦</span>
    <span>Creative Direction</span>
    <span class="sep">✦</span>
    <span>Web Development</span>
    <span class="sep">✦</span>
  </div>
</div>

<style>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.marquee-track {
  display: inline-block;
  animation: marquee-scroll 20s linear infinite;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.marquee-track span { padding: 0 2rem; }
.marquee-track .sep { opacity: 0.4; padding: 0; }

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Pause on hover */
.marquee:hover .marquee-track { animation-play-state: paused; }
</style>
```

---

## 12. Parallax Image Section

```html
<section class="parallax-section">
  <div class="parallax-img-wrap">
    <img class="parallax-img" src="hero.jpg" alt="" />
  </div>
  <div class="parallax-content">
    <h2>Crafted with Purpose</h2>
  </div>
</section>

<style>
.parallax-section {
  position: relative;
  height: 80vh;
  overflow: hidden;
}
.parallax-img-wrap {
  position: absolute;
  inset: -20%;  /* Extra space for parallax movement */
  will-change: transform;
}
.parallax-img {
  width: 100%; height: 100%;
  object-fit: cover;
}
</style>

<script>
// GSAP ScrollTrigger parallax
gsap.to('.parallax-img-wrap', {
  yPercent: 25,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
</script>
```

---

## 13. Page Transition (Overlay Wipe)

```javascript
// Full-screen overlay that sweeps in, then out between pages
// For React: use framer-motion AnimatePresence
// For vanilla: use GSAP

function pageTransitionOut(href) {
  const overlay = document.getElementById('page-transition');
  gsap.timeline()
    .to(overlay, {
      scaleY: 1,
      transformOrigin: 'bottom center',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => { window.location.href = href; }
    });
}

// CSS:
// #page-transition {
//   position: fixed; inset: 0; z-index: 9999;
//   background: var(--accent);
//   transform: scaleY(0);
//   transform-origin: top center;
// }
```

---

## 14. Scroll-Triggered Section Reveal (stagger children)

```javascript
// Reveal multiple children when section enters viewport
gsap.utils.toArray('.reveal-section').forEach(section => {
  const children = section.querySelectorAll('.reveal-item');
  gsap.from(children, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
  });
});
```

---

## 15. Scramble Text Effect (cyber/tech aesthetic)

```javascript
function scrambleText(el, finalText, duration = 1500) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let iterations = 0;
  const totalFrames = duration / 30;
  
  const interval = setInterval(() => {
    el.textContent = finalText.split('').map((char, i) => {
      if (i < iterations) return char;
      if (char === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    
    iterations += finalText.length / totalFrames;
    if (iterations >= finalText.length) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 30);
}

// Trigger on scroll:
// IntersectionObserver → scrambleText(el, el.dataset.text)
```

---

## CSS Custom Properties Template (always start with this)

```css
:root {
  /* Colors */
  --bg: #0a0a0a;
  --bg-secondary: #111111;
  --text: #f0f0f0;
  --text-muted: rgba(240,240,240,0.5);
  --accent: #e8ff3a;      /* Change this per project */
  --accent-alt: #ff4a1c;  /* Optional second accent */
  --border: rgba(240,240,240,0.12);
  
  /* Typography */
  --font-display: 'Clash Display', 'Bebas Neue', sans-serif;
  --font-body: 'Cabinet Grotesk', 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --section-padding: clamp(4rem, 10vw, 10rem);
  --container: min(90%, 1200px);
  
  /* Transitions */
  --ease-smooth: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast: 0.2s;
  --dur-medium: 0.4s;
  --dur-slow: 0.8s;
}

/* Responsive type scale */
.text-hero    { font-size: clamp(3.5rem, 10vw, 12rem); font-weight: 800; letter-spacing: -0.03em; line-height: 0.9; }
.text-display { font-size: clamp(2.5rem, 6vw, 7rem);  font-weight: 700; letter-spacing: -0.02em; line-height: 1.0; }
.text-h1      { font-size: clamp(2rem, 4vw, 4.5rem);  font-weight: 600; letter-spacing: -0.02em; }
.text-h2      { font-size: clamp(1.5rem, 3vw, 3rem);  font-weight: 600; }
.text-body    { font-size: clamp(0.95rem, 1.2vw, 1.1rem); line-height: 1.65; }
.text-label   { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.6; }
```
