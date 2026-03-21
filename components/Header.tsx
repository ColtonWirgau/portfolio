'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (isHome) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      const main = document.querySelector('main');
      if (el && main) {
        const top = el.offsetTop - main.offsetTop;
        main.scrollTo({ top, behavior: 'smooth' });
      }
    }
    // If not home, the Link will navigate to /#about etc.
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const main = document.querySelector('main');
      main?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById('contact');
      const main = document.querySelector('main');
      if (el && main) {
        const top = el.offsetTop - main.offsetTop;
        main.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between"
      style={{
        padding: '0 24px',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        backgroundColor: 'rgba(213, 210, 200, 0.6)',
      }}
    >
      {/* Logo + nav links */}
      <div className="flex items-center gap-8">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center"
        >
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="28" viewBox="0 0 341.34 852.51" xmlns="http://www.w3.org/2000/svg">
              <path fill="var(--color-accent)" d="M316.8,619.52c-10.78-10.88-18.24-18.24-22.4-22.05-13.57-12.42-24.65-27.5-32.17-44.31-3.86-8.62-6.79-17.63-8.86-26.84-.98-4.35-2.55-8.26.05-12.03,2.99-4.33,7.19-7.48,9.79-12.23,3.34-6.09,4.66-13.11,4.95-20.04.56-13.5-2.71-27.13-9.28-38.93-7.71-13.84,8.81-4.82,9.76-13.32,3.57-31.75,4.75-56.89,3.53-75.4-2.62-39.67-7.6-80.33-14.96-121.97-.27-1.48.27-2.97,1.41-3.95,24.79-21.23,37.87-32.4,39.24-33.52,10.88-8.77,16.62-17.85,7.79-29.98-7.07-9.71-46.68-61.46-118.83-155.27-4.51-5.86-10.32-9.54-16.15-9.68-5.83.14-11.64,3.82-16.15,9.68C82.37,103.49,42.76,155.24,35.69,164.95c-8.83,12.13-3.09,21.21,7.79,29.98,1.37,1.11,14.45,12.29,39.24,33.52,1.13.98,1.68,2.46,1.41,3.95-7.36,41.64-12.34,82.3-14.96,121.97-1.21,18.51-.04,43.65,3.53,75.4.96,8.51,17.47-.52,9.76,13.32-6.57,11.8-9.84,25.43-9.28,38.93.29,6.94,1.61,13.96,4.95,20.04,2.6,4.75,6.8,7.9,9.79,12.23,2.6,3.77,1.02,7.68.05,12.03-2.07,9.21-5,18.23-8.86,26.84-7.53,16.8-18.6,31.88-32.17,44.31-4.16,3.81-11.62,11.17-22.4,22.05C6.55,637.7-1.55,659.99.24,686.34c1.37,20.29,9.55,37.89,21.74,53.87,9.77,12.81,15.02,23.09,16.35,38.69.53,6.27.94,10.66,1.25,13.14.27,2.17,1.62,4.04,3.55,5.02,8.07,4.04,11.97-3.48,13.09-10.45,3.73-23.18-4.08-38.46-14.2-59.63-15.04-31.48-9.77-64.04,19.26-84.8,12.05-8.61,23.55-17.77,34.51-27.44,10.06-8.89,18.28-20.02,24.71-33.4.25-.55.94-.76,1.46-.45l.57.31c.29.18.43.53.33.86-3.22,10.12-6.88,19.57-14.61,39.18-5.78,14.61-10.76,29.36-12.71,44.61-3.61,28.28-1.45,55.96,6.5,83.03,5.12,17.42,10.59,31.74,12.48,45.88,2.17,16.09,1.27,32.07-2.66,47.93-.59,2.42.94,6.56,3.32,8.16,7.56,5.14,14.08-2.7,17.5-9,5.31-9.84,8.24-21.15,8.79-33.93,1.11-25.62-4.63-48.59-8.4-72.75-4.39-28.26-1.23-55.25,9.49-80.98,12.85-30.82,20.14-45.61,25.02-67.75.43-1.93,1.11-3.32,2.03-4.16.31-.28.68-.42,1.05-.45.37.03.74.16,1.05.45.92.84,1.6,2.23,2.03,4.16,4.88,22.15,12.17,36.93,25.02,67.75,10.72,25.72,13.89,52.71,9.49,80.98-3.77,24.16-9.51,47.13-8.4,72.75.55,12.77,3.48,24.08,8.79,33.93,3.42,6.31,9.94,14.14,17.5,9,2.38-1.6,3.91-5.74,3.32-8.16-3.93-15.86-4.82-31.84-2.66-47.93,1.89-14.14,7.36-28.46,12.48-45.88,7.95-27.07,10.12-54.75,6.5-83.03-1.95-15.25-6.93-30-12.71-44.61-7.73-19.61-11.39-29.06-14.61-39.18-.1-.33.04-.68.33-.86l.57-.31c.53-.31,1.21-.1,1.46.45,6.43,13.38,14.65,24.51,24.71,33.4,10.96,9.67,22.46,18.83,34.51,27.44,29.02,20.76,34.3,53.32,19.26,84.8-10.12,21.17-17.93,36.45-14.2,59.63,1.11,6.97,5.02,14.49,13.09,10.45,1.93-.98,3.28-2.85,3.55-5.02.31-2.48.72-6.88,1.25-13.14,1.33-15.61,6.58-25.88,16.35-38.69,12.19-15.98,20.37-33.57,21.74-53.87,1.8-26.35-6.31-48.63-24.3-66.82Z"/>
              <ellipse cx="170.67" cy="473.09" rx="39.52" ry="42.83" fill="#FFFFFF"/>
              <circle cx="170.67" cy="473.09" r="17.6" fill="var(--color-fg)"/>
            </svg>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] text-muted hover:text-fg transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={isHome ? '/#contact' : '/#contact'}
        onClick={handleContactClick}
        className="text-[13px] font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        style={{ textDecoration: 'none' }}
      >
        <span className="underline underline-offset-4 uppercase tracking-wider">Contact</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    </nav>
  );
}
