"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export default function CommunicationFilters() {
  return (
    <div className="flex gap-2">
      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="draft">Borrador</SelectItem>
          <SelectItem value="submitted">Enviada</SelectItem>
          <SelectItem value="review">En revisión</SelectItem>
          <SelectItem value="accepted">Aceptada</SelectItem>
          <SelectItem value="rejected">Rechazada</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="poster">Poster</SelectItem>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="oral">Comunicación Oral</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Congreso" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="congreso-2025">Congreso 2025</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm">
        <Filter className="w-4 h-4 mr-2" />
        Filtros
      </Button>
    </div>
  )
}
