import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from '@/app/(auth)/login/page';
import SignupPage from '@/app/(auth)/signup/page';
import { signIn, signUp } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';

// Mock auth client
vi.mock('@/lib/auth-client', () => ({
  signIn: {
    email: vi.fn(),
  },
  signUp: {
    email: vi.fn(),
  },
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => {
  const success = vi.fn();
  const error = vi.fn();
  return {
    default: { success, error },
    toast: { success, error },
  };
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

describe('Auth Toast Notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('LoginPage', () => {
    it('should show success toast on successful login', async () => {
      // Setup successful login mock
      (signIn.email as any).mockImplementation(async (args: any) => {
         args.fetchOptions.onSuccess();
         return { data: {}, error: null };
      });

      render(<LoginPage />);

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
      fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Welcome back!');
      });
    });

    it('should show error toast on failed login', async () => {
        // Setup failed login mock
        (signIn.email as any).mockImplementation(async (args: any) => {
            args.fetchOptions.onError({ error: { message: 'Invalid credentials' } });
            return { data: null, error: { message: 'Invalid credentials' } };
        });
  
        render(<LoginPage />);
  
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        fireEvent.submit(screen.getByRole('button', { name: /sign in/i }));
  
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
        });
    });
  });

  describe('SignupPage', () => {
    it('should show success toast on successful signup', async () => {
        // Setup successful signup mock
        (signUp.email as any).mockImplementation(async (args: any) => {
          args.fetchOptions.onSuccess();
          return { data: {}, error: null };
        });
  
        render(<SignupPage />);
  
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));
  
        await waitFor(() => {
          expect(toast.success).toHaveBeenCalledWith('Account created successfully!');
        });
      });

      it('should show error toast on failed signup', async () => {
        // Setup failed signup mock
        (signUp.email as any).mockImplementation(async (args: any) => {
            args.fetchOptions.onError({ error: { message: 'Email already exists' } });
            return { data: null, error: { message: 'Email already exists' } };
        });
  
        render(<SignupPage />);
  
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));
  
        await waitFor(() => {
          expect(toast.error).toHaveBeenCalledWith('Email already exists');
        });
    });
  });
});
