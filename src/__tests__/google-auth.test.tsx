import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '@/app/(auth)/login/page'
import SignupPage from '@/app/(auth)/signup/page'

// Mock the auth client
vi.mock('@/lib/auth-client', () => ({
  signIn: {
    email: vi.fn(),
    social: vi.fn(),
  },
  signUp: {
    email: vi.fn(),
  },
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock toast
vi.mock('react-hot-toast', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

describe('Google Authentication UI', () => {
  it('LoginPage should render "Continue with Google" button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
  })

  it('SignupPage should render "Continue with Google" button', () => {
    render(<SignupPage />)
    expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
  })
})
