'use client'

import { useState } from 'react'
import { createProgram, deleteProgram } from '@/lib/actions/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function ManagePrograms({ initialPrograms }: { initialPrograms: any[] }) {
  const [programs, setPrograms] = useState(initialPrograms)
  const [loading, setLoading] = useState(false)

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      intensity: formData.get('intensity') as string,
      icon: (formData.get('icon') as string) || 'Zap',
      color: (formData.get('color') as string) || 'text-neon-volt',
    }

    try {
      const newProgram = await createProgram(data)
      setPrograms([...programs, newProgram])
      toast.success('Program added')
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast.error('Failed to add program')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return
    try {
      await deleteProgram(id)
      setPrograms(programs.filter(p => p.id !== id))
      toast.success('Program deleted')
    } catch (error) {
      toast.error('Failed to delete program')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleAdd} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" required placeholder="e.g. Boxing Tech" className="bg-matte-black border-white/10" />
          </div>
          <div className="space-y-2">
            <Label>Intensity</Label>
            <Input name="intensity" required placeholder="e.g. High" className="bg-matte-black border-white/10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Input name="description" required placeholder="Program description" className="bg-matte-black border-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Icon (Lucide name)</Label>
            <Input name="icon" placeholder="Zap" className="bg-matte-black border-white/10" />
          </div>
          <div className="space-y-2">
            <Label>Color Class</Label>
            <Input name="color" placeholder="text-neon-volt" className="bg-matte-black border-white/10" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
          <Plus className="w-4 h-4 mr-2" /> Add Program
        </Button>
      </form>

      <div className="grid gap-4">
        {programs.map((program) => (
          <div key={program.id} className="flex items-center justify-between p-4 bg-slate-grey/5 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
            <div>
              <h4 className="font-bold text-lg italic uppercase">{program.title}</h4>
              <p className="text-sm text-white/40">{program.intensity} • {program.description}</p>
            </div>
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={() => handleDelete(program.id)}
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
