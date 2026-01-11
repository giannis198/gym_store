'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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

        {/* Desktop Navigation */}
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
            className="hidden sm:block text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-neon-volt transition-colors"
          >
            Join Now
          </Link>

          {/* Mobile Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="md:hidden p-2 text-white hover:text-neon-volt transition-colors"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-matte-black border-white/10 text-white flex flex-col items-center justify-center">
              <SheetHeader className="w-full">
                <SheetTitle className="text-white font-black italic tracking-tighter text-center mb-8 text-3xl">
                  IRON <span className="text-neon-volt">&</span> GLOVES
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-8 mt-8 items-center w-full">
                {navItems.map((item) => (
                  <Link 
                    key={item.title}
                    href={item.href}
                    className="text-3xl font-bold uppercase tracking-tight hover:text-neon-volt transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
                <Link 
                  href="/#contact" 
                  className="mt-8 text-center font-bold uppercase tracking-widest bg-neon-volt text-black py-4 px-12 rounded-full w-full max-w-[250px]"
                >
                  Join Now
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
