'use client';

import { MoreHorizontal, X, Eye, Download } from 'lucide-react';
import { ResponsiveSheet, SheetPage } from './ResponsiveSheet';
import { MorphMenu, MorphMenuItem } from './MorphMenu';

const PAPER_URL = 'https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification';
const PDF_URL = '/sylvester-emotion-classification.pdf';

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
      headerControl={<PaperMenu />}
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
            <Meta label="Published" value="April 2017" />
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
        </div>
      </SheetPage>
    </ResponsiveSheet>
  );
}

/** The paper "more" control: a single glass surface that morphs from a kebab
    circle into a View / Download menu (ported MorphMenu). Replaces the sheet's
    default close button; the sheet still closes via backdrop click and Escape. */
function PaperMenu() {
  return (
    <MorphMenu
      label="Paper options"
      header="Paper"
      trigger={(open) => (
        <span style={{ position: 'relative', width: '16px', height: '16px', display: 'block' }}>
          <MoreHorizontal
            className="h-4 w-4"
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: open ? 'scale(0) rotate(90deg)' : 'none',
              opacity: open ? 0 : 1,
            }}
          />
          <X
            className="h-4 w-4"
            style={{
              position: 'absolute',
              inset: 0,
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: open ? 'none' : 'scale(0) rotate(-90deg)',
              opacity: open ? 1 : 0,
            }}
          />
        </span>
      )}
    >
      <MorphMenuItem icon={<Eye className="h-4 w-4" />} href={PAPER_URL} external>
        View paper
      </MorphMenuItem>
      <MorphMenuItem icon={<Download className="h-4 w-4" />} href={PDF_URL} download>
        Download PDF
      </MorphMenuItem>
    </MorphMenu>
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
