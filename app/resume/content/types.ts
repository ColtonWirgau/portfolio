// Resume content types. One Resume object per variant.
// Variants live in ./variants/<slug>.ts and register themselves in ./index.ts.

export type ResumeLink = { label: string; href: string };

export type ResumeHeader = {
  name: string;
  title: string;        // short professional label under the name
  location: string;
  email: string;
  phone?: string;       // optional; recruiters like having it on the applied-to copy
  links: ResumeLink[];  // portfolio, github, linkedin, etc.
  // Optional headshot. Path relative to /public (e.g. "/headshot.jpg") or
  // any absolute URL. Poster view renders it in the top-right as a
  // rust-bordered square; standard view ignores it.
  headshot?: string;
};

export type ResumeExperience = {
  company: string;
  title: string;
  location?: string;
  dates: string;        // e.g. "2016 – Present", "May – Sep 2015"
  bullets: string[];
  // Sub-roles or affiliated work under the same company umbrella.
  sub?: Array<{ label: string; description: string }>;
};

export type ResumeEducation = {
  school: string;
  degree: string;
  dates?: string;
  honors?: string;      // e.g. "Graduated with Honors"
  details?: string[];   // bullets (athletic recognition, leadership, etc.)
  // Publications produced during this education. Renders below details
  // with publication-style formatting (bold title, italic venue, link).
  publications?: ResumePublication[];
};

export type ResumeSkillGroup = { label: string; items: string[] };

// "Personal" section entries: a small label on the left + a free-form
// description on the right. Used to surface life context (family, music,
// athletics, etc.) on the poster view.
export type ResumePersonalEntry = { label: string; description: string };

export type ResumePublication = {
  title: string;
  venue: string;
  year: string;
  link?: string;
  linkLabel?: string;   // display text for the link (defaults to the host)
  description?: string; // optional one- or two-sentence explainer below citation
  // When true, the paper title isn't rendered. Description carries the
  // story and the venue text should live inside the description itself.
  // Use when the formal title is jargony and the description is stronger
  // on its own.
  hideTitle?: boolean;
};

export type ResumeAward = { name: string; org: string; year?: string };

export type ResumeSideProject = {
  name: string;
  description: string;
  link?: string;
};

// Poster view only. Generic mini-card section rendered between Skills and
// Education: any heading + name/description cards. Supersedes the old
// fixed-heading "Side Projects" section (`sideProjects`, kept for backward
// compatibility); when both are present, `spotlight` wins.
export type ResumeSpotlight = {
  heading: string;
  items: ResumeSideProject[];
};

// Portfolio-style "stamp": bordered Anton label with a small Montserrat
// sub-line below a hairline rule. Used on the poster view only.
export type ResumeStamp = { label: string; sub: string };

export type Resume = {
  // Variant metadata. Used for the page <title>, file naming, etc.
  meta: {
    slug: string;
    label: string;       // human-readable variant name
    tailoredFor?: string; // e.g. "Senior IT Business Analyst — UAW Retiree Medical Benefits Trust"
    // Which renderer to use. 'standard' is the tight, ATS-friendly,
    // mostly-monochrome view. 'poster' is the branded 2-page view with
    // warm paper, stamps, and a pull quote — matches the portfolio.
    view?: 'standard' | 'poster';
  };
  header: ResumeHeader;
  summary?: string;      // optional opening paragraph; some variants omit it
  experience: ResumeExperience[];
  skills: ResumeSkillGroup[];
  education: ResumeEducation[];
  publications?: ResumePublication[];
  awards?: ResumeAward[];
  sideProjects?: ResumeSideProject[];
  // Poster view only. Generic card section; takes precedence over
  // `sideProjects` when both are set.
  spotlight?: ResumeSpotlight;
  // Poster view only. Three stamp badges under the name.
  stamps?: ResumeStamp[];
  // Poster view only. Italic Playfair epigraph at the very bottom.
  pullQuote?: string;
  // Poster view only. Personality / life-context section rendered as
  // label-and-description rows below Education.
  personal?: ResumePersonalEntry[];
};
