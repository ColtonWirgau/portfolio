'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { InkCloseButton, useInkExit } from '@/components/InkExit';
import { ScreenshotLightbox } from '@/components/ScreenshotLightbox';

/* ── Events, opportunities and care ───────────────────────────────────
   The case study behind the "Recent work" section on /work/woodside.
   Same navy and green world as the parent page. The story: nobody asked
   for this, it came out of years of meetings, and it fixed organization,
   eligibility, finance, security and logistics in one model. */
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

// Every screenshot on the page, in reading order, so the lightbox can
// step through all of them.
const SHOTS = [
  { src: '/images/woodside-sr-staff.webp', caption: 'Student Winter Retreats, staff view: one roster for a weekend that used to be three records in two systems.' },
  { src: '/images/woodside-wc-signup.webp', caption: 'What Matters sign-up: the household is right there, and anyone who can’t come is told why.' },
  { src: '/images/woodside-wc-breakouts-mobile.webp', caption: 'Breakout picks with live seat counts. A full session can’t be chosen.' },
  { src: '/images/woodside-sr-rooming.webp', caption: 'Rooming for a weekend at Timber Wolf Lake. Over-capacity rooms and grade mismatches flag themselves.' },
  { src: '/images/woodside-wc-hero.webp', caption: 'What Matters, the Woodside women’s conference site, while registration is open.' },
  { src: '/images/woodside-wc-live-mobile.webp', caption: 'The same site on the day of the conference: the button becomes today’s schedule.' },
  { src: '/images/woodside-sr-hero.webp', caption: 'Student Winter Retreats: three weekends, one season page.' },
  { src: '/images/woodside-sr-live-mobile.webp', caption: 'During a retreat weekend the page is for parents: what is happening now, and what is next.' },
  { src: '/images/woodside-events-finder.webp', caption: 'Event finder, live on woodsidebible.org/events.' },
  { src: '/images/woodside-serve-finder.webp', caption: 'Serve finder, live on woodsidebible.org/serve.' },
  { src: '/images/woodside-care-hero.webp', caption: 'Care offers: a Thanksgiving box anyone can ask for.' },
  { src: '/images/woodside-care-list.webp', caption: 'Every place offering a box, with what is open and when the rest open.' },
];
const shotIndex = (src: string) => SHOTS.findIndex((s) => s.src === src);

const PILLARS = [
  {
    kicker: 'Organization',
    heading: 'One event, with every way in.',
    body: 'We used to build five events for one weekend because each group needed different questions: students, leaders, work crew, the band, staff. Families saw five listings and guessed. Staff merged five rosters by hand. Now an event has ways in. Each way in carries its own price, its own questions and its own open and close dates, and the roster is one list again.',
    shots: ['/images/woodside-sr-staff.webp'],
  },
  {
    kicker: 'Eligibility',
    heading: 'Rules that fit the people they’re about.',
    body: 'Who can register is a set of rules: age, gender, grade, staff, a current child-protection clearance, leading a group of a certain kind, or a hand-picked list. Rules combine with AND or OR, and a way in can skip a single rule without skipping the rest. The same rules decide who gets a discount. When somebody can’t come, the page says why next to their name, and a rule they could fix shows as locked instead of disappearing.',
    shots: ['/images/woodside-wc-signup.webp'],
  },
  {
    kicker: 'Finance',
    heading: 'Everything costs what it actually costs.',
    body: 'For years, promo codes did the work of pricing. A leader rate was a code, a staff rate was a code, and codes got shared, so the books never matched what anything really cost. Now each way in has its real price, and a promo is only ever a promo. Discounts have no code box. The server checks the rules, applies anything a person qualifies for, and shows them the full price struck through, so a discount can’t be typed in by somebody it wasn’t meant for. Free and paid seats are kept on separate invoices so nothing gets swept up by mistake, and a discount can never take a line below zero. Our finance team had been asking for some version of this for years, and it does more than they asked for.',
    shots: [],
  },
  {
    kicker: 'Security and privacy',
    heading: 'Every rule is checked again on the server.',
    body: 'Registration is a public endpoint, so the browser only ever asks, and anything ambiguous fails closed. Signing up a friend asks only for what you type in; nothing is read from their record. Receipts go to the person who paid. Prayer requests stay private until the person who wrote them says otherwise, and that is enforced in the database as well as in the UI.',
    shots: [],
  },
  {
    kicker: 'Logistics',
    heading: 'The parts that used to live in spreadsheets.',
    body: 'Breakout sessions have live seat counts, and a full session can’t be picked. Rooming boards flag over-capacity rooms and grade mismatches on their own, and roommate requests typed as free text get matched to real people. Buses have manifests, the run of show has a row for every audience, and group placements stopped pretending to be products in a shop. Volunteers can sign up for an event that has no registration at all.',
    shots: ['/images/woodside-wc-breakouts-mobile.webp', '/images/woodside-sr-rooming.webp'],
  },
];

function Shot({ src, onOpen, mobile = false }: { src: string; onOpen: (i: number) => void; mobile?: boolean }) {
  const i = shotIndex(src);
  const shot = SHOTS[i];
  return (
    <motion.figure variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} style={{ margin: 0 }}>
      <button
        type="button"
        onClick={() => onOpen(i)}
        aria-label={`Enlarge: ${shot.caption}`}
        style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'zoom-in' }}
      >
        <img
          src={src}
          alt={shot.caption}
          loading="lazy"
          style={{ display: 'block', width: '100%', borderRadius: mobile ? '22px' : '10px', border: `1px solid ${BORDER}`, boxShadow: '0 24px 60px -30px rgba(0,0,0,0.6)' }}
        />
      </button>
      <figcaption style={{ fontSize: '12.5px', color: MUTED, marginTop: '12px', lineHeight: 1.6 }}>{shot.caption}</figcaption>
    </motion.figure>
  );
}

function Kicker({ children, color = GREEN }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 800, marginBottom: '14px' }}>{children}</div>;
}

const h2Style: React.CSSProperties = { fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.7rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '22px', maxWidth: '760px' };
const pStyle: React.CSSProperties = { fontSize: '15.5px', lineHeight: 1.9, color: BODY, maxWidth: '680px' };
const section: React.CSSProperties = { padding: 'clamp(52px, 8vw, 92px) 24px', borderTop: `1px solid ${BORDER}` };

export default function WoodsideEventsPage() {
  const { exitWithInk, inkOverlay } = useInkExit('/work/woodside');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = (i: number) => setLightboxIndex(i);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: NAVY, color: INK, overflowX: 'clip' }}>
      <style>{`body > nav { display: none !important; }`}</style>

      <InkCloseButton onClick={exitWithInk} color={GREEN} background="rgba(22,32,43,0.55)" border="rgba(98,187,70,0.45)" />
      {inkOverlay}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ScreenshotLightbox shots={SHOTS} index={lightboxIndex} onNavigate={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(110px, 16vh, 170px) 24px clamp(48px, 8vh, 80px)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link href="/work/woodside" style={{ display: 'inline-block', fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GREEN, fontWeight: 800, marginBottom: '18px', textDecoration: 'none' }}>
              Woodside Bible Church · Events, Serve and Care
            </Link>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(2.6rem, 7.4vw, 5.6rem)', color: INK, lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '22px', maxWidth: '900px' }}>
            Registration that finally makes sense
          </motion.h1>
          <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.38 }} style={{ width: '88px', height: '3px', background: GREEN, transformOrigin: 'left', marginBottom: '24px' }} />
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
            style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)', color: BODY, maxWidth: '700px', lineHeight: 1.6 }}>
            Nobody asked for this. Over years of meetings I kept hearing the same problems from ministry, finance and staff, and in the fall of 2026 I rebuilt how Woodside does events, serving and care so those problems stop coming up. It touches organization, eligibility, finance, security and logistics, and to the person signing up it just feels easy.
          </motion.p>
        </div>
      </section>

      {/* ── Where it came from ───────────────────────────────── */}
      <section style={section}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <Kicker>Where it came from</Kicker>
            <h2 style={h2Style}>Workarounds had become the process.</h2>
            <p style={{ ...pStyle, marginBottom: '20px' }}>
              One retreat meant several events because each group needed its own questions. Leader and staff pricing ran on promo codes, and promo codes got passed around. Age and gender limits lived in the event description and got enforced by whoever noticed. Rooming, buses and medical forms lived in spreadsheets that someone rebuilt every year.
            </p>
            <p style={pStyle}>
              None of it was anybody’s fault. The tools only had one shape, and every team bent their work to fit it. I took what I’d heard in those conversations over the years and designed the shape they actually needed, then built it on top of MinistryPlatform so the data still lives in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The pillars ──────────────────────────────────────── */}
      {PILLARS.map((p, i) => (
        <section key={p.kicker} style={section}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '860px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'transparent', WebkitTextStroke: `1.4px ${GREEN}`, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN, fontWeight: 800 }}>{p.kicker}</span>
              </div>
              <h2 style={h2Style}>{p.heading}</h2>
              <p style={pStyle}>{p.body}</p>
            </motion.div>
            {p.shots.length === 1 && (
              <div style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
                <Shot src={p.shots[0]} onOpen={open} />
              </div>
            )}
            {p.shots.length === 2 && (
              <div className="we-pair we-pair-phone-first" style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
                <div className="we-phone"><Shot src={p.shots[0]} onOpen={open} mobile /></div>
                <div style={{ minWidth: 0 }}><Shot src={p.shots[1]} onOpen={open} /></div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── Two sites built on it ────────────────────────────── */}
      <section style={{ ...section, background: 'linear-gradient(to bottom, rgba(98,187,70,0.05), transparent 30%)' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '760px', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <Kicker>Built on it</Kicker>
            <h2 style={h2Style}>Two event sites that change with the calendar.</h2>
            <p style={pStyle}>
              Each big event gets one page, and registration is a sheet on that page instead of a separate site. The page knows whether it’s selling seats, counting down, running the day or looking back, and it changes to match.
            </p>
          </motion.div>

          <SiteBlock
            title="What Matters · Women’s Conference"
            body="A two-day conference at the Troy campus. While registration is open, the page sells seats. Once you’re in, it shows your ticket and your breakout and lunch choices. On the day, the main button turns into the schedule, and afterward the page becomes a recap. The conference is set up as a reusable shape, so next year’s event gets a new instance and a new palette instead of a rebuild."
            desktop="/images/woodside-wc-hero.webp"
            mobile="/images/woodside-wc-live-mobile.webp"
            onOpen={open}
          />
          <div style={{ height: 'clamp(48px, 7vw, 80px)' }} />
          <SiteBlock
            title="Student Winter Retreats"
            body="Three February weekends at camp, with hundreds of students, leaders, work crew and a band. Families get a single page: each student’s status, the weekend they’re on, what to pack, buses and medical. Students leave their phones at home during the weekend, so while a retreat is running the page is for parents, showing what’s happening now and what’s next. Staff get the tools that used to be spreadsheets: the full roster, medical, rooming, buses, dining seatings and the run of show."
            desktop="/images/woodside-sr-hero.webp"
            mobile="/images/woodside-sr-live-mobile.webp"
            onOpen={open}
          />
        </div>
      </section>

      {/* ── Live on woodsidebible.org ────────────────────────── */}
      <section style={section}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '760px', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
            <Kicker>Live on woodsidebible.org</Kicker>
            <h2 style={h2Style}>Events, serve and care, everywhere on the site.</h2>
            <p style={pStyle}>
              The same model runs the widgets on the main site. Events and serve opportunities share one finder pattern across every campus. Care offers, like a Thanksgiving box, work the same way from the other side: pick the place nearest you, see what’s open, and ask in a couple of taps. They sort by distance without sending your zip code anywhere.
            </p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '24px' }}>
            <Shot src="/images/woodside-events-finder.webp" onOpen={open} />
            <Shot src="/images/woodside-serve-finder.webp" onOpen={open} />
          </div>
          <div style={{ marginTop: '24px', display: 'grid', gap: '24px' }}>
            <Shot src="/images/woodside-care-hero.webp" onOpen={open} />
            <Shot src="/images/woodside-care-list.webp" onOpen={open} />
          </div>
        </div>
      </section>

      {/* ── Leadership ───────────────────────────────────────── */}
      <section style={section}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <Kicker>Why it matters</Kicker>
            <h2 style={h2Style}>I listened for years, then built what we needed.</h2>
            <p style={{ ...pStyle, marginBottom: '20px' }}>
              No ticket asked for ways in, auto-applied discounts or a rooming board. They came from paying attention in rooms where people described the workaround instead of the problem. My job was to hear the problem underneath, design one model that solved several of them at once, and bring the event, finance and ministry teams along without asking them to change how they think.
            </p>
            <p style={pStyle}>
              It’s also the most front-end work I’ve shipped at Woodside: sheets that work on a phone, pages that change with the calendar, and a sign-up that explains itself. All of it stays reconciled with MinistryPlatform, which remains the one source of truth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px, 12vw, 140px) 24px', borderTop: `1px solid ${BORDER}`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 42% 46% at 50% 46%, rgba(98,187,70,0.14) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <motion.h2 variants={reveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          style={{ position: 'relative', fontFamily: 'var(--font-sans)', fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3.2rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', textTransform: 'uppercase', maxWidth: '780px', margin: '0 auto 40px' }}>
          Signing up should be<br /><span style={{ color: GREEN }}>the easy part.</span>
        </motion.h2>
        <motion.div variants={reveal} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={exitWithInk} style={{ fontSize: '14px', fontWeight: 800, color: NAVY, background: GREEN, padding: '13px 30px', borderRadius: '100px', border: 'none', letterSpacing: '0.02em', cursor: 'pointer', fontFamily: 'inherit' }}>
            Back to Woodside
          </button>
        </motion.div>
      </section>

      <style>{`
        .we-pair { display: grid; grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr); gap: 28px; align-items: start; }
        .we-pair-phone-first { grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr); }
        .we-phone { width: 100%; max-width: 300px; justify-self: center; }
        @media (max-width: 720px) { .we-pair, .we-pair-phone-first { grid-template-columns: 1fr; } }
      `}</style>
      <Footer />
    </div>
  );
}

function SiteBlock({ title, body, desktop, mobile, onOpen }: { title: string; body: string; desktop: string; mobile: string; onOpen: (i: number) => void }) {
  return (
    <div>
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} style={{ maxWidth: '760px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', fontWeight: 800, color: INK, letterSpacing: '-0.01em', marginBottom: '14px' }}>{title}</h3>
        <p style={{ fontSize: '15px', lineHeight: 1.85, color: BODY }}>{body}</p>
      </motion.div>
      <div className="we-pair">
        <div style={{ minWidth: 0 }}><Shot src={desktop} onOpen={onOpen} /></div>
        <div className="we-phone"><Shot src={mobile} onOpen={onOpen} mobile /></div>
      </div>
    </div>
  );
}
