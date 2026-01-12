'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getUserProfile() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
      bookings: {
        orderBy: { startTime: 'asc' },
        where: {
          startTime: {
            gte: new Date() // Only upcoming bookings by default? Or all? Let's get all for history.
          }
        }
      }
    }
  })

  return user
}

export async function cancelSubscription() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  // Find active subscription
  const sub = await prisma.subscription.findUnique({
    where: { userId: session.user.id }
  })

  if (!sub) throw new Error("No subscription found")

  await prisma.subscription.update({
    where: { id: sub.id },
    data: { status: 'CANCELLED', endDate: new Date() }
  })
  
  return { success: true }
}

export async function cancelBooking(bookingId: string) {
    const session = await auth.api.getSession({
      headers: await headers()
    })
  
    if (!session) {
      throw new Error("Unauthorized")
    }

    // Verify ownership
    const booking = await prisma.classBooking.findUnique({
        where: { id: bookingId }
    })

    if (!booking || booking.userId !== session.user.id) {
        throw new Error("Booking not found or unauthorized")
    }

    await prisma.classBooking.delete({
        where: { id: bookingId }
    })

    return { success: true }
}
