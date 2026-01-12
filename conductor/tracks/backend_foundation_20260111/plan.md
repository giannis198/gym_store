# Plan: Backend Foundation & Content Management

## Phase 1: Database & ORM Setup [checkpoint: be8f038]
- [x] Task: Initialize Prisma and configure the PostgreSQL connection. [98a875e]
- [x] Task: Define the core database schema and perform the initial migration. [8c82136]
- [x] Task: Create a database utility client for server-side queries. [98a875e]
- [x] Task: Conductor - User Manual Verification 'Database & ORM Setup' (Protocol in workflow.md)

## Phase 2: Authentication (BetterAuth) [checkpoint: ca65c5c]
- [x] Task: Configure BetterAuth with the Prisma adapter and core options. [d5d8628]
- [x] Task: Implement the 'Signup' and 'Login' API routes and client-side auth state. [8472cb1]
- [x] Task: Build the Authentication UI (Login/Signup pages) in "Modern Stealth" style. [dd9d849]
- [x] Task: Add react-hot-toast for login and signup success/error notifications. [7d75ebe]
- [x] Task: Implement Google OAuth support in BetterAuth and add a "Sign in with Google" button. [8ad3fb0]
- [x] Task: Conductor - User Manual Verification 'Authentication (BetterAuth)' (Protocol in workflow.md)

## Phase 3: Content Management (Custom Admin Panel)
- [x] Task: Define Prisma models for Program, Coach, and Schedule. [5fb0b90]
- [~] Task: Implement API routes/Server Actions for CRUD operations on these models.
- [x] Task: Design and Implement a basic Admin Panel layout at /admin. [b5dd7ef]
- [ ] Task: Implement the Admin Panel UI for managing Programs, Coaches, and Schedule.
- [x] Task: Implement a basic "Login" button in the header that reacts to auth state. [7960aee]
- [ ] Task: Refactor frontend components (About, Programs, Coaches, Schedule) to fetch data from the database.
- [ ] Task: Conductor - User Manual Verification 'Custom Admin Panel & Content Management' (Protocol in workflow.md)
