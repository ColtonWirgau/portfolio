import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { PageTransition } from '@/components/layout/PageTransition';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Work With Me - Colton Wirgau',
  description: 'Custom Next.js applications, API integrations, and dashboards. Let\'s build something great together.',
};

export default function WorkWithMePage() {
  return (
    <PageTransition>
      {/* Hero */}
      <Section className="pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let's build something great
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
            I help organizations build custom applications, integrate systems, and create tools
            that solve real problems. Currently taking on select contract projects.
          </p>
          <Link href="/contact">
            <Button size="lg">Start a Conversation</Button>
          </Link>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">What I Offer</h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Full-stack development with a focus on user experience and scalable architecture
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Custom Next.js Applications</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Build modern, performant web applications from concept to deployment. I specialize in
              Next.js, React, and TypeScript to create scalable solutions.
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Full-stack application development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>UI/UX design and implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Performance optimization</span>
              </li>
            </ul>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">API Integrations & Automation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Connect your systems, automate workflows, and centralize data. Specialized in
              MinistryPlatform API but experienced with various platforms.
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>RESTful API design and integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Data synchronization and automation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Third-party service integration</span>
              </li>
            </ul>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Dashboards & Analytics</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Transform data into insights with custom dashboards and interactive visualizations.
              Make complex information clear and actionable.
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Interactive data visualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Custom widget development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Real-time reporting tools</span>
              </li>
            </ul>
          </Card>

          <Card glass>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Technical Consulting</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Architecture reviews, code audits, and strategic guidance for your development projects.
              Get expert input to make better technical decisions.
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Architecture design and review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Code quality assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Technology stack recommendations</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How We'll Work Together</h2>

          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Discovery Call</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We'll discuss your needs, challenges, and goals. I'll ask questions to understand
                    the problem we're solving and determine if I'm the right fit.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Scope & Proposal</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'll create a detailed proposal outlining the project scope, timeline, and
                    investment. You'll know exactly what to expect before we start.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Build & Iterate</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'll build your solution with regular check-ins and opportunities for feedback.
                    You'll see progress throughout, not just at the end.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Deploy & Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Once we've refined everything, I'll deploy your solution and provide documentation.
                    I'm available for ongoing support and enhancements.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Let's talk about your project. I'll respond within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">Get In Touch</Button>
            </Link>
            <Link href="/case-studies">
              <Button variant="secondary" size="lg">
                View My Work
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
