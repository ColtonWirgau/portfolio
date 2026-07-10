// Tailored for: Senior IT Business Analyst — UAW Retiree Medical Benefits Trust.
//
// Tailoring strategy:
//   - Reframe Colton's sole-developer role at Woodside as the de facto
//     business-analyst bridge: requirements gathering, process design,
//     stakeholder collaboration.
//   - Lead Woodside bullets with integrations, Power BI / reporting,
//     and database governance (cleanup, engagement model).
//   - Keep AI as a section unto itself (Sylvester + production LLM use)
//     to mirror the JD's "AI Integrations and Automation" responsibility.
//   - Do NOT claim ServiceNow. Frame integration / ITSM-adjacent
//     workflow experience as transferable.
//   - Soft-keep design / UX as a single skill line so it shows without
//     being the lead.

import type { Resume } from '../types';
import {
  baseHeader,
  baseEducation,
} from '../base';

export const itBusinessAnalystResume: Resume = {
  meta: {
    slug: 'it-business-analyst',
    label: 'IT Business Analyst',
    tailoredFor:
      'Senior IT Business Analyst — UAW Retiree Medical Benefits Trust',
  },

  header: {
    ...baseHeader,
    title: 'Integrations Engineer · Business Systems · AI',
  },

  summary:
    'Sole in-house engineer at a multi-campus organization serving thousands weekly. Owns enterprise integrations (MinistryPlatform, Planning Center, REACH, WordPress), Power BI reporting, and data governance. Co-author of a peer-reviewed 2017 AI paper; daily user of modern LLMs in production. The bridge between business stakeholders and technical delivery.',

  experience: [
    {
      company: 'Woodside Bible Church',
      title: 'Software Development Manager · Full-Stack Engineer',
      location: 'Troy, MI',
      dates: '2016 – Present',
      bullets: [
        'Sole in-house developer for a multi-campus organization; act as the primary bridge between operational leadership and technical delivery, owning the cycle from stakeholder requirements through deployment and adoption.',
        'Built and maintain integrations between MinistryPlatform (enterprise CMS), Planning Center, REACH, and WordPress; designed a nested-JSON retrieval framework whose patterns were adopted into MinistryPlatform\'s core product.',
        'Lead Power BI reporting and dashboard development for leadership and staff; extended a static reporting platform into interactive dashboards with custom embedded widgets, now a development model across partner organizations.',
        'Drove enterprise data governance: cleaned up the primary database (deactivated roughly two-thirds of stale records), then designed and shipped an engagement-tracking model adopted across the organization.',
        'Designed and implemented automated database workflows that replaced manual operational processes; mentor staff and contribute to MP Next, an open-source Next.js template for MinistryPlatform API integration.',
        'Recipient, MinistryPlatform Deep Space Award for product innovation and ecosystem advancement.',
      ],
    },
    {
      company: 'Church Hub',
      title: 'Founder',
      location: 'Detroit, MI',
      dates: 'Aug 2025 – Present',
      bullets: [
        'Founded and built Church Hub, a modular, client-owned platform on top of MinistryPlatform with event management, volunteer coordination, giving dashboards, and custom reporting; implemented across multiple churches.',
        'Own product strategy, requirements, architecture, and delivery end-to-end; translate cross-organization operational needs into a single configurable platform.',
      ],
    },
    {
      company: 'University of Detroit Mercy',
      title: 'IT Coordinator',
      location: 'Detroit, MI',
      dates: 'Sep 2015 – Aug 2018',
      bullets: [
        'Integrated three new university websites; administered databases and ran data analytics for academic departments.',
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

  skills: [
    {
      label: 'Integrations & Enterprise Platforms',
      items: [
        'MinistryPlatform',
        'Planning Center',
        'REACH',
        'WordPress',
        'REST APIs',
        'OAuth',
        'Webhooks',
      ],
    },
    {
      label: 'Reporting & Data',
      items: [
        'Power BI',
        'SQL Server',
        'Postgres',
      ],
    },
    {
      label: 'Business Analysis & Process',
      items: [
        'Requirements gathering',
        'Stakeholder collaboration',
        'Workflow mapping',
        'Process automation',
        'Data governance & cleanup',
        'Technical documentation',
        'Team mentorship',
        'UI/UX leadership',
      ],
    },
    {
      label: 'AI',
      items: [
        'Production LLM integration',
        'Prompt & context engineering',
        'Applied NLP research background',
        'AI use-case development',
      ],
    },
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
  ],

  // Inline the athletic detail with the degree line so it doesn't take its
  // own bullet row.
  education: [
    {
      ...baseEducation[0],
      // Athletic detail trimmed for this variant — not signal for a Senior
      // IT BA role. Lives in baseEducation if a later variant wants it back.
      honors: 'Graduated with Honors',
      details: undefined,
    },
  ],
  // Sylvester paper attached to Education via baseEducation. Deep Space
  // Award is already cited in the last Woodside bullet. Side projects
  // intentionally omitted to keep to one page; re-add
  // `sideProjects: baseSideProjects` if you want them back.
};
