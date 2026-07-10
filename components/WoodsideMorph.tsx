'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { WOODSIDE_PATHS, WOODSIDE_VIEWBOX } from '@/components/WoodsideMark';

/**
 * Woodside open transition. Its own thing, distinct from Church Hub's
 * marble/hub and the squid ink dive: a deep-navy panel wipes in from the
 * click point, a green signal ring pulses out, and the Woodside "W" flame
 * mark assembles one brush stroke at a time before the page routes in.
 * Palette matches the poster + live brand: navy with the green #62BB46.
 */

const NAVY = '#16202B';
const GREEN = '#62BB46';

export function WoodsideMorph({
  origin,
  onComplete,
}: {
  origin: { x: number; y: number };
  onComplete: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onComplete, reduce ? 280 : 1160);
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
        background: NAVY,
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
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(98,187,70,0.12) 0%, transparent 62%)' }} />

      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        {/* signal ring pulsing out behind the mark */}
        {!reduce && (
          <motion.div
            style={{ gridArea: '1 / 1', width: 150, height: 150, borderRadius: '50%', border: `2px solid ${GREEN}`, justifySelf: 'center', alignSelf: 'center' }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 4.5], opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut', times: [0, 0.25, 1] }}
          />
        )}

        {/* the Woodside W flame mark, assembling stroke by stroke */}
        <motion.svg
          style={{ gridArea: '1 / 1', justifySelf: 'center', alignSelf: 'center' }}
          width={150}
          height={150}
          viewBox={WOODSIDE_VIEWBOX}
          fill={GREEN}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.34, 1.4, 0.5, 1] }}
        >
          {WOODSIDE_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: reduce ? 0 : 0.46 + i * 0.14, ease: 'easeOut' }}
            />
          ))}
        </motion.svg>
      </div>
    </motion.div>
  );
}
