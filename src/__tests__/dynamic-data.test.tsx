import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '@/app/page'
import * as actions from '@/lib/actions/content'

// Mock the server actions
vi.mock('@/lib/actions/content', () => ({
  getPrograms: vi.fn(() => Promise.resolve([{ id: '1', title: 'Dynamic Program', description: '...', intensity: '...' }])),
  getCoaches: vi.fn(() => Promise.resolve([{ id: '1', name: 'Dynamic Coach', role: '...', bio: '...' }])),
  getScheduleItems: vi.fn(() => Promise.resolve([{ id: '1', day: 'Mon', time: '...', program: { title: '...' }, coach: { name: '...' } }])),
}))

describe('Home Page Dynamic Data', () => {
  it('should fetch data and render dynamic content', async () => {
    // @ts-ignore - Home is an async component
    const Result = await Home()
    render(Result)
    
    expect(actions.getPrograms).toHaveBeenCalled()
    expect(actions.getCoaches).toHaveBeenCalled()
    expect(actions.getScheduleItems).toHaveBeenCalled()

    expect(screen.getByText(/Dynamic Program/i)).toBeInTheDocument()
    expect(screen.getByText(/Dynamic Coach/i)).toBeInTheDocument()
  })
})
