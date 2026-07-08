'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// ── Types ──

interface BeyondCard {
  id: string;
  label: string;   // badge label (under the circle)
  kicker: string;  // small uppercase eyebrow on the full page
  title: string;   // big display title on the full page
  intro: string;   // serif italic lead line
  body: string[];  // paragraphs
  highlights: string[];
  icon: ReactNode; // stroke paths, rendered inside a 24x24 svg
}

// ── Data (best-guess content, sourced from the life-story facts) ──

const beyondCards: BeyondCard[] = [
  {
    id: 'athlete',
    label: 'HOF Athlete',
    kicker: 'Track · Football · Division I',
    title: 'Athlete',
    intro: 'Before I built software, I competed. Hard.',
    body: [
      'At Algonac High School I set seven school records in track and field, made All-State, finished as the program’s all-time leading scorer, and was inducted into the Hall of Fame. I also captained the football team and earned All-Area honors.',
      'I ran Division I track at the University of Detroit Mercy while carrying a full course load and graduating with honors, where I was named Student-Athlete of the Year and earned seven All-Horizon League selections.',
      'Sports taught me how to show up, compete, and lead when it counts. I still bring that to every team I build with.',
    ],
    highlights: ['7 school records', 'All-State · Hall of Fame', 'Football captain', 'D1 track at UDM', 'Student-Athlete of the Year', '7x All-Horizon League'],
    icon: <><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" /><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" /><path d="M18 9h1.5a1 1 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6 9H4.5a1 1 0 0 1 0-5H6" /></>,
  },
  {
    id: 'musician',
    label: 'Musician',
    kicker: 'Worship · Guitar · Ableton',
    title: 'Musician',
    intro: 'Music has been part of who I am for as long as I can remember.',
    body: [
      'I served as a worship director at Woodside Bible Church for about three years and still play there today. I’m known mainly as a writer, electric guitar player, and track builder, but I’ve also played plenty of drums, bass, keys, and led vocals.',
      'Over the years I’ve worked with artists like Detroit Collective, Elevation Worship, Maverick City Music, Chris Tomlin, and Switchfoot, and played a lot of big shows. I’m also widely known as the Ableton guru of the metro Detroit area.',
    ],
    highlights: ['Worship director, ~3 years', 'Guitar, keys, bass, drums', 'Writer & track builder', 'Elevation · Maverick City · Switchfoot', 'Ableton'],
    icon: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  },
  {
    id: 'father',
    label: 'Father',
    kicker: 'Sarah · Weston · Rosie',
    title: 'Father',
    intro: 'The most important thing I’ll ever build is my family.',
    body: [
      'I married Sarah at the Grosse Ile Municipal Airport, which probably tells you everything you need to know about us. We live in Clarkston, Michigan with our two kids, Weston and Rosie, and two dogs with nothing in common.',
      'When I’m not building something, I’m usually playing music, flying with Sarah, or chasing the kids around the house. Family is the center of gravity for everything else.',
    ],
    highlights: ['Married Sarah at an airport', 'Dad to Weston & Rosie', 'Clarkston, MI', 'Two very different dogs'],
    icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  },
];

const PANEL_BG = '#2A2622';

// ── Icon helper ──

function Icon({ children, size = 20 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// ── Component ──

export function BeyondCards() {
  const [selected, setSelected] = useState<BeyondCard | null>(null);

  const close = useCallback(() => setSelected(null), []);

  // Lock the page scroll container + Escape to close while a card is open.
  useEffect(() => {
    if (!selected) return;
    const main = document.querySelector('main');
    const prevOverflow = main?.style.overflow ?? '';
    if (main) main.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => {
      if (main) main.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [selected, close]);

  return (
    <>
      {/* Badge row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        {beyondCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelected(card)}
            aria-label={`Read more about ${card.label}`}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              width: '80px', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <motion.div
              layoutId={`beyond-${card.id}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              style={{
                width: '52px', height: '52px', borderRadius: '50%', background: PANEL_BG,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <motion.div layout="position">
                <Icon>{card.icon}</Icon>
              </motion.div>
            </motion.div>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-muted)', textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {card.label}
            </span>
          </button>
        ))}
      </div>

      {/* Morphing full-screen page */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="beyond-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(0,0,0,0.4)' }}
            />
            <motion.div
              key="beyond-panel"
              layoutId={`beyond-${selected.id}`}
              transition={{ type: 'spring', stiffness: 210, damping: 30 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 81, background: PANEL_BG,
                borderRadius: 0, overflow: 'hidden',
              }}
            >
              {/* Giant faint icon watermark */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.05 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                style={{ position: 'absolute', top: '-40px', right: '-40px', pointerEvents: 'none' }}
              >
                <Icon size={360}>{selected.icon}</Icon>
              </motion.div>

              {/* Close button */}
              <motion.button
                type="button"
                onClick={close}
                aria-label="Close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  position: 'absolute', top: '24px', left: '24px', zIndex: 2,
                  width: '44px', height: '44px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                <X className="h-4 w-4" />
              </motion.button>

              {/* Scrollable content, fades in after the morph */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0, transition: { duration: 0.1 } }}
                transition={{ delay: 0.18, duration: 0.4, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
              >
                <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(64px, 12vh, 140px) 28px 80px' }}>
                  <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '18px' }}>
                    {selected.kicker}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    color: '#fff',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    paddingTop: '0.06em',
                    marginBottom: '24px',
                  }}>
                    {selected.title}
                  </h2>
                  <div style={{ width: '48px', height: '2px', background: 'var(--color-accent)', marginBottom: '28px' }} />
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                    marginBottom: '32px',
                  }}>
                    {selected.intro}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                    {selected.body.map((para, i) => (
                      <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {selected.highlights.map((h) => (
                      <span key={h} style={{
                        fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.7)',
                        padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)',
                        lineHeight: 1.3,
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
