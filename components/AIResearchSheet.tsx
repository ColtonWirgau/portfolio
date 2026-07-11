'use client';

import { ResponsiveSheet, SheetPage } from './ResponsiveSheet';

interface AIResearchSheetProps {
  open: boolean;
  onClose: () => void;
}

export function AIResearchSheet({ open, onClose }: AIResearchSheetProps) {
  return (
    <ResponsiveSheet
      open={open}
      onClose={onClose}
      maxWidth="max-w-5xl"
      header={({ collapsed }) => (
        <div style={{ background: '#2A2622', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
            <div style={{
              position: 'absolute',
              top: '-40px',
              right: '-20px',
              fontFamily: 'var(--font-display)',
              fontSize: '20rem',
              color: 'var(--color-accent)',
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}>
              2017
            </div>
          </div>

          <div style={{ position: 'relative', padding: collapsed ? '14px 28px 12px' : '36px 28px 32px', zIndex: 1, transition: 'padding 0.3s ease' }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: collapsed ? 0 : '14px',
              maxHeight: collapsed ? 0 : '20px',
              opacity: collapsed ? 0 : 1,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}>
              Peer-Reviewed · Published 2017
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: collapsed ? '1.5rem' : 'clamp(3rem, 7vw, 4.5rem)',
              color: '#fff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: collapsed ? 0 : '12px',
              paddingTop: '0.08em',
              transition: 'all 0.3s ease',
            }}>
              Sylvester
            </h2>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '17px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              maxWidth: '520px',
              maxHeight: collapsed ? 0 : '60px',
              opacity: collapsed ? 0 : 1,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}>
              An Approach to Emotion Classification
            </p>
          </div>
        </div>
      )}
    >
      <SheetPage name="main">
        <div style={{ padding: '28px' }}>
          {/* Metadata strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '20px',
            paddingBottom: '24px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <Meta label="Year" value="2017" />
            <Meta label="Venue" value="New Trends in Information Technology" />
            <Meta label="Area" value="NLP · Real-time Classification" />
          </div>

          {/* Abstract */}
          <Section heading="The Idea">
            <p>
              Sylvester was a collaborative research project I worked on during undergrad at the University of Detroit Mercy. It learned the language of Twitter through automatic annotation and classification, then interpreted tweets in real time to determine how people felt emotionally about any given subject, based on the current shape of online language rather than a fixed lexicon.
            </p>
          </Section>

          {/* Why it matters */}
          <Section heading="Why it Still Matters">
            <p style={{ marginBottom: '14px' }}>
              I built AI before you could use AI to build code. That predates the entire vibe-coding era. Working on Sylvester meant wrestling with the messy reality of unstructured language at scale: tokenization, drift, sarcasm, slang, ambiguity. The instincts I developed then are the foundation of what{'’'}s now called context engineering.
            </p>
            <p>
              AI{'’'}s capabilities have expanded faster than anything I{'’'}ve worked in, and I{'’'}ve watched every iteration from inside the work, not just as a user. If your team is trying to figure out where AI actually fits in your product, I{'’'}m the person who has been doing this since before it was easy.
            </p>
          </Section>

          {/* Tags */}
          <Section heading="Topics">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['NLP', 'Sentiment Analysis', 'Real-time Classification', 'Twitter', 'Automatic Annotation'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: 'var(--color-muted)',
                    padding: '5px 12px',
                    borderRadius: '100px',
                    border: '1px solid var(--color-border)',
                    lineHeight: 1.3,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Section>

          {/* Citation */}
          <div style={{
            marginTop: '36px',
            padding: '20px',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid var(--color-accent)',
          }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '8px',
            }}>
              Citation
            </div>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontStyle: 'italic',
              lineHeight: 1.6,
              color: 'var(--color-fg)',
              marginBottom: '16px',
            }}>
              {'“'}Sylvester: An Approach to Emotion Classification.{'”'} <em>New Trends in Information Technology</em>, 2017.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              <a
                href="https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
              >
                Read the paper on ResearchGate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              <a
                href="/sylvester-emotion-classification.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
              >
                Download the PDF
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </SheetPage>
    </ResponsiveSheet>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--color-fg)',
        lineHeight: 1.4,
      }}>
        {value}
      </div>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '28px' }}>
      <h3 style={{
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '12px',
        fontWeight: 600,
      }}>
        {heading}
      </h3>
      <div style={{
        fontSize: '14px',
        lineHeight: 1.7,
        color: 'var(--color-fg)',
      }}>
        {children}
      </div>
    </section>
  );
}
