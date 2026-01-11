import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Coaches } from '@/components/sections/coaches'

describe('Coaches Component', () => {
  it('should render the Coaches section with elite coaches titles', () => {
    render(<Coaches />)
    expect(screen.getByText(/Marcus "The Tank" Reed/i)).toBeInTheDocument()
    expect(screen.getByText(/Sarah "Lighting" Chen/i)).toBeInTheDocument()
    expect(screen.getByText(/Elena "The Shadow" Volkov/i)).toBeInTheDocument()
  })

  it('should render coach specialties', () => {
    render(<Coaches />)
    expect(screen.getByText(/Head Coach \/ Heavyweight/i)).toBeInTheDocument()
    expect(screen.getByText(/Technical Lead \/ Lightweight/i)).toBeInTheDocument()
  })
})
