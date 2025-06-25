"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Users,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Settings,
  FileText,
  Download,
} from "lucide-react"

interface CongressListProps {
  searchTerm: string
}

export function CongressList({ searchTerm }: CongressListProps) {
  const [congresses] = useState([
    {
      id: 1,
      name: "Congreso Internacional de Medicina 2024",
      description: "Avances en medicina moderna y tecnología sanitaria",
      status: "active",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      location: "Madrid, España",
      participants: 450,
      maxParticipants: 500,
      organizer: "Dr. María González",
      image: "/placeholder.svg?height=60&width=60",
      categories: ["Medicina", "Tecnología"],
      price: 299,
    },
    {
      id: 2,
      name: "Simposio de Inteligencia Artificial",
      description: "El futuro de la IA en diferentes industrias",
      status: "upcoming",
      startDate: "2024-04-20",
      endDate: "2024-04-22",
      location: "Barcelona, España",
      participants: 320,
      maxParticipants: 400,
      organizer: "Prof. Carlos Ruiz",
      image: "/placeholder.svg?height=60&width=60",
      categories: ["Tecnología", "IA"],
      price: 199,
    },
    {
      id: 3,
      name: "Conferencia de Sostenibilidad",
      description: "Estrategias para un futuro sostenible",
      status: "completed",
      startDate: "2024-02-10",
      endDate: "2024-02-12",
      location: "Valencia, España",
      participants: 280,
      maxParticipants: 300,
      organizer: "Dra. Ana Martín",
      image: "/placeholder.svg?height=60&width=60",
      categories: ["Sostenibilidad", "Medio Ambiente"],
      price: 149,
    },
    {
      id: 4,
      name: "Congreso de Educación Digital",
      description: "Transformación digital en la educación",
      status: "draft",
      startDate: "2024-05-15",
      endDate: "2024-05-17",
      location: "Sevilla, España",
      participants: 0,
      maxParticipants: 350,
      organizer: "Prof. Luis Hernández",
      image: "/placeholder.svg?height=60&width=60",
      categories: ["Educación", "Digital"],
      price: 179,
    },
  ])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", variant: "default" as const },
      upcoming: { label: "Próximo", variant: "secondary" as const },
      completed: { label: "Finalizado", variant: "outline" as const },
      draft: { label: "Borrador", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredCongresses = congresses.filter(
    (congress) =>
      congress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      congress.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      congress.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {filteredCongresses.map((congress) => (
        <Card key={congress.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Imagen del congreso */}
              <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage src={congress.image || "/placeholder.svg"} alt={congress.name} />
                <AvatarFallback className="rounded-lg">
                  {congress.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              {/* Información principal */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{congress.name}</h3>
                    <p className="text-muted-foreground text-sm">{congress.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(congress.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Reportes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Exportar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Categorías */}
                <div className="flex gap-1">
                  {congress.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                {/* Información adicional */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {congress.startDate} - {congress.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{congress.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {congress.participants}/{congress.maxParticipants} participantes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">€{congress.price}</span>
                    <span>por persona</span>
                  </div>
                </div>

                {/* Organizador */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Organizador:</span>
                    <span className="font-medium">{congress.organizer}</span>
                  </div>

                  {/* Barra de progreso de participantes */}
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${(congress.participants / congress.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((congress.participants / congress.maxParticipants) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredCongresses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No se encontraron congresos que coincidan con la búsqueda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
