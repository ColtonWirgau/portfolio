'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
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
  storyPath?: string;
  narrative?: ReactNode[];
  narrativeImages?: string[];
  pullQuote?: string;
}

// ── Data ──

export const lifeEvents: LifeEvent[] = [
  {
    id: 'algonac',
    label: 'Algonac',
    year: 'Childhood',
    tagline: 'Where it started',
    storyPath: '/childhood',
    description:
      'I grew up in Algonac, a small river town on the St. Clair River. It\'s the kind of place where everybody knows everybody. This is where I first got curious about building things. Tearing apart computers, making terrible websites, and figuring out how stuff works.',
    highlights: [
      'Algonac High School — IB Diploma Recipient',
      'Graduated 3rd in class with a 4.2 GPA',
      '7 school records in track & field',
      'All-State & all-time leading scorer for Algonac HS — Hall of Fame',
      'Captain of the football team — All-Area selection',
    ],
    narrative: [
      'I grew up in a small river town in Michigan called Algonac. I was in the International Baccalaureate program, graduated third in my class with a 4.2 GPA, and was captain of the football team. I also ran track and ended up as the program\u2019s all-time leading scorer and a Hall of Famer.',
      'But even then, I liked building things just as much as competing.',
      'I also grew up in a church my great grandfather started. Faith has always been a central part of my life. It shaped how I see people, how I lead, and how I believe people should be treated. I care a lot about treating people with kindness, with grace, and with the same patience that\u2019s been shown to me. That doesn\u2019t stop at church. It carries into my work, my teams, and how I build things.',
    ],
    narrativeImages: [
      'https://images.unsplash.com/photo-1461896836934-bd45ba8fcb0a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=400&fit=crop',
    ],
    subEvents: [
      {
        id: 'algonac-ib',
        title: 'IB Diploma Recipient',
        description:
          'Completed the full International Baccalaureate Diploma at Algonac High School, one of the most rigorous academic tracks available. Graduated 3rd in class with a 4.2 GPA.',
      },
      {
        id: 'algonac-track',
        title: 'Track & Field Records',
        description:
          'Set 7 school records in track & field. All-State selection and the all-time leading scorer in Algonac HS history. Inducted into the Hall of Fame.',
      },
      {
        id: 'algonac-football',
        title: 'Football Captain',
        description:
          'Captain of the football team. Earned All-Area honors and helped lead the team through some of its best seasons.',
      },
      {
        id: 'algonac-faith',
        title: 'Faith & Foundation',
        description:
          'Grew up in a church my great grandfather started. Faith has always been a central part of my life. It shaped how I see people, how I lead, and how I believe people should be treated. I care a lot about treating people with kindness, with grace, and with the same patience that\'s been shown to me. That doesn\'t stop at church. It carries into my work, my teams, and how I build things.',
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
    storyPath: '/college',
    description:
      'Went to school at the University of Detroit Mercy, where the energy of the city shaped my hustle. Graduated with honors with a BS in Software Engineering and a minor in Leadership. College is where I fell in love with building things that people actually use. Not just writing code, but solving real problems.',
    highlights: [
      'BS Software Engineering, Minor in Leadership — Graduated with Honors',
      'Division I track & field athlete — Student Athlete of the Year',
      'Seven Time All-Horizon League selection (Track & Field)',
      'Published: "Sylvester: An Approach to Emotion Classification"',
      'Embedded Systems Engineering Intern at Continental Automotive',
      'IT Coordinator — integrated websites, databases, and new systems for the university',
      'Most sought-after tutor at the Student Success Center',
      'Star of a UDM commercial — yes, really',
    ],
    narrative: [
      'That mindset followed me to the University of Detroit Mercy, where I studied software engineering with a leadership minor and ran track. I chose software engineering over computer science because I knew I didn\u2019t just want to write code. I wanted to lead people and build things that actually help them. Along the way, I got published for my work in AI. Our team built Sylvester, a program that learned the language of Twitter through automatic annotation and classification, interpreting tweets in real time to determine how people feel about any given subject. It was published in New Trends in Information Technology in 2017.',
      'During college, I worked as a tutor at the learning center. It started as helping students, but it turned into rebuilding their entire system. Scheduling, time tracking, reporting. Everything had been manual. I moved it online and dragged the whole operation out of the stone age.',
      'At the same time, I was leading worship at my church, playing music, running events, and somehow balancing all of it. I still love that side of my life. Music, creativity, and working with people have always been a big part of who I am.',
    ],
    narrativeImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
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
          'Published "Sylvester: An Approach to Emotion Classification" in New Trends in Information Technology, 2017. A collaborative AI program that learns the language of Twitter through automatic annotation and classification, collecting and interpreting tweets in real time to determine how users feel emotionally about any given subject based on current language.',
      },
      {
        id: 'detroit-music',
        title: 'Music & Worship',
        description:
          'Led worship at church throughout college, playing music, running events, and balancing it all with academics and athletics. Music, creativity, and working with people have always been a big part of who I am. Still plays at Woodside Bible Church and has played many large shows over the years.',
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
        id: 'detroit-commercial',
        title: 'The UDM Commercial',
        description:
          'Somehow I ended up as the star of a University of Detroit Mercy commercial. I\'m not entirely sure how it happened, but it did, and I\'m told it was very convincing. Video and photos coming soon.',
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
    storyPath: '/career',
    description:
      'Software Development Manager and Full-Stack Developer at Woodside Bible Church since 2016. As the sole in-house developer, I design and build internal tools, platforms, and widgets that serve thousands of people every week while managing contractors and coordinating with MarCom.',
    highlights: [
      'Software Dev Manager / Full-Stack Developer since 2016',
      'Built apps.woodsidebible.org from scratch',
      'MinistryPlatform "Deep Space Award" recipient',
      'Features adopted by MP\'s main product for all customers',
      'Lead UI/UX across all digital products',
      'Started own business helping churches build better tools',
    ],
    narrative: [
      'After graduating, Woodside didn\u2019t want to lose me, so they created a role for me. I stepped into web development, database work, and solving problems that nobody else had time to touch. One of my first projects was cleaning up our database. I ended up deactivating about two thirds of it and building better systems to track real engagement. Some of that work eventually made its way into the main MinistryPlatform product.',
      'From there, I started my own business. I saw the same problems popping up across churches everywhere, so I began helping teams build better tools, better experiences, and better systems. A lot of what I do now lives at the intersection of product thinking, UX, and real-world ministry needs.',
    ],
    narrativeImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
    ],
    pullQuote: 'I care a lot about clarity. Not overwhelming people. Saying just enough, at the right time. Good design should feel obvious.',
    subEvents: [
      {
        id: 'troy-platform',
        title: 'Apps.WoodsideBible.org',
        description:
          'Built a unified Next.js platform that simplifies major organizational workflows by centralizing operations, automating data tasks, and providing clean interfaces for both staff and community use across multiple campuses.',
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
          'Lead UI/UX across all digital products at Woodside. Every screen, every flow, every interaction. Obsessing over the details so users don\'t have to think. Also a major contributor to "MP Next," an open-source Next.js template for MinistryPlatform API integration.',
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
    storyPath: '/family',
    description:
      'We live in Clarkston now, a quiet town north of Detroit. It\'s home base. Married Sarah at the Grosse Ile Municipal Airport, which probably tells you everything you need to know about us. When I\'m not building products, you\'ll find me here with my family.',
    highlights: [
      'Married Sarah at the Grosse Ile Municipal Airport',
      'Home with Sarah, Weston (3), and Rosie (1)',
      'Two very different dogs',
    ],
    narrative: [
      'These days, I live in Clarkston, Michigan with my wife Sarah, our two kids, and two very different dogs. When I\u2019m not building something, I\u2019m probably playing music, flying with my wife, or chasing kids around the house.',
    ],
    narrativeImages: [
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
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
          'Home with Sarah, Weston (3), and Rosie (1). A quiet town north of Detroit. Home base for family life and side projects alike.',
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
    storyPath: '/hobbies',
    description:
      'Music and sports are the two things that keep me balanced. I play music at Woodside Bible Church and have played a lot of huge shows over the years. I still play flag football and I\'m a diehard Detroit Lions season ticket holder.',
    highlights: [
      'Musician — writer, electric guitar, tracks, drums, bass, keys, vocals',
      'Football — still play flag football, Detroit Lions season ticket holder',
      'Tattoos',
    ],
    subEvents: [
      {
        id: 'hobbies-music',
        title: 'Music',
        description:
          'I\'ve worked with artists like Detroit Collective, Elevation Worship, Maverick City Music, Chris Tomlin, Switchfoot, and many more. I\'m known mainly as a writer, electric guitar player, and track builder, but I\'ve also played a lot of drums, bass, keys, and sung/led worship. I was on staff as a worship director at Woodside for about 5 years and I\'m widely known as the Ableton guru of the metro Detroit area.',
      },
      {
        id: 'hobbies-football',
        title: 'Football',
        description:
          'Football never really stopped for me. I still play flag football and I\'m a proud Detroit Lions season ticket holder. I even built RoarTracker, a personal app to manage season tickets, track attendance, resale, and spending data.',
      },
      {
        id: 'hobbies-tattoos',
        title: 'Tattoos',
        description:
          'I have a full sleeve of tattoos, and every piece was designed with intention. Each one tells part of my story. Faith, family, things I\'ve been through, things I believe in. I see them as a form of design in their own right. Detailed photos and the stories behind each piece coming soon.',
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

// ── Narrative page content ──

function NarrativeContent({ event }: { event: LifeEvent }) {
  return (
    <div style={{ padding: '28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {event.narrative?.map((paragraph, i) => (
          <p key={i} style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Narrative images */}
      {event.narrativeImages && event.narrativeImages.length > 0 && (
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '28px' }}>
          {event.narrativeImages.map((src, i) => (
            <div key={i} style={{
              width: i === 0 ? 140 : 100,
              height: i === 0 ? 140 : 100,
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'var(--color-border)',
            }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}

      {/* Pull quote */}
      {event.pullQuote && (
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '15px',
            fontStyle: 'italic',
            color: 'var(--color-fg)',
            lineHeight: 1.6,
          }}>
            {event.pullQuote}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main page content (overview with clickable sub-events) ──

function MainPageContent({ event }: { event: LifeEvent }) {
  return (
    <div style={{ padding: '28px' }}>
      {/* Description */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)', marginBottom: '20px' }}>
        {event.description}
      </p>

      {/* Highlights as pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {event.highlights.map((h, i) => (
          <span key={i} style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-muted)',
            padding: '5px 12px',
            borderRadius: '100px',
            border: '1px solid var(--color-border)',
            lineHeight: 1.3,
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* The Full Story link - bottom right */}
      {event.storyPath && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={event.storyPath}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-accent)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            The Full Story
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </div>
      )}
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
    </ResponsiveSheet>
  );
}
