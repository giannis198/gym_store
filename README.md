# Fitness Club Management System

A comprehensive web application for managing a fitness club, built with modern web technologies. Features a public website for members and an admin panel for managing content, subscriptions, and operations.

## Features

### Public Website
- **Hero Section**: Engaging landing page with call-to-action
- **About**: Club information and mission
- **Programs**: Display available fitness programs with details
- **Coaches**: Showcase coaching staff with bios and images
- **Pricing**: Subscription tiers and pricing plans
- **Schedule**: Class schedules with program and coach assignments
- **Contact**: Contact form and information

### Admin Panel
- **Dashboard**: Overview metrics and insights
- **Program Management**: Create and edit fitness programs
- **Coach Management**: Manage coaching staff profiles
- **Schedule Management**: Organize class schedules and capacity
- **Pricing Management**: Configure subscription plans
- **Subscription Management**: Handle member subscriptions
- **Member Management**: View and manage club members

### User Features
- **Authentication**: Secure login with Better Auth
- **Class Booking**: Members can book fitness classes
- **Subscription Management**: View and manage personal subscriptions
- **Profile Management**: User profile and settings

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **CMS**: Sanity for content management
- **Authentication**: Better Auth with session management
- **Testing**: Vitest with React Testing Library
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Sanity account (for content management)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with the following variables:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fitness_club"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_AUTH_TOKEN=your_sanity_auth_token

# Authentication
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Email (if using email features)
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@example.com
EMAIL_SERVER_PASSWORD=your_email_password
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed initial data:
```bash
npx prisma db seed
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Building

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

## Linting

Check code quality:
```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel pages
│   ├── profile/           # User profile pages
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── admin/            # Admin-specific components
│   ├── sections/         # Page section components
│   └── ui/               # UI component library
├── lib/                  # Utility libraries and configurations
│   ├── actions/          # Server actions
│   ├── auth.ts           # Authentication setup
│   └── prisma.ts         # Database client
├── __tests__/            # Test files
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## Database Schema

The application uses Prisma with PostgreSQL and includes models for:
- Users and authentication
- Subscriptions and pricing
- Class bookings
- Programs, coaches, and schedules
- Admin metrics and content

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## License

This project is private and proprietary.
