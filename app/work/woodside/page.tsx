'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { ResponsiveSheet, SheetPage } from '@/components/ResponsiveSheet';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: 'easeOut' as const },
  }),
};

interface Highlight {
  title: string;
  description: string;
  image: string;
  span: 1 | 2;
  tall?: boolean;
}

const highlights: Highlight[] = [
  { title: 'Dynamic Insights', description: 'Extended a static reporting platform into interactive dashboards with custom embedded widgets. Created a nested JSON framework for optimized data retrieval. This innovation inspired new features in MinistryPlatform\'s main product and became a development model across partner organizations.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', span: 2 },
  { title: 'Web Pages & Platforms', description: 'Built and maintained multiple public-facing and internal web pages and applications. Clean, responsive interfaces serving thousands of users every week across multiple campuses.', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop', span: 1, tall: true },
  { title: 'WordPress & Web Team Projects', description: 'Worked with a web team to complete major projects including Hope-365 and other large-scale initiatives. Contributed to training, styling, and a wide range of web needs across the organization.', image: '/images/woodside-hope365.webp', span: 1, tall: true },
  { title: 'Custom Staff Interfaces', description: 'Built custom internal interfaces for staff to complete specific tasks, see targeted insights, and streamline their workflows. Designed to be intuitive so non-technical teams can use them without training.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', span: 1 },
  { title: 'Database Automations', description: 'Designed and implemented automated database workflows that replaced manual processes. Cleaned up and deactivated roughly two-thirds of the database, then built better systems to track real engagement. Some of this work was adopted into MinistryPlatform\'s core product.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', span: 1 },
  { title: 'Power BI Reporting', description: 'Created Power BI dashboards and reports for leadership and staff, turning raw data into clear, actionable visuals. Gave teams across the organization easy access to the metrics that actually matter.', image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop', span: 1 },
  { title: 'Custom Web Integrations', description: 'Built custom web integrations solo and with teams. Connecting systems, automating data flows, and creating tools that fit the way the organization actually works. Full list of projects coming soon.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', span: 2 },
  { title: 'Third-Party Integrations', description: 'Built and facilitated the integration of multiple third-party platforms into MinistryPlatform. Examples include REACH (orphan sponsorship management synced into the database) and Planning Center (automatically checking in worship team members based on their service status in PCO). These integrations eliminated manual data entry and kept systems in sync across the organization.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', span: 1 },
];

export default function WoodsidePage() {
  const [selected, setSelected] = useState<Highlight | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ position: 'relative', height: '50vh', minHeight: '340px', overflow: 'hidden' }}>
        <motion.img
          src="/woodside.jpg"
          alt="Woodside Bible Church"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 24px' }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            Full-Stack Development
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Woodside Bible Church
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            Where I build real products for real people
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
          As Software Development Manager and sole in-house developer at Woodside Bible Church, I{'\u2019'}ve built and maintained the software infrastructure that powers the organization. My largest body of work is Church Hub: a Turborepo monorepo that started as Woodside{'\u2019'}s internal platform and grew into a multi-tenant system deployed across three churches and counting.
        </motion.p>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
            This is where I cut my teeth building real products for real people. I{'\u2019'}ve worked solo and with teams to ship everything from custom staff tools and web integrations to full WordPress projects and data-driven dashboards. Then I lifted the patterns into a reusable platform so other churches could deploy the same work on their own infrastructure.
          </p>
        </motion.div>

        {/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
            CHURCH HUB SPOTLIGHT \u2014 monorepo / abstraction / security / permissions
            \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */}
        <motion.section
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            marginBottom: '80px',
            padding: '48px 36px',
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            position: 'relative',
          }}
        >
          <div style={{ marginBottom: '40px', maxWidth: '780px' }}>
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 700,
              marginBottom: '14px',
            }}>
              Flagship \u00b7 Church Hub
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: 'var(--color-fg)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              paddingTop: '0.08em',
              marginBottom: '18px',
            }}>
              A monorepo for the way churches actually work.
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
              color: 'var(--color-muted)',
              lineHeight: 1.6,
            }}>
              Most of the work below started inside Church Hub. Here{'\u2019'}s how it{'\u2019'}s built, why I built it that way, and the patterns that keep three independent church deployments synchronized without slowing any of them down.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              {
                num: '01',
                kicker: 'Monorepo',
                title: 'Template, Forks, and Client-Owned Infra',
                body: 'Church Hub is a Turborepo workspace built around a single canonical template. Each church forks that template into its own GitHub repo, its own Vercel project, and its own Neon database \u2014 independent infrastructure end-to-end. Upstream fixes flow back through a lightweight backport workflow tracked in UPSTREAM_FIXES.md, so every client benefits from improvements without losing ownership of their stack. Three churches are running on it today: Granger Community, McLean Bible, and Woodside.',
                tags: ['Turborepo', 'Vercel-per-client', 'Neon-per-client', 'Backport workflow'],
              },
              {
                num: '02',
                kicker: 'Abstraction \u00b7 Reusability',
                title: 'Four Shared Packages, One Design Language',
                body: 'The reusable surface lives in four internal packages every client consumes. @church/ministry-platform is a framework-agnostic API client with userId auditing enforced at the TypeScript level (mutations literally don\u2019t compile without it). @church/database holds Zod schemas for both MinistryPlatform baseline tables and church-specific tables, so we never lean on bare interfaces. @church/nextjs-auth wraps NextAuth v5 + MP OAuth with role fetching and admin impersonation. @church/nextjs-ui is the shared Shadcn-based design system plus admin tooling and PWA scaffolding. Anything church-agnostic lives in packages; business logic stays local to each client.',
                tags: ['Zod', 'TypeScript', 'NextAuth v5', 'Shadcn UI', 'PWA-per-app'],
              },
              {
                num: '03',
                kicker: 'Security in the Tools',
                title: 'Audit Trails the Compiler Enforces',
                body: 'Most church platforms either lean entirely on MinistryPlatform\u2019s bundled auth (slow, ugly, limited) or roll their own and lose the audit trail. Church Hub does both, on purpose. Authentication is MP OAuth via NextAuth v5 with PKCE; sessions carry contactId, roles, and access token. Every mutation through the API client requires a userId, typed at compile time, so every create or update lands in MinistryPlatform\u2019s Domain_User audit table \u2014 there\u2019s no path to ship a mutation that bypasses it. A custom embeddable auth widget is in progress to unify session across all *.woodsidebible.org subdomains without forcing every micro-app through MP\u2019s hosted login.',
                tags: ['MP OAuth + PKCE', 'NextAuth v5', 'Enforced userId', 'Domain_User auditing'],
              },
              {
                num: '04',
                kicker: 'Permissions',
                title: 'A Two-Layer Permission Model',
                body: 'MinistryPlatform\u2019s permission model is two things at once: Security Roles for big buckets (staff, admin, volunteer) and User Groups for granular access (Event Coordinators, Worship Team, Campus Pastors). MP is the source of truth for both, but Church Hub also stores app-level permissions in its Neon database \u2014 small grants like "can schedule events" that MP doesn\u2019t model cleanly. The hybrid is faster (no MP roundtrip on every check), cheaper, and gives non-staff users targeted access without making them staff. Sessions pull MP roles on login; protected routes check `await auth()` at the boundary and cross-reference Neon for app-level grants. Two complementary layers, each doing what they\u2019re good at.',
                tags: ['MP Security Roles', 'MP User Groups', 'Neon row-level grants', 'Route-boundary checks'],
              },
            ].map((block) => (
              <article key={block.num} style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  marginBottom: '14px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {block.num}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-muted)',
                    fontWeight: 700,
                  }}>
                    {block.kicker}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--color-fg)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  marginBottom: '12px',
                }}>
                  {block.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'var(--color-muted)',
                  fontWeight: 400,
                  marginBottom: '16px',
                }}>
                  {block.body}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {block.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: '10px',
                      fontWeight: 500,
                      color: 'var(--color-muted)',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      border: '1px solid var(--color-border)',
                      lineHeight: 1.3,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Section heading for the masonry grid */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={fadeUp}
          style={{ marginBottom: '24px' }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700, marginBottom: '8px' }}>
            Other Notable Work
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: 'var(--color-fg)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            paddingTop: '0.08em',
          }}>
            Tools, integrations, and reporting across the organization.
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={fadeUp}
              onClick={() => setSelected(item)}
              className="group"
              style={{
                gridColumn: item.span === 2 ? 'span 2' : 'span 1',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#2A2622',
                minHeight: item.span === 2 ? '320px' : item.tall ? '380px' : '280px',
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.4,
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
                className="group-hover:opacity-50 group-hover:scale-[1.03]"
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(42,38,34,0.95) 0%, rgba(42,38,34,0.4) 60%, rgba(42,38,34,0.2) 100%)',
              }} />

              {/* Large watermark number */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontFamily: 'var(--font-display)',
                fontSize: item.span === 2 ? '8rem' : '6rem',
                color: '#fff',
                opacity: 0.06,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: item.span === 2 ? '32px' : '24px',
              }}>
                <div style={{
                  width: '24px',
                  height: '2px',
                  background: 'var(--color-accent)',
                  marginBottom: '12px',
                }} />
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: item.span === 2 ? 'clamp(1.8rem, 3vw, 2.8rem)' : 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--color-accent)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.5)',
                  maxWidth: item.span === 2 ? '500px' : '100%',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div custom={10} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginTop: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Tech Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Next.js', 'React', 'TypeScript', 'Turborepo', 'NextAuth v5', 'Drizzle', 'Neon', 'Zod', 'Tailwind', 'Shadcn UI', 'SQL Server', 'Power BI', 'REST API', 'MinistryPlatform', 'WordPress'].map((t) => (
              <span key={t} style={{ fontSize: '12px', fontWeight: 400, color: 'var(--color-muted)', padding: '6px 14px', borderRadius: '100px', border: '1px solid var(--color-border)' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detail sheet */}
      <ResponsiveSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        header={selected ? (
          <div className="relative">
            <div style={{ height: '200px' }} className="w-full overflow-hidden">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0" style={{ padding: '24px 28px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }} className="text-white">
                {selected.title}
              </h3>
            </div>
          </div>
        ) : undefined}
        defaultPage="main"
      >
        <SheetPage name="main">
          {selected && (
            <div style={{ padding: '28px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
                {selected.description}
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, fontWeight: 400, color: 'var(--color-border)', marginTop: '24px', fontStyle: 'italic' }}>
                Screenshots and detailed case study coming soon.
              </p>
            </div>
          )}
        </SheetPage>
      </ResponsiveSheet>

      <Footer />
    </div>
  );
}
