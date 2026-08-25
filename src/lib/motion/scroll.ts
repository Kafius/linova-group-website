// Smooth scroll + scroll-trigger core. One rule (brief §5): every scroll
// effect runs through Lenis + GSAP ScrollTrigger — never native smooth-scroll
// mixed with GSAP. Under reduced motion neither engine starts and callers
// must render end states.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from './index';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Idempotent. Returns null under reduced motion. */
export function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion()) return null;
  if (lenis) return lenis;

  // anchors: true — hash links scroll through Lenis instead of fighting it
  lenis = new Lenis({ lerp: 0.12, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  if (import.meta.env.DEV) {
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
  }
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // View transitions aren't enabled today; if they ever are, this prevents
  // leaked triggers on swap (§16 acceptance).
  document.addEventListener('astro:before-swap', destroyScroll, { once: true });

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToY(target: number | string, offset = 0): void {
  if (lenis) {
    lenis.scrollTo(target, { offset });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : null;
    const y = typeof target === 'number' ? target : (el?.getBoundingClientRect().top ?? 0) + window.scrollY + offset;
    window.scrollTo(0, y);
  }
}

export function destroyScroll(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  lenis?.destroy();
  lenis = null;
}

export { gsap, ScrollTrigger };
