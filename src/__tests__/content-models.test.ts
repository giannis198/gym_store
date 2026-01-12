import { prisma } from '../lib/prisma'
import { describe, it, expect } from 'vitest'

describe('Content Models', () => {
  it('should be able to create and retrieve a program', async () => {
    const programData = {
      title: 'Power Boxing',
      description: 'High intensity boxing workout',
      intensity: 'High',
      icon: 'Zap',
      color: 'text-neon-volt',
    }

    const program = await prisma.program.create({
      data: programData,
    })

    expect(program.title).toBe(programData.title)
    
    // Cleanup
    await prisma.program.delete({ where: { id: program.id } })
  })

  it('should be able to create and retrieve a coach', async () => {
    const coachData = {
      name: 'John Doe',
      role: 'Head Coach',
      bio: 'Expert trainer with 20 years experience',
      image: 'https://example.com/john.jpg',
    }

    const coach = await prisma.coach.create({
      data: coachData,
    })

    expect(coach.name).toBe(coachData.name)
    
    // Cleanup
    await prisma.coach.delete({ where: { id: coach.id } })
  })

  it('should be able to create and retrieve a schedule item', async () => {
    const programData = {
      title: 'Technical Sparring',
      description: 'Focus on technique',
      intensity: 'Medium',
    }
    const program = await prisma.program.create({ data: programData })

    const coachData = {
      name: 'Jane Smith',
      role: 'Boxing Coach',
      bio: 'Technical expert',
    }
    const coach = await prisma.coach.create({ data: coachData })

    const scheduleData = {
      day: 'Mon',
      time: '06:00 PM',
      programId: program.id,
      coachId: coach.id,
    }

    const scheduleItem = await prisma.scheduleItem.create({
      data: scheduleData,
    })

    expect(scheduleItem.day).toBe('Mon')
    
    // Cleanup
    await prisma.scheduleItem.delete({ where: { id: scheduleItem.id } })
    await prisma.coach.delete({ where: { id: coach.id } })
    await prisma.program.delete({ where: { id: program.id } })
  })
})
