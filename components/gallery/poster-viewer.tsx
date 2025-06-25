"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: string
  user: string
  text: string
  timestamp: string
}

interface Poster {
  id: string
  title: string
  author: string
  institution: string
  pdfUrl: string
  thumbnailUrl: string
  abstract: string
  keywords: string[]
  views: number
  downloads: number
  rating: number
  comments: Comment[]
}

interface PosterViewerProps {
  poster: Poster
}

export default function PosterViewer({ poster }: PosterViewerProps) {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [newComment, setNewComment] = useState("")

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360)
  }

  const handleZoom = (factor: number) => {
    setZoom((prev) => Math.max(0.5, Math.min(3, prev + factor)))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">{poster.title}</h1>
          <p className="text-muted-foreground">
            {poster.author} - {poster.institution}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descargar PDF
          </Button>
          <Button variant="outline" size="sm">
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
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visor de PDF */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Visualizador de Poster</CardTitle>
            <CardDescription>Utiliza los controles para ajustar la visualización</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-full h-[600px] bg-muted rounded-md overflow-hidden mb-4">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <iframe
                  src="/placeholder.svg?height=800&width=600"
                  className="w-full h-full border-0"
                  title={poster.title}
                />
              </div>
            </div>
            <div className="flex justify-center gap-2 w-full">
              <Button variant="outline" size="sm" onClick={() => handleRotate(-90)}>
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
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleRotate(90)}>
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
                >
                  <path d="M21 12a9 9 0 1 0-9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M21 21v-5h-5" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleZoom(0.1)}>
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleZoom(-0.1)}>
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
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setRotation(0)
                  setZoom(1)
                }}
              >
                Restablecer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información y comentarios */}
        <Card className="lg:col-span-1">
          <Tabs defaultValue="info">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="comments">Comentarios</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-4">
              <TabsContent value="info" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Resumen</h3>
                  <p className="text-sm text-muted-foreground">{poster.abstract}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Palabras clave</h3>
                  <div className="flex flex-wrap gap-2">
                    {poster.keywords.map((keyword, i) => (
                      <Badge key={i} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium">Visualizaciones</p>
                    <p className="text-muted-foreground">{poster.views}</p>
                  </div>
                  <div>
                    <p className="font-medium">Descargas</p>
                    <p className="text-muted-foreground">{poster.downloads}</p>
                  </div>
                  <div>
                    <p className="font-medium">Valoración</p>
                    <p className="text-muted-foreground">★ {poster.rating.toFixed(1)}/5.0</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="comments" className="space-y-4">
                <div className="space-y-4">
                  {poster.comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{comment.user}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</p>
                        </div>
                      </div>
                      <p className="text-sm pl-10">{comment.text}</p>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <textarea
                    className="w-full p-2 text-sm border rounded-md"
                    rows={3}
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button className="mt-2" size="sm">
                    Enviar comentario
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
