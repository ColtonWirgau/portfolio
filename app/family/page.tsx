'use client';

import { lifeEvents } from '@/components/LifeEventSheet';
import { StoryPage } from '@/components/StoryPage';

export default function FamilyPage() {
  const event = lifeEvents.find((e) => e.id === 'clarkston')!;
  return <StoryPage event={event} />;
}
