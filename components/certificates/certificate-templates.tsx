"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Star, Download, Eye } from "lucide-react"

// Datos simulados
const templateCategories = ["Todos", "Profesional", "Académico", "Premium", "Clásico"]

const templates = [
  {
    id: 1,
    name: "Moderno Azul",
    category: "Profesional",
    isPremium: false,
    downloads: 1245,
    rating: 4.5,
    colors: ["#1E40AF", "#DBEAFE", "#1E3A8A"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Elegante Dorado",
    category: "Premium",
    isPremium: true,
    downloads: 876,
    rating: 4.8,
    colors: ["#92400E", "#FEF3C7", "#78350F"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Premium Púrpura",
    category: "Premium",
    isPremium: true,
    downloads: 654,
    rating: 4.7,
    colors: ["#6D28D9", "#EDE9FE", "#5B21B6"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Clásico Verde",
    category: "Clásico",
    isPremium: false,
    downloads: 1532,
    rating: 4.3,
    colors: ["#047857", "#D1FAE5", "#065F46"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Académico Rojo",
    category: "Académico",
    isPremium: false,
    downloads: 987,
    rating: 4.2,
    colors: ["#B91C1C", "#FEE2E2", "#991B1B"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Minimalista Gris",
    category: "Profesional",
    isPremium: false,
    downloads: 765,
    rating: 4.0,
    colors: ["#4B5563", "#F3F4F6", "#374151"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
]

export default function CertificateTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Plantillas de Certificados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar plantillas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Cuadrícula
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                Lista
              </Button>
            </div>
          </div>

          <Tabs defaultValue="Todos" className="space-y-6">
            <TabsList className="flex flex-wrap">
              {templateCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="flex-1"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={template.previewUrl || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        {template.isPremium && (
                          <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800">Premium</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{template.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{template.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Download className="h-3 w-3 mr-1" />
                            {template.downloads}
                          </div>
                        </div>
                        <div className="flex gap-1 mt-3">
                          {template.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" /> Vista Previa
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="h-4 w-4 mr-1" /> Usar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 relative flex-shrink-0">
                            <img
                              src={template.previewUrl || "/placeholder.svg"}
                              alt={template.name}
                              className="w-full h-full object-cover rounded"
                            />
                            {template.isPremium && (
                              <Badge className="absolute -top-2 -right-2 bg-amber-100 text-amber-800">P</Badge>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{template.name}</h3>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm">{template.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{template.category}</Badge>
                              <div className="flex items-center text-sm text-gray-500">
                                <Download className="h-3 w-3 mr-1" />
                                {template.downloads}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {template.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
