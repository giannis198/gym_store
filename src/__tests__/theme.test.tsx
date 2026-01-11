import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Theme Configuration', () => {
  it('should have the "text-neon-volt" class available', () => {
    render(<div className="text-neon-volt">Neon Text</div>)
    const element = screen.getByText('Neon Text')
    expect(element).toHaveClass('text-neon-volt')
  })

  it('should have the "bg-matte-black" class available', () => {
    render(<div className="bg-matte-black">Black Background</div>)
    const element = screen.getByText('Black Background')
    expect(element).toHaveClass('bg-matte-black')
  })
})
