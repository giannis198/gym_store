import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Schedule } from '@/components/sections/schedule'

describe('Schedule Component', () => {
  it('should render the Schedule section with daily tabs', () => {
    render(<Schedule />)
    expect(screen.getByText(/Mon/i)).toBeInTheDocument()
    expect(screen.getByText(/Tue/i)).toBeInTheDocument()
    expect(screen.getByText(/Wed/i)).toBeInTheDocument()
  })

  it('should render class items with time and title', () => {
    render(<Schedule />)
    // Assuming Monday is the default active tab
    expect(screen.getAllByText(/06:00 AM/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Boxing Tech/i).length).toBeGreaterThan(0)
  })
})
