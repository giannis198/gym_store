'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Program Actions
export async function getPrograms() {
  return await prisma.program.findMany({
    orderBy: { title: 'asc' }
  })
}

export async function createProgram(data: {
  title: string
  description: string
  intensity: string
  icon?: string
  color?: string
}) {
  const program = await prisma.program.create({ data })
  revalidatePath('/')
  return program
}

export async function updateProgram(id: string, data: Partial<{
  title: string
  description: string
  intensity: string
  icon?: string
  color?: string
}>) {
  const program = await prisma.program.update({
    where: { id },
    data
  })
  revalidatePath('/')
  return program
}

export async function deleteProgram(id: string) {
  await prisma.program.delete({ where: { id } })
  revalidatePath('/')
}

// Coach Actions
export async function getCoaches() {
  return await prisma.coach.findMany({
    orderBy: { name: 'asc' }
  })
}

export async function createCoach(data: {
  name: string
  role: string
  bio: string
  image?: string
}) {
  const coach = await prisma.coach.create({ data })
  revalidatePath('/')
  return coach
}

export async function updateCoach(id: string, data: Partial<{
  name: string
  role: string
  bio: string
  image?: string
}>) {
  const coach = await prisma.coach.update({
    where: { id },
    data
  })
  revalidatePath('/')
  return coach
}

export async function deleteCoach(id: string) {
  await prisma.coach.delete({ where: { id } })
  revalidatePath('/')
}

// Schedule Actions
export async function getScheduleItems() {
  return await prisma.scheduleItem.findMany({
    include: {
      program: true,
      coach: true
    },
    orderBy: [
      { day: 'asc' },
      { time: 'asc' }
    ]
  })
}

export async function createScheduleItem(data: {
  day: string
  time: string
  programId: string
  coachId: string
}) {
  const item = await prisma.scheduleItem.create({ data })
  revalidatePath('/')
  return item
}

export async function deleteScheduleItem(id: string) {
  await prisma.scheduleItem.delete({ where: { id } })
  revalidatePath('/')
}
