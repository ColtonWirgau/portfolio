'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { lifeEvents, LifeEventSheet, type LifeEvent } from '@/components/LifeEventSheet';
import { SectionHeading } from '@/components/SectionHeading';

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
    <div className="h-screen bg-bg overflow-hidden grid grid-cols-[80px_1fr_40px] grid-rows-[56px_1fr] max-lg:grid-cols-[1fr_40px] max-lg:grid-rows-[56px_1fr]">
      {/* ── Header ── spans full width, sticky */}
      <nav className="col-span-full sticky top-0 z-50 h-14 flex items-center justify-between pl-6 lg:pl-0" style={{ paddingRight: '40px' }}>
        {/* Logo + nav links */}
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center justify-center w-[80px]">
            <a href="#" onClick={(e) => { e.preventDefault(); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" className="text-fg">
                <path d="M6 4L10 12L6 14L10 18L16 26L22 18L26 14L22 12L26 4L20 10L16 6L12 10Z" />
                <path d="M13 15L16 20L19 15Z" fill="var(--color-bg)" />
                <circle cx="12" cy="12" r="1.2" fill="var(--color-bg)" />
                <circle cx="20" cy="12" r="1.2" fill="var(--color-bg)" />
              </svg>
            </a>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="lg:hidden flex items-center">
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

      {/* ── Left sidebar ── fixed vertical strip (lg only) */}
      <aside className="hidden lg:flex flex-col items-center row-start-2 sticky top-14 pt-8" style={{ height: 'calc(100vh - 56px)', paddingBottom: '56px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4 flex-1"
        >
          <span
            className="text-[10px] tracking-[0.15em] uppercase text-muted whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Full-stack developer
          </span>
          <div className="flex-1 w-px bg-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4"
        >
          <span
            className="text-[10px] tracking-[0.15em] text-muted"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            2026
          </span>
        </motion.div>
      </aside>

      {/* ── Main content ── single scrollable area */}
      <main ref={mainRef} className="row-start-2 col-start-2 col-end-2 overflow-y-auto relative max-lg:col-start-1" style={{ paddingBottom: '80px' }}>
        {/* Hero section */}
        <section className="h-[calc(100vh-56px)] flex items-center pl-6 lg:pl-10">
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
        </section>

        {/* About section */}
        <section id="about" className="flex flex-col-reverse lg:flex-row-reverse gap-10 px-6 lg:px-10" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          {/* Right — heading + timeline + details */}
          <div className="flex-1 min-w-0">
            <SectionHeading
              label="About Me"
              title={<>Michigan born,<br />product obsessed.</>}
            />

            {/* Timeline */}
            <div className="relative" style={{ paddingLeft: '32px' }}>
              {/* Vertical line */}
              <div className="absolute w-px bg-border" style={{ left: '7px', top: '8px', bottom: '8px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {lifeEvents.map((event, idx) => (
                  <div key={event.id}>
                    {/* Main timeline item */}
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setSheetDefaultPage('main');
                      }}
                      className="group"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0',
                      }}
                    >
                      {/* Dot on timeline */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-32px',
                          top: '4px',
                          width: '15px',
                          height: '15px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: selectedEvent?.id === event.id ? '10px' : '8px',
                            height: selectedEvent?.id === event.id ? '10px' : '8px',
                            borderRadius: '50%',
                            border: `2px solid ${selectedEvent?.id === event.id ? 'var(--color-fg)' : 'var(--color-muted)'}`,
                            background: selectedEvent?.id === event.id ? 'var(--color-fg)' : 'var(--color-bg)',
                            transition: 'all 0.2s',
                          }}
                        />
                      </div>

                      {/* Number */}
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: selectedEvent?.id === event.id ? 'var(--color-fg)' : 'transparent',
                          border: `1.5px solid ${selectedEvent?.id === event.id ? 'var(--color-fg)' : 'var(--color-border)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 500,
                          color: selectedEvent?.id === event.id ? 'var(--color-bg)' : 'var(--color-muted)',
                          letterSpacing: '0.02em',
                        }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-muted)', marginBottom: '2px' }} className="uppercase">
                          {event.year}
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--color-fg)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                          {event.label}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--color-muted)', marginTop: '2px' }}>
                          {event.tagline}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        style={{ color: 'var(--color-border)', flexShrink: 0, marginTop: '8px', transition: 'color 0.15s' }}
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>

                    {/* Sub-events */}
                    <div style={{ paddingLeft: '44px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {event.subEvents.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedEvent(event);
                            setSheetDefaultPage(sub.id);
                          }}
                          className="group"
                          style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            textAlign: 'left',
                            padding: '6px 0',
                          }}
                        >
                          {/* Small dot */}
                          <div
                            className="absolute"
                            style={{
                              left: '-37px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: 'var(--color-border)',
                            }}
                          />
                          <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--color-muted)', transition: 'color 0.15s' }}
                            className="group-hover:text-fg"
                          >
                            {sub.title}
                          </span>
                          <svg
                            width="8" height="8" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                            style={{ color: 'var(--color-border)', flexShrink: 0, marginLeft: 'auto', transition: 'color 0.15s' }}
                            className="group-hover:text-muted"
                          >
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Left — Map (tall, matching hero aspect) */}
          <div className="w-full lg:w-[50%] shrink-0 overflow-hidden lg:sticky lg:top-20 lg:self-start" style={{ height: '85dvh', borderRadius: '50%', aspectRatio: '1', maxHeight: '85dvh' }}>
            <AboutMap
              events={lifeEvents}
              selected={selectedEvent}
              onSelect={(event) => { setSelectedEvent(event); setSheetDefaultPage('main'); }}
            />
          </div>
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
              right: '40px',
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
