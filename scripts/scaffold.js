#!/usr/bin/env node
/**
 * awwwards-frontend scaffold
 * Bootstraps a Next.js 14 project with all dependencies pre-installed
 * and a starter file structure ready for award-winning frontend work.
 *
 * Usage (Claude runs this automatically when setting up a new project):
 *   node scripts/scaffold.js [project-name]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || 'my-awwwards-site';
const cwd = process.cwd();
const projectPath = path.join(cwd, projectName);

console.log(`\n🚀 Scaffolding ${projectName}...\n`);

// 1. Create Next.js app
execSync(
  `npx create-next-app@latest ${projectName} --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes`,
  { stdio: 'inherit' }
);

// 2. Install awwwards dependencies
console.log('\n📦 Installing animation dependencies...\n');
execSync(
  `npm install gsap lenis split-type @fontsource/geist`,
  { cwd: projectPath, stdio: 'inherit' }
);

// 3. Create folder structure
const dirs = [
  'components/layout',
  'components/sections',
  'components/ui',
  'hooks',
  'lib',
];
dirs.forEach(dir => {
  fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
});

// 4. Create useLenis hook
fs.writeFileSync(
  path.join(projectPath, 'hooks/useLenis.ts'),
`'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, []);
}
`);

// 5. Create CustomCursor component
fs.writeFileSync(
  path.join(projectPath, 'components/ui/CustomCursor.tsx'),
`'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
    };

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(tick);

    const hoverEls = document.querySelectorAll('a, button, [data-cursor]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
`);

// 6. Create globals.css additions
const globalsAddition = `
/* awwwards-frontend: Cursor */
* { cursor: none; }
.cursor-dot {
  position: fixed; width: 6px; height: 6px;
  background: var(--accent, #0070f3); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width .2s, height .2s;
}
.cursor-ring {
  position: fixed; width: 36px; height: 36px;
  border: 1.5px solid rgba(0,0,0,0.4); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s;
}
body.cursor-hover .cursor-dot { width: 10px; height: 10px; }
body.cursor-hover .cursor-ring { width: 60px; height: 60px; opacity: .5; }

/* awwwards-frontend: Grain overlay */
body::after {
  content: '';
  position: fixed; inset: 0; z-index: 9990;
  pointer-events: none; opacity: .03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* awwwards-frontend: Overflow clip for text reveals */
.clip { overflow: hidden; }
`;

const globalsPath = path.join(projectPath, 'app/globals.css');
fs.appendFileSync(globalsPath, globalsAddition);

console.log(`
✅ Done! Your awwwards-ready project is at ./${projectName}

Next steps:
  cd ${projectName}
  npm run dev

Then ask Claude to build sections using the awwwards-frontend skill.
`);
