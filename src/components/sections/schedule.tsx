'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, Loader2 } from 'lucide-react'
import { useSession } from '@/lib/auth-client'
import { bookClass } from '@/lib/actions/booking'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface ScheduleItemData {
  id: string
  day: string
  time: string
  program: { title: string }
  coach: { name: string }
}

export function Schedule({ scheduleItems = [] }: { scheduleItems?: ScheduleItemData[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const [bookingId, setBookingId] = React.useState<string | null>(null)
  const router = useRouter()

  const scheduleData: Record<string, any[]> = scheduleItems.reduce((acc, item) => {
    const day = item.day
    if (!acc[day]) acc[day] = []
    acc[day].push({
      id: item.id,
      time: item.time,
      program: item.program.title,
      coach: item.coach.name
    })
    return acc
  }, {} as any)

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].filter(day => scheduleData[day])

  const handleBooking = async (itemId: string) => {
    if (!session) {
      toast.error("Please login to book a class")
      router.push('/login')
      return
    }

    setBookingId(itemId)
    try {
      // For this prototype, we book for "today" or rather we don't have a date selector yet.
      // So we just pass a Date object.
      await bookClass(itemId, new Date())
      toast.success("Class booked successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to book class")
    } finally {
      setBookingId(null)
    }
  }

  useGSAP(() => {
    gsap.from('.schedule-header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section 
      id="schedule"
      ref={sectionRef}
      className="py-32 bg-matte-black relative border-t border-white/5"
    >
      <div className="container mx-auto px-4">
        <div className="schedule-header text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-neon-volt font-black mb-4">Training Hours</h2>
          <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            THE <span className="text-white/10">GRIND</span>
          </h3>
        </div>

        <Tabs defaultValue="Mon" className="w-full max-w-4xl mx-auto">
          <TabsList className="w-full bg-slate-grey/20 border border-white/5 h-auto p-1 flex flex-wrap justify-center mb-12">
            {days.map((day) => (
              <TabsTrigger 
                key={day} 
                value={day}
                className="flex-1 min-w-[80px] py-4 data-[state=active]:bg-neon-volt data-[state=active]:text-matte-black font-black italic uppercase tracking-widest text-sm transition-all"
              >
                {day}
              </TabsTrigger>
            ))}
          </TabsList>

          {days.map((day) => (
            <TabsContent key={day} value={day} className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
              {scheduleData[day].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-slate-grey/10 border border-white/5 rounded-2xl hover:border-neon-volt/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-8 mb-4 md:mb-0">
                    <div className="flex items-center gap-3 text-neon-volt">
                      <Clock className="w-5 h-5" />
                      <span className="text-2xl font-black italic">{item.time}</span>
                    </div>
                    <div className="h-12 w-px bg-white/5 hidden md:block" />
                    <div>
                      <h4 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-white transition-colors">
                        {item.program}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-3 text-white/40">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">{item.coach}</span>
                    </div>

                    <Button 
                      onClick={() => handleBooking(item.id)}
                      disabled={bookingId === item.id}
                      className="bg-neon-volt text-matte-black hover:bg-white transition-colors font-bold uppercase italic tracking-widest px-8"
                    >
                      {bookingId === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Book"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
