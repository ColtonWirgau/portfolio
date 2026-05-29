import type { Metadata } from 'next';
import { ResumeView } from './ResumeView';
import { getResume, DEFAULT_VARIANT_SLUG } from './content';

// Resume is a private outreach surface — keep it out of search indexes
// and the llms.txt set. (Per CLAUDE.md: prefer page-level robots metadata
// over disallowing in robots.txt.)
export const metadata: Metadata = {
  title: 'Colton Wirgau — Resume',
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  const resume = getResume(DEFAULT_VARIANT_SLUG);
  return <ResumeView resume={resume} />;
}
