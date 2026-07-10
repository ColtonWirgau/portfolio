'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Interactive demos for the How I Build page. The page argues against
   walls of text, so where a principle can be shown, the demo IS the
   explanation. Themed with the site's paper + accent tokens. */

const ACCENT = 'var(--color-accent)';
const FG = 'var(--color-fg)';
const MUTED = 'var(--color-muted)';
const BORDER = 'var(--color-border)';

function DemoFrame({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', padding: 'clamp(22px, 3vw, 32px)', background: 'var(--color-card)' }}
    >
      <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700, marginBottom: '20px' }}>{label}</div>
      {children}
      <p style={{ fontSize: '13px', color: MUTED, marginTop: '22px', lineHeight: 1.6, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{caption}</p>
    </motion.div>
  );
}

const pillButton: React.CSSProperties = {
  fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'inherit',
  padding: '10px 18px', borderRadius: '100px', cursor: 'pointer', border: 'none',
  background: ACCENT, color: 'var(--color-bg)',
};

/* ── 1. Optimistic UI ──────────────────────────────────────────────── */

const ROSTER = ['Ja’Marr Chase', 'Puka Nacua', 'Jahmyr Gibbs', 'Sam LaPorta', 'CeeDee Lamb'];

function OptimisticDemo() {
  const [items, setItems] = useState<{ id: number; name: string; pending: boolean }[]>([
    { id: 0, name: 'Bijan Robinson', pending: false },
  ]);
  const next = useRef(1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const add = () => {
    if (items.length >= 5) {
      setItems([{ id: 0, name: 'Bijan Robinson', pending: false }]);
      next.current = 1;
      return;
    }
    const id = next.current++;
    const name = ROSTER[(id - 1) % ROSTER.length];
    setItems((prev) => [...prev, { id, name, pending: true }]);
    const t = window.setTimeout(() => {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, pending: false } : i)));
    }, 950);
    timers.current.push(t);
  };

  return (
    <DemoFrame label="Snappy by default: optimistic UI" caption="The row lands the instant you click, in a pending state, then settles once the server answers 200. If it failed, it would roll back. Try it.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
        <AnimatePresence initial={false}>
          {items.map((i) => (
            <motion.div
              key={i.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: '8px',
                border: `1px solid ${BORDER}`,
                background: 'var(--color-bg)',
                opacity: i.pending ? 0.55 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: FG }}>{i.name}</span>
              {i.pending ? (
                <span className="hib-spin" aria-label="saving" style={{ width: 15, height: 15, display: 'inline-block' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6" /></svg>
                </span>
              ) : (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }} style={{ color: ACCENT, display: 'inline-flex' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button type="button" onClick={add} style={pillButton}>
        {items.length >= 5 ? 'Reset' : 'Add to trade'}
      </button>
    </DemoFrame>
  );
}

/* ── 2. A wall of text says nothing ────────────────────────────────── */

function InfoIcon({ path }: { path: string }) {
  return (
    <span style={{ flexShrink: 0, color: ACCENT, display: 'inline-flex', marginTop: '1px' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: path }} />
    </span>
  );
}

const CLEAN_ROWS = [
  { icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', label: 'Sundays', value: '9:00 & 11:00 AM' },
  { icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', label: 'Location', value: '2400 S Baldwin Rd' },
  { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>', label: 'Childcare', value: 'Ages 0 to 5' },
  { icon: '<path d="M14 16H9m10 0h3v-3.34a4 4 0 0 0-.9-2.52L18 7h-4"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>', label: 'Parking', value: 'Free, north & east lots' },
];

function WallOfTextDemo() {
  const [clean, setClean] = useState(true);
  const tab = (active: boolean): React.CSSProperties => ({
    fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'inherit', cursor: 'pointer',
    padding: '7px 14px', borderRadius: '100px', border: `1px solid ${active ? ACCENT : BORDER}`,
    background: active ? ACCENT : 'transparent', color: active ? 'var(--color-bg)' : MUTED,
    transition: 'all 0.2s ease',
  });
  return (
    <DemoFrame label="A wall of text says nothing" caption="Same information, both ways. The block is technically complete and communicates nothing; hierarchy, icons, and color say more with less.">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button type="button" onClick={() => setClean(false)} style={tab(!clean)}>Wall of text</button>
        <button type="button" onClick={() => setClean(true)} style={tab(clean)}>Clear</button>
      </div>
      <div style={{ minHeight: '184px' }}>
        {clean ? (
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: FG, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>Lake Orion</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {CLEAN_ROWS.map((r) => (
                <div key={r.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <InfoIcon path={r.icon} />
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 700 }}>{r.label}</div>
                    <div style={{ fontSize: '15px', color: FG, fontWeight: 500 }}>{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: MUTED }}>
            The Lake Orion campus gathers on Sunday mornings at 9:00 AM and again at 11:00 AM at our building located at 2400 South Baldwin Road, and free parking is available in both the north and east lots for all attendees, and childcare is offered throughout both services for children ranging in age from zero through five years old, and if you have any questions the campus office is generally staffed during the week and can be reached by phone or email during normal business hours.
          </p>
        )}
      </div>
    </DemoFrame>
  );
}

/* ── 3. Static first + skeletons ───────────────────────────────────── */

const STATS = [
  { label: 'Net position', value: '+$1,240' },
  { label: 'Seats sold', value: '18 / 24' },
  { label: 'Next game', value: 'Wk 13 · Thu' },
];

function SkeletonDemo() {
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const reload = () => {
    setLoading(true);
    timer.current = window.setTimeout(() => setLoading(false), 1200);
  };
  return (
    <DemoFrame label="Show the static parts first" caption="The shell and labels are instant; only the data waits, streaming into skeletons. Nobody stares at a blank screen. Hit reload.">
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: 'var(--color-bg)', marginBottom: '18px' }}>
        {/* static shell: always instant */}
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: FG, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Season Dashboard</div>
          <div style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Roar Tracker</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: '16px 18px', borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '10px' }}>{s.label}</div>
              {loading ? (
                <div className="hib-shimmer" style={{ height: '18px', width: '80%' }} />
              ) : (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{ fontSize: '16px', fontWeight: 700, color: FG }}>{s.value}</motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={reload} disabled={loading} style={{ ...pillButton, opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Loading…' : 'Reload'}
      </button>
    </DemoFrame>
  );
}

/* ── Registry ──────────────────────────────────────────────────────── */

export type DemoId = 'optimistic' | 'wallOfText' | 'skeleton';

export function HowIBuildDemo({ id }: { id: DemoId }) {
  if (id === 'optimistic') return <OptimisticDemo />;
  if (id === 'wallOfText') return <WallOfTextDemo />;
  return <SkeletonDemo />;
}
