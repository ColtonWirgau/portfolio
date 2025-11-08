# Portfolio Project Setup Guide

## Project Overview

Modern Next.js 16 portfolio website with glassmorphism design, featuring:
- Next.js 16 (App Router) with TypeScript
- TailwindCSS 4 with custom neutral/beige theme
- Framer Motion animations
- Supabase backend
- AWS S3 for images
- Dark/light mode with system detection

## Tech Stack

- **Framework**: Next.js 16 (canary) with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Animations**: Framer Motion
- **Database**: Supabase
- **Storage**: AWS S3
- **Deployment**: Vercel (recommended)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then fill in your environment variables:

#### Supabase Setup
1. Create a project at https://supabase.com
2. Go to Settings > API
3. Copy your project URL and anon key
4. For service role key, find it in Settings > API > service_role

#### AWS S3 Setup
1. Create an S3 bucket in AWS Console
2. Create an IAM user with S3 access
3. Generate access keys
4. Add keys to `.env.local`

### 3. Supabase Database Tables

Create these tables in Supabase SQL Editor:

```sql
-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page views analytics
CREATE TABLE page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  path TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON page_views
  FOR INSERT TO anon WITH CHECK (true);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── case-studies/        # Case studies page
│   ├── contact/             # Contact page
│   ├── work-with-me/        # Services page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── Navigation.tsx   # Main navigation
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── PageTransition.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Section.tsx
├── lib/
│   └── supabase/            # Supabase clients
│       ├── client.ts        # Client-side
│       └── server.ts        # Server-side
├── types/                   # TypeScript types
│   └── index.ts
├── utils/                   # Utility functions
│   └── cn.ts               # Class name utility
└── public/                  # Static assets
```

## Design System

### Colors (Neutral/Beige Theme)

**Light Mode:**
- Background: `#faf9f7`
- Foreground: `#1a1a1a`
- Card: `#ffffff`
- Border: `#e8e6e3`
- Accent: `#d4c5b9`
- Muted: `#f5f3f0`

**Dark Mode:**
- Background: `#0f0f0f`
- Foreground: `#f5f3f0`
- Card: `#1a1a1a`
- Border: `#2a2a2a`
- Accent: `#4a4540`
- Muted: `#1f1f1f`

### Glassmorphism

Use the `.glass` utility class for glassmorphism effects:
```tsx
<div className="glass">
  // Content with glass effect
</div>
```

## Components

### Button
```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md">Click me</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "ghost"
- `size`: "sm" | "md" | "lg"

### Card
```tsx
import Card from '@/components/ui/Card';

<Card glass hover>
  // Card content
</Card>
```

**Props:**
- `glass`: boolean - Apply glassmorphism
- `hover`: boolean - Add hover effects

### Section
```tsx
import Section from '@/components/ui/Section';

<Section container>
  // Section content
</Section>
```

**Props:**
- `container`: boolean - Add container padding/max-width

## Next Steps

1. **Add Content**: Update placeholder content in pages
2. **Customize Branding**: Update logo and name in Navigation
3. **Create Case Studies**: Add project case studies
4. **Build Contact Form**: Implement contact form with Supabase
5. **Add Analytics**: Set up page view tracking
6. **Upload Images**: Add project images to S3
7. **SEO Optimization**: Update metadata in each page
8. **Deploy**: Deploy to Vercel

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Vercel

Add all variables from `.env.local` to Vercel project settings.

## Features to Implement

- [ ] Contact form with validation
- [ ] Case study pages with dynamic routing
- [ ] Image optimization with S3
- [ ] Analytics dashboard
- [ ] Blog/articles section (optional)
- [ ] Resume/CV download
- [ ] Social media links
- [ ] Project filtering/search
- [ ] Loading states
- [ ] Error boundaries

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Supabase Docs](https://supabase.com/docs)
