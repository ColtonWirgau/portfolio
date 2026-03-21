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

function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={{
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
      }}>
        {label}
      </span>
      {sub && (
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'var(--color-border)',
          marginLeft: '12px',
        }}>
          {sub}
        </span>
      )}
      <div style={{ width: '24px', height: '1px', background: 'var(--color-border)', marginTop: '8px' }} />
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

        <FadeIn delay={0.2}>
          <div style={{
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--color-border)',
          }}>
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=750&fit=crop"
              alt="Colton through the years"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
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
            <SectionLabel label="The Beginning" sub="Algonac, MI" />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', paddingTop: '40px' }}>
            <CircleImage src="https://images.unsplash.com/photo-1461896836934-bd45ba8fcb0a?w=400&h=400&fit=crop" alt="Small town roots" size={200} />
            <CircleImage src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=400&fit=crop" alt="Track and field" size={140} />
          </div>
        </FadeIn>
      </div>

      {/* ─── 3. FAITH ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        marginBottom: '80px',
      }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircleImage src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=400&fit=crop" alt="Church roots" size={180} />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            <SectionLabel label="Faith & Foundation" />
            <p style={P_STYLE}>
              I also grew up in a church my great grandfather started. Faith has always been a central part of my life. It shaped how I see people, how I lead, and how I believe people should be treated. I care a lot about treating people with kindness, with grace, and with the same patience that{"\u2019"}s been shown to me. That doesn{"\u2019"}t stop at church. It carries into my work, my teams, and how I build things.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ─── Decorative accent line ─── */}
      <FadeIn>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '80px',
          maxWidth: '300px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
          <svg width="12" height="28" viewBox="0 0 341.34 852.51" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.15 }}>
            <path fill="var(--color-fg)" d="M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
        </div>
      </FadeIn>

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
            <SectionLabel label="College Years" sub="University of Detroit Mercy" />
            <p style={P_STYLE}>
              That mindset followed me to the University of Detroit Mercy, where I studied software engineering with a leadership minor and ran track. I chose software engineering over computer science because I knew I didn{"\u2019"}t just want to write code. I wanted to lead people and build things that actually help them. Along the way, I got published for my work in AI. Our team built <span style={BOLD}>Sylvester</span>, a program that learned the language of Twitter through automatic annotation and classification, interpreting tweets in real time to determine how people feel about any given subject. It was published in <span style={{ fontStyle: 'italic' }}>New Trends in Information Technology</span> in 2017.
            </p>
            <p style={P_STYLE}>
              During college, I worked as a tutor at the learning center. It started as helping students, but it turned into rebuilding their entire system. Scheduling, time tracking, reporting. Everything had been manual. I moved it online and <span style={BOLD}>dragged the whole operation out of the stone age</span>.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', paddingTop: '40px' }}>
            <CircleImage src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=400&fit=crop" alt="University campus" size={200} />
            <CircleImage src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=400&fit=crop" alt="Coding" size={120} />
          </div>
        </FadeIn>
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
            <CircleImage src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop" alt="Leading worship" size={240} />
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}>
              Music & Ministry
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div>
            <SectionLabel label="Creative Side" />
            <p style={P_STYLE}>
              At the same time, I was leading worship at my church, playing music, running events, and somehow balancing all of it. I still love that side of my life. Music, creativity, and working with people have always been a big part of who I am.
            </p>
          </div>
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
        <FadeIn delay={0.1}>
          <div>
            <SectionLabel label="Career" sub="Woodside & Beyond" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={P_STYLE}>
                After graduating, Woodside didn{"\u2019"}t want to lose me, so they created a role for me. I stepped into web development, database work, and solving problems that nobody else had time to touch. One of my first projects was cleaning up our database. I ended up deactivating about two thirds of it and building better systems to track real engagement. Some of that work eventually made its way into the main MinistryPlatform product.
              </p>
              <p style={P_STYLE}>
                From there, I started my own business. I saw the same problems popping up across churches everywhere, so I began helping teams build better tools, better experiences, and better systems. A lot of what I do now lives at the intersection of product thinking, UX, and real-world ministry needs.
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', paddingTop: '40px' }}>
            <CircleImage src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop" alt="Building products" size={180} />
            <CircleImage src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop" alt="Working with teams" size={130} />
          </div>
        </FadeIn>
      </div>

      {/* ─── 7. PULL QUOTE ─── */}
      <FadeIn>
        <div style={{
          marginBottom: '80px',
          padding: '40px 0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
            fontStyle: 'italic',
            color: 'var(--color-fg)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
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
          <div>
            <SectionLabel label="Today" sub="Clarkston, MI" />
            <p style={P_STYLE}>
              These days, I live in Clarkston, Michigan with my wife Sarah, our two kids, and two very different dogs. When I{"\u2019"}m not building something, I{"\u2019"}m probably playing music, flying with my wife, or chasing kids around the house.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
            <CircleImage src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop" alt="Family life" size={200} />
            <CircleImage src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop" alt="Dogs" size={120} />
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
