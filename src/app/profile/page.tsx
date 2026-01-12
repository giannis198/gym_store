import { redirect } from "next/navigation"
import { getUserProfile, cancelBooking, cancelSubscription } from "@/lib/actions/user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CreditCard, Clock, AlertCircle } from "lucide-react"

export default async function ProfilePage() {
  const user = await getUserProfile()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-matte-black pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
           <div className="h-24 w-24 rounded-full bg-slate-grey/20 border-2 border-neon-volt/50 flex items-center justify-center overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt={user.name || "User"} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-white/20">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </span>
                )}
           </div>
           <div>
             <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
               {user.name}
             </h1>
             <p className="text-white/50">{user.email}</p>
             <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-neon-volt">
                {user.subscription ? user.subscription.tier : "Free Member"}
             </div>
           </div>
        </div>

        <Tabs defaultValue="classes" className="space-y-8">
          <TabsList className="bg-slate-grey/10 border border-white/5 p-1 h-auto">
            <TabsTrigger value="classes" className="px-6 py-3 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-bold uppercase italic tracking-wider">
              My Classes
            </TabsTrigger>
            <TabsTrigger value="subscription" className="px-6 py-3 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-bold uppercase italic tracking-wider">
              Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-6">Upcoming Sessions</h2>
            
            {user.bookings.length === 0 ? (
                <div className="text-center py-20 bg-slate-grey/5 rounded-2xl border border-white/5">
                    <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No classes booked</h3>
                    <p className="text-white/50 mb-6">You haven't booked any training sessions yet.</p>
                    <Button asChild className="bg-neon-volt text-matte-black hover:bg-neon-volt/80 font-bold uppercase tracking-widest">
                        <a href="/#schedule">View Schedule</a>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {user.bookings.map((booking) => (
                        <Card key={booking.id} className="bg-slate-grey/10 border-white/5 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xl font-bold italic uppercase">{booking.className}</CardTitle>
                                {/* We would ideally make this a client component to handle handleCancel properly with useTransition */}
                                <form action={async () => {
                                    'use server'
                                    await cancelBooking(booking.id)
                                    // revalidate? The action should handle it, but we need revalidatePath there.
                                    // ideally create a separate client component for the button.
                                }}>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                        Cancel
                                    </Button>
                                </form>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-6 text-sm text-white/60">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(booking.startTime).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
             <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-6">Membership Details</h2>
             
             {user.subscription ? (
                 <Card className="bg-slate-grey/10 border-white/5 text-white">
                     <CardHeader>
                         <div className="flex justify-between items-start">
                             <div>
                                 <CardTitle className="text-3xl font-black italic uppercase text-neon-volt mb-2">{user.subscription.tier} Plan</CardTitle>
                                 <CardDescription className="text-white/50">
                                     {user.subscription.status === 'ACTIVE' ? 'Active Subscription' : 'Inactive'}
                                 </CardDescription>
                             </div>
                             <div className="text-right">
                                 <div className="text-2xl font-bold">${user.subscription.price}<span className="text-sm font-normal text-white/50">/mo</span></div>
                             </div>
                         </div>
                     </CardHeader>
                     <CardContent className="space-y-6">
                         <div className="grid gap-4 md:grid-cols-2">
                             <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                 <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Start Date</div>
                                 <div className="font-bold">{new Date(user.subscription.startDate).toLocaleDateString()}</div>
                             </div>
                             <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                 <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Status</div>
                                 <div className={`font-bold uppercase ${user.subscription.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>
                                     {user.subscription.status}
                                 </div>
                             </div>
                         </div>

                         {user.subscription.status === 'ACTIVE' && (
                             <div className="pt-4 border-t border-white/10">
                                  {/* Again, ideally a client component */}
                                 <form action={async () => {
                                     'use server'
                                     await cancelSubscription()
                                 }}>
                                    <Button variant="destructive" className="w-full sm:w-auto font-bold uppercase tracking-widest">
                                        Cancel Subscription
                                    </Button>
                                 </form>
                                 <p className="text-xs text-white/30 mt-4">
                                     <AlertCircle className="w-3 h-3 inline mr-1" />
                                     Canceling will forfeit your remaining days.
                                 </p>
                             </div>
                         )}
                     </CardContent>
                 </Card>
             ) : (
                 <div className="text-center py-20 bg-slate-grey/5 rounded-2xl border border-white/5">
                    <CreditCard className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Active Subscription</h3>
                    <p className="text-white/50 mb-6">Upgrade your game with one of our premium plans.</p>
                    <Button asChild className="bg-neon-volt text-matte-black hover:bg-neon-volt/80 font-bold uppercase tracking-widest">
                        <a href="/#pricing">View Plans</a>
                    </Button>
                </div>
             )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
