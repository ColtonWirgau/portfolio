import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'A WebSocket Privacy Bug in Sleeper · Notes',
  description: 'How I found a competitive-info leak in Sleeper’s real-time layer while building Dynastly, and how I’d fix it.',
  robots: { index: false, follow: false },
};

export default function SleeperWebSocketLeakPost() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 24px 60px' }}>

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-accent)',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            marginBottom: '40px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            marginBottom: '16px',
          }}>
            Notes · Engineering
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            color: 'var(--color-fg)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            paddingTop: '0.08em',
          }}>
            A WebSocket Privacy Bug in Sleeper
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
          }}>
            How I found a competitive-info leak in Sleeper{'’'}s real-time layer while building Dynastly, and how I{'’'}d fix it.
          </p>
          <div style={{
            fontSize: '12px',
            color: 'var(--color-muted)',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: '20px',
          }}>
            <span>Draft</span>
            <span>·</span>
            <span>Unlisted</span>
          </div>
        </header>

        {/* Body - placeholders Colton will fill in */}
        <div style={{
          fontSize: '17px',
          lineHeight: 1.75,
          color: 'var(--color-fg)',
        }}>
          <Section heading="The setup">
            <p>
              I built Dynastly to give myself a unified view of my dynasty fantasy football league: player valuations, league rosters, and a multi-team trade builder that doesn{'’'}t exist on the platforms I use. To make it feel snappy, I wanted to hook into Sleeper{'’'}s real-time layer so the app reacted to league activity instantly.
            </p>
            <p>
              {/* TODO: short paragraph on what Sleeper exposes - the public REST API, the WebSocket they ship to their own client, what their app uses it for. */}
            </p>
          </Section>

          <Section heading="What I found">
            <p>
              {/* TODO: describe the discovery. The WebSocket pushes full event payloads to any connected client, including trade events for trades the connected user is not party to. The client receives the data but their UI simply chooses not to render it. */}
            </p>
            <p>
              {/* TODO: a redacted screenshot or anonymized payload sketch goes here. */}
            </p>
          </Section>

          <Section heading="Why it matters">
            <p>
              {/* TODO: this isn’t a credential / PII issue. It is a competitive-information leak: a knowledgeable user (or anyone who builds an app like Dynastly) can see trade activity in their league that the platform deliberately hides until the trade is finalized. In a dynasty league where information edge is real money, this is a meaningful unfairness. */}
            </p>
          </Section>

          <Section heading="The architecture problem">
            <p>
              {/* TODO: name the underlying pattern. The server is treating UI-side filtering as authorization. The real fix is to enforce authorization at the broadcast layer, not the render layer. */}
            </p>
            <p>
              {/* TODO: contrast "fat events" (entire payload pushed to every connected client) with "ID-only events" (push a small notification with an event ID, then have the client request the detail through an authenticated REST endpoint that performs row-level permission checks). */}
            </p>
          </Section>

          <Section heading="How I would fix it">
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>{/* TODO: short-term - server-side filter on the broadcast pipeline so the payload sent to each socket subscriber is scoped to the rooms / leagues / participants that subscriber is authorized for. */}</li>
              <li>{/* TODO: medium-term - switch event payloads to ID-only and fetch detail via an authenticated endpoint. The detail endpoint performs the same row-level checks as the REST API surface. */}</li>
              <li>{/* TODO: long-term - collapse the duplicate auth logic between REST and socket layers behind a single permission service, so the same predicates apply regardless of transport. */}</li>
            </ol>
          </Section>

          <Section heading="Disclosure">
            <p>
              {/* TODO: short note on responsible disclosure timeline once that is decided. */}
            </p>
          </Section>
        </div>
      </article>

      <Footer />
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)',
        color: 'var(--color-accent)',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        marginBottom: '16px',
        paddingTop: '0.08em',
      }}>
        {heading}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {children}
      </div>
    </section>
  );
}
