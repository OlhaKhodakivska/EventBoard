import { useState, useEffect } from 'react'
import { initialEvents } from '../data/initialEvents'
import type { Event } from '../types/event'

const STORAGE_KEY = 'eventboard-events'

const mergeInitialEvents = (savedEvents: Event[]) => {
  const savedById = new Map(savedEvents.map((event) => [event.id, event]))

  return [...initialEvents.map((event) => savedById.get(event.id) ?? event), ...savedEvents.filter((event) => !initialEvents.some((initialEvent) => initialEvent.id === event.id))]
}

export function useEvents() {
  // 1. Ініціалізація стану: перевіряємо localStorage, якщо порожньо — беремо демо-дані
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Event[]
        return mergeInitialEvents(parsed)
      } catch (e) {
        console.error("Помилка парсингу даних з localStorage", e)
      }
    }
    return initialEvents
  })

  // 2. Ефект автоматичного збереження при будь-якій зміні масиву подій
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }, [events])

  // 3. Функція для пошуку однієї події за ID
  const getEventById = (id: string) => events.find((e) => e.id === id)

  // 4. Створення нової події (Додавання в масив)
  const createEvent = (newEvent: Omit<Event, 'id' | 'createdAt' | 'attendees'>) => {
    const eventToSave: Event = {
      ...newEvent,
      id: crypto.randomUUID(), // Генеруємо унікальний ID
      attendees: [],          // Нова подія завжди починається без учасників
      createdAt: new Date().toISOString().split('T')[0], // Поточна дата у форматі YYYY-MM-DD
    }
    setEvents((prev) => [eventToSave, ...prev])
    return eventToSave // повертаємо для можливого редіректу
  }

  // 5. Оновлення наявної події (Редагування)
  const updateEvent = (id: string, updatedFields: Partial<Omit<Event, 'id' | 'createdAt'>>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updatedFields } : event))
    )
  }

  // 6. Видалення події
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // 7. Скидання до демо-даних (Бонус з ТЗ)
  const resetEvents = () => {
    setEvents(initialEvents)
  }

  // 8. Реєстрація учасника на подію
  const registerAttendee = (eventId: string, attendeeData: Omit<Omit<import('../types/event').Attendee, 'id'>, 'id'>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: [
                ...event.attendees,
                {
                  id: crypto.randomUUID(),
                  name: attendeeData.name,
                  email: attendeeData.email,
                },
              ],
            }
          : event
      )
    )
  }

  return {
    events,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    resetEvents,
    registerAttendee,
  }
}