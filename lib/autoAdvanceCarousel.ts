/* Auto-advance for the mobile carousels (work posters, personal projects,
   my story). Each carousel renders three duplicated sets and scrolls
   horizontally on small screens; this steps it one card at a time on a
   timer and hands control to the visitor the moment they touch it.

   Only runs when the element is actually a horizontal carousel (mobile:
   scrollWidth exceeds clientWidth) and reduced-motion is off. Returns a
   cleanup that clears the timer and listeners. */
export function autoAdvanceCarousel(
  el: HTMLElement,
  cardsPerSet: number,
  intervalMs: number,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};

  let taken = false;

  const advance = () => {
    if (taken || document.hidden) return;
    // Not a carousel (desktop grid) -> nothing to advance.
    if (el.scrollWidth <= el.clientWidth + 4) return;
    const setWidth = el.scrollWidth / 3;
    const step = setWidth / cardsPerSet;
    // Pre-wrap before a smooth step would cross the last set, so the
    // smooth animation never gets interrupted by the boundary reset (the
    // three sets are identical, so the jump is invisible).
    if (el.scrollLeft + step >= setWidth * 2) {
      el.scrollLeft -= setWidth;
    }
    el.scrollTo({ left: el.scrollLeft + step, behavior: 'smooth' });
  };

  const timer = window.setInterval(advance, intervalMs);

  const stop = () => {
    taken = true;
    window.clearInterval(timer);
  };
  const gestures: (keyof HTMLElementEventMap)[] = ['touchstart', 'pointerdown', 'wheel', 'keydown'];
  gestures.forEach((g) => el.addEventListener(g, stop, { passive: true }));

  return () => {
    window.clearInterval(timer);
    gestures.forEach((g) => el.removeEventListener(g, stop));
  };
}
