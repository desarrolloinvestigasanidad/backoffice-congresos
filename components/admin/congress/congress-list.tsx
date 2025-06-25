"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Edit, Eye, Trash2, Copy, Settings, Calendar, MapPin, Users, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CongressListProps {
  searchTerm: string
}

export function CongressList({ searchTerm }: CongressListProps) {
  const [congresses] = useState([
    {
      id: 1,
      title: "XV Congreso Internacional de Medicina",
      description: "Avances en medicina moderna y tecnología sanitaria",
      status: "active",
      startDate: "2024-03-15",
      endDate: "2024-03-18",
      location: "Madrid, España",
      participants: 450,
      maxParticipants: 500,
      category: "Medicina",
      organizer: "Dr. María González",
    },
    {
      id: 2,
      title: "Simposio de Inteligencia Artificial",
      description: "IA aplicada a la investigación científica",
      status: "upcoming",
      startDate: "2024-04-20",
      endDate: "2024-04-22",
      location: "Barcelona, España",
      participants: 280,
      maxParticipants: 300,
      category: "Tecnología",
      organizer: "Prof. Carlos Ruiz",
    },
    {
      id: 3,
      title: "Congreso de Sostenibilidad Ambiental",
      description: "Soluciones innovadoras para el cambio climático",
      status: "draft",
      startDate: "2024-05-10",
      endDate: "2024-05-12",
      location: "Valencia, España",
      participants: 0,
      maxParticipants: 400,
      category: "Medio Ambiente",
      organizer: "Dra. Ana Martín",
    },
    {
      id: 4,
      title: "Jornadas de Educación Digital",
      description: "Transformación digital en el ámbito educativo",
      status: "finished",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      location: "Sevilla, España",
      participants: 320,
      maxParticipants: 350,
      category: "Educación",
      organizer: "Prof. Luis Fernández",
    },
  ])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Activo", variant: "default" as const },
      upcoming: { label: "Próximo", variant: "secondary" as const },
      draft: { label: "Borrador", variant: "outline" as const },
      finished: { label: "Finalizado", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredCongresses = congresses.filter(
    (congress) =>
      congress.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      congress.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      congress.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {filteredCongresses.map((congress) => (
        <Card key={congress.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{congress.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{congress.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(congress.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{congress.startDate}</p>
                  <p className="text-muted-foreground">hasta {congress.endDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{congress.location}</p>
                  <p className="text-muted-foreground">Ubicación</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">
                    {congress.participants}/{congress.maxParticipants}
                  </p>
                  <p className="text-muted-foreground">Participantes</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{congress.organizer}</p>
                  <p className="text-muted-foreground">Organizador</p>
                </div>
              </div>
            </div>

            {congress.maxParticipants > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Ocupación</span>
                  <span>{Math.round((congress.participants / congress.maxParticipants) * 100)}%</span>
                </div>
                <Progress value={(congress.participants / congress.maxParticipants) * 100} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {filteredCongresses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No se encontraron congresos que coincidan con la búsqueda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
