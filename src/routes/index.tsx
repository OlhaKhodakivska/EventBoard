import { createFileRoute, Link } from "@tanstack/react-router";
import { EventCard } from "../components/EventCard/EventCard";
import { useEvents } from "../hooks/useEvents";

export const Route = createFileRoute("/")({
  component: DashboardRoute,
});

function DashboardRoute() {
  const { events } = useEvents();

  // Розрахунок статистики за вимогами ТЗ
  const totalEvents = events.length;
  const publishedEvents = events.filter(
    (e) => e.status === "published",
  ).length;
  const draftEvents = events.filter((e) => e.status === "draft").length;
  const completedEvents = events.filter((e) => e.status === "completed").length;
  const cancelledEvents = events.filter((e) => e.status === "cancelled").length;

  const totalAttendees = events.reduce(
    (sum, e) => sum + e.attendees.length,
    0,
  );

  const maxPossibleAttendees = events.reduce(
    (sum, e) => sum + e.maxAttendees,
    0,
  );
  const averageOccupancy =
    maxPossibleAttendees > 0
      ? Math.round((totalAttendees / maxPossibleAttendees) * 100)
      : 0;

  // Визначення найпопулярнішої категорії
  const categoryCount: Record<string, number> = {};
  events.forEach((e) => {
    categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCount).length > 0
    ? Object.entries(categoryCount).sort(([, a], [, b]) => b - a)[0][0]
    : "N/A";

  // Сортуємо події за датою, щоб знайти найближчі, та беремо перші 3
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const nextEvent = upcomingEvents[0] || null;

  return (
    <section style={{ color: "var(--text-h)" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1>Dashboard</h1>
        <p>
          Welcome to EventBoard! Here is the current performance and status
          overview.
        </p>
      </header>

      {/* Сітка зі статистикою */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Total Events
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {totalEvents}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--success)" }}>
            {publishedEvents} published | {draftEvents} drafts
          </span>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Total Attendees
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {totalAttendees}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Across all events
          </span>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Avg Occupancy
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {averageOccupancy}%
          </p>
          <div
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 212, 71, 0.24)",
              borderRadius: "4px",
              height: "6px",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                width: `${averageOccupancy}%`,
                backgroundColor: "var(--accent)",
                height: "100%",
                borderRadius: "4px",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Next Event
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "1.1rem",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {nextEvent ? nextEvent.title : "None planned"}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {nextEvent ? nextEvent.date : "-"}
          </span>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Completed
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {completedEvents}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--success)" }}>
            Successfully held
          </span>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Cancelled
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {cancelledEvents}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--danger)" }}>
            Not held
          </span>
        </div>

        <div
          style={{
            background: "rgba(95, 111, 104, 0.28)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(138, 154, 145, 0.45)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}
          >
            Top Category
          </h3>
          <p
            style={{
              margin: "0.5rem 0 0 0",
              fontSize: "1.3rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {topCategory}
          </p>
          <span style={{ fontSize: "0.8rem", color: "var(--accent)" }}>
            Most popular type
          </span>
        </div>
      </div>

      {/* Блок з 3 наступними подіями */}
      <div style={{ marginTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h2>Upcoming 3 Events</h2>
          <Link
            to="/events"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            See all events →
          </Link>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
