import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PageTransition } from '@/components/layout/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <Section className="min-h-[calc(100vh-4rem)] flex items-center">
        <div className="w-full">
          <div className="max-w-4xl">
            <div className="mb-6 text-muted-foreground text-lg">
              Full-Stack Engineer • Product Builder • Michigan
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              I build systems that{' '}
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                feel right
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Product-minded engineer with 8+ years transforming complex problems into intuitive solutions.
              I don't just write code — I craft experiences that users love and systems that scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/case-studies">
                <Button size="lg">View My Work</Button>
              </Link>
              <Link href="/work-with-me">
                <Button variant="secondary" size="lg">
                  Work With Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* What I Do Section */}
      <Section className="bg-muted/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What I Do</h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          I bridge the gap between engineering and product thinking, building solutions that work beautifully
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Product-Minded Development</h3>
            <p className="text-muted-foreground leading-relaxed">
              Transform complex systems into intuitive experiences. UI/UX-driven engineering with user-centered design thinking.
            </p>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Full-Stack Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              Build modern, scalable solutions with Next.js, React, TypeScript, and Node.js. API design and system integration.
            </p>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Technical Leadership</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lead teams, mentor developers, and collaborate cross-functionally. Drive innovation through problem-solving.
            </p>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Contract Development</h3>
            <p className="text-muted-foreground leading-relaxed">
              Custom applications, API integrations, and dashboards. Specialized in building tools that solve real problems.
            </p>
          </Card>
        </div>
      </Section>

      {/* Featured Work Section */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Work</h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Real projects solving real problems — from zero to production
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <div className="text-sm">Screenshots coming soon</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">React</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">TypeScript</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Apps.WoodsideBible.org</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Unified full-stack platform simplifying major organizational workflows. Methods and UI concepts later adopted by MinistryPlatform's core product.
            </p>
            <Link href="/case-studies">
              <Button variant="ghost">View Case Study →</Button>
            </Link>
          </Card>

          <Card>
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <div className="text-sm">Screenshots coming soon</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">React</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">API Design</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Dynamic Insights Widgets</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Transformed static reports into interactive dashboards with custom embedded widgets. Innovation later adopted across the MinistryPlatform ecosystem.
            </p>
            <Link href="/case-studies">
              <Button variant="ghost">View Case Study →</Button>
            </Link>
          </Card>

          <Card>
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <div className="text-sm">Interactive prototype</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">UX Redesign</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Product Thinking</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Sleeper App Redesign</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Unsolicited redesign improving UX for key features. Working interactive prototype demonstrating product-minded problem solving.
            </p>
            <Link href="/case-studies">
              <Button variant="ghost">Coming Soon</Button>
            </Link>
          </Card>

          <Card>
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <div className="text-sm">Personal project</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Supabase</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">PostgreSQL</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">RoarTracker</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Season ticket management app for Detroit Lions games. Tracks attendance, resale, and spending with clean data visualization.
            </p>
            <Link href="/case-studies">
              <Button variant="ghost">View Project →</Button>
            </Link>
          </Card>
        </div>
        <div className="text-center">
          <Link href="/case-studies">
            <Button size="lg">View All Projects</Button>
          </Link>
        </div>
      </Section>
    </PageTransition>
  );
}
