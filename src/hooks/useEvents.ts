import { useState } from 'react'
import { initialEvents } from '../data/initialEvents'
import type { Event } from '../types/event'

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(initialEvents)

  return {
    events,
    setEvents,
  }
}
