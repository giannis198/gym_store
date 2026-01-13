import * as React from "react"
import { getPrograms, getCoaches, getScheduleItems, getPricing } from "@/lib/actions/content"
import { getAdminMetrics, getSubscriptions } from "@/lib/actions/admin"
import { ManagePrograms } from "@/components/admin/manage-programs"
import { ManageCoaches } from "@/components/admin/manage-coaches"
import { ManageSchedule } from "@/components/admin/manage-schedule"
import { ManagePricing } from "@/components/admin/manage-pricing"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { ManageSubscriptions } from "@/components/admin/manage-subscriptions"
import { ManageMembers } from "@/components/admin/manage-members"
import { Loader2 } from "lucide-react"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const activeTab = (await searchParams).tab || "dashboard"
  const head = await headers()

  // Fetch all necessary data in parallel as Server Components
  const [programs, coaches, scheduleItems, pricing, metrics, subscriptions] = await Promise.all([
    getPrograms(),
    getCoaches(),
    getScheduleItems(),
    getPricing(),
    getAdminMetrics(),
    getSubscriptions()
  ])

  // Aggregate data for passing to client components
  const data = { programs, coaches, scheduleItems, pricing, metrics, subscriptions }

  // Check if current user is admin
  // This check should ideally be done in middleware or server side.
  // For now, we'll assume auth.api.getSession is safe and check role here.
  const session = await auth.api.getSession({
    headers: head
  });

  // @ts-ignore
  if (!session || session.user.role !== "admin") {
    // Or redirect to login/unauthorized page
    notFound(); 
  }


  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard metrics={data.metrics} />
      case "programs":
        return <ManagePrograms initialPrograms={data.programs} />
      case "coaches":
        return <ManageCoaches initialCoaches={data.coaches} />
      case "schedule":
        return <ManageSchedule 
          initialItems={data.scheduleItems} 
          programs={data.programs}
          coaches={data.coaches}
        />
      case "pricing":
        return <ManagePricing initialPricing={data.pricing} />
      case "subscriptions":
        return <ManageSubscriptions initialSubscriptions={data.subscriptions} />
      case "members":
        return <ManageMembers />
      default:
        return <AdminDashboard metrics={data.metrics} />
    }
  }

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Overview"
      case "programs": return "Programs"
      case "coaches": return "Coaches"
      case "schedule": return "Schedule"
      case "pricing": return "Pricing"
      case "subscriptions": return "Subscriptions"
      case "members": return "Members"
      default: return "Dashboard"
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
          Manage <span className="text-neon-volt">{getTitle()}</span>
        </h1>
        <p className="text-white/50 max-w-2xl text-lg">
          Configure your club's {getTitle().toLowerCase()} settings and details.
        </p>
      </div>

      <div className="pt-4 border-t border-white/5">
        {renderContent()}
      </div>
    </div>
  )
}
