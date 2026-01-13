'use server'

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import bcrypt from "bcrypt"

export async function getAdminMetrics() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [
    activeSubscriptions,
    recentSubscriptions24h,
    recentSubscriptions7d,
    recentSubscriptions30d
  ] = await Promise.all([
    prisma.subscription.count({
      where: { status: 'ACTIVE' }
    }),
    prisma.subscription.findMany({
      where: {
        createdAt: { gte: oneDayAgo },
        status: 'ACTIVE'
      },
      select: { price: true, createdAt: true }
    }),
    prisma.subscription.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        status: 'ACTIVE'
      },
      select: { price: true, createdAt: true }
    }),
    prisma.subscription.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        status: 'ACTIVE'
      },
      select: { price: true, createdAt: true }
    })
  ])

  const revenue24h = recentSubscriptions24h.reduce((acc, sub) => acc + sub.price, 0)
  const revenue7d = recentSubscriptions7d.reduce((acc, sub) => acc + sub.price, 0)
  const revenue30d = recentSubscriptions30d.reduce((acc, sub) => acc + sub.price, 0)

  // Get revenue by hour for the last 24 hours
  const revenue24hChart = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000)
    hour.setMinutes(0, 0, 0)
    const nextHour = new Date(hour.getTime() + 60 * 60 * 1000)

    const hourRevenue = recentSubscriptions24h
      .filter((sub: any) => {
        const subDate = new Date(sub.createdAt)
        return subDate >= hour && subDate < nextHour
      })
      .reduce((acc, sub) => acc + sub.price, 0)

    revenue24hChart.push({
      label: hour.toLocaleTimeString('en-US', { hour: 'numeric' }),
      revenue: hourRevenue
    })
  }

  // Get revenue by day for the last 7 days
  const revenue7dChart = []
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    day.setHours(0, 0, 0, 0)
    const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000)

    const dayRevenue = recentSubscriptions7d
      .filter((sub: any) => {
        const subDate = new Date(sub.createdAt)
        return subDate >= day && subDate < nextDay
      })
      .reduce((acc, sub) => acc + sub.price, 0)

    revenue7dChart.push({
      label: day.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: dayRevenue
    })
  }

  // Get revenue by day for the last 30 days
  const revenue30dChart = []
  for (let i = 29; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    day.setHours(0, 0, 0, 0)
    const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000)

    const dayRevenue = recentSubscriptions30d
      .filter((sub: any) => {
        const subDate = new Date(sub.createdAt)
        return subDate >= day && subDate < nextDay
      })
      .reduce((acc, sub) => acc + sub.price, 0)

    revenue30dChart.push({
      label: day.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      revenue: dayRevenue
    })
  }

  // Get subscription distribution
  const allSubscriptions = await prisma.subscription.findMany({
    where: { status: 'ACTIVE' },
    select: { tier: true }
  })

  const distribution = allSubscriptions.reduce((acc: Record<string, number>, sub) => {
    acc[sub.tier] = (acc[sub.tier] || 0) + 1
    return acc
  }, {})

  const subscriptionDistribution = Object.entries(distribution).map(([name, value]) => ({
    name,
    value
  }))

  return {
    activeSubscriptions,
    revenue24h,
    revenue7d,
    revenue30d,
    revenue24hChart,
    revenue7dChart,
    revenue30dChart,
    subscriptionDistribution
  }
}

export async function getSubscriptions() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  return await prisma.subscription.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function createMember(data: {
  name: string
  email: string
  password?: string
  role?: string
  tier?: string
  price?: number
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  const { name, email, password, role = 'user', tier, price } = data

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      ...(tier && price && {
        subscription: {
          create: {
            tier,
            price,
            status: 'ACTIVE',
            startDate: new Date()
          }
        }
      })
    }
  })

  revalidatePath('/admin')
  return newUser
}

export async function updateMember(userId: string, data: {
  name: string
  email: string
  role: string
}) {
  'use server'

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      email: data.email,
      role: data.role
    }
  })

  revalidatePath('/admin')
  return updatedUser
}

export async function resetUserPassword(userId: string, newPassword: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  if (!newPassword || newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long.")
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  })

  revalidatePath('/admin')
  return { success: true }
}

export async function updateMemberSubscription(userId: string, tier: string, price: number, status: 'ACTIVE' | 'CANCELLED') {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || (session.user as any).role !== 'admin') {
    throw new Error("Unauthorized")
  }

  const existingSub = await prisma.subscription.findUnique({
    where: { userId }
  })

  if (existingSub) {
    await prisma.subscription.update({
      where: { userId },
      data: { tier, price, status, endDate: status === 'CANCELLED' ? new Date() : null }
    })
  } else {
    await prisma.subscription.create({
      data: { userId, tier, price, status, startDate: new Date() }
    })
  }

  revalidatePath('/admin')
  return { success: true }
}