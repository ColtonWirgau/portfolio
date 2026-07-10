'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

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
type Section = { kicker: string; heading: string; lead: string; principles: Principle[] };

const SECTIONS: Section[] = [
  {
    kicker: 'UI / UX',
    heading: 'Good design should feel obvious.',
    lead: 'If someone needs a tutorial to use what I built, I did it wrong. Most of my users are non-technical ministry staff, and they are the bar: if a busy person can sit down and just get it, the design is done.',
    principles: [
      { p: 'Clarity over cleverness.', d: 'Say just enough, at the right time. A clever interaction that needs explaining loses to a plain one that doesn’t.' },
      { p: 'Show one thing, hide the rest.', d: 'Progressive disclosure by default. Lead with the decision in front of the person; let them drill in for the rest. Sheets and detail views instead of walls of controls.' },
      { p: 'Mobile is not a smaller desktop.', d: 'I design the phone experience as its own first-class thing: styled bottom sheets, thumb-reachable controls, layouts that reflow instead of shrink.' },
      { p: 'Motion should mean something.', d: 'Animation earns its place when it explains where something came from or where it went. If it’s only decoration, it’s noise.' },
      { p: 'Snappy by default: optimistic UI.', d: 'The interface shouldn’t sit and wait on the network to feel alive. Add something from a modal and the modal closes and the item shows up immediately, just in a pending state. When the API comes back 200 I settle it into place with a toast or a small microinteraction; if it fails, I roll it back honestly. Speed people can feel beats technically-correct-but-laggy every time.' },
    ],
  },
  {
    kicker: 'Frontend',
    heading: 'Boring, typed, and consistent beats clever.',
    lead: 'My default is Next.js, React, and TypeScript, everywhere, strict. The goal isn’t the fanciest code; it’s code that future-me can change without fear.',
    principles: [
      { p: 'Abstract on the third copy, not the first.', d: 'I let duplication sit until the pattern is real. Premature abstractions are harder to undo than a little repetition.' },
      { p: 'Keep state local and derived.', d: 'Data fetched on the server and passed down beats a pile of client state. I reach for global state only when something is genuinely shared.' },
      { p: 'Tailwind plus a shared design system.', d: 'A consistent component library (Shadcn-based) for the 90%, and a plain inline style when a one-off is clearer than fighting classes.' },
      { p: 'Performance is a feature, not a pass at the end.', d: 'Lazy-load images, ship what’s needed, and measure before optimizing.' },
    ],
  },
  {
    kicker: 'Backend',
    heading: 'Put the rules where they can’t be skipped.',
    lead: 'I keep route handlers thin and push real logic into typed, reusable clients and packages. The best guardrail is one the compiler enforces, not one that lives in a wiki nobody reads.',
    principles: [
      { p: 'Let types enforce what matters.', d: 'In our platform a mutation literally won’t compile without a userId, so every write lands in the audit trail. There’s no “remember to log it”; you can’t not.' },
      { p: 'Validate at the boundary.', d: 'Zod schemas on anything coming from outside. I don’t trust shapes and I don’t lean on bare interfaces for external data.' },
      { p: 'One source of truth.', d: 'When systems have to talk, I sync so data lives in one place and nobody re-keys it. Humans shouldn’t be the integration layer.' },
      { p: 'Do slow, flaky work out of band.', d: 'Anything that can fail or drag stays off the request path so the person waiting doesn’t pay for it.' },
    ],
  },
  {
    kicker: 'Database',
    heading: 'The data model is the product.',
    lead: 'Get the model right and everything downstream gets easier; get it wrong and you pay for it forever. I came up doing heavy SQL on a messy inherited database, so I don’t treat data as an afterthought.',
    principles: [
      { p: 'Right tool per job.', d: 'SQL Server (MinistryPlatform) as the source of truth for the domain; Postgres (Neon) for app-level concerns. I don’t force one to be the other.' },
      { p: 'Normalize by default, denormalize on purpose.', d: 'I only denormalize for a read path that actually hurts, and I write down why. I’ve built nested-JSON frameworks when the relational shape fought the UI.' },
      { p: 'Clean data is a feature.', d: 'I once deactivated roughly two-thirds of a database to make the rest trustworthy. Reports are only as honest as the data under them.' },
      { p: 'Migrations are code.', d: 'Reviewed, reversible, and never run by hand-copying SQL into a prod window.' },
    ],
  },
  {
    kicker: 'Where things belong',
    heading: 'I’d rather push a decision down than enforce it by hope.',
    lead: 'A lot of engineering is deciding which layer owns a problem. My rule: put each concern where it can’t be forgotten, and keep the layers above it dumb.',
    principles: [
      { p: 'Validation at the edge, authorization at the boundary.', d: 'Bad input dies before it reaches logic; every protected route checks auth at the door, not three functions deep.' },
      { p: 'Business rules in shared packages.', d: 'Anything cross-cutting lives in one typed place. Presentation stays thin and swappable.' },
      { p: 'Transform near the data.', d: 'Shaping happens close to where data comes from, not smeared across components that then disagree.' },
      { p: 'Cache close to the read, and only what you can invalidate.', d: 'A cache you can’t confidently bust is a future bug wearing a performance costume.' },
    ],
  },
  {
    kicker: 'Defaults & preferences',
    heading: 'Own the thing that’s actually yours.',
    lead: 'As the sole technical decision-maker, I optimize for leverage and longevity: build what’s core, buy the commodity, and keep the whole thing maintainable by a small team (sometimes a team of one).',
    principles: [
      { p: 'Monorepo, by default.', d: 'Turborepo, shared packages for anything reusable, business logic local to each app. Independent deploys so one client’s change never puts another at risk.' },
      { p: 'Build vs. buy, honestly.', d: 'Buy the commodity; build the workflows and data that are the actual point. Own your core so you’re never renting your own operations.' },
      { p: 'Test the risky seams.', d: 'Integrations, money, and auth get real coverage (Playwright for the flows that matter). I don’t chase a coverage number for its own sake.' },
      { p: 'AI is leverage, not an excuse to stop thinking.', d: 'I use modern LLMs heavily to move faster, but I own every decision and read every line. I was doing applied NLP before the LLM era; I know where the models are confidently wrong.' },
    ],
  },
];

export default function HowIBuildPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-fg)' }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 14vh, 150px) 24px clamp(40px, 6vh, 64px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none', textTransform: 'uppercase', marginBottom: 'clamp(36px, 7vh, 72px)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
              Back
            </Link>
          </motion.div>
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
          <Link href="/#work" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-bg)', background: 'var(--color-accent)', padding: '13px 26px', borderRadius: '100px', textDecoration: 'none' }}>
            See the work
          </Link>
          <Link href="/#about" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-accent)', padding: '13px 26px', borderRadius: '100px', textDecoration: 'none', border: '1px solid var(--color-border)' }}>
            Back to start
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
