"use client";

import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"; // <-- 1. IMPORTAMOS EL GUARDIÁN
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./admin-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // 2. ENVOLVEMOS TODO EL LAYOUT CON EL PROTECTEDROUTE
    <ProtectedRoute>
      <div className='flex h-screen bg-gray-50 dark:bg-gray-950'>
        <AdminSidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <AdminHeader />
          <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6'>
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
