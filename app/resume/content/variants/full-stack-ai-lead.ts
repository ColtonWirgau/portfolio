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
    'Full-stack product engineer with a decade of shipping real software and a peer-reviewed AI background that predates the LLM era (co-author, emotion classification, 2017). Sole engineer behind a 14-campus organization’s entire platform, and founder of Church Hub, a product churches own and extend. I build AI deeply and tastefully into products and workflows, lead contractors, UI/UX, and cross-department delivery, and care most about software that makes something easier for a real person.',

  experience: [
    {
      company: 'Woodside Bible Church',
      title: 'Technology Development Manager · Full-Stack Engineer',
      location: 'Troy, MI',
      dates: '2019 – Present',
      bullets: [
        'Own the software function for a 14-campus organization serving thousands weekly: strategy, roadmap, and full-stack delivery across web apps, internal tools, and integrations, as its only engineer.',
        'Architected and maintain a Next.js monorepo of staff- and community-facing tools (apps.woodsidebible.org, embedded widgets, microsites) with integrations across MinistryPlatform, Planning Center, REACH, and WordPress.',
        'Sole steward of data across all campuses: MinistryPlatform kept the single source of truth, every write validated at the boundary and carrying its author for a tamper-proof audit trail; initial cleanup retired roughly two-thirds of stale records and my engagement-tracking model was adopted org-wide.',
        'Direct a bench of specialists on work I could do myself and choose to delegate (a partner web team, a full-stack developer on integrations, a SQL developer on database solutions, a contractor I tag-team builds with), each with a spec, definition of done, and line-by-line review.',
        'Act as the technology lead inside larger org initiatives (campaigns, events, ministry launches): own the software piece end to end and translate ministry, comms, and finance needs into buildable requirements.',
        'Drive AI adoption across the workflow: agentic coding standards, guardrails, and custom skills built and shared with the team, and LLM features shipped where they beat deterministic code.',
      ],
    },
    {
      company: 'Church Hub',
      title: 'Founder',
      location: 'Detroit, MI',
      dates: 'Jan 2025 – Present',
      bullets: [
        'Founded Church Hub and own product strategy, architecture, and delivery end to end: a modular Next.js platform churches own and extend (in-house, via a contractor, or with AI) rather than rent.',
        'Event management, volunteer coordination, giving dashboards, and analytics on each church’s own data; deployed everywhere from multi-campus organizations to single-site churches.',
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
  // side projects fit while holding exactly two pages.
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
        'AI adoption & enablement',
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

  // Selected Wins replaced the old side-projects section: outcomes pulled
  // out of the bullet walls into scannable cards. Side projects live on the
  // portfolio (screenshots and writeups) rather than the resume. The bullets
  // that carried these outcomes are trimmed above so nothing is said twice;
  // the cleanup + engagement-model clause stays in the data-stewardship
  // bullet because no card covers it.
  spotlight: {
    heading: 'Selected Wins',
    items: [
      {
        name: 'Adopted upstream',
        description:
          'I ship features the MinistryPlatform community builds on: a nested-JSON retrieval framework adopted into the core release, custom insights that inspired new features in the main product, and major contributions to MP Next, the open-source Next.js wrapper partner organizations start from.',
      },
      {
        name: 'Leadership across technologies',
        description:
          'Products and solutions shipped while owning a piece of every system a 14-campus organization runs on: I work alongside partner companies and contract developers, make the architecture calls, and put people in the roles where they deliver.',
      },
      {
        name: 'AI enablement',
        description:
          'I coach non-engineers into AI-assisted development (one former CFO now builds and runs his own product full time) and build AI into the software itself, like an internal MCP integration that answers staff questions from MinistryPlatform data, scoped to their access with PII protected.',
      },
    ],
  },

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
          year: 'April 2017',
          link: 'https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification',
          linkLabel: 'ResearchGate',
          hideTitle: true,
          description:
            'Built an AI system in 2017, before AI went mainstream: it read tweets in real time to gauge how people felt about any subject, learning the evolving language of Twitter rather than a fixed dictionary. The problems we wrestled with then (sarcasm, slang, drift, ambiguity at scale) are the same ones shaping modern AI today. New Trends in Information Technology, April 2017.',
        },
      ],
    },
    baseEducation[1], // Algonac High School (IB Diploma)
  ],

  // Personal section intentionally omitted: trimmed to make room for the
  // summary and side projects, which carry more signal for the target roles.
  // Athletic recognition lives in Education above.
};
