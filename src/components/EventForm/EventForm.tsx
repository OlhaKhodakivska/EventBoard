import React, { useState } from 'react'
import type { EventCategory, EventStatus } from '../../types/event'

// Описуємо поля, з якими працює форма
export type EventFormValues = {
  title: string
  description: string
  date: string
  time: string
  location: string
  category: EventCategory
  status: EventStatus
  maxAttendees: number
}

type EventFormProps = {
  initialValues?: EventFormValues
  onSubmit: (values: EventFormValues) => void
  submitLabel: string
}

const defaultValues: EventFormValues = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'workshop',
  status: 'draft',
  maxAttendees: 10,
}

export function EventForm({ initialValues, onSubmit, submitLabel }: EventFormProps) {
  const [formState, setFormState] = useState<EventFormValues>(initialValues || defaultValues)
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormValues, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'maxAttendees' ? Number(value) : value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Валідація згідно з ТЗ
    const newErrors: Partial<Record<keyof EventFormValues, string>> = {}
    if (!formState.title.trim()) newErrors.title = 'Title is required'
    if (!formState.description.trim()) newErrors.description = 'Description is required'
    if (!formState.date) newErrors.date = 'Date is required'
    if (!formState.time) newErrors.time = 'Time is required'
    if (!formState.location.trim()) newErrors.location = 'Location is required'
    if (formState.maxAttendees <= 0) newErrors.maxAttendees = 'Must be greater than 0'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit(formState)
  }

  return (
    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
      <label>
        Title *
        <input type="text" name="title" value={formState.title} onChange={handleChange} />
        {errors.title && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.title}</span>}
      </label>

      <label>
        Description *
        <textarea name="description" value={formState.description} onChange={handleChange} />
        {errors.description && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.description}</span>}
      </label>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <label>
          Date *
          <input type="date" name="date" value={formState.date} onChange={handleChange} />
          {errors.date && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.date}</span>}
        </label>

        <label>
          Time *
          <input type="time" name="time" value={formState.time} onChange={handleChange} />
          {errors.time && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.time}</span>}
        </label>
      </div>

      <label>
        Location *
        <input type="text" name="location" value={formState.location} onChange={handleChange} />
        {errors.location && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.location}</span>}
      </label>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <label>
          Category
          <select name="category" value={formState.category} onChange={handleChange}>
            <option value="workshop">Workshop</option>
            <option value="talk">Talk</option>
            <option value="networking">Networking</option>
            <option value="review">Review</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" value={formState.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <label>
        Maximum Attendees *
        <input type="number" name="maxAttendees" value={formState.maxAttendees} onChange={handleChange} min="1" />
        {errors.maxAttendees && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.maxAttendees}</span>}
      </label>

      <button type="submit" style={{ padding: '0.75rem', background: 'var(--accent)', color: 'var(--accent-contrast)', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 'bold' }}>
        {submitLabel}
      </button>
    </form>
  )
}