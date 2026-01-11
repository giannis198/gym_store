import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Pricing } from '@/components/sections/pricing'

describe('Pricing Component', () => {
  it('should render the Pricing section with three membership tiers', () => {
    render(<Pricing />)
    expect(screen.getByRole('heading', { name: /BASIC/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /PRO/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ELITE/i })).toBeInTheDocument()
  })

  it('should display the correct prices for each tier', () => {
    render(<Pricing />)
    expect(screen.getByText('49')).toBeInTheDocument()
    expect(screen.getByText('89')).toBeInTheDocument()
    expect(screen.getByText('149')).toBeInTheDocument()
  })

  it('should highlight the PRO tier as recommended', () => {
    render(<Pricing />)
    // We expect the recommended tier to have some distinct class or indicator
    // For now, let's just check if "Recommended" or similar text is present
    expect(screen.getByText(/MOST POPULAR/i)).toBeInTheDocument()
  })
})
