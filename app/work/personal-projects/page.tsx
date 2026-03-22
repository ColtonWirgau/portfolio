'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' as const },
  }),
};

export default function PersonalProjectsPage() {
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '40px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Work
        </Link>

        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.7, marginBottom: '48px' }}>
          The stuff I build for fun (and sometimes for my friends and family). These are less polished, more personality.
        </motion.p>

        {/* Lions Tracker */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          style={{ padding: '32px', background: 'var(--color-card)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-fg)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            Lions Season Ticket Tracker
          </h3>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '16px' }}>
            My parents and I have Lions season tickets with two extra seats, so I built a little app to keep track of who{'\u2019'}s going to each game, any resales, and costs. It{'\u2019'}s nothing fancy from a brand standpoint (it{'\u2019'}s just for us) but under the hood it{'\u2019'}s got full OAuth, a Neon database, and clean dashboards. Solves a real (very niche) problem.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Next.js', 'Neon', 'OAuth', 'Tailwind', 'Vercel'].map((t) => (
              <span key={t} style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-muted)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--color-border)' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Degenerates */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}
          style={{ padding: '32px', background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-fg)', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            Degenerates Dashboard
          </h3>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '16px' }}>
            Every week, my idiot friends and I place a 12-leg parlay. We have never won. Not once. But we keep doing it, and I built a dashboard to track our glorious losing streak. It pulls in picks, tracks results, and roasts us with the data. It{'\u2019'}s dumb, it{'\u2019'}s fun, and it{'\u2019'}s one of my favorite things I{'\u2019'}ve built.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['Next.js', 'Tailwind', 'Vercel'].map((t) => (
              <span key={t} style={{ fontSize: '11px', fontWeight: 400, color: 'var(--color-muted)', padding: '4px 10px', borderRadius: '100px', border: '1px solid var(--color-border)' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
