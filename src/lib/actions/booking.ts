'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function bookClass(scheduleItemId: string, date: Date) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  // Check subscription
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true }
  })

  if (!user?.subscription || user.subscription.status !== 'ACTIVE') {
    throw new Error("Active subscription required")
  }

  // Get schedule item
  const item = await prisma.scheduleItem.findUnique({
    where: { id: scheduleItemId },
    include: { program: true }
  })

  if (!item) {
    throw new Error("Class not found")
  }

  // Capacity check
  const existingBookings = await prisma.classBooking.count({
    where: {
      classId: scheduleItemId,
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999))
      }
    }
  })

  if (existingBookings >= item.capacity) {
    throw new Error("Class is full")
  }

  // Create booking
  // For simplicity, we use the date provided. 
  // In a production app, we would parse item.time and set it on the date.
  const booking = await prisma.classBooking.create({
    data: {
      userId: session.user.id,
      classId: scheduleItemId,
      className: item.program.title,
      startTime: date,
      endTime: new Date(date.getTime() + 3600000), // 1 hour duration
    }
  })

  revalidatePath('/profile')
  revalidatePath('/')
  return { success: true, bookingId: booking.id }
}
