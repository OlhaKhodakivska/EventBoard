import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useEvents } from '../hooks/useEvents'
import { EventCard } from '../components/EventCard/EventCard'

export const Route = createFileRoute('/calendar')({
  component: CalendarRoute,
})

type DateGroup = {
  [date: string]: Array<{ formatted: string; event: any }>
}

function CalendarRoute() {
  const { events } = useEvents()

  // Групування та сортування подій
  const groupedEvents = useMemo(() => {
    // Фільтруємо тільки опубліковані та завершені evento
    const filtered = events.filter((e) => e.status === 'published' || e.status === 'completed')

    // Групуємо за датами та сортуємо за часом
    const grouped: DateGroup = {}

    filtered.forEach((event) => {
      if (!grouped[event.date]) {
        grouped[event.date] = []
      }
      grouped[event.date].push({
        formatted: event.time,
        event,
      })
    })

    // Сортуємо события всередині кожної дати за часом
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => a.formatted.localeCompare(b.formatted))
    })

    // Повертаємо як масив відсортованих дат
    return Object.keys(grouped)
      .sort()
      .map((date) => ({
        date,
        events: grouped[date],
      }))
  }, [events])

  // Форматування дати для відображення (наприклад, "June 24, 2026")
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(`${dateStr}T00:00:00`)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <section style={{ color: 'var(--text-h)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Event Calendar</h1>
        <p>All published and completed events grouped by date.</p>
      </header>

      {groupedEvents.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {groupedEvents.map(({ date, events: eventsForDate }) => (
            <div key={date}>
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: 'var(--text)', borderBottom: '2px solid var(--accent-border)', paddingBottom: '0.5rem' }}>
                {formatDate(date)}
              </h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {eventsForDate.map(({ event }) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', color: 'var(--text-muted)' }}>
          <p>No published events scheduled yet.</p>
        </div>
      )}
    </section>
  )
}