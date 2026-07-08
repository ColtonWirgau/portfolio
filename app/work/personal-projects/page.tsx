'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { ResponsiveSheet, SheetPage } from '@/components/ResponsiveSheet';

type SideProjectId = 'dynastly' | 'roar' | 'degenerates';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' as const },
  }),
};

const sideProjects: Record<SideProjectId, {
  title: string;
  tagline: string;
  body: string;
  stack: string[];
  screens?: { desktop: string; mobile?: string; caption: string; aspect?: string }[];
  theme: {
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    label: string;
  };
}> = {
  dynastly: {
    title: 'Dynastly',
    tagline: 'Dynasty fantasy football trade companion',
    body: 'I play dynasty fantasy football and got tired of bouncing between five tools to evaluate my team, see how I stack up against the league, and build trades. Sites like KeepTradeCut only handle 1-for-1 deals, and most league platforms don’t expose the APIs I needed. So I built Dynastly: pulls player valuations from a few sources, mirrors my league’s rosters and matchups, and lets me build realistic multi-team trades on a single canvas. Ships with a companion browser extension to pull data the public APIs won’t. Found some interesting things in upstream platforms along the way.',
    stack: ['Next.js 16', 'TypeScript', 'Drizzle', 'Neon', 'Tailwind 4', 'Playwright', 'Chrome Extension', 'Sleeper API'],
    screens: [
      {
        desktop: '/images/dynastly-1.webp',
        mobile: '/images/dynastly-mobile-1.webp',
        caption: 'The team dashboard: starters, bench, and picks valued in one place, with open offers below.',
      },
      {
        desktop: '/images/dynastly-3.webp',
        mobile: '/images/dynastly-mobile-3.webp',
        caption: 'Player pages: value history, comparables, prospect profile, and recent seasons.',
      },
      {
        desktop: '/images/dynastly-4.webp',
        mobile: '/images/dynastly-mobile-4.webp',
        caption: 'The trade creator: full rosters, picks, and FAAB across every team in the deal, on one canvas.',
      },
      {
        desktop: '/images/dynastly-5.webp',
        mobile: '/images/dynastly-mobile-5.webp',
        caption: 'Trade breakdown with a fairness meter per side and suggested assets to even the deal.',
      },
      {
        desktop: '/images/dynastly-2.webp',
        mobile: '/images/dynastly-mobile-2.webp',
        caption: 'The full player pool, filterable, with KeepTradeCut and FantasyCalc valuations side by side.',
      },
    ],
    theme: {
      bg: '#09090B',
      fg: '#F0EBE0',
      accent: '#F59E0B',
      muted: '#A1A1AA',
      label: '#F59E0B',
    },
  },
  roar: {
    title: 'Roar Tracker',
    tagline: 'Six Lions season tickets, one organized family',
    body: 'My parents, my wife, and I split six Lions season tickets, and there are only four of us. So every game comes with at least two open seats: friends when we can find them, the resale market when we can’t. Roar Tracker keeps the whole operation straight. Who’s in for each game, who paid what, and how the season is tracking money-wise. When more people want in than we have seats, it runs the drawing. And when we list a pair, it generates a clean social graphic for the post, the kind I used to rebuild in Figma every single week.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'OAuth', 'Tailwind', 'Vercel'],
    screens: [
      {
        desktop: '/images/roar-tracker-1.webp',
        mobile: '/images/roar-tracker-mobile-1.webp',
        caption: 'The season dashboard: net position, ticket status, and every home game at a glance.',
      },
      {
        desktop: '/images/roar-tracker-2.webp',
        mobile: '/images/roar-tracker-mobile-2.webp',
        caption: 'Every game gets its own page: final score plus cost, revenue, and net for the seats.',
      },
      {
        desktop: '/images/roar-tracker-3.webp',
        mobile: '/images/roar-tracker-mobile-3.webp',
        caption: 'Seat-by-seat breakdown: who has each seat, what it cost, and what it sold for.',
      },
    ],
    theme: {
      bg: '#0076B6', // Lions Honolulu Blue
      fg: '#FFFFFF',
      accent: '#FFB612', // Lions Honey Gold
      muted: 'rgba(255,255,255,0.7)',
      label: '#FFB612',
    },
  },
  degenerates: {
    title: 'Degenerates Dashboard',
    tagline: 'A 12-leg parlay you all lose together every Sunday',
    body: 'Every week, my idiot friends and I place a 12-leg parlay. We have never won. Not once. But we keep doing it, and I built a dashboard to track our glorious losing streak. It pulls in picks, tracks results, and roasts us with the data. It’s dumb, it’s fun, and it’s one of my favorite things I’ve built.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind'],
    screens: [
      {
        desktop: '/images/degenerates-1.webp',
        mobile: '/images/degenerates-mobile-1.webp',
        caption: 'The weekly slate: every game on the board and whose pick lives where.',
        aspect: '2560 / 1800',
      },
      {
        desktop: '/images/degenerates-2.webp',
        mobile: '/images/degenerates-mobile-2.webp',
        caption: 'All 12 legs, live: who already hit and who is still sweating.',
        aspect: '2560 / 1800',
      },
      {
        desktop: '/images/degenerates-4.webp',
        mobile: '/images/degenerates-mobile-4.webp',
        caption: 'The aftermath: 8 hit, 4 missed, and the parlay dies again.',
        aspect: '2560 / 1800',
      },
      {
        desktop: '/images/degenerates-5.webp',
        mobile: '/images/degenerates-mobile-5.webp',
        caption: 'Your season: the week-by-week record and every bet you should not have made.',
        aspect: '2560 / 1800',
      },
      {
        desktop: '/images/degenerates-3.webp',
        mobile: '/images/degenerates-mobile-3.webp',
        caption: 'Season setup: every rule, date, stake, and punishment gets voted on before anything locks.',
        aspect: '2560 / 1800',
      },
    ],
    theme: {
      bg: '#0A0A0A',
      fg: '#E5E7EB',
      accent: '#00D9FF',
      muted: 'rgba(229,231,235,0.65)',
      label: '#FF69B4',
    },
  },
};

export default function PersonalProjectsPage() {
  const [selected, setSelected] = useState<SideProjectId | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ position: 'relative', height: '50vh', minHeight: '340px', overflow: 'hidden' }}>
        <motion.img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&h=900&fit=crop"
          alt="Personal Projects"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Side Projects
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Personal Projects
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            The stuff I build for fun
          </motion.p>
        </div>
      </div>

      <div style={{ padding: '60px 24px 100px' }}>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '40px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Work
        </Link>

        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.7, marginBottom: '48px' }}>
          The stuff I build for fun (and sometimes for my friends and family). These are less polished, more personality. Each poster below is styled to match the actual product. Click any of them for the story.
        </motion.p>

        {/* Project posters */}
        <div className="poster-grid">

          {/* ═══════════════════════════════════════════════
              POSTER 1 - DYNASTLY
              ═══════════════════════════════════════════════ */}
          <div
            className="group poster-card"
            onClick={() => setSelected('dynastly')}
            style={{
              background: '#09090B',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '2/3',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 20% 10%, rgba(245,158,11,0.12) 0%, transparent 45%), radial-gradient(circle at 85% 90%, rgba(245,158,11,0.06) 0%, transparent 50%)',
              zIndex: 1,
            }} />

            {/* Phone screenshots peeking from the bottom corners */}
            <img
              src="/images/dynastly-mobile-1.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-26%',
                left: '-10%',
                width: '42%',
                transform: 'rotate(-8deg)',
                borderRadius: '10px',
                border: '1px solid #27272A',
                boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
                zIndex: 2,
              }}
            />
            <img
              src="/images/dynastly-mobile-5.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-30%',
                right: '-12%',
                width: '46%',
                transform: 'rotate(7deg)',
                borderRadius: '10px',
                border: '1px solid #27272A',
                boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
                zIndex: 2,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
              <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#A1A1AA', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                Fantasy Football
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 4.4rem)',
                color: '#F0EBE0',
                lineHeight: 0.9,
                letterSpacing: '-0.015em',
                textTransform: 'uppercase',
                textAlign: 'center',
                paddingTop: '0.08em',
              }}>
                Dynastly
              </h3>
              <div style={{ width: '40px', height: '2px', background: '#F0EBE0', margin: '20px auto' }} />
              <p style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#F0EBE0',
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center',
                marginBottom: '20px',
              }}>
                Dynasty Command Center
              </p>
              <p style={{
                fontSize: '11px', fontWeight: 500, color: '#A1A1AA',
                fontFamily: 'var(--font-sans)', textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '220px',
                margin: '0 auto',
              }}>
                Value your roster, size up the league, and build smarter trades.
              </p>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════
              POSTER 2 - ROAR TRACKER (simplified, logo-centered)
              ═══════════════════════════════════════════════ */}
          <div
            className="group poster-card"
            onClick={() => setSelected('roar')}
            style={{
              background: '#0076B6',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '2/3',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Subtle horizontal field lines */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 61px)',
              zIndex: 1,
            }} />

            {/* Phone screenshots peeking from the bottom corners */}
            <img
              src="/images/roar-tracker-mobile-1.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-26%',
                left: '-10%',
                width: '42%',
                transform: 'rotate(-8deg)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                zIndex: 2,
              }}
            />
            <img
              src="/images/roar-tracker-mobile-2.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-30%',
                right: '-12%',
                width: '46%',
                transform: 'rotate(7deg)',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
                zIndex: 2,
              }}
            />

            {/* Top label */}
            <div style={{
              padding: '24px 28px 0',
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#FFB612', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                Detroit Lions
              </span>
            </div>

            {/* Centered type stack, Dynastly-style */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 28px',
              position: 'relative',
              zIndex: 3,
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.9rem, 4.8vw, 2.9rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  Roar
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.9rem, 4.8vw, 2.9rem)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                  Tracker
                </span>
              </div>
              <div style={{ width: '40px', height: '2px', background: '#FFB612', margin: '20px auto' }} />
              <p style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#FFB612',
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center',
                marginBottom: '20px',
              }}>
                Season Ticket HQ
              </p>
              <p style={{
                fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-sans)', textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '220px',
                margin: '0 auto',
              }}>
                Six seats, two always open. Who&apos;s going, who paid, and the sale graphic when we list a pair.
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════
              POSTER 3 - DEGENERATES DASHBOARD
              ═══════════════════════════════════════════════ */}
          <div
            className="group poster-card"
            onClick={() => setSelected('degenerates')}
            style={{
              background: '#0A0A0A',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '2/3',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 15% 10%, rgba(0,217,255,0.22) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(0,217,255,0.10) 0%, transparent 45%), radial-gradient(circle at 50% 95%, rgba(255,105,180,0.18) 0%, transparent 48%)',
              zIndex: 1,
            }} />

            {/* Phone screenshots peeking from the bottom corners */}
            <img
              src="/images/degenerates-mobile-1.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-26%',
                left: '-10%',
                width: '42%',
                transform: 'rotate(-8deg)',
                borderRadius: '10px',
                border: '1px solid rgba(0,217,255,0.35)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
                zIndex: 2,
              }}
            />
            <img
              src="/images/degenerates-mobile-2.webp"
              alt=""
              loading="lazy"
              style={{
                position: 'absolute',
                bottom: '-30%',
                right: '-12%',
                width: '46%',
                transform: 'rotate(7deg)',
                borderRadius: '10px',
                border: '1px solid rgba(255,105,180,0.35)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
                zIndex: 2,
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
              <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.25em', color: '#00D9FF', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textShadow: '0 0 8px rgba(0,217,255,0.6)' }}>
                Parlay Tracker
              </span>
              <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.25em', color: '#FF69B4', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textShadow: '0 0 8px rgba(255,105,180,0.5)' }}>
                0–∞
              </span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 6vw, 3.4rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                textAlign: 'center',
                paddingTop: '0.08em',
              }}>
                <span style={{ display: 'block', color: '#00D9FF', textShadow: '0 0 20px rgba(0,217,255,0.7), 0 0 40px rgba(0,217,255,0.35)' }}>
                  Degenerates
                </span>
                <span style={{ display: 'block', color: '#FF69B4', textShadow: '0 0 20px rgba(255,105,180,0.7), 0 0 40px rgba(255,105,180,0.35)' }}>
                  Dashboard
                </span>
              </h3>
              <div style={{ width: '40px', height: '2px', background: '#E5E7EB', margin: '20px auto' }} />
              <p style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#39FF14',
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center',
                marginBottom: '20px',
                textShadow: '0 0 6px rgba(57,255,20,0.5)',
              }}>
                Fantasy League HR Department
              </p>
              <p style={{
                fontSize: '11px', fontWeight: 500, color: 'rgba(229,231,235,0.65)',
                fontFamily: 'var(--font-sans)', textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '220px',
                margin: '0 auto',
              }}>
                A weekly 12-leg parlay we have never hit. Tracks the picks, the votes, the rules, and the punishments.
              </p>
            </div>

          </div>

        </div>
      </div>

      <Footer />

      {/* Side-project sheet */}
      <ResponsiveSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        header={selected ? <ProjectSheetHeader project={sideProjects[selected]} /> : null}
      >
        <SheetPage name="main">
          {selected && <ProjectSheetBody project={sideProjects[selected]} />}
        </SheetPage>
      </ResponsiveSheet>
    </div>
  );
}

function ProjectSheetHeader({ project }: { project: typeof sideProjects[SideProjectId] }) {
  const { theme, title, tagline } = project;
  return (
    <div style={{
      background: theme.bg,
      padding: '36px 28px 32px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Brand-specific decorative overlay */}
      {title === 'Dynastly' && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 10%, rgba(99,102,241,0.18) 0%, transparent 45%), radial-gradient(circle at 85% 90%, rgba(245,158,11,0.10) 0%, transparent 45%)' }} />
      )}
      {title === 'Roar Tracker' && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 60px, rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px)' }} />
      )}
      {title === 'Degenerates Dashboard' && (
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 10%, rgba(0,217,255,0.22) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(168,85,247,0.18) 0%, transparent 45%), radial-gradient(circle at 50% 95%, rgba(255,105,180,0.20) 0%, transparent 50%)' }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: theme.label,
          fontWeight: 700,
          marginBottom: '14px',
        }}>
          Personal Project
        </div>

        {/* Title — use brand-specific styling */}
        {title === 'Roar Tracker' ? (
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Roar
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
              Tracker
            </span>
          </div>
        ) : title === 'Degenerates Dashboard' ? (
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.9rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            paddingTop: '0.08em',
            marginBottom: '10px',
          }}>
            <span style={{ display: 'block', color: '#00D9FF', textShadow: '0 0 20px rgba(0,217,255,0.7), 0 0 40px rgba(0,217,255,0.35)' }}>
              Degenerates
            </span>
            <span style={{ display: 'block', color: '#FF69B4', textShadow: '0 0 20px rgba(255,105,180,0.7), 0 0 40px rgba(255,105,180,0.35)' }}>
              Dashboard
            </span>
          </h2>
        ) : (
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            color: theme.fg,
            lineHeight: 1,
            letterSpacing: '-0.015em',
            textTransform: 'uppercase',
            paddingTop: '0.08em',
            marginBottom: '10px',
          }}>
            {title}
          </h2>
        )}

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '15px',
          color: theme.muted,
          lineHeight: 1.5,
          maxWidth: '520px',
        }}>
          {tagline}
        </p>
      </div>
    </div>
  );
}

function ScreenGallery({
  screens,
  bg,
}: {
  screens: NonNullable<typeof sideProjects[SideProjectId]['screens']>;
  bg: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: 'smooth' });
  };

  const arrowButtonStyle: React.CSSProperties = {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--color-border)',
    background: 'transparent',
    color: 'var(--color-muted)',
    cursor: 'pointer',
    transition: 'color 0.15s, border-color 0.15s',
  };

  return (
    <div className="screen-gallery" style={{ marginBottom: '28px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '12px',
      }}>
        <span style={{
          fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--color-muted)', fontWeight: 600,
        }}>
          In the App
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => scrollBySlide(-1)}
            style={arrowButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => scrollBySlide(1)}
            style={arrowButtonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          margin: '0 -28px',
          padding: '0 28px',
        }}
      >
        {screens.map((screen) => (
          <figure
            key={screen.desktop}
            className={screen.mobile ? 'screen-figure has-mobile' : 'screen-figure'}
            style={{ flex: '0 0 92%', scrollSnapAlign: 'center', margin: 0 }}
          >
            <img
              src={screen.desktop}
              alt={screen.caption}
              loading="lazy"
              className="screen-shot-desktop"
              style={{
                width: '100%',
                aspectRatio: screen.aspect ?? '1600 / 1000',
                border: '1px solid var(--color-border)',
                background: bg,
              }}
            />
            {screen.mobile && (
              <img
                src={screen.mobile}
                alt={screen.caption}
                loading="lazy"
                className="screen-shot-mobile"
                style={{
                  aspectRatio: '1179 / 1977',
                  border: '1px solid var(--color-border)',
                  background: bg,
                }}
              />
            )}
            <figcaption style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-muted)', marginTop: '10px', lineHeight: 1.5 }}>
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ProjectSheetBody({ project }: { project: typeof sideProjects[SideProjectId] }) {
  const { theme, body, stack, screens } = project;
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '28px' }}>
        {body}
      </p>

      {screens && screens.length > 0 && <ScreenGallery screens={screens} bg={theme.bg} />}

      <div style={{ paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-muted)', lineHeight: 1.8 }}>
          Built with {stack.join(' · ')}
        </p>
      </div>
    </div>
  );
}
