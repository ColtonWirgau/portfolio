'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-foreground">
              Colton Wirgau
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-accent',
                    pathname === link.href
                      ? 'text-accent'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-lg bg-accent hover:bg-accent/90 text-white transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
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
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-accent overflow-y-auto md:hidden"
          >
            <div className="min-h-screen p-6 flex flex-col">
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between mb-12">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">CW</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-14 h-14 rounded-full bg-white text-accent flex items-center justify-center shadow-lg"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1 mb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-white/20 group"
                    >
                      <span className="text-white text-xl font-medium">
                        {link.label}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white/50 group-hover:text-white transition-colors"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <motion.div
                className="space-y-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/case-studies"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 px-6 bg-yellow-400 text-black font-bold rounded-lg text-center hover:bg-yellow-300 transition-colors"
                >
                  View My Work
                </Link>
                <Link
                  href="/work-with-me"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-lg text-center hover:bg-blue-500 transition-colors"
                >
                  Work With Me
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 px-6 bg-white text-accent font-bold rounded-lg text-center hover:bg-gray-100 transition-colors"
                >
                  Contact
                </Link>
              </motion.div>

              {/* Contact Info Card */}
              <motion.div
                className="bg-white rounded-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Questions? Get in touch
                </p>
                <a
                  href="mailto:ColtonWirgau@gmail.com"
                  className="text-2xl font-bold text-accent hover:text-accent/80 transition-colors"
                >
                  ColtonWirgau@gmail.com
                </a>
                <p className="text-sm text-muted-foreground mt-3">
                  Oxford, Michigan
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href="https://www.linkedin.com/in/coltonwirgau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent hover:bg-gray-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/ColtonWirgau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent hover:bg-gray-100 transition-colors"
                  aria-label="GitHub"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/colthavilah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-accent hover:bg-gray-100 transition-colors"
                  aria-label="Instagram"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
