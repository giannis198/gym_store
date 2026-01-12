import { prisma } from '../lib/prisma'
import { describe, it, expect } from 'vitest'

describe('Booking System Models', () => {
  it('should have a capacity field on ScheduleItem with default value', async () => {
    const program = await prisma.program.create({
      data: {
        title: 'Capacity Test Program',
        description: 'Testing capacity field',
        intensity: 'Medium',
      }
    })

    const coach = await prisma.coach.create({
      data: {
        name: 'Capacity Coach',
        role: 'Tester',
        bio: 'Testing capacity',
      }
    })

    const scheduleItem = await prisma.scheduleItem.create({
      data: {
        day: 'Mon',
        time: '10:00 AM',
        programId: program.id,
        coachId: coach.id,
      }
    })

    expect(scheduleItem.capacity).toBe(20)

    // Cleanup
    await prisma.scheduleItem.delete({ where: { id: scheduleItem.id } })
    await prisma.coach.delete({ where: { id: coach.id } })
    await prisma.program.delete({ where: { id: program.id } })
  })
})
