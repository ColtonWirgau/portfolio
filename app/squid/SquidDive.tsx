'use client';

import { useRouter } from 'next/navigation';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SquidMark } from '@/components/SquidMark';
import { InkBurst } from '@/components/InkBurst';

/* Same art as SquidMark, but with a live pupil that needs its own cx/cy,
   so the path is inlined here rather than reusing the component. */
const SQUID_PATH =
  'M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z';

const EYE_CX = 170.67;
const EYE_CY = 473.09;

const LIGHT = '#EDE8DC';
const LIGHT_DIM = 'rgba(237, 232, 220, 0.72)';
const LIGHT_FAINT = 'rgba(237, 232, 220, 0.45)';
const INK = '#171209';

const MAX_DEPTH = 1100;

/* Mouse-driven flourishes (cursor school, flashlight) only make sense with a
   real pointer; false during SSR and on touch devices. */
function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(pointer: fine)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(pointer: fine)').matches,
    () => false
  );
}

/* ---------- shared text styles ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '14px', fontWeight: 600 }}>
      {children}
    </div>
  );
}

function Heading({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        lineHeight: 0.95,
        marginBottom: '22px',
        color: light ? LIGHT : 'var(--color-fg)',
      }}
    >
      {children}
    </h2>
  );
}

function Prose({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '560px', color: light ? LIGHT_DIM : 'var(--color-muted)', marginBottom: '16px' }}>
      {children}
    </p>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

/* ---------- depth meter + section-by-section dive controls ---------- */

/* Scroll to the next/previous section relative to the current scroll position. */
function goSection(dir: 1 | -1) {
  const tops = [...document.querySelectorAll('.squid-dive section')].map(
    (s) => s.getBoundingClientRect().top + window.scrollY,
  );
  const y = window.scrollY;
  const eps = 40;
  const target = dir === 1 ? tops.find((t) => t > y + eps) : [...tops].reverse().find((t) => t < y - eps);
  if (target !== undefined) window.scrollTo({ top: target, behavior: 'smooth' });
}

/* Full-width click bands pinned to the top and bottom of the viewport:
   click anywhere along them to swim up or down one section. At either end
   of the dive they become the exit home: "back to dry land". */
function DiveBand({
  dir,
  visible,
  light,
  exit,
  onExit,
}: {
  dir: 1 | -1;
  visible: boolean;
  light: boolean;
  exit?: boolean;
  onExit?: (e: React.MouseEvent) => void;
}) {
  const label = exit ? 'Back to dry land' : dir === 1 ? 'Dive' : 'Ascend';
  const chevron = (
    <motion.span
      animate={{ y: dir === 1 ? [0, 6, 0] : [0, -6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ lineHeight: 0 }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {dir === 1 ? <path d="M6 9l6 6 6-6" /> : <path d="M6 15l6-6 6 6" />}
      </svg>
    </motion.span>
  );
  return (
    <button
      type="button"
      aria-label={exit ? label : dir === 1 ? 'Swim down to the next section' : 'Swim up to the previous section'}
      onClick={exit ? onExit : () => goSection(dir)}
      onPointerDown={(e) => e.stopPropagation()}
      className={`dive-band ${light ? 'dive-band-light' : 'dive-band-dark'}`}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: dir === -1 ? 0 : undefined,
        bottom: dir === 1 ? 0 : undefined,
        height: '84px',
        zIndex: 350,
        border: 'none',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: dir === -1 ? 'flex-start' : 'flex-end',
        gap: '4px',
        padding: dir === -1 ? '14px 0 0' : '0 0 14px',
        color: light ? LIGHT : 'var(--color-fg)',
        opacity: visible ? 0.75 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s, color 0.6s ease',
        cursor: 'pointer',
      }}
    >
      {dir === -1 && chevron}
      <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{label}</span>
      {dir === 1 && chevron}
    </button>
  );
}

function DepthMeter({ depth }: { depth: number }) {
  const zone = depth < 200 ? 'SUNLIGHT ZONE' : depth < 1000 ? 'TWILIGHT ZONE' : 'MIDNIGHT ZONE';
  const light = depth > 300;
  return (
    <div
      aria-hidden="true"
      className="fixed right-[18px] top-1/2 -translate-y-1/2 max-md:top-auto max-md:bottom-[68px] max-md:translate-y-0"
      style={{
        zIndex: 400,
        textAlign: 'right',
        pointerEvents: 'none',
        color: light ? LIGHT : 'var(--color-fg)',
        transition: 'color 0.6s ease',
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1 }}>{depth} m</div>
      <div style={{ fontSize: '9px', letterSpacing: '0.16em', marginTop: '5px', opacity: 0.65 }}>{zone}</div>
    </div>
  );
}

/* ---------- ink splats ---------- */

interface Splat {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
}

function useInkSplats() {
  const [splats, setSplats] = useState<Splat[]>([]);
  const nextId = useRef(0);

  const spawn = useCallback((e: React.PointerEvent, offsetY = 0) => {
    const splat: Splat = {
      id: nextId.current++,
      x: e.clientX,
      y: e.clientY + window.scrollY + offsetY,
      size: 110 + Math.random() * 80,
      rotate: Math.random() * 360,
    };
    setSplats((prev) => [...prev.slice(-7), splat]);
  }, []);

  const remove = useCallback((id: number) => {
    setSplats((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { splats, spawn, remove };
}

/* Same burst as the Personal Projects "Back" squirt on the home page. */
function InkSplat({ splat, onDone }: { splat: Splat; onDone: () => void }) {
  return (
    <motion.span
      initial={{ scale: 0.25, opacity: 0.85 }}
      animate={{ scale: 1.75, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      style={{
        position: 'absolute',
        left: splat.x,
        top: splat.y,
        x: '-50%',
        y: '-50%',
        rotate: splat.rotate,
        transformOrigin: 'center',
        pointerEvents: 'none',
        lineHeight: 0,
        zIndex: 300,
      }}
    >
      <InkBurst width={splat.size} fill="var(--color-fg)" />
    </motion.span>
  );
}

/* ---------- diver cursor + school (Weston's squids) ----------
   The native cursor is hidden on fine-pointer devices: a scuba diver IS the
   cursor, pinned so the tip of his pointing finger sits exactly on the
   pointer. A little school of squids swims along behind him, and bubbles
   rise from his regulator now and then. */

const DIVER_W = 38; // rendered width of the diver svg (viewBox is 64 x 120)
const DIVER_SCALE = DIVER_W / 64;
const HEAD_TIP = { x: 32 * DIVER_SCALE, y: 3 * DIVER_SCALE }; // crown of the helmet = the hotspot

/* The diver's own wardrobe, distinct from the squids' accent orange */
const WETSUIT = '#2F6E6B'; // deep teal
const DIVE_GEAR = '#E3B341'; // yellow tank + flippers

/* Streamlined and swimming up head first, arms at his sides, with a slight
   drift-tilt. The crown of his helmet sits exactly on the pointer (the tilt
   pivots around it, so the hotspot stays true). */
function DiverCursor() {
  return (
    <div style={{ transform: 'rotate(-14deg)', transformOrigin: `${HEAD_TIP.x}px ${HEAD_TIP.y}px`, lineHeight: 0 }}>
      <svg width={DIVER_W} height={DIVER_W * (120 / 64)} viewBox="0 0 64 120" aria-hidden="true">
      {/* tank, peeking over his right shoulder */}
      <rect x="40" y="20" width="9" height="27" rx="4.5" fill={DIVE_GEAR} />
      <rect x="41.5" y="16" width="6" height="6" rx="2" fill="#EDE8DC" />
      {/* legs */}
      <line x1="28" y1="56" x2="26" y2="86" stroke={WETSUIT} strokeWidth="6" strokeLinecap="round" />
      <line x1="36" y1="56" x2="38" y2="86" stroke={WETSUIT} strokeWidth="6" strokeLinecap="round" />
      {/* flippers, splayed slightly outward */}
      <path d="M23,84 L16,108 L26,102 L29,88 Z" fill={DIVE_GEAR} />
      <path d="M41,84 L48,108 L38,102 L35,88 Z" fill={DIVE_GEAR} />
      {/* torso */}
      <rect x="24" y="22" width="16" height="36" rx="8" fill={WETSUIT} />
      {/* arms, tucked at his sides */}
      <line x1="22" y1="28" x2="19" y2="52" stroke={WETSUIT} strokeWidth="5" strokeLinecap="round" />
      <line x1="42" y1="28" x2="45" y2="52" stroke={WETSUIT} strokeWidth="5" strokeLinecap="round" />
      {/* helmet + mask */}
      <circle cx="32" cy="14" r="10.5" fill="#EDE8DC" />
      <rect x="24.5" y="10" width="15" height="8.5" rx="3.5" fill={INK} />
      <circle cx="28.5" cy="13" r="1.5" fill="#EDE8DC" />
    </svg>
    </div>
  );
}

/* Bubbles that pop out of the diver's regulator every so often and rise,
   detaching from the diver so they trail behind as he swims. */
interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  duration: number;
}

function Bubbles({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    let timer: number;
    const schedule = () => {
      timer = window.setTimeout(() => {
        // Only exhale when the pointer is actually on screen
        if (mx.get() > 0) {
          const count = 1 + Math.floor(Math.random() * 3);
          // His head IS the pointer, so the regulator sits just below it
          const fresh = Array.from({ length: count }, (): Bubble => ({
            id: nextId.current++,
            x: mx.get() + 2 + Math.random() * 10,
            y: my.get() + 4 + Math.random() * 10,
            size: 4 + Math.random() * 7,
            drift: -8 + Math.random() * 16,
            duration: 2 + Math.random() * 1.6,
          }));
          setBubbles((prev) => [...prev.slice(-14), ...fresh]);
        }
        schedule();
      }, 1200 + Math.random() * 2600);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [mx, my]);

  const pop = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.75, 0], y: -60 - b.size * 5, x: b.drift }}
          transition={{ duration: b.duration, ease: 'easeOut' }}
          onAnimationComplete={() => pop(b.id)}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            border: '1.5px solid rgba(237, 232, 220, 0.65)',
          }}
        />
      ))}
    </>
  );
}

const SCHOOL = [
  { size: 15, stiffness: 170, damping: 22, dx: -34, dy: 40 },
  { size: 12, stiffness: 120, damping: 20, dx: 26, dy: 56 },
  { size: 9, stiffness: 75, damping: 17, dx: -6, dy: 76 },
];

function Follower({
  mx,
  my,
  size,
  stiffness,
  damping,
  dx,
  dy,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
  size: number;
  stiffness: number;
  damping: number;
  dx: number;
  dy: number;
}) {
  const x = useSpring(mx, { stiffness, damping });
  const y = useSpring(my, { stiffness, damping });
  return (
    <motion.div style={{ position: 'absolute', left: dx, top: dy, x, y, opacity: 0.85 }}>
      <SquidMark width={size} height={size * 2.5} eye={size >= 13} />
    </motion.div>
  );
}

function CursorSchool() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, [mx, my]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 600 }} aria-hidden="true">
      {/* The cursor: the crown of the diver's helmet pinned to the pointer, no spring lag */}
      <motion.div
        style={{
          position: 'absolute',
          left: -HEAD_TIP.x,
          top: -HEAD_TIP.y,
          x: mx,
          y: my,
        }}
      >
        <DiverCursor />
      </motion.div>
      <Bubbles mx={mx} my={my} />
      {SCHOOL.map((s, i) => (
        <Follower key={i} mx={mx} my={my} {...s} />
      ))}
    </div>
  );
}

/* ---------- the giant squid ---------- */

function GiantSquid() {
  const svgRef = useRef<SVGSVGElement>(null);
  const rawX = useMotionValue(EYE_CX);
  const rawY = useMotionValue(EYE_CY);
  const pupilX = useSpring(rawX, { stiffness: 200, damping: 20 });
  const pupilY = useSpring(rawY, { stiffness: 200, damping: 20 });
  const clickCount = useRef(0);
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const ex = r.left + r.width * (EYE_CX / 341.34);
      const ey = r.top + r.height * (EYE_CY / 852.51);
      const dx = e.clientX - ex;
      const dy = e.clientY - ey;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) return;
      const mag = 15 * Math.min(1, dist / 120);
      rawX.set(EYE_CX + (dx / dist) * mag);
      rawY.set(EYE_CY + (dy / dist) * mag);
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, [rawX, rawY]);

  const handleEyeClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setWinking(true);
      setTimeout(() => setWinking(false), 900);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 180 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 341.34 852.51"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: 'min(78vh, 640px)', width: 'auto', display: 'block' }}
        >
          <path fill="var(--color-accent)" d={SQUID_PATH} />
          <motion.g
            animate={{ scaleY: winking ? [1, 0.06, 0.06, 1] : 1 }}
            transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <ellipse cx={EYE_CX} cy={EYE_CY} rx="39.52" ry="42.83" fill="#FFFFFF" />
            <motion.circle cx={pupilX} cy={pupilY} r="17.6" fill={INK} />
          </motion.g>
          {/* Eye hit target; swallows pointerdown so the wink isn't hidden under an ink splat */}
          <circle
            cx={EYE_CX}
            cy={EYE_CY}
            r="60"
            fill="transparent"
            onClick={handleEyeClick}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ cursor: 'pointer', pointerEvents: 'all' }}
            aria-label="The giant squid's eye"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ---------- scale comparison ---------- */

const PX_PER_FOOT = 10;

function PersonSilhouette({ feet, fill }: { feet: number; fill: string }) {
  const h = feet * PX_PER_FOOT;
  return (
    <svg viewBox="0 0 24 64" width={(24 / 64) * h} height={h} aria-hidden="true">
      <circle cx="12" cy="6" r="5.5" fill={fill} />
      <rect x="6.5" y="13" width="11" height="21" rx="4" fill={fill} />
      <rect x="7" y="33" width="4.2" height="29" rx="2" fill={fill} />
      <rect x="12.8" y="33" width="4.2" height="29" rx="2" fill={fill} />
    </svg>
  );
}

function BusSilhouette({ feet }: { feet: number }) {
  const w = feet * PX_PER_FOOT;
  return (
    <svg viewBox="0 0 360 100" width={w} height={(100 / 360) * w} aria-hidden="true">
      <rect x="2" y="14" width="356" height="62" rx="12" fill="#C9A44E" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={22 + i * 50} y="26" width="34" height="22" rx="4" fill={INK} opacity="0.75" />
      ))}
      <circle cx="70" cy="82" r="14" fill={INK} />
      <circle cx="290" cy="82" r="14" fill={INK} />
    </svg>
  );
}

const SCALE_ITEMS: { label: string; sub: string; node: React.ReactNode }[] = [
  { label: 'Weston', sub: 'age 3, ~3 ft', node: <PersonSilhouette feet={3} fill={LIGHT} /> },
  { label: 'Me', sub: `5'9" (and not an inch less)`, node: <PersonSilhouette feet={5.75} fill={LIGHT} /> },
  { label: 'School bus', sub: '~36 ft', node: <BusSilhouette feet={36} /> },
  {
    label: 'Giant squid',
    sub: 'up to ~43 ft',
    node: <SquidMark width={43 * PX_PER_FOOT} direction="left" />,
  },
];

function ScaleStrip() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '56px',
        overflowX: 'auto',
        padding: '24px 32px 20px',
        borderBottom: `1px dashed ${LIGHT_FAINT}`,
        maxWidth: '100%',
      }}
    >
      {SCALE_ITEMS.map((item) => (
        <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {item.node}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: LIGHT }}>{item.label}</div>
            <div style={{ fontSize: '11px', color: LIGHT_FAINT, marginTop: '2px' }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- midnight zone: facts revealed by flashlight ---------- */

const MIDNIGHT_FACTS = [
  'No human has ever watched a giant squid hunt. Everything we know about how they eat is inference.',
  'For centuries the main evidence they existed at all was sucker scars on sperm whales and the occasional stranding.',
  'The colossal squid is heavier. The giant squid is longer. My loyalty is with longer.',
  'The kraken of sailor legend was almost certainly a giant squid, embellished by people who had earned the right to embellish.',
];

function MidnightFacts({ flashlight }: { flashlight: boolean }) {
  const lx = useMotionValue(-600);
  const ly = useMotionValue(-600);
  const mask = useMotionTemplate`radial-gradient(circle 340px at ${lx}px ${ly}px, transparent 0%, transparent 30%, rgba(6, 5, 3, 0.96) 100%)`;

  // The eye opens after lingering anywhere over the facts container
  // (or, without a pointer, a moment after the section scrolls into view).
  const [eyeOpen, setEyeOpen] = useState(false);
  const eyeTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(eyeTimer.current), []);
  const arm = () => {
    window.clearTimeout(eyeTimer.current);
    eyeTimer.current = window.setTimeout(() => setEyeOpen(true), 900);
  };
  const disarm = () => {
    window.clearTimeout(eyeTimer.current);
    setEyeOpen(false);
  };

  return (
    <motion.div
      style={{ position: 'relative' }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        lx.set(e.clientX - rect.left);
        ly.set(e.clientY - rect.top);
      }}
      onPointerEnter={flashlight ? arm : undefined}
      onPointerLeave={() => {
        lx.set(-600);
        ly.set(-600);
        if (flashlight) disarm();
      }}
      onViewportEnter={flashlight ? undefined : arm}
      onViewportLeave={flashlight ? undefined : disarm}
      viewport={{ margin: '-120px' }}
    >
      <MidnightEye open={eyeOpen} flashlight={flashlight} />
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        {MIDNIGHT_FACTS.map((fact) => (
          <div
            key={fact}
            style={{
              border: `1px solid ${LIGHT_FAINT}`,
              borderRadius: '10px',
              padding: '18px 20px',
              fontSize: '14px',
              lineHeight: 1.65,
              color: LIGHT_DIM,
              // Nearly opaque so the text stays readable when the eye
              // opens directly behind a card.
              background: 'rgba(10, 8, 6, 0.88)',
            }}
          >
            {fact}
          </div>
        ))}
      </div>
      {flashlight && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-24px',
            background: mask,
            pointerEvents: 'none',
            borderRadius: '12px',
            zIndex: 2,
          }}
        />
      )}
    </motion.div>
  );
}

/* ---------- the midnight eye ----------
   A giant squid eye hiding in the dark BEHIND the fact cards: an absolute
   background layer, so it adds no height. Hover anywhere over the facts
   container and, after a beat, it slowly opens between the cards and its
   pupil starts following you. Look away and it closes again. */

function MidnightEye({ open, flashlight }: { open: boolean; flashlight: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pupilX = useSpring(rawX, { stiffness: 110, damping: 18 });
  const pupilY = useSpring(rawY, { stiffness: 110, damping: 18 });

  // Pupil tracks the pointer once there is a pointer to track
  useEffect(() => {
    if (!flashlight) return;
    const handle = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const mag = 17 * Math.min(1, dist / 150);
      rawX.set((dx / dist) * mag);
      rawY.set((dy / dist) * mag);
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, [flashlight, rawX, rawY]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg ref={svgRef} width="420" height="235" viewBox="0 0 340 190" style={{ maxWidth: '92%', height: 'auto', flexShrink: 0 }}>
        <motion.g
          animate={{ scaleY: open ? 1 : 0.04 }}
          transition={{ duration: open ? 1.8 : 0.5, ease: 'easeInOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <ellipse cx="170" cy="95" rx="150" ry="86" fill="#EFE9DB" />
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="170" cy="95" r="62" fill="var(--color-accent)" />
            <circle cx="170" cy="95" r="42" fill={INK} />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

/* ---------- sightings log ---------- */

const SIGHTINGS = [
  { year: '1874', text: 'First photograph of a giant squid: a dead one, draped over a bathtub in Newfoundland.' },
  { year: '2004', text: 'First photos of a live giant squid in the wild, about 900 meters down off Japan.' },
  { year: '2012', text: 'First film of one in the deep. It took a submersible, a glowing lure, and more than a hundred dives.' },
  { year: 'today', text: 'You, on this page. Thanks for scrolling 1,100 meters.' },
];

/* ---------- fact chips around the encounter ---------- */

const ENCOUNTER_FACTS_LEFT = [
  'Three hearts. Two pump blood through the gills, one handles everything else.',
  'Blue blood: hemocyanin, built on copper where ours uses iron.',
];
const ENCOUNTER_FACTS_RIGHT = [
  'Eyes up to 10 inches across, the largest of any animal on Earth.',
  'The brain is shaped like a donut, and the esophagus runs through the hole.',
];

function FactChip({ text }: { text: string }) {
  return (
    <motion.div
      {...reveal}
      style={{
        border: `1px solid ${LIGHT_FAINT}`,
        borderRadius: '10px',
        padding: '12px 16px',
        fontSize: '13px',
        lineHeight: 1.6,
        color: LIGHT_DIM,
        background: 'rgba(0, 0, 0, 0.22)',
        maxWidth: '230px',
      }}
    >
      {text}
    </motion.div>
  );
}

/* ---------- drifting hero squids ---------- */

function DriftingSquid({ top, size, duration, delay }: { top: string; size: number; duration: number; delay: number }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ x: [0, -60, 0], y: [0, -14, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top, right: '8%', opacity: 0.45, pointerEvents: 'none' }}
    >
      <SquidMark width={size} direction="left" />
    </motion.div>
  );
}

/* ---------- page ---------- */

export function SquidDive() {
  const { scrollYProgress } = useScroll();
  const [depth, setDepth] = useState(0);
  const finePointer = useFinePointer();
  const { splats, spawn, remove } = useInkSplats();

  // Leaving the page gets the same ink flood as entering it from the footer
  const router = useRouter();
  const [exitInk, setExitInk] = useState<{ x: number; y: number } | null>(null);
  const wentHome = useRef(false);
  const goHome = () => {
    if (wentHome.current) return;
    wentHome.current = true;
    router.push('/');
  };
  const exitWithInk = (e: React.MouseEvent) => {
    if (exitInk) return;
    setExitInk({ x: e.clientX, y: e.clientY });
    // Same throttled-window safety net as the footer's dive transition
    window.setTimeout(goHome, 1100);
  };

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDepth(Math.min(MAX_DEPTH, Math.round(v * MAX_DEPTH)));
  });

  return (
    <div
      className="squid-dive"
      // Ink squirts from the startled school behind the diver (or right at a touch tap)
      onPointerDown={(e) => spawn(e, finePointer ? 52 : 0)}
      style={{
        position: 'relative',
        overflowX: 'clip',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        background: `linear-gradient(to bottom,
          #D5D2C8 0%,
          #CBC5B4 10%,
          #B3A78E 20%,
          #94836A 30%,
          #6F5F4C 40%,
          #4E4237 50%,
          #3A322A 58%,
          #2A2622 68%,
          #17130E 80%,
          #0C0A07 90%,
          #060504 100%)`,
      }}
    >
      {/* Hide the site nav: this page brings its own way back to shore. */}
      <style>{`
        body > nav { display: none !important; }
        .dive-band:hover { opacity: 1 !important; }
        .dive-band-dark:hover { background: linear-gradient(rgba(34, 34, 34, 0.1), rgba(34, 34, 34, 0.1)) !important; }
        .dive-band-light:hover { background: linear-gradient(rgba(237, 232, 220, 0.08), rgba(237, 232, 220, 0.08)) !important; }
      `}</style>

      {/* On mouse devices the squid IS the cursor */}
      {finePointer && <style>{`.squid-dive, .squid-dive * { cursor: none !important; }`}</style>}

      {/* Ink-clearing entry (pairs with the footer squids' ink transition in) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
        style={{ position: 'fixed', inset: 0, background: INK, zIndex: 5000, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <DepthMeter depth={depth} />
      {/* The bands become exits home at either end of the dive */}
      <DiveBand dir={-1} visible exit={depth <= 15} onExit={exitWithInk} light={depth > 300} />
      <DiveBand dir={1} visible exit={depth >= 1085} onExit={exitWithInk} light={depth > 300} />

      {/* Ink flood out: the same burst as the way in, then we surface on the home page */}
      {exitInk && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, overflow: 'hidden' }}>
          <motion.span
            initial={{ scale: 0.25, opacity: 1 }}
            animate={{ scale: 70, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            onAnimationComplete={goHome}
            style={{
              position: 'absolute',
              left: exitInk.x,
              top: exitInk.y,
              x: '-50%',
              y: '-50%',
              transformOrigin: 'center',
              lineHeight: 0,
            }}
          >
            <InkBurst width={140} fill={INK} />
          </motion.span>
        </div>
      )}
      {finePointer && <CursorSchool />}

      {splats.map((s) => (
        <InkSplat key={s.id} splat={s} onDone={() => remove(s.id)} />
      ))}

      {/* 0m: surface */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '96px 24px 80px', maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
        <DriftingSquid top="16%" size={64} duration={9} delay={0} />
        <DriftingSquid top="72%" size={38} duration={7} delay={2} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}>
          <Kicker>0 meters &middot; sea level</Kicker>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.4rem, 10vw, 7rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 0.92,
              marginBottom: '24px',
              color: 'var(--color-fg)',
            }}
          >
            The Squid Page
          </h1>
          <Prose>
            You clicked the squid. Respect. This page exists for no professional reason whatsoever:
            it is about my favorite animal, my son&apos;s favorite animal, and the tattoo that
            became this site&apos;s logo. The good stuff lives deep. Start scrolling.
          </Prose>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)', opacity: 0.75 }}>
            (and click anywhere: squids ink when startled)
          </p>
        </motion.div>
        {/* The fixed bottom dive band provides the down affordance from here on */}
      </section>

      {/* ~200m: favorite animal */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div {...reveal}>
          <Kicker>First things first</Kicker>
          <Heading>My favorite animal</Heading>
          <Prose>
            The giant squid. <em>Architeuthis dux</em>, if you&apos;re being formal about it. Up to
            forty-some feet of tentacles, a beak, jet propulsion, and eyes the size of dinner
            plates, and still nobody managed to film one alive in the deep until 2012.
          </Prose>
          <Prose>
            An animal that big spent nearly all of human history successfully avoiding us. That is
            my kind of animal.
          </Prose>
        </motion.div>
      </section>

      {/* ~350m: Weston */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div {...reveal}>
          <Kicker>Genetics</Kicker>
          <Heading light>It runs in the family</Heading>
          <Prose light>
            My son Weston is three, and he is fully squid-obsessed too. Squid books, squid bath
            toys, unsolicited squid facts at dinner. I take complete responsibility.
          </Prose>
          {finePointer && (
            <Prose light>
              You may have noticed you are the scuba diver down here, and a little school of
              squids is tagging along behind you. The tiny one at the back is him. He never quite
              keeps up, but he always comes along.
            </Prose>
          )}
        </motion.div>
      </section>

      {/* ~500m: the tattoo */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 24px', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div {...reveal} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: '1 1 320px' }}>
            <Kicker>Permanent ink</Kicker>
            <Heading light>The tattoo</Heading>
            <Prose light>
              I liked giant squids enough to get one tattooed on my arm. Later, this site needed a
              logo, and the answer was already inked on: same squid, same eye, zero design
              revisions.
            </Prose>
            <Prose light>
              It is the only logo I have ever shipped that literally cannot be changed.
            </Prose>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ flex: '0 0 auto', margin: '0 auto' }}
          >
            <SquidMark width={80} height={200} />
          </motion.div>
        </motion.div>
      </section>

      {/* ~700m: the encounter */}
      <section style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...reveal} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Kicker>~700 meters</Kicker>
          <Heading light>The encounter</Heading>
          <p style={{ fontSize: '16px', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto', color: LIGHT_DIM }}>
            This is roughly what it looks like when one finds you before you find it. She has been
            watching you since the surface.
          </p>
        </motion.div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: '0 1 240px' }}>
            {ENCOUNTER_FACTS_LEFT.map((f) => (
              <FactChip key={f} text={f} />
            ))}
          </div>
          <GiantSquid />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: '0 1 240px' }}>
            {ENCOUNTER_FACTS_RIGHT.map((f) => (
              <FactChip key={f} text={f} />
            ))}
          </div>
        </div>
        <motion.p {...reveal} style={{ textAlign: 'center', marginTop: '36px', fontSize: '12px', color: LIGHT_FAINT }}>
          (rumor is she winks for people who click her eye three times)
        </motion.p>
      </section>

      {/* scale */}
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 0', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...reveal} style={{ padding: '0 32px' }}>
          <Kicker>For reference</Kicker>
          <Heading light>How big are we talking?</Heading>
          <Prose light>Everything below is drawn on the same scale. Yes, really.</Prose>
        </motion.div>
        <motion.div {...reveal}>
          <ScaleStrip />
        </motion.div>
      </section>

      {/* ~1000m: midnight zone */}
      <section style={{ minHeight: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div {...reveal}>
          <Kicker>1,000 meters</Kicker>
          <Heading light>The midnight zone</Heading>
          <Prose light>
            No sunlight has ever reached this deep.{' '}
            {finePointer ? 'Bring your own: your cursor is the flashlight now.' : 'Squint.'}{' '}
            And fair warning: something down here is watching back.
          </Prose>
        </motion.div>
        <motion.div {...reveal} style={{ marginTop: '24px' }}>
          <MidnightFacts flashlight={finePointer} />
        </motion.div>
      </section>

      {/* the log + surface button */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px 64px', maxWidth: '760px', margin: '0 auto' }}>
        <motion.div {...reveal}>
          <Kicker>The log</Kicker>
          <Heading light>Verified sightings</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
            {SIGHTINGS.map((s) => (
              <div key={s.year} style={{ display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-accent)', minWidth: '72px' }}>
                  {s.year}
                </div>
                <div style={{ fontSize: '14.5px', lineHeight: 1.65, color: LIGHT_DIM }}>{s.text}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...reveal} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '96px', gap: '40px' }}>
          <motion.button
            type="button"
            whileHover="hover"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
            }}
          >
            <motion.div variants={{ hover: { y: -12 } }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <SquidMark width={26} height={65} />
            </motion.div>
            <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: LIGHT_DIM }}>
              Jet back to the surface
            </span>
          </motion.button>
          <p style={{ fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(237, 232, 220, 0.3)' }}>
            Colton (and Weston) Wirgau &middot; the bottom of the ocean
          </p>
        </motion.div>
      </section>
    </div>
  );
}
