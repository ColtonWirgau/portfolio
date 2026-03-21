'use client';

import { lifeEvents } from '@/components/LifeEventSheet';
import { StoryPage } from '@/components/StoryPage';

export default function ChildhoodPage() {
  const event = lifeEvents.find((e) => e.id === 'algonac')!;
  return <StoryPage event={event} />;
}
