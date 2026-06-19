/* eslint-disable react-refresh/only-export-components */

import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useEvents } from '../../hooks/useEvents'
import styles from '../../components/EventCard/EventCard.module.css'

export const Route = createFileRoute('/events/$eventId')({
  component: EventDetailsRoute,
})

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function EventDetailsRoute() {
  const { eventId } = Route.useParams()
  const { getEventById, deleteEvent, registerAttendee } = useEvents() // Використовуємо хук
  const router = useRouter()
  const [registrationForm, setRegistrationForm] = useState({ name: '', email: '' })
  const [registrationErrors, setRegistrationErrors] = useState<{ name?: string; email?: string }>({})

  const event = getEventById(eventId)

  if (!event) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-h)' }}>
        <h2>Event not found</h2>
        <p>The event with ID "{eventId}" does not exist.</p>
        <Link to="/events" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>
          Back to events overview
        </Link>
      </div>
    )
  }

  // Функція видалення з підтвердженням (Вимога ТЗ)
  const handleDelete = () => {
    const shouldDelete = window.confirm(`Do you really want to delete this event: "${event.title}"?`)
    if (shouldDelete) {
      deleteEvent(event.id)
      // Після видалення перенаправляємо на список подій
      router.navigate({ to: '/events' })
    }
  }

  // Функція реєстрації учасника
  const handleRegisterAttendee = (e: React.FormEvent) => {
    e.preventDefault()

    // Валідація
    const errors: { name?: string; email?: string } = {}
    if (!registrationForm.name.trim()) {
      errors.name = 'Name is required'
    }
    if (!registrationForm.email.trim()) {
      errors.email = 'Email is required'
    } else if (!validateEmail(registrationForm.email)) {
      errors.email = 'Invalid email format'
    }

    if (Object.keys(errors).length > 0) {
      setRegistrationErrors(errors)
      return
    }

    // Реєстрація
    registerAttendee(eventId, registrationForm)
    setRegistrationForm({ name: '', email: '' })
    setRegistrationErrors({})
  }

  // Розрахунок процента завантаженості
  const occupancyPercent = (event.attendees.length / event.maxAttendees) * 100
  const isSoldOut = event.attendees.length >= event.maxAttendees

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-h)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
          ← Back to events
        </Link>

        {/* Кнопки управління */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            to="/events/$eventId/edit"
            params={{ eventId: event.id }}
            style={{ padding: '0.5rem 1rem', background: 'var(--text)', color: 'var(--accent-contrast)', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            Edit Event
          </Link>
          <button
            onClick={handleDelete}
            style={{ padding: '0.5rem 1rem', background: 'var(--danger)', color: 'var(--accent-contrast)', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}
          >
            Delete Event
          </button>
        </div>
      </div>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>{event.title}</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span className={styles.category}>{formatLabel(event.category)}</span>
          <span className={styles.status}>{formatLabel(event.status)}</span>
        </div>
      </header>

      <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text)', marginBottom: '2rem' }}>
        {event.description}
      </p>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(95, 111, 104, 0.28)', padding: '1rem', borderRadius: '0.85rem' }}>
          <strong style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Date & Time</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>{event.date} at {event.time}</p>
        </div>
        <div style={{ background: 'rgba(95, 111, 104, 0.28)', padding: '1rem', borderRadius: '0.85rem' }}>
          <strong style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Location</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>{event.location}</p>
        </div>
        <div style={{ background: 'rgba(95, 111, 104, 0.28)', padding: '1rem', borderRadius: '0.85rem' }}>
          <strong style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Occupancy</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>{event.attendees.length} / {event.maxAttendees} slots taken</p>
          {/* Progress Bar */}
          <div style={{ width: '100%', backgroundColor: 'rgba(255, 212, 71, 0.24)', borderRadius: '4px', height: '8px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div
              style={{
                width: `${occupancyPercent}%`,
                backgroundColor: occupancyPercent > 75 ? 'var(--danger)' : occupancyPercent > 50 ? 'var(--accent-hover)' : 'var(--success)',
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        </div>
      </div>

      <section>
        <h3 style={{ borderBottom: '1px solid rgba(138, 154, 145, 0.55)', paddingBottom: '0.5rem' }}>Attendees</h3>
        {event.attendees.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {event.attendees.map((attendee) => (
              <li key={attendee.id} style={{ background: 'rgba(95, 111, 104, 0.22)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                <strong>{attendee.name}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({attendee.email})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No attendees registered yet.</p>
        )}
      </section>

      {/* Форма реєстрації */}
      {event.status === 'published' ? (
        <section style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--accent-bg)', borderRadius: '1rem', border: '1px solid var(--accent-border)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Register for this event</h3>

          {isSoldOut ? (
            <div style={{ padding: '1rem', background: 'var(--danger-bg)', borderRadius: '0.5rem', color: 'var(--text-h)', fontWeight: 'bold', textAlign: 'center' }}>
              Sold Out! No slots available.
            </div>
          ) : (
            <form onSubmit={handleRegisterAttendee} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Name *</span>
                <input
                  type="text"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                  placeholder="Your full name"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: '#f5f6f3',
                    color: 'var(--accent-contrast)',
                    fontSize: '0.95rem',
                  }}
                />
                {registrationErrors.name && (
                  <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{registrationErrors.name}</span>
                )}
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Email *</span>
                <input
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                  placeholder="your@email.com"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)',
                    background: '#f5f6f3',
                    color: 'var(--accent-contrast)',
                    fontSize: '0.95rem',
                  }}
                />
                {registrationErrors.email && (
                  <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{registrationErrors.email}</span>
                )}
              </label>

              <button
                type="submit"
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--accent)',
                  color: 'var(--accent-contrast)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Register Now
              </button>
            </form>
          )}
        </section>
      ) : (
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Registration is only available for published events.
        </div>
      )}
    </article>
  )
}
