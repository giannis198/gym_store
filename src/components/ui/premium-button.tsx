import React from 'react'
import { Button, ButtonProps } from './button'
import { cn } from '@/lib/utils'

interface PremiumButtonProps extends ButtonProps {
  glow?: boolean
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, glow = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden font-bold uppercase tracking-tighter transition-all duration-300",
          "hover:scale-105 active:scale-95",
          glow && "shadow-[0_0_20px_rgba(198,255,0,0.3)] hover:shadow-[0_0_30px_rgba(198,255,0,0.5)]",
          "bg-neon-volt text-matte-black hover:bg-neon-volt/90",
          className
        )}
        {...props}
      />
    )
  }
)

PremiumButton.displayName = 'PremiumButton'
