/* eslint-disable react-refresh/only-export-components */

import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { EventCard } from '../../components/EventCard/EventCard'
import { useEvents } from '../../hooks/useEvents'
import type { EventCategory, EventStatus } from '../../types/event'

const categories: Array<EventCategory | 'all'> = [
  'all',
  'workshop',
  'talk',
  'networking',
  'review',
  'other',
]

const statuses: Array<EventStatus | 'all'> = [
  'all',
  'draft',
  'published',
  'cancelled',
  'completed',
]

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export const Route = createFileRoute('/events/')({
  component: EventsIndexRoute,
})

function EventsIndexRoute() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const { events } = useEvents()

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return events.filter((event) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [event.title, event.description, event.location]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)

      const matchesCategory =
        selectedCategory === 'all' || event.category === selectedCategory

      const matchesStatus =
        selectedStatus === 'all' || event.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [events, searchTerm, selectedCategory, selectedStatus])

  return (
    <section>
      <header>
        <h1>Events overview</h1>
        <p>Browse the current event list, search by keyword, and filter by category or status.</p>
      </header>

      <form style={{ display: 'grid', gap: '1rem', margin: '1.5rem 0' }}>
        <label>
          Search
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search events"
          />
        </label>

        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <label>
            Category
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All categories' : formatLabel(category)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All statuses' : formatLabel(status)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>

      {filteredEvents.length > 0 ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>No events match your filters.</p>
      )}
    </section>
  )
}
