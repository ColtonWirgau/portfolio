'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LifeEvent } from './LifeEventSheet';
import { Footer } from './Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' as const },
  }),
};

export function StoryPage({ event }: { event: LifeEvent }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '50vh', minHeight: '340px', overflow: 'hidden' }}>
        <motion.img
          src={event.image}
          alt={event.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        }} />
        {/* Title overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '40px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}
          >
            {event.year}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: '#fff',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            {event.label}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}
          >
            {event.tagline}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Description */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
            fontStyle: 'italic',
            color: 'var(--color-fg)',
            lineHeight: 1.7,
            marginBottom: '40px',
          }}
        >
          {event.description}
        </motion.p>

        {/* Narrative */}
        {event.narrative && event.narrative.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
            {event.narrative.map((paragraph, i) => (
              <motion.p
                key={i}
                custom={i + 1}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        )}

        {/* Narrative images */}
        {event.narrativeImages && event.narrativeImages.length > 0 && (
          <motion.div
            custom={(event.narrative?.length ?? 0) + 1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              marginBottom: '48px',
            }}
          >
            {event.narrativeImages.map((src, i) => (
              <div key={i} style={{
                width: i === 0 ? 180 : 140,
                height: i === 0 ? 180 : 140,
                borderRadius: '50%',
                overflow: 'hidden',
                background: 'var(--color-border)',
              }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </motion.div>
        )}

        {/* Pull quote */}
        {event.pullQuote && (
          <motion.div
            custom={(event.narrative?.length ?? 0) + 2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              padding: '32px 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              fontStyle: 'italic',
              color: 'var(--color-fg)',
              lineHeight: 1.6,
            }}>
              {event.pullQuote}
            </p>
          </motion.div>
        )}

        {/* Highlights */}
        <motion.div
          custom={(event.narrative?.length ?? 0) + 3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>
            Highlights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {event.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ color: 'var(--color-accent)', marginTop: '7px', flexShrink: 0, fontSize: '6px' }}>●</span>
                <span style={{ fontSize: '14px', lineHeight: 1.6, fontWeight: 400, color: 'var(--color-muted)' }}>{h}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sub-events as cards */}
        {event.subEvents.length > 0 && (
          <motion.div
            custom={(event.narrative?.length ?? 0) + 4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>
              More Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {event.subEvents.map((sub) => (
                <div key={sub.id} style={{
                  padding: '24px',
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-fg)',
                    marginBottom: '10px',
                    letterSpacing: '-0.01em',
                  }}>
                    {sub.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
                    {sub.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back link bottom */}
        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
          <Link
            href="/#about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-accent)',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back to My Story
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
