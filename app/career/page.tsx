'use client';

import { lifeEvents } from '@/components/LifeEventSheet';
import { StoryPage } from '@/components/StoryPage';

export default function CareerPage() {
  const event = lifeEvents.find((e) => e.id === 'troy')!;
  return <StoryPage event={event} />;
}
