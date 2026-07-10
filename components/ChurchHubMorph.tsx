'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Church Hub open transition. Not the squid ink dive: this is its own
 * thing. A marble panel wipes in from the click point, then a blue
 * hub-and-spoke network draws itself over it (a "hub" for Church Hub),
 * before the page routes in. Palette matches the poster/sheet: marble
 * over cream #EDE8E0 with the slate-blue #7BA3C9 accent.
 */

const BLUE = '#7BA3C9';
const CREAM = '#EDE8E0';

// Satellite nodes around the central hub (unit circle, drawn at radius R).
const SPOKES = [
  { a: -90, r: 1.0 },
  { a: -32, r: 0.82 },
  { a: 34, r: 1.0 },
  { a: 96, r: 0.78 },
  { a: 150, r: 0.95 },
  { a: 210, r: 0.8 },
];
const R = 96;
const node = (a: number, r: number) => {
  const rad = (a * Math.PI) / 180;
  return { x: 130 + Math.cos(rad) * R * r, y: 130 + Math.sin(rad) * R * r };
};

export function ChurchHubMorph({
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
        background: CREAM,
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
      {/* marble texture, matching the poster / sheet header */}
      <img
        src="/marble.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, filter: 'saturate(0)' }}
      />

      {/* hub-and-spoke network drawing itself in blue */}
      {!reduce && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
            {SPOKES.map((s, i) => {
              const p = node(s.a, s.r);
              return (
                <motion.line
                  key={`l${i}`}
                  x1={130}
                  y1={130}
                  x2={p.x}
                  y2={p.y}
                  stroke={BLUE}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.34, delay: 0.42 + i * 0.05, ease: 'easeOut' }}
                />
              );
            })}
            {SPOKES.map((s, i) => {
              const p = node(s.a, s.r);
              return (
                <motion.circle
                  key={`n${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  fill={CREAM}
                  stroke={BLUE}
                  strokeWidth={1.6}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.22, delay: 0.62 + i * 0.05, ease: 'backOut' }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: 'fill-box' }}
                />
              );
            })}
            <motion.circle
              cx={130}
              cy={130}
              r={9}
              fill={BLUE}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.34, ease: 'backOut' }}
              style={{ transformOrigin: '130px 130px', transformBox: 'fill-box' }}
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
