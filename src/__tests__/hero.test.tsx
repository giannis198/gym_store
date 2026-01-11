import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from '@/components/sections/hero'

describe('Hero Component', () => {
  it('should render the main headline parts', () => {
    render(<Hero />)
    expect(screen.getByText('I')).toBeInTheDocument()
    expect(screen.getByText('R')).toBeInTheDocument()
    expect(screen.getByText('&')).toBeInTheDocument()
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('should render the primary CTA button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /Explore Programs/i })).toBeInTheDocument()
  })
})
