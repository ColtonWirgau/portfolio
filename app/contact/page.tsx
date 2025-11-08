import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { PageTransition } from '@/components/layout/PageTransition';
import ContactForm from '@/components/ui/ContactForm';

export const metadata = {
  title: 'Contact - Colton Wirgau',
  description: 'Get in touch to discuss your project, ask questions, or just say hello.',
};

export default function ContactPage() {
  return (
    <PageTransition>
      <Section className="pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Let's talk
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Have a project in mind? Want to chat about an opportunity? Or just want to say hi?
                I'd love to hear from you.
              </p>

              <div className="space-y-6">
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:ColtonWirgau@gmail.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ColtonWirgau@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Oxford, Michigan<br />
                        <span className="text-sm">Remote or Michigan-based opportunities</span>
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Response Time</h3>
                      <p className="text-muted-foreground">
                        Usually within 24-48 hours
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </PageTransition>
  );
}
