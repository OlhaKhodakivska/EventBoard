import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/new')({
  component: () => <div>New Event</div>,
})