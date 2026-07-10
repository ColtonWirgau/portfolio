'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

/* ── Woodside brand system ────────────────────────────────────────────
   Loosely off woodsidebible.org: deep navy, a bright green accent, and
   heavy bold sans display. Dark, energetic, mission-driven, refined for
   this context. Distinct from Church Hub's light marble/serif world.
   This page is about the role, not the Church Hub deep dive (that lives
   on its own page): SQL/MinistryPlatform depth, making systems talk,
   being the sole tech decision-maker for a 14-campus church, and doing
   whatever makes ministry easier. */
const NAVY = '#16202B';
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

const STORIES = [
  {
    kicker: 'The foundation · SQL + MinistryPlatform',
    heading: 'I built the foundation before anyone here knew SQL.',
    body: 'I stepped into this role in 2019, right after we migrated off our old database onto MinistryPlatform and dragged years of mess along with us. The old system was easier in places, but MP was far more flexible, and leadership wanted to finally build custom. No one on staff had written a line of SQL or shipped software before. So I taught myself what I didn’t know, cleaned up the data (deactivating roughly two-thirds of it), and built the queries, automations, and engagement model that everything else still runs on.',
    tags: ['SQL Server', 'MinistryPlatform', 'Data modeling', 'Migrations', 'Self-taught'],
  },
  {
    kicker: 'Making systems talk',
    heading: 'A dozen tools that were never meant to know about each other.',
    body: 'Ministry runs on a sprawl of platforms, and a lot of my job is making them behave like one. I’ve integrated dozens of tools into our systems, several with full two-way sync back into MinistryPlatform so data lives in one place and nobody re-keys it. On the bigger integrations, REACH and Planning Center, I worked alongside another engineer: writing code, shaping the product, and guiding the build.',
    tags: ['REST APIs', 'Full sync', 'REACH', 'Planning Center', 'Webhooks'],
  },
  {
    kicker: 'One developer · Fourteen campuses',
    heading: 'Everything I ship touches a lot of people.',
    body: 'As the only technical person, I own the whole stack: architecture, tools, tradeoffs, all of it. Projects often start with almost no spec, or with a ministry leader who knows the outcome they need but not how to ask for it, and my job is to turn that into something real. And it all lands across 14 campuses, from a few hundred people to megachurches, with wildly different staffing and ways of working. You can’t please everyone at once, so I build things that relieve tension instead of adding it. I never want to be a burden to ministry. I want to be the reason it got easier.',
    tags: ['Solo architecture', 'Non-technical stakeholders', 'Internal ministries', 'External orgs'],
  },
];

const NOTABLE = [
  { title: 'Dynamic Insights', body: 'Extended a static reporting platform into interactive dashboards with custom embedded widgets, on a nested-JSON framework built for optimized data retrieval. Inspired new features in MinistryPlatform’s main product.' },
  { title: 'Database Automations', body: 'Automated database workflows that replaced manual processes, and built better systems to track real engagement. Some of it was adopted into MinistryPlatform’s core product.' },
  { title: 'Power BI Reporting', body: 'Dashboards and reports for leadership and staff that turn raw data into clear, actionable visuals, giving teams easy access to the metrics that actually matter.' },
  { title: 'Custom Staff Interfaces', body: 'Internal tools that let staff complete specific tasks, see targeted insights, and streamline workflows: intuitive enough that non-technical teams use them without training.' },
  { title: 'Web Pages & Platforms', body: 'Public-facing and internal web apps serving thousands of users a week across campuses, plus web-team projects like Hope-365 (training, styling, and a wide range of needs).' },
  { title: 'Third-Party Integrations', body: 'Connected platforms like REACH (orphan sponsorship synced into MP) and Planning Center (auto check-in from PCO service status), eliminating manual entry and keeping systems in sync.' },
];

const TECH = ['SQL Server', 'MinistryPlatform', 'Power BI', 'Next.js', 'React', 'TypeScript', 'Node.js', 'REST API', 'WordPress', 'Planning Center', 'REACH', 'Neon', 'Tailwind'];

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
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${NAVY} 6%, rgba(22,32,43,0.72) 45%, rgba(22,32,43,0.55) 100%)` }} />
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
            Full-Stack Development · Since 2019
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(2.8rem, 8vw, 6rem)', color: INK, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '22px' }}>
            Woodside<br />Bible Church
          </motion.h1>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.42 }} style={{ width: '88px', height: '3px', background: GREEN, transformOrigin: 'left', marginBottom: '24px' }} />
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.4rem)', color: BODY, maxWidth: '640px', lineHeight: 1.5, fontWeight: 400 }}>
            Software Development Manager and sole in-house developer, building the software that powers a large multi-campus church.
          </motion.p>
        </div>
      </section>

      {/* ── Thesis: make ministry easier ─────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.p variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4.4vw, 3rem)', color: INK, lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '30px' }}>
            Everything I build here has one job:<br /><span style={{ color: GREEN }}>make ministry easier.</span>
          </motion.p>
          <motion.p variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            style={{ fontSize: '15.5px', lineHeight: 1.9, color: BODY, maxWidth: '680px' }}>
            I&apos;m the sole in-house developer at Woodside, which means I own every technical decision across a 14-campus church that ranges from a few hundred people to megachurches. This is where I cut my teeth building real products for real people: custom staff tools, data-driven dashboards, web integrations, and the database work underneath all of it.
          </motion.p>
        </div>
      </section>

      {/* ── Role narrative ───────────────────────────────────── */}
      {STORIES.map((s, i) => (
        <section key={s.kicker} style={{ padding: 'clamp(52px, 8vw, 92px) 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <motion.div variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'transparent', WebkitTextStroke: `1.4px ${GREEN}`, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, fontWeight: 800 }}>{s.kicker}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.7rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '22px', maxWidth: '760px' }}>{s.heading}</h2>
              <p style={{ fontSize: '15.5px', lineHeight: 1.9, color: BODY, maxWidth: '680px', marginBottom: '24px' }}>{s.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.tags.map((t) => (
                  <span key={t} style={{ fontSize: '11px', fontWeight: 600, color: GREEN, padding: '5px 12px', borderRadius: '100px', border: `1px solid rgba(98,187,70,0.4)` }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── The work (breadth) ───────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED, fontWeight: 800, marginBottom: '14px' }}>A sampling of the work</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: INK, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '760px' }}>
              Tools, integrations, and reporting across the organization.
            </h2>
          </motion.div>

          {/* featured real project shot */}
          <motion.figure variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} style={{ margin: '0 0 clamp(28px, 4vw, 44px)' }}>
            <img src="/images/woodside-hope365.webp" alt="Hope-365, a Woodside web-team project" loading="lazy" style={{ width: '100%', borderRadius: '10px', border: `1px solid ${BORDER}` }} />
            <figcaption style={{ fontSize: '12.5px', color: MUTED, marginTop: '14px', lineHeight: 1.6 }}>Hope-365, one of the larger web-team projects I contributed to at Woodside.</figcaption>
          </motion.figure>

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
      <section style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ marginBottom: '32px', maxWidth: '640px' }}>
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

      {/* ── Church Hub nod ───────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 104px) 24px', borderTop: `1px solid ${BORDER}`, background: 'linear-gradient(to bottom, rgba(98,187,70,0.05), transparent 45%)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '680px', marginBottom: 'clamp(28px, 4vw, 40px)' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GREEN, fontWeight: 800, marginBottom: '14px' }}>Where it led</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.6rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '18px' }}>
              The reusable pieces became Church Hub.
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.85, color: BODY }}>
              The patterns I kept rebuilding here grew into Church Hub: a platform other churches now own and run on their own infrastructure. It has its own story.
            </p>
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {['/images/church-hub-circles-desktop.webp', '/images/church-hub-events-flow.webp'].map((src) => (
              <img key={src} src={src} alt="Church Hub" loading="lazy" style={{ width: '100%', borderRadius: '8px', border: `1px solid ${BORDER}` }} />
            ))}
          </motion.div>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <Link href="/work/church-hub" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 800, color: NAVY, background: GREEN, padding: '13px 24px', borderRadius: '100px', textDecoration: 'none', letterSpacing: '0.02em' }}>
              See Church Hub
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Tech ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(56px, 9vw, 96px) 24px', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px', color: MUTED, textTransform: 'uppercase', fontWeight: 800 }}>Worked with</div>
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
          style={{ position: 'relative', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '780px', margin: '0 auto 40px' }}>
          Whatever it takes to<br /><span style={{ color: GREEN }}>make ministry easier.</span>
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
