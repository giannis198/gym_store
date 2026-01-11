import React from 'react'
import { Button, ButtonProps } from './button'
import { cn } from '@/lib/utils'

interface PremiumButtonProps extends ButtonProps {
  glow?: boolean
  hoverEffect?: boolean
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, glow = true, hoverEffect = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden font-bold uppercase tracking-tighter transition-all duration-300",
          "hover:scale-105 active:scale-95",
          glow && "shadow-[0_0_20px_rgba(198,255,0,0.2)] hover:shadow-[0_0_40px_rgba(198,255,0,0.6)]",
          hoverEffect && "after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500 after:skew-x-[-20deg]",
          "bg-neon-volt text-matte-black hover:bg-neon-volt/90",
          className
        )}
        {...props}
      />
    )
  }
)

PremiumButton.displayName = 'PremiumButton'
