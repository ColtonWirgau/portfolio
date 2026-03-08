'use client';

import { ResponsiveSheet } from './ResponsiveSheet';
import { useSheet } from './ResponsiveSheet';
import type { ReactNode } from 'react';

// ── Types ──

export interface SubEvent {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface LifeEvent {
  id: string;
  label: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  subEvents: SubEvent[];
  image: string;
  lat: number;
  lng: number;
}

// ── Data ──

export const lifeEvents: LifeEvent[] = [
  {
    id: 'algonac',
    label: 'Algonac',
    year: 'Childhood',
    tagline: 'Where it started',
    description:
      'I grew up in Algonac, a small river town on the St. Clair River. It\'s the kind of place where everybody knows everybody. This is where I first got curious about building things — tearing apart computers, making terrible websites, and figuring out how stuff works.',
    highlights: [
      'Algonac High School — IB Diploma Programme (full)',
      'Graduated with a 4.2 GPA',
      '7 school records in track & field',
      'All-State & all-time leading scorer for Algonac HS',
      'Captain of the football team — All-Area selection',
    ],
    subEvents: [
      {
        id: 'algonac-ib',
        title: 'IB Diploma Programme',
        description:
          'Completed the full International Baccalaureate Diploma Programme at Algonac High School — one of the most rigorous academic tracks available. Graduated with a 4.2 GPA.',
      },
      {
        id: 'algonac-track',
        title: 'Track & Field Records',
        description:
          'Set 7 school records in track & field. All-State selection and the all-time leading scorer in Algonac HS history.',
      },
      {
        id: 'algonac-football',
        title: 'Football Captain',
        description:
          'Captain of the football team. Earned All-Area honors and helped lead the team through some of its best seasons.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop',
    lat: 42.6189,
    lng: -82.5321,
  },
  {
    id: 'detroit',
    label: 'Detroit',
    year: 'College',
    tagline: 'Where I found my craft',
    description:
      'Went to school at the University of Detroit Mercy, where the energy of the city shaped my hustle. Graduated with honors with a BS in Software Engineering and a minor in Leadership. College is where I fell in love with building things that people actually use — not just writing code, but solving real problems.',
    highlights: [
      'BS Software Engineering, Minor in Leadership — Graduated with Honors',
      'Division I track & field athlete',
      'Published: "Sylvester: An Approach to Emotion Classification"',
      'Most sought-after tutor at the Student Success Center',
      'Led digital transformation of Success Center operations',
    ],
    subEvents: [
      {
        id: 'detroit-d1',
        title: 'D1 Track & Field',
        description:
          'Competed as a Division I track & field athlete at the University of Detroit Mercy while carrying a full academic load and graduating with honors.',
      },
      {
        id: 'detroit-ai',
        title: 'AI Research Publication',
        description:
          'Published "Sylvester: An Approach to Emotion Classification" — an AI system that integrated with Twitter to identify emotional sentiment in real time. Published in New Trends in Information Technology, 2017.',
      },
      {
        id: 'detroit-ssc',
        title: 'Student Success Center',
        description:
          'Started as a TA and tutor — consistently one of the center\'s most sought-after tutors, especially for statistics. Led a digital transformation of the center\'s operations, replacing manual paper timecards and appointment tracking with an automated online platform integrated with university ID scan cards.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=500&fit=crop',
    lat: 42.3314,
    lng: -83.0458,
  },
  {
    id: 'troy',
    label: 'Troy',
    year: 'Career',
    tagline: 'Where I build',
    description:
      'Software Development Manager and Full-Stack Developer at Woodside Bible Church since 2016. As the sole in-house developer, I design and build internal tools, platforms, and widgets that serve thousands of people every week — while managing contractors and coordinating with MarCom.',
    highlights: [
      'Software Dev Manager / Full-Stack Developer since 2016',
      'Built apps.woodsidebible.org from scratch',
      'MinistryPlatform "Deep Space Award" recipient',
      'Features adopted by MP\'s main product for all customers',
      'Lead UI/UX across all digital products',
    ],
    subEvents: [
      {
        id: 'troy-platform',
        title: 'Apps.WoodsideBible.org',
        description:
          'Built a unified Next.js platform that simplifies major organizational workflows — centralizing operations, automating data tasks, and providing clean interfaces for both staff and community use across multiple campuses.',
      },
      {
        id: 'troy-widgets',
        title: 'Dynamic Insights & Widgets',
        description:
          'Extended MinistryPlatform\'s static reporting into interactive dashboards with custom embedded widgets. Created a nested JSON framework for optimized data retrieval. This innovation inspired new features in the platform and became a development model across partner organizations.',
      },
      {
        id: 'troy-award',
        title: 'Deep Space Award',
        description:
          'Recognized with MinistryPlatform\'s "Deep Space Award" for innovation and advancement of the product ecosystem. Multiple features and tools built at Woodside were later adopted by MinistryPlatform\'s main product for all customers.',
      },
      {
        id: 'troy-ux',
        title: 'UI/UX Leadership',
        description:
          'Lead UI/UX across all digital products at Woodside. Every screen, every flow, every interaction — obsessing over the details so users don\'t have to think. Also a major contributor to "MP Next," an open-source Next.js template for MinistryPlatform API integration.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=500&fit=crop',
    lat: 42.6064,
    lng: -83.1498,
  },
  {
    id: 'clarkston',
    label: 'Clarkston',
    year: 'Personal',
    tagline: 'Where I call home',
    description:
      'We live in Clarkston now — a quiet town north of Detroit. It\'s home base. Married Sarah at the Grosse Ile Municipal Airport — which probably tells you everything you need to know about us. When I\'m not building products, you\'ll find me here with my family.',
    highlights: [
      'Married Sarah at the Grosse Ile Municipal Airport',
      'Home with Sarah, Weston (3), and Rosie (1)',
      'Musician — play at Woodside and have played major shows',
      'Detroit Lions season ticket holder',
    ],
    subEvents: [
      {
        id: 'clarkston-wedding',
        title: 'The Airport Wedding',
        description:
          'Got married to Sarah at the Grosse Ile Municipal Airport. Yes, an actual airport. It was unconventional, personal, and exactly what we wanted.',
      },
      {
        id: 'clarkston-family',
        title: 'Family Life',
        description:
          'Home with Sarah, Weston (3), and Rosie (1). A quiet town north of Detroit — home base for family life and side projects alike.',
      },
      {
        id: 'clarkston-music',
        title: 'Music',
        description:
          'I play music at Woodside Bible Church and have played a lot of huge shows over the years. It\'s one of those things that recharges me — whether it\'s leading worship on a Sunday or playing a big stage, there\'s nothing like it.',
      },
      {
        id: 'clarkston-lions',
        title: 'Detroit Lions Season Tickets',
        description:
          'Proud Detroit Lions season ticket holder. Built RoarTracker — a personal app to manage season tickets, track attendance, resale, and spending data with intuitive dashboards and mobile-first UI.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=500&fit=crop',
    lat: 42.7356,
    lng: -83.4191,
  },
];

// ── Sheet Header ──

function SheetHeader({ event }: { event: LifeEvent }) {
  return (
    <div className="relative">
      <div style={{ height: '220px' }} className="w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: '24px 28px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '6px' }} className="uppercase text-white/50">
          {event.year}
        </div>
        <h3 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }} className="text-white">
          {event.label}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 300, marginTop: '4px' }} className="text-white/60">
          {event.tagline}
        </p>
      </div>
    </div>
  );
}

// ── Sub-event page header (smaller) ──

function SubEventHeader({ event, subEvent }: { event: LifeEvent; subEvent: SubEvent }) {
  return (
    <div className="relative">
      <div style={{ height: '180px' }} className="w-full overflow-hidden">
        <img
          src={subEvent.image || event.image}
          alt={subEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: '24px 28px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '6px' }} className="uppercase text-white/50">
          {event.label} — {event.year}
        </div>
        <h3 style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1 }} className="text-white">
          {subEvent.title}
        </h3>
      </div>
    </div>
  );
}

// ── Main page content (overview with clickable sub-events) ──

function MainPageContent({ event }: { event: LifeEvent }) {
  const { navigate } = useSheet();

  return (
    <div style={{ padding: '28px' }}>
      {/* Description */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 300, color: 'var(--color-muted)' }}>
        {event.description}
      </p>

      {/* Highlights */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '12px', color: 'var(--color-muted)' }} className="uppercase">
          Highlights
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {event.highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <span style={{ color: 'var(--color-border)', marginTop: '6px', flexShrink: 0, fontSize: '6px' }}>●</span>
              <span style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 300, color: 'var(--color-muted)' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-event navigation */}
      {event.subEvents.length > 0 && (
        <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '8px', color: 'var(--color-muted)' }} className="uppercase">
            Learn More
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {event.subEvents.map((sub) => (
              <button
                key={sub.id}
                onClick={() => navigate(sub.id)}
                className="group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 12px',
                  margin: '0 -12px',
                  borderRadius: '10px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-border)',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-fg)', flex: 1 }}>
                  {sub.title}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-event page content ──

function SubEventContent({ subEvent }: { subEvent: SubEvent }) {
  return (
    <div style={{ padding: '28px' }}>
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 300, color: 'var(--color-muted)' }}>
        {subEvent.description}
      </p>
    </div>
  );
}

// ── Sheet component ──

interface LifeEventSheetProps {
  event: LifeEvent | null;
  onClose: () => void;
  /** Open directly to a sub-event page */
  defaultPage?: string;
}

export function LifeEventSheet({ event, onClose, defaultPage }: LifeEventSheetProps) {
  if (!event) {
    return (
      <ResponsiveSheet
        open={false}
        onClose={onClose}
        pages={{ main: { content: <div /> } }}
      />
    );
  }

  // Build pages record
  const pages: Record<string, { header?: ReactNode; content: ReactNode }> = {
    main: {
      header: <SheetHeader event={event} />,
      content: <MainPageContent event={event} />,
    },
  };

  for (const sub of event.subEvents) {
    pages[sub.id] = {
      header: <SubEventHeader event={event} subEvent={sub} />,
      content: <SubEventContent subEvent={sub} />,
    };
  }

  return (
    <ResponsiveSheet
      open={true}
      onClose={onClose}
      pages={pages}
      defaultPage={defaultPage || 'main'}
    />
  );
}
