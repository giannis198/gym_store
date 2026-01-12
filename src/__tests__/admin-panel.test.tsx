import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AdminPage from '@/app/admin/[[...index]]/page'

// Mock the server actions
vi.mock('@/lib/actions/content', () => ({
  getPrograms: vi.fn(() => Promise.resolve([])),
  getCoaches: vi.fn(() => Promise.resolve([])),
  getScheduleItems: vi.fn(() => Promise.resolve([])),
}))

describe('Admin Panel Page', () => {
  it('should render the Admin Panel heading and tabs', async () => {
    // Note: AdminPage is likely an async component now if it fetches data
    const Result = await AdminPage()
    render(Result)
    
    expect(screen.getByRole('heading', { name: /Admin Dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/Manage Programs/i)).toBeInTheDocument()
    expect(screen.getByText(/Manage Coaches/i)).toBeInTheDocument()
    expect(screen.getByText(/Manage Schedule/i)).toBeInTheDocument()
  })
})