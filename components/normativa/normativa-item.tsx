"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Calendar, Tag, AlertCircle, CheckCircle, Download, ExternalLink } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface NormativaItemProps {
  item: any // Usar tipado completo en producción
  categoryColor: string
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-700">
          <AlertCircle className="w-3 h-3 mr-1" />
          Alta Prioridad
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          Prioridad Media
        </Badge>
      )
    case "low":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Prioridad Baja
        </Badge>
      )
    default:
      return null
  }
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

export default function NormativaItem({ item, categoryColor }: NormativaItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors pb-3">
            <CardTitle className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                  <div className="flex gap-1 flex-wrap">
                    {item.mandatory && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Obligatorio
                      </Badge>
                    )}
                    {getPriorityBadge(item.priority)}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Actualizado: {formatDate(item.lastUpdated)}
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {item.tags.slice(0, 2).join(", ")}
                      {item.tags.length > 2 && ` +${item.tags.length - 2}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Contenido de la normativa */}
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-primary">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-primary">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold mb-2">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3">{children}</ol>,
                    p: ({ children }) => <p className="mb-3 text-sm leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                  }}
                >
                  {item.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <span className="text-sm font-medium text-muted-foreground">Etiquetas:</span>
                  {item.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Acciones */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Enlace Directo
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
