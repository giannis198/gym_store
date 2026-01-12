'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

const PRICES: Record<string, number> = {
  "Basic": 49,
  "Pro": 89,
  "Elite": 149
}

export async function purchaseSubscription(tier: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("Unauthorized")
  }

  const price = PRICES[tier]
  if (!price) {
    throw new Error("Invalid tier")
  }

  // Mock Payment Processing...
  // await stripe.charges.create(...)

  // Update Database
  // Using upsert to handle upgrades/downgrades
  await prisma.subscription.upsert({
    where: { userId: session.user.id },
    update: {
      tier,
      price,
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: null, // Auto-renewing
    },
    create: {
      userId: session.user.id,
      tier,
      price,
      status: 'ACTIVE',
      startDate: new Date(),
    }
  })

  revalidatePath('/profile')
  return { success: true }
}
