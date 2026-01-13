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

// Pricing Actions
import { PricingData } from '@/lib/types'

const hardcodedTiers: PricingData = {
  tiers: [
    {
      name: "Basic",
      price: "49",
      features: ["2 Classes Per Week", "Locker Room Access", "Basic Equipment Hire", "Community Events"],
      recommended: false
    },
    {
      name: "Pro",
      price: "89",
      features: ["Unlimited Classes", "Open Gym Access", "1 Personal Training / Mo", "Nutrition Workshop"],
      recommended: true
    },
    {
      name: "Elite",
      price: "149",
      features: ["Unlimited Everything", "Private Recovery Suite", "4 Personal Training / Mo", "Custom Fight Gear Kit"],
      recommended: false
    }
  ]
}

export async function getPricing() {
  // For now, return hardcoded tiers.
  // In a real application, this would fetch from a database or CMS.
  return hardcodedTiers
}

export async function updatePricing(updatedPricing: PricingData) {
  // For now, this will "update" the hardcoded tiers.
  // In a real application, this would update the database or CMS.
  Object.assign(hardcodedTiers, updatedPricing)

  revalidatePath('/admin')
  revalidatePath('/')

  return { success: true }
}
