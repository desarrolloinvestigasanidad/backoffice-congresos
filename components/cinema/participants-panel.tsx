"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Participant {
  id: string
  name: string
  role: "moderator" | "speaker" | "user"
  status: "online" | "away" | "speaking"
  handRaised: boolean
  institution?: string
}

// Participantes simulados
const participants: Participant[] = [
  {
    id: "1",
    name: "Dr. Carlos Martínez",
    role: "speaker",
    status: "speaking",
    handRaised: false,
    institution: "Hospital Universitario La Paz",
  },
  {
    id: "2",
    name: "Dra. Elena Ruiz",
    role: "speaker",
    status: "online",
    handRaised: false,
    institution: "Hospital Gregorio Marañón",
  },
  {
    id: "3",
    name: "Dr. Javier López",
    role: "speaker",
    status: "online",
    handRaised: false,
    institution: "Hospital Ramón y Cajal",
  },
  {
    id: "4",
    name: "Dr. Moderador",
    role: "moderator",
    status: "online",
    handRaised: false,
    institution: "Comité Científico",
  },
  {
    id: "5",
    name: "María García",
    role: "user",
    status: "online",
    handRaised: true,
    institution: "Hospital Clínico San Carlos",
  },
  {
    id: "6",
    name: "Ana López",
    role: "user",
    status: "online",
    handRaised: false,
    institution: "Hospital 12 de Octubre",
  },
  {
    id: "7",
    name: "Pedro Sánchez",
    role: "user",
    status: "away",
    handRaised: false,
    institution: "Hospital La Fe",
  },
  {
    id: "8",
    name: "Carmen Vázquez",
    role: "user",
    status: "online",
    handRaised: false,
    institution: "Hospital Virgen del Rocío",
  },
  {
    id: "9",
    name: "Miguel Fernández",
    role: "user",
    status: "online",
    handRaised: true,
    institution: "Hospital de La Princesa",
  },
  {
    id: "10",
    name: "Laura Sánchez",
    role: "user",
    status: "online",
    handRaised: false,
    institution: "Hospital Universitario de Salamanca",
  },
]

export default function ParticipantsPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "speakers" | "hands-raised">("all")

  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.institution?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filter === "all" ||
      (filter === "speakers" && (participant.role === "speaker" || participant.role === "moderator")) ||
      (filter === "hands-raised" && participant.handRaised)

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "speaking":
        return "bg-blue-500 animate-pulse"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "En línea"
      case "away":
        return "Ausente"
      case "speaking":
        return "Hablando"
      default:
        return "Desconectado"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "moderator":
        return (
          <Badge variant="secondary" className="text-xs">
            Moderador
          </Badge>
        )
      case "speaker":
        return (
          <Badge variant="secondary" className="text-xs">
            Ponente
          </Badge>
        )
      default:
        return null
    }
  }

  const speakersCount = participants.filter((p) => p.role === "speaker" || p.role === "moderator").length
  const handsRaisedCount = participants.filter((p) => p.handRaised).length
  const onlineCount = participants.filter((p) => p.status === "online" || p.status === "speaking").length

  return (
    <div className="flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Participantes</h3>
          <span className="text-sm text-muted-foreground">{participants.length} total</span>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
          <div className="text-center">
            <div className="font-medium">{onlineCount}</div>
            <div className="text-muted-foreground">En línea</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{speakersCount}</div>
            <div className="text-muted-foreground">Ponentes</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{handsRaisedCount}</div>
            <div className="text-muted-foreground">Manos alzadas</div>
          </div>
        </div>

        {/* Búsqueda */}
        <Input
          placeholder="Buscar participante..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3"
        />

        {/* Filtros */}
        <div className="flex gap-1">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="flex-1 text-xs"
          >
            Todos
          </Button>
          <Button
            variant={filter === "speakers" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("speakers")}
            className="flex-1 text-xs"
          >
            Ponentes
          </Button>
          <Button
            variant={filter === "hands-raised" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("hands-raised")}
            className="flex-1 text-xs"
          >
            Manos ({handsRaisedCount})
          </Button>
        </div>
      </div>

      {/* Lista de participantes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredParticipants.map((participant) => (
          <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="text-sm">
                  {participant.name
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(participant.status)}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium truncate">{participant.name}</span>
                {getRoleBadge(participant.role)}
                {participant.handRaised && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                )}
              </div>
              <div className="text-xs text-muted-foreground truncate">{participant.institution}</div>
              <div className="text-xs text-muted-foreground">{getStatusText(participant.status)}</div>
            </div>

            {/* Acciones rápidas */}
            <div className="flex flex-col gap-1">
              {participant.role === "user" && (
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22 11 13 2 9z" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer con acciones */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Invitar
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Configurar
          </Button>
        </div>
      </div>
    </div>
  )
}
