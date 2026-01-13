"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  LogOut,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "?tab=dashboard",
    icon: LayoutDashboard,
    value: "dashboard",
  },
  {
    title: "Subscriptions",
    url: "?tab=subscriptions",
    icon: Users,
    value: "subscriptions",
  },
  {
    title: "Members",
    url: "?tab=members",
    icon: Users, // Using Users icon for members as well for now
    value: "members",
  },
  {
    title: "Programs",
    url: "?tab=programs",
    icon: Target,
    value: "programs",
  },
  {
    title: "Coaches",
    url: "?tab=coaches",
    icon: Users,
    value: "coaches",
  },
  {
    title: "Schedule",
    url: "?tab=schedule",
    icon: Calendar,
    value: "schedule",
  },
  {
    title: "Pricing",
    url: "?tab=pricing",
    icon: CreditCard,
    value: "pricing",
  },
];

export function AdminSidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "programs";
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-matte-black"
    >
      <SidebarHeader className="h-20 flex items-center justify-center border-b border-white/5 px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-neon-volt text-matte-black">
            <LayoutDashboard className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-black italic uppercase tracking-tighter text-white">
              IRON <span className="text-neon-volt">&</span> GLOVES
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
              Admin Panel
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/20 uppercase tracking-[0.2em] font-black text-[10px] mb-4 group-data-[collapsible=icon]:hidden">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.value}
                    tooltip={item.title}
                    className="h-12 data-[active=true]:bg-neon-volt data-[active=true]:text-matte-black transition-all hover:bg-white/5"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="size-5" />
                      <span className="font-bold uppercase italic tracking-wider">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-12 text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-all"
              tooltip="Logout"
            >
              <LogOut className="size-5" />
              <span className="font-bold uppercase italic tracking-wider">
                Logout
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
