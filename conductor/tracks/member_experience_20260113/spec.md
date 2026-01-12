# Spec: Member Experience & Booking System

## Overview
This track focuses on transforming the static schedule and pricing sections into a fully functional booking and subscription system. It ensures users can purchase memberships and book classes, while the system enforces capacity limits and subscription validity.

## Requirements

### 1. Subscription Purchase Flow
- **Checkout:** Users must be able to purchase a subscription (Basic, Pro, Elite) via the Pricing section.
- **Mock Payment:** Implement a mock payment provider (or Stripe placeholder) to handle transactions.
- **State Update:** Upon successful payment, update the user's `Subscription` record in the database.

### 2. Interactive Schedule & Booking
- **Booking Interface:** Add "Book Class" buttons to the Schedule component for authenticated users.
- **Validation:**
    - Check if the user has an active subscription.
    - Check if the user has already booked the class.
    - (Optional) Check class capacity (requires adding `capacity` to `ScheduleItem` or `ClassBooking` logic).
- **Server Action:** Implement `bookClass(scheduleItemId, date)` to create a `ClassBooking` record.

### 3. Capacity Management (Basic)
- **Limit:** Enforce a hard limit (e.g., 20 spots) per class session.
- **Feedback:** Show "Full" state on the schedule if capacity is reached.

### 4. User Notifications
- **Toast:** Show success/error messages for booking attempts.
- **Email (Mock):** Log an email notification to the console/server logs upon booking confirmation.

## Success Criteria
- A user can select a plan and "purchase" it, updating their profile.
- A user with an active subscription can click "Book" on a schedule item and see it appear in their Profile -> My Classes.
- A user cannot book a class if they don't have a subscription or if the class is full.
