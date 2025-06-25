import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  FileText,
  Video,
  Presentation,
  Edit,
  Eye,
  Users,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface Author {
  id: number
  name: string
  role: "principal" | "coautor"
  email: string
}

interface Communication {
  id: number
  title: string
  type: "poster" | "video" | "oral"
  status: "draft" | "submitted" | "review" | "accepted" | "rejected"
  createdAt: string
  updatedAt: string
  authors: Author[]
  congress: string
  paymentStatus: "pending" | "paid" | "failed"
  files: Record<string, string | null>
}

interface CommunicationCardProps {
  communication: Communication
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

export default function CommunicationCard({ communication }: CommunicationCardProps) {
  const principalAuthor = communication.authors.find((author) => author.role === "principal")
  const coauthors = communication.authors.filter((author) => author.role === "coautor")

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">{getTypeIcon(communication.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">{communication.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{communication.congress}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Actualizado: {new Date(communication.updatedAt).toLocaleDateString("es-ES")}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {getStatusBadge(communication.status)}
            {getPaymentBadge(communication.paymentStatus)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Tipo */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {getTypeIcon(communication.type)}
              {getTypeLabel(communication.type)}
            </div>

            {/* Autores */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                {communication.authors.length} autor{communication.authors.length > 1 ? "es" : ""}
              </span>
            </div>

            {/* Archivos */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>
                {Object.values(communication.files).filter(Boolean).length} archivo
                {Object.values(communication.files).filter(Boolean).length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href={`/plataforma/comunicaciones/${communication.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Ver
              </Button>
            </Link>
            {communication.status === "draft" && (
              <Link href={`/plataforma/comunicaciones/${communication.id}/editar`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Authors Preview */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Autores:</span>
            <div className="flex items-center gap-2">
              {principalAuthor && (
                <div className="flex items-center gap-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {principalAuthor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{principalAuthor.name}</span>
                  <Badge variant="outline" className="text-xs">
                    Principal
                  </Badge>
                </div>
              )}
              {coauthors.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  + {coauthors.length} coautor{coauthors.length > 1 ? "es" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
