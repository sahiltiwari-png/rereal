import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export function AdminLayout() {
  const location = useLocation()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return (
    <SidebarProvider>
      <div id="admin-root" className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="bg-background">
          <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/80 px-3 py-2 backdrop-blur md:hidden">
            <SidebarTrigger />
            <span className="text-sm font-medium">Admin Dashboard</span>
          </div>
          <div className="px-2 md:px-6 py-3 md:py-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
