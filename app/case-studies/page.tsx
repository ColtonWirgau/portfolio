import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { PageTransition } from '@/components/layout/PageTransition';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Case Studies - Colton Wirgau',
  description: 'Explore my work: Full-stack applications, API integrations, and product-minded solutions.',
};

export default function CaseStudiesPage() {
  return (
    <PageTransition>
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Work That Matters
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Real projects solving real problems. Each case study shows the journey from
            challenge to solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Apps.WoodsideBible.org */}
          <Card className="flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
                <div className="text-sm">Case study coming soon</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">React</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">TypeScript</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">MinistryPlatform API</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Apps.WoodsideBible.org</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
              Unified platform that simplified major workflows. Methods and UI concepts later adopted
              by MinistryPlatform's core product. Full case study with architecture decisions and impact metrics.
            </p>
            <Button variant="ghost" disabled>Coming Soon</Button>
          </Card>

          {/* Dynamic Insights */}
          <Card className="flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <div className="text-sm">Case study coming soon</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">React</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">API Design</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Data Viz</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Dynamic Insights Widgets</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
              Transformed static reports into interactive dashboards. Innovation later adopted
              across the MinistryPlatform ecosystem. Before/after comparison with live widget demos.
            </p>
            <Button variant="ghost" disabled>Coming Soon</Button>
          </Card>

          {/* Sleeper Redesign */}
          <Card className="flex flex-col">
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-muted rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-6">
                <svg className="w-16 h-16 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                <div className="text-sm">Interactive prototype in progress</div>
              </div>
            </div>
            <div className="mb-2 flex gap-2 flex-wrap">
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">UX Redesign</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20">Product Thinking</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Sleeper App Redesign</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
              Unsolicited redesign improving UX for key features. Working interactive prototype
              demonstrating product-minded problem solving and attention to user experience.
            </p>
            <Button variant="ghost" disabled>In Progress</Button>
          </Card>

          {/* RoarTracker */}
          <Card className="flex flex-col">
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
            <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
              Season ticket management for Detroit Lions games. Tracks attendance, resale, and spending
              with clean data visualization. Built for fun, showing I code beyond just work.
            </p>
            <Button variant="ghost" disabled>Coming Soon</Button>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Full case studies with live demos, architecture decisions, and impact metrics are being developed.
          </p>
          <Link href="/contact">
            <Button size="lg">Discuss Your Project</Button>
          </Link>
        </div>
      </Section>
    </PageTransition>
  );
}
