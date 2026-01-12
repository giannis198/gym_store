import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Programs, ProgramData } from '@/components/sections/programs' // Import ProgramData

const mockPrograms: ProgramData[] = [
  {
    title: 'BOXING TECH',
    description: 'Master the art of boxing with advanced techniques.',
    intensity: 'High',
    icon: 'Zap',
    color: 'text-red-500',
  },
  {
    title: 'BOXFIT',
    description: 'High-energy cardio and boxing drills for all levels.',
    intensity: 'Medium',
    icon: 'Heart',
    color: 'text-green-500',
  },
  {
    title: 'STRENGTH & COND',
    description: 'Build strength and endurance for peak performance.',
    intensity: 'Very High',
    icon: 'Muscle',
    color: 'text-blue-500',
  },
]

describe('Programs Component', () => {
  it('should render the Programs section with program titles', () => {
    render(<Programs programs={mockPrograms} />) // Pass mockPrograms
    expect(screen.getByText(/BOXING TECH/i)).toBeInTheDocument()
    expect(screen.getByText(/BOXFIT/i)).toBeInTheDocument()
    expect(screen.getByText(/STRENGTH & COND/i)).toBeInTheDocument()
  })

  it('should render intensity badges for programs', () => {
    render(<Programs programs={mockPrograms} />) // Pass mockPrograms
    const badges = screen.getAllByText(/Intensity/i)
    expect(badges.length).toBe(mockPrograms.length) // Expect exact number of badges
  })
})
