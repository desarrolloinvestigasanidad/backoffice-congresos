"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Tipos
interface Video {
  id: string
  title: string
  presenter: string
  institution: string
  thumbnailUrl: string
  duration: string
  date: string
  views: number
  likes: number
  tags: string[]
}

// Datos simulados
const videosData: Video[] = [
  {
    id: "1",
    title: "Avances en Neurología 2023",
    presenter: "Dr. Alberto Fernández",
    institution: "Hospital Clínico San Carlos",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "18:45",
    date: "2023-04-12",
    views: 312,
    likes: 87,
    tags: ["neurología", "diagnóstico", "investigación"],
  },
  {
    id: "2",
    title: "Nuevos enfoques en Cardiología Intervencionista",
    presenter: "Dra. Elena Martín",
    institution: "Hospital Gregorio Marañón",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "24:10",
    date: "2023-03-28",
    views: 278,
    likes: 65,
    tags: ["cardiología", "intervención", "técnicas"],
  },
  {
    id: "3",
    title: "Actualización en tratamientos oncológicos",
    presenter: "Dr. Roberto Sánchez",
    institution: "Hospital Universitario La Fe",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "32:05",
    date: "2023-05-02",
    views: 245,
    likes: 72,
    tags: ["oncología", "tratamiento", "investigación"],
  },
  {
    id: "4",
    title: "Cirugía robótica: presente y futuro",
    presenter: "Dra. Carmen Vázquez",
    institution: "Hospital Universitario Virgen del Rocío",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "27:30",
    date: "2023-04-18",
    views: 198,
    likes: 54,
    tags: ["cirugía", "robótica", "innovación"],
  },
  {
    id: "5",
    title: "Avances en diagnóstico por imagen en neurología",
    presenter: "Dr. Javier Ruiz",
    institution: "Hospital Universitario La Paz",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "21:15",
    date: "2023-03-15",
    views: 267,
    likes: 81,
    tags: ["neurología", "diagnóstico", "imagen"],
  },
  {
    id: "6",
    title: "Nuevas terapias en enfermedades autoinmunes",
    presenter: "Dra. Lucía Martínez",
    institution: "Hospital Universitario Ramón y Cajal",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    duration: "29:45",
    date: "2023-05-10",
    views: 223,
    likes: 68,
    tags: ["inmunología", "terapia", "autoinmune"],
  },
]

interface VideoGalleryProps {
  filter: string
  searchQuery: string
  limit?: number
}

export default function VideoGallery({ filter, searchQuery, limit }: VideoGalleryProps) {
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])

  useEffect(() => {
    let result = [...videosData]

    // Aplicar filtro por especialidad
    if (filter && filter !== "all") {
      result = result.filter((video) => video.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())))
    }

    // Aplicar búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.presenter.toLowerCase().includes(query) ||
          video.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Aplicar límite si existe
    if (limit) {
      result = result.slice(0, limit)
    }

    setFilteredVideos(result)
  }, [filter, searchQuery, limit])

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No se encontraron videos que coincidan con tu búsqueda</h3>
        <p className="text-muted-foreground mt-2">Intenta con otros términos o filtros</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <Card key={video.id} className="overflow-hidden flex flex-col">
          <div className="relative h-[180px] bg-muted">
            <Image src={video.thumbnailUrl || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground mb-1">{video.presenter}</p>
            <p className="text-xs text-muted-foreground mb-3">{video.institution}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {video.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{video.views} visualizaciones</span>
              <span>{video.likes} me gusta</span>
              <span>{video.date}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/plataforma/galeria/video/${video.id}`} className="w-full">
              <Button variant="default" className="w-full">
                Ver Video
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
