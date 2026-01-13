import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // @ts-ignore
  if (session.user.role !== "admin") {
    // redirect("/");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-matte-black">
        <AdminSidebar />
        <SidebarInset className="bg-matte-black">
          <header className="flex h-20 shrink-0 items-center gap-2 border-b border-white/5 px-6 sticky top-0 bg-matte-black/80 backdrop-blur-md z-40">
            <SidebarTrigger className="text-white/50 hover:text-white" />
            <div className="h-4 w-px bg-white/10 mx-2" />
            <div className="flex-1">
               {/* Breadcrumbs or page title could go here */}
            </div>
          </header>
          <main className="p-8 md:p-12">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
