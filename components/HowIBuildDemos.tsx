'use client';

import { forwardRef, useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

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

const DemoFrame = forwardRef<HTMLDivElement, { label: string; caption: string; control?: ReactNode; overlay?: ReactNode; children: ReactNode }>(
  function DemoFrame({ label, caption, control, overlay, children }, ref) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: 'clamp(22px, 3vw, 32px)', background: 'var(--color-card)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap', marginBottom: '22px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, fontWeight: 700 }}>{label}</div>
          {control}
        </div>
        {children}
        <p style={{ fontSize: '13px', color: MUTED, marginTop: '22px', lineHeight: 1.7 }}>{caption}</p>
        {overlay}
      </motion.div>
    );
  },
);

/* Cross-fade between two states in a fixed footprint. Both render into the
   same grid cell, so the container is always as tall as the taller state
   and nothing below it shifts when the toggle flips. */
const swapGrid: React.CSSProperties = { display: 'grid' };
function Swap({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div aria-hidden={!show} style={{ gridArea: '1 / 1', opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
      {children}
    </div>
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
                style={{ position: 'absolute', inset: 0, background: ACCENT, borderRadius: '100px' }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{o.label}</span>
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

/* ── Auto-play: the demos illustrate themselves ─────────────────────────
   Most cards run a short scripted loop when scrolled into view, so the
   point plays without the visitor guessing what to poke. Reduced-motion
   users just get a clean static state. When a step is a click, a
   deliberately non-native orange pointer glides in and taps, so nobody
   mistakes it for their own cursor. */

type CursorCtl = {
  pos: { x: number; y: number };
  clicking: boolean;
  visible: boolean;
  moveTo: (el: HTMLElement | null) => void;
  press: () => void;
  hide: () => void;
};

function useCursor(containerRef: React.RefObject<HTMLElement | null>): CursorCtl {
  const [pos, setPos] = useState({ x: 24, y: 24 });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const moveTo = useCallback((el: HTMLElement | null) => {
    const c = containerRef.current;
    if (!c || !el) return;
    const cb = c.getBoundingClientRect();
    const eb = el.getBoundingClientRect();
    setVisible(true);
    setPos({ x: eb.left - cb.left + eb.width / 2 - 5, y: eb.top - cb.top + eb.height / 2 - 3 });
  }, [containerRef]);
  const press = useCallback(() => {
    setClicking(true);
    window.setTimeout(() => setClicking(false), 380);
  }, []);
  const hide = useCallback(() => setVisible(false), []);
  return { pos, clicking, visible, moveTo, press, hide };
}

function FakeCursor({ ctl }: { ctl: CursorCtl }) {
  return (
    <motion.div
      aria-hidden
      animate={{ x: ctl.pos.x, y: ctl.pos.y, opacity: ctl.visible ? 1 : 0 }}
      transition={{ x: { type: 'spring', stiffness: 200, damping: 22 }, y: { type: 'spring', stiffness: 200, damping: 22 }, opacity: { duration: 0.25 } }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 30, pointerEvents: 'none' }}
    >
      <motion.span
        animate={{ scale: ctl.clicking ? [0.5, 1.9] : 0.5, opacity: ctl.clicking ? [0.55, 0] : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ position: 'absolute', top: -5, left: -5, width: 30, height: 30, borderRadius: '50%', background: ACCENT }}
      />
      <motion.svg width="26" height="26" viewBox="0 0 24 24" animate={{ scale: ctl.clicking ? 0.82 : 1 }} transition={{ duration: 0.14 }} style={{ position: 'relative', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))' }}>
        <path d="M4.5 2.2 L4.5 18.5 L8.6 14.6 L11.2 20.5 L13.7 19.3 L11.1 13.5 L16.7 13.5 Z" fill={ACCENT} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      </motion.svg>
    </motion.div>
  );
}

/* Runs `script` in a loop while the card is on screen. Each effect run
   gets an id; async steps bail the moment a newer run (or unmount)
   supersedes them, so nothing keeps animating off screen. */
function useAutoplay(
  ref: React.RefObject<HTMLElement | null>,
  script: (ctx: { wait: (ms: number) => Promise<void>; alive: () => boolean }) => Promise<void>,
  opts?: { paused?: boolean },
) {
  const paused = opts?.paused ?? false;
  const inView = useInView(ref, { margin: '-80px' });
  const reduce = useReducedMotion();
  const runId = useRef(0);
  useEffect(() => {
    if (!inView || reduce || paused) return;
    const myId = ++runId.current;
    const alive = () => runId.current === myId;
    const wait = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));
    (async () => {
      await wait(500);
      while (alive()) {
        await script({ wait, alive });
        if (!alive()) break;
      }
    })();
    return () => { runId.current += 1; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, paused]);
  return { reduce, inView };
}

/* ── 1. Optimistic UI ──────────────────────────────────────────────── */

const TOPPINGS = ['Pepperoni', 'Mushrooms', 'Extra cheese', 'Jalapeños', 'Pineapple', 'Red onion'];
type OptStatus = 'pending' | 'confirmed' | 'settled' | 'deleting';

function OptimisticDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const removeRef = useRef<HTMLButtonElement>(null);
  const cursor = useCursor(frameRef);
  const [items, setItems] = useState<{ id: number; name: string; status: OptStatus }[]>([
    { id: 0, name: 'Fresh mozzarella', status: 'settled' },
  ]);
  const next = useRef(1);
  const after = useTimers();
  const setStatus = (id: number, status: OptStatus) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

  const reset = () => setItems([{ id: 0, name: 'Fresh mozzarella', status: 'settled' }]);
  const add = () => {
    const id = next.current++;
    const name = TOPPINGS[(id - 1) % TOPPINGS.length];
    setItems((prev) => [...prev, { id, name, status: 'pending' }]);
    after(() => setStatus(id, 'confirmed'), 900);   // server says 200
    after(() => setStatus(id, 'settled'), 2000);    // success flourish fades
    return id;
  };
  const remove = (id: number) => {
    setStatus(id, 'deleting');                                    // optimistic, but not instant: show it going
    after(() => setItems((prev) => prev.filter((i) => i.id !== id)), 800);  // then poof once the server confirms
  };

  // Plays itself: add a topping (optimistic pending, then the 200 check),
  // then remove it (processing, then poof), looping while on screen.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    reset();
    cursor.hide();
    await wait(900);
    cursor.moveTo(addRef.current);
    await wait(700);
    if (!alive()) return;
    cursor.press();
    const id = add();
    await wait(2600);
    if (!alive()) return;
    cursor.moveTo(removeRef.current);
    await wait(750);
    if (!alive()) return;
    cursor.press();
    remove(id);
    await wait(1500);
    cursor.hide();
    await wait(1100);
  });

  return (
    <DemoFrame ref={frameRef} overlay={<FakeCursor ctl={cursor} />} label="Optimistic, but not too optimistic" caption="Adding a row shows instantly and settles once the server answers 200. But delete gets a processing state first, not an instant poof: if it looked done and quietly failed, you'd move on and never catch that it never actually worked. The check is a quick flourish, not a permanent badge, and anything that fails rolls back.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', minHeight: '150px' }}>
        <AnimatePresence initial={false}>
          {items.map((i, idx) => (
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
                  <button type="button" ref={idx === items.length - 1 ? removeRef : undefined} onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: MUTED, display: 'inline-flex', padding: 0, lineHeight: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button type="button" ref={addRef} onClick={add} disabled={items.length >= 3} style={{ ...pillButton, opacity: items.length >= 3 ? 0.5 : 1, cursor: items.length >= 3 ? 'default' : 'pointer' }}>
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'glance' | 'wall'>('wall');
  const [paused, setPaused] = useState(false);

  // Comparison toggle, not a problem being solved: no cursor, just quietly
  // cycle the two views. The moment the visitor touches it, hand it over.
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setView('wall');
    await wait(2400);
    if (!alive()) return;
    setView('glance');
    await wait(2900);
  }, { paused });

  // Reduced-motion (or before the loop runs): hold the resolved view until
  // the visitor takes over. Derived, so no setState-in-effect churn.
  const shown = reduce && !paused ? 'glance' : view;

  return (
    <DemoFrame
      ref={frameRef}
      label="A wall of text says nothing"
      caption="Same information, both ways. The block is technically complete and communicates nothing; hierarchy, icons, and color say more with less."
      control={<Segmented value={shown} onChange={(v) => { setPaused(true); setView(v); }} options={[{ value: 'wall', label: 'Wall of text' }, { value: 'glance', label: 'At a glance' }]} />}
    >
      <div style={swapGrid}>
        <Swap show={shown === 'glance'}>
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
        </Swap>
        <Swap show={shown !== 'glance'}>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: MUTED }}>
            Tony&apos;s Pizza is open Tuesday through Sunday from 4:00 PM until 10:00 PM at 88 Main Street, and we offer both dine-in seating and carry-out for all of our guests, and there is a free parking lot located directly behind the building, and if you would like to place an order ahead of time the kitchen phone is answered throughout all of our open hours every day of the week that we are open.
          </p>
        </Swap>
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<'desktop' | 'phone'>('desktop');
  const [paused, setPaused] = useState(false);
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setDevice('desktop');
    await wait(2600);
    if (!alive()) return;
    setDevice('phone');
    await wait(2900);
  }, { paused });
  const shownDevice = reduce && !paused ? 'phone' : device;
  return (
    <DemoFrame
      ref={frameRef}
      label="Mobile is not a smaller desktop"
      caption="Same data, rebuilt for the device. On the phone the table becomes cards and sheets, not a table pinched down until nobody can read it."
      control={<Segmented value={shownDevice} onChange={(v) => { setPaused(true); setDevice(v); }} options={[{ value: 'desktop', label: 'Desktop' }, { value: 'phone', label: 'Phone' }]} />}
    >
      <div style={{ ...swapGrid, padding: '4px 0' }}>
        <Swap show={shownDevice === 'desktop'}>
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
        </Swap>
        <Swap show={shownDevice !== 'desktop'}>
          <div style={{ width: '210px', margin: '0 auto', border: `1px solid ${BORDER}`, borderRadius: '22px', padding: '14px 12px', background: PAPER }}>
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
        </Swap>
      </div>
    </DemoFrame>
  );
}

/* ── 4. Motion should mean something ───────────────────────────────── */

const MOTION_ITEMS = ['Newsletter · weekly digest', 'Coupon · 20% off', 'Reminder · dentist at 3'];

function MotionDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLButtonElement>(null);
  const cursor = useCursor(frameRef);
  const [mode, setMode] = useState<'meaningful' | 'decorative'>('meaningful');
  const [items, setItems] = useState<string[]>(MOTION_ITEMS);
  const [paused, setPaused] = useState(false);
  const archive = (label: string) => setItems((prev) => prev.filter((i) => i !== label));
  const reset = () => setItems(MOTION_ITEMS);

  // Auto-cycle the two motion styles; in each, the cursor archives the top
  // item so you see how it leaves. Hands off the moment you touch anything.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    setMode('meaningful'); reset(); cursor.hide();
    await wait(1200);
    cursor.moveTo(archiveRef.current);
    await wait(700);
    if (!alive()) return;
    cursor.press(); archive(MOTION_ITEMS[0]);
    await wait(1100);
    if (!alive()) return;
    reset();
    await wait(700);
    setMode('decorative');
    await wait(700);
    cursor.moveTo(archiveRef.current);
    await wait(500);
    if (!alive()) return;
    cursor.press(); archive(MOTION_ITEMS[0]);
    await wait(1100);
    if (!alive()) return;
    reset(); cursor.hide();
    await wait(1000);
  }, { paused });

  return (
    <DemoFrame
      ref={frameRef}
      overlay={<FakeCursor ctl={cursor} />}
      label="Motion should mean something"
      caption="Watch an item get archived in each mode. Meaningful motion shows where it went (off to the archive). Decorative motion just spins for applause and teaches you nothing."
      control={<Segmented value={mode} onChange={(v) => { setPaused(true); setMode(v); }} options={[{ value: 'meaningful', label: 'Meaningful' }, { value: 'decorative', label: 'Decorative' }]} />}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '156px' }}>
          <AnimatePresence>
            {items.map((label, i) => (
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
                <button type="button" ref={i === 0 ? archiveRef : undefined} onClick={() => { setPaused(true); archive(label); }} style={{ ...ghostButton, padding: '5px 11px', fontSize: '11px' }}>Archive</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div style={{ minHeight: '38px' }}>{items.length < MOTION_ITEMS.length && <button type="button" onClick={() => { setPaused(true); reset(); }} style={ghostButton}>Reset</button>}</div>
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  // A concept, not a real control: the panel reloads on a loop so you see
  // the shell and labels stay put while only the data streams in.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    setLoading(true);
    await wait(1300);
    if (!alive()) return;
    setLoading(false);
    await wait(2600);
  });
  return (
    <DemoFrame ref={frameRef} label="Show the static parts first" caption="The shell and labels are instant; only the data waits, streaming into skeletons. Nobody ever stares at a blank screen.">
      <div style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: PAPER }}>
        <div style={{ padding: '16px 18px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: FG, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>Today&apos;s Activity</div>
          <div style={{ fontSize: '11px', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step Tracker</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: '16px 18px', borderLeft: i > 0 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '10px' }}>{s.label}</div>
              <div style={{ height: '20px', display: 'flex', alignItems: 'center' }}>
                {loading ? (
                  <div className="hib-shimmer" style={{ height: '16px', width: '80%' }} />
                ) : (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} style={{ fontSize: '16px', fontWeight: 700, lineHeight: '20px', color: FG }}>{s.value}</motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DemoFrame>
  );
}

/* ── 6. Let types enforce what matters ─────────────────────────────── */

function TypesDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [withUser, setWithUser] = useState(false);
  const [paused, setPaused] = useState(false);
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setWithUser(false);
    await wait(2600);
    if (!alive()) return;
    setWithUser(true);
    await wait(2900);
  }, { paused });
  const shownWith = reduce && !paused ? true : withUser;
  return (
    <DemoFrame
      ref={frameRef}
      label="Let types enforce what matters"
      caption="The audit trail is not a convention you remember. Leave out the userId and the mutation does not compile, so there is no path to a write that skips the log."
      control={<Segmented value={shownWith ? 'with' : 'without'} onChange={(v) => { setPaused(true); setWithUser(v === 'with'); }} options={[{ value: 'without', label: 'Without userId' }, { value: 'with', label: 'With userId' }]} />}
    >
      <pre style={{ margin: 0, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12.5px', lineHeight: 1.7, color: FG, background: PAPER, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px 18px', overflowX: 'auto' }}>
{`await db.orders.update(id, {
  status: 'shipped',`}
        {shownWith
          ? <span style={{ color: GREEN }}>{`
  userId: session.userId,`}</span>
          : <span style={{ color: RED, textDecoration: 'underline wavy', textDecorationColor: RED }}>{`
  // userId missing`}</span>}
{`
})`}
      </pre>
      <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 600, color: shownWith ? GREEN : RED }}>
        {shownWith ? (
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
  const frameRef = useRef<HTMLDivElement>(null);
  const mergeRef = useRef<HTMLButtonElement>(null);
  const cursor = useCursor(frameRef);
  const [rows, setRows] = useState(CONTACTS);
  const dupCount = rows.filter((r) => r.dup).length;
  const clean = () => setRows((prev) => prev.filter((r) => !r.dup));
  const reset = () => setRows(CONTACTS);
  useAutoplay(frameRef, async ({ wait, alive }) => {
    reset();
    cursor.hide();
    await wait(1400);
    cursor.moveTo(mergeRef.current);
    await wait(750);
    if (!alive()) return;
    cursor.press();
    clean();
    await wait(1800);
    cursor.hide();
    await wait(1800);
  });
  return (
    <DemoFrame ref={frameRef} overlay={<FakeCursor ctl={cursor} />} label="Clean data is a feature" caption="Reports are only as honest as the data under them. Duplicate and stale records quietly skew every count until someone matches and merges them into one trustworthy record.">
      <div style={{ display: 'flex', gap: '18px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: MUTED, marginBottom: '14px' }}>
        <span>Records: <span style={{ color: FG }}>{rows.length}</span></span>
        <span>Duplicates: <span style={{ color: dupCount ? RED : GREEN }}>{dupCount}</span></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', minHeight: '306px' }}>
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
      <div style={{ minHeight: '42px' }}>{dupCount > 0
        ? <button type="button" ref={mergeRef} onClick={clean} style={pillButton}>Match &amp; merge duplicates</button>
        : <button type="button" onClick={reset} style={ghostButton}>Reset</button>}</div>
    </DemoFrame>
  );
}

/* ── 9. Do the work where it's cheapest ────────────────────────────── */

const PIPELINES = {
  browser: { steps: ['Fetch products', 'Fetch prices', 'Fetch reviews', 'Stitch in JS', 'Render'], trips: 3, per: 260 },
  db: { steps: ['Call view (nested JSON)', 'Render'], trips: 1, per: 260 },
};

function CheapestDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [where, setWhere] = useState<'browser' | 'db'>('browser');
  const [done, setDone] = useState(-1);
  const [paused, setPaused] = useState(false);
  const after = useTimers();
  const pipe = PIPELINES[where];

  // Concept illustration, not a real control: cycle the two pipelines and
  // fill each one's steps on its own so you can compare the round trips.
  const show = (w: 'browser' | 'db') => { setWhere(w); setDone(-1); };
  const runSteps = (w: 'browser' | 'db') => {
    const p = PIPELINES[w];
    p.steps.forEach((_, i) => after(() => setDone(i), (i + 1) * p.per));
  };

  useAutoplay(frameRef, async ({ wait, alive }) => {
    show('browser');
    await wait(700);
    if (!alive()) return;
    runSteps('browser');
    await wait(PIPELINES.browser.steps.length * PIPELINES.browser.per + 1500);
    if (!alive()) return;
    show('db');
    await wait(700);
    if (!alive()) return;
    runSteps('db');
    await wait(PIPELINES.db.steps.length * PIPELINES.db.per + 1500);
  }, { paused });

  return (
    <DemoFrame
      ref={frameRef}
      label="Do the work where it's cheapest"
      caption="Sometimes the fastest frontend is a dumber one. A nested-JSON stored procedure does the heavy lifting in one round trip and hands the client something ready to render, instead of shipping raw rows and stitching them in the browser."
      control={<Segmented value={where} onChange={(w) => { setPaused(true); show(w); }} options={[{ value: 'browser', label: 'In the browser' }, { value: 'db', label: 'In the database' }]} />}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px', minHeight: '240px' }}>
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
      <div style={{ fontSize: '12px', color: MUTED }}>Round trips: <strong style={{ color: FG }}>{pipe.trips}</strong> · Steps: <strong style={{ color: FG }}>{pipe.steps.length}</strong></div>
    </DemoFrame>
  );
}

/* ── 10. Cache the stable ──────────────────────────────────────────── */

function CacheDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [ms, setMs] = useState<number | null>(null);

  // Concept illustration, not a real control: cold compute, then a free
  // cache hit, then the cache clears and it goes cold again. It just plays.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    setLoading(false); setMs(null);
    await wait(1100);
    if (!alive()) return;
    setLoading(true); setMs(null);
    await wait(1180);
    if (!alive()) return;
    setLoading(false); setMs(1180);
    await wait(2200);
    if (!alive()) return;
    setMs(0);
    await wait(2200);
    if (!alive()) return;
    setMs(null);
    await wait(1200);
  });

  return (
    <DemoFrame ref={frameRef} label="Cache the stable, and trust it" caption="Compute the stable stuff once; repeat views are free. A cache you cannot confidently invalidate never gets built, so it clears the moment the data underneath changes.">
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
  const frameRef = useRef<HTMLDivElement>(null);
  const [extracted, setExtracted] = useState(false);
  // Concept illustration, not a real control: sit on three copies, then
  // pull them into one shared component, on a loop.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    setExtracted(false);
    await wait(2600);
    if (!alive()) return;
    setExtracted(true);
    await wait(3000);
  });
  return (
    <DemoFrame ref={frameRef} label="Abstract on the third copy, not the first" caption="I let duplication sit until the pattern is real, usually around the third copy, then extract it. Abstracting too early guesses at a shape you don’t have yet, and once you’re rolling it’s easy to over-abstract everything. So while I build something new I keep the question in the back of my mind: would this be useful elsewhere, or belong in another project? Once it’s dialed in and the answer is clearly yes, I pull it out.">
      <div style={{ minHeight: '150px', display: 'flex', alignItems: 'center' }}>
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
    </DemoFrame>
  );
}

/* ── 12. Monorepo, by default ──────────────────────────────────────── */

const CLIENTS = ['Web app', 'Mobile app', 'Admin panel'];

function MonorepoDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [fixed, setFixed] = useState<boolean[]>([false, false, false]);
  const after = useTimers();
  const allFixed = fixed.every(Boolean);
  const backport = () => {
    CLIENTS.forEach((_, i) => after(() => setFixed((prev) => prev.map((v, j) => (j === i ? true : v))), (i + 1) * 350));
  };
  const reset = () => setFixed([false, false, false]);
  // Concept illustration, not a real control: fix once in the shared
  // package and watch it backport to every app, on a loop.
  useAutoplay(frameRef, async ({ wait, alive }) => {
    reset();
    await wait(1500);
    if (!alive()) return;
    backport();
    await wait(2800);
  });
  return (
    <DemoFrame ref={frameRef} label="Monorepo, by default" caption="One workspace, shared packages, and each app deploying on its own. Fix a bug once in the shared code and every app that depends on it gets the fix, without a round of copy-paste across repos that always misses one.">
      <div style={{ border: `1px solid ${allFixed ? GREEN : ACCENT}`, borderRadius: '10px', padding: '12px 14px', background: PAPER, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'border-color 0.3s ease' }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={allFixed ? GREEN : ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
        <span style={{ fontSize: '13px', fontWeight: 700, color: FG }}>@acme/core</span>
        <span style={{ fontSize: '11px', color: allFixed ? GREEN : MUTED, marginLeft: 'auto' }}>{allFixed ? 'patched' : 'shared package'}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginBottom: '16px' }}>
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
    </DemoFrame>
  );
}

/* ── 13. Put the rule where it can't be skipped ────────────────────── */

function ConstraintDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'app' | 'db'>('app');
  const [paused, setPaused] = useState(false);

  // Comparison toggle: the same race (an item sells out between cart and
  // checkout) with the stock check living only in app code vs enforced by
  // a database constraint. Auto-cycles; yields the moment you touch it.
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setMode('app');
    await wait(3400);
    if (!alive()) return;
    setMode('db');
    await wait(3600);
  }, { paused });
  const shown = reduce && !paused ? 'db' : mode;

  const card: React.CSSProperties = { border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '14px', background: PAPER };

  return (
    <DemoFrame
      ref={frameRef}
      label="Put the rule where it can't be skipped"
      caption="An item's in the cart, in stock. By checkout the last one is gone. With the check living only in app code, you're trusting every path to re-verify stock before it charges, and the one that forgets oversells (then it's refunds and apologies). A database constraint refuses the write itself: the API returns an error and nothing processes. The rule holds even when the code doesn't."
      control={<Segmented value={shown} onChange={(m) => { setPaused(true); setMode(m); }} options={[{ value: 'app', label: 'App-layer check' }, { value: 'db', label: 'DB constraint' }]} />}
    >
      <div style={{ ...card, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: FG }}>Vintage jacket</div>
          <div style={{ fontSize: '12px', color: MUTED, marginTop: '3px', lineHeight: 1.5 }}>In your cart since 9:02. At 9:05 someone else buys the last one.</div>
        </div>
        <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: RED, border: `1px solid ${RED}`, borderRadius: '100px', padding: '4px 10px' }}>0 left</span>
      </div>

      <div style={swapGrid}>
        <Swap show={shown === 'app'}>
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: GREEN }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Order confirmed. Card charged.
            </div>
            <div style={{ marginTop: '11px', border: `1px solid ${RED}`, background: 'rgba(192,73,47,0.08)', borderRadius: '8px', padding: '11px 13px', fontSize: '12px', color: RED, fontWeight: 600, lineHeight: 1.55 }}>
              Oversold: 2 orders, 1 in stock. The re-check before charging was never written, so nothing stopped it. Now someone gets a refund and an apology.
            </div>
          </div>
        </Swap>
        <Swap show={shown === 'db'}>
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: RED }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              Checkout rejected · 409 from the database
            </div>
            <div style={{ marginTop: '9px', fontSize: '12px', color: MUTED, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>CHECK (stock &gt;= 0) violated, so the charge never happens.</div>
            <div style={{ marginTop: '11px', border: `1px solid ${GREEN}`, background: 'rgba(63,143,82,0.10)', borderRadius: '8px', padding: '11px 13px', fontSize: '12px', color: GREEN, fontWeight: 600, lineHeight: 1.55 }}>
              Overselling is impossible, no matter which code path runs. The friction is the feature.
            </div>
          </div>
        </Swap>
      </div>
    </DemoFrame>
  );
}

/* ── 14. Use the right field type ──────────────────────────────────── */

const WRONG_FIELDS = [
  { label: 'Date', value: 'next friday-ish?' },
  { label: 'Bringing a guest?', value: 'yeah probably' },
  { label: 'Party size', value: 'a few of us' },
  { label: 'Meal', value: "idk whatever's easy" },
];

function FormTypesDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [right, setRight] = useState(false);
  const [paused, setPaused] = useState(false);

  // Comparison toggle: cycle a form built entirely from text boxes against
  // the same form with the right control on every field. No cursor.
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setRight(false);
    await wait(2800);
    if (!alive()) return;
    setRight(true);
    await wait(3000);
  }, { paused });
  const shown = reduce && !paused ? true : right;

  const flabel: React.CSSProperties = { fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '6px' };
  const box: React.CSSProperties = { border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '10px 12px', background: PAPER, fontSize: '13px', color: FG, display: 'flex', alignItems: 'center', gap: '8px' };
  const field = (label: string, control: ReactNode) => (
    <div><div style={flabel}>{label}</div>{control}</div>
  );

  return (
    <DemoFrame
      ref={frameRef}
      label="Use the right field type"
      caption="Give someone a text box for everything and they will pour a date, a yes/no, and a count into prose. The right control does the validating for you: a date picker can't hold 'next Friday', a stepper can't hold 'a few', and every answer becomes something you can sort, filter, and count."
      control={<Segmented value={shown ? 'right' : 'wrong'} onChange={(v) => { setPaused(true); setRight(v === 'right'); }} options={[{ value: 'wrong', label: 'As built' }, { value: 'right', label: 'Right types' }]} />}
    >
      <div style={swapGrid}>
        <Swap show={!shown}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
              {WRONG_FIELDS.map((f) => (
                <div key={f.label}>
                  <div style={flabel}>{f.label}</div>
                  <div style={{ ...box, borderColor: RED, color: MUTED, fontStyle: 'italic' }}>{f.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: RED, marginTop: '14px', fontWeight: 600 }}>Every field is a text box, so nothing can be validated, sorted, or counted.</div>
          </div>
        </Swap>
        <Swap show={shown}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
              {field('Date', (
                <div style={box}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' }} />
                  Sat, Jun 14
                </div>
              ))}
              {field('Bringing a guest?', (
                <div style={{ display: 'inline-flex', border: `1px solid ${BORDER}`, borderRadius: '100px', padding: '3px', background: PAPER }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '100px', background: ACCENT, color: PAPER }}>Yes</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '5px 14px', borderRadius: '100px', color: MUTED }}>No</span>
                </div>
              ))}
              {field('Party size', (
                <div style={{ ...box, justifyContent: 'space-between', maxWidth: '120px' }}>
                  <span style={{ color: MUTED, fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>−</span>
                  <span style={{ fontWeight: 700 }}>4</span>
                  <span style={{ color: ACCENT, fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>+</span>
                </div>
              ))}
              {field('Meal', (
                <div style={{ ...box, justifyContent: 'space-between' }}>
                  Vegetarian
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: '<path d="M6 9l6 6 6-6"/>' }} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: GREEN, marginTop: '14px', fontWeight: 600 }}>Each field only holds what it should: pick a date, tap yes, step a number, choose a meal.</div>
          </div>
        </Swap>
      </div>
    </DemoFrame>
  );
}

/* ── 15. Set rules and limits ──────────────────────────────────────── */

const AMENITIES = [
  { key: 'wifi', label: 'Wifi', icon: '<path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.11a6 6 0 0 1 7 0"/><path d="M12 20h.01"/>' },
  { key: 'parking', label: 'Parking', icon: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 17V7h3.5a3 3 0 0 1 0 6H9"/>' },
  { key: 'pool', label: 'Pool', icon: '<path d="M2 12c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/><path d="M2 16.5c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1"/>' },
  { key: 'coffee', label: 'Coffee', icon: '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2M10 2v2M14 2v2"/>' },
  { key: 'pets', label: 'Pets ok', icon: '<circle cx="6" cy="9" r="1.7"/><circle cx="10" cy="6" r="1.7"/><circle cx="14" cy="6" r="1.7"/><circle cx="18" cy="9" r="1.7"/><ellipse cx="12" cy="15.5" rx="4.6" ry="3.6"/>' },
  { key: 'firepit', label: 'Fire pit', icon: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/>' },
  { key: 'nosmoke', label: 'No smoking', icon: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>' },
];

const CHECK_IN_ICON = '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>';
const CHECK_OUT_ICON = '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>';

const DESC_MAX = 120;

function RulesDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'free' | 'limits'>('limits');
  const [paused, setPaused] = useState(false);
  const desc = 'Cozy cabin, steps from the lake. Wake up to the water, wind down by the fire.';

  // Comparison toggle: cycle the catch-all blob against the structured
  // listing. No cursor; yields the moment the visitor touches it.
  const { reduce } = useAutoplay(frameRef, async ({ wait, alive }) => {
    setMode('free');
    await wait(2600);
    if (!alive()) return;
    setMode('limits');
    await wait(3200);
  }, { paused });
  const shownMode = reduce && !paused ? 'limits' : mode;

  // Read-only facts, not form inputs: this is the finished listing, not an
  // edit screen. Same clean label/value row used by the "at a glance" demo.
  const fact = (label: string, value: string, icon?: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      {icon && (
        <span style={{ flexShrink: 0, color: ACCENT, display: 'inline-flex', marginTop: '2px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: icon }} />
        </span>
      )}
      <div>
        <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '3px' }}>{label}</div>
        <div style={{ fontSize: '15px', fontWeight: 500, color: FG }}>{value}</div>
      </div>
    </div>
  );

  return (
    <DemoFrame
      ref={frameRef}
      label="Set rules and limits"
      caption="A limit is really a conversation. When someone bumps into one, it either exposes a real gap in the software (a field or feature I'm missing) or it's a chance to gently point out that by trying to say everything, they end up saying nothing. Here, capping the description turns that overflow into structured fields instead of prose."
      control={<Segmented value={shownMode} onChange={(m) => { setPaused(true); setMode(m); }} options={[{ value: 'free', label: 'No limits' }, { value: 'limits', label: 'Rules & limits' }]} />}
    >
      <div style={swapGrid}>
        <Swap show={shownMode === 'free'}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '8px' }}>Description</div>
          <div style={{ border: `1px solid ${RED}`, borderRadius: '8px', padding: '12px 14px', fontSize: '13px', lineHeight: 1.6, color: MUTED, background: PAPER }}>
            Cozy cabin, steps from the lake. Fast wifi throughout. Free parking on site for two cars. Pool is open May through September. Coffee and tea in the kitchen. Pet friendly, up to two dogs. Fire pit out back. Check in after 3, out by 11. No smoking. $180 a night, sleeps four…
          </div>
          <div style={{ fontSize: '12px', color: RED, marginTop: '10px', fontWeight: 600 }}>Everything the form forgot ends up in here.</div>
        </div>
        </Swap>
        <Swap show={shownMode !== 'free'}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', marginBottom: '18px' }}>
            {fact('Rate', '$180 / night')}
            {fact('Sleeps', '4 guests')}
            {fact('Beds', '2')}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '6px' }}>Description</div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: FG, margin: 0 }}>{desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '7px', fontSize: '11px', color: MUTED }}>
            <span>Kept to the vibe, not a spec sheet.</span>
            <span style={{ fontWeight: 700 }}>{desc.length} / {DESC_MAX}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', margin: '18px 0' }}>
            {fact('Check-in', 'After 3:00 PM', CHECK_IN_ICON)}
            {fact('Check-out', 'By 11:00 AM', CHECK_OUT_ICON)}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '10px' }}>Amenities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {AMENITIES.map((a) => (
              <span key={a.key} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, background: 'rgba(23,18,9,0.05)', color: FG }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: a.icon }} />
                {a.label}
              </span>
            ))}
          </div>
        </div>
        </Swap>
      </div>
    </DemoFrame>
  );
}

/* ── Registry ──────────────────────────────────────────────────────── */

export type DemoId =
  | 'optimistic' | 'wallOfText' | 'skeleton' | 'mobile' | 'motion'
  | 'typesEnforce' | 'validate' | 'cleanData' | 'cheapest' | 'cache'
  | 'abstract' | 'monorepo' | 'constraint' | 'formTypes' | 'rules';

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
  constraint: ConstraintDemo,
  formTypes: FormTypesDemo,
  rules: RulesDemo,
};

export function HowIBuildDemo({ id }: { id: DemoId }) {
  const Demo = REGISTRY[id];
  return <Demo />;
}
