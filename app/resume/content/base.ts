// Canonical shared resume pieces. Variants import these and recompose.
// Anything truly generic to "Colton, regardless of role" lives here.
// Tailored ordering, summaries, or bullet emphasis lives in each variant.

import type {
  ResumeHeader,
  ResumeEducation,
  ResumePublication,
  ResumeAward,
  ResumeSideProject,
} from './types';

// Update this if/when the portfolio is deployed at a different URL.
export const PORTFOLIO_URL = 'coltonwirgau.me';

export const baseHeader: ResumeHeader = {
  name: 'Colton Wirgau',
  // Title is variant-overridable; this is the neutral default.
  title: 'Full-Stack Engineer · AI · Integrations',
  location: 'Clarkston, MI',
  email: 'coltonwirgau@gmail.com',
  links: [
    { label: PORTFOLIO_URL, href: `https://${PORTFOLIO_URL}` },
  ],
  // Lives in public/images/. Only rendered by the poster view; the
  // standard ATS-friendly view ignores it.
  headshot: '/images/headshot.png',
};

export const basePublications: ResumePublication[] = [
  {
    title: 'Sylvester: An Approach to Emotion Classification',
    venue: 'New Trends in Information Technology',
    year: 'April 2017',
    link: 'https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification',
    linkLabel: 'ResearchGate',
  },
];

export const baseEducation: ResumeEducation[] = [
  {
    school: 'University of Detroit Mercy',
    degree: 'B.S. Software Engineering · Minor, Leadership',
    dates: '2012 – 2017',
    honors: 'Graduated with Honors',
    details: [
      'Division I Track & Field · Student-Athlete of the Year · 7× All-Horizon League selection',
    ],
    // The Sylvester paper is, factually, an undergrad publication. Attaching
    // it to Education (rather than a standalone Publications section) lets
    // the resume avoid a one-line section that mostly restates what the
    // summary and AI skills row already say.
    publications: basePublications,
  },
  {
    school: 'Algonac High School',
    degree: 'International Baccalaureate (IB) Diploma',
    dates: '2008 – 2012',
    honors: '4.2 GPA',
  },
];

export const baseAwards: ResumeAward[] = [
  { name: 'Deep Space Award', org: 'MinistryPlatform (for product innovation)' },
];

export const baseSideProjects: ResumeSideProject[] = [
  {
    name: 'Dynastly',
    description:
      'Dynasty fantasy football platform that aggregates valuations across sources, mirrors live league state, and supports multi-team trade modeling. OAuth, scraping fallback via a companion browser extension.',
  },
  {
    name: 'RoarTracker',
    description:
      'Detroit Lions season-ticket tracker (family use). Full OAuth, Neon Postgres, attendance and resale dashboards.',
  },
  {
    name: 'MP Next (open source)',
    description:
      'Open-source Next.js template for MinistryPlatform API integration. Contributor; pattern-source for partner organizations.',
  },
];
