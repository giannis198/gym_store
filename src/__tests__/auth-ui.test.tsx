import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from '../app/(auth)/login/page'
import SignupPage from '../app/(auth)/signup/page'

// Mock the auth client
vi.mock('@/lib/auth-client', () => ({
  signIn: {
    email: vi.fn(),
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

describe('Authentication UI', () => {
  describe('Login Page', () => {
    it('should render login form elements', () => {
      render(<LoginPage />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in|login/i })).toBeInTheDocument()
    })
  })

  describe('Signup Page', () => {
    it('should render signup form elements', () => {
      render(<SignupPage />)
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up|create account/i })).toBeInTheDocument()
    })
  })
})
