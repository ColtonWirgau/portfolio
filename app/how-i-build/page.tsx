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
    heading: 'Good design should feel right.',
    lead: 'If someone needs a tutorial to use what I built, I did it wrong. When Instagram ships an update, nobody sits through a walkthrough; you open the app, keep doing what you came to do, and it all just makes sense. I want everything I build to work like that.',
    principles: [
      { p: 'Clarity over cleverness.', d: 'Say just enough, at the right time. A clever interaction that needs explaining loses to a plain one that doesn’t.' },
      { p: 'Borrow what already works.', d: 'Before I invent an interaction, I look at how the apps people live in every day solved the same problem. They’ve spent years working out what’s intuitive, scalable, and good-looking, and users show up already trained. It’s not always the right answer, but it’s rarely a bad place to start.' },
    ],
    demos: ['optimistic', 'wallOfText', 'mobile', 'motion'],
  },
  {
    kicker: 'Frontend',
    heading: 'Boring, typed, and consistent beats clever.',
    lead: 'My default is Next.js, React, and TypeScript, everywhere, strict. The goal isn’t the fanciest code; it’s code that future-me can change without fear.',
    principles: [
      { p: 'Keep state local and derived.', d: 'Data fetched on the server and passed down beats a pile of client state. I reach for global state only when something is genuinely shared.' },
      { p: 'A shared, abstracted design system.', d: 'Build the component library once, use it everywhere, and let one change ripple through the whole product. On bigger projects consistency carries extra weight: when every screen works the same way, people already know how to use the feature you shipped yesterday.' },
      { p: 'Performance is a feature.', d: 'Lazy-load images, ship what’s needed, and measure before optimizing.' },
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
    kicker: 'Content & the people in it',
    heading: 'The best software still fails on bad content.',
    lead: 'A product often lives or dies on what people put into it, not the code. So I treat content as part of what I build: give people the right fields, set sensible limits, and stay close to the people filling it in.',
    principles: [
      { p: 'Talk to the people using it.', d: 'When something is being used in a way I didn’t intend, I ask about it instead of assuming. Half the time I find a feature I’m missing; the other half I can show a cleaner way. People make mistakes, and some are just better at a thing than others.' },
    ],
    demos: ['formTypes', 'rules'],
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
    demos: ['constraint'],
  },
  {
    kicker: 'Performance & feel',
    heading: 'Fast is a feeling you engineer.',
    lead: 'A lot of how an app feels comes down to unglamorous decisions about where work happens and what the user sees while it happens. I sweat these details, because they’re the difference between something that feels instant and something that feels like it’s thinking.',
    principles: [],
    demos: ['cheapest', 'skeleton', 'cache'],
  },
  {
    kicker: 'Defaults & preferences',
    heading: 'Own it.',
    lead: 'As the sole technical decision-maker, I optimize for leverage and longevity: build what’s core, buy the commodity, and keep the whole thing maintainable by a small team (sometimes a team of one).',
    principles: [
      { p: 'Build vs. buy, honestly.', d: 'Buy the commodity; build the workflows and data that are the actual point. Own your core so you’re never renting your own operations.' },
      { p: 'Test the risky seams.', d: 'Integrations, money, and auth get real coverage (Playwright for the flows that matter). I don’t chase a coverage number for its own sake.' },
    ],
    demos: ['monorepo'],
  },
  {
    kicker: 'AI in the workflow',
    heading: 'AI is the fastest team I’ve ever led.',
    lead: 'Every line still ships with my name on it, though. I was doing applied NLP before the LLM era (published in 2017), so I never treated AI as magic: a fast team still needs a manager. When I use it well, it collapses the gap between deciding something and shipping it. When I get lazy with it, I get confident nonsense back. And it scales past me: I once set up a former MinistryPlatform CFO, who had never written code, with an AI dev environment, and today he builds and runs his own product full time.',
    principles: [
      { p: 'Delegate like it’s staff.', d: 'I hand AI whole tasks the way I’d hand them to a contractor: context, constraints, pointers to existing patterns, and a definition of done. Then I review the output like a PR.' },
      { p: 'Skip the mockup.', d: 'Building is so fast now that I don’t mock screens up in Illustrator anymore; I prototype in the real code. If there’s existing schema I work off it from the jump, and if there isn’t I fake the data and tweak the UI until it feels right. That work usually drives the schema too: more than once the screen showed me that what I assumed was one-to-one is really one-to-many, before a single table existed.' },
      { p: 'Build the piece the model is missing.', d: 'The tooling changes monthly and I stay on the edge of it. When a model struggles at a task, I write a skill for it; I was packaging skills before LLMs started reaching for them on their own.' },
      { p: 'Write it down and share it.', d: 'Conventions, guardrails, and the skills I build live in the repo, not in my head. Sharing them with my team has let people ship things they never would have attempted.' },
      { p: 'Context follows my UI rule: say just enough.', d: 'A CLAUDE.md stays small enough to actually get read (a couple hundred lines, tops) and points to reference files for depth, because a wall of text says nothing to a model either.' },
      { p: 'Know where models are confidently wrong.', d: 'Sarcasm and slang broke my classifiers in 2017, and plausible-but-wrong code ships from LLMs today for the same reason. So the risky seams get tests, the output gets read, and I stay the one accountable.' },
    ],
    demos: ['aiBrief', 'aiReview', 'aiPlaybook'],
  },
  {
    kicker: 'Leadership',
    heading: 'Lead by serving.',
    lead: 'I minored in leadership, then got the practical degree: years directing worship teams of volunteers who didn’t have to show up, then leading contractors, cross-department projects, and vendor partnerships as the technical decision-maker. My model is servant leadership: my job is to absorb the ambiguity, clear the blockers, hand people real ownership, and take responsibility for whatever happens.',
    principles: [
      { p: 'Direction over supervision.', d: 'With contractors and collaborators I write the spec, define done, and review the work honestly, and I stay out of the way in between. I check the work at the seams instead of looking over anyone’s shoulder.' },
      { p: 'Influence without authority.', d: 'Nobody at MinistryPlatform reported to me. I still worked directly with their engineers on problems in their product, and a framework I built was adopted into their core. Getting that done with no title over anyone is the same muscle as leading a team.' },
      { p: 'Sunday always comes.', d: 'Worship directing is shipping live with a volunteer team: recruit, rehearse, delegate, handle the Thursday dropout, and deliver at 9 AM sharp every week. Deadlines that can’t slip and people you can’t pay taught me more about leadership than anything since.' },
    ],
    demos: ['translate', 'unblock'],
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
            style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '18px' }}>
            Software Development
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 8vw, 6rem)', color: 'var(--color-fg)', lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '28px' }}>
            The way I think<br />about building.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2.4vw, 1.75rem)', color: 'var(--color-fg)', lineHeight: 1.5, maxWidth: '680px' }}>
            Here are the opinions and preferences I’ve built up over many years of shipping code, leading teams, and solving problems.
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
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', color: 'var(--color-fg)', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '760px', margin: '0 auto 36px', textWrap: 'balance' }}>
          A great product is a thousand good decisions, compounding.
        </motion.h2>
        <motion.div variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={exitWithInk} style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-bg)', background: 'var(--color-accent)', padding: '13px 30px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
            My Work
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
