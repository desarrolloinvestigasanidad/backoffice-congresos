import { Suspense } from "react"
import DashboardLayout from "@/components/admin/layout/dashboard-layout"
import { CongressManagement } from "@/components/admin/congress/congress-management"

export default function CongressPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Congresos</h1>
          <p className="text-muted-foreground">Administra todos los congresos, eventos y configuraciones</p>
        </div>

        <Suspense fallback={<div>Cargando...</div>}>
          <CongressManagement />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
