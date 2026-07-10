'use client';

import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InkBurst } from '@/components/InkBurst';

/* Shared exit for the pages that morph open from the home page (Woodside,
   Church Hub, How I Build). They open with their own brand transition, but
   they all leave the same way: the squid-ink flood from the /squid dive.
   The clicked point squirts the circle-cluster burst, it grows until it
   swallows the screen, and in the last beat of ink a shadow of the giant
   squid's eye blinks at you (same eye as /squid's midnight zone, barely
   lighter than the ink) as we surface back on the home page. */

const INK = '#171209';
const EYE_SCLERA = 'rgba(239, 233, 219, 0.045)';

export function useInkExit(href = '/#work') {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const fired = useRef(false);
  const navigated = useRef(false);
  const target = useRef(href);

  useEffect(() => {
    router.prefetch(href.startsWith('/#') ? '/' : href);
  }, [router, href]);

  const go = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    const to = target.current;
    // Never push a '/#id' URL: Next's App Router keeps the last hash in its
    // internal state, so a repeated push stacks into '/#work#work'. Instead
    // stash the section and land on '/', where the home page scrolls to it
    // on mount and cleans the URL.
    if (to.startsWith('/#')) {
      if (typeof window !== 'undefined') sessionStorage.setItem('homeScroll', to.slice(2));
      router.push('/');
    } else {
      router.push(to);
    }
  }, [router]);

  const exitWithInk = useCallback(
    (e: React.MouseEvent, to?: string) => {
      if (fired.current) return;
      fired.current = true;
      target.current = to ?? href;
      setOrigin({ x: e.clientX, y: e.clientY });
      // Same throttled-window safety net as the footer / squid dive: if the
      // ink or eye animation is ever throttled, don't strand the user in
      // the dark. Covers the full flood + blink sequence.
      window.setTimeout(go, reduce ? 500 : 1600);
    },
    [go, href, reduce],
  );

  // Scale so the burst's narrowest reach still clears the farthest corner
  // (70 is the /squid baseline; big screens need more).
  const scale = origin
    ? Math.max(
        70,
        Math.hypot(
          Math.max(origin.x, window.innerWidth - origin.x),
          Math.max(origin.y, window.innerHeight - origin.y),
        ) / 30,
      )
    : 70;

  const inkOverlay = origin ? (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {reduce ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onAnimationComplete={go}
          style={{ position: 'absolute', inset: 0, background: INK }}
        />
      ) : (
        <>
          <motion.span
            initial={{ scale: 0.25, opacity: 1 }}
            animate={{ scale, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              left: origin.x,
              top: origin.y,
              x: '-50%',
              y: '-50%',
              transformOrigin: 'center',
              lineHeight: 0,
            }}
          >
            <InkBurst width={140} fill={INK} />
          </motion.span>

          {/* Something in the dark watches you leave: a shadow of the
              /squid midnight eye, barely lighter than the ink, blinks
              once as the flood finishes. It fades in while the last of
              the screen is still being swallowed, so it costs the exit
              almost no time; when the lid drops we surface home. */}
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <motion.svg
              width="min(40vw, 280px)"
              viewBox="0 0 340 190"
              style={{ overflow: 'visible' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.45, ease: 'easeOut' }}
            >
              <motion.g
                initial={{ scaleY: 0.04 }}
                animate={{ scaleY: [0.04, 1, 1, 0.04] }}
                transition={{ duration: 0.55, delay: 0.45, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
                onAnimationComplete={go}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                <ellipse cx="170" cy="95" rx="150" ry="86" fill={EYE_SCLERA} />
                <circle cx="170" cy="95" r="62" fill="var(--color-accent)" fillOpacity={0.06} />
                {/* The pupil settles on you as the eye opens */}
                <motion.circle
                  cx="170"
                  cy="95"
                  r="42"
                  fill={INK}
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, delay: 0.55, ease: 'easeOut' }}
                />
              </motion.g>
            </motion.svg>
          </div>
        </>
      )}
    </div>
  ) : null;

  return { exitWithInk, inkOverlay };
}

/* The fixed close control these pages share: a round X pinned to the top
   left that stays on screen while you scroll, tinted to the page's brand. */
export function InkCloseButton({
  onClick,
  color,
  background,
  border,
  label = 'Close and return to the main site',
}: {
  onClick: (e: React.MouseEvent) => void;
  color: string;
  background: string;
  border: string;
  label?: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      title="Close"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
      whileHover={{ rotate: 90, scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'fixed',
        top: 'max(18px, env(safe-area-inset-top))',
        left: 'max(18px, env(safe-area-inset-left))',
        zIndex: 900,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        border: `1px solid ${border}`,
        background,
        color,
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        padding: 0,
        backdropFilter: 'blur(12px) saturate(1.3)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.3)',
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </motion.button>
  );
}
