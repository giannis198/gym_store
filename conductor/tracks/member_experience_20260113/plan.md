# Plan: Member Experience & Booking System

## Phase 1: Subscription Checkout Logic [checkpoint: 09fdd7e]
- [x] Task: Create a `checkout` Server Action to handle subscription purchase (mock payment).
- [x] Task: Connect the `Pricing` component buttons to the `checkout` action.
- [x] Task: Update the User Profile to reflect the newly purchased subscription immediately.
- [x] Task: Conductor - User Manual Verification 'Subscription Purchase' (Protocol in workflow.md)

## Phase 2: Interactive Booking System
- [x] Task: Update `ScheduleItem` model to include a `capacity` field (default 20). [580455e]
- [x] Task: Implement `bookClass` Server Action with validation (subscription check, capacity check).
- [x] Task: Refactor `Schedule` component to show "Book" buttons and handle loading states.
- [x] Task: Conductor - User Manual Verification 'Class Booking' (Protocol in workflow.md)

## Phase 3: Capacity & Feedback
- [ ] Task: Implement logic to calculate remaining spots for a specific class date.
- [ ] Task: Update `Schedule` UI to show "Full" or "X spots left" status.
- [ ] Task: Add toast notifications for all booking interactions.
- [ ] Task: Conductor - User Manual Verification 'Capacity Limits' (Protocol in workflow.md)
