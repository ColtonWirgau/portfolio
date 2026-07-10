'use client';

import { Fragment, useCallback, useRef, useState } from 'react';
import { ResponsiveSheet, SheetPage } from '@/components/ResponsiveSheet';

type SideProjectId = 'dynastly' | 'roar' | 'degenerates';

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
    body: 'I play dynasty fantasy football and got tired of bouncing between five tools to evaluate my team, see how I stack up against the league, and build trades. Sites like KeepTradeCut only handle 1-for-1 deals, and most league platforms don’t expose the APIs I needed. So I built Dynastly: pulls player valuations from a few sources, mirrors my league’s rosters and matchups, and lets me build realistic multi-team trades on a single canvas. Ships with a companion browser extension to pull data the public APIs won’t. Along the way I found a serious bug in one of the big fantasy platforms, which I’m reporting to them, not shipping.',
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
    body: 'My parents, my wife, and I split six Lions season tickets, and there are only four of us. So every game comes with at least two open seats: friends when we can find them, the resale market when we can’t. Roar Tracker keeps the whole operation straight. Who’s in for each game, who paid what, and how the season is tracking money-wise. When more people want in than we have seats, it runs the drawing. And when we list a pair, it generates a clean social graphic for the post, the kind I used to rebuild in Illustrator every single week.',
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
      label: 'rgba(255,255,255,0.85)',
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

// ── Panel: three personal-project posters + the project sheet ──
// The "Personal Projects" heading and Back control live in the section
// header on the home page; this panel is just the posters + detail sheet.

export function PersonalProjectsPanel() {
  const [selected, setSelected] = useState<SideProjectId | null>(null);
  const [activePosterId, setActivePosterId] = useState(0);

  // Infinite carousel loop + active dot tracking on mobile, matching the
  // work and story carousels: three duplicated sets, wrap scrollLeft at
  // the set boundaries, start on the middle set.
  const attachCarousel = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const handleScroll = () => {
      const setWidth = el.scrollWidth / 3; // 3 sets of cards
      if (el.scrollLeft >= setWidth * 2) {
        el.scrollLeft -= setWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += setWidth;
      }
      const posInSet = el.scrollLeft % setWidth;
      const singleCardWidth = setWidth / 3;
      const idx = Math.round(posInSet / singleCardWidth) % 3;
      setActivePosterId(idx);
    };
    el.addEventListener('scroll', handleScroll);
    const raf = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div>
      {/* Project posters */}
      <div className="poster-grid" ref={attachCarousel}>
        {[0, 1, 2].map((setIndex) => (
          <Fragment key={`side-poster-set-${setIndex}`}>

        {/* POSTER 1 - DYNASTLY */}
        <div
          className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
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

          <img src="/images/dynastly-mobile-1.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-26%', left: '-10%', width: '42%', transform: 'rotate(-8deg)', borderRadius: '10px', border: '1px solid #27272A', boxShadow: '0 12px 32px rgba(0,0,0,0.55)', zIndex: 2 }} />
          <img src="/images/dynastly-mobile-5.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-30%', right: '-12%', width: '46%', transform: 'rotate(7deg)', borderRadius: '10px', border: '1px solid #27272A', boxShadow: '0 12px 32px rgba(0,0,0,0.55)', zIndex: 2 }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
            <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: '#A1A1AA', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
              Fantasy Football
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 4.4rem)', color: '#F0EBE0', lineHeight: 0.9, letterSpacing: '-0.015em', textTransform: 'uppercase', textAlign: 'center', paddingTop: '0.08em' }}>
              Dynastly
            </h3>
            <div style={{ width: '40px', height: '2px', background: '#F0EBE0', margin: '20px auto' }} />
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#F0EBE0', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px' }}>
              Dynasty Command Center
            </p>
            <p style={{ fontSize: '11px', fontWeight: 500, color: '#A1A1AA', fontFamily: 'var(--font-sans)', textAlign: 'center', lineHeight: 1.6, maxWidth: '220px', margin: '0 auto' }}>
              Value your roster, size up the league, and build smarter trades.
            </p>
          </div>
        </div>

        {/* POSTER 2 - DEGENERATES DASHBOARD */}
        <div
          className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
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
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 10%, rgba(0,217,255,0.22) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(0,217,255,0.10) 0%, transparent 45%), radial-gradient(circle at 50% 95%, rgba(255,105,180,0.18) 0%, transparent 48%)', zIndex: 1 }} />

          <img src="/images/degenerates-mobile-1.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-26%', left: '-10%', width: '42%', transform: 'rotate(-8deg)', borderRadius: '10px', border: '1px solid rgba(0,217,255,0.35)', boxShadow: '0 12px 32px rgba(0,0,0,0.55)', zIndex: 2 }} />
          <img src="/images/degenerates-mobile-2.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-30%', right: '-12%', width: '46%', transform: 'rotate(7deg)', borderRadius: '10px', border: '1px solid rgba(255,105,180,0.35)', boxShadow: '0 12px 32px rgba(0,0,0,0.55)', zIndex: 2 }} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '24px 28px 0', position: 'relative', zIndex: 3 }}>
            <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.25em', color: '#00D9FF', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textShadow: '0 0 8px rgba(0,217,255,0.6)' }}>
              Parlay Tracker
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 6vw, 3.4rem)', lineHeight: 0.95, letterSpacing: '-0.01em', textTransform: 'uppercase', textAlign: 'center', paddingTop: '0.08em' }}>
              <span style={{ display: 'block', color: '#00D9FF', textShadow: '0 0 20px rgba(0,217,255,0.7), 0 0 40px rgba(0,217,255,0.35)' }}>
                Degenerates
              </span>
              <span style={{ display: 'block', color: '#FF69B4', textShadow: '0 0 20px rgba(255,105,180,0.7), 0 0 40px rgba(255,105,180,0.35)' }}>
                Dashboard
              </span>
            </h3>
            <div style={{ width: '40px', height: '2px', background: '#E5E7EB', margin: '20px auto' }} />
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#FF69B4', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px', textShadow: '0 0 6px rgba(255,105,180,0.5)' }}>
              Fantasy League HR Department
            </p>
            <p style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(229,231,235,0.65)', fontFamily: 'var(--font-sans)', textAlign: 'center', lineHeight: 1.6, maxWidth: '220px', margin: '0 auto' }}>
              A weekly 12-leg parlay we have never hit. Tracks the picks, the votes, the rules, and the punishments.
            </p>
          </div>
        </div>

        {/* POSTER 3 - ROAR TRACKER */}
        <div
          className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
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
          <img src="/images/roar-tracker-mobile-1.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-26%', left: '-10%', width: '42%', transform: 'rotate(-8deg)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 12px 32px rgba(0,0,0,0.45)', zIndex: 2 }} />
          <img src="/images/roar-tracker-mobile-2.webp" alt="" loading="lazy" style={{ position: 'absolute', bottom: '-30%', right: '-12%', width: '46%', transform: 'rotate(7deg)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 12px 32px rgba(0,0,0,0.45)', zIndex: 2 }} />

          <div style={{ padding: '24px 28px 0', position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
              Detroit Lions
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', position: 'relative', zIndex: 3 }}>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.9rem, 4.8vw, 2.9rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Roar
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.9rem, 4.8vw, 2.9rem)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                Tracker
              </span>
            </div>
            <div style={{ width: '40px', height: '2px', background: '#FFFFFF', margin: '20px auto' }} />
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', color: '#FFFFFF', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '20px' }}>
              Season Ticket HQ
            </p>
            <p style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)', textAlign: 'center', lineHeight: 1.6, maxWidth: '220px', margin: '0 auto' }}>
              Six seats, two always open. Who&apos;s going, who paid, and the sale graphic when we list a pair.
            </p>
          </div>
        </div>

          </Fragment>
        ))}
      </div>

      {/* Carousel dots (mobile only, hidden on desktop via .poster-dots) */}
      <div className="poster-dots" style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: '24px 0 0',
        width: '100%',
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: activePosterId === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '100px',
              background: activePosterId === i ? 'var(--color-fg)' : 'var(--color-border)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Side-project sheet */}
      <ResponsiveSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="max-w-5xl"
        header={selected ? ({ collapsed }) => <ProjectSheetHeader project={sideProjects[selected]} collapsed={collapsed} /> : null}
      >
        <SheetPage name="main">
          {selected && <ProjectSheetBody project={sideProjects[selected]} />}
        </SheetPage>
      </ResponsiveSheet>
    </div>
  );
}

function ProjectSheetHeader({ project, collapsed = false }: { project: typeof sideProjects[SideProjectId]; collapsed?: boolean }) {
  const { theme, title, tagline } = project;
  return (
    <div style={{ background: theme.bg, padding: collapsed ? '14px 28px 12px' : '36px 28px 32px', position: 'relative', overflow: 'hidden', transition: 'padding 0.3s ease' }}>
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
          marginBottom: collapsed ? 0 : '14px',
          maxHeight: collapsed ? 0 : '20px',
          opacity: collapsed ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}>
          Personal Project
        </div>

        {title === 'Roar Tracker' ? (
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: collapsed ? 0 : '10px', transition: 'margin 0.3s ease' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: collapsed ? '1.4rem' : 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', transition: 'font-size 0.3s ease' }}>
              Roar
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: collapsed ? '1.4rem' : 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em', transition: 'font-size 0.3s ease' }}>
              Tracker
            </span>
          </div>
        ) : title === 'Degenerates Dashboard' ? (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: collapsed ? '1.2rem' : 'clamp(2rem, 5vw, 2.9rem)', lineHeight: 0.95, letterSpacing: '0.02em', textTransform: 'uppercase', paddingTop: '0.08em', marginBottom: collapsed ? 0 : '10px', transition: 'all 0.3s ease' }}>
            <span style={{ display: 'block', color: '#00D9FF', textShadow: '0 0 20px rgba(0,217,255,0.7), 0 0 40px rgba(0,217,255,0.35)' }}>
              Degenerates
            </span>
            <span style={{ display: 'block', color: '#FF69B4', textShadow: '0 0 20px rgba(255,105,180,0.7), 0 0 40px rgba(255,105,180,0.35)' }}>
              Dashboard
            </span>
          </h2>
        ) : (
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: collapsed ? '1.4rem' : 'clamp(2.4rem, 6vw, 3.5rem)', color: theme.fg, lineHeight: 1, letterSpacing: '-0.015em', textTransform: 'uppercase', paddingTop: '0.08em', marginBottom: collapsed ? 0 : '10px', transition: 'all 0.3s ease' }}>
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
          maxHeight: collapsed ? 0 : '60px',
          opacity: collapsed ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}>
          {tagline}
        </p>
      </div>
    </div>
  );
}

// Slide width follows from a capped image height so wide dashboard
// shots can't dominate the sheet (the next slide peeks in the gap).
const SHOT_MAX_HEIGHT = 'min(420px, 45dvh)';

function aspectRatioNumber(aspect?: string) {
  if (!aspect) return 1.6; // default 1600 / 1000
  const [w, h] = aspect.split('/').map((n) => parseFloat(n));
  return w > 0 && h > 0 ? w / h : 1.6;
}

function ScreenGallery({
  screens,
  bg,
}: {
  screens: NonNullable<typeof sideProjects[SideProjectId]['screens']>;
  bg: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track the slide closest to the track's center so the dots stay in
  // sync as the user scrolls or swipes, matching the work/story carousels.
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const r = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <div className="screen-gallery" style={{ marginBottom: '28px' }}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        style={{ display: 'flex', gap: '16px', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory', margin: '0 -28px', padding: '0 28px' }}
      >
        {screens.map((screen) => (
          <figure
            key={screen.desktop}
            className={screen.mobile ? 'screen-figure has-mobile' : 'screen-figure'}
            style={{
              flex: `0 0 min(92%, calc(${SHOT_MAX_HEIGHT} * ${aspectRatioNumber(screen.aspect)}))`,
              scrollSnapAlign: 'center',
              margin: 0,
            }}
          >
            <img
              src={screen.desktop}
              alt={screen.caption}
              loading="lazy"
              className="screen-shot-desktop"
              style={{ width: '100%', aspectRatio: screen.aspect ?? '1600 / 1000', border: '1px solid var(--color-border)', background: bg }}
            />
            {screen.mobile && (
              <img
                src={screen.mobile}
                alt={screen.caption}
                loading="lazy"
                className="screen-shot-mobile"
                style={{ aspectRatio: '1179 / 1977', border: '1px solid var(--color-border)', background: bg }}
              />
            )}
          </figure>
        ))}
      </div>

      {screens.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '20px 0 0' }}>
          {screens.map((screen, i) => (
            <div
              key={screen.desktop}
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '100px',
                background: active === i ? 'var(--color-fg)' : 'var(--color-border)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
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
