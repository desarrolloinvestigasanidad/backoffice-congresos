"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  CreditCard,
  Award,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Bell,
  Shield,
  Database,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react";

const menuItems = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      {
        name: "Congresos",
        href: "/congresos",
        icon: Calendar,
        badge: "3",
      },
      {
        name: "Editor Botones",
        href: "/editor-botones",
        icon: ImageIcon,
      },
    ],
  },
  {
    title: "Gestión",
    items: [
      { name: "Usuarios", href: "/usuarios", icon: Users, badge: "12" },
      {
        name: "Comunicaciones",
        href: "/comunicaciones",
        icon: FileText,
        badge: "23",
      },
      { name: "Pagos", href: "/pagos", icon: CreditCard },
      { name: "Certificados", href: "/certificados", icon: Award },
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Reportes", href: "/reportes", icon: BarChart3 },
      { name: "Notificaciones", href: "/notificaciones", icon: Bell },
    ],
  },
  {
    title: "Sistema",
    items: [
      { name: "Configuración", href: "/configuracion", icon: Settings },
      { name: "Permisos", href: "/permisos", icon: Shield },
      { name: "Base de Datos", href: "/database", icon: Database },
      { name: "Soporte", href: "/soporte", icon: HelpCircle },
    ],
  },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}>
      {/* Header */}
      <div className='p-4 border-b border-gray-200 flex items-center justify-between'>
        {!collapsed && (
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>Backoffice</h2>
            <p className='text-sm text-gray-500'>Panel de Administración</p>
          </div>
        )}
        <Button
          variant='ghost'
          size='sm'
          onClick={() => setCollapsed(!collapsed)}
          className='p-2'>
          {collapsed ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-6 overflow-y-auto'>
        {menuItems.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>
                {section.title}
              </h3>
            )}
            <div className='space-y-1'>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        collapsed && "px-2",
                        isActive && "bg-blue-50 text-blue-700 border-blue-200"
                      )}>
                      <Icon className='h-4 w-4' />
                      {!collapsed && (
                        <>
                          <span className='flex-1 text-left'>{item.name}</span>
                          {item.badge && (
                            <Badge variant='secondary' className='ml-auto'>
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-gray-200'>
        <Button
          variant='ghost'
          className={cn(
            "w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed && "px-2"
          )}>
          <LogOut className='h-4 w-4' />
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </div>
  );
}
