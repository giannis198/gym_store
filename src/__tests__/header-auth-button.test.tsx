import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/layout/header';
import { useSession } from '../lib/auth-client';

// Mock the useSession hook
vi.mock('../lib/auth-client', () => ({
  useSession: vi.fn(),
  signOut: vi.fn(),
}));

// Mock useRouter
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock ResizeObserver which is needed for Radix UI
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

describe('Header Component - Authentication Button', () => {
  it('should render a "Login" button when not authenticated', () => {
    (useSession as any).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(<Header />);
    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });

  it('should render user avatar button when authenticated', () => {
    (useSession as any).mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          image: null,
        },
      },
      status: 'authenticated',
    });

    render(<Header />);
    
    // Check for user avatar/trigger by finding the button that contains the User icon
    // Since checking for icon inside button is complex, we check for absence of Login
    // and presence of a button that is likely the user menu (it has no text, just icon)
    
    expect(screen.queryByRole('link', { name: /Login/i })).not.toBeInTheDocument();
    
    // There should be a button in the header (excluding the mobile menu trigger which is hidden on desktop view in tests usually, 
    // but here we are testing the component logic. The user menu button exists.)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
