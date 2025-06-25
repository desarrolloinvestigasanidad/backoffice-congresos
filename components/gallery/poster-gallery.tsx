"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Tipos
interface Poster {
  id: string
  title: string
  author: string
  institution: string
  thumbnailUrl: string
  keywords: string[]
  views: number
  downloads: number
  rating: number
}

// Datos simulados
const postersData: Poster[] = [
  {
    id: "1",
    title: "Avances en tratamientos oncológicos personalizados",
    author: "Dra. María Rodríguez",
    institution: "Hospital Universitario La Paz",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["oncología", "medicina personalizada", "genética"],
    views: 245,
    downloads: 78,
    rating: 4.7,
  },
  {
    id: "2",
    title: "Nuevas técnicas quirúrgicas mínimamente invasivas",
    author: "Dr. Carlos Martínez",
    institution: "Clínica Universitaria de Navarra",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["cirugía", "mínimamente invasiva", "recuperación"],
    views: 189,
    downloads: 56,
    rating: 4.5,
  },
  {
    id: "3",
    title: "Biomarcadores en enfermedades cardiovasculares",
    author: "Dr. Javier López",
    institution: "Hospital Ramón y Cajal",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["cardiología", "biomarcadores", "diagnóstico"],
    views: 210,
    downloads: 62,
    rating: 4.3,
  },
  {
    id: "4",
    title: "Aplicación de la inteligencia artificial en radiología",
    author: "Dra. Laura Sánchez",
    institution: "Hospital 12 de Octubre",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["radiología", "inteligencia artificial", "diagnóstico"],
    views: 278,
    downloads: 95,
    rating: 4.8,
  },
  {
    id: "5",
    title: "Nuevos enfoques en el tratamiento del Parkinson",
    author: "Dr. Miguel Fernández",
    institution: "Hospital Universitario de La Princesa",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["neurología", "Parkinson", "tratamiento"],
    views: 156,
    downloads: 48,
    rating: 4.2,
  },
  {
    id: "6",
    title: "Avances en terapias génicas para enfermedades raras",
    author: "Dra. Ana Gómez",
    institution: "Centro Nacional de Investigaciones Oncológicas",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    keywords: ["genética", "enfermedades raras", "terapia"],
    views: 198,
    downloads: 73,
    rating: 4.6,
  },
]

interface PosterGalleryProps {
  filter: string
  searchQuery: string
  limit?: number
}

export default function PosterGallery({ filter, searchQuery, limit }: PosterGalleryProps) {
  const [filteredPosters, setFilteredPosters] = useState<Poster[]>([])

  useEffect(() => {
    let result = [...postersData]

    // Aplicar filtro por especialidad
    if (filter && filter !== "all") {
      result = result.filter((poster) =>
        poster.keywords.some((keyword) => keyword.toLowerCase().includes(filter.toLowerCase())),
      )
    }

    // Aplicar búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (poster) =>
          poster.title.toLowerCase().includes(query) ||
          poster.author.toLowerCase().includes(query) ||
          poster.keywords.some((keyword) => keyword.toLowerCase().includes(query)),
      )
    }

    // Aplicar límite si existe
    if (limit) {
      result = result.slice(0, limit)
    }

    setFilteredPosters(result)
  }, [filter, searchQuery, limit])

  if (filteredPosters.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No se encontraron posters que coincidan con tu búsqueda</h3>
        <p className="text-muted-foreground mt-2">Intenta con otros términos o filtros</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPosters.map((poster) => (
        <Card key={poster.id} className="overflow-hidden flex flex-col">
          <div className="relative h-[300px] bg-muted">
            <Image src={poster.thumbnailUrl || "/placeholder.svg"} alt={poster.title} fill className="object-cover" />
          </div>
          <CardContent className="p-4 flex-grow">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2">{poster.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{poster.author}</p>
            <p className="text-xs text-muted-foreground mb-3">{poster.institution}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {poster.keywords.map((keyword, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{poster.views} visualizaciones</span>
              <span>{poster.downloads} descargas</span>
              <span>★ {poster.rating.toFixed(1)}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/plataforma/galeria/poster/${poster.id}`} className="w-full">
              <Button variant="default" className="w-full">
                Ver Poster
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
