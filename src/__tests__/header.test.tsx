import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '@/components/layout/header'

// Mock the auth client's useSession hook
vi.mock('@/lib/auth-client', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSession: vi.fn(() => ({
      data: null, // Default to unauthenticated for these tests
      status: 'unauthenticated',
      update: vi.fn(),
    })),
  };
});

// Mock Next.js router for Link component and useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    // Add any other methods used by useRouter in your component
  }),
  usePathname: () => '/', // Mock usePathname for Link active state
}));

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

  it('should render mobile menu trigger', () => {
    render(<Header />)
    const trigger = screen.getByRole('button', { name: /open menu/i })
    expect(trigger).toBeInTheDocument()
  })
})
