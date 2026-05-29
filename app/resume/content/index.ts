// Registry of resume variants. Add a new variant by importing it here and
// pushing it into `variants`. The slug is what shows up in the URL
// (`/resume?v=<slug>`) and in the generated PDF filename.

import type { Resume } from './types';
import { itBusinessAnalystResume } from './variants/it-business-analyst';
import { itBusinessAnalystExtendedResume } from './variants/it-business-analyst-extended';

export const variants: Record<string, Resume> = {
  [itBusinessAnalystResume.meta.slug]: itBusinessAnalystResume,
  [itBusinessAnalystExtendedResume.meta.slug]: itBusinessAnalystExtendedResume,
};

// Default variant when /resume is hit with no `?v=` param. Currently
// the IT Business Analyst tailoring; switch this when a more general
// variant exists.
export const DEFAULT_VARIANT_SLUG = itBusinessAnalystResume.meta.slug;

export function getResume(slug?: string | null): Resume {
  const key = slug && variants[slug] ? slug : DEFAULT_VARIANT_SLUG;
  return variants[key];
}

export function listVariants(): Array<{ slug: string; label: string; tailoredFor?: string }> {
  return Object.values(variants).map((v) => ({
    slug: v.meta.slug,
    label: v.meta.label,
    tailoredFor: v.meta.tailoredFor,
  }));
}
