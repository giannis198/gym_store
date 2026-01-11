import React from 'react'
import { cn } from '@/lib/utils'

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

export const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, bordered = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-slate-grey/50 backdrop-blur-sm p-6 rounded-lg transition-all duration-300",
          bordered && "border border-white/10 hover:border-neon-volt/50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PremiumCard.displayName = 'PremiumCard'
