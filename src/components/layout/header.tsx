'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Import useRouter
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
import { Button } from '@/components/ui/button' // Assuming a Button component exists
import { useSession, signOut } from '@/lib/auth-client' // Import useSession and signOut

const navItems = [
  { title: "Programs", href: "/#programs" },
  { title: "Schedule", href: "/#schedule" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Coaches", href: "/#coaches" },
]

export function Header() {
  const { data: session, status } = useSession(); // Use the session hook
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login'); // Redirect to login page after logout
  };

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
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-white hover:bg-white/5 hover:text-neon-volt transition-colors"
                )}>
                  <Link href={item.href}>
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {status === 'authenticated' && (session.user as any).role === 'admin' && (
            <Link 
              href="/admin"
              className="hidden sm:block text-xs font-bold uppercase tracking-widest text-neon-volt hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          )}
          {status === 'authenticated' ? (
            <Button 
              onClick={handleLogout} 
              className="hidden sm:block text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-neon-volt transition-colors"
            >
              Logout
            </Button>
          ) : (
            <Link 
              href="/login" // Link to login page
              className="hidden sm:block text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-neon-volt transition-colors"
            >
              Login
            </Link>
          )}

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
                {status === 'authenticated' && (session.user as any).role === 'admin' && (
                  <Link 
                    href="/admin"
                    className="text-3xl font-bold uppercase tracking-tight text-neon-volt hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {status === 'authenticated' ? (
                  <Button 
                    onClick={handleLogout} 
                    className="mt-8 text-center font-bold uppercase tracking-widest bg-neon-volt text-black py-4 px-12 rounded-full w-full max-w-[250px]"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link 
                    href="/login" 
                    className="mt-8 text-center font-bold uppercase tracking-widest bg-neon-volt text-black py-4 px-12 rounded-full w-full max-w-[250px]"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
