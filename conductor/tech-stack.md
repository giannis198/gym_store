# Tech Stack: IRON & GLOVES Boxing Club

## Frontend Core
- **Framework:** Next.js 14+ (App Router) for high-performance server-side rendering and routing.
- **Language:** TypeScript for type-safe, maintainable code.
- **Styling:** Tailwind CSS for rapid, utility-first styling and easy brand customization.
- **UI Components:** shadcn/ui (Radix UI) for accessible, unstyled components, customized with brand-specific wrappers.

## Animation & Motion
- **Engine:** GSAP (GreenSock Animation Platform) for high-performance, complex animations.
- **React Integration:** `@gsap/react` for seamless GSAP usage within React's lifecycle (via `useGSAP` hook).
- **Patterns:** Inline GSAP logic within components for unique, high-impact section reveals and micro-interactions.

## Content & Backend
- **Authentication:** BetterAuth for secure, modern user authentication and session management.
- **Database:** PostgreSQL for reliable, relational data storage (Users, Bookings, Subscriptions).
- **ORM:** Prisma for type-safe database access and migrations.
- **CMS:** Custom-built Admin Panel using Next.js Server Actions and Prisma for managing marketing content (programs, coaches, schedules).
- **Data Fetching:** Next.js Server Components and Server Actions for efficient, secure communication with the database and CMS.

## Performance & Assets
- **Image Handling:** Next.js `Image` component optimized via Vercel/Cloudinary for modern formats and responsive delivery.
- **Deployment:** Vercel for seamless integration with Next.js features and global performance.
- **SEO:** Built-in Next.js metadata API for robust search engine optimization.

---
**Note (2026-01-11):** Updated backend architecture to include BetterAuth, PostgreSQL, and Prisma to support user accounts, class bookings, and subscription management.
