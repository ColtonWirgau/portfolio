'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  techGrid: { label: string; sub: string }[];
  extraTags: string[];
  status: string;
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
    techGrid: [
      { label: 'NEXT.JS 16', sub: 'FRAMEWORK' },
      { label: 'DRIZZLE', sub: 'ORM' },
      { label: 'NEON', sub: 'DATABASE' },
      { label: 'TAILWIND 4', sub: 'STYLE' },
      { label: 'PLAYWRIGHT', sub: 'SCRAPING' },
      { label: 'BROWSER EXT', sub: 'CHROME' },
    ],
    extraTags: ['TYPESCRIPT', 'SLEEPER API', 'ANTON', 'GEIST'],
    status: 'In active use across multiple leagues',
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
    tagline: 'Detroit Lions season-ticket management for the Wirgau family',
    body: 'My parents and I have Detroit Lions season tickets with two extra seats, so I built a little app to keep track of who’s going to each game, who paid what, any resales, and how much we’ve spent or made across the season. It’s a quiet utility that solves a real (very niche) problem. It’s got full OAuth, a Neon database, and clean dashboards under the hood. I’m migrating my image generator from Dynastly into it next, so it’ll automatically produce social-post graphics for tickets we put up for sale (the kind I usually have to hand-make in Figma every week).',
    techGrid: [
      { label: 'NEXT.JS', sub: 'FRAMEWORK' },
      { label: 'NEON', sub: 'DATABASE' },
      { label: 'OAUTH', sub: 'AUTH' },
      { label: 'TAILWIND', sub: 'STYLE' },
      { label: 'VERCEL', sub: 'HOSTING' },
      { label: 'TYPESCRIPT', sub: 'LANGUAGE' },
    ],
    extraTags: ['FAMILY-ONLY', 'GAME TRACKING', 'RESALE LEDGER', 'AUTO-GEN SOCIAL POSTS'],
    status: 'Used by the family every season',
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
    techGrid: [
      { label: 'NEXT.JS', sub: 'FRAMEWORK' },
      { label: 'SUPABASE', sub: 'BACKEND' },
      { label: 'POSTGRESQL', sub: 'DATABASE' },
      { label: 'TAILWIND', sub: 'STYLE' },
      { label: 'TYPESCRIPT', sub: 'LANGUAGE' },
      { label: 'ANTON', sub: 'DISPLAY' },
    ],
    extraTags: ['GLOW EFFECTS', 'PARLAY TRACKING', 'WEEKLY ROAST'],
    status: 'Active every NFL Sunday',
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
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
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

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 100px' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
              <div>
                <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#A1A1AA', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                  Dynasty Fantasy
                </div>
                <div style={{ fontSize: '7px', fontWeight: 400, letterSpacing: '0.04em', color: '#52525B', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginTop: '4px', maxWidth: '140px', lineHeight: 1.5 }}>
                  TRADE COMPANION FOR THE LEAGUE
                </div>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 12px rgba(245,158,11,0.6)' }} />
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
              <div style={{ width: '40px', height: '2px', background: '#F59E0B', margin: '20px auto' }} />
              <p style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#F59E0B',
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center',
                marginBottom: '20px',
              }}>
                Trade Companion
              </p>
              <p style={{
                fontSize: '11px', fontWeight: 500, color: '#A1A1AA',
                fontFamily: 'var(--font-sans)', textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '220px',
                margin: '0 auto',
              }}>
                Multi-league valuations, rosters, and multi-team trade builder.
              </p>
            </div>

            <div style={{
              padding: '20px 28px 24px', display: 'flex',
              justifyContent: 'flex-end', alignItems: 'flex-end',
              position: 'relative', zIndex: 3, marginTop: 'auto',
              borderTop: '1px solid #27272A',
              paddingTop: '16px',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#71717A', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>Multi-League</span>
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

            {/* Top label */}
            <div style={{
              padding: '24px 28px 0',
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                Personal Tool
              </span>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#FFB612', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                Detroit Lions
              </span>
            </div>

            {/* BIG centered logo */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 28px',
              position: 'relative',
              zIndex: 3,
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 7vw, 3.8rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  Roar
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 7vw, 3.8rem)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                  Tracker
                </span>
              </div>

              <div style={{ width: '40px', height: '2px', background: '#FFB612', margin: '24px auto 18px' }} />

              <p style={{
                fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-sans)', textAlign: 'center',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}>
                Season-ticket tracker for the Wirgau family. Auto-generates social posts for tickets we put up for sale.
              </p>
            </div>

            <div style={{
              padding: '20px 28px 24px', display: 'flex',
              justifyContent: 'flex-end', alignItems: 'flex-end',
              position: 'relative', zIndex: 3, marginTop: 'auto',
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '16px',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>Family Only</span>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
              <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.25em', color: '#00D9FF', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textShadow: '0 0 8px rgba(0,217,255,0.6)' }}>
                Parlay Tracker
              </span>
              <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.25em', color: '#FF69B4', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textShadow: '0 0 8px rgba(255,105,180,0.5)' }}>
                0–∞
              </span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'clamp(110px, 22vw, 180px)' }}>
                <span style={{
                  position: 'absolute',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(7rem, 18vw, 11rem)',
                  color: '#00D9FF',
                  lineHeight: 1,
                  textShadow: '0 0 24px rgba(0,217,255,0.8), 0 0 48px rgba(0,217,255,0.4)',
                  left: 'calc(50% - 0.42em)',
                  paddingTop: '0.08em',
                }}>
                  D
                </span>
                <span style={{
                  position: 'absolute',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(7rem, 18vw, 11rem)',
                  color: '#FF69B4',
                  lineHeight: 1,
                  textShadow: '0 0 24px rgba(255,105,180,0.8), 0 0 48px rgba(255,105,180,0.4)',
                  left: 'calc(50% - 0.18em)',
                  paddingTop: '0.08em',
                  mixBlendMode: 'screen',
                }}>
                  D
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                color: '#E5E7EB',
                lineHeight: 1,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: '8px',
                paddingTop: '0.08em',
              }}>
                Degenerates
              </div>

              <p style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#39FF14',
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center',
                marginTop: '24px', lineHeight: 1.6,
                textShadow: '0 0 6px rgba(57,255,20,0.5)',
              }}>
                12 LEGS · ZERO WINS
              </p>
            </div>

            <div style={{
              padding: '20px 28px 24px', display: 'flex',
              justifyContent: 'flex-end', alignItems: 'flex-end',
              position: 'relative', zIndex: 3, marginTop: 'auto',
              borderTop: '1px solid rgba(255,105,180,0.25)',
              paddingTop: '16px',
            }}>
              <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#FF69B4', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>Every Sunday</span>
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
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            color: theme.fg,
            lineHeight: 1,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            paddingTop: '0.08em',
            marginBottom: '10px',
            textShadow: `0 0 24px ${theme.accent}66`,
          }}>
            Degenerates
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

function ProjectSheetBody({ project }: { project: typeof sideProjects[SideProjectId] }) {
  const { theme, body, techGrid, extraTags, status } = project;
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '28px' }}>
        {body}
      </p>

      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--color-muted)', marginBottom: '12px', fontWeight: 600,
        }}>
          Stack
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '1px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-border)',
        }}>
          {techGrid.map((item) => (
            <div key={item.label} style={{ padding: '12px 10px', textAlign: 'center', background: 'var(--color-card)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: theme.accent, fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '9px', fontWeight: 500, color: 'var(--color-muted)', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', marginTop: '3px', textTransform: 'uppercase' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {extraTags.map((t) => (
          <span key={t} style={{
            fontSize: '11px', fontWeight: 500, color: 'var(--color-muted)',
            padding: '5px 12px', borderRadius: '100px',
            border: '1px solid var(--color-border)', lineHeight: 1.3,
          }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{
        padding: '16px',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${theme.accent}`,
      }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--color-muted)', marginBottom: '6px', fontWeight: 600,
        }}>
          Status
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-fg)', fontWeight: 500 }}>
          {status}
        </div>
      </div>
    </div>
  );
}
