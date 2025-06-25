import type { Metadata } from "next"
import DashboardLayout from "@/components/admin/layout/dashboard-layout"
import DashboardOverview from "@/components/admin/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard - Backoffice Congresos",
  description: "Panel principal de administración",
}

// Simulación de datos que vendrían del backend
const getDashboardData = () => {
  return {
    stats: {
      totalCongresos: 12,
      congresosActivos: 3,
      totalUsuarios: 1247,
      usuariosActivos: 892,
      comunicacionesTotales: 456,
      comunicacionesPendientes: 23,
      ingresosTotales: 45670,
      ingresosMes: 8920,
    },
    recentActivity: [
      {
        id: "1",
        type: "user_registration",
        message: "Nuevo usuario registrado: Dr. María González",
        timestamp: "2024-01-20T10:30:00Z",
        user: "Dr. María González",
        congress: "Congreso Nacional de Medicina 2025",
      },
      {
        id: "2",
        type: "communication_submitted",
        message: "Nueva comunicación enviada",
        timestamp: "2024-01-20T09:15:00Z",
        user: "Dr. Juan Pérez",
        congress: "Congreso Nacional de Medicina 2025",
      },
      {
        id: "3",
        type: "payment_completed",
        message: "Pago completado por €8.00",
        timestamp: "2024-01-20T08:45:00Z",
        user: "Dr. Ana López",
        congress: "Congreso Nacional de Medicina 2025",
      },
      {
        id: "4",
        type: "congress_created",
        message: "Nuevo congreso creado",
        timestamp: "2024-01-19T16:20:00Z",
        user: "Admin",
        congress: "Simposio de Cardiología 2025",
      },
      {
        id: "5",
        type: "certificate_generated",
        message: "Certificado generado",
        timestamp: "2024-01-19T14:10:00Z",
        user: "Dr. Carlos Ruiz",
        congress: "Congreso Nacional de Medicina 2025",
      },
    ],
    upcomingEvents: [
      {
        id: "1",
        name: "Congreso Nacional de Medicina 2025",
        date: "2025-03-15",
        location: "Madrid, España",
        registrations: 234,
        status: "active",
      },
      {
        id: "2",
        name: "Simposio de Cardiología 2025",
        date: "2025-04-20",
        location: "Barcelona, España",
        registrations: 89,
        status: "registration_open",
      },
      {
        id: "3",
        name: "Jornadas de Neurología 2025",
        date: "2025-05-10",
        location: "Valencia, España",
        registrations: 45,
        status: "draft",
      },
    ],
    systemHealth: {
      status: "healthy",
      uptime: "99.9%",
      responseTime: "120ms",
      activeConnections: 1247,
      serverLoad: 45,
      databaseStatus: "healthy",
      lastBackup: "2024-01-20T02:00:00Z",
    },
  }
}

export default function DashboardPage() {
  const data = getDashboardData()

  return (
    <DashboardLayout>
      <DashboardOverview data={data} />
    </DashboardLayout>
  )
}
