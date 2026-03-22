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

export default function ChurchHubPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ position: 'relative', height: '50vh', minHeight: '340px', overflow: 'hidden' }}>
        <motion.img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop"
          alt="Church Hub"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            SaaS Platform
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Church Hub
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            From internal tool to full SaaS product
          </motion.p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '40px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Work
        </Link>

        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.7, marginBottom: '40px' }}>
          What started as an internal tool at Woodside Bible Church evolved into a full SaaS product. Church Hub is a modular Next.js platform that helps churches centralize operations, automate workflows, and build custom tools on top of their existing data.
        </motion.p>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
            I started a business around it, implementing it across multiple churches to solve real operational problems at scale. The platform handles everything from event management and volunteer coordination to giving dashboards and custom reporting.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
            More details, screenshots, and case studies coming soon.
          </p>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Tech Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL Server', 'Tailwind', 'Vercel'].map((t) => (
              <span key={t} style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-muted)', padding: '6px 14px', borderRadius: '100px', border: '1px solid var(--color-border)' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
