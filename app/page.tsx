'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { lifeEvents, LifeEventSheet, type LifeEvent } from '@/components/LifeEventSheet';
import { SectionHeading, Em, Ul } from '@/components/SectionHeading';
import { SideLabel } from '@/components/SideLabel';
import { Footer } from '@/components/Footer';

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

  return (
    <div className="h-screen bg-bg overflow-hidden relative">
      {/* ── Header ── spans full width, sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between" style={{ padding: '0 24px', backdropFilter: 'blur(20px) saturate(1.4)', WebkitBackdropFilter: 'blur(20px) saturate(1.4)', backgroundColor: 'rgba(213, 210, 200, 0.6)' }}>
        {/* Logo + nav links */}
        <div className="flex items-center gap-8">
          <a href="#" onClick={(e) => { e.preventDefault(); mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center">
            <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="12" height="28" viewBox="0 0 341.34 852.51" xmlns="http://www.w3.org/2000/svg">
                <path id="squid_body" fill="var(--color-accent)" d="M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z"/>
                <ellipse id="eyeball" cx="170.67" cy="473.09" rx="39.52" ry="42.83" fill="#FFFFFF"/>
                <circle id="pupil" cx="170.67" cy="473.09" r="17.6" fill="var(--color-fg)"/>
              </svg>
            </div>
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
      <main ref={mainRef} className="h-full overflow-y-auto relative" style={{ paddingBottom: '0' }}>
        {/* Hero section */}
        <section className="h-screen flex items-stretch" style={{ padding: '0 24px' }}>
          <SideLabel label="Full-stack developer" endLabel="2026" side="left" />
          <div className="flex-1 flex items-center">
          <div className="flex items-center gap-10 w-full max-md:flex-col max-md:gap-6">
            {/* Text side */}
            <div className="flex-1 flex flex-col justify-center gap-6 min-w-0">
              <div className="z-10">
                <motion.h1
                  initial={{ opacity: 0, y: 30, scaleX: 0.85 }}
                  animate={{ opacity: 1, y: 0, scaleX: 0.85 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-[clamp(8rem,16vw,16rem)] leading-[0.85] tracking-[-0.10em] mb-5 uppercase"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', WebkitTextStroke: '6px var(--color-accent)', paintOrder: 'stroke fill', transformOrigin: 'left' }}
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
        <section id="work" style={{ padding: '80px 24px', display: 'flex', position: 'relative' }}>
          <SideLabel label="Work" side="left" mirrorLabel />
          {/* Decorative squid watermark */}
          <svg
            viewBox="0 0 341.34 852.51"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: '48px' }}>
              <SectionHeading
                title={<>Things I{"\u2019"}ve built.</>}
                subtitle={<><Em>Full-stack platforms</Em>, <Ul>developer tools</Ul>, and side projects — here{"\u2019"}s some of what I{"\u2019"}ve been working on.</>}
                right
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
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        color: 'var(--color-accent)',
                        lineHeight: 1.2,
                        letterSpacing: '-0.06em',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                        WebkitTextStroke: '3px var(--color-accent)',
                        paintOrder: 'stroke fill',
                        transform: 'scaleX(0.85)',
                        transformOrigin: 'left',
                      }}>
                        {project.title}
                      </h3>
                      <p style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
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
        </section>

        {/* Pull quote */}
        <div style={{
          padding: '32px 24px',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            fontStyle: 'italic',
            color: 'var(--color-fg)',
            lineHeight: 1.6,
            maxWidth: '550px',
            margin: '0 auto',
          }}>
            I care a lot about clarity. Not overwhelming people. Saying just enough, at the right time.{' '}
            <span style={{ fontWeight: 600 }}>Good design should feel obvious.</span>
          </p>
        </div>

        {/* My Story / About section */}
        <section id="about" style={{ padding: '80px 24px', display: 'flex', position: 'relative' }}>
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Editorial heading */}
            <div style={{ marginBottom: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 10vw, 9rem)',
                color: 'var(--color-accent)',
                lineHeight: 0.9,
                letterSpacing: '-0.08em',
                textTransform: 'uppercase',
                marginBottom: '28px',
                WebkitTextStroke: '5px var(--color-accent)',
                paintOrder: 'stroke fill',
                transform: 'scaleX(0.85)',
              }}>
                My Story.
              </h2>
              <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)', marginBottom: '24px' }} />
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-fg)',
                lineHeight: 1.6,
                maxWidth: '600px',
                marginBottom: '20px',
              }}>
                Small town kid, big curiosity. From football fields to{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>building things that matter</span>.
              </p>
              <p style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                maxWidth: '600px',
              }}>
                I grew up in Algonac, Michigan. IB student, football captain, track Hall of Famer. I studied software engineering at the University of Detroit Mercy, got published in AI research, and landed at Woodside Bible Church where I built an entire technology department from scratch. Now I build products, lead teams, and obsess over making complex things feel simple.
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

            {/* Portrait cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${lifeEvents.length}, 1fr)`, gap: '16px', marginBottom: '60px' }}>
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
                    overflow: 'hidden',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderRadius: 0,
                    border: 'none',
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
            </div>

          </div>
          <SideLabel label="My Story" side="right" delay={0.3} mirrorLabel />
        </section>

        {/* Life event sheet */}
        <LifeEventSheet
          event={selectedEvent}
          onClose={() => { setSelectedEvent(null); setSheetDefaultPage('main'); }}
          defaultPage={sheetDefaultPage}
        />

        <Footer />
      </main>

      {/* Scroll indicator — inside the outer container, behind main's scroll */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 5,
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
