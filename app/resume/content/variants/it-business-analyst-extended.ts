// Two-page, portfolio-branded resume.
//
// Originally tailored hard for Senior IT Business Analyst at UAW RMBT,
// but pulled back to a more balanced "full-stack engineer who also owns
// integrations, reporting, and AI work" framing so it works as Colton's
// default longer resume across several role shapes (full-stack, platform,
// software development manager, IT BA). The tightly-tailored 1-page IT BA
// variant lives at ../it-business-analyst.ts for cases where deep tailoring
// is preferable.

import type { Resume } from '../types';
import {
  baseHeader,
  baseEducation,
} from '../base';

export const itBusinessAnalystExtendedResume: Resume = {
  meta: {
    slug: 'it-business-analyst-extended',
    label: 'Two-Page (Full-Stack Lead)',
    // tailoredFor intentionally omitted — this is a richer general-purpose
    // resume, not narrowly tailored to a single posting.
    view: 'poster',
  },

  header: {
    ...baseHeader,
    // Echoes the portfolio's rolling hero titles. Deliberately picks
    // traits the stamps below DON'T cover — the stamps say what he is
    // (AI Researcher / Full-Stack Engineer / Founder); this says how
    // he works.
    title: 'Problem Solver · Builder of Tools · Product Thinker',
  },

  // Three stamps mirror the portfolio hero, full-stack identity leading.
  stamps: [
    { label: 'AI Pioneer', sub: '· Published, 2017 ·' },
    { label: 'Full-Stack Engineer', sub: '· Since 2016 ·' },
    { label: 'Founder', sub: '· Church Hub ·' },
  ],

  // Summary intentionally omitted; the stamps + experience section
  // carry the positioning at the top of the page.

  experience: [
    {
      company: 'Woodside Bible Church',
      title: 'Technology Development Manager · Full-Stack Engineer',
      location: 'Troy, MI',
      dates: '2016 – Present',
      bullets: [
        'Sole in-house developer for a multi-campus organization serving thousands weekly; own full-stack engineering across public web apps, internal tools, integrations, and reporting, from requirements through deployment.',
        'Architected and maintain a Next.js monorepo whose shared abstractions let me rapidly spin up new staff- and community-facing tools: apps.woodsidebible.org, embedded widgets, microsites, and internal integration tools across campuses.',
        'Built integrations between MinistryPlatform (enterprise CMS), Planning Center, REACH, and WordPress; designed a nested-JSON retrieval framework whose patterns were adopted into MinistryPlatform\'s core product.',
        'Lead Power BI reporting and dashboard development for leadership and staff; extended a static reporting platform into interactive dashboards with custom embedded widgets, now a development model across partner organizations.',
        'Own the SQL Server backbone: stored procedures, scheduled jobs, data models, and automated routines for data quality (initial cleanup deactivated roughly two-thirds of stale records), engagement tracking (model adopted org-wide), and workflows that replaced manual operational processes.',
      ],
    },
    {
      company: 'Church Hub',
      title: 'Founder',
      location: 'Detroit, MI',
      dates: 'Jan 2025 – Present',
      bullets: [
        'Founded Church Hub and own product strategy, architecture, and end-to-end delivery. A Next.js platform built for deep per-client customization (event management, volunteer coordination, giving, custom reporting), extensible by client developers.',
        'Clients span large multi-campus organizations through small single-site congregations across denominations, each with a deployment customized to their workflows and existing infrastructure.',
      ],
    },
    {
      company: 'University of Detroit Mercy',
      title: 'IT Coordinator · Tutor · Teaching Assistant · Math Research Assistant',
      location: 'Detroit, MI',
      dates: 'Aug 2013 – Aug 2018',
      bullets: [
        'Led the digital transformation of the Learning Center: replaced paper timecards and appointment tracking with an automated platform integrated with university ID scan cards.',
        'Retained post-graduation to integrate a new system spanning disability support services, the Learning Center, and the testing center.',
      ],
    },
    {
      company: 'Continental Automotive',
      title: 'Embedded Systems Engineering Intern',
      location: 'Auburn Hills, MI',
      dates: 'May – Sep 2015',
      bullets: [
        'Built a C-based graphical test interface for a cybersecurity module deployed across Chrysler and Jeep vehicle lines; worked inside a formal requirements-driven engineering process.',
      ],
    },
  ],

  // Engineering-led ordering. Integrations and reporting stay as their
  // own rows so they're impossible to miss.
  skills: [
    {
      label: 'Languages & Frameworks',
      items: [
        'TypeScript / JavaScript',
        'SQL',
        'Python',
        'C',
        'PHP',
        'Next.js',
        'React',
        'Node.js',
        'Tailwind CSS',
        'Vite',
        'Playwright',
      ],
    },
    {
      label: 'Integrations',
      items: [
        // Transport / API styles (WebSockets & Server-Sent Events live
        // only in Architecture to avoid duplication.)
        'REST APIs',
        'Long-polling',
        'HTTP / HTTPS',
        'JSON / XML / CSV payload handling',
        // Auth & identity
        'OAuth 2.0',
        'OpenID Connect (OIDC)',
        'SAML / SSO',
        'JWT / token management',
        'Refresh-token flows',
        'API key management',
        // Patterns
        'Webhooks',
        'Real-time data sync',
        'Polling / scheduled syncs',
        // Concepts
        'Third-party API integration',
        'Custom integration / connector development',
        // Tooling
        'OpenAPI / Swagger',
        'Postman',
        // Specific platform (kept at back)
        'WordPress',
      ],
    },
    {
      label: 'Reporting & Data',
      items: [
        'Power BI',
        'SQL Server',
        'Postgres',
        'SSRS',
        'SSIS',
        'Custom software for reporting and data',
        'Data modeling / normalization',
        'Query optimization',
      ],
    },
    {
      label: 'AI',
      items: [
        // What I do
        'Production LLM integration',
        'Prompt & context engineering',
        'Agentic patterns',
        'Evaluation',
        'AI use-case development',
        // Credential
        'Applied NLP research background',
        // Tools / protocols
        'MCP',
        'Anthropic API',
        'OpenAI API',
        'Claude Code',
      ],
    },
    {
      label: 'Leadership & Process',
      items: [
        'UI/UX leadership',
        'Stakeholder collaboration',
        'Requirements gathering',
        'Process design / mapping',
        'Workflow automation',
        'Change management',
        'Data governance',
        'Technical documentation',
        'Architecture decisions (ADRs)',
        'Roadmapping',
        'Agile / Scrum / Kanban',
        'Code review',
        'Team mentorship',
      ],
    },
    {
      label: 'Infrastructure',
      items: [
        'Vercel',
        'AWS S3',
        'Cloudflare',
        'Git / GitHub',
        'GitHub Actions',
        'CI/CD',
        'Docker',
        'Linux',
        'Serverless functions',
        'Edge functions',
        'Cron / scheduled jobs',
        'Environment & secrets management',
        'DNS / domain management',
        'Logging & monitoring',
      ],
    },
    {
      label: 'Testing',
      items: [
        'Unit testing',
        'Integration testing',
        'End-to-end testing',
        'Jest',
        'Vitest',
        'Cypress',
        'TDD',
        'Test automation',
        'Manual QA',
        'Browser testing',
        'Visual regression testing',
        'Performance testing',
        'Load testing',
        'Mocking & stubbing',
        'Snapshot testing',
      ],
    },
    {
      label: 'Architecture',
      items: [
        'Monorepo',
        'Multi-tenant SaaS',
        'System design',
        'API design',
        'REST API design',
        'GraphQL',
        'WebSockets',
        'Server-Sent Events',
        'Event-driven architecture',
        'Microservices',
        'Caching strategies',
        'Authentication & authorization',
        'Rate limiting',
        'Database schema design',
        'Scalability planning',
        'State management',
      ],
    },
  ],

  // Drop the athletic detail from Education (already covered in the
  // Personal/ATHLETICS row) and expand the Sylvester citation with a
  // short description of the research.
  education: [
    {
      ...baseEducation[0],
      details: undefined,
      publications: [
        {
          title: 'Sylvester: An Approach to Emotion Classification',
          venue: 'New Trends in Information Technology',
          year: '2017',
          link: 'https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification',
          linkLabel: 'ResearchGate',
          hideTitle: true,
          description:
            'Built an AI system back in 2017, before AI went mainstream. The tool read tweets in real time and identified how people felt emotionally about any subject, learning the evolving language of Twitter rather than relying on a fixed dictionary. The challenges we worked through then (sarcasm, slang, ambiguous meaning at scale) are the same ones shaping how modern AI is built today. Published in New Trends in Information Technology, 2017.',
        },
      ],
    },
    baseEducation[1], // Algonac High School (IB Diploma)
  ],

  // Personal projects intentionally omitted from this variant — the
  // summary, experience, and education already cover the professional
  // signal this resume needs. The `baseSideProjects` export in ../base.ts
  // is still available if a future variant wants to include them.

  // Sylvester paper attached to Education via baseEducation; Deep Space
  // Award already cited in the last Woodside bullet — no standalone
  // Publications & Recognition section needed.

  // Pull quote intentionally omitted. Add a `pullQuote: '...'` here if a
  // future version of this resume should close with one.

  personal: [
    {
      label: 'Family',
      description: 'Husband and dad of two, based in Clarkston, MI.',
    },
    {
      label: 'Music',
      description:
        'Multi-instrumentalist and producer; former Worship Director at Woodside (3 years on staff); active in contract and studio work.',
    },
    {
      label: 'Athletics',
      description:
        'Algonac High School Hall of Fame inductee; all-time leading scorer in school track & field history. D1 Track & Field at UDM (Student-Athlete of the Year, 7× All-Horizon League).',
    },
  ],
};
