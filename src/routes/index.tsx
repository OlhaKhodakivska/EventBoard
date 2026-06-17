import { createFileRoute } from '@tanstack/react-router'
import styles from '../components/Layout/Layout.module.css' // Імпорт CSS модуля

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p>This section will contain the calculation data for Day 1.</p>
    </div>
  )
}