import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AdminPage from '@/app/admin/[[...index]]/page' // Assuming this path for the admin page

describe('Admin Panel Page', () => {
  it('should render the Admin Panel heading', () => {
    render(<AdminPage />)
    expect(screen.getByRole('heading', { name: /Admin Panel/i })).toBeInTheDocument()
  })
})
