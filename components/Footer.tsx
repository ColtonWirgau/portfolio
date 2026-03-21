'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

const SQUID_PATH = "M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z";

const FOOTER_BG = '#2A2622';

// Simple swimming squid (for horizontal swimmers)
function SwimSquid({ size, rotation, flip }: { size: number; rotation: number; flip?: boolean }) {
  const height = size * 0.4;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 341.34 852.51"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)${flip ? ' scaleX(-1)' : ''}` }}
    >
      <path fill="var(--color-accent)" d={SQUID_PATH} />
      <ellipse cx="170.67" cy="473.09" rx="39.52" ry="42.83" fill="#FFFFFF" />
      <circle cx="170.67" cy="473.09" r="17.6" fill={FOOTER_BG} />
    </svg>
  );
}

// Emerging squid — starts invisible (same color as bg), eyes fade in, then body reveals
function EmergingSquid({ size, isInView, delay }: { size: number; isInView: boolean; delay: number }) {
  const height = size * 2.5; // tall aspect ratio
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 341.34 852.51"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body — starts transparent, transitions to accent */}
      <motion.path
        d={SQUID_PATH}
        initial={{ fill: '#E8501C', opacity: 0 }}
        animate={isInView ? { opacity: [0, 0, 0, 1] } : undefined}
        transition={{ duration: 4, delay, times: [0, 0.4, 0.7, 1], ease: 'easeInOut' }}
      />
      {/* Eyeball — starts transparent, fades to white */}
      <motion.ellipse
        cx="170.67"
        cy="473.09"
        rx="39.52"
        ry="42.83"
        initial={{ fill: '#FFFFFF', opacity: 0 }}
        animate={isInView ? { opacity: [0, 0, 1, 1] } : undefined}
        transition={{ duration: 3, delay, times: [0, 0.3, 0.6, 1], ease: 'easeInOut' }}
      />
      {/* Pupil — starts transparent, fades to dark */}
      <motion.circle
        cx="170.67"
        cy="473.09"
        r="17.6"
        initial={{ fill: '#111111', opacity: 0 }}
        animate={isInView ? { opacity: [0, 0, 1, 1] } : undefined}
        transition={{ duration: 3, delay, times: [0, 0.3, 0.6, 1], ease: 'easeInOut' }}
      />
    </svg>
  );
}

// Horizontal swimmers
const swimmers = [
  { top: 15, size: 80, duration: 5, delay: 0, direction: 'right' as const, bobAmount: 10 },
  { top: 55, size: 50, duration: 3.5, delay: 0.8, direction: 'right' as const, bobAmount: 6 },
  { top: 35, size: 65, duration: 6, delay: 1.5, direction: 'left' as const, bobAmount: 8 },
  { top: 70, size: 40, duration: 3, delay: 2.2, direction: 'right' as const, bobAmount: 5 },
];

interface AmbientSquid {
  id: number;
  top: number;
  size: number;
  duration: number;
  direction: 'left' | 'right';
  bobAmount: number;
}

function useAmbientSquids(isInView: boolean) {
  const [squids, setSquids] = useState<AmbientSquid[]>([]);
  const nextId = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  const spawnSquid = useCallback(() => {
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    const size = 30 + Math.random() * 50;
    const squid: AmbientSquid = {
      id: nextId.current++,
      top: 10 + Math.random() * 80,
      size,
      duration: 4 + Math.random() * 5,
      direction,
      bobAmount: 3 + Math.random() * 8,
    };
    setSquids(prev => [...prev, squid]);
  }, []);

  const removeSquid = useCallback((id: number) => {
    setSquids(prev => prev.filter(s => s.id !== id));
  }, []);

  useEffect(() => {
    if (!isInView) return;
    // Start ambient squids after initial animation finishes (~7s)
    const startDelay = setTimeout(() => {
      spawnSquid();
      const scheduleNext = () => {
        timeoutRef.current = setTimeout(() => {
          spawnSquid();
          scheduleNext();
        }, 3000 + Math.random() * 6000);
      };
      scheduleNext();
    }, 7000);

    return () => {
      clearTimeout(startDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, spawnSquid]);

  return { squids, removeSquid };
}

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { squids: ambientSquids, removeSquid } = useAmbientSquids(isInView);

  return (
    <footer ref={ref} style={{ position: 'relative', marginTop: '80px' }}>
      {/* Wavy cutout SVG */}
      <div style={{ position: 'relative', height: '80px', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="M0,40 C120,65 240,10 360,35 C480,60 600,15 720,40 C840,65 960,10 1080,35 C1200,60 1320,15 1440,40 L1440,80 L0,80 Z"
            fill={FOOTER_BG}
          />
        </svg>
      </div>

      {/* Footer body */}
      <div
        style={{
          background: FOOTER_BG,
          padding: '20px 24px 40px',
          position: 'relative',
          overflowX: 'clip',
          overflowY: 'visible',
          minHeight: '140px',
        }}
      >
        {/* Horizontal swimming squids */}
        {swimmers.map((s, i) => {
          const isRight = s.direction === 'right';
          return (
            <motion.div
              key={`swim-${i}`}
              initial={{ x: isRight ? '-120px' : 'calc(100vw + 120px)' }}
              animate={isInView ? { x: isRight ? 'calc(100vw + 120px)' : '-120px' } : undefined}
              transition={{
                x: { duration: s.duration, delay: s.delay, ease: [0.25, 0.1, 0.25, 1] },
              }}
              style={{
                position: 'absolute',
                top: `${s.top}px`,
                left: 0,
              }}
            >
              <motion.div
                animate={isInView ? {
                  y: Array.from({ length: 9 }, (_, j) => j % 2 === 0 ? 0 : (j % 4 === 1 ? -s.bobAmount : s.bobAmount)),
                  rotate: Array.from({ length: 9 }, (_, j) => j % 2 === 0 ? 0 : (j % 4 === 1 ? -3 : 3)),
                } : {}}
                transition={{ duration: s.duration, delay: s.delay, ease: 'easeInOut' }}
              >
                <SwimSquid size={s.size} rotation={isRight ? 90 : -90} flip={!isRight} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Ambient swimming squids — ongoing after initial animation */}
        {ambientSquids.map((s) => {
          const isRight = s.direction === 'right';
          return (
            <motion.div
              key={`ambient-${s.id}`}
              initial={{ x: isRight ? '-120px' : 'calc(100vw + 120px)' }}
              animate={{ x: isRight ? 'calc(100vw + 120px)' : '-120px' }}
              transition={{ duration: s.duration, ease: [0.25, 0.1, 0.25, 1] }}
              onAnimationComplete={() => removeSquid(s.id)}
              style={{
                position: 'absolute',
                top: `${s.top}px`,
                left: 0,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -s.bobAmount, 0, s.bobAmount, 0, -s.bobAmount, 0, s.bobAmount, 0],
                  rotate: [0, -3, 0, 3, 0, -3, 0, 3, 0],
                }}
                transition={{ duration: s.duration, ease: 'easeInOut' }}
              >
                <SwimSquid size={s.size} rotation={isRight ? 90 : -90} flip={!isRight} />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Emerging squids — stationary, camouflaged, then reveal */}
        <div style={{
          position: 'absolute',
          left: '60px',
          bottom: '10px',
        }}>
          <EmergingSquid size={60} isInView={isInView} delay={0.5} />
        </div>

        <div style={{
          position: 'absolute',
          right: '60px',
          bottom: '25px',
        }}>
          <EmergingSquid size={50} isInView={isInView} delay={1.2} />
        </div>

        {/* Footer content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="https://github.com/ColtonWirgau/" target="_blank" rel="noopener noreferrer" style={{ color: '#6B665C', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#6B665C')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/coltonwirgau/" target="_blank" rel="noopener noreferrer" style={{ color: '#6B665C', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#6B665C')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ColtHavilah" target="_blank" rel="noopener noreferrer" style={{ color: '#6B665C', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#6B665C')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="mailto:ColtonWirgau@gmail.com" style={{ color: '#6B665C', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#6B665C')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634L21.044 2.32c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
              </svg>
            </a>
          </div>

          <a href="mailto:ColtonWirgau@gmail.com" style={{ fontSize: '13px', color: '#58534A', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.color = '#58534A')}>
            ColtonWirgau@gmail.com
          </a>

          <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4A463E' }}>
            Colton Wirgau &middot; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
