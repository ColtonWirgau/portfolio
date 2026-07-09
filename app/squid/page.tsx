import type { Metadata } from 'next';
import { SquidDive } from './SquidDive';

export const metadata: Metadata = {
  title: 'The Squid Page - Colton Wirgau',
  description:
    "Giant squids: Colton's favorite animal, his son's obsession, the tattoo on his arm, and the logo of this site. An interactive dive to 1,100 meters.",
  alternates: {
    canonical: '/squid',
  },
};

export default function SquidPage() {
  return <SquidDive />;
}
