import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Header } from '@/components/layout/header'

describe('Header Component', () => {
  it('should render the brand name "IRON & GLOVES"', () => {
    render(<Header />)
    const brandElement = screen.getByRole('link', { name: /IRON & GLOVES/i })
    expect(brandElement).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByText(/Programs/i)).toBeInTheDocument()
    expect(screen.getByText(/Schedule/i)).toBeInTheDocument()
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument()
  })
})
