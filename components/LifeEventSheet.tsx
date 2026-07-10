'use client';

import type { ReactNode } from 'react';
import { ResponsiveSheet, SheetPage } from './ResponsiveSheet';

// ── Types ──

export interface SubEvent {
  id: string;
  title: string;
  description: string;
  /** Scannable achievement chips; use for stat-heavy sections, not stories. */
  badges?: string[];
  images?: string[];
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
          'I grew up in a church my great grandfather started, and faith has shaped how I see people, how I lead, and how I believe people should be treated: with kindness, grace, and the same patience that\'s been shown to me.',
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
      'Went to school at the University of Detroit Mercy, where the energy of the city shaped my hustle. College is where I fell in love with building things that people actually use. Not just writing code, but solving real problems. I also somehow ended up as the star of a UDM commercial: that\'s me in the stills, working a build session and out on a community cleanup.',
    mainBadges: [
      'BS Software Engineering',
      'Minor in Leadership',
      'Graduated with honors',
    ],
    highlights: [
      'BS Software Engineering, Minor in Leadership, Graduated with Honors',
      'Division I track & field athlete, Student Athlete of the Year',
      'Seven Time All-Horizon League selection (Track & Field)',
      'Published: "Sylvester: An Approach to Emotion Classification"',
      'Embedded Systems Engineering Intern at Continental Automotive',
      'Student Success Center: most sought-after tutor, promoted to IT Coordinator',
      'Star of a UDM commercial (yes, really)',
    ],
    narrative: [
      'That mindset followed me to the University of Detroit Mercy, where I studied software engineering with a leadership minor and ran track. I chose software engineering over computer science because I knew I didn\u2019t just want to write code. I wanted to lead people and build things that actually help them. Along the way, I got published for my work in AI. Our team built Sylvester, a program that learned the language of Twitter through automatic annotation and classification, interpreting tweets in real time to determine how people feel about any given subject. It was published in New Trends in Information Technology in 2017.',
      'During college, I worked as a tutor at the learning center. It started as helping students, but it turned into rebuilding their entire system. Scheduling, time tracking, reporting. Everything had been manual. I moved it online and dragged the whole operation out of the stone age.',
      'At the same time, I was leading worship at my church, playing music, running events, and somehow balancing all of it. I still love that side of my life. Music, creativity, and working with people have always been a big part of who I am.',
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
      '/images/udm-commercial-model.webp',
      '/images/udm-commercial-cleanup.webp',
    ],
    subEvents: [
      {
        id: 'detroit-d1',
        title: 'D1 Track & Field',
        description:
          'Ran Division I track & field at Detroit Mercy while carrying a full academic load.',
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
        badges: [
          'Peer-reviewed publication',
          'NTIT 2017, University of Jordan',
          '6 emotions classified',
        ],
        images: [
          '/images/sylvester-page-1.webp',
          '/images/sylvester-flow.webp',
        ],
      },
      {
        id: 'detroit-music',
        title: 'Music & Worship',
        description:
          'Led worship at church throughout college while balancing academics and athletics. Music, creativity, and working with people have always been a big part of who I am, and I still play at Woodside today.',
        images: [
          '/images/music-2.webp',
          '/images/music-3.webp',
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
        title: 'Student Success Center: Tutor to IT Coordinator',
        description:
          'I started as a tutor. The center was operationally living in the stone age, and fixing that got me promoted into IT: an automated platform tied to university ID scan cards replaced their paper timecards and appointment tracking. I still tutored here and there, but mostly I was integrating and managing systems, and after graduation they hired me back to roll a new system out across three more departments.',
        badges: [
          'Most-requested tutor',
          'Promoted to IT Coordinator',
          '2015 to 2018',
        ],
        images: [
          '/images/udm-learning-center.webp',
          '/images/udm-ssc-team.webp',
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
    pullQuote: 'I care a lot about clarity. Not overwhelming people. Saying just enough, at the right time. Good design should feel obvious.',
    subEvents: [
      {
        id: 'troy-origin',
        title: 'How It Started',
        description:
          'After graduating, Woodside didn\'t want to lose me, so they created a role for me. I stepped into web development, database work, and solving problems that nobody else had time to touch. One of my first projects was cleaning up our database. I ended up deactivating about two thirds of it and building better systems to track real engagement. Some of that work eventually made its way into the main MinistryPlatform product. Seeing the same problems pop up across churches everywhere is also what led me to start my own business.',
      },
      {
        id: 'troy-platform',
        title: 'Apps.WoodsideBible.org',
        description:
          'Built a unified Next.js platform that simplifies major organizational workflows by centralizing operations, automating data tasks, and providing clean interfaces for both staff and community use across multiple campuses. This internal platform became the foundation for Church Hub.',
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
        images: [
          '/images/wedding-plane.webp',
          '/images/wedding-hangar.webp',
        ],
      },
      {
        id: 'clarkston-family',
        title: 'Family Life',
        description:
          'Home with Sarah, Weston (3), and Rosie (1). A quiet town north of Detroit. Home base for family life and side projects alike. When I\'m not building something, I\'m probably playing music, flying with Sarah, or chasing kids around the house.',
        images: [
          '/images/family-of-four.webp',
          '/images/family-newborn.webp',
          '/images/family-embrace.webp',
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
    description:
      'Music and sports are the two things that keep me balanced. I play music at Woodside Bible Church and have played a lot of huge shows over the years. I still play flag football and I\'m a diehard Detroit Lions season ticket holder.',
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
      },
      {
        id: 'hobbies-tattoos',
        title: 'Tattoos',
        description:
          'I have a full sleeve of tattoos, and every piece was designed with intention. Each one tells part of my story. Faith, family, things I\'ve been through, things I believe in. I see them as a form of design in their own right. Detailed photos and the stories behind each piece coming soon.',
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

function SheetHeader({ event }: { event: LifeEvent }) {
  return (
    <div className="relative overflow-hidden" style={{ height: '240px', background: '#22201C' }}>
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
        style={{ padding: '18px 20px 18px 0', maxWidth: '48%', gap: '10px' }}
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
      <div className="absolute bottom-0 left-0" style={{ padding: '24px 28px', maxWidth: '52%' }}>
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

function MainPageContent({ event }: { event: LifeEvent }) {
  const hasIntro = Boolean(event.description || (event.mainPhotos && event.mainPhotos.length > 0) || event.pullQuote);
  return (
    <div style={{ padding: '28px 32px 32px' }}>
      {/* Description */}
      {event.description && (
        <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
          {event.description}
        </p>
      )}
      {event.mainBadges && event.mainBadges.length > 0 && <BadgeRow badges={event.mainBadges} />}

      {/* Lead photos */}
      {event.mainPhotos && event.mainPhotos.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <PhotoCluster photos={event.mainPhotos} />
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
        return (
          <section
            key={sub.id}
            style={{
              borderTop: leadsSheet ? 'none' : '1px solid var(--color-border)',
              marginTop: leadsSheet ? 0 : '26px',
              paddingTop: leadsSheet ? 0 : '22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: flip ? 'row-reverse' : 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px 36px',
              }}
            >
              <div style={{ flex: '1 1 340px', minWidth: '260px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-fg)', letterSpacing: '-0.01em', marginBottom: '8px' }}>
                  {sub.title}
                </h4>
                {sub.description && (
                  <p style={{ fontSize: '14px', lineHeight: 1.7, fontWeight: 400, color: 'var(--color-muted)' }}>
                    {sub.description}
                  </p>
                )}
                {sub.badges && sub.badges.length > 0 && (
                  <BadgeRow badges={sub.badges} marginTop={sub.description ? '14px' : '4px'} />
                )}
              </div>
              {hasPhotos && (
                <div style={{ flex: '1 1 320px', minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                  <PhotoCluster photos={sub.images!} seed={i} />
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
      maxWidth="max-w-5xl"
    >
      <SheetPage name="main">
        <MainPageContent event={event} />
      </SheetPage>
    </ResponsiveSheet>
  );
}
