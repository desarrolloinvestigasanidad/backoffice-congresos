"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // <-- 1. IMPORTAMOS EL HOOK DE AUTENTICACIÓN
import { useRouter } from "next/navigation"; // <-- Importamos para redirigir si es necesario
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function AdminHeader() {
  // --- 2. OBTENEMOS LOS DATOS Y FUNCIONES DEL CONTEXTO ---
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();

  // Define el tipo de notificación para evitar errores de TypeScript
  type Notification = {
    id: number;
    message: string;
    unread: boolean;
    // Puedes agregar más propiedades según sea necesario
  };

  // Las notificaciones siguen siendo de ejemplo por ahora
  const [notifications] = useState<Notification[]>([
    // Ejemplo: { id: 1, message: "Nueva actualización", unread: true }
    /* ... tus notificaciones ... */
  ]);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    logout();
    // Opcional: redirigir explícitamente al login, aunque el ProtectedRoute ya lo hará.
    router.push("/login");
  };

  // Si por alguna razón el usuario no se ha cargado, no mostramos nada para evitar errores.
  if (!user) {
    return (
      <header className='bg-white border-b border-gray-200 px-6 py-4 h-[73px]'></header>
    ); // Un placeholder del mismo alto
  }

  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4 dark:bg-gray-900 dark:border-gray-800'>
      <div className='flex items-center justify-between'>
        {/* Búsqueda */}
        <div className='flex-1 max-w-md'>
          {/* ... (la barra de búsqueda se queda igual) ... */}
        </div>

        {/* Acciones */}
        <div className='flex items-center gap-4'>
          {/* Notificaciones */}
          {/* ... (el menú de notificaciones se queda igual por ahora) ... */}

          {/* Perfil de usuario - AHORA ES DINÁMICO */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative h-10 w-10 rounded-full'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src='/placeholder.svg'
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  {/* --- Fallback con las iniciales del usuario --- */}
                  <AvatarFallback>
                    {user.firstName?.[0] || ""}
                    {user.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-64' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  {/* --- Nombre y email dinámicos --- */}
                  <p className='text-sm font-medium leading-none'>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              {/* --- Rol dinámico --- */}
              <DropdownMenuSeparator />
              <div className='p-2'>
                {isAdmin ? (
                  <Badge
                    variant='default'
                    className='w-full flex justify-center'>
                    Administrador
                  </Badge>
                ) : (
                  <Badge
                    variant='secondary'
                    className='w-full flex justify-center'>
                    Cliente
                  </Badge>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Perfil</span>
              </DropdownMenuItem>
              {/* ... (otros items del menú) ... */}
              <DropdownMenuSeparator />
              {/* --- 3. BOTÓN DE LOGOUT FUNCIONAL --- */}
              <DropdownMenuItem
                onClick={handleLogout}
                className='text-red-600 focus:text-red-500 cursor-pointer'>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
