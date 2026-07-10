'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Footer } from '@/components/Footer';
import { InkCloseButton, useInkExit } from '@/components/InkExit';

/* ── Church Hub brand system ──────────────────────────────────────────
   Marble over cream, warm-gray ink, a soft slate-blue accent, serif
   display. Matches the poster + the open transition (ChurchHubMorph). */
const CREAM = '#EDE8E0';
const INK = '#3B3833';
const MUTED = '#8C8272';
const BLUE = '#7BA3C9';
const BLUE_DEEP = '#4F79A3';
const BORDER = '#CFC6B8';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

// Faint hub-and-spoke motif echoing the open transition.
function HubGlyph({ size = 220, opacity = 0.14 }: { size?: number; opacity?: number }) {
  const R = size * 0.36;
  const c = size / 2;
  const spokes = [-90, -32, 34, 96, 150, 210];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity }} aria-hidden="true">
      {spokes.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x = c + Math.cos(rad) * R;
        const y = c + Math.sin(rad) * R;
        return (
          <g key={i}>
            <line x1={c} y1={c} x2={x} y2={y} stroke={BLUE} strokeWidth={1.2} />
            <circle cx={x} cy={y} r={4.5} fill={CREAM} stroke={BLUE} strokeWidth={1.4} />
          </g>
        );
      })}
      <circle cx={c} cy={c} r={8} fill={BLUE} />
    </svg>
  );
}

type Shot = { desktop: string; desktopAlt: string; phone: string; phoneAlt: string };

// One desktop + overlaid phone composite.
function Composite({ shot }: { shot: Shot }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img src={shot.desktop} alt={shot.desktopAlt} loading="lazy" style={{ display: 'block', width: '100%', borderRadius: '4px', border: `1px solid ${BORDER}`, boxShadow: '0 24px 60px rgba(48,60,74,0.18)' }} />
      <img src={shot.phone} alt={shot.phoneAlt} loading="lazy" style={{ position: 'absolute', bottom: '-14px', right: '-10px', width: 'clamp(92px, 27%, 170px)', borderRadius: '16px', border: `1px solid ${BORDER}`, boxShadow: '0 18px 48px rgba(0,0,0,0.32)' }} />
    </div>
  );
}

// A set of feature screenshots, full width. One shot renders on its own;
// two or more sit side by side when there's room and collapse to a peek
// carousel when the container is narrow (see .shot-set* in globals.css).
function ShotSet({ shots }: { shots: Shot[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const r = (c as HTMLElement).getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setActive(best);
  };

  if (shots.length === 1) {
    return (
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        style={{ width: '100%', paddingBottom: '22px' }}>
        <Composite shot={shots[0]} />
      </motion.div>
    );
  }

  return (
    <motion.div className="shot-set" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="shot-set-track"
        style={{ gridTemplateColumns: `repeat(${shots.length}, minmax(0, 1fr))` }}
      >
        {shots.map((s) => (
          <div key={s.desktop} className="shot-set-item">
            <Composite shot={s} />
          </div>
        ))}
      </div>
      <div className="shot-set-dots">
        {shots.map((s, i) => (
          <div key={s.desktop} style={{ width: active === i ? '24px' : '8px', height: '8px', borderRadius: '100px', background: active === i ? BLUE_DEEP : BORDER, transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </motion.div>
  );
}

function Pillar({ index, kicker, heading, body, children }: {
  index: string;
  kicker: string;
  heading: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ maxWidth: '640px', marginBottom: 'clamp(34px, 5vw, 56px)' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '18px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', lineHeight: 1, color: 'transparent', WebkitTextStroke: `1.5px ${BLUE}`, letterSpacing: '0.02em' }}>{index}</span>
            <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE_DEEP, fontWeight: 700 }}>{kicker}</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', lineHeight: 1.1, letterSpacing: '-0.01em', color: INK, marginBottom: '20px' }}>{heading}</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.85, color: MUTED, fontWeight: 400 }}>{body}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

export default function ChurchHubPage() {
  const { exitWithInk, inkOverlay } = useInkExit('/#work');
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: CREAM, color: INK, overflowX: 'clip' }}>
      {/* page-wide marble wash, matching the poster / sheet / transition */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <img src="/marble.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16, filter: 'saturate(0)' }} />
      </div>

      <style>{`body > nav { display: none !important; }`}</style>

      <InkCloseButton onClick={exitWithInk} color={BLUE_DEEP} background="rgba(237,232,224,0.6)" border="rgba(123,163,201,0.55)" />
      {inkOverlay}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px, 12vh, 140px) 24px 60px', overflow: 'hidden' }}>
          {/* soft blue glow */}
          <div style={{ position: 'absolute', top: '-10%', right: '-6%', width: '46vw', height: '46vw', background: 'radial-gradient(circle, rgba(123,163,201,0.22) 0%, transparent 68%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '8%', right: '4%', pointerEvents: 'none' }}>
            <HubGlyph size={280} opacity={0.12} />
          </div>

          <div style={{ maxWidth: '1040px', margin: '0 auto', width: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED, fontWeight: 700, marginBottom: '18px' }}>
              Developer Platform
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(3.6rem, 12vw, 8rem)', color: BLUE, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Church Hub
            </motion.h1>
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ width: '84px', height: '2px', background: BLUE, transformOrigin: 'left', marginBottom: '28px' }} />
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.48 }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.15rem, 2.4vw, 1.7rem)', color: INK, maxWidth: '620px', lineHeight: 1.5 }}>
              From an internal tool into a platform churches own and build on.
            </motion.p>
          </div>
        </section>

        {/* ── Thesis ─────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(48px, 8vw, 96px) 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <motion.p variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '36px' }}>
              A modular Next.js system that centralizes operations, automates workflows, and lets churches build custom tools on top of their own data.
            </motion.p>
            <motion.p variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
              style={{ fontSize: '15px', lineHeight: 1.9, color: MUTED, maxWidth: '640px' }}>
              What started as an internal tool at Woodside Bible Church grew into something churches own outright: extend it in-house, hire a developer, or let AI build on top of it. I started a business around it, implementing it across multiple churches to solve real operational problems at scale. It spans public-facing microsites and embeddable widgets, internal staff apps for the work nobody else wants to touch, event and volunteer tooling, and analytics on top of it all.
            </motion.p>
          </div>
        </section>

        {/* ── Pillars ────────────────────────────────────────── */}
        <Pillar
          index="01"
          kicker="Microsites & widgets"
          heading="Built for the site they already have."
          body="Most churches run their public site on WordPress or a builder someone else set up, with no real way to write code against it. I build widgets and microsites that drop cleanly into those sites, match the design, and push and pull data from wherever it actually lives."
        >
          <ShotSet
            shots={[
              {
                desktop: '/images/church-hub-see-jesus-desktop.webp',
                desktopAlt: 'The See Jesus giving campaign microsite on desktop',
                phone: '/images/church-hub-commitment-flow.webp',
                phoneAlt: 'The See Jesus commitment flow on mobile: entry, commitment form, giving chart, and stored resources',
              },
              {
                desktop: '/images/church-hub-locations-desktop.webp',
                desktopAlt: 'Campus locator widget on desktop',
                phone: '/images/church-hub-locations-flow.webp',
                phoneAlt: 'Campus locator on mobile: browse the campus list, then open the Lake Orion campus detail with map, pastor, and service times',
              },
            ]}
          />
        </Pillar>

        <Pillar
          index="02"
          kicker="Internal apps & event tooling"
          heading="The apps staff actually run on."
          body="Behind the public site is a set of internal apps staff run on. Weekend Planning lays a full year of preaching series, campaigns, events, and service notes onto one timeline. Drill into a series for its planning workspace and week-by-week breakdown, then into a single sermon: big idea, scripture, points, speaker, and status. Every level is branded to the series and just as styled on mobile."
        >
          <ShotSet
            shots={[
              {
                desktop: '/images/church-hub-events-flow.webp',
                desktopAlt: "Weekend Planning on desktop: the timeline, the Missio Dei series, and a single sermon's planning detail",
                phone: '/images/church-hub-events-mobile-flow.webp',
                phoneAlt: 'Branded mobile bottom sheets for changing service times and adding a note to a week',
              },
            ]}
          />
        </Pillar>

        <Pillar
          index="03"
          kicker="Analytics & insights"
          heading="Their own data, made legible."
          body="I turn a church's own data into custom, genuinely good-looking insights they can act on. Engagement Circles is one: a clear read on where people are and where they're heading, and it reflows into styled sheets on mobile so it works in the room, not just at a desk."
        >
          <ShotSet
            shots={[
              {
                desktop: '/images/church-hub-circles-desktop.webp',
                desktopAlt: 'Engagement Circles dashboard on desktop: concentric ring model and per-tier totals',
                phone: '/images/church-hub-circles-mobile-sheet.webp',
                phoneAlt: 'Engagement Circles on mobile: a tier detail sheet with narrative and trend',
              },
            ]}
          />
        </Pillar>

        {/* ── Tech ───────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px', color: MUTED, textTransform: 'uppercase', fontWeight: 700 }}>Built with</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL Server', 'Tailwind', 'Vercel'].map((t) => (
                  <span key={t} style={{ fontSize: '13px', fontWeight: 500, color: BLUE_DEEP, padding: '8px 16px', borderRadius: '100px', border: `1px solid ${BLUE}`, background: 'rgba(123,163,201,0.06)' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Closing ────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(72px, 12vw, 140px) 24px', borderTop: `1px solid ${BORDER}`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(123,163,201,0.18) 0%, transparent 66%)', pointerEvents: 'none' }} />
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ position: 'relative', display: 'inline-flex', marginBottom: '32px' }}>
            <HubGlyph size={120} opacity={0.9} />
          </motion.div>
          <motion.h2 variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: INK, lineHeight: 1.15, maxWidth: '760px', margin: '0 auto 40px' }}>
            A platform they own, not a subscription they rent.
          </motion.h2>
          <motion.div variants={reveal} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/work/woodside" style={{ fontSize: '14px', fontWeight: 700, color: CREAM, background: BLUE_DEEP, padding: '13px 26px', borderRadius: '100px', textDecoration: 'none', letterSpacing: '0.02em' }}>
              Next: Woodside
            </Link>
            <button type="button" onClick={exitWithInk} style={{ fontSize: '14px', fontWeight: 700, color: BLUE_DEEP, padding: '13px 26px', borderRadius: '100px', background: 'transparent', border: `1px solid ${BLUE}`, letterSpacing: '0.02em', cursor: 'pointer', fontFamily: 'inherit' }}>
              Back to Work
            </button>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
