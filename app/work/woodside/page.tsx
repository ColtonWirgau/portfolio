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
  { title: 'WordPress & Web Team Projects', description: 'Worked with a web team to complete major projects including Hope-365 and other large-scale initiatives. Contributed to training, styling, and a wide range of web needs across the organization.', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop', span: 1, tall: true },
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
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
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

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 100px' }}>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '40px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          Back to Work
        </Link>

        <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.7, marginBottom: '40px' }}>
          As the sole in-house developer at Woodside Bible Church, I{'\u2019'}ve built and maintained the software infrastructure that powers the organization. From interactive dashboards and automated database workflows to public-facing web pages and reporting tools.
        </motion.p>

        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}
          style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '15px', lineHeight: 1.8, fontWeight: 400, color: 'var(--color-muted)' }}>
            This is where I cut my teeth building real products for real people. I{'\u2019'}ve worked solo and with teams to ship everything from custom staff tools and web integrations to full WordPress projects and data-driven dashboards. I also help with training, styling, and whatever else the organization needs on the tech side.
          </p>
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
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  WebkitTextStroke: item.span === 2 ? '2px var(--color-accent)' : '1.5px var(--color-accent)',
                  paintOrder: 'stroke fill',
                  transform: 'scaleX(0.85) skewX(-2deg)',
                  transformOrigin: 'left',
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
            {['Next.js', 'React', 'SQL Server', 'Power BI', 'REST API', 'MinistryPlatform', 'WordPress', 'CSS/SCSS'].map((t) => (
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
