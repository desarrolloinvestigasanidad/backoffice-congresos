import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Euro, FileText, CheckCircle, Clock, Download, AlertCircle, Calendar, Users } from "lucide-react"

interface PaymentDashboardProps {
  data: any // Usar tipado completo en producción
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      )
    case "paid":
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Pagado
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Fallido
        </Badge>
      )
    default:
      return <Badge variant="secondary">Desconocido</Badge>
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "poster":
      return "Poster"
    case "video":
      return "Video"
    case "oral":
      return "Comunicación Oral"
    default:
      return "Comunicación"
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

export default function PaymentDashboard({ data }: PaymentDashboardProps) {
  const pendingCommunications = data.communications.filter((c: any) => c.paymentStatus === "pending")
  const paidCommunications = data.communications.filter((c: any) => c.paymentStatus === "paid")

  return (
    <div className="space-y-6">
      {/* Resumen de pagos */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Euro className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">€{data.totalPending.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Pendiente de Pago</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">€{data.totalPaid.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Pagado</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{data.communications.length}</div>
            <div className="text-sm text-muted-foreground">Comunicaciones</div>
          </CardContent>
        </Card>
      </div>

      {/* Pagos pendientes */}
      {pendingCommunications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertCircle className="w-5 h-5" />
              Pagos Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingCommunications.map((communication: any) => (
              <div
                key={communication.id}
                className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 mb-1">{communication.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-yellow-700">
                    <span>{getTypeLabel(communication.type)}</span>
                    <span>{communication.congress}</span>
                    {communication.coauthors > 0 && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />+{communication.coauthors} coautor
                        {communication.coauthors > 1 ? "es" : ""}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-800">€{communication.amount.toFixed(2)}</div>
                    <div className="text-xs text-yellow-600">Autor principal</div>
                  </div>
                  <Link href={`/plataforma/pago/${communication.id}`}>
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar Ahora
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabs para historial y comunicaciones */}
      <Tabs defaultValue="communications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="communications">
            <FileText className="w-4 h-4 mr-2" />
            Mis Comunicaciones
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="w-4 h-4 mr-2" />
            Historial de Pagos
          </TabsTrigger>
        </TabsList>

        {/* Comunicaciones */}
        <TabsContent value="communications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado de Comunicaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.communications.map((communication: any) => (
                <div key={communication.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{communication.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{getTypeLabel(communication.type)}</span>
                        <span>{communication.congress}</span>
                        {communication.coauthors > 0 && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />+{communication.coauthors} coautor
                            {communication.coauthors > 1 ? "es" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">€{communication.amount.toFixed(2)}</div>
                        {communication.paidAt && (
                          <div className="text-xs text-muted-foreground">
                            Pagado: {formatDate(communication.paidAt)}
                          </div>
                        )}
                      </div>
                      {getStatusBadge(communication.paymentStatus)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historial de pagos */}
        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              {data.paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {data.paymentHistory.map((payment: any) => (
                    <div key={payment.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800 mb-1">{payment.communicationTitle}</h3>
                          <div className="flex items-center gap-4 text-sm text-green-700">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(payment.date)}
                            </div>
                            <span>ID: {payment.transactionId}</span>
                            <span className="capitalize">{payment.method === "card" ? "Tarjeta" : payment.method}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-800">€{payment.amount.toFixed(2)}</div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completado
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Factura
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay pagos realizados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Información adicional */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Información sobre pagos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Solo el autor principal debe realizar el pago de €8 por comunicación</li>
                <li>Los coautores (hasta 6) pueden participar sin coste adicional</li>
                <li>El pago incluye acceso completo al congreso y certificados</li>
                <li>Las facturas se generan automáticamente tras el pago</li>
                <li>Los pagos son seguros y procesados mediante pasarela encriptada</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
