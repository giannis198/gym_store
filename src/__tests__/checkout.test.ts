import { describe, it, expect, vi } from 'vitest'
import { prisma } from '../lib/prisma'
import { purchaseSubscription } from '../lib/actions/checkout'

// Mock auth to simulate a logged-in user
vi.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

describe('Checkout Action', () => {
  it('should create a subscription for the user', async () => {
    // Setup
    const user = await prisma.user.create({
      data: {
        email: `checkout-test-${Date.now()}@example.com`,
        name: 'Checkout Tester',
      }
    })

    // Mock session
    const { auth } = await import('@/lib/auth')
    // @ts-ignore
    auth.api.getSession.mockResolvedValue({
      user: { id: user.id, email: user.email, role: 'user' }
    })

    // Action
    const result = await purchaseSubscription('Pro')

    // Assert
    expect(result.success).toBe(true)
    
    const sub = await prisma.subscription.findUnique({
      where: { userId: user.id }
    })
    expect(sub).toBeDefined()
    expect(sub?.tier).toBe('Pro')
    expect(sub?.status).toBe('ACTIVE')

    // Cleanup
    await prisma.subscription.delete({ where: { id: sub!.id } })
    await prisma.user.delete({ where: { id: user.id } })
  })
})
