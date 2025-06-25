import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, CreditCard, CheckCircle, Send, Award, Calendar, Users, TrendingUp } from "lucide-react"

interface ActivityHistoryProps {
  activity: any[]
  stats: any
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "communication_submitted":
      return <Send className="w-4 h-4" />
    case "communication_accepted":
      return <CheckCircle className="w-4 h-4" />
    case "payment_completed":
      return <CreditCard className="w-4 h-4" />
    case "certificate_earned":
      return <Award className="w-4 h-4" />
    case "congress_attended":
      return <Calendar className="w-4 h-4" />
    default:
      return <History className="w-4 h-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "communication_submitted":
      return "bg-blue-100 text-blue-700"
    case "communication_accepted":
      return "bg-green-100 text-green-700"
    case "payment_completed":
      return "bg-purple-100 text-purple-700"
    case "certificate_earned":
      return "bg-yellow-100 text-yellow-700"
    case "congress_attended":
      return "bg-indigo-100 text-indigo-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ActivityHistory({ activity, stats }: ActivityHistoryProps) {
  return (
    <div className="space-y-6">
      {/* Resumen de actividad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Resumen de Actividad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.communicationsSubmitted}</div>
              <div className="text-sm text-blue-700">Comunicaciones Enviadas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.communicationsAccepted}</div>
              <div className="text-sm text-green-700">Comunicaciones Aceptadas</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.congressesAttended}</div>
              <div className="text-sm text-purple-700">Congresos Asistidos</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.certificatesEarned}</div>
              <div className="text-sm text-yellow-700">Certificados Obtenidos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length > 0 ? (
            <div className="space-y-4">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className={`p-2 rounded-full ${getActivityColor(item.type)}`}>{getActivityIcon(item.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay actividad reciente</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Logros y hitos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Logros y Hitos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-200 rounded-full">
                  <Award className="w-5 h-5 text-yellow-700" />
                </div>
                <h3 className="font-semibold text-yellow-800">Primera Comunicación</h3>
              </div>
              <p className="text-sm text-yellow-700">¡Felicidades! Has enviado tu primera comunicación científica.</p>
              <div className="text-xs text-yellow-600 mt-2">Desbloqueado el 15 de enero, 2024</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-200 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="font-semibold text-green-800">Comunicación Aceptada</h3>
              </div>
              <p className="text-sm text-green-700">Tu comunicación ha sido aceptada para presentación oral.</p>
              <div className="text-xs text-green-600 mt-2">Desbloqueado el 25 de enero, 2024</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-200 rounded-full">
                  <Users className="w-5 h-5 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800">Colaborador Activo</h3>
              </div>
              <p className="text-sm text-blue-700">Has colaborado con múltiples coautores en tus comunicaciones.</p>
              <div className="text-xs text-blue-600 mt-2">Desbloqueado el 20 de enero, 2024</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg opacity-60">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-200 rounded-full">
                  <Calendar className="w-5 h-5 text-purple-700" />
                </div>
                <h3 className="font-semibold text-purple-800">Veterano del Congreso</h3>
              </div>
              <p className="text-sm text-purple-700">Asiste a 5 congresos para desbloquear este logro.</p>
              <div className="text-xs text-purple-600 mt-2">Progreso: 1/5 congresos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
