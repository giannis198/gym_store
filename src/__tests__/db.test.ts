import { prisma } from '../lib/prisma'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Database Connection', () => {
  it('should be able to query the database', async () => {
    // This should work if the database is connected
    const users = await prisma.user.findMany()
    expect(Array.isArray(users)).toBe(true)
  })

  it('should be able to create a test user', async () => {
    const testEmail = `test-${Date.now()}@example.com`
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Test User',
      },
    })
    expect(user.email).toBe(testEmail)
    
    // Cleanup
    await prisma.user.delete({
      where: { id: user.id },
    })
  })

  it('should be able to create a class booking', async () => {
    const testEmail = `booking-${Date.now()}@example.com`
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Booking Tester',
      },
    })

    const booking = await prisma.classBooking.create({
      data: {
        userId: user.id,
        classId: 'test-class-123',
        className: 'Boxing Basics',
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600000), // 1 hour later
      },
    })

    expect(booking.id).toBeDefined()
    expect(booking.userId).toBe(user.id)
    expect(booking.className).toBe('Boxing Basics')

    // Cleanup
    await prisma.classBooking.delete({ where: { id: booking.id } })
    await prisma.user.delete({ where: { id: user.id } })
  })
})
