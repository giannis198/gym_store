import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Coaches } from '@/components/sections/coaches'

const mockCoaches = [
  {
    id: '1',
    name: "Marcus \"The Tank\" Reed",
    role: "Head Coach / Heavyweight",
    bio: "Former professional heavyweight with 15 years of ringside experience. Specializes in power delivery and tactical pressure.",
    image: "https://images.unsplash.com/photo-1561532325-7d5231a2dede?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: '2',
    name: "Sarah \"Lighting\" Chen",
    role: "Technical Lead / Lightweight",
    bio: "National amateur champion. Expert in high-velocity combinations and precision counter-punching.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop"
  }
]

describe('Coaches Component', () => {
  it('should render the Coaches section with elite coaches titles', () => {
    render(<Coaches coaches={mockCoaches} />)
    expect(screen.getByText(/Marcus "The Tank" Reed/i)).toBeInTheDocument()
    expect(screen.getByText(/Sarah "Lighting" Chen/i)).toBeInTheDocument()
  })

  it('should render coach specialties', () => {
    render(<Coaches coaches={mockCoaches} />)
    expect(screen.getByText(/Head Coach \/ Heavyweight/i)).toBeInTheDocument()
    expect(screen.getByText(/Technical Lead \/ Lightweight/i)).toBeInTheDocument()
  })
})