import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from '@/app/layout';

// Mock Toaster since we only check if it's rendered, not its internal logic
vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster">Toaster Mock</div>,
}));

vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter-mock' }),
}));

describe('RootLayout', () => {
  it('should render the Toaster component', () => {
    render(
      <RootLayout>
        <div>Child Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });
});
