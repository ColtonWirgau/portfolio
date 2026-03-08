'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { lifeEvents, LifeEventSheet, type LifeEvent } from '@/components/LifeEventSheet';
import { SectionHeading } from '@/components/SectionHeading';
import { SideLabel } from '@/components/SideLabel';

const AboutMap = dynamic(() => import('@/components/AboutMap'), { ssr: false });

const roles = [
  'a problem solver',
  'a UI/UX obsessive',
  'a full-stack developer',
  'a builder of tools',
  'a product thinker',
];

const navLinks = [
  { label: 'About Me', href: '#about' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Services', href: '#services' },
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

        {/* About section */}
        <section id="about" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '80px', padding: '80px 24px', display: 'flex' }}>
          {/* Main content area */}
          <div style={{ flex: 1, minWidth: 0 }}>

          {/* Top row: heading left, map right */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', marginBottom: '32px' }}>
            <div style={{ flex: 1 }}>
              <SectionHeading
                label="About Me"
                title={<>Michigan born,<br />product obsessed.</>}
                subtitle="Full-stack developer, musician, and lifelong sports fan based in Southeast Michigan. I build tools that make complexity feel simple."
              />
            </div>
            <div style={{ width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <AboutMap
                events={lifeEvents}
                selected={selectedEvent}
                onSelect={(event) => { setSelectedEvent(event); setSheetDefaultPage('main'); }}
              />
            </div>
          </div>

          {/* Full-width life event sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {lifeEvents.map((event, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className="group"
                  style={{
                    display: 'flex',
                    flexDirection: imageLeft ? 'row' : 'row-reverse',
                    gap: '48px',
                    alignItems: 'stretch',
                  }}
                >
                  {/* Image side */}
                  <div
                    style={{
                      width: '45%',
                      flexShrink: 0,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      minHeight: '360px',
                    }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setSheetDefaultPage('main');
                    }}
                  >
                    <img
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
                  </div>

                  {/* Content side */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                      {event.year}
                    </div>
                    <h3
                      style={{
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        fontWeight: 200,
                        color: 'var(--color-fg)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        marginBottom: '4px',
                      }}
                    >
                      {event.label}
                    </h3>
                    <div style={{ fontSize: '14px', fontWeight: 300, color: 'var(--color-muted)', marginBottom: '16px' }}>
                      {event.tagline}
                    </div>

                    <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px' }}>
                      {event.description}
                    </p>

                    {/* Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                      {event.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ color: 'var(--color-border)', marginTop: '6px', flexShrink: 0, fontSize: '6px' }}>●</span>
                          <span style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 300, color: 'var(--color-muted)' }}>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sub-event links */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {event.subEvents.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedEvent(event);
                            setSheetDefaultPage(sub.id);
                          }}
                          style={{
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'var(--color-muted)',
                            padding: '6px 14px',
                            borderRadius: '100px',
                            border: '1px solid var(--color-border)',
                            background: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-fg)'; e.currentTarget.style.color = 'var(--color-fg)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-muted)'; }}
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          </div>{/* end main content area */}

          {/* Side label */}
          <SideLabel label="About Me" side="right" delay={0.3} mirrorLabel />
        </section>

        {/* Life event detail sheet */}
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
