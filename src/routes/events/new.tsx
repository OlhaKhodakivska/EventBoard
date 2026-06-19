import { createFileRoute, useRouter } from '@tanstack/react-router'
import { EventForm } from '../../components/EventForm/EventForm'
import { useEvents } from '../../hooks/useEvents'

export const Route = createFileRoute('/events/new')({
  component: NewEventRoute,
})

function NewEventRoute() {
  const { createEvent } = useEvents()
  const router = useRouter() // Використовуємо для навігації після сабміту

  const handleSubmit = (values: any) => {
    createEvent(values)
    // Після створення повертаємо користувача на список подій
    router.navigate({ to: '/events' })
  }

  return (
    <section style={{ color: 'var(--text-h)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Create New Event</h1>
        <p>Fill out the form below to add a new event to the board.</p>
      </header>

      <EventForm onSubmit={handleSubmit} submitLabel="Create Event" />
    </section>
  )
}