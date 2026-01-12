import { describe, it, expect, vi } from 'vitest'
import { prisma } from '../lib/prisma'
import { createProgram, updateProgram, deleteProgram, getPrograms } from '../lib/actions/content'
import { createCoach, updateCoach, deleteCoach, getCoaches } from '../lib/actions/content'
import { createScheduleItem, deleteScheduleItem, getScheduleItems } from '../lib/actions/content'

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Content Actions', () => {
  it('should perform CRUD on programs', async () => {
    const data = {
      title: 'Action Test Program',
      description: 'Testing server actions',
      intensity: 'Low',
    }

    const program = await createProgram(data)
    expect(program.title).toBe(data.title)

    const updated = await updateProgram(program.id, { title: 'Updated Title' })
    expect(updated.title).toBe('Updated Title')

    const all = await getPrograms()
    expect(all.some((p: any) => p.id === program.id)).toBe(true)

    await deleteProgram(program.id)
    const allAfter = await getPrograms()
    expect(allAfter.some((p: any) => p.id === program.id)).toBe(false)
  })

  it('should perform CRUD on coaches', async () => {
    const data = {
      name: 'Action Test Coach',
      role: 'Action Specialist',
      bio: 'Expert in testing',
    }

    const coach = await createCoach(data)
    expect(coach.name).toBe(data.name)

    const updated = await updateCoach(coach.id, { name: 'New Name' })
    expect(updated.name).toBe('New Name')

    const all = await getCoaches()
    expect(all.some((c: any) => c.id === coach.id)).toBe(true)

    await deleteCoach(coach.id)
    const allAfter = await getCoaches()
    expect(allAfter.some((c: any) => c.id === coach.id)).toBe(false)
  })

  it('should perform CRUD on schedule items', async () => {
    const program = await createProgram({ title: 'Shed Test', description: '...', intensity: '...' })
    const coach = await createCoach({ name: 'Shed Coach', role: '...', bio: '...' })

    const data = {
      day: 'Mon',
      time: '10:00 AM',
      programId: program.id,
      coachId: coach.id,
    }

    const item = await createScheduleItem(data)
    expect(item.day).toBe('Mon')

    const all = await getScheduleItems()
    expect(all.some((i: any) => i.id === item.id)).toBe(true)

    await deleteScheduleItem(item.id)
    const allAfter = await getScheduleItems()
    expect(allAfter.some((i: any) => i.id === item.id)).toBe(false)

    // Cleanup
    await deleteProgram(program.id)
    await deleteCoach(coach.id)
  })
})
