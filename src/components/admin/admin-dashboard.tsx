"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Sector
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"

interface Metrics {
  activeSubscriptions: number
  revenue24h: number
  revenue7d: number
  revenue30d: number
  revenue24hChart: { label: string; revenue: number }[]
  revenue7dChart: { label: string; revenue: number }[]
  revenue30dChart: { label: string; revenue: number }[]
  subscriptionDistribution: { name: string; value: number }[]
}

const COLORS = ['#D9FF00', '#FFFFFF', '#333333', '#666666']

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--neon-volt))",
  },
  members: {
    label: "Members",
    color: "hsl(var(--neon-volt))",
  }
} satisfies ChartConfig

export function AdminDashboard({ metrics }: { metrics: Metrics }) {
  const [activeRange, setActiveRange] = React.useState<'24h' | '7d' | '30d'>('7d')

  const chartData = React.useMemo(() => {
    switch (activeRange) {
      case '24h': return metrics.revenue24hChart
      case '7d': return metrics.revenue7dChart
      case '30d': return metrics.revenue30dChart
      default: return metrics.revenue7dChart
    }
  }, [activeRange, metrics])

  const rangeTitle = React.useMemo(() => {
    switch (activeRange) {
      case '24h': return "Last 24 Hours"
      case '7d': return "Past 7 Days"
      case '30d': return "Last 30 Days"
    }
  }, [activeRange])

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-grey/10 border-white/5 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white/40">Active Members</CardTitle>
            <Users className="w-4 h-4 text-neon-volt" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black italic uppercase">{metrics.activeSubscriptions}</div>
            <p className="text-xs text-white/30 mt-1">Total active subscriptions</p>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveRange('24h')}
          className={cn(
            "bg-slate-grey/10 border-white/5 text-white transition-all cursor-pointer hover:border-white/20",
            activeRange === '24h' && "border-l-2 border-l-neon-volt border-neon-volt/20 bg-neon-volt/5"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white/40">Revenue (24h)</CardTitle>
            <DollarSign className="w-4 h-4 text-neon-volt" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black italic uppercase">${metrics.revenue24h.toLocaleString()}</div>
            <p className="text-xs text-white/30 mt-1">Click to view hourly trend</p>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveRange('7d')}
          className={cn(
            "bg-slate-grey/10 border-white/5 text-white transition-all cursor-pointer hover:border-white/20",
            activeRange === '7d' && "border-l-2 border-l-neon-volt border-neon-volt/20 bg-neon-volt/5"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white/40">Revenue (7d)</CardTitle>
            <TrendingUp className="w-4 h-4 text-neon-volt" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black italic uppercase">${metrics.revenue7d.toLocaleString()}</div>
            <p className="text-xs text-white/30 mt-1">Click to view daily trend</p>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveRange('30d')}
          className={cn(
            "bg-slate-grey/10 border-white/5 text-white transition-all cursor-pointer hover:border-white/20",
            activeRange === '30d' && "border-l-2 border-l-neon-volt border-neon-volt/20 bg-neon-volt/5"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-white/40">Revenue (30d)</CardTitle>
            <Calendar className="w-4 h-4 text-neon-volt" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black italic uppercase">${metrics.revenue30d.toLocaleString()}</div>
            <p className="text-xs text-white/30 mt-1">Click to view monthly trend</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="bg-slate-grey/10 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-black italic uppercase">Revenue Trend: {rangeTitle}</CardTitle>
              <CardDescription className="text-white/40 font-bold uppercase tracking-widest text-xs">Visualizing performance across selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} strokeOpacity={0.1} />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="var(--color-revenue)" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1000}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
         </Card>

         <Card className="bg-slate-grey/10 border-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-xl font-black italic uppercase">Membership Split</CardTitle>
              <CardDescription className="text-white/40 font-bold uppercase tracking-widest text-xs">Distribution by subscription tier</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {metrics.subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 ml-4">
                {metrics.subscriptionDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}
