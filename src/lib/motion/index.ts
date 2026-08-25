// Shared motion utilities — every animated component imports from here so
// reduced-motion, session, and cleanup behavior stay consistent (brief §5).

export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Defer motion boot until after first paint (load event + a frame). Heavy
 * animation bundles are dynamic-imported inside the callback so they never
 * sit on the LCP critical path — the content is fully static without them.
 */
export function afterLoad(fn: () => void): void {
  // Boot strictly after first contentful paint has COMMITTED (rAF timing is
  // not enough — early frames can keep invalidating), plus the load event.
  // Evaluating gsap/Lenis before FCP measurably delays it.
  const boot = () => setTimeout(fn, 60);
  const afterFcp = () => {
    const painted = performance
      .getEntriesByType('paint')
      .some((entry) => entry.name === 'first-contentful-paint');
    if (painted) {
      boot();
      return;
    }
    try {
      const observer = new PerformanceObserver((list) => {
        if (list.getEntries().some((entry) => entry.name === 'first-contentful-paint')) {
          observer.disconnect();
          boot();
        }
      });
      observer.observe({ type: 'paint', buffered: true });
    } catch {
      boot();
    }
  };
  if (document.readyState === 'complete') afterFcp();
  else window.addEventListener('load', afterFcp, { once: true });
}

export const isCoarsePointer = (): boolean =>
  window.matchMedia('(pointer: coarse)').matches;

const INTRO_KEY = 'linova:intro-played';

export function hasPlayedIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return true; // storage blocked → never replay the intro
  }
}

export function markIntroPlayed(): void {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* storage blocked — nothing to do */
  }
}

/**
 * Magnetic hover — the element leans toward the cursor (transform only).
 * No-op on touch devices and under reduced motion. Returns a cleanup fn.
 */
export function magnetic(el: HTMLElement, strength = 0.25, maxShift = 10): () => void {
  if (prefersReducedMotion() || isCoarsePointer()) return () => {};

  const onMove = (event: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const x = Math.max(-maxShift, Math.min(maxShift, dx * strength));
    const y = Math.max(-maxShift, Math.min(maxShift, dy * strength));
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    el.style.transform = '';
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
    el.style.transform = '';
  };
}
