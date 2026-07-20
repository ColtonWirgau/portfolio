'use client';

import type { Resume } from './content/types';

// All resume styling — screen + print — lives in this component.
// Designed to render cleanly to US Letter via the browser print dialog
// (Cmd/Ctrl+P) or via `npm run resume:pdf` (Playwright).
//
// Design notes:
//   - Single column for ATS friendliness.
//   - Anton (the portfolio display face) for the name and section headings.
//   - Playfair Display italic for the summary, echoing the site.
//   - Montserrat for body. All loaded already from app/globals.css.
//   - Rust accent (#D94420) used sparingly: name, section rules, bullet
//     markers. Black-on-white otherwise so print legibility is unimpeachable.

const ACCENT = '#D94420';
const INK = '#1A1A1A';
const MUTED = '#58524A';
const RULE = '#C8C3B6';

export function ResumeView({ resume }: { resume: Resume }) {
  const { header, summary, experience, skills, education, publications, awards } = resume;

  return (
    <>
      {/* Global resets for the resume route: kill site chrome and force a
          white print canvas regardless of the surrounding layout. */}
      <style jsx global>{`
        @page {
          size: letter;
          margin: 0;
        }
        html,
        body {
          background: #ffffff !important;
        }
        /* Hide the site nav + paper-grain overlay on the resume route. */
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

      <main className="resume-page">
        {/* Header ----------------------------------------------------- */}
        <header className="resume-head">
          <div className="resume-head-main">
            <h1 className="resume-name">{header.name}</h1>
            <div className="resume-title">{header.title}</div>
          </div>
          <div className="resume-contact">
            {header.links.map((link) => (
              <div key={link.href} className="resume-contact-portfolio">
                <a href={link.href}>{link.label}</a>
              </div>
            ))}
            <div>{header.email}</div>
            {header.phone ? (
              <div>
                <a href={`tel:${header.phone.replace(/[^\d+]/g, '')}`}>{header.phone}</a>
              </div>
            ) : null}
            <div>{header.location}</div>
          </div>
        </header>
        <div className="resume-rule" />

        {/* Summary ---------------------------------------------------- */}
        <section className="resume-summary">{summary}</section>

        {/* Experience ------------------------------------------------- */}
        <Section heading="Experience">
          {experience.map((role, i) => (
            <article key={`${role.company}-${i}`} className="role">
              <div className="role-head">
                <div className="role-company">
                  <span className="role-company-name">{role.company}</span>
                  <span className="role-title"> · {role.title}</span>
                </div>
                <div className="role-meta">
                  {role.location ? <span>{role.location} · </span> : null}
                  <span>{role.dates}</span>
                </div>
              </div>
              <ul className="role-bullets">
                {role.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </Section>

        {/* Skills ----------------------------------------------------- */}
        <Section heading="Skills">
          <div className="skills">
            {skills.map((group) => (
              <div key={group.label} className="skill-row">
                <div className="skill-label">{group.label}</div>
                <div className="skill-items">{group.items.join(' · ')}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Education -------------------------------------------------- */}
        <Section heading="Education">
          {education.map((ed) => (
            <div key={ed.school} className="edu">
              <div className="role-head">
                <div className="role-company">
                  <span className="role-company-name">{ed.school}</span>
                  <span className="role-title"> · {ed.degree}</span>
                  {ed.honors ? (
                    <span className="role-title"> · {ed.honors}</span>
                  ) : null}
                </div>
                {ed.dates ? <div className="role-meta">{ed.dates}</div> : null}
              </div>
              {(ed.details && ed.details.length > 0) ||
              (ed.publications && ed.publications.length > 0) ? (
                <ul className="role-bullets">
                  {ed.details?.map((d, i) => (
                    <li key={`d-${i}`}>{d}</li>
                  ))}
                  {ed.publications?.map((p) => (
                    <li key={`p-${p.title}`}>
                      <span className="edu-pub-title">{p.title}.</span>{' '}
                      <em>{p.venue}</em>, {p.year}.{' '}
                      {p.link ? (
                        <a href={p.link} className="edu-pub-link">
                          {p.linkLabel ?? new URL(p.link).host.replace(/^www\./, '')}
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </Section>

        {/* Publications & Recognition --------------------------------- */}
        {(publications && publications.length > 0) || (awards && awards.length > 0) ? (
          <Section
            heading={
              publications?.length && awards?.length
                ? 'Publications & Recognition'
                : publications?.length
                ? 'Publications'
                : 'Recognition'
            }
          >
            {publications?.map((p) => (
              <div key={p.title} className="pub">
                <span className="pub-title">{p.title}.</span>{' '}
                <span className="pub-venue">
                  <em>{p.venue}</em>, {p.year}.
                </span>{' '}
                {p.link ? (
                  <a href={p.link} className="pub-link">
                    {p.linkLabel ?? new URL(p.link).host.replace(/^www\./, '')}
                  </a>
                ) : null}
              </div>
            ))}
            {awards?.map((a) => (
              <div key={a.name} className="pub">
                <span className="pub-title">{a.name}</span>
                <span className="pub-venue"> — {a.org}{a.year ? `, ${a.year}` : ''}.</span>
              </div>
            ))}
          </Section>
        ) : null}

        {/* Variant metadata lives in resume.meta.tailoredFor — intentionally
            not rendered on the printed page so the recipient sees a clean
            document, not a self-referential "tailored for" line. */}
      </main>

      <style jsx>{`
        .resume-page {
          /* US Letter inside CSS pixels at 96dpi: 816 x 1056. We give the
             on-screen view a generous width and let print sizing take over
             at the @page level. */
          max-width: 7.5in;
          margin: 0 auto;
          padding: 0.35in 0.5in 0.25in;
          background: #ffffff;
          color: ${INK};
          font-family: var(--font-sans);
          font-size: 9pt;
          line-height: 1.36;
          font-weight: 400;
          -webkit-font-smoothing: antialiased;
        }

        .resume-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 6px;
        }
        .resume-head-main { flex: 1; }
        .resume-name {
          font-family: var(--font-display);
          font-size: 28pt;
          line-height: 1;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: ${INK};
          margin: 0 0 3px;
        }
        .resume-title {
          font-size: 9pt;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${ACCENT};
          font-weight: 600;
        }
        .resume-contact {
          text-align: right;
          font-size: 8.5pt;
          line-height: 1.5;
          color: ${MUTED};
        }
        .resume-contact a {
          color: ${MUTED};
          text-decoration: none;
        }
        /* Portfolio leads the contact block and carries the accent so a
           skimming recruiter's eye lands on it first. */
        .resume-contact-portfolio a {
          color: ${ACCENT};
          font-weight: 600;
        }
        .resume-rule {
          height: 1.5px;
          background: ${ACCENT};
          margin: 4px 0 10px;
        }

        .resume-summary {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 9.5pt;
          line-height: 1.4;
          color: ${INK};
          margin-bottom: 8px;
        }

        .role {
          margin-bottom: 6px;
          break-inside: avoid;
        }
        .role:last-child { margin-bottom: 0; }
        .edu { margin-bottom: 4px; break-inside: avoid; }

        .role-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 3px;
        }
        .role-company {
          font-size: 9.75pt;
        }
        .role-company-name {
          font-weight: 700;
          color: ${INK};
        }
        .role-title {
          color: ${INK};
          font-weight: 500;
        }
        .role-meta {
          font-size: 8.5pt;
          color: ${MUTED};
          white-space: nowrap;
          flex-shrink: 0;
        }
        .role-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .role-bullets li {
          position: relative;
          padding-left: 11px;
          margin-bottom: 2px;
        }
        .role-bullets li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 3.5px;
          height: 3.5px;
          background: ${ACCENT};
          border-radius: 50%;
        }

        .skills {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .skill-row {
          display: grid;
          grid-template-columns: 1.45in 1fr;
          gap: 14px;
          align-items: baseline;
        }
        .skill-label {
          font-size: 8pt;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${MUTED};
        }
        .skill-items {
          font-size: 9pt;
          color: ${INK};
        }

        .edu-pub-title { font-weight: 600; }
        .edu-pub-link {
          color: ${ACCENT};
          text-decoration: none;
          font-weight: 600;
        }

        .pub {
          font-size: 9pt;
          color: ${INK};
          margin-bottom: 2px;
          line-height: 1.4;
        }
        .pub-title { font-weight: 600; }
        .pub-venue { color: ${INK}; }
        .pub-link {
          color: ${ACCENT};
          text-decoration: none;
          word-break: break-all;
        }

        /* Print-specific tweaks. We avoid splitting a single role or
           education entry across pages, but we DO let sections flow,
           so small sections like Education can finish at the bottom
           of a page instead of being kicked to a near-empty next page. */
        @media print {
          .resume-page {
            max-width: none;
            margin: 0;
          }
          .role, .edu, .pub { break-inside: avoid; }
        }
      `}</style>
    </>
  );
}

// Section wrapper with the rust underlined heading.
function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-heading">{heading}</h2>
      {children}
      <style jsx>{`
        .resume-section {
          margin-bottom: 6px;
        }
        .resume-section-heading {
          font-family: var(--font-display);
          font-size: 11.5pt;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: ${INK};
          margin: 0 0 5px;
          padding-bottom: 2px;
          border-bottom: 1px solid ${ACCENT};
          line-height: 1;
          /* Never let a section heading get separated from its first item. */
          break-after: avoid;
          page-break-after: avoid;
        }
      `}</style>
    </section>
  );
}
