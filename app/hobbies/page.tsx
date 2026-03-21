'use client';

import { lifeEvents } from '@/components/LifeEventSheet';
import { StoryPage } from '@/components/StoryPage';

export default function HobbiesPage() {
  const event = lifeEvents.find((e) => e.id === 'hobbies')!;
  return <StoryPage event={event} />;
}
