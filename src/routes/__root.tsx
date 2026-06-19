import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

// Insert your key from the Clerk dashboard
const CLERK_PUBLISHABLE_KEY = "pk_test_aGFwcHktc2hlZXAtMjguY2xlcmsuYWNjb3VudHMuZGV2JA"

export const Route = createRootRoute({
  component: () => (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div>
        {/* Header and navigation */}
        <header style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
          <nav>
            <Link to="/">Dashboard</Link> | {' '}
            <Link to={"/events" as never}>Events</Link> | {' '}
            <Link to="/calendar">Calendar</Link> | {' '}
            <Link to="/about">About</Link>
          </nav>

          {/* Clerk authentication block */}
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <main style={{ padding: '20px' }}>
          {/* Pages will render here based on the current route */}
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  ),
})