import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Schedule } from '@/components/sections/schedule'

const mockSchedule = [
  { 
    id: '1',
    day: "Mon", 
    time: "06:00 AM", 
    program: { title: "Boxing Tech" }, 
    coach: { name: "Sarah Chen" } 
  },
  { 
    id: '2',
    day: "Tue", 
    time: "07:00 AM", 
    program: { title: "Strength & Cond" }, 
    coach: { name: "Elena Volkov" } 
  }
]

describe('Schedule Component', () => {
  it('should render the Schedule section with daily tabs', () => {
    render(<Schedule scheduleItems={mockSchedule} />)
    expect(screen.getByText(/Mon/i)).toBeInTheDocument()
    expect(screen.getByText(/Tue/i)).toBeInTheDocument()
  })

  it('should render class items with time and title', () => {
    render(<Schedule scheduleItems={mockSchedule} />)
    // Assuming Monday is the default active tab
    expect(screen.getAllByText(/06:00 AM/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Boxing Tech/i).length).toBeGreaterThan(0)
  })
})