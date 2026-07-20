// Registry of resume variants. Add a new variant by importing it here and
// pushing it into `variants`. The slug is what shows up in the URL
// (`/resume?v=<slug>`) and in the generated PDF filename.

import type { Resume } from './types';
import { fullStackAiLeadResume } from './variants/full-stack-ai-lead';
import { itBusinessAnalystResume } from './variants/it-business-analyst';
import { itBusinessAnalystExtendedResume } from './variants/it-business-analyst-extended';

export const variants: Record<string, Resume> = {
  [fullStackAiLeadResume.meta.slug]: fullStackAiLeadResume,
  [itBusinessAnalystResume.meta.slug]: itBusinessAnalystResume,
  [itBusinessAnalystExtendedResume.meta.slug]: itBusinessAnalystExtendedResume,
};

// Default variant when /resume is hit with no slug: the general flagship
// (full-stack + AI + leadership), matching the portfolio's positioning.
// The tailored IT Business Analyst cuts remain available at their slugs.
export const DEFAULT_VARIANT_SLUG = fullStackAiLeadResume.meta.slug;

export function getResume(slug?: string | null): Resume {
  const key = slug && variants[slug] ? slug : DEFAULT_VARIANT_SLUG;
  return variants[key];
}

// Inject the private cell number into the header, but ONLY for the
// print/PDF build: it renders when the `print` flag is on the request AND
// RESUME_PHONE is set in the (gitignored) .env.local. This keeps the
// number off the public resume page, out of the client bundle, and out of
// git — it appears only on the copy you generate to submit with an
// application. See scripts/generate-resume-pdf.mjs (appends ?print=1).
export function withPrintPhone(resume: Resume, print?: string): Resume {
  const phone = print && process.env.RESUME_PHONE;
  if (!phone) return resume;
  return { ...resume, header: { ...resume.header, phone } };
}

export function listVariants(): Array<{ slug: string; label: string; tailoredFor?: string }> {
  return Object.values(variants).map((v) => ({
    slug: v.meta.slug,
    label: v.meta.label,
    tailoredFor: v.meta.tailoredFor,
  }));
}
