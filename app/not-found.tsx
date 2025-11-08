'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Big 404 */}
          <h1 className="text-9xl md:text-[12rem] font-bold mb-4 bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
            404
          </h1>

          {/* Fun Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Well, this is awkward...
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I've built a lot of things, but apparently not this page. Even the Lions have a better record finding the right play than you finding this URL.
            </p>
          </motion.div>

          {/* Fun Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <svg
              className="w-24 h-24 mx-auto text-accent"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground mb-6">
              Here are some places that actually exist:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg">Back Home</Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="secondary" size="lg">
                  View Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Easter Egg */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-muted-foreground mt-12 italic"
          >
            P.S. If you were looking for a secret page, you found one! Just not the one you wanted.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
