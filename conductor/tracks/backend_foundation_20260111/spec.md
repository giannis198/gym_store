# Spec: Backend Foundation & Content Management

## Overview
This track transitions IRON & GLOVES from a static landing page to a dynamic, data-driven application. It establishes the persistent storage layer (PostgreSQL/Prisma), the security layer (BetterAuth), and the content management layer (Sanity). This foundation is required for the subsequent booking system and admin panel.

## Requirements
- **Database & ORM:**
    - Initialize Prisma with PostgreSQL.
    - Define schema for `User`, `Session`, `Account`, and `ClassBooking` (preliminary).
- **Authentication (BetterAuth):**
    - Configure BetterAuth with Prisma adapter.
    - Support Email/Password login.
    - Support Google OAuth login.
    - Implement basic "User" and "Admin" roles.
- **Content Management (Sanity):**
    - Initialize Sanity.io Studio.
    - Define schemas for: `Program`, `Coach`, and `ScheduleItem`.
- **Dynamic Data Integration:**
    - Refactor `About`, `Programs`, `Coaches`, and `Schedule` sections to fetch data from Sanity via Next.js Server Components.
    - Implement a basic "Protected Route" pattern for authenticated users.

## Success Criteria
- Prisma can successfully migrate and query the PostgreSQL database.
- Users can sign up and log in via BetterAuth.
- Content managed in Sanity Studio is correctly rendered on the frontend.
- Hardcoded data is completely removed from the primary sections.
