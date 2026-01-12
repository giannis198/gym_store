'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, User } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from '@/lib/auth-client'

const navItems = [
  { title: "Programs", href: "/#programs" },
  { title: "Schedule", href: "/#schedule" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Coaches", href: "/#coaches" },
]

export function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  // Debugging session role
  if (session?.user) {
    console.log("Header Session User:", session.user);
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
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
          {!isPending && session?.user ? (
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 hover:border-neon-volt/50 transition-colors">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-grey/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-white/50" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-matte-black border-white/10 text-white" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{session.user.name}</p>
                      <p className="text-xs leading-none text-white/50">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {(session.user as any).role === 'admin' && (
                    <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-neon-volt cursor-pointer">
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-neon-volt cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="focus:bg-white/5 focus:text-neon-volt cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            !isPending && (
              <Link 
                href="/login"
                className="hidden sm:block text-xs font-bold uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-neon-volt transition-colors"
              >
                Login
              </Link>
            )
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
                
                {!isPending && session?.user ? (
                  <div className="flex flex-col items-center gap-4 mt-8 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      {session.user.image ? (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || "User"} 
                          className="h-12 w-12 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-slate-grey/20 flex items-center justify-center border border-white/10">
                          <User className="h-6 w-6 text-white/50" />
                        </div>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{session.user.name}</p>
                        <p className="text-xs text-white/50">{session.user.email}</p>
                      </div>
                    </div>
                    
                    {(session.user as any).role === 'admin' && (
                       <Link 
                        href="/admin"
                        className="text-xl font-bold uppercase tracking-tight text-neon-volt hover:text-white transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link 
                        href="/profile"
                        className="text-xl font-bold uppercase tracking-tight text-white hover:text-neon-volt transition-colors"
                      >
                        Profile
                    </Link>
                    
                    <Button 
                      onClick={handleLogout} 
                      className="mt-4 text-center font-bold uppercase tracking-widest bg-neon-volt text-black py-4 px-12 rounded-full w-full max-w-[250px]"
                    >
                      Logout
                    </Button>
                  </div>
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