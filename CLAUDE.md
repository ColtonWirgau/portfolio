# Portfolio: Notes for Claude

## LLM-readable files (`llms.txt`, `llms-full.txt`)

This site ships two LLM-readable files in `public/`, served at the root:

- `/llms.txt` is the short, canonical summary: who Colton is, what he's built, how to reach him. Follows the [llms.txt spec](https://llmstxt.org/): single H1, blockquote summary, then H2 sections with bulleted markdown links. The final section is titled `Optional` for things an LLM can skip if it needs shorter context.
- `/llms-full.txt` is the long-form companion: full project writeups, the AI research backstory, the place-based life story, skills, and the public site map. Use this when an LLM needs depth, not just orientation.

AI tools (ChatGPT, Claude, Perplexity, and similar) read these to answer questions about Colton without having to scrape the visual site.

**Keep them in sync.** Whenever any of the following changes, update both files in the same change (the short one always; the long one when the change adds real substance):

- Hero positioning, role stamps, or the "About" / "My Story" copy on `app/page.tsx`.
- The `projects` array in `app/page.tsx` (Church Hub, Woodside, Personal Projects, or any new top-level work).
- Sub-projects under Woodside or Personal Projects (Dynastly, Lions tracker, Degenerates Dashboard, etc.).
- The `lifeEvents` array in `components/LifeEventSheet.tsx` (Algonac, Detroit, Troy, Clarkston, Hobbies). `llms-full.txt` mirrors this content; the short `llms.txt` only references it.
- The AI research blurb in `components/AIResearchSheet.tsx` or the Sylvester paper link.
- Contact info or the contact form location.
- Anything in the `metadata` block of `app/layout.tsx` (title, description, keywords).
- New top-level routes under `app/` that are worth surfacing (career, hobbies, childhood, college, family, notes).

Positioning rule: lead with AI expertise (published 2017 paper plus current heavy AI use), then design and full-stack work. Don't bury the AI story.

Style rule: no em dashes anywhere in these files. Use colons, commas, parentheses, or periods.

**Do not surface the Sleeper outreach material in either file.** `app/notes/sleeper-websocket-leak` is part of a private outreach package and is intentionally absent from the LLM-readable files. If that page should also be kept out of search indexes, add `robots: { index: false }` to its `metadata` export rather than disallowing it in `robots.txt` (the robots file is itself public and listing the path there draws attention to it).

## Resume (`/resume`, `/resume/<variant>`)

The resume lives in the project as a real Next.js route so it stays in sync with the portfolio content (and so PDFs can be regenerated on demand).

- `app/resume/page.tsx` serves the default variant. `app/resume/[slug]/page.tsx` serves named variants.
- Content is typed (`app/resume/content/types.ts`) and split into a shared base (`content/base.ts`) plus per-job variants under `content/variants/`. New variants register themselves in `content/index.ts`.
- The renderer is `app/resume/ResumeView.tsx`. It owns all styling (Anton + Playfair + Montserrat already loaded from `globals.css`), enforces `@page { size: letter }`, and hides the site nav + paper-grain on the resume route.
- The route is `robots: { index: false, follow: false }` and is intentionally absent from `llms.txt` / `llms-full.txt`. Treat the resume the same as the Sleeper outreach page: keep it out of search indexes and out of the LLM-readable files.

To regenerate a PDF: with `npm run dev` running in another terminal, run `npm run resume:pdf -- --variant=<slug>`. Output lands in `out/resume/<slug>-<date>.pdf` (already gitignored). Defaults to the IT BA variant. Override the URL with `--url=...` if the dev server isn't on `:3000`.

When updating canonical bio content (Woodside bullets, education, AI work), update both the relevant `app/page.tsx` / `llms-full.txt` *and* `app/resume/content/base.ts` so the resume tracks the rest of the site.

## robots.txt

`public/robots.txt` is intentionally minimal: allow everything, no disallows. SEO defaults. If you ever add per-route blocking, prefer Next.js `metadata.robots` on the page itself over editing `robots.txt`, for the reason above.
