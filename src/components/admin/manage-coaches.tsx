'use client'

import React from 'react'
import { createCoach, deleteCoach } from '@/lib/actions/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const coachSchema = z.object({
  name: z.string().min(1, 'Coach name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

type CoachFormData = z.infer<typeof coachSchema>

export function ManageCoaches({ initialCoaches }: { initialCoaches: any[] }) {
  const [coaches, setCoaches] = React.useState(initialCoaches)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<CoachFormData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      image: '',
    },
  })

  async function onSubmit(data: CoachFormData) {
    setLoading(true)
    try {
      const newCoach = await createCoach(data)
      setCoaches([...coaches, newCoach])
      toast.success('Coach added')
      form.reset() // Reset form fields after successful submission
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
      <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Deleting a coach will also remove all their associated schedule items.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Coach Name" className="bg-matte-black border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Head Coach" className="bg-matte-black border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Coach biography" className="bg-matte-black border-white/10 min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." className="bg-matte-black border-white/10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
            <Plus className="w-4 h-4 mr-2" /> Add Coach
          </Button>
        </form>
      </Form>

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
                    This action cannot be undone. This will permanently delete the coach {coach.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(coach.id)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  )
}
