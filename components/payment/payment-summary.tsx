import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Video, Presentation, Calendar, MapPin, Euro, CheckCircle, Info } from "lucide-react"

interface PaymentSummaryProps {
  communication: any // Usar tipado completo en producción
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "poster":
      return <FileText className="w-5 h-5" />
    case "video":
      return <Video className="w-5 h-5" />
    case "oral":
      return <Presentation className="w-5 h-5" />
    default:
      return <FileText className="w-5 h-5" />
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

export default function PaymentSummary({ communication }: PaymentSummaryProps) {
  const principalAuthor = communication.authors.find((author: any) => author.role === "principal")
  const coauthors = communication.authors.filter((author: any) => author.role === "coautor")
  const iva = communication.amount * 0.21 // 21% IVA
  const subtotal = communication.amount - iva

  return (
    <div className="space-y-6">
      {/* Resumen de comunicación */}
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
            Resumen de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comunicación */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">{getTypeIcon(communication.type)}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight mb-1">{communication.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(communication.type)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{communication.congress.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{communication.congress.location}</span>
              </div>
            </div>
          </div>

          {/* Autor principal */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Autor Principal</h4>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {principalAuthor?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{principalAuthor?.name}</p>
                  <p className="text-xs text-muted-foreground">Pago requerido</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-700">€{communication.amount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Coautores */}
          {coauthors.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Coautores ({coauthors.length})</h4>
              {coauthors.map((coauthor: any) => (
                <div key={coauthor.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {coauthor.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{coauthor.name}</p>
                      <p className="text-xs text-muted-foreground">Sin coste</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">Gratis</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Separator />

          {/* Desglose de precio */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (21%)</span>
              <span>€{iva.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-600">€{communication.amount.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          {/* Incluye */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Incluye:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Acceso completo al congreso</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Certificado de participación</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Material del congreso</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>Acceso a grabaciones</span>
              </li>
              {coauthors.length > 0 && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>
                    Acceso para {coauthors.length} coautor{coauthors.length > 1 ? "es" : ""}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Información importante:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>El pago es único por comunicación</li>
                <li>Los coautores reciben acceso automáticamente</li>
                <li>Factura disponible tras el pago</li>
                <li>Política de cancelación: 30 días</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
