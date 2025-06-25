import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Video,
  Presentation,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Building,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  History,
  MessageSquare,
  FileIcon,
  Edit,
  Send,
} from "lucide-react"

interface CommunicationDetailProps {
  communication: any // Usar tipado completo en producción
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return (
        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Borrador
        </Badge>
      )
    case "submitted":
      return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          Enviada
        </Badge>
      )
    case "review":
      return (
        <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
          <Clock className="w-3 h-3 mr-1" />
          En revisión
        </Badge>
      )
    case "accepted":
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aceptada
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Rechazada
        </Badge>
      )
    default:
      return <Badge variant="secondary">Desconocido</Badge>
  }
}

const getPaymentBadge = (paymentStatus: string) => {
  switch (paymentStatus) {
    case "paid":
      return (
        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Pagado
        </Badge>
      )
    case "pending":
      return (
        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <CreditCard className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Fallido
        </Badge>
      )
    default:
      return null
  }
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

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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

export default function CommunicationDetail({ communication }: CommunicationDetailProps) {
  const principalAuthor = communication.authors.find((author: any) => author.role === "principal")
  const coauthors = communication.authors.filter((author: any) => author.role === "coautor")

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">{getTypeIcon(communication.type)}</div>
                <h2 className="text-2xl font-bold">{communication.title}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(communication.updatedAt)}
                </div>
                <div className="flex items-center gap-1">
                  {getTypeIcon(communication.type)}
                  {getTypeLabel(communication.type)}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {communication.authors.length} autor{communication.authors.length > 1 ? "es" : ""}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(communication.status)}
                {getPaymentBadge(communication.paymentStatus)}
                <Badge variant="outline">{communication.category}</Badge>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-right mb-2">
                <div className="text-sm text-muted-foreground">Congreso</div>
                <div className="font-medium">{communication.congress.name}</div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{communication.congress.dates}</span>
                <MapPin className="w-4 h-4 text-muted-foreground ml-2" />
                <span>{communication.congress.location}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">
            <FileText className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Detalles</span>
          </TabsTrigger>
          <TabsTrigger value="authors">
            <Users className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Autores</span>
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileIcon className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Archivos</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Historial</span>
          </TabsTrigger>
        </TabsList>

        {/* Detalles */}
        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Resumen</h3>
                <p className="text-muted-foreground">{communication.abstract}</p>
              </div>

              {communication.keywords && (
                <div>
                  <h3 className="font-semibold mb-2">Palabras Clave</h3>
                  <div className="flex flex-wrap gap-2">
                    {communication.keywords.split(",").map((keyword: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {keyword.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {communication.status === "accepted" && communication.presentationDetails && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Detalles de Presentación</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <Calendar className="w-4 h-4" />
                      <span>Fecha: {communication.presentationDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <Clock className="w-4 h-4" />
                      <span>Hora: {communication.presentationDetails.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <MapPin className="w-4 h-4" />
                      <span>Sala: {communication.presentationDetails.room}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <User className="w-4 h-4" />
                      <span>Moderador: {communication.presentationDetails.chairperson}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comentarios de revisión */}
          {communication.reviewComments && communication.reviewComments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Comentarios de Revisión
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {communication.reviewComments
                  .filter((comment: any) => comment.isPublic)
                  .map((comment: any, index: number) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {comment.reviewer
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{comment.reviewer}</h4>
                            <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-sm">{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Autores */}
        <TabsContent value="authors" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Autores</span>
                <Badge variant="secondary">{communication.authors.length} autor(es)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Autor Principal */}
              {principalAuthor && (
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {principalAuthor.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{principalAuthor.name}</h3>
                        <Badge className="bg-primary text-primary-foreground">Autor Principal</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {principalAuthor.email}
                        </div>
                        {principalAuthor.institution && (
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {principalAuthor.institution}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">
                        {communication.paymentStatus === "paid" ? "Pagado" : "€8.00"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {communication.paymentStatus === "paid" ? "Completado" : "Pago requerido"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Coautores */}
              {coauthors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Coautores</h4>
                  {coauthors.map((author: any) => (
                    <div key={author.id} className="p-4 bg-muted/30 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {author.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{author.name}</h3>
                            <Badge variant="outline">Coautor</Badge>
                            {author.isRegistered && (
                              <Badge variant="secondary" className="bg-green-50 text-green-700">
                                Registrado
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {author.email}
                            </div>
                            {author.institution && (
                              <div className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {author.institution}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">Gratis</div>
                          <div className="text-xs text-muted-foreground">Sin coste</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Archivos */}
        <TabsContent value="files" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Archivos</span>
                <Badge variant="secondary">
                  {Object.keys(communication.files).length} archivo
                  {Object.keys(communication.files).length !== 1 ? "s" : ""}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(communication.files).map(([key, file]: [string, any]) => {
                let icon
                let bgColor
                let textColor

                switch (key) {
                  case "abstract":
                    icon = <FileText className="w-5 h-5" />
                    bgColor = "bg-blue-50"
                    textColor = "text-blue-700"
                    break
                  case "poster":
                    icon = <FileText className="w-5 h-5" />
                    bgColor = "bg-purple-50"
                    textColor = "text-purple-700"
                    break
                  case "video":
                    icon = <Video className="w-5 h-5" />
                    bgColor = "bg-red-50"
                    textColor = "text-red-700"
                    break
                  case "presentation":
                    icon = <Presentation className="w-5 h-5" />
                    bgColor = "bg-green-50"
                    textColor = "text-green-700"
                    break
                  default:
                    icon = <FileIcon className="w-5 h-5" />
                    bgColor = "bg-gray-50"
                    textColor = "text-gray-700"
                }

                return (
                  <div key={key} className={`p-4 ${bgColor} rounded-lg border flex items-center gap-4`}>
                    <div className={`p-3 bg-white/50 rounded-full ${textColor}`}>{icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${textColor} capitalize`}>{key}</h4>
                      <p className="text-sm text-muted-foreground">{file.name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{formatFileSize(file.size)}</span>
                        <span>Subido: {formatDate(file.uploadedAt)}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                )
              })}

              {Object.keys(communication.files).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay archivos disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historial */}
        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Historial de Cambios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-muted space-y-6">
                {communication.history.map((event: any, index: number) => {
                  let icon
                  let bgColor
                  let textColor

                  switch (event.action) {
                    case "created":
                      icon = <FileText className="w-4 h-4" />
                      bgColor = "bg-blue-100"
                      textColor = "text-blue-700"
                      break
                    case "updated":
                      icon = <Edit className="w-4 h-4" />
                      bgColor = "bg-yellow-100"
                      textColor = "text-yellow-700"
                      break
                    case "files_uploaded":
                      icon = <FileIcon className="w-4 h-4" />
                      bgColor = "bg-purple-100"
                      textColor = "text-purple-700"
                      break
                    case "submitted":
                      icon = <Send className="w-4 h-4" />
                      bgColor = "bg-green-100"
                      textColor = "text-green-700"
                      break
                    case "payment_completed":
                      icon = <CreditCard className="w-4 h-4" />
                      bgColor = "bg-green-100"
                      textColor = "text-green-700"
                      break
                    case "accepted":
                      icon = <CheckCircle className="w-4 h-4" />
                      bgColor = "bg-green-100"
                      textColor = "text-green-700"
                      break
                    case "rejected":
                      icon = <XCircle className="w-4 h-4" />
                      bgColor = "bg-red-100"
                      textColor = "text-red-700"
                      break
                    default:
                      icon = <History className="w-4 h-4" />
                      bgColor = "bg-gray-100"
                      textColor = "text-gray-700"
                  }

                  return (
                    <div key={index} className="relative">
                      <div
                        className={`absolute -left-10 p-2 rounded-full ${bgColor} ${textColor} border-4 border-background`}
                      >
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{event.user}</h4>
                          <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                        </div>
                        <p className="text-sm">{event.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
