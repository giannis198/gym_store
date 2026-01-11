'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navItems = [
  { title: "Programs", href: "/#programs" },
  { title: "Schedule", href: "/#schedule" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Coaches", href: "/#coaches" },
]

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-matte-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter italic">
          IRON <span className="text-neon-volt">&</span> GLOVES
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white hover:bg-white/5 hover:text-neon-volt transition-colors"
                  )}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <Link 
            href="/#contact" 
            className="text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-neon-volt transition-colors"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  )
}
