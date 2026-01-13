'use client'

import React from 'react'
import { createScheduleItem, deleteScheduleItem } from '@/lib/actions/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const scheduleItemSchema = z.object({
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], {
    message: "Please select a day.",
  }),
  time: z.string().min(1, 'Time is required').regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, "Invalid time format (e.g. 06:00 PM)"),
  programId: z.string().min(1, 'Program is required'),
  coachId: z.string().min(1, 'Coach is required'),
})

type ScheduleItemFormData = z.infer<typeof scheduleItemSchema>

export function ManageSchedule({ 
  initialItems, 
  programs, 
  coaches 
}: { 
  initialItems: any[],
  programs: any[],
  coaches: any[]
}) {
  const [items, setItems] = React.useState(initialItems)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<ScheduleItemFormData>({
    resolver: zodResolver(scheduleItemSchema),
    defaultValues: {
      day: 'Mon',
      time: '',
      programId: undefined,
      coachId: undefined,
    },
  })

  async function onSubmit(data: ScheduleItemFormData) {
    setLoading(true)
    try {
      const newItem = await createScheduleItem(data)
      const program = programs.find(p => p.id === data.programId)
      const coach = coaches.find(c => c.id === data.coachId)
      
      const itemWithRelations = {
        ...newItem,
        program,
        coach
      }

      setItems([...items, itemWithRelations])
      toast.success('Schedule item added')
      form.reset({
        day: 'Mon',
        time: '',
        programId: undefined,
        coachId: undefined,
      }) // Reset form fields after successful submission
    } catch (error) {
      toast.error('Failed to add schedule item')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteScheduleItem(id)
      setItems(items.filter(i => i.id !== id))
      toast.success('Schedule item deleted')
    } catch (error) {
      toast.error('Failed to delete schedule item')
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus:ring-offset-0">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-matte-black border-white/10 text-white">
                      <SelectItem value="Mon">Monday</SelectItem>
                      <SelectItem value="Tue">Tuesday</SelectItem>
                      <SelectItem value="Wed">Wednesday</SelectItem>
                      <SelectItem value="Thu">Thursday</SelectItem>
                      <SelectItem value="Fri">Friday</SelectItem>
                      <SelectItem value="Sat">Saturday</SelectItem>
                      <SelectItem value="Sun">Sunday</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 06:00 PM" className="bg-matte-black border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus:ring-offset-0">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-matte-black border-white/10 text-white">
                      {programs.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coachId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coach</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus:ring-offset-0">
                        <SelectValue placeholder="Select a coach" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-matte-black border-white/10 text-white">
                      {coaches.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
            <Plus className="w-4 h-4 mr-2" /> Add Schedule Item
          </Button>
        </form>
      </Form>

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-slate-grey/5 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
            <div className="flex gap-6 items-center">
              <div className="bg-neon-volt/10 text-neon-volt px-3 py-1 rounded font-bold text-xs uppercase italic">
                {item.day} {item.time}
              </div>
              <div>
                <h4 className="font-bold text-lg italic uppercase">{item.program?.title}</h4>
                <p className="text-sm text-white/40">{item.coach?.name}</p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="text-white hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-matte-black border-white/10 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/50">
                    This action cannot be undone. This will permanently delete the schedule item for {item.program?.title} on {item.day} at {item.time}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  )
}
