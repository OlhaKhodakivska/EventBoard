/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, useRouter } from '@tanstack/react-router'
import { EventForm } from '../../components/EventForm/EventForm'
import { useEvents } from '../../hooks/useEvents'

export const Route = createFileRoute('/events/$eventId/edit')({
  component: EditEventRoute,
})

function EditEventRoute() {
  const { eventId } = Route.useParams()
  const { getEventById, updateEvent } = useEvents()
  const router = useRouter()

  // Шукаємо подію для редагування
  const event = getEventById(eventId)

  // Перевірка на випадок, якщо ID у URL неправильний
  if (!event) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-h)' }}>
        <h2>Event not found</h2>
        <p>Cannot edit a non-existing event.</p>
      </div>
    )
  }

  // Функція, яка спрацює при сабміті форми
  const handleSubmit = (values: any) => {
    updateEvent(eventId, values)
    // Після збереження повертаємо користувача на сторінку деталей події
    router.navigate({ to: '/events/$eventId', params: { eventId } })
  }

  // Перетворюємо об'єкт події у формат, який очікує форма (без id, attendees та createdAt)
  const initialValues = {
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
    category: event.category,
    status: event.status,
    maxAttendees: event.maxAttendees,
  }

  return (
    <section style={{ color: 'var(--text-h)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Edit Event</h1>
        <p>Modify the details of <strong>{event.title}</strong>.</p>
      </header>

      <EventForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </section>
  )
}