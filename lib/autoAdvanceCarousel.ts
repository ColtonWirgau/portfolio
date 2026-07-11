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
    // Always step one card to the right. The carousel's own settle-wrap
    // recenters into the middle set once the smooth scroll finishes, so
    // stepping off the end reads as one continuous card, not a jump back.
    const step = el.scrollWidth / 3 / cardsPerSet;
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
