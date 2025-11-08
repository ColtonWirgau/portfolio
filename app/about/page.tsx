import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { PageTransition } from '@/components/layout/PageTransition';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About - Colton Wirgau',
  description: 'Learn about my journey from solo developer to product-minded engineer, my philosophy on building great software, and what drives me.',
};

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <Section className="pt-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building clarity from complexity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            I'm Colton Wirgau, a product-minded engineer who's spent 8 years as a one-person dev team,
            shipping production apps and turning chaos into systems. Now I'm ready to bring that builder
            mentality to a collaborative team environment.
          </p>
        </div>
      </Section>

      {/* The Story */}
      <Section>
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">The Journey</h2>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Eight years ago, I joined Woodside Bible Church with a vision: build a team, control all web
              development, create systems that scale. Then COVID happened. Priorities shifted. What was supposed
              to be a team became a solo mission.
            </p>

            <p>
              But here's what I learned being the only developer: <span className="text-foreground font-medium">I can build anything</span>.
              From concept to production, I've designed and shipped full-stack applications that support both public-facing
              and internal systems. I've influenced platform evolution (earning the MinistryPlatform "Deep Space Award"),
              led contractor teams, and created tools that other organizations now use.
            </p>

            <p>
              The work has been incredible. I built <span className="text-foreground font-medium">apps.woodsidebible.org</span> — a unified
              platform that simplified major workflows so effectively that <span className="text-foreground font-medium">MinistryPlatform adopted my methods
              and UI concepts into their core product</span>. That's not just shipping features; that's influencing an entire ecosystem.
            </p>

            <p>
              But solo work has limits. I've reached the point where I want to multiply my impact through collaboration.
              I want to work with talented people, push each other, and build products that matter. I'm not looking to
              escape my current role — I'm looking to level up.
            </p>
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">My Philosophy</h2>

          <Card glass className="mb-8">
            <blockquote className="text-xl md:text-2xl italic text-center leading-relaxed">
              "Simplicity isn't the absence of complexity — it's clarity through design.
              Good software doesn't just work; it feels right."
            </blockquote>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-semibold mb-3">Product-Minded Engineering</h3>
              <p className="text-muted-foreground leading-relaxed">
                I don't just write code — I solve problems. Every feature should serve the user,
                every interface should feel intuitive, every system should be maintainable.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-3">Lead by Serving</h3>
              <p className="text-muted-foreground leading-relaxed">
                The best leaders make others better. I mentor, share knowledge, and create systems
                that empower teams to do their best work.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-3">Build With Purpose</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every line of code should have a reason. I optimize for clarity, maintainability,
                and long-term value — not just quick wins.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-3">Never Stop Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Technology evolves fast. I stay curious, experiment constantly, and build side
                projects to explore new ideas and stay sharp.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Personal Side */}
      <Section>
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Beyond the Code</h2>

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm a husband and father of two based in Oxford, Michigan. When I'm not building software,
              you'll find me at Ford Field — I'm a Detroit Lions season ticket holder (yes, I've suffered
              through the rough years and I'm loving this new era).
            </p>

            <p>
              I chose Software Engineering over Computer Science specifically because of my interest in
              <span className="text-foreground font-medium"> leadership and team building</span>. I even pursued
              a leadership minor to develop those skills. This wasn't an accident — I've always been drawn to
              roles where I can help others succeed while solving complex problems.
            </p>

            <p>
              I also code for fun. <span className="text-foreground font-medium">RoarTracker</span> helps me manage
              my Lions season tickets. <span className="text-foreground font-medium">Degenerates Dashboard</span> tracks
              fantasy football league chaos. These aren't portfolio pieces — they're just proof that I genuinely
              enjoy building things.
            </p>
          </div>
        </div>
      </Section>

      {/* Recognition */}
      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Recognition</h2>

          <Card glass className="mb-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">MinistryPlatform "Deep Space Award"</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Awarded for innovation and advancement of the MinistryPlatform product ecosystem. My work
                  influenced the platform's evolution, with methods and UI concepts adopted for broader customer use.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  This isn't just recognition — it's proof that I push platforms forward, not just use them.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-3">Published Research</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-medium text-foreground">"Sylvester: An Approach to Emotion Classification"</span><br />
              Published in <span className="italic">New Trends in Information Technology</span>, 2017
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Developed an AI system integrating with Twitter to identify emotional sentiment in real time.
            </p>
            <a
              href="https://www.researchgate.net/publication/319523370_Sylvester_An_Approach_to_Emotion_Classification"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              View on ResearchGate →
            </a>
          </Card>
        </div>
      </Section>

      {/* What I'm Looking For */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What I'm Looking For</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I'm exploring both IC roles (Senior/Staff Engineer) and Engineering Management/Leadership positions.
            I'm open to industry — what matters most is working with talented people on products that matter.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <h3 className="font-semibold mb-2">Collaborative Team</h3>
              <p className="text-muted-foreground text-sm">
                Work with talented people who push each other to be better
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-2">Product Focus</h3>
              <p className="text-muted-foreground text-sm">
                Build things that users love and solve real problems
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold mb-2">Growth & Impact</h3>
              <p className="text-muted-foreground text-sm">
                Opportunity to lead, mentor, and multiply my impact
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/work-with-me">
              <Button size="lg">Work With Me</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
