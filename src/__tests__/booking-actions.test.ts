import { describe, it, expect, vi } from 'vitest'
import { prisma } from '../lib/prisma'
import { bookClass } from '../lib/actions/booking'

// Mock auth
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

describe('Booking Actions', () => {
  it('should fail if user has no subscription', async () => {
    const user = await prisma.user.create({
      data: { email: `no-sub-${Date.now()}@example.com`, name: 'No Sub' }
    })

    const { auth } = await import('@/lib/auth')
    // @ts-ignore
    auth.api.getSession.mockResolvedValue({ user: { id: user.id } })

    // @ts-ignore
    await expect(bookClass('some-id', new Date())).rejects.toThrow('Active subscription required')

    await prisma.user.delete({ where: { id: user.id } })
  })

  it('should book successfully if user has subscription', async () => {
    // Setup
    const user = await prisma.user.create({
      data: { 
        email: `with-sub-${Date.now()}@example.com`, 
        name: 'With Sub',
        subscription: {
            create: { tier: 'Pro', price: 89, status: 'ACTIVE' }
        }
      }
    })

    const program = await prisma.program.create({
        data: { title: 'Test Program', description: '...', intensity: '...' }
    })
    const coach = await prisma.coach.create({
        data: { name: 'Test Coach', role: '...', bio: '...' }
    })
    const item = await prisma.scheduleItem.create({
        data: { day: 'Mon', time: '10:00 AM', programId: program.id, coachId: coach.id }
    })

    const { auth } = await import('@/lib/auth')
    // @ts-ignore
    auth.api.getSession.mockResolvedValue({ user: { id: user.id } })

    // Action
    const bookingDate = new Date()
    // @ts-ignore
    const result = await bookClass(item.id, bookingDate)

    // Assert
    expect(result.success).toBe(true)
    const bookings = await prisma.classBooking.findMany({ where: { userId: user.id } })
    expect(bookings.length).toBe(1)
    expect(bookings[0].className).toBe('Test Program')

    // Cleanup
    await prisma.classBooking.delete({ where: { id: bookings[0].id } })
    await prisma.scheduleItem.delete({ where: { id: item.id } })
    await prisma.coach.delete({ where: { id: coach.id } })
    await prisma.program.delete({ where: { id: program.id } })
    await prisma.subscription.delete({ where: { userId: user.id } })
    await prisma.user.delete({ where: { id: user.id } })
  })

  it('should fail if class is full', async () => {
    // Setup
    const user = await prisma.user.create({
      data: { 
        email: `full-test-${Date.now()}@example.com`, 
        name: 'Full Test',
        subscription: {
            create: { tier: 'Elite', price: 149, status: 'ACTIVE' }
        }
      }
    })

    const program = await prisma.program.create({
        data: { title: 'Full Program', description: '...', intensity: '...' }
    })
    const coach = await prisma.coach.create({
        data: { name: 'Full Coach', role: '...', bio: '...' }
    })
    const item = await prisma.scheduleItem.create({
        data: { day: 'Tue', time: '11:00 AM', programId: program.id, coachId: coach.id, capacity: 1 }
    })

    const { auth } = await import('@/lib/auth')
    // @ts-ignore
    auth.api.getSession.mockResolvedValue({ user: { id: user.id } })

    const bookingDate = new Date()
    bookingDate.setHours(11, 0, 0, 0)

    // Book the first spot
    await bookClass(item.id, bookingDate)

    // Try to book again (should fail because capacity is 1)
    await expect(bookClass(item.id, bookingDate)).rejects.toThrow('Class is full')

    // Cleanup
    await prisma.classBooking.deleteMany({ where: { classId: item.id } })
    await prisma.scheduleItem.delete({ where: { id: item.id } })
    await prisma.coach.delete({ where: { id: coach.id } })
    await prisma.program.delete({ where: { id: program.id } })
    await prisma.subscription.delete({ where: { userId: user.id } })
    await prisma.user.delete({ where: { id: user.id } })
  })
})
