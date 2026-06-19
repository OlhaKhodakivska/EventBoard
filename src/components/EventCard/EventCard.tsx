import { Link } from '@tanstack/react-router'
import styles from './EventCard.module.css'
import type { Event } from '../../types/event'

type EventCardProps = {
  event: Event
}

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export function EventCard({ event }: EventCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{formatLabel(event.category)}</span>
        <span className={styles.status}>{formatLabel(event.status)}</span>
      </div>

      <h3 className={styles.title}>{event.title}</h3>

      <dl className={styles.details}>
        <div>
          <dt>Date</dt>
          <dd>
            <time dateTime={event.date}>{event.date}</time>
          </dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{event.time}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{event.location}</dd>
        </div>
        <div>
          <dt>Participants</dt>
          <dd>
            {event.attendees.length} / {event.maxAttendees}
          </dd>
        </div>
      </dl>

      <Link
        className={styles.link}
        to="/events/$eventId"
        params={{ eventId: event.id } as never}
      >
        View details
      </Link>
    </article>
  )
}

export default EventCard
