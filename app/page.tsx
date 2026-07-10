'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { ChurchHubMorph } from '@/components/ChurchHubMorph';
import { WoodsideMorph } from '@/components/WoodsideMorph';
import { lifeEvents, LifeEventSheet, type LifeEvent } from '@/components/LifeEventSheet';
import { SectionHeading, Em, Ul } from '@/components/SectionHeading';
import { SideLabel } from '@/components/SideLabel';
import { SquidMark } from '@/components/SquidMark';
import { InkBurst } from '@/components/InkBurst';
import { Footer } from '@/components/Footer';
import { ResponsiveSheet, SheetPage, useResponsiveSheet } from '@/components/ResponsiveSheet';
import { AIResearchSheet } from '@/components/AIResearchSheet';
import { PersonalProjectsPanel } from '@/components/PersonalProjectsPanel';

const roles = [
  'an AI pioneer',
  'a problem solver',
  'a UI/UX obsessive',
  'a full-stack developer',
  'a builder of tools',
  'a product thinker',
  'a leader',
  'a communicator',
];

interface ProjectGroup {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  storyPath: string;
  subItems: { id: string; title: string; description: string }[];
  poster: {
    bg: string;
    fg: string;
    accent: string;
    muted: string;
    border: string;
    tagline: string;
  };
}

const projects: ProjectGroup[] = [
  {
    id: 'church-hub',
    title: 'Church Hub',
    category: 'Developer Platform',
    description: 'What started as an internal tool at Woodside Bible Church grew into a platform churches own and build on. Church Hub is a modular Next.js system that centralizes operations, automates workflows, and lets churches build custom tools on top of their existing data: extend it in-house, hire a developer, or let AI build on top of it. I started a business around it, implementing it across multiple churches to solve real operational problems at scale.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL Server', 'Tailwind', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    storyPath: '/work/church-hub',
    subItems: [],
    poster: {
      bg: '#2D3B2D',
      fg: '#F5F2EB',
      accent: '#C8D5B9',
      muted: '#8A9A7B',
      border: '#4A5E4A',
      tagline: 'FROM INTERNAL TOOL TO FULL PRODUCT',
    },
  },
  {
    id: 'woodside',
    title: 'Woodside Bible Church',
    category: 'Full-Stack Development',
    description: 'As the sole in-house developer at Woodside Bible Church, I build and maintain the software infrastructure that powers the organization. From interactive dashboards and automated database workflows to public-facing web pages and reporting tools. This is where I cut my teeth building real products for real people.',
    tech: ['Next.js', 'React', 'SQL Server', 'Power BI', 'REST API', 'MinistryPlatform', 'WordPress', 'Planning Center', 'CSS/SCSS'],
    image: '/woodside.jpg',
    storyPath: '/work/woodside',
    poster: {
      bg: '#FAF5EF',
      fg: '#1A1A1A',
      accent: '#D94420',
      muted: '#8C7A6B',
      border: '#D4C5B5',
      tagline: 'SOLE DEVELOPER · FULL STACK · REAL IMPACT',
    },
    subItems: [
      {
        id: 'woodside-insights',
        title: 'Dynamic Insights',
        description: 'Extended a static reporting platform into interactive dashboards with custom embedded widgets. Created a nested JSON framework for optimized data retrieval. This innovation inspired new features in MinistryPlatform\'s main product and became a development model across partner organizations.',
      },
      {
        id: 'woodside-web',
        title: 'Web Pages & Platforms',
        description: 'Built and maintained multiple public-facing and internal web pages and applications for Woodside Bible Church. Clean, responsive interfaces serving thousands of users every week across multiple campuses.',
      },
      {
        id: 'woodside-db',
        title: 'Database Automations',
        description: 'Designed and implemented automated database workflows that replaced manual processes. Cleaned up and deactivated roughly two-thirds of the database, then built better systems to track real engagement. Some of this work was adopted into MinistryPlatform\'s core product.',
      },
      {
        id: 'woodside-powerbi',
        title: 'Power BI Reporting',
        description: 'Created Power BI dashboards and reports for leadership and staff, turning raw data into clear, actionable visuals. Gave teams across the organization easy access to the metrics that actually matter.',
      },
      {
        id: 'woodside-integrations',
        title: 'Third-Party Integrations',
        description: 'Built and facilitated integrations of platforms like REACH and Planning Center into MinistryPlatform. Syncing data, eliminating manual entry, and keeping systems connected across the organization.',
      },
    ],
  },
  {
    id: 'personal',
    title: 'Personal Projects',
    category: 'Side Projects',
    description: 'The stuff I build for fun (and sometimes for my friends and family). These are less polished, more personality.',
    tech: ['Next.js', 'Neon', 'Drizzle', 'OAuth', 'Tailwind', 'Playwright', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=600&fit=crop',
    storyPath: '/work/personal-projects',
    poster: {
      bg: '#1A1F2E',
      fg: '#F5F2EB',
      accent: '#D4A855',
      muted: '#7A8599',
      border: '#2E3548',
      tagline: 'BUILT FOR FUN · SHIPPED FOR REAL',
    },
    subItems: [
      {
        id: 'personal-dynastly',
        title: 'Dynastly',
        description: 'I play dynasty fantasy football and got tired of bouncing between five tools to evaluate my team, see how I stack up against the league, and build trades. Sites like KeepTradeCut only handle 1-for-1 deals, and most league platforms don’t expose the APIs I needed. So I built Dynastly: pulls player valuations from a few sources, mirrors my league’s rosters and matchups, and lets me build realistic multi-team trades on a single canvas. Ships with a companion browser extension to pull data the public APIs won’t. Along the way I found a serious bug in one of the big fantasy platforms, which I’m reporting to them, not shipping.',
      },
      {
        id: 'personal-degenerates',
        title: 'Degenerates Dashboard',
        description: 'Every week, my idiot friends and I place a 12-leg parlay. We have never won. Not once. But we keep doing it, and I built a dashboard to track our glorious losing streak. It pulls in picks, tracks results, and roasts us with the data. It\'s dumb, it\'s fun, and it\'s one of my favorite things I\'ve built.',
      },
      {
        id: 'personal-lions',
        title: 'RoarTracker',
        description: 'My parents, my wife, and I split six Lions season tickets between the four of us, so every game comes with at least two open seats. RoarTracker keeps it straight: who\'s going, who paid, what we\'ve made back selling extras, and it generates the social graphic when we list a pair. Under the hood it\'s got full OAuth, a Supabase database, and clean dashboards. A real solution to a very niche problem.',
      },
    ],
  },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [sheetDefaultPage, setSheetDefaultPage] = useState<string>('main');
  const [selectedProject, setSelectedProject] = useState<ProjectGroup | null>(null);
  const [personalView, setPersonalView] = useState(false);
  const [inkPos, setInkPos] = useState<{ x: number; y: number } | null>(null);
  const [squidSwim, setSquidSwim] = useState(false);
  const [aiSheetOpen, setAiSheetOpen] = useState(false);
  const [chMorph, setChMorph] = useState<{ x: number; y: number } | null>(null);
  const [wsMorph, setWsMorph] = useState<{ x: number; y: number } | null>(null);
  const router = useRouter();
  const squidRef = useRef<HTMLSpanElement>(null);

  // Church Hub skips the sheet: clicking its poster (or the hero stamp)
  // plays the marble/hub open transition, then routes to the branded page.
  const openChurchHub = useCallback((e?: { clientX: number; clientY: number }) => {
    if (typeof window === 'undefined') {
      router.push('/work/church-hub');
      return;
    }
    setChMorph({
      x: e?.clientX ?? window.innerWidth / 2,
      y: e?.clientY ?? window.innerHeight / 2,
    });
  }, [router]);

  // Woodside gets the same treatment with its own branded transition.
  const openWoodside = useCallback((e?: { clientX: number; clientY: number }) => {
    if (typeof window === 'undefined') {
      router.push('/work/woodside');
      return;
    }
    setWsMorph({
      x: e?.clientX ?? window.innerWidth / 2,
      y: e?.clientY ?? window.innerHeight / 2,
    });
  }, [router]);

  // Back-to-Work: the squid squirts a little ink where it sits and jets
  // off to the left (the way it faces) while the rest of the view slides
  // right. The ink is a viewport-fixed overlay so it plays its full burst
  // without being clipped by, or sliding away with, the poster wrapper.
  const inkAndGoBack = useCallback(() => {
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && squidRef.current) {
      const r = squidRef.current.getBoundingClientRect();
      setInkPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      setSquidSwim(true);
      window.setTimeout(() => setInkPos(null), 650);
      window.setTimeout(() => setSquidSwim(false), 500);
    }
    setPersonalView(false);
  }, []);

  const scrollToWork = useCallback(() => {
    const el = document.getElementById('work');
    const main = mainRef.current;
    if (el && main) {
      const top = el.offsetTop - main.offsetTop;
      main.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);
  const [activePosterId, setActivePosterId] = useState(0);
  const storyCarouselRef = useRef<HTMLDivElement>(null);
  const [activeStoryId, setActiveStoryId] = useState(0);

  // Infinite carousel loop logic + active dot tracking. Attached via a
  // callback ref so it re-initialises whenever the poster grid remounts
  // (e.g. returning from the Personal Projects view).
  const attachCarousel = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / 3; // 3 sets of cards
      if (el.scrollLeft >= cardWidth * 2) {
        el.scrollLeft -= cardWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += cardWidth;
      }
      const posInSet = el.scrollLeft % cardWidth;
      const singleCardWidth = cardWidth / 3;
      const idx = Math.round(posInSet / singleCardWidth) % 3;
      setActivePosterId(idx);
    };
    el.addEventListener('scroll', handleScroll);
    // Start at the middle set
    const raf = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Story cards carousel logic
  useEffect(() => {
    const el = storyCarouselRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= cardWidth * 2) {
        el.scrollLeft -= cardWidth;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += cardWidth;
      }
      const posInSet = el.scrollLeft % cardWidth;
      const singleCardWidth = cardWidth / lifeEvents.length;
      const idx = Math.round(posInSet / singleCardWidth) % lifeEvents.length;
      setActiveStoryId(idx);
    };
    el.addEventListener('scroll', handleScroll);
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const checkScroll = useCallback(() => {
    const el = mainRef.current;
    if (!el) return;
    const hasMore = el.scrollHeight > el.clientHeight + 20;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;
    setShowScrollIndicator(hasMore && !nearBottom);
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    checkScroll();
    const timers = [setTimeout(checkScroll, 150), setTimeout(checkScroll, 500)];
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => {
      timers.forEach(clearTimeout);
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const stampButtons = [
    {
      label: 'AI Researcher',
      sub: '· Published, 2017 ·',
      ariaLabel: 'See the AI research publication',
      onClick: () => setAiSheetOpen(true),
    },
    {
      label: 'Product Engineer',
      sub: '· Since 2019 ·',
      ariaLabel: 'Jump to Things I’ve Built',
      onClick: scrollToWork,
    },
    {
      label: 'Founder',
      sub: '· Church Hub ·',
      ariaLabel: 'Open Church Hub project',
      onClick: (e: { clientX: number; clientY: number }) => openChurchHub(e),
    },
  ].map((stamp) => (
    <button
      key={stamp.label}
      type="button"
      onClick={stamp.onClick}
      aria-label={stamp.ariaLabel}
      style={{
        border: '2px solid var(--color-accent)',
        borderRadius: '3px',
        padding: '8px 14px 6px',
        fontFamily: 'var(--font-display)',
        color: 'var(--color-accent)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        lineHeight: 1.05,
        textAlign: 'center',
        background: 'transparent',
        cursor: 'pointer',
        transition: 'background 0.18s ease, transform 0.18s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(217, 68, 32, 0.08)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ fontSize: 'clamp(0.95rem, 1.15vw, 1.1rem)', whiteSpace: 'nowrap' }}>
        {stamp.label}
      </div>
      <div
        style={{
          fontSize: '9px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          marginTop: '5px',
          paddingTop: '4px',
          borderTop: '1px solid var(--color-accent)',
          whiteSpace: 'nowrap',
        }}
      >
        {stamp.sub}
      </div>
    </button>
  ));

  return (
    <div className="h-screen bg-bg overflow-hidden relative">
      {/* ── Main content ── single scrollable area */}
      <main ref={mainRef} className="h-full overflow-y-auto overflow-x-hidden relative" style={{ paddingBottom: '0' }}>
        {/* Hero section */}
        <section className="min-h-dvh md:h-screen flex items-stretch" style={{ padding: '0 24px' }}>
          <SideLabel label="Full-stack developer" endLabel="Detroit, MI" side="left" padTop="64px" padBottom="5dvh" />
          <div className="flex-1 flex items-center">
          <div className="flex items-center gap-10 w-full max-md:flex-col max-md:gap-6 max-md:pt-20 max-md:pb-14">
            {/* Text side. Full width on mobile: the column layout's
                items-center would otherwise shrink-wrap this block and
                re-center it every time the rotating role changes width. */}
            <div className="flex-1 flex flex-col justify-center gap-6 min-w-0 max-md:w-full">
              <div className="z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-[clamp(8rem,16vw,16rem)] max-md:text-[clamp(5rem,24vw,8rem)] leading-[0.85] tracking-[-0.04em] mb-5 uppercase"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
                >
                  Hello
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-[clamp(1.1rem,1.8vw,1.4rem)] tracking-[0.01em]"
                  style={{ marginLeft: '20px', fontFamily: 'var(--font-serif)', color: 'var(--color-fg)' }}
                >
                  <span style={{ fontWeight: 400 }}>I{"'"}m Colton,</span>
                  <div className="relative overflow-hidden h-[1.5em] pb-[4px] mb-[-4px]" style={{ height: 'calc(1.5em + 4px)' }}>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roleIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{
                          y: { type: 'spring', stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        className="block"
                        style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-accent)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '2px' }}
                      >
                        {roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="max-md:hidden flex flex-wrap items-start"
                  style={{ gap: '18px', marginLeft: '20px', marginTop: '34px' }}
                >
                  {stampButtons}
                </motion.div>
              </div>

            </div>

            {/* Photo side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="w-[50%] max-md:w-full max-md:h-[45vh] md:h-[90dvh] shrink-0"
            >
              <img
                src="/Portfoliov1.jpg"
                alt="Colton Wirgau"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Stamps overlap the photo's bottom edge on mobile (the
                -mt-12 minus the column's gap-6 nets ~24px of overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hero-stamps-mobile md:hidden relative z-10 -mt-12 flex w-full flex-wrap justify-center gap-3"
            >
              {stampButtons}
            </motion.div>
          </div>
          </div>
        </section>

        {/* Portfolio section */}
        <section id="work" style={{ padding: '80px 24px', display: 'flex', position: 'relative' }}>
          {/* Decorative squid watermark */}
          <svg
            viewBox="0 0 341.34 852.51"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="max-md:hidden"
            style={{
              position: 'absolute',
              left: '15%',
              top: '-80px',
              width: '250px',
              opacity: 0.04,
              pointerEvents: 'none',
              transform: 'rotate(-70deg)',
              transformOrigin: 'center',
            }}
          >
            <path fill="var(--color-fg)" d="M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z" />
          </svg>

          <div className="poster-grid-wrapper" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
            <div style={{ marginBottom: '48px' }}>
              <AnimatePresence mode="wait" initial={false}>
                {personalView ? (
                  <motion.div
                    key="head-personal"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ position: 'relative' }}
                  >
                    <SectionHeading
                      title={<>Personal Projects.</>}
                      subtitle={<>The stuff I build for fun, and sometimes for <Em>friends &amp; family</Em>. Less polished, more personality.</>}
                      right
                      className="pp-heading"
                    />
                    <button
                      type="button"
                      onClick={inkAndGoBack}
                      aria-label="Back to Work"
                      className="pp-back"
                      style={{
                        position: 'absolute', left: '12px', bottom: '4px',
                        display: 'inline-flex', alignItems: 'center', gap: '14px',
                        background: 'transparent', border: 'none', padding: 0,
                        color: 'var(--color-accent)', cursor: 'pointer',
                      }}
                    >
                      <span
                        ref={squidRef}
                        className="pp-back-squid"
                        style={{
                          display: 'inline-flex', flexShrink: 0,
                          transition: 'transform 0.2s ease',
                          // Hidden instantly on click; the fixed overlay squid
                          // takes over and swims left (unclipped).
                          opacity: squidSwim ? 0 : 1,
                        }}
                      >
                        <SquidMark direction="left" height={34} style={{ display: 'block' }} />
                      </span>
                      <span className="pp-back-label" style={{
                        fontFamily: 'var(--font-display)', fontWeight: 400,
                        fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
                        textTransform: 'uppercase', letterSpacing: '-0.01em',
                        lineHeight: 1, color: 'var(--color-accent)',
                      }}>
                        Back
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="head-main"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <SectionHeading
                      title={<>Things I{"\u2019"}ve built.</>}
                      subtitle={<><Em>Full-stack platforms</Em>, <Ul>developer tools</Ul>, and side projects. Here{"\u2019"}s some of what I{"\u2019"}ve been working on.</>}
                      right
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
            {personalView ? (
              <motion.div
                key="personal"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <PersonalProjectsPanel />
              </motion.div>
            ) : (
              <motion.div
                key="main"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
            {/* Project posters - responsive grid, 2-up on desktop */}
            <div className="poster-grid" ref={attachCarousel}>
              {[0, 1, 2].map((setIndex) => (
                <Fragment key={`poster-set-${setIndex}`}>

              {/* ═══════════════════════════════════════════════
                  POSTER 1 - CHURCH HUB
                  Clean, warm style matching Personal Projects feel
                  ═══════════════════════════════════════════════ */}
              <div
                className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
                onClick={(e) => openChurchHub(e)}
                style={{
                  background: '#EDE8E0',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  containerType: 'inline-size',
                  aspectRatio: '2/3',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Subtle marble background */}
                <div style={{
                  position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1,
                }}>
                  <img
                    src="/marble.jpg"
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.165,
                      filter: 'saturate(0)',
                    }}
                  />
                </div>

                {/* Giant centered title */}
                <div style={{
                  padding: '16px 28px 0',
                  position: 'relative',
                  zIndex: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <h3 style={{
                    fontSize: 'clamp(2.25rem, 19cqw, 6rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: '#7BA3C9',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    Church
                  </h3>
                  <h3 style={{
                    fontSize: 'clamp(2.25rem, 19cqw, 6rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    color: '#7BA3C9',
                    lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    marginTop: '8px',
                    textAlign: 'center',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    Hub
                  </h3>

                  {/* Subtitle */}
                  <p style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#8C8474',
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase',
                    marginTop: '24px',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}>
                    A DEVELOPER PLATFORM FOR CHURCHES<br />
                    TO BUILD CUSTOM SOLUTIONS
                  </p>
                </div>

              </div>

              {/* ═══════════════════════════════════════════════
                  POSTER 2 - WOODSIDE BIBLE CHURCH (Dark Navy/Green)
                  ═══════════════════════════════════════════════ */}
              <div
                className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
                onClick={(e) => openWoodside(e)}
                style={{
                  background: '#1C2B39',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  containerType: 'inline-size',
                  aspectRatio: '2/3',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {/* Church background pinned to bottom with fade */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  overflow: 'hidden',
                  zIndex: 1,
                }}>
                  <img
                    src="/woodside.jpg"
                    alt=""
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      filter: 'grayscale(1)',
                      opacity: 0.15,
                    }}
                  />
                  {/* Fade from top */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #1C2B39 0%, transparent 35%)',
                  }} />
                </div>

                {/* Three crosses - middle one larger */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  gap: '24px',
                  padding: '12px 28px 16px',
                  position: 'relative',
                  zIndex: 3,
                }}>
                  <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
                    <rect x="8.5" y="0" width="5" height="30" fill="#62BB46" />
                    <rect x="0" y="7" width="22" height="5" fill="#62BB46" />
                  </svg>
                  <svg width="30" height="42" viewBox="0 0 30 42" fill="none">
                    <rect x="11" y="0" width="7" height="42" fill="#62BB46" />
                    <rect x="0" y="10" width="30" height="7" fill="#62BB46" />
                  </svg>
                  <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
                    <rect x="8.5" y="0" width="5" height="30" fill="#62BB46" />
                    <rect x="0" y="7" width="22" height="5" fill="#62BB46" />
                  </svg>
                </div>

                {/* Centered title - Montserrat */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '0 28px',
                  position: 'relative',
                  zIndex: 3,
                }}>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 13cqw, 3.2rem)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    color: '#C0C8D0',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    WOODSIDE
                  </h3>
                  <h4 style={{
                    fontSize: 'clamp(0.8rem, 8cqw, 1.8rem)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    color: '#8A95A5',
                    lineHeight: 1,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginTop: '12px',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    BIBLE CHURCH
                  </h4>
                </div>

              </div>

              {/* ═══════════════════════════════════════════════
                  POSTER 3 - PERSONAL PROJECTS (Dark Navy/Gold)
                  More playful, experimental feel
                  ═══════════════════════════════════════════════ */}
              <div
                className={`group poster-card ${setIndex > 0 ? 'poster-card-dup' : ''}`}
                onClick={() => setPersonalView(true)}
                style={{
                  background: '#7B6DB5',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  containerType: 'inline-size',
                  aspectRatio: '2/3',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Background mountain image with purple duotone */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '75%',
                  overflow: 'hidden',
                  zIndex: 1,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=1200&fit=crop"
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: 'saturate(0) contrast(1.4) brightness(0.25)',
                      opacity: 0.7,
                    }}
                  />
                  {/* Purple tint overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#7B6DB5',
                    mixBlendMode: 'color',
                  }} />
                  {/* Fade from top */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, #7B6DB5 0%, #7B6DB5cc 25%, transparent 55%)',
                  }} />
                </div>

                {/* Texture grain overlay */}
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.06,
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'repeat', backgroundSize: '256px 256px', pointerEvents: 'none', zIndex: 2,
                }} />

                {/* Giant title - pink on periwinkle */}
                <div style={{
                  padding: '16px 28px 0',
                  position: 'relative',
                  zIndex: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 17cqw, 5.5rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: '#E8899F',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    Personal
                  </h3>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 17cqw, 5.5rem)',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: '#E8899F',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    marginTop: '8px',
                    textAlign: 'center',
                    transform: 'scaleY(1.2)',
                    transformOrigin: 'center',
                  }}>
                    Projects
                  </h3>

                  {/* Subtitle */}
                  <p style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#C4B8E8',
                    fontFamily: 'var(--font-sans)',
                    textTransform: 'uppercase',
                    marginTop: '20px',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}>
                    THE STUFF I BUILD FOR FUN<br />
                    AND SOMETIMES FOR FRIENDS & FAMILY
                  </p>
                </div>

              </div>
              </Fragment>
              ))}
            </div>

            {/* Carousel dot indicators - only visible in carousel mode */}
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
              </motion.div>
            )}
            </AnimatePresence>

          </div>
          <SideLabel label="Work" side="right" mirrorLabel />
        </section>

        {/* My Story / About section */}
        <section id="about" style={{ padding: '80px 24px', display: 'flex', position: 'relative' }}>
          <SideLabel label="About" side="left" delay={0.3} mirrorLabel />
          <div className="story-grid-wrapper" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>

            {/* Editorial heading */}
            <div style={{ marginBottom: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                color: 'var(--color-accent)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                paddingTop: '0.08em',
              }}>
                My Story.
              </h2>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-fg)',
                lineHeight: 1.6,
                maxWidth: '1100px',
                marginBottom: '20px',
              }}>
                I{'\u2019'}ve always been interested in how things work, and how to{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>make them work better</span>.
              </p>
              <p style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                maxWidth: '1100px',
              }}>
                I grew up in Algonac, Michigan, and was an IB student, football captain, track Hall of Famer. At the University of Detroit Mercy I studied software engineering and leadership, ran Division I track, and got published in AI research before the current wave existed. Then I landed at Woodside Bible Church, where I built the software infrastructure that became the foundation for Church Hub and much of Woodside{'\u2019'}s technology. Now I build products, lead teams, and obsess over making complex things feel simple.
              </p>

            </div>

            {/* Decorative squid divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '48px',
              maxWidth: '300px',
              margin: '0 auto 48px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <svg width="12" height="28" viewBox="0 0 341.34 852.51" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.15 }}>
                <path fill="var(--color-fg)" d="M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z" />
              </svg>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            {/* Portrait cards row / carousel */}
            <div className="story-grid" ref={storyCarouselRef} style={{ marginBottom: '60px' }}>
              {[0, 1, 2].map((setIndex) => (
                <Fragment key={setIndex}>
                  {lifeEvents.map((event) => (
                    <motion.button
                      key={`${setIndex}-${event.id}`}
                      layoutId={setIndex === 0 ? `card-${event.id}` : undefined}
                      onClick={() => {
                        setSelectedEvent(event);
                        setSheetDefaultPage('main');
                      }}
                      className={`group story-card ${setIndex > 0 ? 'story-card-dup' : ''}`}
                      style={{
                        position: 'relative',
                        aspectRatio: '2/3',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        textAlign: 'left',
                        borderRadius: 0,
                        border: 'none',
                      }}
                    >
                      <motion.img
                        layoutId={setIndex === 0 ? `img-${event.id}` : undefined}
                        src={event.image}
                        alt={event.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                      }} />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px 20px',
                      }}>
                        <h3 style={{ fontSize: '22px', fontWeight: 400, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                          {event.year}
                        </h3>
                      </div>
                    </motion.button>
                  ))}
                </Fragment>
              ))}
            </div>
            {/* Story carousel dot indicators */}
            <div className="story-dots" style={{
              gap: '8px',
              marginBottom: '40px',
            }}>
              {lifeEvents.map((event, i) => (
                <div key={event.id} style={{
                  height: '8px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  width: activeStoryId === i ? '24px' : '8px',
                  background: activeStoryId === i ? 'var(--color-fg)' : 'var(--color-border)',
                }} />
              ))}
            </div>

          </div>
        </section>

        {/* Life event sheet */}
        <LifeEventSheet
          event={selectedEvent}
          onClose={() => { setSelectedEvent(null); setSheetDefaultPage('main'); }}
          defaultPage={sheetDefaultPage}
          onOpenAIResearch={() => { setSelectedEvent(null); setSheetDefaultPage('main'); setAiSheetOpen(true); }}
        />

        {/* AI research sheet */}
        <AIResearchSheet open={aiSheetOpen} onClose={() => setAiSheetOpen(false)} />

        {/* Church Hub open transition (marble wipe + hub-and-spoke), then route. */}
        {chMorph && (
          <ChurchHubMorph origin={chMorph} onComplete={() => router.push('/work/church-hub')} />
        )}

        {/* Woodside open transition (navy wipe + green sonar rings), then route. */}
        {wsMorph && (
          <WoodsideMorph origin={wsMorph} onComplete={() => router.push('/work/woodside')} />
        )}

        {/* Squid ink burst + the squid jetting left (fired by the
            Personal Projects "Back" control). Both are viewport-fixed so
            the squid can swim left unclipped while the view slides right. */}
        <AnimatePresence>
          {inkPos && [
            <motion.span
              key="squid-ink"
              aria-hidden
              initial={{ scale: 0.25, opacity: 0.85 }}
              animate={{ scale: 1.75, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'fixed', left: inkPos.x, top: inkPos.y, x: '-50%', y: '-50%',
                transformOrigin: 'center', pointerEvents: 'none', lineHeight: 0, zIndex: 60,
              }}
            >
              <InkBurst width={140} />
            </motion.span>,
            <motion.span
              key="squid-swim"
              aria-hidden
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: -150, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{
                position: 'fixed', left: inkPos.x - 42, top: inkPos.y - 17,
                pointerEvents: 'none', lineHeight: 0, zIndex: 61,
              }}
            >
              <SquidMark direction="left" height={34} style={{ display: 'block' }} />
            </motion.span>,
          ]}
        </AnimatePresence>

        {/* Project sheet */}
        <ResponsiveSheet
          open={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          header={selectedProject ? (({ collapsed }) => {
            const p = selectedProject.poster;
            const isChurchHub = selectedProject.id === 'church-hub';
            const isWoodside = selectedProject.id === 'woodside';
            const isPersonal = selectedProject.id === 'personal';
            return (
              <div style={{ background: isWoodside ? '#1C2B39' : isPersonal ? '#7B6DB5' : '#EDE8E0', position: 'relative', overflow: 'hidden' }}>
                {/* Background image */}
                {isChurchHub && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="/marble.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.165, filter: 'saturate(0)' }} />
                  </div>
                )}
                {isWoodside && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="/woodside.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'grayscale(1)' }} />
                  </div>
                )}
                {isPersonal && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=600&fit=crop" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{ position: 'absolute', inset: 0, background: '#7B6DB5', mixBlendMode: 'multiply' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #7B6DB5 0%, transparent 50%)' }} />
                  </div>
                )}
                <div style={{ position: 'relative', zIndex: 1, padding: collapsed ? '14px 28px 12px' : '40px 28px 28px', transition: 'padding 0.3s ease' }}>
                  <div style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    marginBottom: collapsed ? 0 : '8px',
                    maxHeight: collapsed ? 0 : '20px',
                    opacity: collapsed ? 0 : 1,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    color: isWoodside ? '#8A95A5' : isPersonal ? 'rgba(255,255,255,0.5)' : '#9B8F80',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                  }} className="uppercase">
                    {selectedProject.category}
                  </div>
                  <h3 style={{
                    fontSize: collapsed ? '20px' : '32px',
                    transition: 'font-size 0.3s ease',
                    fontWeight: isWoodside ? 900 : 400,
                    letterSpacing: isWoodside ? '0.04em' : '-0.02em',
                    lineHeight: 1.1,
                    color: isWoodside ? '#C0C8D0' : isPersonal ? '#E8899F' : '#7BA3C9',
                    fontFamily: isWoodside ? 'var(--font-sans)' : 'var(--font-serif)',
                    fontStyle: isChurchHub ? 'italic' : 'normal',
                    textTransform: isWoodside ? 'uppercase' : 'none',
                  }}>
                    {selectedProject.title}
                  </h3>
                </div>
              </div>
            );
          }) : undefined}
          panelStyle={selectedProject ? {
            background: selectedProject.id === 'woodside' ? '#1C2B39' : selectedProject.id === 'personal' ? '#7B6DB5' : '#EDE8E0',
          } : undefined}
          scrollBg={selectedProject ? (selectedProject.id === 'woodside' ? '#1C2B39' : selectedProject.id === 'personal' ? '#7B6DB5' : '#EDE8E0') : undefined}
          defaultPage="main"
        >
          <SheetPage name="main">
            {selectedProject && (() => {
              const p = selectedProject.poster;
              const isWoodside = selectedProject.id === 'woodside';
              const isPersonal = selectedProject.id === 'personal';
              const isChurchHub = selectedProject.id === 'church-hub';
              const bg = isWoodside ? '#1C2B39' : isPersonal ? '#7B6DB5' : '#EDE8E0';
              const fg = isWoodside ? '#C0C8D0' : isPersonal ? '#F5F0EB' : '#44413B';
              const muted = isWoodside ? '#8A95A5' : isPersonal ? 'rgba(255,255,255,0.6)' : '#9B8F80';
              const border = isWoodside ? '#2E3E4E' : isPersonal ? 'rgba(255,255,255,0.15)' : '#C8BDB0';
              const accent = isWoodside ? '#62BB46' : isPersonal ? '#E8899F' : '#7BA3C9';
              return (
                <div style={{ padding: '28px', background: bg, minHeight: '300px' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: muted }}>
                    {selectedProject.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px' }}>
                    {selectedProject.tech.map((t) => (
                      <span key={t} style={{ fontSize: '11px', fontWeight: 400, color: muted, padding: '4px 10px', borderRadius: '100px', border: `1px solid ${border}` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights / sub-items as bullet points */}
                  {selectedProject.subItems.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '12px', color: muted }} className="uppercase">
                        Highlights
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedProject.subItems.map((sub) => (
                          <div key={sub.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{ color: accent, marginTop: '6px', flexShrink: 0, fontSize: '6px' }}>●</span>
                            <div>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: fg }}>{sub.title}</span>
                              <span style={{ fontSize: '13px', color: muted }}>: {sub.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* The Full Story link */}
                  <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: `1px solid ${border}` }}>
                    <Link
                      href={selectedProject.storyPath}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        textDecoration: 'none',
                        padding: '14px 12px',
                        margin: '0 -12px',
                        borderRadius: '10px',
                        transition: 'background 0.15s',
                        background: isWoodside || isPersonal ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = isWoodside || isPersonal ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = isWoodside || isPersonal ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)')}
                    >
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: fg, flex: 1 }}>
                        The Full Story
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })()}
          </SheetPage>
        </ResponsiveSheet>

        <Footer />
      </main>

      {/* Scroll indicator - inside the outer container, behind main's scroll */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none flex max-md:hidden"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 5,
              height: '48px',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', color: 'var(--color-muted)', padding: '10px 20px', borderRadius: '100px', backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)', backgroundColor: 'rgba(213, 210, 200, 0.6)', boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }}>
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '-2px' }}
              >
                <svg width="10" height="14" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="M6 5l6 6 6-6" />
                  <path d="M6 17l6 6 6-6" />
                </svg>
              </motion.div>
              <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Scroll for more
              </span>
              <motion.div
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <svg width="10" height="14" viewBox="0 0 24 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                  <path d="M6 5l6 6 6-6" />
                  <path d="M6 17l6 6 6-6" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
