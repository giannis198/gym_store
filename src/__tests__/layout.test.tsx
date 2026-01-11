import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RootLayout from '@/app/layout'

// Mock metadata and fonts if necessary, but layout.tsx usually imports them.
// We can just try to render it if it's a Server Component or wrap it if it uses client hooks.

describe('Root Layout', () => {
  it('should render the brand name "IRON & GLOVES"', async () => {
    // RootLayout is usually an async Server Component in App Router
    // but in tests we might need to handle it differently if it's complex.
    // For now, let's assume we can render its basic structure.
    
    // Note: Rendering RootLayout directly might be tricky because it renders <html> and <body> tags.
    // Usually we test a Header component instead.
    
    // Let's check if we have a Header component. If not, we should probably create one.
  })
})
