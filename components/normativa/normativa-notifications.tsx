import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertCircle, Info, CheckCircle, Calendar, ExternalLink } from "lucide-react"

interface NormativaNotificationsProps {
  notifications: any[] // Usar tipado completo en producción
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "update":
      return <AlertCircle className="w-5 h-5" />
    case "reminder":
      return <Bell className="w-5 h-5" />
    case "info":
      return <Info className="w-5 h-5" />
    case "success":
      return <CheckCircle className="w-5 h-5" />
    default:
      return <Bell className="w-5 h-5" />
  }
}

const getNotificationColor = (type: string, priority: string) => {
  if (priority === "high") {
    return "border-red-200 bg-red-50 text-red-700"
  }
  switch (type) {
    case "update":
      return "border-yellow-200 bg-yellow-50 text-yellow-700"
    case "reminder":
      return "border-blue-200 bg-blue-50 text-blue-700"
    case "info":
      return "border-gray-200 bg-gray-50 text-gray-700"
    case "success":
      return "border-green-200 bg-green-50 text-green-700"
    default:
      return "border-gray-200 bg-gray-50 text-gray-700"
  }
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-700">
          Alta Prioridad
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          Prioridad Media
        </Badge>
      )
    case "low":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Prioridad Baja
        </Badge>
      )
    default:
      return null
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return "Hace 1 día"
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`
  } else {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
}

export default function NormativaNotifications({ notifications }: NormativaNotificationsProps) {
  const sortedNotifications = [...notifications].sort((a, b) => {
    // Ordenar por prioridad y luego por fecha
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0

    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Avisos y Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Mantente al día con las últimas actualizaciones, recordatorios y cambios importantes en las normativas del
            congreso.
          </p>
        </CardContent>
      </Card>

      {/* Lista de notificaciones */}
      {sortedNotifications.length > 0 ? (
        <div className="space-y-4">
          {sortedNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-2 ${getNotificationColor(notification.type, notification.priority)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-white/50">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(notification.priority)}
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm mb-3 leading-relaxed">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs opacity-75">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(notification.date)}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No hay notificaciones</h3>
            <p className="text-muted-foreground">
              Cuando haya actualizaciones importantes en las normativas, aparecerán aquí.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Configuración de notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Configuración de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Configura cómo quieres recibir las notificaciones sobre cambios en las normativas.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Notificaciones por Email</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Recibe actualizaciones importantes directamente en tu correo electrónico.
              </p>
              <Button variant="outline" size="sm">
                Configurar Email
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Notificaciones Push</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Recibe notificaciones instantáneas en tu navegador cuando haya cambios.
              </p>
              <Button variant="outline" size="sm">
                Activar Push
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
