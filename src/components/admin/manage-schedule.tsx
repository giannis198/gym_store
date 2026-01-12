'use client'

import { useState } from 'react'
import { createScheduleItem, deleteScheduleItem } from '@/lib/actions/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function ManageSchedule({ 
  initialItems, 
  programs, 
  coaches 
}: { 
  initialItems: any[],
  programs: any[],
  coaches: any[]
}) {
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      day: formData.get('day') as string,
      time: formData.get('time') as string,
      programId: formData.get('programId') as string,
      coachId: formData.get('coachId') as string,
    }

    try {
      const newItem = await createScheduleItem(data)
      // We need to fetch the full item with relations for display, 
      // or just re-fetch all items. For simplicity here, we'll re-fetch or find the names.
      const program = programs.find(p => p.id === data.programId)
      const coach = coaches.find(c => c.id === data.coachId)
      
      const itemWithRelations = {
        ...newItem,
        program,
        coach
      }

      setItems([...items, itemWithRelations])
      toast.success('Schedule item added')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error('Failed to add schedule item')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return
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
      <form onSubmit={handleAdd} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Day</Label>
            <select name="day" required className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus-visible:outline-none">
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
              <option value="Sun">Sunday</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input name="time" required placeholder="e.g. 06:00 PM" className="bg-matte-black border-white/10" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Program</Label>
            <select name="programId" required className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus-visible:outline-none">
              <option value="">Select Program</option>
              {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Coach</Label>
            <select name="coachId" required className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus-visible:outline-none">
              <option value="">Select Coach</option>
              {coaches.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
          <Plus className="w-4 h-4 mr-2" /> Add Schedule Item
        </Button>
      </form>

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
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => handleDelete(item.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
