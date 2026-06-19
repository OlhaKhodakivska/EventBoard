import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutRoute,
})

function AboutRoute() {
  return (
    <section style={{ color: 'var(--text-h)', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>About EventBoard</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text)' }}>Connecting IT professionals through meaningful events and learning opportunities</p>
      </header>

      {/* Mission Section */}
      <div style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--accent-bg)', borderRadius: '1rem', border: '1px solid var(--accent-border)' }}>
        <h2 style={{ marginTop: 0 }}>Our Mission</h2>
        <p style={{ lineHeight: '1.8', fontSize: '1.05rem' }}>
          EventBoard is dedicated to bringing together the IT community through expertly curated events, workshops, and networking opportunities. We believe in fostering a culture of continuous learning and collaboration where developers, engineers, architects, and tech enthusiasts can connect, share knowledge, and grow together.
        </p>
      </div>

      {/* What We Do */}
      <div style={{ marginBottom: '3rem' }}>
        <h2>What We Offer</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>💻 Technical Workshops</h3>
            <p>Deep-dive sessions on the latest technologies, frameworks, and best practices. From React to cloud architecture, we cover it all.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--success)' }}>🎤 Expert Talks</h3>
            <p>Learn from industry leaders and experienced professionals. Gain insights into career development, technology trends, and innovative solutions.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>🤝 Networking Events</h3>
            <p>Connect with like-minded professionals, build relationships, and explore collaboration opportunities in a relaxed, engaging environment.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>🔍 Code Reviews</h3>
            <p>Constructive feedback sessions where developers review each other's code, discuss implementation patterns, and improve coding practices together.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--success)' }}>📚 Learning Resources</h3>
            <p>Access to curated materials, recorded sessions, and documentation from all our events. Learn at your own pace and revisit topics anytime.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'rgba(95, 111, 104, 0.28)', borderRadius: '1rem', border: '1px solid rgba(138, 154, 145, 0.45)' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>🌟 Career Opportunities</h3>
            <p>Connect with companies and startups looking to hire talented developers. Explore job opportunities and showcase your skills to potential employers.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ marginBottom: '3rem', padding: '2rem', background: 'rgba(167, 243, 193, 0.16)', borderRadius: '1rem', border: '1px solid rgba(167, 243, 193, 0.55)' }}>
        <h2 style={{ marginTop: 0 }}>Why Choose EventBoard?</h2>
        <ul style={{ lineHeight: '2', fontSize: '1.05rem', paddingLeft: '1.5rem' }}>
          <li><strong>Community-Driven:</strong> Built by developers, for developers. We understand what our community needs.</li>
          <li><strong>Professionally Organized:</strong> Every event is carefully planned and executed to ensure maximum value and engagement.</li>
          <li><strong>Diverse Content:</strong> From beginner-friendly workshops to advanced technical talks, we have something for everyone.</li>
          <li><strong>Inclusive Environment:</strong> All skill levels and backgrounds welcome. We celebrate diversity in tech.</li>
          <li><strong>Flexible Participation:</strong> Attend in person or join online. Choose what works best for you.</li>
          <li><strong>Networking Opportunities:</strong> Meet peers, mentors, and potential collaborators in a supportive atmosphere.</li>
        </ul>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--accent-bg), rgba(167, 243, 193, 0.16))', borderRadius: '1rem', border: '1px solid var(--accent-border)', textAlign: 'center' }}>
        <h2>Ready to Join Us?</h2>
        <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>Explore our upcoming events, register for sessions that inspire you, and become part of the thriving IT community.</p>
        <Link
          to="/events"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'var(--accent)',
            color: 'var(--accent-contrast)',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
        >
          Explore Events
        </Link>
      </div>

      {/* Contact Info */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(138, 154, 145, 0.55)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h3>Get In Touch</h3>
        <p>Have questions or want to organize an event with us?</p>
        <p>
          Email: <strong>events@eventboard.tech</strong>
        </p>
        <p>
          Follow us on social media for the latest updates and announcements.
        </p>
      </div>
    </section>
  )
}
