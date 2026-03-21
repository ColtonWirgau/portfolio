'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CircleImage({ src, alt, size = 180 }: { src: string; alt: string; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      background: 'var(--color-border)',
    }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

const P_STYLE: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 400,
  color: 'var(--color-muted)',
  lineHeight: 1.8,
};

const BOLD: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--color-fg)',
};

export function MyStory() {
  return (
    <div style={{ position: 'relative' }}>
      {/* ─── 1. HERO ROW ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        marginBottom: '100px',
      }}>
        {/* Left: headline */}
        <FadeIn>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 10vw, 9rem)',
              color: 'var(--color-accent)',
              lineHeight: 0.9,
              letterSpacing: '-0.08em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              WebkitTextStroke: '5px var(--color-accent)',
              paintOrder: 'stroke fill',
              transform: 'scaleX(0.85)',
              transformOrigin: 'left',
            }}>
              My<br />Story.
            </h2>
            <div style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-accent)',
              marginBottom: '28px',
            }} />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--color-fg)',
              lineHeight: 1.6,
              maxWidth: '380px',
            }}>
              Small town kid, big curiosity. From football fields to{' '}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>building things that matter</span>.
            </p>
          </div>
        </FadeIn>

        {/* Right: hero collage image */}
        <FadeIn delay={0.2}>
          <div style={{
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--color-border)',
            position: 'relative',
          }}>
            <img
              src="/images/story-hero.jpg"
              alt="Colton through the years"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-muted)',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Collage placeholder
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ─── 2. EARLY LIFE ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
        marginBottom: '80px',
      }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={P_STYLE}>
              I grew up in a small river town in Michigan called Algonac. I was in the International Baccalaureate program, graduated third in my class with a 4.2 GPA, and was captain of the football team. I also ran track and ended up as the program{"\u2019"}s all-time leading scorer and a Hall of Famer.
            </p>
            <p style={{
              ...P_STYLE,
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontStyle: 'italic',
              color: 'var(--color-fg)',
            }}>
              But even then, I liked <span style={BOLD}>building things</span> just as much as competing.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingTop: '20px' }}>
            <CircleImage src="/images/story-roots.jpg" alt="Algonac roots" size={200} />
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Algonac roots
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ─── 3. FAITH ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
        marginBottom: '80px',
      }}>
        <div /> {/* empty left */}
        <FadeIn>
          <p style={P_STYLE}>
            I also grew up in a church my great grandfather started. Faith has always been a central part of my life. It shaped how I see people, how I lead, and how I believe people should be treated. I care a lot about treating people with kindness, with grace, and with the same patience that{"\u2019"}s been shown to me. That doesn{"\u2019"}t stop at church. It carries into my work, my teams, and how I build things.
          </p>
        </FadeIn>
      </div>

      {/* ─── 4. COLLEGE ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
        marginBottom: '80px',
      }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={P_STYLE}>
              That mindset followed me to the University of Detroit Mercy, where I studied software engineering and ran track. I chose software engineering over computer science because I knew I didn{"\u2019"}t just want to write code. I wanted to lead people and build things that actually help them.
            </p>
            <p style={P_STYLE}>
              During college, I worked as a tutor at the learning center. It started as helping students, but it turned into rebuilding their entire system. Scheduling, time tracking, reporting. Everything had been manual. I moved it online and <span style={BOLD}>dragged the whole operation out of the stone age</span>.
            </p>
          </div>
        </FadeIn>
        <div /> {/* empty right */}
      </div>

      {/* ─── 5. MUSIC / WORSHIP ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        marginBottom: '80px',
      }}>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <CircleImage src="/images/story-music.jpg" alt="Leading worship" size={220} />
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Leading worship
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={P_STYLE}>
            At the same time, I was leading worship at my church, playing music, running events, and somehow balancing all of it. I still love that side of my life. Music, creativity, and working with people have always been a big part of who I am.
          </p>
        </FadeIn>
      </div>

      {/* ─── 6. PROFESSIONAL GROWTH ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start',
        marginBottom: '80px',
      }}>
        <div /> {/* empty left */}
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={P_STYLE}>
              After graduating, Woodside didn{"\u2019"}t want to lose me, so they created a role for me. I stepped into web development, database work, and solving problems that nobody else had time to touch. One of my first projects was cleaning up our database. I ended up deactivating about two thirds of it and building better systems to track real engagement. Some of that work eventually made its way into the main MinistryPlatform product.
            </p>
            <p style={P_STYLE}>
              From there, I started my own business. I saw the same problems popping up across churches everywhere, so I began helping teams build better tools, better experiences, and better systems. A lot of what I do now lives at the intersection of product thinking, UX, and real-world ministry needs.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ─── 7. PULL QUOTE ─── */}
      <FadeIn>
        <div style={{ marginBottom: '80px', maxWidth: '700px' }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
            fontStyle: 'italic',
            color: 'var(--color-fg)',
            lineHeight: 1.6,
          }}>
            I care a lot about clarity. Not overwhelming people. Saying just enough, at the right time. <span style={BOLD}>Good design should feel obvious.</span>
          </p>
        </div>
      </FadeIn>

      {/* ─── 8. FAMILY ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
      }}>
        <FadeIn>
          <p style={P_STYLE}>
            These days, I live in Clarkston, Michigan with my wife Sarah, our two kids, and two very different dogs. When I{"\u2019"}m not building something, I{"\u2019"}m probably playing music, flying with my wife, or chasing kids around the house.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <CircleImage src="/images/story-family.jpg" alt="The Wirgau family" size={220} />
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              The Wirgaus
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
