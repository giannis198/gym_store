import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PremiumButton } from '@/components/ui/premium-button'
import { PremiumCard } from '@/components/ui/premium-card'

describe('Premium Elements', () => {
  it('PremiumButton renders correctly with neon-volt background', () => {
    render(<PremiumButton>Punch</PremiumButton>)
    const button = screen.getByRole('button', { name: /punch/i })
    expect(button).toHaveClass('bg-neon-volt')
    expect(button).toHaveClass('text-matte-black')
  })

  it('PremiumCard renders children and has correct base classes', () => {
    render(<PremiumCard>Boxer Info</PremiumCard>)
    const card = screen.getByText('Boxer Info')
    expect(card).toHaveClass('bg-slate-grey/50')
    expect(card).toHaveClass('border-white/10')
  })
})
