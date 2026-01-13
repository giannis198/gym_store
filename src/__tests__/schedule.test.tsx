import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Schedule } from '@/components/sections/schedule'

// Mock dependencies
vi.mock('@/lib/auth-client', () => ({
  useSession: vi.fn(() => ({ data: null }))
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() }))
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn()
}))

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    from: vi.fn(),
  }
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    refresh: vi.fn()
  }
}))

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

  it('should render class items with time, title and Book button', () => {
    render(<Schedule scheduleItems={mockSchedule} />)
    // Assuming Monday is the default active tab
    expect(screen.getAllByText(/06:00 AM/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Boxing Tech/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Book/i).length).toBeGreaterThan(0)
  })
})