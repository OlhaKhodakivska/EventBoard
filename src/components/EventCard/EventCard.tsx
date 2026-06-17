import styles from './EventCard.module.css'
import type { Event } from '../../types/event'

type EventCardProps = {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return <article className={styles.card}>{event.title}</article>
}

export default EventCard
