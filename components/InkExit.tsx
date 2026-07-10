'use client';

import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InkBurst } from '@/components/InkBurst';

/* Shared exit for the pages that morph open from the home page (Woodside,
   Church Hub, How I Build). They open with their own brand transition, but
   they all leave the same way: the squid-ink flood from the /squid dive.
   The clicked point squirts the circle-cluster burst, it grows until it
   swallows the screen, and we surface back on the home page. */

const INK = '#171209';

export function useInkExit(href = '/#work') {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const fired = useRef(false);
  const navigated = useRef(false);
  const target = useRef(href);

  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);

  const go = useCallback(() => {
    if (navigated.current) return;
    navigated.current = true;
    router.push(target.current);
  }, [router]);

  const exitWithInk = useCallback(
    (e: React.MouseEvent, to?: string) => {
      if (fired.current) return;
      fired.current = true;
      target.current = to ?? href;
      setOrigin({ x: e.clientX, y: e.clientY });
      // Same throttled-window safety net as the footer / squid dive: if the
      // ink animation is ever throttled, don't strand the user under it.
      window.setTimeout(go, reduce ? 500 : 1100);
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
        <motion.span
          initial={{ scale: 0.25, opacity: 1 }}
          animate={{ scale, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          onAnimationComplete={go}
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
      )}
    </div>
  ) : null;

  return { exitWithInk, inkOverlay };
}

/* The fixed close control these pages share: a round X pinned to the top
   right that stays on screen while you scroll, tinted to the page's brand. */
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
        right: '18px',
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
