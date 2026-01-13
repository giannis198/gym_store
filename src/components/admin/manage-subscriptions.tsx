"use client"

import * as React from "react"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "react-hot-toast"
import { updateMember } from "@/lib/actions/admin"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface Subscription {
  id: string
  userId: string
  tier: string
  status: string
  startDate: Date
  endDate: Date | null
  price: number
  user: {
    name: string | null
    email: string
    image: string | null
    role?: string
  }
}

export function ManageSubscriptions({ initialSubscriptions }: { initialSubscriptions: Subscription[] }) {
  const [selectedSub, setSelectedSub] = React.useState<Subscription | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [editData, setEditData] = React.useState({
    name: "",
    email: "",
    role: "user"
  })
  const router = useRouter()

  const filteredSubscriptions = React.useMemo(() => {
    return initialSubscriptions.filter(sub => 
      sub.user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sub.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [initialSubscriptions, searchQuery])

  const handleRowClick = (sub: Subscription) => {
    setSelectedSub(sub)
    setEditData({
      name: sub.user.name || "",
      email: sub.user.email,
      role: (sub.user as any).role || "user"
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!selectedSub) return

    try {
      await updateMember(selectedSub.userId, editData)
      toast.success("Member updated successfully")
      setIsEditing(false)
      router.refresh()
    } catch (error: any) {
      toast.error(`Failed to update member: ${error.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <Input 
          placeholder="Search members..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white h-10 rounded-xl"
        />
      </div>

      <div className="rounded-2xl border border-white/5 bg-slate-grey/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px] h-12">Member</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px] h-12">Plan</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px] h-12">Status</TableHead>
              <TableHead className="text-white/40 font-bold uppercase tracking-widest text-[10px] h-12">Joined</TableHead>
              <TableHead className="text-right text-white/40 font-bold uppercase tracking-widest text-[10px] h-12">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.map((sub) => (
              <TableRow 
                key={sub.id} 
                className="border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => handleRowClick(sub)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-white/10">
                      <AvatarImage src={sub.user.image || undefined} />
                      <AvatarFallback className="bg-slate-grey/20 text-white/40 text-[10px] font-bold">
                        {sub.user.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-white">{sub.user.name || 'Anonymous'}</span>
                      <span className="text-xs text-white/30">{sub.user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold italic uppercase text-xs text-neon-volt">{sub.tier}</span>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      sub.status === 'ACTIVE' 
                        ? "bg-green-500/10 text-green-500 border-green-500/20" 
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }
                  >
                    {sub.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-white/50">
                  {new Date(sub.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right font-mono font-bold text-white/70">
                  ${sub.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-matte-black border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter text-neon-volt">
              Edit Member
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={editData.name} 
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={editData.email} 
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select 
                value={editData.role} 
                onValueChange={(val) => setEditData({ ...editData, role: val })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-matte-black border-white/10 text-white">
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleSave}
              className="w-full bg-neon-volt text-matte-black hover:bg-neon-volt/90 font-black italic uppercase mt-6"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
