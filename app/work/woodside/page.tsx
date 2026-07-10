'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

/* ── Woodside brand system ────────────────────────────────────────────
   Loosely off woodsidebible.org: deep navy, a bright green accent, and
   heavy bold sans display. Dark, energetic, mission-driven, refined for
   this context. Distinct from Church Hub's light marble/serif world. */
const NAVY = '#16202B';
const PANEL = '#1C2B39';
const INK = '#EBEFF3';
const BODY = '#AEB9C4';
const MUTED = '#7C8B9B';
const GREEN = '#62BB46';
const BORDER = 'rgba(255,255,255,0.10)';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

const FLAGSHIP = [
  {
    num: '01',
    kicker: 'Monorepo',
    title: 'Template, forks, and client-owned infra',
    body: 'Church Hub is a Turborepo workspace built around a single canonical template. Each church forks that template into its own GitHub repo, its own Vercel project, and its own Neon database: independent infrastructure end-to-end. Upstream fixes flow back through a lightweight backport workflow, so every client benefits from improvements without losing ownership of their stack. Three churches run on it today: Granger Community, McLean Bible, and Woodside.',
    tags: ['Turborepo', 'Vercel-per-client', 'Neon-per-client', 'Backport workflow'],
  },
  {
    num: '02',
    kicker: 'Abstraction · Reusability',
    title: 'Four shared packages, one design language',
    body: 'The reusable surface lives in four internal packages every client consumes. A framework-agnostic MinistryPlatform API client with userId auditing enforced at the TypeScript level (mutations literally don’t compile without it). A database package of Zod schemas for both MP baseline and church-specific tables. A NextAuth v5 + MP OAuth wrapper with role fetching and admin impersonation. And a Shadcn-based design system with admin tooling and PWA scaffolding. Anything church-agnostic lives in packages; business logic stays local to each client.',
    tags: ['Zod', 'TypeScript', 'NextAuth v5', 'Shadcn UI', 'PWA-per-app'],
  },
  {
    num: '03',
    kicker: 'Security in the tools',
    title: 'Audit trails the compiler enforces',
    body: 'Most church platforms either lean entirely on MinistryPlatform’s bundled auth (slow, limited) or roll their own and lose the audit trail. Church Hub does both, on purpose. Auth is MP OAuth via NextAuth v5 with PKCE; sessions carry contactId, roles, and access token. Every mutation through the API client requires a userId, typed at compile time, so every create or update lands in MP’s audit table: there’s no path to ship a mutation that bypasses it.',
    tags: ['MP OAuth + PKCE', 'NextAuth v5', 'Enforced userId', 'Domain_User auditing'],
  },
  {
    num: '04',
    kicker: 'Permissions',
    title: 'A two-layer permission model',
    body: 'MinistryPlatform models permissions two ways at once: Security Roles for big buckets (staff, admin, volunteer) and User Groups for granular access (Event Coordinators, Worship Team, Campus Pastors). MP is the source of truth, but Church Hub also stores app-level grants in Neon: small things like "can schedule events" that MP doesn’t model cleanly. The hybrid is faster (no MP roundtrip per check) and gives non-staff users targeted access without making them staff. Two complementary layers, each doing what it’s good at.',
    tags: ['MP Security Roles', 'MP User Groups', 'Neon row-level grants', 'Route-boundary checks'],
  },
];

const NOTABLE = [
  { title: 'Dynamic Insights', body: 'Extended a static reporting platform into interactive dashboards with custom embedded widgets, on a nested-JSON framework built for optimized data retrieval. Inspired new features in MinistryPlatform’s main product and became a development model across partner organizations.' },
  { title: 'Web Pages & Platforms', body: 'Built and maintained public-facing and internal web apps: clean, responsive interfaces serving thousands of users every week across multiple campuses.' },
  { title: 'WordPress & Web Team Projects', body: 'Worked with a web team on major projects including Hope-365 and other large-scale initiatives: training, styling, and a wide range of web needs across the organization.' },
  { title: 'Custom Staff Interfaces', body: 'Internal interfaces that let staff complete specific tasks, see targeted insights, and streamline workflows. Built to be intuitive enough that non-technical teams use them without training.' },
  { title: 'Database Automations', body: 'Automated database workflows that replaced manual processes. Cleaned up and deactivated roughly two-thirds of the database, then built better systems to track real engagement. Some of it was adopted into MinistryPlatform’s core product.' },
  { title: 'Power BI Reporting', body: 'Dashboards and reports for leadership and staff that turn raw data into clear, actionable visuals, giving teams easy access to the metrics that actually matter.' },
  { title: 'Third-Party Integrations', body: 'Integrated platforms like REACH (orphan sponsorship synced into the database) and Planning Center (auto check-in of worship team members based on PCO service status), eliminating manual entry and keeping systems in sync.' },
  { title: 'Custom Web Integrations', body: 'Connected systems, automated data flows, and built tools that fit the way the organization actually works, solo and alongside teams.' },
];

const TECH = ['Next.js', 'React', 'TypeScript', 'Turborepo', 'NextAuth v5', 'Drizzle', 'Neon', 'Zod', 'Tailwind', 'Shadcn UI', 'SQL Server', 'Power BI', 'REST API', 'MinistryPlatform', 'WordPress'];

export default function WoodsidePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: NAVY, color: INK, overflowX: 'clip' }}>
      <style>{`body > nav { display: none !important; }`}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(80px, 12vh, 140px) 24px clamp(48px, 8vh, 80px)', overflow: 'hidden' }}>
        <motion.img
          src="/woodside.jpg"
          alt="Woodside Bible Church"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${NAVY} 6%, rgba(22,32,43,0.7) 45%, rgba(22,32,43,0.5) 100%)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 'clamp(28px, 5vh, 48px) 24px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: GREEN, fontSize: '13px', fontWeight: 800, letterSpacing: '0.06em', textDecoration: 'none', textTransform: 'uppercase' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
              Work
            </Link>
          </div>
        </div>

        <div style={{ position: 'relative', maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GREEN, fontWeight: 800, marginBottom: '18px' }}>
            Full-Stack Development · Since 2016
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(2.8rem, 8vw, 6rem)', color: INK, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '22px' }}>
            Woodside<br />Bible Church
          </motion.h1>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.42 }} style={{ width: '88px', height: '3px', background: GREEN, transformOrigin: 'left', marginBottom: '24px' }} />
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', color: BODY, maxWidth: '620px', lineHeight: 1.5, fontWeight: 400 }}>
            Software Development Manager and sole in-house developer, building the software that powers a large multi-campus church.
          </motion.p>
        </div>
      </section>

      {/* ── Thesis ───────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <motion.p variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)', color: INK, lineHeight: 1.45, marginBottom: '32px', fontWeight: 500 }}>
            My largest body of work is <span style={{ color: GREEN }}>Church Hub</span>: a Turborepo monorepo that started as Woodside&apos;s internal platform and became a shared starting point other churches own outright, each running it on their own infrastructure and free to take it wherever they need.
          </motion.p>
          <motion.p variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ fontSize: '15.5px', lineHeight: 1.9, color: BODY, maxWidth: '660px' }}>
            This is where I cut my teeth building real products for real people. I&apos;ve worked solo and with teams to ship everything from custom staff tools and web integrations to full WordPress projects and data-driven dashboards, then lifted the patterns into a reusable platform so other churches could deploy the same work on their own infrastructure.
          </motion.p>
        </div>
      </section>

      {/* ── Flagship: Church Hub engineering ─────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}`, background: 'linear-gradient(to bottom, rgba(98,187,70,0.05), transparent 40%)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '760px', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GREEN, fontWeight: 800, marginBottom: '16px' }}>Flagship · Church Hub</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: INK, lineHeight: 1.02, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '20px' }}>
              A monorepo for the way churches actually work.
            </h2>
            <p style={{ fontSize: '15.5px', color: BODY, lineHeight: 1.8 }}>
              Most of the work here started inside Church Hub. Here&apos;s how it&apos;s built, why it&apos;s built that way, and the patterns that keep independent church deployments in sync without slowing any of them down.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {FLAGSHIP.map((b, i) => (
              <motion.article key={b.num} variants={reveal} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: 'clamp(24px, 3vw, 32px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '30px', color: GREEN, lineHeight: 1 }}>{b.num}</span>
                  <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, fontWeight: 700 }}>{b.kicker}</span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: INK, lineHeight: 1.25, letterSpacing: '-0.01em', marginBottom: '14px' }}>{b.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: BODY, marginBottom: '18px' }}>{b.body}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {b.tags.map((t) => (
                    <span key={t} style={{ fontSize: '10px', fontWeight: 600, color: GREEN, padding: '4px 10px', borderRadius: '100px', border: `1px solid rgba(98,187,70,0.4)`, lineHeight: 1.3 }}>{t}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other notable work (typographic) ─────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED, fontWeight: 800, marginBottom: '14px' }}>Other notable work</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: INK, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '720px' }}>
              Tools, integrations, and reporting across the organization.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'hidden', background: BORDER }}>
            {NOTABLE.map((item, i) => (
              <motion.div key={item.title} variants={reveal} custom={i % 2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                style={{ background: NAVY, padding: 'clamp(24px, 3vw, 32px)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: '15px', color: GREEN }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: INK, letterSpacing: '-0.01em' }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: BODY }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The team ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ marginBottom: '32px', maxWidth: '620px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED, fontWeight: 800, marginBottom: '14px' }}>Not just code</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3.6vw, 2.4rem)', color: INK, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              Part of the team.
            </h2>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {['/images/woodside-team-event-1.webp', '/images/woodside-team-event-2.webp'].map((src) => (
              <img key={src} src={src} alt="Woodside team event" loading="lazy" style={{ width: '100%', aspectRatio: '3 / 2', objectFit: 'cover', borderRadius: '10px', border: `1px solid ${BORDER}` }} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tech ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px', color: MUTED, textTransform: 'uppercase', fontWeight: 800 }}>Built with</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {TECH.map((t) => (
                <span key={t} style={{ fontSize: '13px', fontWeight: 500, color: BODY, padding: '8px 16px', borderRadius: '100px', border: `1px solid ${BORDER}` }}>{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px, 12vw, 140px) 24px', borderTop: `1px solid ${BORDER}`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-30%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(98,187,70,0.14) 0%, transparent 66%)', pointerEvents: 'none' }} />
        <motion.h2 variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          style={{ position: 'relative', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '760px', margin: '0 auto 40px' }}>
          Real products.<br /><span style={{ color: GREEN }}>Real people.</span>
        </motion.h2>
        <motion.div variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/work/church-hub" style={{ fontSize: '14px', fontWeight: 800, color: NAVY, background: GREEN, padding: '13px 26px', borderRadius: '100px', textDecoration: 'none', letterSpacing: '0.02em' }}>
            See Church Hub
          </Link>
          <Link href="/#work" style={{ fontSize: '14px', fontWeight: 800, color: GREEN, padding: '13px 26px', borderRadius: '100px', textDecoration: 'none', border: `1px solid rgba(98,187,70,0.5)`, letterSpacing: '0.02em' }}>
            Back to Work
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
