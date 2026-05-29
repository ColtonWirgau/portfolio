import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResumeView } from '../ResumeView';
import { ResumePosterView } from '../ResumePosterView';
import { getResume, variants } from '../content';

// Each tailored variant lives at /resume/<slug>. Add new variants by
// adding them to the registry in ../content/index.ts.

export const metadata: Metadata = {
  title: 'Colton Wirgau — Resume',
  robots: { index: false, follow: false },
};

export default async function ResumeVariantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!variants[slug]) notFound();
  const resume = getResume(slug);
  // Dispatch on `meta.view`. `poster` = warm-paper, branded, two-page;
  // `standard` (default) = the tight ATS-friendly renderer.
  return resume.meta.view === 'poster' ? (
    <ResumePosterView resume={resume} />
  ) : (
    <ResumeView resume={resume} />
  );
}

export function generateStaticParams() {
  return Object.keys(variants).map((slug) => ({ slug }));
}
