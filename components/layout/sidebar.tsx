"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  Award,
  Settings,
  BarChart3,
  ChevronDown,
  ChevronRight,
  X,
  Building,
} from "lucide-react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Congresos",
    icon: Calendar,
    current: false,
    children: [
      { name: "Todos los Congresos", href: "/congresos" },
      { name: "Crear Congreso", href: "/congresos/nuevo" },
      { name: "Plantillas", href: "/congresos/plantillas" },
      { name: "Configuración", href: "/congresos/configuracion" },
    ],
  },
  {
    name: "Usuarios",
    icon: Users,
    current: false,
    children: [
      { name: "Todos los Usuarios", href: "/usuarios" },
      { name: "Administradores", href: "/usuarios/administradores" },
      { name: "Roles y Permisos", href: "/usuarios/roles" },
      { name: "Actividad", href: "/usuarios/actividad" },
    ],
  },
  {
    name: "Comunicaciones",
    icon: MessageSquare,
    current: false,
    badge: "23",
    children: [
      { name: "Todas las Comunicaciones", href: "/comunicaciones" },
      { name: "Pendientes de Revisión", href: "/comunicaciones/pendientes" },
      { name: "Aprobadas", href: "/comunicaciones/aprobadas" },
      { name: "Rechazadas", href: "/comunicaciones/rechazadas" },
    ],
  },
  {
    name: "Pagos",
    icon: CreditCard,
    current: false,
    children: [
      { name: "Todos los Pagos", href: "/pagos" },
      { name: "Pendientes", href: "/pagos/pendientes" },
      { name: "Completados", href: "/pagos/completados" },
      { name: "Reembolsos", href: "/pagos/reembolsos" },
    ],
  },
  {
    name: "Certificados",
    icon: Award,
    current: false,
    children: [
      { name: "Todos los Certificados", href: "/certificados" },
      { name: "Plantillas", href: "/certificados/plantillas" },
      { name: "Generación Masiva", href: "/certificados/masiva" },
      { name: "Verificación", href: "/certificados/verificacion" },
    ],
  },
  {
    name: "Reportes",
    icon: BarChart3,
    current: false,
    children: [
      { name: "Analytics", href: "/reportes/analytics" },
      { name: "Financieros", href: "/reportes/financieros" },
      { name: "Usuarios", href: "/reportes/usuarios" },
      { name: "Exportar Datos", href: "/reportes/exportar" },
    ],
  },
  {
    name: "Sistema",
    icon: Settings,
    current: false,
    children: [
      { name: "Configuración General", href: "/sistema/configuracion" },
      { name: "Notificaciones", href: "/sistema/notificaciones" },
      { name: "Logs del Sistema", href: "/sistema/logs" },
      { name: "Backups", href: "/sistema/backups" },
    ],
  },
]

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Congresos"])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Building className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Backoffice</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <Link
                          href={item.href!}
                          className={cn(
                            pathname === item.href
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:text-blue-700 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => toggleExpanded(item.name)}
                            className={cn(
                              "text-gray-700 hover:text-blue-700 hover:bg-gray-50",
                              "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm leading-6 font-semibold",
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                                {item.badge}
                              </Badge>
                            )}
                            {expandedItems.includes(item.name) ? (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )}
                          </button>
                          {expandedItems.includes(item.name) && (
                            <ul className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      pathname === subItem.href
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:text-blue-700 hover:bg-gray-50",
                                      "block rounded-md py-2 pl-9 pr-2 text-sm leading-6",
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn("lg:hidden", open ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 px-6 pb-4">
            {/* Header */}
            <div className="flex h-16 shrink-0 items-center justify-between">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Backoffice</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            href={item.href!}
                            onClick={() => setOpen(false)}
                            className={cn(
                              pathname === item.href
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:text-blue-700 hover:bg-gray-50",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        ) : (
                          <div>
                            <button
                              onClick={() => toggleExpanded(item.name)}
                              className={cn(
                                "text-gray-700 hover:text-blue-700 hover:bg-gray-50",
                                "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm leading-6 font-semibold",
                              )}
                            >
                              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              {item.name}
                              {item.badge && (
                                <Badge variant="secondary" className="ml-auto bg-red-100 text-red-700">
                                  {item.badge}
                                </Badge>
                              )}
                              {expandedItems.includes(item.name) ? (
                                <ChevronDown className="ml-auto h-4 w-4" />
                              ) : (
                                <ChevronRight className="ml-auto h-4 w-4" />
                              )}
                            </button>
                            {expandedItems.includes(item.name) && (
                              <ul className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      onClick={() => setOpen(false)}
                                      className={cn(
                                        pathname === subItem.href
                                          ? "bg-blue-50 text-blue-700"
                                          : "text-gray-600 hover:text-blue-700 hover:bg-gray-50",
                                        "block rounded-md py-2 pl-9 pr-2 text-sm leading-6",
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
