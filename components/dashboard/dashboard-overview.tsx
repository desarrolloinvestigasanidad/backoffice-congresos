"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  MessageSquare,
  Euro,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Server,
  Database,
  Wifi,
} from "lucide-react"

interface DashboardOverviewProps {
  data: any // Usar tipado completo en producción
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "user_registration":
      return <Users className="h-4 w-4 text-blue-500" />
    case "communication_submitted":
      return <MessageSquare className="h-4 w-4 text-green-500" />
    case "payment_completed":
      return <Euro className="h-4 w-4 text-purple-500" />
    case "congress_created":
      return <Calendar className="h-4 w-4 text-orange-500" />
    case "certificate_generated":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700">Activo</Badge>
    case "registration_open":
      return <Badge className="bg-blue-100 text-blue-700">Inscripciones Abiertas</Badge>
    case "draft":
      return <Badge className="bg-gray-100 text-gray-700">Borrador</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardOverview({ data }: DashboardOverviewProps) {
  const { stats, recentActivity, upcomingEvents, systemHealth } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general de la plataforma de congresos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Congresos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCongresos}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.congresosActivos} activos
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsuarios.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stats.usuariosActivos} activos
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comunicaciones</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.comunicacionesTotales}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-600 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {stats.comunicacionesPendientes} pendientes
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.ingresosTotales)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {formatCurrency(stats.ingresosMes)} este mes
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.congress}</span>
                      <span>•</span>
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
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

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Congresos programados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{event.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString("es-ES")}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {getStatusBadge(event.status)}
                      <span className="text-xs text-gray-500">{event.registrations} inscritos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Ver todos los congresos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Estado del Sistema
          </CardTitle>
          <CardDescription>Monitoreo en tiempo real de la infraestructura</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm font-medium">Estado General</p>
                <p className="text-xs text-green-600 capitalize">{systemHealth.status}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Wifi className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Tiempo de Actividad</p>
                <p className="text-xs text-blue-600">{systemHealth.uptime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Activity className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Tiempo de Respuesta</p>
                <p className="text-xs text-purple-600">{systemHealth.responseTime}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Database className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Base de Datos</p>
                <p className="text-xs text-orange-600 capitalize">{systemHealth.databaseStatus}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{systemHealth.activeConnections}</p>
              <p className="text-xs text-gray-500">Conexiones Activas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{systemHealth.serverLoad}%</p>
              <p className="text-xs text-gray-500">Carga del Servidor</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{formatDate(systemHealth.lastBackup)}</p>
              <p className="text-xs text-gray-500">Último Backup</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
