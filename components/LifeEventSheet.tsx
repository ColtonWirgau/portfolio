'use client';

import { ResponsiveSheet, SheetPage, useResponsiveSheet } from './ResponsiveSheet';

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
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop',
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
      'Division I track & field athlete — Student Athlete of the Year',
      'Seven Time All-Horizon League selection (Track & Field)',
      'Published: "Sylvester: An Approach to Emotion Classification"',
      'Embedded Systems Engineering Intern at Continental Automotive',
      'IT Coordinator — integrated websites, databases, and new systems for the university',
      'Most sought-after tutor at the Student Success Center',
    ],
    subEvents: [
      {
        id: 'detroit-d1',
        title: 'D1 Track & Field',
        description:
          'Competed as a Division I track & field athlete at the University of Detroit Mercy while carrying a full academic load and graduating with honors. Named Student Athlete of the Year and earned seven All-Horizon League selections over my career.',
      },
      {
        id: 'detroit-ai',
        title: 'AI Research Publication',
        description:
          'Published "Sylvester: An Approach to Emotion Classification" in New Trends in Information Technology, 2017. A collaborative AI program that learns the language of Twitter through automatic annotation and classification — collecting and interpreting tweets in real time to determine how users feel emotionally about any given subject based on current language.',
      },
      {
        id: 'detroit-continental',
        title: 'Continental Automotive Internship',
        description:
          'Embedded Systems Engineering Intern at Continental Automotive (May–Sep 2015). Built a graphical user interface for testing a cybersecurity module found in many Chrysler and Jeep vehicles. The interface verified that plugged-in modules met all security requirements. The work was heavily C-based and requirement-driven.',
      },
      {
        id: 'detroit-it',
        title: 'IT Coordinator — UDM',
        description:
          'IT Coordinator at the University of Detroit Mercy (Sep 2015–Aug 2018). Helped integrate three new websites, managed multiple databases, provided technical support for users and staff, and performed data analytics for university departments. After graduation, was hired by the university to integrate a new system for the disability support services, student success center, and testing center.',
      },
      {
        id: 'detroit-ssc',
        title: 'Student Success Center',
        description:
          'Tutor and Teacher\'s Assistant at UDM\'s Student Success Center. Tutored high-level math and statistics one-on-one and in large groups. Served as a TA in English, Math, and Computer Science courses. Helped high-risk students with time management skills. Consistently one of the center\'s most sought-after tutors. Led a digital transformation of the center\'s operations, replacing manual paper timecards and appointment tracking with an automated online platform integrated with university ID scan cards.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=1000&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop',
    lat: 42.6064,
    lng: -83.1498,
  },
  {
    id: 'clarkston',
    label: 'Clarkston',
    year: 'Family',
    tagline: 'Where I call home',
    description:
      'We live in Clarkston now — a quiet town north of Detroit. It\'s home base. Married Sarah at the Grosse Ile Municipal Airport — which probably tells you everything you need to know about us. When I\'m not building products, you\'ll find me here with my family.',
    highlights: [
      'Married Sarah at the Grosse Ile Municipal Airport',
      'Home with Sarah, Weston (3), and Rosie (1)',
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
    ],
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=1000&fit=crop',
    lat: 42.7356,
    lng: -83.4191,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    year: 'Hobbies',
    tagline: 'What recharges me',
    description:
      'Music and sports are the two things that keep me balanced. I play music at Woodside Bible Church and have played a lot of huge shows over the years. I\'m also a diehard Detroit Lions fan — season ticket holder and builder of my own ticket tracking app.',
    highlights: [
      'Musician — play at Woodside and have played major shows',
      'Detroit Lions season ticket holder',
      'Built RoarTracker to manage season tickets and spending',
    ],
    subEvents: [
      {
        id: 'hobbies-music',
        title: 'Music',
        description:
          'I play music at Woodside Bible Church and have played a lot of huge shows over the years. It\'s one of those things that recharges me — whether it\'s leading worship on a Sunday or playing a big stage, there\'s nothing like it.',
      },
      {
        id: 'hobbies-lions',
        title: 'Detroit Lions Season Tickets',
        description:
          'Proud Detroit Lions season ticket holder. Built RoarTracker — a personal app to manage season tickets, track attendance, resale, and spending data with intuitive dashboards and mobile-first UI.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=1000&fit=crop',
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
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: '24px 28px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '6px' }} className="uppercase text-white/50">
          {event.year}
        </div>
        <h3 style={{ fontSize: '28px', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }} className="text-white">
          {event.label}
        </h3>
        <p style={{ fontSize: '13px', fontWeight: 400, marginTop: '4px' }} className="text-white/60">
          {event.tagline}
        </p>
      </div>
    </div>
  );
}

// ── Main page content (overview with clickable sub-events) ──

function MainPageContent({ event }: { event: LifeEvent }) {
  const { navigate } = useResponsiveSheet();

  return (
    <div style={{ padding: '28px' }}>
      {/* Description */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
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
              <span style={{ fontSize: '13px', lineHeight: 1.5, fontWeight: 400, color: 'var(--color-muted)' }}>{h}</span>
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
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
        {subEvent.description}
      </p>
    </div>
  );
}

// ── Sheet component ──

interface LifeEventSheetProps {
  event: LifeEvent | null;
  onClose: () => void;
  defaultPage?: string;
}

export function LifeEventSheet({ event, onClose, defaultPage }: LifeEventSheetProps) {
  if (!event) {
    return (
      <ResponsiveSheet open={false} onClose={onClose}>
        <SheetPage name="main"><div /></SheetPage>
      </ResponsiveSheet>
    );
  }

  return (
    <ResponsiveSheet
      open={true}
      onClose={onClose}
      header={<SheetHeader event={event} />}
      defaultPage={defaultPage || 'main'}
    >
      <SheetPage name="main">
        <MainPageContent event={event} />
      </SheetPage>
      {event.subEvents.map((sub) => (
        <SheetPage key={sub.id} name={sub.id} title={sub.title}>
          <SubEventContent subEvent={sub} />
        </SheetPage>
      ))}
    </ResponsiveSheet>
  );
}
