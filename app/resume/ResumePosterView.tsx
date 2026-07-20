'use client';

import type { Resume } from './content/types';

// Portfolio-styled resume renderer. Warm paper background, Anton stamps
// under the name (matching the hero badges on app/page.tsx), rust accents,
// italic Playfair summary + pull quote. Designed for two-page Letter output.
//
// Kept separate from ResumeView.tsx (the tight ATS-friendly renderer) so
// each can evolve without entangling the other. The page route picks the
// renderer based on `resume.meta.view`.

const ACCENT = '#D94420';
const INK = '#1F1D1A';
const MUTED = '#5A554C';
const PAPER = '#FFFFFF';        // pure white — print-friendly, no wasted ink
const RULE = '#C8C2B3';

export function ResumePosterView({ resume }: { resume: Resume }) {
  const {
    header,
    summary,
    experience,
    skills,
    education,
    publications,
    awards,
    sideProjects,
    spotlight,
    stamps,
    pullQuote,
    personal,
  } = resume;

  // Generic card section between Skills and Education. `spotlight` carries
  // its own heading; legacy `sideProjects` renders under the old heading.
  const cardSection =
    spotlight ??
    (sideProjects && sideProjects.length > 0
      ? { heading: 'Side Projects', items: sideProjects }
      : null);

  return (
    <>
      {/* Global resets for the resume route. */}
      <style jsx global>{`
        /* @page margins reserve breathing room at top and a margin
           strip at bottom for the running footer. The @bottom-center
           margin box automatically renders contact info inside the
           bottom margin on every printed page — it can't overlap
           body content the way position:fixed could. */
        @page {
          size: letter;
          margin: 0.4in 0.6in 0.6in 0.6in;
          @bottom-center {
            content: "${header.email}  ·  ${header.location}${header.phone ? `  ·  ${header.phone}` : ''}${header.links.map((l) => `  ·  ${l.label}`).join('')}";
            font-family: var(--font-sans);
            font-size: 8.5pt;
            color: ${MUTED};
            letter-spacing: 0.06em;
            border-top: 1px solid ${RULE};
            padding-top: 10px;
            width: 100%;
            vertical-align: top;
          }
        }
        html,
        body {
          background: ${PAPER} !important;
        }
        body > nav,
        body > .paper-grain {
          display: none !important;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <main className="rp-page">
        {/* ════════ Header: name, stamps, headshot ═══════════════════ */}
        <header className="rp-head">
          <div className="rp-head-left">
            <h1 className="rp-name">{header.name}</h1>
            <div className="rp-title">{header.title}</div>
            {stamps && stamps.length > 0 ? (
              <div className="rp-stamps">
                {stamps.map((s) => (
                  <div key={s.label} className="rp-stamp">
                    <div className="rp-stamp-main">{s.label}</div>
                    <div className="rp-stamp-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            ) : null}
            {/* Top contact line. Leads with the portfolio as a real,
                clickable link (the footer's @bottom-center copy can't be
                a hyperlink in the PDF) so a skimming recruiter can jump
                straight to the site. Phone only renders when injected for
                the print/PDF build — see app/resume/page.tsx. */}
            <div className="rp-head-contact">
              {header.links.map((link) => (
                <a key={link.href} href={link.href} className="rp-head-portfolio">
                  {link.label}
                </a>
              ))}
              <span className="rp-head-sep">·</span>
              <span>{header.email}</span>
              {header.phone ? (
                <>
                  <span className="rp-head-sep">·</span>
                  <a href={`tel:${header.phone.replace(/[^\d+]/g, '')}`}>{header.phone}</a>
                </>
              ) : null}
            </div>
          </div>
          {header.headshot ? (
            <div className="rp-headshot">
              <img src={header.headshot} alt={header.name} />
            </div>
          ) : null}
        </header>

        {/* ════════ Summary (optional — some variants omit) ═══════ */}
        {summary ? <section className="rp-summary">{summary}</section> : null}

        {/* ════════ Experience ════════════════════════════════════ */}
        <SectionHead>Experience</SectionHead>
        {experience.map((role, i) => (
          <article key={`${role.company}-${i}`} className="rp-role">
            <div className="rp-role-head">
              <div className="rp-role-left">
                <div className="rp-role-company">{role.company}</div>
                <div className="rp-role-title">{role.title}</div>
              </div>
              <div className="rp-role-meta">
                {role.location ? <div>{role.location}</div> : null}
                <div className="rp-role-dates">{role.dates}</div>
              </div>
            </div>
            {role.bullets.length > 0 ? (
              <ul className="rp-bullets">
                {role.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}

        {/* ════════ Skills (forced to page 2) ════════════════════ */}
        <SectionHead breakBefore>Skills</SectionHead>
        <div className="rp-skills">
          {skills.map((g) => (
            <div key={g.label} className="rp-skill-row">
              <div className="rp-skill-label">{g.label}</div>
              <div className="rp-skill-items">{g.items.join(' · ')}</div>
            </div>
          ))}
        </div>

        {/* ════════ Spotlight cards (poster view exclusive) ════════ */}
        {cardSection && cardSection.items.length > 0 ? (
          <>
            <SectionHead>{cardSection.heading}</SectionHead>
            <div className="rp-side">
              {cardSection.items.map((p) => (
                <div key={p.name} className="rp-side-item">
                  <div className="rp-side-name">{p.name}</div>
                  <div className="rp-side-desc">{p.description}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* ════════ Education ══════════════════════════════════════ */}
        <SectionHead>Education</SectionHead>
        {education.map((ed) => (
          <div key={ed.school} className="rp-edu">
            <div className="rp-role-head">
              <div className="rp-role-left">
                <div className="rp-role-company">{ed.school}</div>
                <div className="rp-role-title">{ed.degree}</div>
              </div>
              <div className="rp-role-meta">
                {ed.honors ? <div>{ed.honors}</div> : null}
                {ed.dates ? <div className="rp-role-dates">{ed.dates}</div> : null}
              </div>
            </div>
            {(ed.details && ed.details.length > 0) ||
            (ed.publications && ed.publications.length > 0) ? (
              <ul className="rp-bullets">
                {ed.details?.map((d, i) => (
                  <li key={`d-${i}`}>{d}</li>
                ))}
                {ed.publications?.map((p) => {
                  const linkEl = p.link ? (
                    <a href={p.link} className="rp-pub-link">
                      {p.linkLabel ?? new URL(p.link).host.replace(/^www\./, '')}
                    </a>
                  ) : null;
                  // hideTitle = render as a single bullet with description
                  // (which carries the venue text) followed by the link.
                  if (p.hideTitle) {
                    return (
                      <li key={`p-${p.title}`}>
                        {p.description}{p.description && linkEl ? ' ' : ''}{linkEl}
                      </li>
                    );
                  }
                  return (
                    <li key={`p-${p.title}`}>
                      <span className="rp-pub-title">{p.title}.</span>{' '}
                      <em>{p.venue}</em>, {p.year}.{' '}
                      {linkEl}
                      {p.description ? (
                        <div className="rp-pub-desc">{p.description}</div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        ))}

        {/* ════════ Publications & Recognition ═════════════════════ */}
        {(publications && publications.length > 0) || (awards && awards.length > 0) ? (
          <>
            <SectionHead>
              {publications?.length && awards?.length
                ? 'Publications & Recognition'
                : publications?.length
                ? 'Publications'
                : 'Recognition'}
            </SectionHead>
            <div className="rp-pubs">
              {publications?.map((p) => (
                <div key={p.title} className="rp-pub">
                  <span className="rp-pub-title">{p.title}.</span>{' '}
                  <span>
                    <em>{p.venue}</em>, {p.year}.
                  </span>{' '}
                  {p.link ? (
                    <a href={p.link} className="rp-pub-link">
                      {p.linkLabel ?? new URL(p.link).host.replace(/^www\./, '')}
                    </a>
                  ) : null}
                </div>
              ))}
              {awards?.map((a) => (
                <div key={a.name} className="rp-pub">
                  <span className="rp-pub-title">{a.name}</span>
                  <span> — {a.org}{a.year ? `, ${a.year}` : ''}.</span>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* ════════ Personal (life context, label/description rows) ═ */}
        {personal && personal.length > 0 ? (
          <>
            <SectionHead>Personal</SectionHead>
            <div className="rp-personal">
              {personal.map((p) => (
                <div key={p.label} className="rp-personal-row">
                  <div className="rp-personal-label">{p.label}</div>
                  <div className="rp-personal-desc">{p.description}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* ════════ Pull quote (poster view close) ═════════════════ */}
        {pullQuote ? (
          <>
            <div className="rp-rule rp-rule-muted" />
            <blockquote className="rp-quote">
              <span className="rp-quote-mark">&ldquo;</span>
              {pullQuote}
              <span className="rp-quote-mark">&rdquo;</span>
            </blockquote>
          </>
        ) : null}

        {/* ════════ Footer: contact info (repeats on every printed page
            via position:fixed inside @media print) ═══════════════════ */}
        <div className="rp-footer-wrapper">
          <div className="rp-rule rp-rule-muted rp-footer-rule" />
          <footer className="rp-footer">
            <span>{header.email}</span>
            <span className="rp-footer-sep">·</span>
            <span>{header.location}</span>
            {header.phone ? (
              <>
                <span className="rp-footer-sep">·</span>
                <a href={`tel:${header.phone.replace(/[^\d+]/g, '')}`}>{header.phone}</a>
              </>
            ) : null}
            {header.links.map((link) => (
              <span key={link.href}>
                <span className="rp-footer-sep">·</span>
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </footer>
        </div>
      </main>

      <style jsx>{`
        .rp-page {
          max-width: 7.5in;
          margin: 0 auto;
          /* Screen padding gives a nice in-browser preview. In print
             mode (@media print below), the @page top/bottom margins
             handle vertical spacing instead. */
          padding: 0.5in 0.6in 0.4in;
          background: ${PAPER};
          color: ${INK};
          font-family: var(--font-sans);
          font-size: 9.75pt;
          line-height: 1.5;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
        }

        /* ─── Header ────────────────────────────────────────────── */
        .rp-head {
          display: flex;
          /* Headshot is now a fixed-size circle, so left column drives
             header height naturally; anchor children to the top. */
          align-items: flex-start;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: 4px;
        }
        .rp-head-left { flex: 1; min-width: 0; }
        .rp-name {
          font-family: var(--font-display);
          font-size: 38pt;
          line-height: 0.95;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          color: ${INK};
          margin: 0 0 5px;
        }
        .rp-title {
          font-size: 9.5pt;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${ACCENT};
          font-weight: 600;
          margin-bottom: 10px;
        }
        /* ─── Top contact line (below stamps) ──────────────────── */
        .rp-head-contact {
          margin-top: 10px;
          font-size: 9pt;
          color: ${MUTED};
          letter-spacing: 0.03em;
        }
        .rp-head-contact a {
          text-decoration: none;
          color: ${MUTED};
        }
        /* Portfolio leads and carries the accent so the eye lands on it. */
        .rp-head-portfolio {
          color: ${ACCENT} !important;
          font-weight: 600;
        }
        .rp-head-sep {
          color: ${RULE};
          margin: 0 7px;
        }

        /* ─── Headshot slot (top-right of header) ───────────────── */
        /* Fixed square + border-radius 50% = perfect circle.
           Sized to roughly match the height of name through stamps. */
        .rp-headshot {
          flex-shrink: 0;
          width: 1.4in;
          height: 1.4in;
          border: 1.5px solid ${ACCENT};
          border-radius: 50%;
          overflow: hidden;
          background: ${PAPER};
        }
        .rp-headshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ─── Footer (contact line) ─────────────────────────────── */
        /* On screen the footer sits at the end of content (normal flow).
           In @media print it's lifted to position:fixed so it repeats at
           the bottom of every page in the generated PDF. */
        .rp-footer-wrapper {
          margin-top: 22px;
        }
        .rp-footer-rule {
          margin: 0 0 8px;
        }
        .rp-footer {
          text-align: center;
          font-size: 9pt;
          color: ${MUTED};
          letter-spacing: 0.05em;
        }
        .rp-footer a {
          color: ${MUTED};
          text-decoration: none;
        }
        .rp-footer-sep {
          color: ${RULE};
          margin: 0 6px;
        }

        /* ─── Stamps ───────────────────────────────────────────── */
        /* Mirrors the hero stamps in app/page.tsx — bordered Anton
           label with a hairline rule above a sans sub-line. */
        .rp-stamps {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .rp-stamp {
          border: 1.5px solid ${ACCENT};
          border-radius: 2px;
          padding: 5px 11px 4px;
          text-align: center;
          color: ${ACCENT};
        }
        .rp-stamp-main {
          font-family: var(--font-display);
          font-size: 10pt;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }
        .rp-stamp-sub {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 6.25pt;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 4px;
          padding-top: 3px;
          border-top: 0.75px solid ${ACCENT};
          line-height: 1;
          white-space: nowrap;
        }

        /* ─── Rules ────────────────────────────────────────────── */
        .rp-rule { height: 1px; margin: 14px 0 12px; }
        .rp-rule-accent { background: ${ACCENT}; height: 1.5px; }
        .rp-rule-muted { background: ${RULE}; }

        /* ─── Summary ──────────────────────────────────────────── */
        .rp-summary {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 11pt;
          line-height: 1.5;
          color: ${INK};
          margin-bottom: 16px;
        }

        /* ─── Role / Education shared head ─────────────────────── */
        .rp-role { margin-bottom: 15px; break-inside: avoid; }
        .rp-role:last-child { margin-bottom: 0; }
        .rp-edu { margin-bottom: 8px; break-inside: avoid; }

        .rp-role-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 4px;
        }
        .rp-role-left { min-width: 0; }
        .rp-role-company {
          font-family: var(--font-display);
          font-size: 13pt;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: ${INK};
          line-height: 1.05;
        }
        .rp-role-title {
          font-size: 10pt;
          color: ${INK};
          font-weight: 500;
          margin-top: 1px;
        }
        .rp-role-meta {
          text-align: right;
          font-size: 9pt;
          color: ${MUTED};
          line-height: 1.4;
          flex-shrink: 0;
        }
        .rp-role-dates {
          font-weight: 600;
          color: ${ACCENT};
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 8.5pt;
          margin-top: 1px;
        }

        .rp-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .rp-bullets li {
          position: relative;
          padding-left: 13px;
          margin-bottom: 5px;
        }
        .rp-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 4px;
          height: 4px;
          background: ${ACCENT};
          border-radius: 50%;
        }

        /* ─── Skills ───────────────────────────────────────────── */
        .rp-skills {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 6px;
        }
        .rp-skill-row {
          display: grid;
          grid-template-columns: 1.65in 1fr;
          gap: 14px;
          align-items: baseline;
        }
        .rp-skill-label {
          font-family: var(--font-display);
          font-size: 10pt;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .rp-skill-items {
          font-size: 9.5pt;
          color: ${INK};
        }

        /* ─── Personal (label/description rows, same shape as skills) ─ */
        .rp-personal {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 6px;
        }
        .rp-personal-row {
          display: grid;
          grid-template-columns: 1.65in 1fr;
          gap: 14px;
          align-items: baseline;
          break-inside: avoid;
        }
        .rp-personal-label {
          font-family: var(--font-display);
          font-size: 10pt;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${ACCENT};
        }
        .rp-personal-desc {
          font-size: 9.5pt;
          color: ${INK};
        }

        /* ─── Side project mini-cards ───────────────────────────── */
        .rp-side {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 6px;
        }
        .rp-side-item {
          display: grid;
          grid-template-columns: 1.65in 1fr;
          gap: 14px;
          align-items: baseline;
          break-inside: avoid;
        }
        .rp-side-name {
          font-family: var(--font-display);
          font-size: 11pt;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: ${INK};
        }
        .rp-side-desc {
          font-size: 9.5pt;
          color: ${INK};
        }

        /* ─── Publications (standalone section, when used) ──────── */
        .rp-pubs { display: flex; flex-direction: column; gap: 4px; }
        .rp-pub {
          font-size: 9.5pt;
          color: ${INK};
          line-height: 1.5;
          break-inside: avoid;
        }
        .rp-pub-title { font-weight: 700; }
        .rp-pub-desc {
          margin-top: 3px;
          font-size: 9.25pt;
          color: ${INK};
          line-height: 1.5;
          font-weight: 400;
        }
        .rp-pub-link {
          color: ${ACCENT};
          text-decoration: none;
          font-weight: 600;
          /* Don't shatter a short label like "ResearchGate" mid-word. The
             standard view uses break-all because it sometimes shows a
             raw URL; the poster view always uses a clean linkLabel. */
          word-break: normal;
          white-space: nowrap;
        }

        /* ─── Pull quote close ─────────────────────────────────── */
        .rp-quote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 12pt;
          line-height: 1.5;
          color: ${INK};
          text-align: center;
          margin: 4px auto 0;
          max-width: 5.6in;
          padding: 0 0.4in;
          break-inside: avoid;
        }
        .rp-quote-mark {
          color: ${ACCENT};
          font-size: 1.4em;
          line-height: 0;
          position: relative;
          top: 0.18em;
          margin: 0 0.06em;
        }

        @media print {
          .rp-page {
            max-width: none;
            margin: 0;
            /* @page margins now own all four sides in print. */
            padding: 0;
          }
          /* In-flow footer is screen-only; @bottom-center handles print. */
          .rp-footer-wrapper { display: none; }
          /* Stop "peer-reviewed" and similar from wrapping mid-word. */
          .rp-summary { hyphens: none; }
          .rp-role, .rp-edu, .rp-pub, .rp-side-item, .rp-quote {
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}

// Anton section heading with a rust underline rule. Stays glued to its
// first item so we never orphan a heading at the bottom of a page.
// Pass `breakBefore` to force the section to start on a new page.
function SectionHead({
  children,
  breakBefore,
}: {
  children: React.ReactNode;
  breakBefore?: boolean;
}) {
  return (
    <>
      <h2
        className={
          'rp-section-head' + (breakBefore ? ' rp-section-head-break' : '')
        }
      >
        {children}
      </h2>
      <style jsx>{`
        .rp-section-head {
          font-family: var(--font-display);
          font-size: 14pt;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: ${INK};
          margin: 14px 0 7px;
          padding-bottom: 3px;
          border-bottom: 1.5px solid ${ACCENT};
          line-height: 1;
          break-after: avoid;
          page-break-after: avoid;
        }
        .rp-section-head-break {
          break-before: page;
          page-break-before: always;
          /* When forced to top of a new page, drop the leading margin. */
          margin-top: 0;
        }
      `}</style>
    </>
  );
}
