import { getPrograms, getCoaches, getScheduleItems } from "@/lib/actions/content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ManagePrograms } from "@/components/admin/manage-programs"
import { ManageCoaches } from "@/components/admin/manage-coaches"
import { ManageSchedule } from "@/components/admin/manage-schedule"

export default async function AdminPage() {
  const [programs, coaches, scheduleItems] = await Promise.all([
    getPrograms(),
    getCoaches(),
    getScheduleItems()
  ])

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
          Admin <span className="text-neon-volt">Dashboard</span>
        </h1>
        <p className="text-white/50 max-w-2xl">
          Manage your club's content, schedules, and staff from one central hub.
        </p>
      </div>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="bg-slate-grey/10 border border-white/5 p-1 h-auto mb-8">
          <TabsTrigger value="programs" className="px-8 py-3 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-bold uppercase italic tracking-wider">
            Manage Programs
          </TabsTrigger>
          <TabsTrigger value="coaches" className="px-8 py-3 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-bold uppercase italic tracking-wider">
            Manage Coaches
          </TabsTrigger>
          <TabsTrigger value="schedule" className="px-8 py-3 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-bold uppercase italic tracking-wider">
            Manage Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="programs">
          <ManagePrograms initialPrograms={programs} />
        </TabsContent>
        
        <TabsContent value="coaches">
          <ManageCoaches initialCoaches={coaches} />
        </TabsContent>

        <TabsContent value="schedule">
          <ManageSchedule 
            initialItems={scheduleItems} 
            programs={programs}
            coaches={coaches}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
