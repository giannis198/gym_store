# Spec: Conversion & Engagement (Membership, Schedule, and Contact)

## Overview
This track completes the functional lifecycle of the IRON & GLOVES website. It focuses on converting visitors into members through clear value propositions (Pricing), providing utility (Schedule), and enabling direct engagement (Contact). All components must maintain the high-impact "Modern Stealth" design and "Impactful & Kinetic" motion strategy.

## Requirements
- **Membership & Pricing Section:**
    - Interactive comparison table with three tiers: Basic, Pro, Elite.
    - Highlight the "Pro" tier as the recommended option.
    - Use `PremiumCard` and `PremiumButton` components.
    - GSAP-powered hover effects for tier cards.
- **Class Schedule Section:**
    - Responsive grid or tabbed interface for daily schedules.
    - Clear distinction between class types (Boxing Tech, Boxfit, etc.).
    - Mobile-optimized view (scrollable or accordion).
- **Contact & Lead Capture Section:**
    - High-impact contact form using shadcn/ui components (Input, Textarea).
    - Validation for email and required fields.
    - Final "Join the Club" CTA with a dramatic background reveal.
- **Consistency:**
    - Integrated GSAP reveals for all sections.
    - Adherence to WCAG AA contrast for all functional elements.

## Success Criteria
- The pricing table clearly differentiates features between tiers.
- The schedule is intuitive and easy to read on both mobile and desktop.
- The contact form successfully handles state and provides user feedback (e.g., success message).
- All navigation links (Pricing, Schedule, Contact) correctly anchor to their sections.
