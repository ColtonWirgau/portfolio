'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * "How I Build" open transition. Its own thing in the main site theme
 * (paper + accent orange), distinct from Church Hub (marble/hub),
 * Woodside (navy/W/rings), and the squid ink dive: a paper panel wipes
 * in from the click point, then a set of layered planes stacks up from
 * the foundation to the top, echoing how the page is organized (data ->
 * backend -> frontend -> UI). Then the page routes in.
 */

const LAYERS = [0, 1, 2, 3]; // top -> bottom in DOM order

export function HowIBuildMorph({
  origin,
  onComplete,
}: {
  origin: { x: number; y: number };
  onComplete: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onComplete, reduce ? 260 : 1080);
    return () => clearTimeout(t);
  }, [onComplete, reduce]);

  const maxR = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--color-bg)',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      initial={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
      animate={
        reduce
          ? { opacity: 1 }
          : { clipPath: `circle(${Math.ceil(maxR) + 4}px at ${origin.x}px ${origin.y}px)` }
      }
      transition={{ duration: reduce ? 0.2 : 0.52, ease: [0.65, 0, 0.35, 1] }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 52%, rgba(217,68,32,0.12) 0%, transparent 60%)' }} />

      {!reduce && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '210px' }}>
            {LAYERS.map((i) => (
              <motion.div
                key={i}
                style={{
                  height: '22px',
                  borderRadius: '5px',
                  background: 'var(--color-accent)',
                  opacity: 0.55 + i * 0.15, // bottom layers read more solid
                  boxShadow: '0 6px 16px rgba(217,68,32,0.22)',
                }}
                initial={{ opacity: 0, y: 22, scaleX: 0.9 }}
                animate={{ opacity: 0.55 + i * 0.15, y: 0, scaleX: 1 }}
                // build from the bottom up (foundation first)
                transition={{ duration: 0.34, delay: 0.42 + (LAYERS.length - 1 - i) * 0.11, ease: [0.34, 1.3, 0.5, 1] }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
