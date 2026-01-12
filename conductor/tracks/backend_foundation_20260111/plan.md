# Plan: Backend Foundation & Content Management

## Phase 1: Database & ORM Setup [checkpoint: be8f038]
- [x] Task: Initialize Prisma and configure the PostgreSQL connection. [98a875e]
- [x] Task: Define the core database schema and perform the initial migration. [8c82136]
- [x] Task: Create a database utility client for server-side queries. [98a875e]
- [ ] Task: Conductor - User Manual Verification 'Database & ORM Setup' (Protocol in workflow.md)

## Phase 2: Authentication (BetterAuth)
- [ ] Task: Configure BetterAuth with the Prisma adapter and core options.
- [ ] Task: Implement the 'Signup' and 'Login' API routes and client-side auth state.
- [ ] Task: Build the Authentication UI (Login/Signup pages) in "Modern Stealth" style.
- [ ] Task: Conductor - User Manual Verification 'Authentication (BetterAuth)' (Protocol in workflow.md)

## Phase 3: Content Management (Sanity)
- [ ] Task: Initialize Sanity CMS and define schemas for Programs, Coaches, and Schedule.
- [ ] Task: Refactor frontend components to fetch content from the Sanity Client.
- [ ] Task: Implement a basic "Login" button in the header that reacts to auth state.
- [ ] Task: Conductor - User Manual Verification 'Content Management (Sanity)' (Protocol in workflow.md)
