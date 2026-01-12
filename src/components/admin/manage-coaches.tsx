'use client'

import { useState } from 'react'
import { createCoach, deleteCoach } from '@/lib/actions/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function ManageCoaches({ initialCoaches }: { initialCoaches: any[] }) {
  const [coaches, setCoaches] = useState(initialCoaches)
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      bio: formData.get('bio') as string,
      image: (formData.get('image') as string) || undefined,
    }

    try {
      const newCoach = await createCoach(data)
      setCoaches([...coaches, newCoach])
      toast.success('Coach added')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error('Failed to add coach')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return
    try {
      await deleteCoach(id)
      setCoaches(coaches.filter(c => c.id !== id))
      toast.success('Coach deleted')
    } catch (error) {
      toast.error('Failed to delete coach')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" required placeholder="Coach Name" className="bg-matte-black border-white/10" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input name="role" required placeholder="e.g. Head Coach" className="bg-matte-black border-white/10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea name="bio" required placeholder="Coach biography" className="bg-matte-black border-white/10 min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input name="image" placeholder="https://..." className="bg-matte-black border-white/10" />
        </div>
        <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
          <Plus className="w-4 h-4 mr-2" /> Add Coach
        </Button>
      </form>

      <div className="grid gap-4">
        {coaches.map((coach) => (
          <div key={coach.id} className="flex items-center justify-between p-4 bg-slate-grey/5 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
            <div className="flex items-center gap-4">
              {coach.image && (
                <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${coach.image})` }} />
              )}
              <div>
                <h4 className="font-bold text-lg italic uppercase">{coach.name}</h4>
                <p className="text-sm text-white/40">{coach.role}</p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => handleDelete(coach.id)}
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
