import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

// Встав свій ключ з панелі Clerk
const CLERK_PUBLISHABLE_KEY = "pk_test_aGFwcHktc2hlZXAtMjguY2xlcmsuYWNjb3VudHMuZGV2JA"

export const route = createRootRoute({
  component: () => (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <div>
        {/* Хедер та Навігація */}
        <header style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
          <nav>
            <Link to="/">Dashboard</Link> | {' '}
            <Link to="/events">Events</Link> | {' '}
            <Link to="/calendar">Calendar</Link> | {' '}
            <Link to="/about">About</Link>
          </nav>

          {/* Блок авторизації Clerk */}
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
          {/* Тут відображатимуться сторінки в залежності від маршруту */}
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  ),
})