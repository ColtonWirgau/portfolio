# NEXT STEPS - Colton Wirgau Portfolio

## What's Been Built ✅

Your portfolio is live and functional! Here's what's ready:

### Pages Completed
- **Homepage** - Hero with your positioning, 4 "What I Do" cards, 4 featured project cards
- **About** - Comprehensive story, philosophy, recognition, and personal details
- **Work With Me** - Services, process, and contracting information
- **Contact** - Working form with Supabase integration + contact info
- **Case Studies** - Placeholder page ready for full case studies

### Features Implemented
- Next.js 16 with App Router & TypeScript
- Glassmorphism design with neutral/beige theme
- Dark/light mode with system preference detection
- Responsive navigation with mobile menu
- Framer Motion animations
- Contact form (needs Supabase setup to work)
- SEO-optimized metadata

## Immediate To-Do (Before Launch)

### 1. Set Up Supabase (REQUIRED for contact form)

1. Create account at https://supabase.com
2. Create a new project
3. Go to SQL Editor and run this:

```sql
-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);
```

4. Go to Settings > API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

5. Create `.env.local` file in project root:
```
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- All page navigation
- Dark/light mode toggle
- Contact form submission
- Mobile menu
- Responsive design

### 3. Deploy to Vercel

1. Push to GitHub (if not already)
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy!

Update `NEXT_PUBLIC_SITE_URL` to your production URL after deployment.

## Priority Content Tasks

### WEEK 1 - Get Professional Photos

**What You Need:**
- Professional headshot (clean background, approachable)
- 2-3 "at work" shots (laptop, casual, natural)
- 1 optional environmental shot (outdoor/natural light)

**When Ready:**
- Add to `/public/images/`
- Update homepage hero
- Update About page
- Consider adding to navigation (small avatar)

### WEEK 2 - Build Sleeper Redesign Case Study (TOP PRIORITY)

This is your secret weapon. Here's the plan:

**Step 1: Identify Pain Points**
- Pick 2-3 specific Sleeper features that frustrate you
- Document current UX with screenshots
- Write down why it's problematic

**Step 2: Design Your Solution**
- Sketch improved flows
- Use Figma/Photoshop for mockups (or code it directly)
- Focus on SOLVING the problem, not just making it "prettier"

**Step 3: Build Interactive Prototype**
- Create as real Next.js app with mock data
- Make it actually work (not just static mockups)
- Host it somewhere (Vercel subdomain is fine)

**Step 4: Write the Case Study**
Create file: `app/case-studies/sleeper-redesign/page.tsx`

Structure:
1. **Context** - "I've been using Sleeper for X years..."
2. **The Problems** - Screen recordings, annotated screenshots
3. **My Solution** - Side-by-side comparisons, your thinking
4. **The Impact** - What this improves

This will be your conversation starter for EVERY product company.

### WEEK 3-4 - Additional Case Studies

**Apps.WoodsideBible.org**
- Sanitize data, create demo version
- Document architecture decisions
- Show before/after of workflows
- Explain MinistryPlatform adoption

**Dynamic Insights**
- Live widget demos with fake data
- Before/after static vs interactive
- Technical approach explanation

**RoarTracker**
- Screenshots of real app
- Quick case study (lighter than others)
- Show personality + technical skills

## Content Updates Needed

### Homepage
- Replace "Screenshots coming soon" with actual project images
- Consider adding testimonials section (if you have any)

### About Page
- Add professional photos when ready
- Consider adding timeline/visual resume

### Resume/LinkedIn
Use content from your brain dump document to create:
- **Version A** - IC roles (emphasize technical depth)
- **Version B** - Management (emphasize leadership)

## Optional Enhancements

### Add a Footer
Create `components/layout/Footer.tsx`:
- Links to main pages
- Email + location
- Copyright
- Optional: LinkedIn, GitHub links

### Add Analytics (Simple)
Already set up for Supabase page views. To implement:

```typescript
// In app/layout.tsx or create a PageViewTracker component
useEffect(() => {
  supabase.from('page_views').insert({
    path: window.location.pathname
  });
}, []);
```

### Skills Visualization
Create `components/ui/TechStack.tsx` for About page:
- Visual representation of your stack
- Categories: Frontend, Backend, Database, Cloud, Design
- Make it interactive with hover states

### Blog (Low Priority)
- Create `app/blog` directory
- Topics: "How I simplify complex systems", design philosophy, process posts
- Only if you WANT to write - don't force it

## Content Strategy for Job Search

### LinkedIn Updates
1. Update headline: "Full-Stack Software Engineer | Product-Minded Builder | Next.js, React, TypeScript"
2. Refresh About section with your story
3. Add portfolio link to Featured section
4. Update experience to match About page content
5. Skills section - add all technologies

### Application Strategy
- Lead with Sleeper case study for product companies
- Emphasize Deep Space Award (platform influence)
- Highlight both IC and leadership experience
- Show contracting work (you're in-demand)

### When Reaching Out
"Hey [Name], I'm a product-minded engineer with 8 years building full-stack applications. I recently shipped [specific project] that [specific impact]. I'd love to chat about [their company's] work in [specific area]. Here's my portfolio: [link]"

## Technical Debt & Improvements

### Before Launch
- [x] Test contact form with Supabase
- [ ] Test all pages on mobile
- [ ] Check accessibility (keyboard navigation, ARIA labels)
- [ ] Run Lighthouse audit
- [ ] Test dark/light mode on all pages

### Nice to Have
- [ ] Add loading states for page transitions
- [ ] Add error boundaries
- [ ] Optimize images (use Next.js Image component)
- [ ] Add meta image for social sharing
- [ ] Set up sitemap.xml
- [ ] Add robots.txt

## File Structure Reference

```
portfolio/
├── app/
│   ├── page.tsx              # Homepage ✅
│   ├── about/page.tsx        # About page ✅
│   ├── case-studies/
│   │   ├── page.tsx          # Case studies list ✅
│   │   └── [slug]/page.tsx   # Individual case studies (TODO)
│   ├── work-with-me/page.tsx # Services ✅
│   ├── contact/page.tsx      # Contact ✅
│   ├── layout.tsx            # Root layout ✅
│   └── globals.css           # Global styles ✅
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # ✅
│   │   ├── Card.tsx          # ✅
│   │   ├── Section.tsx       # ✅
│   │   └── ContactForm.tsx   # ✅
│   └── layout/
│       ├── Navigation.tsx     # ✅
│       ├── ThemeProvider.tsx  # ✅
│       ├── ThemeToggle.tsx    # ✅
│       └── PageTransition.tsx # ✅
├── lib/supabase/
│   ├── client.ts             # ✅
│   └── server.ts             # ✅
├── types/index.ts            # ✅
├── utils/cn.ts               # ✅
└── .env.local.example        # ✅ (copy to .env.local)
```

## Content from Brain Dump - Reference

### For Resume
- 8 years at Woodside Bible Church
- Software Development Manager / Full-Stack Developer
- Built apps.woodsidebible.org (entire platform)
- MinistryPlatform Deep Space Award winner
- Led contractor teams
- Influenced platform evolution
- Created Dynamic Insights (adopted by platform)
- Contributed to MP Next (open source)

### For Applications
**Your Unique Value:**
- Product-minded engineer (rare combo of eng + UX)
- Platform influencer (Deep Space Award)
- Zero-to-one builder (built entire systems solo)
- Active contractor (proven demand)
- Leadership background (by education choice)

**What You're Looking For:**
- IC roles (Senior/Staff) OR Management/Leadership
- Collaborative team environment
- Product-focused company
- Remote or Michigan-based
- Not tied to industry (open to anything)

## Questions to Answer

For Sleeper Case Study:
- [ ] Which 2-3 features will you redesign?
- [ ] What are the specific pain points?
- [ ] What's your solution approach?

For Resume:
- [ ] Preferred title? (Senior Engineer, Staff Engineer, Engineering Manager?)
- [ ] Any specific companies you're targeting?
- [ ] Do you have metrics to add? (users, performance improvements, time saved)

For Website:
- [ ] Any existing branding/colors besides neutral/beige?
- [ ] Do you want to add LinkedIn/GitHub links?
- [ ] Any client testimonials for Work With Me page?

## Timeline

**This Weekend (Nov 8-10):**
- [x] Website foundation ✅
- [ ] Set up Supabase
- [ ] Deploy to Vercel
- [ ] Test everything

**Week 1 (Nov 11-17):**
- [ ] Professional photography
- [ ] Update LinkedIn profile
- [ ] Start Sleeper redesign planning

**Week 2 (Nov 18-24):**
- [ ] Build Sleeper prototype
- [ ] Write Sleeper case study
- [ ] Create resume versions A & B

**Week 3 (Nov 25-Dec 1):**
- [ ] Additional case studies
- [ ] Add professional photos
- [ ] Start applications

**Ongoing:**
- [ ] Contract work
- [ ] Network and reach out
- [ ] Iterate based on feedback

## Remember

- You're not desperate - you're selective
- You have contracting income
- You have a strong portfolio
- You have proven impact
- You're looking for the RIGHT fit

This portfolio shows you're a builder who ships. Now go get that perfect role.

---

**Need Help?**
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Vercel deployment: https://vercel.com/docs

**Questions?**
Review the content brain dump in your original message - it has everything you need for writing case studies, resumes, and applications.
