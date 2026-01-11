import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { About } from '@/components/sections/about'

describe('About Component', () => {
  it('should render the About section with the correct headline', () => {
    render(<About />)
    expect(screen.getAllByText(/DISCIPLINE/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/POWER/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/RESILIENCE/i).length).toBeGreaterThan(0)
  })

  it('should render the brand description', () => {
    render(<About />)
    expect(screen.getByText(/IRON & GLOVES isn't just a gym/i)).toBeInTheDocument()
  })
})
