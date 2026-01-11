import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Contact } from '@/components/sections/contact'

describe('Contact Component', () => {
  it('should render the Contact section with input fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your message/i)).toBeInTheDocument()
  })

  it('should render the submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
  })
})
