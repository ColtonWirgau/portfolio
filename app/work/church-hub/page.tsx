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

function DeviceShot({ desktop, desktopAlt, phone, phoneAlt, caption, maxWidth = 720 }: {
  desktop: string;
  desktopAlt: string;
  phone: string;
  phoneAlt: string;
  caption: string;
  maxWidth?: number;
}) {
  return (
    <div style={{ marginBottom: '44px' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: `${maxWidth}px` }}>
        <img src={desktop} alt={desktopAlt} loading="lazy" style={{ display: 'block', width: '100%', border: '1px solid var(--color-border)' }} />
        <img src={phone} alt={phoneAlt} loading="lazy" style={{ position: 'absolute', bottom: '-12px', right: '-10px', width: 'clamp(92px, 27%, 170px)', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: '0 18px 48px rgba(0,0,0,0.45)' }} />
      </div>
      <p style={{ fontSize: '12px', fontWeight: 500, color: 'var(--color-muted)', marginTop: '26px', lineHeight: 1.5, maxWidth: `${maxWidth}px` }}>
        {caption}
      </p>
    </div>
  );
}

export default function ChurchHubPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ position: 'relative', height: '50vh', minHeight: '340px', overflow: 'hidden' }}>
        <motion.img
          src="/images/church-hub-1.webp"
          alt="Church Hub demo dashboard"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Developer Platform
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Church Hub
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            From internal tool to a platform they own
          </motion.p>
        </div>
      </div>

      <div style={{ padding: '60px 24px 100px' }}>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '40px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Work
        </Link>

        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.7, marginBottom: '40px' }}>
          What started as an internal tool at Woodside Bible Church grew into a platform churches own and build on. Church Hub is a modular Next.js system that centralizes operations, automates workflows, and lets churches build custom tools on top of their existing data: extend it in-house, hire a developer, or let AI build on top of it.
        </motion.p>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
            I started a business around it, implementing it across multiple churches to solve real operational problems at scale. It spans public-facing microsites and embeddable widgets on the church&apos;s own site, internal staff apps for the work nobody else wants to touch, event and volunteer tooling, and analytics on top of it all.
          </p>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Microsites &amp; widgets, on the church&apos;s own site</div>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '28px', maxWidth: '640px' }}>
            Most churches run their public site on WordPress or a builder someone else set up, with no real way to write code against it. I build widgets and microsites that drop cleanly into those sites, match the design, and push and pull data from wherever it actually lives.
          </p>

          {/* See Jesus microsite */}
          <DeviceShot
            desktop="/images/church-hub-see-jesus-desktop.webp"
            desktopAlt="The See Jesus giving campaign microsite on desktop"
            phone="/images/church-hub-commitment-flow.webp"
            phoneAlt="The See Jesus commitment flow on mobile: entry, commitment form, giving chart, and stored resources"
            caption="A campaign microsite with its own custom design, plus an interactive commitment flow: tap through and styled bottom sheets slide up on mobile, all wired to live data behind the scenes."
            maxWidth={640}
          />

          {/* Campus locator widget */}
          <DeviceShot
            desktop="/images/church-hub-locations-desktop.webp"
            desktopAlt="Campus locator widget on desktop"
            phone="/images/church-hub-locations-flow.webp"
            phoneAlt="Campus locator on mobile: browse the campus list, then open the Lake Orion campus detail with map, pastor, and service times"
            caption="A campus locator built in Next.js: filter by ministry, search by zip and radius, and browse an interactive map with custom illustrated pins. Embedded straight into the public site."
            maxWidth={640}
          />
        </motion.div>

        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Internal apps &amp; event tooling</div>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '28px', maxWidth: '640px' }}>
            Behind the public site is a set of internal apps staff actually run on. Weekend Planning lays a full year of preaching series, campaigns, events, and service notes onto one timeline. Drill into a series for its planning workspace and week-by-week breakdown, then into a single sermon: big idea, scripture, points, speaker, and status. Every level is branded to the series and just as styled on mobile.
          </p>

          {/* Weekend Planning: timeline -> Missio Dei series -> sermon, desktop + mobile branded flow */}
          <DeviceShot
            desktop="/images/church-hub-events-flow.webp"
            desktopAlt="Weekend Planning on desktop: the timeline, the Missio Dei series, and a single sermon's planning detail"
            phone="/images/church-hub-events-mobile-flow.webp"
            phoneAlt="Branded mobile bottom sheets for changing service times and adding a note to a week"
            caption="Weekend Planning: a year of weekend services on one timeline. Drill from a series into its week-by-week plan, then into a single sermon with its big idea, scripture, points, and speaker. Every edit on mobile (changing service times, adding a note) slides up a bottom sheet branded to the active series, with controls built for thumbs."
            maxWidth={860}
          />
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Analytics &amp; insights</div>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '28px', maxWidth: '640px' }}>
            I turn a church&apos;s own data into custom, genuinely good-looking insights they can act on. Engagement Circles is one: a clear read on where people are and where they&apos;re heading, and it reflows into styled sheets on mobile so it works in the room, not just at a desk.
          </p>

          {/* Circles demo: desktop + overlapping mobile sheet */}
          <DeviceShot
            desktop="/images/church-hub-circles-desktop.webp"
            desktopAlt="Engagement Circles dashboard on desktop: concentric ring model and per-tier totals"
            phone="/images/church-hub-circles-mobile-sheet.webp"
            phoneAlt="Engagement Circles on mobile: a tier detail sheet with narrative and trend"
            caption="The live Engagement Circles product: the same insights reflow from a full desktop dashboard into styled, swipeable sheets on mobile. Congregation totals blurred for privacy."
            maxWidth={760}
          />
        </motion.div>

        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
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
