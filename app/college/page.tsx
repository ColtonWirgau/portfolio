'use client';

import { lifeEvents } from '@/components/LifeEventSheet';
import { StoryPage } from '@/components/StoryPage';

export default function CollegePage() {
  const event = lifeEvents.find((e) => e.id === 'detroit')!;
  return <StoryPage event={event} />;
}
