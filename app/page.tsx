'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';

// Placeholder images from Unsplash
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    alt: 'Developer workspace',
    rotation: -8,
    position: { top: '10%', left: '5%' },
    size: 'w-64 h-80',
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    alt: 'Coding on laptop',
    rotation: 12,
    position: { top: '15%', right: '10%' },
    size: 'w-72 h-72',
  },
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    alt: 'Code on screen',
    rotation: -5,
    position: { bottom: '15%', left: '15%' },
    size: 'w-80 h-56',
  },
];

const rotatingStatements = [
  { text: '8 years building systems', color: 'accent-orange' },
  { text: 'Product-minded engineer', color: 'accent-blue' },
  { text: 'Dad. Developer. Lions fan.', color: 'accent-purple' },
  { text: 'Deep Space Award Winner', color: 'accent-green' },
];

export default function Home() {
  const [currentStatement, setCurrentStatement] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Rotate statements every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatement((prev) => (prev + 1) % rotatingStatements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      {/* Dynamic Hero Section with Tilted Photos */}
      <Section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background tilted photos */}
        <div className="absolute inset-0 pointer-events-none">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              className={`photo-frame absolute ${image.size} hidden lg:block`}
              style={{
                ...image.position,
                rotate: image.rotation,
                zIndex: 0,
              }}
              initial={{ opacity: 0, scale: 0.8, rotate: image.rotation - 10 }}
              animate={{ opacity: 1, scale: 1, rotate: image.rotation }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover rounded"
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="w-full relative z-10"
          style={{ opacity, scale }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated rotating statement badge */}
            <motion.div
              key={currentStatement}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="inline-block mb-8"
            >
              <div
                className={`px-6 py-3 rounded-full text-white font-bold text-sm md:text-base shadow-lg`}
                style={{
                  background: `var(--${rotatingStatements[currentStatement].color})`,
                }}
              >
                {rotatingStatements[currentStatement].text}
              </div>
            </motion.div>

            {/* Unique tagline inspired by "FIND ? YOUR DREAM" */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-2">
                <span className="text-accent-orange">BUILD</span>
                <span className="relative inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-muted text-muted-foreground border-4 border-border">
                  <span className="text-3xl md:text-5xl lg:text-6xl">?</span>
                </span>
                <span className="text-accent-blue">CRAFT</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                <span className="text-accent-purple">YOUR</span>
                <span className="bg-gradient-to-r from-accent-green via-accent-orange to-accent-pink bg-clip-text text-transparent">
                  FUTURE
                </span>
              </div>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Transforming complexity into intuitive experiences.
              <br />
              Not just code — crafting what users love.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/case-studies">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  View My Work
                </Button>
              </Link>
              <Link href="/work-with-me">
                <Button variant="secondary" size="lg">
                  Work With Me
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="text-sm">Scroll Down</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* What I Do Section */}
      <Section className="bg-gradient-to-b from-background to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            What I Do
          </h2>
          <p className="text-center text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
            I bridge engineering and product thinking
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ),
              title: 'Product-Minded Development',
              description: 'Transform complex systems into intuitive experiences with user-centered design thinking.',
              color: 'accent-orange',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              ),
              title: 'Full-Stack Architecture',
              description: 'Build modern, scalable solutions with Next.js, React, TypeScript, and Node.js.',
              color: 'accent-blue',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
              title: 'Technical Leadership',
              description: 'Lead teams, mentor developers, and drive innovation through problem-solving.',
              color: 'accent-purple',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              ),
              title: 'Contract Development',
              description: 'Custom applications, API integrations, and dashboards that solve real problems.',
              color: 'accent-green',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card
                glass
                hover
                className="h-full border-2 border-transparent hover:border-accent/50 transition-all"
              >
                <div className="mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                    style={{ background: `var(--${item.color})` }}
                  >
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Work Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Featured Work
          </h2>
          <p className="text-center text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
            Real projects solving real problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            {
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
              tags: ['Next.js', 'React', 'TypeScript'],
              title: 'Apps.WoodsideBible.org',
              description: 'Unified full-stack platform simplifying major organizational workflows. Methods and UI concepts later adopted by MinistryPlatform core product.',
              link: '/case-studies',
              color: 'accent-orange',
              rotation: -2,
            },
            {
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
              tags: ['React', 'Next.js', 'API Design'],
              title: 'Dynamic Insights Widgets',
              description: 'Transformed static reports into interactive dashboards with custom embedded widgets. Innovation later adopted across the MinistryPlatform ecosystem.',
              link: '/case-studies',
              color: 'accent-blue',
              rotation: 2,
            },
            {
              image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
              tags: ['UX Redesign', 'Next.js', 'Product Thinking'],
              title: 'Sleeper App Redesign',
              description: 'Unsolicited redesign improving UX for key features. Working interactive prototype demonstrating product-minded problem solving.',
              link: '/case-studies',
              color: 'accent-purple',
              rotation: -1,
            },
            {
              image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
              tags: ['Next.js', 'Supabase', 'PostgreSQL'],
              title: 'RoarTracker',
              description: 'Season ticket management app for Detroit Lions games. Tracks attendance, resale, and spending with clean data visualization.',
              link: '/case-studies',
              color: 'accent-green',
              rotation: 1,
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card hover className="overflow-hidden group">
                <div
                  className="photo-frame mb-6"
                  style={{ transform: `rotate(${project.rotation}deg)` }}
                >
                  <div className="aspect-video overflow-hidden rounded">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="mb-3 flex gap-2 flex-wrap">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-3 py-1 rounded-full text-white font-medium"
                      style={{ background: `var(--${project.color})` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                <Link href={project.link}>
                  <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                    View Project →
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/case-studies">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </Section>
    </PageTransition>
  );
}
