"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Server,
  Database,
  Wifi,
} from "lucide-react"

interface DashboardData {
  stats: {
    totalCongresos: number
    congresosActivos: number
    totalUsuarios: number
    usuariosActivos: number
    comunicacionesTotales: number
    comunicacionesPendientes: number
    ingresosTotales: number
    ingresosMes: number
  }
  recentActivity: Array<{
    id: string
    type: string
    message: string
    timestamp: string
    user: string
    congress: string
  }>
  upcomingEvents: Array<{
    id: string
    name: string
    date: string
    location: string
    registrations: number
    status: string
  }>
  systemHealth: {
    status: string
    uptime: string
    responseTime: string
    activeConnections: number
    serverLoad: number
    databaseStatus: string
    lastBackup: string
  }
}

interface DashboardOverviewProps {
  data: DashboardData
}

export default function DashboardOverview({ data }: DashboardOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4 text-green-500" />
      case "communication_submitted":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "payment_completed":
        return <DollarSign className="h-4 w-4 text-emerald-500" />
      case "congress_created":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "certificate_generated":
        return <CheckCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Activo
          </Badge>
        )
      case "registration_open":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Inscripciones Abiertas
          </Badge>
        )
      case "draft":
        return <Badge variant="outline">Borrador</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Panel principal de administración</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Congresos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalCongresos}</div>
            <p className="text-xs text-muted-foreground">{data.stats.congresosActivos} activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalUsuarios.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{data.stats.usuariosActivos} activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comunicaciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.comunicacionesTotales}</div>
            <p className="text-xs text-muted-foreground">{data.stats.comunicacionesPendientes} pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.stats.ingresosTotales)}</div>
            <p className="text-xs text-muted-foreground">{formatCurrency(data.stats.ingresosMes)} este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.congress}
                    </p>
                    <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString("es-ES")}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver toda la actividad
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Próximos eventos */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Congresos programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(event.date)} • {event.location}
                    </p>
                    <p className="text-xs text-gray-400">{event.registrations} inscripciones</p>
                  </div>
                  <div className="flex-shrink-0">{getStatusBadge(event.status)}</div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver todos los eventos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estado del sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Estado del Sistema
          </CardTitle>
          <CardDescription>Monitoreo en tiempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div
                  className={`w-3 h-3 rounded-full ${
                    data.systemHealth.status === "healthy" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
              <div>
                <p className="text-sm font-medium">Estado</p>
                <p className="text-xs text-gray-500">
                  {data.systemHealth.status === "healthy" ? "Saludable" : "Error"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-xs text-gray-500">{data.systemHealth.uptime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Respuesta</p>
                <p className="text-xs text-gray-500">{data.systemHealth.responseTime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Wifi className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Conexiones</p>
                <p className="text-xs text-gray-500">{data.systemHealth.activeConnections}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Carga</p>
                <p className="text-xs text-gray-500">{data.systemHealth.serverLoad}%</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-sm font-medium">Base de Datos</p>
                <p className="text-xs text-gray-500">
                  {data.systemHealth.databaseStatus === "healthy" ? "OK" : "Error"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
