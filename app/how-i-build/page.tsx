'use client';

import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { InkCloseButton, useInkExit } from '@/components/InkExit';
import { HowIBuildDemo, type DemoId } from '@/components/HowIBuildDemos';

/* How I Build: Colton's engineering philosophy, in his own voice. Uses
   the main site theme (paper + accent), not a project brand. This is a
   first draft of the substance; the voice is meant to be edited. */

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.05, ease: 'easeOut' as const },
  }),
};

type Principle = { p: string; d: string };
type Section = { kicker: string; heading: string; lead: string; principles: Principle[]; demos?: DemoId[] };

const SECTIONS: Section[] = [
  {
    kicker: 'UI / UX',
    heading: 'Good design should feel obvious.',
    lead: 'If someone needs a tutorial to use what I built, I did it wrong. Most of my users are non-technical ministry staff, and they are the bar: if a busy person can sit down and just get it, the design is done.',
    principles: [
      { p: 'Clarity over cleverness.', d: 'Say just enough, at the right time. A clever interaction that needs explaining loses to a plain one that doesn’t.' },
    ],
    demos: ['optimistic', 'wallOfText', 'mobile', 'motion'],
  },
  {
    kicker: 'Frontend',
    heading: 'Boring, typed, and consistent beats clever.',
    lead: 'My default is Next.js, React, and TypeScript, everywhere, strict. The goal isn’t the fanciest code; it’s code that future-me can change without fear.',
    principles: [
      { p: 'Keep state local and derived.', d: 'Data fetched on the server and passed down beats a pile of client state. I reach for global state only when something is genuinely shared.' },
      { p: 'Tailwind plus a shared design system.', d: 'A consistent component library (Shadcn-based) for the 90%, and a plain inline style when a one-off is clearer than fighting classes.' },
      { p: 'Performance is a feature, not a pass at the end.', d: 'Lazy-load images, ship what’s needed, and measure before optimizing.' },
    ],
    demos: ['abstract'],
  },
  {
    kicker: 'Backend',
    heading: 'Put the rules where they can’t be skipped.',
    lead: 'I keep route handlers thin and push real logic into typed, reusable clients and packages. The best guardrail is one the compiler enforces, not one that lives in a wiki nobody reads.',
    principles: [
      { p: 'One source of truth.', d: 'When systems have to talk, I sync so data lives in one place and nobody re-keys it. Humans shouldn’t be the integration layer.' },
      { p: 'Do slow, flaky work out of band.', d: 'Anything that can fail or drag stays off the request path so the person waiting doesn’t pay for it.' },
    ],
    demos: ['typesEnforce', 'validate'],
  },
  {
    kicker: 'Database',
    heading: 'The data model is the product.',
    lead: 'Get the model right and everything downstream gets easier; get it wrong and you pay for it forever. I came up doing heavy SQL on a messy inherited database, so I don’t treat data as an afterthought.',
    principles: [
      { p: 'Right tool per job.', d: 'SQL Server (MinistryPlatform) as the source of truth for the domain; Postgres (Neon) for app-level concerns. I don’t force one to be the other.' },
      { p: 'Normalize by default, denormalize on purpose.', d: 'I only denormalize for a read path that actually hurts, and I write down why. I’ve built nested-JSON frameworks when the relational shape fought the UI.' },
      { p: 'Migrations are code.', d: 'Reviewed, reversible, and never run by hand-copying SQL into a prod window.' },
    ],
    demos: ['cleanData'],
  },
  {
    kicker: 'Where things belong',
    heading: 'I’d rather push a decision down than enforce it by hope.',
    lead: 'A lot of engineering is deciding which layer owns a problem. My rule: put each concern where it can’t be forgotten, and keep the layers above it dumb.',
    principles: [
      { p: 'Validation at the edge, authorization at the boundary.', d: 'Bad input dies before it reaches logic; every protected route checks auth at the door, not three functions deep.' },
      { p: 'Transform near the data.', d: 'Shaping happens close to where data comes from, not smeared across components that then disagree.' },
      { p: 'Cache close to the read, and only what you can invalidate.', d: 'A cache you can’t confidently bust is a future bug wearing a performance costume.' },
    ],
    demos: ['sharedRule'],
  },
  {
    kicker: 'Performance & feel',
    heading: 'Fast is a feeling, and you engineer it.',
    lead: 'A lot of how an app feels comes down to unglamorous decisions about where work happens and what the user sees while it happens. I sweat these details, because they’re the difference between something that feels instant and something that feels like it’s thinking.',
    principles: [],
    demos: ['cheapest', 'skeleton', 'cache'],
  },
  {
    kicker: 'Defaults & preferences',
    heading: 'Own the thing that’s actually yours.',
    lead: 'As the sole technical decision-maker, I optimize for leverage and longevity: build what’s core, buy the commodity, and keep the whole thing maintainable by a small team (sometimes a team of one).',
    principles: [
      { p: 'Build vs. buy, honestly.', d: 'Buy the commodity; build the workflows and data that are the actual point. Own your core so you’re never renting your own operations.' },
      { p: 'Test the risky seams.', d: 'Integrations, money, and auth get real coverage (Playwright for the flows that matter). I don’t chase a coverage number for its own sake.' },
      { p: 'AI is leverage, not an excuse to stop thinking.', d: 'I use modern LLMs heavily to move faster, but I own every decision and read every line. I was doing applied NLP before the LLM era; I know where the models are confidently wrong.' },
    ],
    demos: ['monorepo'],
  },
];

export default function HowIBuildPage() {
  const { exitWithInk, inkOverlay } = useInkExit('/#work');
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      {/* Like the other morph-opened pages, this one is an overlay: no site
          nav, just the fixed close control and the ink flood back out. */}
      <style>{`body > nav { display: none !important; }`}</style>

      <InkCloseButton onClick={exitWithInk} color="var(--color-accent)" background="rgba(213,210,200,0.6)" border="var(--color-border)" />
      {inkOverlay}

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 14vh, 150px) 24px clamp(40px, 6vh, 64px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
            style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700, marginBottom: '18px' }}>
            How I Build
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 8vw, 6rem)', color: 'var(--color-fg)', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '28px' }}>
            The way I think<br />about building.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.4vw, 1.75rem)', color: 'var(--color-fg)', lineHeight: 1.5, maxWidth: '680px' }}>
            Not a skills list. This is how I actually make decisions: my defaults, my opinions, and where I’ve landed after years as the person who owns every one of them.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42 }}
            style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--color-muted)', maxWidth: '620px', marginTop: '28px' }}>
            The throughline under all of it: software should make something easier for a real person. Everything below is in service of that.
          </motion.p>
        </div>
      </section>

      {/* ── Domain sections ──────────────────────────────────── */}
      {SECTIONS.map((s) => (
        <section key={s.kicker} style={{ padding: 'clamp(48px, 8vw, 88px) 24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'clamp(28px, 4vw, 44px)' }}>
              <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '720px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '16px' }}>{s.kicker}</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 4.6vw, 3rem)', color: 'var(--color-fg)', lineHeight: 1.02, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '20px' }}>{s.heading}</h2>
                <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-muted)' }}>{s.lead}</p>
              </motion.div>

              {s.demos && s.demos.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {s.demos.map((d) => <HowIBuildDemo key={d} id={d} />)}
                </div>
              )}

              {s.principles.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px', border: '1px solid var(--color-border)', borderRadius: '10px', overflow: 'hidden', background: 'var(--color-border)' }}>
                  {s.principles.map((pr, i) => (
                    <motion.div key={pr.p} variants={reveal} custom={i % 2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                      style={{ background: 'var(--color-bg)', padding: 'clamp(22px, 3vw, 30px)' }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '7px', fontSize: '7px' }}>●</span>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-fg)', lineHeight: 1.4, marginBottom: '8px' }}>{pr.p}</p>
                          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-muted)' }}>{pr.d}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* ── Closing ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(64px, 11vw, 130px) 24px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', color: 'var(--color-fg)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '760px', margin: '0 auto 36px' }}>
          The best code is the code<br />future-me can change without fear.
        </motion.h2>
        <motion.div variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={exitWithInk} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-bg)', background: 'var(--color-accent)', padding: '13px 26px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            See the work
          </button>
          <button type="button" onClick={(e) => exitWithInk(e, '/#about')} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-accent)', padding: '13px 26px', borderRadius: '100px', background: 'transparent', border: '1px solid var(--color-border)', cursor: 'pointer', fontFamily: 'inherit' }}>
            Back to start
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
