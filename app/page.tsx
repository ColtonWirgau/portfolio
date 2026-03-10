'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { lifeEvents, LifeEventSheet, type LifeEvent } from '@/components/LifeEventSheet';
import { SectionHeading } from '@/components/SectionHeading';
import { SideLabel } from '@/components/SideLabel';

const roles = [
  'a problem solver',
  'a UI/UX obsessive',
  'a full-stack developer',
  'a builder of tools',
  'a product thinker',
];

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

const projects = [
  {
    id: 'church-hub',
    title: 'Church Hub',
    category: 'SaaS Platform',
    description: 'What started as an internal tool at Woodside Bible Church evolved into a full SaaS product. Church Hub is a modular Next.js platform that helps churches centralize operations, automate workflows, and build custom tools on top of their existing data. I started a business around it — implementing it across multiple churches to solve real operational problems at scale.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL Server', 'Tailwind', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: 'dynamic-insights',
    title: 'Dynamic Insights',
    category: 'Dashboard Framework',
    description: 'Extended a static reporting platform into interactive dashboards with custom embedded widgets. Created a nested JSON framework for optimized data retrieval — this innovation inspired new features in the platform and became a development model across partner organizations.',
    tech: ['React', 'Next.js', 'JSON', 'SQL', 'REST API'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 'mp-next',
    title: 'MP Next',
    category: 'Open Source',
    description: 'An open-source Next.js template for MinistryPlatform API integration. Provides authentication flows, data fetching patterns, and UI components — enabling other organizations to build modern web apps on top of the platform.',
    tech: ['Next.js', 'TypeScript', 'OAuth', 'REST', 'Open Source'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  },
  {
    id: 'roar-tracker',
    title: 'RoarTracker',
    category: 'Personal Project',
    description: 'A personal app to manage Detroit Lions season tickets — track attendance, resale, and spending data with intuitive dashboards and mobile-first UI.',
    tech: ['Next.js', 'PostgreSQL', 'Supabase', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=600&fit=crop',
  },
];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);
  const [sheetDefaultPage, setSheetDefaultPage] = useState<string>('main');

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
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    setShowScrollIndicator(hasMore && !atBottom);
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

  return (
    <div className="h-screen bg-bg overflow-hidden relative">
      {/* ── Header ── spans full width, sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between" style={{ padding: '0 24px', backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)', backgroundColor: 'rgba(232, 232, 232, 0.6)' }}>
        {/* Logo + nav links */}
        <div className="flex items-center gap-8">
          <a href="#" onClick={(e) => { e.preventDefault(); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" className="text-fg">
              <path d="M6 4L10 12L6 14L10 18L16 26L22 18L26 14L22 12L26 4L20 10L16 6L12 10Z" />
              <path d="M13 15L16 20L19 15Z" fill="var(--color-bg)" />
              <circle cx="12" cy="12" r="1.2" fill="var(--color-bg)" />
              <circle cx="20" cy="12" r="1.2" fill="var(--color-bg)" />
            </svg>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.replace('#', '');
                  const el = document.getElementById(id);
                  if (el && mainRef.current) {
                    const top = el.offsetTop - mainRef.current.offsetTop;
                    mainRef.current.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                className="text-[13px] text-muted hover:text-fg transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('contact');
            if (el && mainRef.current) {
              const top = el.offsetTop - mainRef.current.offsetTop;
              mainRef.current.scrollTo({ top, behavior: 'smooth' });
            }
          }}
          className="text-[13px] font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          <span className="underline underline-offset-4 uppercase tracking-wider">Contact</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </nav>

      {/* ── Main content ── single scrollable area */}
      <main ref={mainRef} className="h-full overflow-y-auto relative" style={{ paddingBottom: '80px' }}>
        {/* Hero section */}
        <section className="h-screen flex items-stretch" style={{ padding: '0 24px' }}>
          <SideLabel label="Full-stack developer" endLabel="2026" side="left" />
          <div className="flex-1 flex items-center">
          <div className="flex items-center gap-10 w-full max-md:flex-col max-md:gap-6">
            {/* Text side */}
            <div className="flex-1 flex flex-col justify-center gap-6 min-w-0">
              <div className="z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-[clamp(5rem,10vw,11rem)] font-[200] leading-[0.85] tracking-tight mb-5"
                >
                  Hello
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-muted text-[clamp(1rem,1.5vw,1.25rem)] font-light tracking-[0.03em]"
                  style={{ marginLeft: '20px' }}
                >
                  <span>I{"'"}m Colton,</span>
                  <div className="relative overflow-hidden h-[1.5em]">
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
                      >
                        {roles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Photo side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="w-[50%] max-md:w-full max-md:h-[50vh] shrink-0"
              style={{ height: '90dvh' }}
            >
              <img
                src="/Portfoliov1.jpg"
                alt="Colton Wirgau"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>
          </div>
        </section>

        {/* Portfolio section */}
        <section id="work" style={{ padding: '80px 24px', display: 'flex' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: '48px' }}>
              <SectionHeading
                title={<>Things I{"\u2019"}ve<br />built.</>}
                subtitle="Full-stack platforms, developer tools, and side projects — here's some of what I've been working on."
              />
            </div>

            {/* Project grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {projects.map((project, index) => {
                const imageLeft = index % 2 === 0;
                return (
                  <div
                    key={project.id}
                    className="group"
                    style={{
                      display: 'flex',
                      flexDirection: imageLeft ? 'row' : 'row-reverse',
                      gap: '40px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: '50%',
                        flexShrink: 0,
                        aspectRatio: '4/3',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'var(--color-card)',
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-[1.03]"
                      />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '8px' }}>
                        {project.category}
                      </div>
                      <h3 style={{
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        fontWeight: 300,
                        color: 'var(--color-fg)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.02em',
                        marginBottom: '12px',
                      }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '11px',
                              fontWeight: 400,
                              color: 'var(--color-muted)',
                              padding: '4px 10px',
                              borderRadius: '100px',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <SideLabel label="Work" side="right" mirrorLabel />
        </section>

        {/* About section */}
        <section id="about" style={{ padding: '80px 24px', display: 'flex', position: 'relative', minHeight: '100vh' }}>
          <SideLabel label="About" side="left" delay={0.3} mirrorLabel />
          {/* Main content area */}
          <div style={{ flex: 1, minWidth: 0 }}>

          <div style={{ marginBottom: '48px' }}>
            <SectionHeading
              title={<>Michigan born,<br />product obsessed.</>}
              subtitle="Full-stack developer, musician, and lifelong sports fan based in Southeast Michigan. I build tools that make complexity feel simple."
            />
          </div>

          {/* Portrait cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${lifeEvents.length}, 1fr)`, gap: '16px' }}>
            {lifeEvents.map((event) => (
              <motion.button
                key={event.id}
                layoutId={`card-${event.id}`}
                onClick={() => {
                  setSelectedEvent(event);
                  setSheetDefaultPage('main');
                }}
                className="group"
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <motion.img
                  layoutId={`img-${event.id}`}
                  src={event.image}
                  alt={event.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  className="group-hover:scale-[1.03]"
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                }} />
                {/* Title overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px',
                }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 300, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                    {event.year}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>

          </div>{/* end main content area */}

          {/* Side label */}
        </section>

        {/* Life event sheet */}
        <LifeEventSheet
          event={selectedEvent}
          onClose={() => { setSelectedEvent(null); setSheetDefaultPage('main'); }}
          defaultPage={sheetDefaultPage}
        />

      </main>

      {/* Scroll indicator — overlays bottom of main */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              height: '48px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              background: 'linear-gradient(to top, var(--color-bg), transparent)',
            }}
          >
            <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--color-muted)' }}>
              <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Scroll for more
              </span>
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
