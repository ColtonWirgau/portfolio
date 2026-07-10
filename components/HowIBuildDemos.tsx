'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Interactive demos for the How I Build page. The page argues against
   walls of text, so where a principle can be shown, the demo IS the
   explanation. Themed with the site's paper + accent tokens. */

const ACCENT = 'var(--color-accent)';
const FG = 'var(--color-fg)';
const MUTED = 'var(--color-muted)';
const BORDER = 'var(--color-border)';
const PAPER = 'var(--color-bg)';
const GREEN = '#3F8F52';
const RED = '#C0492F';

function DemoFrame({ label, caption, control, children }: { label: string; caption: string; control?: ReactNode; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ border: `1px solid ${BORDER}`, borderRadius: '14px', padding: 'clamp(22px, 3vw, 32px)', background: 'var(--color-card)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap', marginBottom: '22px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700 }}>{label}</div>
        {control}
      </div>
      {children}
      <p style={{ fontSize: '13px', color: MUTED, marginTop: '22px', lineHeight: 1.6, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{caption}</p>
    </motion.div>
  );
}

const pillButton: React.CSSProperties = {
  fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'inherit',
  padding: '10px 18px', borderRadius: '100px', cursor: 'pointer', border: 'none',
  background: ACCENT, color: PAPER,
};

const ghostButton: React.CSSProperties = {
  fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'inherit',
  padding: '8px 14px', borderRadius: '100px', cursor: 'pointer',
  background: 'transparent', border: `1px solid ${BORDER}`, color: MUTED,
};

/* Segmented toggle that reads like a switch. The whole control is one
   button: a click anywhere on it advances to the next option. */
function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  const uid = useId();
  const idx = options.findIndex((o) => o.value === value);
  const next = options[(idx + 1) % options.length].value;
  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      style={{ display: 'inline-flex', padding: '3px', borderRadius: '100px', border: `1px solid ${BORDER}`, background: PAPER, cursor: 'pointer', fontFamily: 'inherit' }}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <span
            key={o.value}
            style={{
              position: 'relative',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.03em',
              padding: '7px 15px', borderRadius: '100px',
              color: active ? PAPER : MUTED,
              transition: 'color 0.2s ease',
            }}
          >
            {active && (
              <motion.span
                layoutId={`seg-${uid}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                style={{ position: 'absolute', inset: 0, background: ACCENT, borderRadius: '100px', zIndex: -1 }}
              />
            )}
            {o.label}
          </span>
        );
      })}
    </button>
  );
}

function Spinner({ size = 15 }: { size?: number }) {
  return (
    <span className="hib-spin" aria-label="loading" style={{ width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6" /></svg>
    </span>
  );
}

function useTimers() {
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  return (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
}

/* ── 1. Optimistic UI ──────────────────────────────────────────────── */

const TOPPINGS = ['Pepperoni', 'Mushrooms', 'Extra cheese', 'Jalapeños', 'Pineapple', 'Red onion'];
type OptStatus = 'pending' | 'confirmed' | 'settled' | 'deleting';

function OptimisticDemo() {
  const [items, setItems] = useState<{ id: number; name: string; status: OptStatus }[]>([
    { id: 0, name: 'Fresh mozzarella', status: 'settled' },
  ]);
  const next = useRef(1);
  const after = useTimers();
  const setStatus = (id: number, status: OptStatus) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

  const add = () => {
    const id = next.current++;
    const name = TOPPINGS[(id - 1) % TOPPINGS.length];
    setItems((prev) => [...prev, { id, name, status: 'pending' }]);
    after(() => setStatus(id, 'confirmed'), 900);   // server says 200
    after(() => setStatus(id, 'settled'), 2000);    // success flourish fades
  };
  const remove = (id: number) => {
    setStatus(id, 'deleting');                                    // optimistic, but not instant: show it going
    after(() => setItems((prev) => prev.filter((i) => i.id !== id)), 800);  // then poof once the server confirms
  };

  return (
    <DemoFrame label="Snappy by default: optimistic UI" caption="The row lands the instant you click, in a pending state, then settles once the server answers 200. The check is a quick flourish, not a permanent badge. Delete is optimistic too. If a write failed, it would roll back.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
        <AnimatePresence initial={false}>
          {items.map((i) => (
            <motion.div
              key={i.id}
              layout
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: i.status === 'pending' || i.status === 'deleting' ? 0.55 : 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.25 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                padding: '10px 14px', borderRadius: '8px', border: `1px solid ${BORDER}`, background: PAPER,
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: FG }}>{i.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {(i.status === 'pending' || i.status === 'deleting') && <Spinner />}
                {i.status === 'confirmed' && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }} style={{ color: GREEN, display: 'inline-flex' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.span>
                )}
                {i.status !== 'deleting' && (
                  <button type="button" onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: MUTED, display: 'inline-flex', padding: 0, lineHeight: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button type="button" onClick={add} disabled={items.length >= 6} style={{ ...pillButton, opacity: items.length >= 6 ? 0.5 : 1, cursor: items.length >= 6 ? 'default' : 'pointer' }}>
        Add topping
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
  { icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', label: 'Hours', value: 'Tue to Sun, 4 to 10 PM' },
  { icon: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', label: 'Where', value: '88 Main Street' },
  { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>', label: 'Seating', value: 'Dine-in or carry-out' },
  { icon: '<path d="M14 16H9m10 0h3v-3.34a4 4 0 0 0-.9-2.52L18 7h-4"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>', label: 'Parking', value: 'Free lot out back' },
];

function WallOfTextDemo() {
  const [view, setView] = useState<'glance' | 'wall'>('glance');
  return (
    <DemoFrame
      label="A wall of text says nothing"
      caption="Same information, both ways. The block is technically complete and communicates nothing; hierarchy, icons, and color say more with less."
      control={<Segmented value={view} onChange={setView} options={[{ value: 'wall', label: 'Wall of text' }, { value: 'glance', label: 'At a glance' }]} />}
    >
      <div style={{ minHeight: '188px' }}>
        {view === 'glance' ? (
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: FG, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '16px' }}>Tony&apos;s Pizza</div>
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
            Tony&apos;s Pizza is open Tuesday through Sunday from 4:00 PM until 10:00 PM at 88 Main Street, and we offer both dine-in seating and carry-out for all of our guests, and there is a free parking lot located directly behind the building, and if you would like to place an order ahead of time the kitchen phone is answered throughout all of our open hours every day of the week that we are open.
          </p>
        )}
      </div>
    </DemoFrame>
  );
}

/* ── 3. Mobile is not a smaller desktop ────────────────────────────── */

const MOVIES = [
  { title: 'Dune: Part Two', genre: 'Sci-fi', rating: '★★★★' },
  { title: 'The Holdovers', genre: 'Comedy', rating: '★★★' },
  { title: 'Poor Things', genre: 'Drama', rating: '★★★★' },
];

function MobileDemo() {
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop');
  return (
    <DemoFrame
      label="Mobile is not a smaller desktop"
      caption="Same data, rebuilt for the device. On the phone the table becomes cards and sheets, not a table pinched down until nobody can read it."
      control={<Segmented value={device} onChange={setDevice} options={[{ value: 'desktop', label: 'Desktop' }, { value: 'phone', label: 'Phone' }]} />}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
        {device === 'desktop' ? (
          <div style={{ width: '100%', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: PAPER }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, borderBottom: `1px solid ${BORDER}` }}>
              {['Title', 'Genre', 'Rating'].map((h) => <div key={h} style={{ padding: '10px 14px' }}>{h}</div>)}
            </div>
            {MOVIES.map((m) => (
              <div key={m.title} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: '14px', color: FG, borderBottom: `1px solid ${BORDER}` }}>
                <div style={{ padding: '12px 14px', fontWeight: 600 }}>{m.title}</div>
                <div style={{ padding: '12px 14px' }}>{m.genre}</div>
                <div style={{ padding: '12px 14px', fontWeight: 700, color: ACCENT }}>{m.rating}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ width: '210px', border: `1px solid ${BORDER}`, borderRadius: '22px', padding: '14px 12px', background: PAPER }}>
            <div style={{ width: '38px', height: '4px', borderRadius: '100px', background: BORDER, margin: '0 auto 12px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MOVIES.map((m) => (
                <div key={m.title} style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: FG }}>{m.title}</span>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: ACCENT, flexShrink: 0 }}>{m.rating}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: MUTED, marginTop: '2px' }}>{m.genre}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}

/* ── 4. Motion should mean something ───────────────────────────────── */

const MOTION_ITEMS = ['Newsletter · weekly digest', 'Coupon · 20% off', 'Reminder · dentist at 3'];

function MotionDemo() {
  const [mode, setMode] = useState<'meaningful' | 'decorative'>('meaningful');
  const [items, setItems] = useState<string[]>(MOTION_ITEMS);
  const archive = (label: string) => setItems((prev) => prev.filter((i) => i !== label));
  const reset = () => setItems(MOTION_ITEMS);
  return (
    <DemoFrame
      label="Motion should mean something"
      caption="Archive an item in each mode. Meaningful motion shows where it went (off to the archive). Decorative motion just spins for applause and teaches you nothing."
      control={<Segmented value={mode} onChange={setMode} options={[{ value: 'meaningful', label: 'Meaningful' }, { value: 'decorative', label: 'Decorative' }]} />}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '150px' }}>
          <AnimatePresence>
            {items.map((label) => (
              <motion.div
                key={label}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={mode === 'meaningful' ? { x: 220, opacity: 0 } : { rotate: 360, scale: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '11px 14px', borderRadius: '8px', border: `1px solid ${BORDER}`, background: PAPER }}
              >
                <span style={{ fontSize: '13px', fontWeight: 600, color: FG }}>{label}</span>
                <button type="button" onClick={() => archive(label)} style={{ ...ghostButton, padding: '5px 11px', fontSize: '11px' }}>Archive</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div style={{ width: '92px', flexShrink: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', border: `1px dashed ${BORDER}`, borderRadius: '10px', color: MUTED }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="5" rx="1" /><path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9M10 13h4" /></svg>
          <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Archive</span>
        </div>
      </div>
      {items.length < MOTION_ITEMS.length && <button type="button" onClick={reset} style={ghostButton}>Reset</button>}
    </DemoFrame>
  );
}

/* ── 5. Static first + skeletons ───────────────────────────────────── */

const STATS = [
  { label: 'Steps', value: '8,420' },
  { label: 'Miles', value: '3.7' },
  { label: 'Streak', value: '12 days' },
];

function SkeletonDemo() {
  const [loading, setLoading] = useState(false);
  const after = useTimers();
  const reload = () => { setLoading(true); after(() => setLoading(false), 1200); };
  return (
    <DemoFrame label="Show the static parts first" caption="The shell and labels are instant; only the data waits, streaming into skeletons. Nobody stares at a blank screen. Hit reload.">
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: PAPER, marginBottom: '18px' }}>
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: FG, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Today&apos;s Activity</div>
          <div style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step Tracker</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: '16px 18px', borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '10px' }}>{s.label}</div>
              {loading ? (
                <div className="hib-shimmer" style={{ height: '18px', width: '80%' }} />
              ) : (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} style={{ fontSize: '16px', fontWeight: 700, color: FG }}>{s.value}</motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={reload} disabled={loading} style={{ ...pillButton, opacity: loading ? 0.6 : 1 }}>{loading ? 'Loading…' : 'Reload'}</button>
    </DemoFrame>
  );
}

/* ── 6. Let types enforce what matters ─────────────────────────────── */

function TypesDemo() {
  const [withUser, setWithUser] = useState(false);
  return (
    <DemoFrame
      label="Let types enforce what matters"
      caption="The audit trail is not a convention you remember. Leave out the userId and the mutation does not compile, so there is no path to a write that skips the log."
      control={<Segmented value={withUser ? 'with' : 'without'} onChange={(v) => setWithUser(v === 'with')} options={[{ value: 'without', label: 'Without userId' }, { value: 'with', label: 'With userId' }]} />}
    >
      <pre style={{ margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12.5px', lineHeight: 1.7, color: FG, background: PAPER, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px 18px', overflowX: 'auto' }}>
{`await db.orders.update(id, {
  status: 'shipped',`}
        {withUser
          ? <span style={{ color: GREEN }}>{`
  userId: session.userId,`}</span>
          : <span style={{ color: RED, textDecoration: 'underline wavy', textDecorationColor: RED }}>{`
  // userId missing`}</span>}
{`
})`}
      </pre>
      <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: withUser ? GREEN : RED }}>
        {withUser ? (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> Compiles. Write recorded in the audit log.</>
        ) : (
          <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg> Type error: property &apos;userId&apos; is required. Won&apos;t compile.</>
        )}
      </div>
    </DemoFrame>
  );
}

/* ── 7. Validate at the boundary ───────────────────────────────────── */

function ValidateDemo() {
  const [val, setVal] = useState('20');
  const num = Number(val);
  const valid = val.trim() !== '' && Number.isFinite(num) && num > 0 && num <= 1000;
  const reason = val.trim() === '' ? 'required' : !Number.isFinite(num) ? 'not a number' : num <= 0 ? 'must be positive' : num > 1000 ? 'over the limit' : '';
  return (
    <DemoFrame label="Validate at the boundary" caption="Bad data dies at the door, checked by a schema before it reaches any logic. The rest of the system only ever sees values it can trust.">
      <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '8px' }}>Tip amount (USD)</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${valid ? GREEN : RED}`, borderRadius: '8px', padding: '0 12px', background: PAPER, transition: 'border-color 0.2s ease' }}>
          <span style={{ color: MUTED, fontSize: '15px' }}>$</span>
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            inputMode="decimal"
            style={{ border: 'none', outline: 'none', background: 'transparent', padding: '11px 6px', fontSize: '15px', color: FG, width: '120px', fontFamily: 'inherit' }}
          />
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 600, color: valid ? GREEN : RED }}>
          {valid ? (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> Accepted</>
          ) : (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg> Rejected: {reason}</>
          )}
        </span>
      </div>
      <div style={{ marginTop: '12px', fontSize: '12px', color: MUTED }}>Try letters, a negative, or something huge.</div>
    </DemoFrame>
  );
}

/* ── 8. Clean data is a feature ────────────────────────────────────── */

const CONTACTS = [
  { id: 0, name: 'Alex Rivera', email: 'alex.rivera@…', dup: false },
  { id: 1, name: 'Alex Rivera', email: 'a.rivera@…', dup: true },
  { id: 2, name: 'Alex  Rivera', email: 'alex.rivera@…', dup: true },
  { id: 3, name: 'Jordan Kim', email: 'jordan.kim@…', dup: false },
  { id: 4, name: 'Jordan Kim', email: 'jordan.kim@…', dup: true },
];

function CleanDataDemo() {
  const [rows, setRows] = useState(CONTACTS);
  const dupCount = rows.filter((r) => r.dup).length;
  const clean = () => setRows((prev) => prev.filter((r) => !r.dup));
  const reset = () => setRows(CONTACTS);
  return (
    <DemoFrame label="Clean data is a feature" caption="Reports are only as honest as the data under them. Duplicate and stale records quietly skew every count until someone matches and merges them into one trustworthy record.">
      <div style={{ display: 'flex', gap: '18px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: MUTED, marginBottom: '14px' }}>
        <span>Records: <span style={{ color: FG }}>{rows.length}</span></span>
        <span>Duplicates: <span style={{ color: dupCount ? RED : GREEN }}>{dupCount}</span></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', minHeight: '160px' }}>
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div key={r.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, marginBottom: -6 }} transition={{ duration: 0.25 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '9px 13px', borderRadius: '8px', border: `1px solid ${r.dup ? RED : BORDER}`, background: PAPER }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: FG }}>{r.name}</span>
                <span style={{ fontSize: '11px', color: MUTED }}>{r.email}</span>
              </div>
              {r.dup && <span style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: RED }}>Duplicate</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {dupCount > 0
        ? <button type="button" onClick={clean} style={pillButton}>Match &amp; merge duplicates</button>
        : <button type="button" onClick={reset} style={ghostButton}>Reset</button>}
    </DemoFrame>
  );
}

/* ── 9. Do the work where it's cheapest ────────────────────────────── */

const PIPELINES = {
  browser: { steps: ['Fetch products', 'Fetch prices', 'Fetch reviews', 'Stitch in JS', 'Render'], trips: 3, per: 260 },
  db: { steps: ['Call view (nested JSON)', 'Render'], trips: 1, per: 260 },
};

function CheapestDemo() {
  const [where, setWhere] = useState<'browser' | 'db'>('browser');
  const [done, setDone] = useState(-1);
  const [running, setRunning] = useState(false);
  const after = useTimers();
  const pipe = PIPELINES[where];

  const run = () => {
    if (running) return;
    setRunning(true);
    setDone(-1);
    pipe.steps.forEach((_, i) => {
      after(() => {
        setDone(i);
        if (i === pipe.steps.length - 1) setRunning(false);
      }, (i + 1) * pipe.per);
    });
  };
  const reset = (w: 'browser' | 'db') => { setWhere(w); setDone(-1); setRunning(false); };

  return (
    <DemoFrame
      label="Do the work where it's cheapest"
      caption="Sometimes the fastest frontend is a dumber one. A nested-JSON stored procedure does the heavy lifting in one round trip and hands the client something ready to render, instead of shipping raw rows and stitching them in the browser."
      control={<Segmented value={where} onChange={reset} options={[{ value: 'browser', label: 'In the browser' }, { value: 'db', label: 'In the database' }]} />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px', minHeight: '176px' }}>
        {pipe.steps.map((step, i) => {
          const complete = i <= done;
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '10px 13px', borderRadius: '8px', border: `1px solid ${BORDER}`, background: PAPER, opacity: complete ? 1 : 0.5, transition: 'opacity 0.2s ease' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: complete ? GREEN : 'transparent', border: complete ? 'none' : `1px solid ${BORDER}`, color: PAPER }}>
                {complete && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: FG }}>{step}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <button type="button" onClick={run} disabled={running} style={{ ...pillButton, opacity: running ? 0.6 : 1 }}>{running ? 'Running…' : 'Run'}</button>
        <span style={{ fontSize: '12px', color: MUTED }}>Round trips: <strong style={{ color: FG }}>{pipe.trips}</strong> · Steps: <strong style={{ color: FG }}>{pipe.steps.length}</strong></span>
      </div>
    </DemoFrame>
  );
}

/* ── 10. Cache the stable ──────────────────────────────────────────── */

function CacheDemo() {
  const [cached, setCached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ms, setMs] = useState<number | null>(null);
  const after = useTimers();

  const load = () => {
    if (loading) return;
    if (cached) { setMs(0); return; }
    setLoading(true);
    setMs(null);
    after(() => { setLoading(false); setCached(true); setMs(1180); }, 1180);
  };
  const clear = () => { setCached(false); setMs(null); };

  return (
    <DemoFrame label="Cache the stable, and trust it" caption="Compute the stable stuff once; repeat views are free. A cache you cannot confidently invalidate never gets built, which is what the clear button is for.">
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', background: PAPER, marginBottom: '16px', minHeight: '96px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: MUTED, fontSize: '13px' }}><Spinner /> Crunching the leaderboard… (cold)</div>
        ) : ms === null ? (
          <div style={{ color: MUTED, fontSize: '13px' }}>Leaderboard not loaded.</div>
        ) : (
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: FG }}>You&apos;re #4 of 128</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '8px', fontSize: '12px', fontWeight: 700, color: ms === 0 ? GREEN : MUTED }}>
              {ms === 0
                ? <span style={{ padding: '3px 10px', borderRadius: '100px', background: 'rgba(63,143,82,0.14)', color: GREEN, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '10px' }}>Cache hit · instant</span>
                : <span>Computed in {ms.toLocaleString()}ms (cold)</span>}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button type="button" onClick={load} disabled={loading} style={{ ...pillButton, opacity: loading ? 0.6 : 1 }}>Load report</button>
        {cached && <button type="button" onClick={clear} style={ghostButton}>Clear cache</button>}
      </div>
    </DemoFrame>
  );
}

/* ── 11. Abstract on the third copy ────────────────────────────────── */

function StatCard({ shared }: { shared?: boolean }) {
  return (
    <div style={{ flex: 1, minWidth: '90px', border: `1px solid ${shared ? ACCENT : BORDER}`, borderRadius: '10px', padding: '14px', background: PAPER, textAlign: 'center' }}>
      <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, fontWeight: 700 }}>Likes</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: FG }}>128</div>
      {shared && <div style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700, marginTop: '6px' }}>Shared component</div>}
    </div>
  );
}

function AbstractDemo() {
  const [extracted, setExtracted] = useState(false);
  return (
    <DemoFrame label="Abstract on the third copy, not the first" caption="I let duplication sit until the pattern is real, usually around the third copy, then extract it. Abstracting too early guesses at a shape you don’t have yet, and once you’re rolling it’s easy to over-abstract everything. So while I build something new I keep the question in the back of my mind: would this be useful elsewhere, or belong in another project? Once it’s dialed in and the answer is clearly yes, I pull it out.">
      <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center' }}>
        {!extracted ? (
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <StatCard /><StatCard /><StatCard />
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ maxWidth: '160px', width: '100%' }}><StatCard shared /></div>
            <div style={{ fontSize: '12px', color: MUTED }}>Used in <strong style={{ color: FG }}>3</strong> places. Change it once.</div>
          </div>
        )}
      </div>
      <div style={{ marginTop: '16px' }}>
        {!extracted
          ? <button type="button" onClick={() => setExtracted(true)} style={pillButton}>Extract to a component</button>
          : <button type="button" onClick={() => setExtracted(false)} style={ghostButton}>Back to three copies</button>}
      </div>
    </DemoFrame>
  );
}

/* ── 12. Monorepo, by default ──────────────────────────────────────── */

const CLIENTS = ['Web app', 'Mobile app', 'Admin panel'];

function MonorepoDemo() {
  const [fixed, setFixed] = useState<boolean[]>([false, false, false]);
  const after = useTimers();
  const allFixed = fixed.every(Boolean);
  const backport = () => {
    CLIENTS.forEach((_, i) => after(() => setFixed((prev) => prev.map((v, j) => (j === i ? true : v))), (i + 1) * 350));
  };
  const reset = () => setFixed([false, false, false]);
  return (
    <DemoFrame label="Monorepo, by default" caption="One workspace, shared packages, and each app deploying on its own. Fix a bug once in the shared code and every app that depends on it gets the fix, without a round of copy-paste across repos that always misses one.">
      <div style={{ border: `1px solid ${allFixed ? GREEN : ACCENT}`, borderRadius: '10px', padding: '12px 14px', background: PAPER, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.3s ease' }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={allFixed ? GREEN : ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
        <span style={{ fontSize: '13px', fontWeight: 700, color: FG }}>@acme/core</span>
        <span style={{ fontSize: '11px', color: allFixed ? GREEN : MUTED, marginLeft: 'auto' }}>{allFixed ? 'patched' : 'shared package'}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {CLIENTS.map((c, i) => (
          <div key={c} style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '12px', textAlign: 'center', background: PAPER }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: FG }}>{c}</div>
            <div style={{ fontSize: '10px', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '3px 0 10px' }}>own deploy</div>
            <div style={{ height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {fixed[i]
                ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 480, damping: 18 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: GREEN, fontSize: '11px', fontWeight: 700 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> backported
                  </motion.span>
                : <span style={{ fontSize: '11px', color: MUTED }}>on v1.2</span>}
            </div>
          </div>
        ))}
      </div>
      {allFixed
        ? <button type="button" onClick={reset} style={ghostButton}>Reset</button>
        : <button type="button" onClick={backport} style={pillButton}>Fix once, backport to all</button>}
    </DemoFrame>
  );
}

/* ── 13. One rule, in one place ────────────────────────────────────── */

const SURFACES = ['Homepage', 'Search', 'Category page'];

function SharedRuleDemo() {
  const [mode, setMode] = useState<'copied' | 'shared'>('copied');
  const [applied, setApplied] = useState(false);
  const [fixed, setFixed] = useState([false, false, false]);

  // Apply the "hide sold-out items" rule. Shared: every surface reads the
  // one view, so all update. Copied: two surfaces get fixed and the third
  // quietly gets forgotten.
  const apply = () => { setApplied(true); setFixed(mode === 'shared' ? [true, true, true] : [true, true, false]); };
  const reset = () => { setApplied(false); setFixed([false, false, false]); };
  const switchMode = (m: 'copied' | 'shared') => { setMode(m); setApplied(false); setFixed([false, false, false]); };

  return (
    <DemoFrame
      label="One rule, in one place"
      caption="Picture a storefront where the homepage, search, and category pages all list products, each built by a different person. Add a 'hide sold-out' filter to two of them but miss the third, and it keeps showing sold-out items for months until someone notices. Push the rule down into one shared SQL view, stored proc, or constraint and every screen obeys it."
      control={<Segmented value={mode} onChange={switchMode} options={[{ value: 'copied', label: 'Copied per app' }, { value: 'shared', label: 'Shared in SQL' }]} />}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '16px', fontSize: '13px', color: FG }}>
        <span>Rule: <strong>hide sold-out items</strong></span>
        {mode === 'shared' && <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: ACCENT, border: `1px solid ${BORDER}`, borderRadius: '100px', padding: '3px 9px' }}>via v_in_stock</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {SURFACES.map((name, i) => {
          const hidden = applied && fixed[i];
          const leaking = applied && !fixed[i];
          return (
            <div key={name} style={{ border: `1px solid ${leaking ? RED : BORDER}`, borderRadius: '10px', padding: '12px', background: PAPER, transition: 'border-color 0.3s ease' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: FG }}>{name}</div>
              <div style={{ fontSize: '11px', color: MUTED, margin: '5px 0 10px' }}>lists products</div>
              {hidden && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: GREEN }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg> sold-out hidden
                </span>
              )}
              {leaking && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: 700, color: RED }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></svg> showing sold out
                </span>
              )}
              {!applied && <span style={{ fontSize: '11px', fontWeight: 600, color: MUTED }}>all items shown</span>}
            </div>
          );
        })}
      </div>
      {!applied
        ? <button type="button" onClick={apply} style={pillButton}>Hide sold-out items</button>
        : <button type="button" onClick={reset} style={ghostButton}>Reset</button>}
    </DemoFrame>
  );
}

/* ── 14. Seed it well ──────────────────────────────────────────────── */

function SeedDemo() {
  const [seeded, setSeeded] = useState(true);
  return (
    <DemoFrame
      label="Seed it well"
      caption="A blank page is intimidating and quietly invites junk. Seed it with one great example and content people copy the shape without ever reading a manual."
      control={<Segmented value={seeded ? 'seeded' : 'blank'} onChange={(v) => setSeeded(v === 'seeded')} options={[{ value: 'blank', label: 'Blank' }, { value: 'seeded', label: 'Seeded' }]} />}
    >
      <div style={{ minHeight: '190px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {seeded ? (
          <>
            <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '14px', background: PAPER }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: FG }}>Summer Kickoff</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: ACCENT, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Family</span>
              </div>
              <div style={{ fontSize: '10px', color: MUTED, margin: '3px 0 9px', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>Sat · Jun 14 · 5 PM</div>
              <div style={{ fontSize: '13px', color: MUTED, lineHeight: 1.6 }}>Food, games, and a bounce house. Bring the whole crew and stay as long as you like.</div>
            </div>
            <div style={{ border: `1px dashed ${BORDER}`, borderRadius: '10px', padding: '13px 14px', color: MUTED, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', lineHeight: 0, color: ACCENT }}>+</span> Add another like this
            </div>
          </>
        ) : (
          <div style={{ flex: 1, border: `1px dashed ${BORDER}`, borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: MUTED, textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '13px' }}>No events yet.</div>
            <span style={{ ...ghostButton, opacity: 0.7 }}>New event</span>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}

/* ── Registry ──────────────────────────────────────────────────────── */

export type DemoId =
  | 'optimistic' | 'wallOfText' | 'skeleton' | 'mobile' | 'motion'
  | 'typesEnforce' | 'validate' | 'cleanData' | 'cheapest' | 'cache'
  | 'abstract' | 'monorepo' | 'sharedRule' | 'seed';

const REGISTRY: Record<DemoId, () => React.ReactElement> = {
  optimistic: OptimisticDemo,
  wallOfText: WallOfTextDemo,
  skeleton: SkeletonDemo,
  mobile: MobileDemo,
  motion: MotionDemo,
  typesEnforce: TypesDemo,
  validate: ValidateDemo,
  cleanData: CleanDataDemo,
  cheapest: CheapestDemo,
  cache: CacheDemo,
  abstract: AbstractDemo,
  monorepo: MonorepoDemo,
  sharedRule: SharedRuleDemo,
  seed: SeedDemo,
};

export function HowIBuildDemo({ id }: { id: DemoId }) {
  const Demo = REGISTRY[id];
  return <Demo />;
}
