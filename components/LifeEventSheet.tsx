'use client';

import type { ReactNode, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ResponsiveSheet, SheetPage } from './ResponsiveSheet';

// ── Types ──

export interface SubEvent {
  id: string;
  title: string;
  description: string;
  /** Scannable achievement chips; use for stat-heavy sections, not stories. */
  badges?: string[];
  images?: string[];
  /** If set, the section becomes clickable and hands off to another sheet. */
  linksTo?: 'ai-research';
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
  gallery?: string[];
  pullQuote?: string;
  /** Achievement chips under the intro description. */
  mainBadges?: string[];
  /** Optional lead filmstrip under the description; sections carry their own photos. */
  mainPhotos?: string[];
  /** Photos shown whole in the header; defaults to [image]. */
  headerPhotos?: string[];
}

// ── Data ──

export const lifeEvents: LifeEvent[] = [
  {
    id: 'algonac',
    label: 'Algonac',
    year: 'Childhood',
    tagline: 'Where it started',
    storyPath: '/childhood',
    description: '',
    highlights: [
      'Algonac High School: IB Diploma Recipient',
      'Graduated 3rd in class with a 4.2 GPA',
      '7 school records in track & field',
      'All-State & all-time leading scorer for Algonac HS, Hall of Fame',
      'Captain of the football team, All-Area selection',
    ],
    narrative: [
      'I grew up in a small river town in Michigan called Algonac. I was in the International Baccalaureate program, graduated third in my class with a 4.2 GPA, and was captain of the football team. I also ran track and ended up as the program\u2019s all-time leading scorer and a Hall of Famer.',
      'But even then, I liked building things just as much as competing.',
      'I also grew up in a church my great grandfather started. Faith has always been a central part of my life. It shaped how I see people, how I lead, and how I believe people should be treated. I care a lot about treating people with kindness, with grace, and with the same patience that\u2019s been shown to me. That doesn\u2019t stop at church. It carries into my work, my teams, and how I build things.',
    ],
    narrativeImages: [
      '/images/algonac-childhood.webp',
      '/images/algonac-football.webp',
      '/images/HSTrack8.jpg',
    ],
    gallery: [
      '/images/algonac-ib-diploma.webp',
      '/images/algonac-track-blocks.webp',
      '/images/HSTrack7.jpg',
      '/images/HSTrack3.jpg',
      '/images/HSTrack4.jpg',
      '/images/HSTrack2.jpg',
      '/images/HSTrack6.jpg',
      '/images/HSTrack5.jpg',
      '/images/HSTrack1.jpg',
      '/images/HS2.jpg',
    ],
    subEvents: [
      {
        id: 'algonac-ib',
        title: 'International Baccalaureate Diploma Programme',
        description:
          'If you haven\'t met the IB: it\'s a two-year, all-in academic program where every subject runs at the highest level and everything is capped with internationally graded essays and exams. Very, very challenging, and worth it: I walked into college with about 54 credits already banked.',
        badges: [
          'IB Diploma recipient',
          '4.2 GPA',
        ],
        images: [
          '/images/algonac-ib-diploma.webp',
          '/images/ib-logo.webp',
        ],
      },
      {
        id: 'algonac-track',
        title: 'Track & Field',
        description:
          'My job was simple: show up wherever points were available. I started as a mile-and-400 runner and worked my way down to the sprints, running everything from the 60 to the 400 by senior year, with the 400 as my main race and the anchor leg on most of our relays. All of it eventually bought me a Division I lane in Detroit.',
        badges: [
          '7 school records',
          'All-State',
          'All-time leading scorer in Algonac HS history',
          'Hall of Fame',
        ],
        images: [
          '/images/HSTrack8.jpg',
          '/images/HSTrack7.jpg',
        ],
      },
      {
        id: 'algonac-football',
        title: 'Football',
        description:
          'I played safety, running back, and wide receiver, returned punts and kicks, and even handled place kicking. About the only time I came off the field was kickoff. They called me the Energizer Bunny.',
        badges: [
          'Team captain',
          'All-Area selection',
        ],
        images: [
          '/images/algonac-football.webp',
          '/images/HS2.jpg',
        ],
      },
      {
        id: 'algonac-faith',
        title: 'Faith & Foundation',
        description:
          'I grew up in a church my great grandfather started, and faith has shaped how I see people, how I lead, and how I believe people should be treated: with kindness, grace, and the same patience that\'s been shown to me. That doesn\'t stop at church. It carries into my work, my teams, and how I build things.',
        images: [
          '/images/algonac-church.webp',
          '/images/algonac-youth-group.webp',
        ],
      },
    ],
    headerPhotos: [
      '/images/algonac-childhood.webp',
      '/images/algonac-graduation-speech.webp',
    ],
    image: '/images/algonac-graduation-speech.webp',
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
      'Went to school at the University of Detroit Mercy, where the energy of the city shaped my hustle. College is where I fell in love with building things that people actually use. Not just writing code, but solving real problems. I also somehow ended up as the star of a UDM commercial (lol).',
    mainBadges: [
      'BS Software Engineering',
      'Leadership Minor',
      'Graduated with honors',
    ],
    highlights: [
      'BS Software Engineering, Minor in Leadership, Graduated with Honors',
      'Division I track & field athlete, Student Athlete of the Year',
      'Seven Time All-Horizon League selection (Track & Field)',
      'Published: "Sylvester: An Approach to Emotion Classification"',
      'Embedded Systems Engineering Intern at Continental Automotive',
      'Learning Center: most sought-after tutor, promoted to IT Coordinator',
      'Star of a UDM commercial (yes, really)',
    ],
    narrative: [
      'That mindset followed me to the University of Detroit Mercy, where I studied software engineering with a leadership minor and ran track. I chose software engineering over computer science because I knew I didn\u2019t just want to write code. I wanted to lead people and build things that actually help them. Along the way, I got published for my work in AI. Our team built Sylvester, a program that learned the language of Twitter through automatic annotation and classification, interpreting tweets in real time to determine how people feel about any given subject. It was published in New Trends in Information Technology in 2017.',
      'During college, I worked as a tutor at the learning center. It started as helping students, but it turned into rebuilding their entire system. Scheduling, time tracking, reporting. Everything had been manual. I moved it online and dragged the whole operation out of the stone age.',
    ],
    narrativeImages: [
      '/images/CollegeTrack2.jpg',
      '/images/CollegeTrack3.jpg',
    ],
    gallery: [
      '/images/udm-commercial-model.webp',
      '/images/udm-commercial-cleanup.webp',
    ],
    mainPhotos: [
      '/images/udm-commercial-cleanup.webp',
      '/images/udm-commercial-model.webp',
    ],
    subEvents: [
      {
        id: 'detroit-d1',
        title: 'D1 Track & Field',
        description:
          'Ran Division I track & field at Detroit Mercy while carrying a full software engineering course load. Balancing a full season against an engineering degree taught me more about time management and discipline than any class did.',
        badges: [
          'Student Athlete of the Year',
          '7x All-Horizon League',
        ],
        images: [
          '/images/CollegeTrack2.jpg',
          '/images/CollegeTrack3.jpg',
        ],
      },
      {
        id: 'detroit-ai',
        title: 'AI Research Publication',
        description:
          'Sylvester learned the language of Twitter through automatic annotation and classification, reading tweets in real time to classify how people felt about any given subject. Pre-LLM NLP at its messiest: tokenization, language drift, sarcasm, slang, and ambiguity at scale. Co-authored with Jalil Dennis and Dr. Shadi Banitaan.',
        linksTo: 'ai-research',
        badges: [
          'Published AI Research',
          'NTIT 2017',
          'Sentiment Analysis',
          'Real-time Classification',
          'Automatic Annotation',
        ],
        images: [
          '/images/sylvester-page-1.webp',
          '/images/sylvester-flow.webp',
        ],
      },
      {
        id: 'detroit-continental',
        title: 'Continental Automotive Internship',
        description:
          'Built the graphical interface used to test a cybersecurity module found in many Chrysler and Jeep vehicles, verifying that every plugged-in module met the security requirements.',
        badges: [
          'Embedded Systems Engineering Intern',
          'Summer 2015',
          'Heavily C-based',
        ],
        images: [
          '/images/continental-logo.webp',
        ],
      },
      {
        id: 'detroit-ssc-it',
        title: 'Learning Center: Tutor to IT Coordinator',
        description:
          'I started as a tutor and moved into IT after building the center an automated platform, tied to student ID cards, that replaced its paper timecards and appointment tracking. After graduation they brought me back to extend it to three more departments.',
        badges: [
          'Most-requested tutor',
          'Promoted to IT Coordinator',
        ],
        images: [
          '/images/udm-ssc-team.webp',
          '/images/udm-learning-center.webp',
        ],
      },
    ],
    image: '/images/college-track-1.webp',
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
    subEvents: [
      {
        id: 'troy-origin',
        title: 'My Role',
        description:
          'My role covers web development, a lot of database work, and the internal systems nobody else has time to touch. Some of what I\'ve built has been folded into MinistryPlatform\'s core product, and seeing the same problems at churches everywhere is what led me to start my own business.',
      },
      {
        id: 'troy-team',
        title: 'The Team',
        description:
          'Being the sole developer doesn\'t mean working solo. I\'m on a staff I genuinely enjoy being around, and that culture is a big part of why I\'ve stuck around. These are from one of our team events.',
        images: [
          '/images/woodside-team-event-1.webp',
          '/images/woodside-team-event-2.webp',
        ],
      },
    ],
    image: '/images/Work1.jpeg',
    lat: 42.6064,
    lng: -83.1498,
  },
  {
    id: 'clarkston',
    label: 'Clarkston',
    year: 'Family',
    tagline: 'Where I call home',
    storyPath: '/family',
    description: '',
    highlights: [
      'Married Sarah at the Grosse Ile Municipal Airport',
      'Home with Sarah, Weston (3), and Rosie (1)',
      'Two very different dogs',
    ],
    narrative: [
      'These days, I live in Clarkston, Michigan with my wife Sarah, our two kids, and two dogs with nothing in common. When I\u2019m not building something, I\u2019m probably playing music, flying with my wife, or chasing kids around the house.',
    ],
    narrativeImages: [
      '/images/family-newborn.webp',
    ],
    subEvents: [
      {
        id: 'clarkston-wedding',
        title: 'The Airport Wedding',
        description:
          'Got married to Sarah at the Grosse Ile Municipal Airport. Yes, an actual airport. It was unconventional, personal, and exactly what we wanted.',
        badges: [
          'Mexican food',
          'Helicopter sendoff',
        ],
        images: [
          '/images/wedding-plane.webp',
          '/images/wedding-hangar.webp',
          '/images/family-wedding-dance.webp',
        ],
      },
      {
        id: 'clarkston-family',
        title: 'Family Life',
        description:
          'Home with Sarah, Weston (3), and Rosie (1). A quiet town north of Detroit. Home base for family life and side projects alike. When I\'m not building something, I\'m probably playing music, flying with Sarah, or chasing kids around the house.',
        badges: [
          'Father of 2',
          'Married to Sarah',
          'Boy dad & girl dad',
          'Clarkston, MI',
        ],
        images: [
          '/images/family-of-four.webp',
          '/images/family-newborn.webp',
        ],
      },
    ],
    image: '/images/family-embrace.webp',
    lat: 42.7356,
    lng: -83.4191,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    year: 'Hobbies',
    tagline: 'What recharges me',
    storyPath: '/hobbies',
    description: '',
    highlights: [
      'Musician: writer, electric guitar, tracks, drums, bass, keys, vocals',
      'Football: still play flag football, Detroit Lions season ticket holder',
      'Tattoos',
    ],
    subEvents: [
      {
        id: 'hobbies-music',
        title: 'Music',
        description:
          'I\'ve worked with artists like Detroit Collective, Elevation Worship, Maverick City Music, Chris Tomlin, Switchfoot, and many more. I\'m known mainly as a writer, electric guitar player, and track builder, but I\'ve also played a lot of drums, bass, keys, and sung/led worship. I was on staff as a worship director at Woodside for about 3 years and I\'m widely known as the Ableton guru of the metro Detroit area.',
        images: [
          '/images/music-2.webp',
          '/images/music-3.webp',
        ],
      },
      {
        id: 'hobbies-football',
        title: 'Football',
        description:
          'Football never really stopped for me. I still play flag football and I\'m a proud Detroit Lions season ticket holder. I even built RoarTracker, a personal app to manage season tickets, track attendance, resale, and spending data.',
        images: [
          '/images/hobbies-flag-football.webp',
          '/images/hobbies-ford-field.webp',
        ],
      },
      {
        id: 'hobbies-tattoos',
        title: 'Tattoos',
        description:
          'I have a full sleeve of tattoos, and every piece was designed with intention. Each one tells part of my story. Faith, family, things I\'ve been through, things I believe in. I see them as a form of design in their own right. Two of them are here: a traditional eagle and the squid.',
        images: [
          '/images/tattoo-eagle.webp',
          '/images/tattoo-squid.webp',
        ],
      },
    ],
    image: '/images/music-1.webp',
    gallery: [
      '/images/music-2.webp',
      '/images/music-3.webp',
    ],
    lat: 42.7356,
    lng: -83.4191,
  },
];

// ── Sheet Header ──

function SheetHeader({ event, collapsed = false }: { event: LifeEvent; collapsed?: boolean }) {
  return (
    <div className="relative overflow-hidden" style={{ height: collapsed ? '64px' : '240px', background: '#22201C', transition: 'height 0.3s ease' }}>
      {/* The same photo, blurred and darkened, fills the wide header so the
          real (often portrait) image never has to be crop-beheaded */}
      <img
        src={event.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'blur(26px) brightness(0.5) saturate(1.05)', transform: 'scale(1.2)' }}
      />
      {/* The full photo(s), shown whole, anchored right; capped at 48% of the
          header so they can never collide with the title block (52%) */}
      <div
        className="absolute inset-y-0 right-0 flex items-center justify-end"
        style={{ padding: '18px 20px 18px 0', maxWidth: '48%', gap: '10px', opacity: collapsed ? 0 : 1, transition: 'opacity 0.25s ease' }}
      >
        {(event.headerPhotos ?? [event.image]).map((src) => (
          <img
            key={src}
            src={src}
            alt={event.label}
            style={{
              height: '100%',
              width: 'auto',
              maxWidth: `${Math.floor(100 / (event.headerPhotos?.length ?? 1))}%`,
              objectFit: 'cover',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
            }}
          />
        ))}
      </div>
      {/* Title block over the blurred side */}
      <div className="absolute bottom-0 left-0" style={{ padding: collapsed ? '14px 28px' : '24px 28px', maxWidth: collapsed ? '90%' : '52%', transition: 'padding 0.3s ease' }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          marginBottom: collapsed ? 0 : '6px',
          maxHeight: collapsed ? 0 : '16px',
          opacity: collapsed ? 0 : 1,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }} className="uppercase text-white/50">
          {event.year}
        </div>
        <h3 style={{ fontSize: collapsed ? '18px' : '28px', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, transition: 'font-size 0.3s ease' }} className="text-white">
          {event.label}
        </h3>
      </div>
    </div>
  );
}

// ── Photo cluster: prints scattered on the desk, not a filmstrip ──
// Photos get a white mat, a soft shadow, and a staggered tilt; hovering
// straightens them. Anything named like a logo renders as a small "seal"
// tucked against the previous photo instead of a framed print.

const TILTS = [-3.5, 2.5, -2, 3, -1.5];

// White pill chips, styled to match the polaroid mats
function BadgeRow({ badges, marginTop = '14px' }: { badges: string[]; marginTop?: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop }}>
      {badges.map((b) => (
        <span
          key={b}
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-fg)',
            background: 'var(--color-card)',
            padding: '6px 13px',
            borderRadius: '100px',
            boxShadow: '0 2px 8px rgba(34, 33, 30, 0.12)',
            lineHeight: 1.3,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  );
}

// Two photos as an overlapping pair: the first sits as the base (in flow,
// nudged down and left, so it drives the container height), the second layers
// on top of it on the far side. Height-capped so a portrait shot stays as
// compact as a landscape one instead of stacking tall.
function OverlapPair({ photos }: { photos: string[] }) {
  const [base, top] = photos;
  const frame = {
    boxSizing: 'border-box' as const,
    background: '#FDFBF6',
    padding: '8px 8px 20px',
    boxShadow: '0 8px 22px rgba(34, 33, 30, 0.22)',
  };
  const size = { display: 'block', width: 'auto', height: 'auto', maxWidth: '60%', maxHeight: '176px', objectFit: 'cover' as const };
  return (
    <div style={{ position: 'relative', width: '300px', maxWidth: '100%', margin: '0 auto' }}>
      <img
        src={base}
        alt=""
        loading="lazy"
        style={{ ...frame, ...size, marginTop: '26px', transform: 'rotate(-2.5deg)', position: 'relative', zIndex: 1 }}
      />
      <img
        src={top}
        alt=""
        loading="lazy"
        style={{ ...frame, ...size, position: 'absolute', top: 0, right: 0, transform: 'rotate(2.5deg)', zIndex: 2, boxShadow: '0 14px 30px rgba(34, 33, 30, 0.32)' }}
      />
    </div>
  );
}

// Three photos as a compact scattered cluster: two tucked at the top corners,
// one layered lower-center on top. The lower photo sits in flow so it drives
// the height; all three are height-capped so the pile stays tight.
function OverlapTrio({ photos }: { photos: string[] }) {
  const [a, b, c] = photos;
  const frame = {
    boxSizing: 'border-box' as const,
    background: '#FDFBF6',
    padding: '7px 7px 18px',
    boxShadow: '0 8px 22px rgba(34, 33, 30, 0.22)',
  };
  const size = { display: 'block', width: 'auto', height: 'auto', maxWidth: '54%', maxHeight: '138px', objectFit: 'cover' as const };
  return (
    <div style={{ position: 'relative', width: '300px', maxWidth: '100%', margin: '0 auto' }}>
      <img src={a} alt="" loading="lazy" style={{ ...frame, ...size, position: 'absolute', top: '10px', left: 0, transform: 'rotate(-3.5deg)', zIndex: 1 }} />
      <img src={b} alt="" loading="lazy" style={{ ...frame, ...size, position: 'absolute', top: 0, right: 0, transform: 'rotate(3deg)', zIndex: 2 }} />
      <img src={c} alt="" loading="lazy" style={{ ...frame, ...size, marginTop: '74px', marginLeft: '23%', transform: 'rotate(1.5deg)', position: 'relative', zIndex: 3, boxShadow: '0 14px 30px rgba(34, 33, 30, 0.32)' }} />
    </div>
  );
}

function PhotoCluster({ photos, seed = 0 }: { photos: string[]; seed?: number }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '12px 6px' }}>
      {photos.map((src, i) => {
        if (src.includes('logo')) {
          // Logos render flat: as a seal tucked against the previous photo,
          // or standing alone when a section has no photo to lean on.
          const overlapsPhoto = i > 0;
          return (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              style={{
                maxHeight: '72px',
                maxWidth: '280px',
                width: 'auto',
                height: 'auto',
                position: 'relative',
                ...(overlapsPhoto
                  ? {
                      marginLeft: '-38px',
                      marginBottom: '-64px',
                      zIndex: 2,
                      filter: 'drop-shadow(0 4px 10px rgba(34, 33, 30, 0.35))',
                    }
                  : { margin: '8px 12px' }),
              }}
            />
          );
        }
        const rot = TILTS[(i + seed) % TILTS.length];
        return (
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            style={{
              height: i % 2 === 0 ? '200px' : '168px',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'cover',
              background: '#FDFBF6',
              padding: '8px 8px 26px',
              boxShadow: '0 8px 22px rgba(34, 33, 30, 0.22)',
              transform: `rotate(${rot}deg)`,
              margin: '4px -6px',
              position: 'relative',
              zIndex: 1,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main page content (everything inline: sections with their photos) ──

function MainPageContent({ event, onOpenAIResearch }: { event: LifeEvent; onOpenAIResearch?: () => void }) {
  const hasIntro = Boolean(event.description || (event.mainPhotos && event.mainPhotos.length > 0) || event.pullQuote);
  return (
    <div style={{ padding: '28px 32px 32px' }}>
      {/* Intro: text (and pills) on the right, lead photos on the left */}
      {(event.description || (event.mainBadges && event.mainBadges.length > 0) || (event.mainPhotos && event.mainPhotos.length > 0)) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: '12px 36px',
          }}
        >
          <div style={{ flex: '1 1 340px', minWidth: '260px', display: 'flex', flexDirection: 'column' }}>
            {event.description && (
              <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
                {event.description}
              </p>
            )}
            {event.mainBadges && event.mainBadges.length > 0 && (
              <div style={{ marginTop: 'auto' }}>
                <BadgeRow badges={event.mainBadges} />
              </div>
            )}
          </div>
          {event.mainPhotos && event.mainPhotos.length > 0 && (
            <div style={{ flex: '0 1 300px', minWidth: '240px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              {event.mainPhotos.length === 2 ? (
                <OverlapPair photos={event.mainPhotos} />
              ) : (
                <PhotoCluster photos={event.mainPhotos} />
              )}
            </div>
          )}
        </div>
      )}

      {/* Pull quote */}
      {event.pullQuote && (
        <div style={{ marginTop: '24px', padding: '4px 0 4px 18px', borderLeft: '3px solid var(--color-accent)' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontStyle: 'italic', color: 'var(--color-fg)', lineHeight: 1.6 }}>
            {event.pullQuote}
          </p>
        </div>
      )}

      {/* Inline sections: text and photos alternate sides, magazine-style */}
      {event.subEvents.map((sub, i) => {
        const hasPhotos = Boolean(sub.images && sub.images.length > 0);
        const flip = i % 2 === 1;
        const leadsSheet = i === 0 && !hasIntro;
        const clickable = sub.linksTo === 'ai-research' && Boolean(onOpenAIResearch);
        return (
          <section
            key={sub.id}
            {...(clickable
              ? {
                  role: 'button',
                  tabIndex: 0,
                  onClick: onOpenAIResearch,
                  onKeyDown: (e: ReactKeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenAIResearch!();
                    }
                  },
                }
              : {})}
            style={{
              borderTop: leadsSheet ? 'none' : '1px solid var(--color-border)',
              marginTop: leadsSheet ? 0 : '26px',
              paddingTop: leadsSheet ? 0 : '22px',
              cursor: clickable ? 'pointer' : undefined,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: flip ? 'row-reverse' : 'row',
                flexWrap: 'wrap',
                alignItems: 'stretch',
                gap: '12px 36px',
              }}
            >
              <div style={{ flex: '1 1 340px', minWidth: '260px', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-fg)', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {sub.title}
                </h4>
                {sub.description && (
                  <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
                    {sub.description}
                  </p>
                )}
                {((sub.badges && sub.badges.length > 0) || clickable) && (
                  <div style={{ marginTop: 'auto' }}>
                    {sub.badges && sub.badges.length > 0 && (
                      <BadgeRow badges={sub.badges} marginTop={sub.description ? '14px' : '4px'} />
                    )}
                    {clickable && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '13px', fontWeight: 600, color: 'var(--color-accent)' }}>
                        See the full research
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </span>
                    )}
                  </div>
                )}
              </div>
              {hasPhotos && (
                <div style={{ flex: '0 1 300px', minWidth: '240px', display: 'flex', alignItems: 'center', justifyContent: flip ? 'flex-start' : 'flex-end' }}>
                  {(() => {
                    const noLogos = !sub.images!.some((p) => p.includes('logo'));
                    if (noLogos && sub.images!.length === 2) return <OverlapPair photos={sub.images!} />;
                    if (noLogos && sub.images!.length === 3) return <OverlapTrio photos={sub.images!} />;
                    return <PhotoCluster photos={sub.images!} seed={i} />;
                  })()}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ── Sheet component ──

interface LifeEventSheetProps {
  event: LifeEvent | null;
  onClose: () => void;
  defaultPage?: string;
  onOpenAIResearch?: () => void;
}

export function LifeEventSheet({ event, onClose, defaultPage, onOpenAIResearch }: LifeEventSheetProps) {
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
      header={({ collapsed }) => <SheetHeader event={event} collapsed={collapsed} />}
      defaultPage={defaultPage || 'main'}
      maxWidth="max-w-5xl"
    >
      <SheetPage name="main">
        <MainPageContent event={event} onOpenAIResearch={onOpenAIResearch} />
      </SheetPage>
    </ResponsiveSheet>
  );
}
