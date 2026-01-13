"use client";

import React from "react";
import { createProgram, deleteProgram } from "@/lib/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  
  const programSchema = z.object({
    title: z.string().min(1, 'Program title is required'),
    description: z.string().min(1, 'Description is required'),
    intensity: z.string().min(1, 'Intensity is required'),
    icon: z.string().optional(),
    color: z.string().optional(),
  })
  
  type ProgramFormData = z.infer<typeof programSchema>
  
  export function ManagePrograms({ initialPrograms }: { initialPrograms: any[] }) {
    const [programs, setPrograms] = React.useState(initialPrograms)
    const [loading, setLoading] = React.useState(false)
  
    const form = useForm<ProgramFormData>({
      resolver: zodResolver(programSchema),
      defaultValues: {
        title: '',
        description: '',
        intensity: '',
        icon: 'Zap',
        color: 'text-neon-volt',
      },
    })
  
    async function onSubmit(data: ProgramFormData) {
      setLoading(true)
      try {
        const newProgram = await createProgram(data)
        setPrograms([...programs, newProgram])
        toast.success('Program added')
        form.reset() // Reset form fields after successful submission
      } catch (error) {
        toast.error('Failed to add program')
      } finally {
        setLoading(false)
      }
    }
  
    async function handleDelete(id: string) {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Boxing Tech" className="bg-matte-black border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intensity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intensity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. High" className="bg-matte-black border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Program description" className="bg-matte-black border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (Lucide name)</FormLabel>
                    <FormControl>
                      <Input placeholder="Zap" className="bg-matte-black border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Class</FormLabel>
                    <FormControl>
                      <Input placeholder="text-neon-volt" className="bg-matte-black border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
              <Plus className="w-4 h-4 mr-2" /> Add Program
            </Button>
          </form>
        </Form>
  
        <div className="grid gap-4">
          {programs.map((program) => (
            <div key={program.id} className="flex items-center justify-between p-4 bg-slate-grey/5 border border-white/5 rounded-xl group hover:border-white/20 transition-all">
              <div>
                <h4 className="font-bold text-lg italic uppercase">{program.title}</h4>
                <p className="text-sm text-white/40">{program.intensity} • {program.description}</p>
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
                      This action cannot be undone. This will permanently delete the program {program.title}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(program.id)} className="bg-red-500 text-white hover:bg-red-600">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </div>
    )
  }
