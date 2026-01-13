"use client"

import React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { toast } from "react-hot-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createMember } from "@/lib/actions/admin"

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long").optional().or(z.literal('')),
  role: z.enum(["user", "admin"], { message: "Invalid role selected" }).optional(),
  tier: z.string().optional(),
  price: z.string().optional().refine((val) => {
    if (val === undefined || val === '') return true; // Optional or empty string is valid
    return /^\d+(\.\d{1,2})?$/.test(val);
  }, "Price must be a valid number with up to 2 decimal places."),
});

type MemberFormData = z.infer<typeof memberSchema>;

export function ManageMembers() {
  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      tier: "",
      price: "",
    },
  });

  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: MemberFormData) => {
    setLoading(true);
    try {
      const newUser = await createMember({
        name: data.name,
        email: data.email,
        password: data.password || undefined,
        role: data.role,
        tier: data.tier || undefined,
        price: data.price ? parseFloat(data.price) : undefined,
      });
      toast.success(`Member ${newUser.name} created successfully!`);
      form.reset();
    } catch (error: any) {
      toast.error(`Failed to create member: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-6">
        Onboard New Member
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-6 bg-slate-grey/10 border border-white/5 rounded-2xl">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Member Name" className="bg-matte-black border-white/10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="member@example.com" className="bg-matte-black border-white/10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password (Optional)</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Leave blank to generate" className="bg-matte-black border-white/10" {...field} />
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus:ring-offset-0">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-matte-black border-white/10 text-white">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mt-6 pt-4 border-t border-white/5">Subscription Details (Optional)</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Tier</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="flex h-10 w-full rounded-md border border-white/10 bg-matte-black px-3 py-2 text-sm focus:ring-offset-0">
                        <SelectValue placeholder="No Subscription" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-matte-black border-white/10 text-white">
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Elite">Elite</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="e.g. 49.99" className="bg-matte-black border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            )}
            />
          </div>
          <Button type="submit" disabled={loading} className="bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase">
            <Plus className="w-4 h-4 mr-2" /> Onboard Member
          </Button>
        </form>
      </Form>
    </div>
  )
}
