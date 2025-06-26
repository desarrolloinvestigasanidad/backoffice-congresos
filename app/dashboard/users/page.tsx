import { Suspense } from "react";
import DashboardLayout from "@/components/admin/layout/dashboard-layout"; // Ajusta la ruta si es necesario
import { UserManagement } from "@/components/users/user-management"; // La ruta al componente que creamos antes

export default function UsersPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Gestión de Usuarios
          </h1>
          <p className='text-muted-foreground'>
            Añade, edita y gestiona los usuarios y sus roles en la plataforma.
          </p>
        </div>

        {/* Suspense es una buena práctica para componentes que cargan datos */}
        <Suspense fallback={<div>Cargando panel de usuarios...</div>}>
          <UserManagement />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
