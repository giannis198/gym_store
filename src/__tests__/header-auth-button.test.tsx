import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from '@/components/layout/header' // Adjust path if needed

// Mock the auth client's useSession hook
vi.mock('@/lib/auth-client', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSession: vi.fn(), // Mock useSession
  };
});

// Mock Next.js router for Link component
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/', // Mock usePathname for Link active state
}));

// Import the mocked useSession
import { useSession } from '@/lib/auth-client';

describe('Header Component - Authentication Button', () => {
  it('should render a "Login" button when not authenticated', () => {
    // Mock useSession to return no session (logged out)
    (useSession as vi.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn(),
    });

    render(<Header />);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Logout/i })).not.toBeInTheDocument();
  });

  it('should render a "Logout" button when authenticated', () => {
    // Mock useSession to return a session (logged in)
    (useSession as vi.Mock).mockReturnValue({
      data: { user: { email: 'test@example.com' } }, // Simulate a logged-in user
      status: 'authenticated',
      update: vi.fn(),
    });

    render(<Header />);
    expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Login/i })).not.toBeInTheDocument();
  });
});
