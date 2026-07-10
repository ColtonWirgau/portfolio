// Flagship, general-purpose resume. Two-page, portfolio-branded (poster view).
//
// This is the DEFAULT variant served at /resume. It leads with the same
// positioning as the portfolio itself: AI first (peer-reviewed since 2017 +
// heavy production LLM use), then full-stack engineering and product
// leadership. Built for the roles Colton is actually targeting now: remote
// full-stack / engineering-leadership, AI-focused, and faith/mission-driven
// product companies (Tithe.ly, Gloo, Tebra, Sleeper, Planning Center, etc.).
//
// The tightly-tailored IT Business Analyst variants live alongside this one
// for cases where a specific posting warrants deep tailoring.

import type { Resume } from '../types';
import { baseHeader, baseEducation } from '../base';

export const fullStackAiLeadResume: Resume = {
  meta: {
    slug: 'full-stack-ai-lead',
    label: 'Full-Stack · AI · Leadership (2-page)',
    // No tailoredFor — this is the general flagship, not a single-posting cut.
    view: 'poster',
  },

  header: {
    ...baseHeader,
    // Leads with the substantive value (full-stack + AI), then leadership.
    // The stamps below carry the identity labels; this line says the shape.
    title: 'Full-Stack Engineer · Applied AI · Product Leadership',
  },

  // Stamps mirror the live portfolio hero (app/page.tsx) verbatim so the
  // resume and site tell one consistent story.
  stamps: [
    { label: 'AI Researcher', sub: '· Published, 2017 ·' },
    { label: 'Product Engineer', sub: '· Since 2019 ·' },
    { label: 'Founder', sub: '· Church Hub ·' },
  ],

  summary:
    'Full-stack product engineer with a decade of shipping real software and a peer-reviewed AI background that predates the LLM era (co-author, emotion classification, 2017). Sole engineer behind a 14-campus organization’s entire platform, and founder of Church Hub, a product churches own and extend. I build AI deeply and tastefully into products and workflows, lead UI/UX and small teams, and care most about software that makes something easier for a real person.',

  experience: [
    {
      company: 'Woodside Bible Church',
      title: 'Software Development Manager · Full-Stack Engineer',
      location: 'Troy, MI',
      dates: '2019 – Present',
      bullets: [
        'Sole in-house engineer for a 14-campus organization serving thousands weekly; own full-stack delivery across public web apps, internal tools, integrations, and reporting, from requirements through deployment and adoption.',
        'Architected and maintain a Next.js monorepo whose shared abstractions let me spin up staff- and community-facing tools fast (apps.woodsidebible.org, embedded widgets, microsites); built integrations across MinistryPlatform, Planning Center, REACH, and WordPress, including a nested-JSON retrieval framework adopted into MinistryPlatform’s core product.',
        'Sole steward of data across all campuses: kept MinistryPlatform the single source of truth, validated at the boundary, and made every write carry its author for a tamper-proof audit trail; initial cleanup retired roughly two-thirds of stale records and the engagement-tracking model I built was adopted org-wide.',
        'Lead Power BI reporting and UI/UX across all digital products; recipient of MinistryPlatform’s Deep Space Award for product innovation and advancement of the ecosystem.',
      ],
    },
    {
      company: 'Church Hub',
      title: 'Founder',
      location: 'Detroit, MI',
      dates: 'Jan 2025 – Present',
      bullets: [
        'Founded Church Hub and own product strategy, architecture, and end-to-end delivery: a modular Next.js platform churches own and extend (in-house, via a contractor, or with AI) rather than a subscription they rent.',
        'Handles event management, volunteer coordination, giving dashboards, and genuinely good-looking analytics built on each church’s own data; deployed across congregations from large multi-campus organizations down to single-site churches.',
      ],
    },
    {
      company: 'University of Detroit Mercy',
      title: 'IT Coordinator · Tutor & Teaching Assistant',
      location: 'Detroit, MI',
      dates: '2013 – 2018',
      bullets: [
        'Led the digital transformation of the Learning Center: replaced paper timecards and appointment tracking with an automated platform integrated with university ID scan cards.',
        'Integrated three university websites and ran data analytics for academic departments; retained post-graduation to integrate a system spanning disability support services, the Learning Center, and the testing center.',
      ],
    },
    // Continental Automotive (Embedded Systems Engineering Intern, 2015) is
    // intentionally dropped from this flagship two-page cut: it's the oldest,
    // lowest-signal entry for full-stack / AI / leadership targets, and
    // removing it is what lands the resume at exactly two pages. It remains
    // in the IT Business Analyst variants if a specific role wants the
    // C / embedded / automotive-cybersecurity signal back.
  ],

  // AI-led ordering to match the portfolio's positioning rule. Trimmed from
  // the old keyword-dense lists to the high-signal items so the summary and
  // side work fit while holding exactly two pages.
  skills: [
    {
      label: 'Languages & Frameworks',
      items: [
        'TypeScript / JavaScript',
        'SQL',
        'Python',
        'C',
        'Next.js',
        'React',
        'Node.js',
        'Tailwind CSS',
      ],
    },
    {
      label: 'AI',
      items: [
        'Production LLM integration',
        'Prompt & context engineering',
        'Agentic patterns & MCP',
        'Evaluation',
        'AI use-case development',
        'Applied NLP research background',
        'Anthropic & OpenAI APIs',
        'Claude Code',
      ],
    },
    {
      label: 'Integrations',
      items: [
        'REST APIs',
        'Webhooks',
        'OAuth 2.0 / OIDC',
        'SAML / SSO',
        'JWT & token flows',
        'Real-time & scheduled sync',
        'Custom connector development',
        'MinistryPlatform · Planning Center · WordPress',
      ],
    },
    {
      label: 'Data & Reporting',
      items: [
        'SQL Server',
        'Postgres (Neon)',
        'Power BI',
        'SSRS / SSIS',
        'Data modeling & normalization',
        'Query optimization',
        'Data governance & cleanup',
      ],
    },
    {
      label: 'Architecture',
      items: [
        'Monorepo (Turborepo)',
        'Multi-tenant SaaS',
        'System & API design',
        'Event-driven patterns',
        'WebSockets / SSE',
        'Caching & rate limiting',
        'Auth & authorization',
        'Schema design',
      ],
    },
    {
      label: 'Leadership & Process',
      items: [
        'UI/UX leadership',
        'Team mentorship',
        'Stakeholder collaboration',
        'Requirements & process design',
        'Roadmapping',
        'Architecture decisions (ADRs)',
        'Code review',
        'Agile / Scrum',
      ],
    },
    {
      label: 'Infrastructure & Testing',
      items: [
        'Vercel',
        'AWS S3',
        'Cloudflare',
        'GitHub Actions / CI-CD',
        'Docker',
        'Serverless & edge functions',
        'Playwright / Vitest / Jest',
        'End-to-end & visual regression testing',
      ],
    },
  ],

  // Side work included deliberately: Dynastly is the natural conversation
  // starter for product / fantasy-sports targets (e.g. Sleeper), and the
  // others show range and personality. Dynastly copy stays clean and says
  // nothing about upstream-platform bugs.
  sideProjects: [
    {
      name: 'Dynastly',
      description:
        'Dynasty fantasy football platform that aggregates player valuations, mirrors live league state, and models realistic multi-team trades on one canvas. Next.js, OAuth, and a companion browser extension for data the public APIs don’t expose.',
    },
    {
      name: 'Degenerates Dashboard',
      description:
        'Tracks my friend group’s weekly 12-leg parlay: ingests picks, tracks results, and roasts us with the data. Dumb, fun, and one of my favorite builds.',
    },
    {
      name: 'RoarTracker',
      description:
        'Detroit Lions season-ticket tracker for four co-owners: attendance, payments, a seat drawing, and auto-generated resale graphics. Full OAuth, Supabase Postgres, clean dashboards.',
    },
  ],

  // Education carries the athletic recognition as a single detail line (the
  // distinctive human signal, kept cheap) since the standalone Personal
  // section was trimmed. Sylvester is expanded with the research story.
  education: [
    {
      ...baseEducation[0],
      details: [
        'Division I Track & Field · Student-Athlete of the Year · 7× All-Horizon League selection',
      ],
      publications: [
        {
          title: 'Sylvester: An Approach to Emotion Classification',
          venue: 'New Trends in Information Technology',
          year: '2017',
          link: 'https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification',
          linkLabel: 'ResearchGate',
          hideTitle: true,
          description:
            'Built an AI system in 2017, before AI went mainstream: it read tweets in real time to gauge how people felt about any subject, learning the evolving language of Twitter rather than a fixed dictionary. The problems we wrestled with then (sarcasm, slang, drift, ambiguity at scale) are the same ones shaping modern AI today. New Trends in Information Technology, 2017.',
        },
      ],
    },
    baseEducation[1], // Algonac High School (IB Diploma)
  ],

  // Personal section intentionally omitted: trimmed to make room for the
  // summary and side work, which carry more signal for the target roles.
  // Athletic recognition lives in Education above.
};
