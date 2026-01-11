import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Programs } from '@/components/sections/programs'

describe('Programs Component', () => {
  it('should render the Programs section with program titles', () => {
    render(<Programs />)
    expect(screen.getByText(/BOXING TECH/i)).toBeInTheDocument()
    expect(screen.getByText(/BOXFIT/i)).toBeInTheDocument()
    expect(screen.getByText(/STRENGTH & COND/i)).toBeInTheDocument()
  })

  it('should render intensity badges for programs', () => {
    render(<Programs />)
    const badges = screen.getAllByText(/Intensity/i)
    expect(badges.length).toBeGreaterThanOrEqual(3)
  })
})
