import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/$eventId/edit')({
  component: () => <div>Edit Event</div>,
})