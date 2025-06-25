"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NormativaItem from "./normativa-item"
import { Search, Filter, X } from "lucide-react"

interface NormativaSearchProps {
  categories: any[] // Usar tipado completo en producción
}

export default function NormativaSearch({ categories }: NormativaSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [mandatoryOnly, setMandatoryOnly] = useState(false)

  // Aplanar todos los items de todas las categorías
  const allItems = useMemo(() => {
    return categories.flatMap((category) =>
      category.items.map((item: any) => ({
        ...item,
        categoryId: category.id,
        categoryName: category.name,
        categoryColor: category.color,
      })),
    )
  }, [categories])

  // Filtrar items basado en los criterios de búsqueda
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Filtro de texto
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Filtro de categoría
      const matchesCategory = selectedCategory === "all" || item.categoryId === selectedCategory

      // Filtro de prioridad
      const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority

      // Filtro de obligatorio
      const matchesMandatory = !mandatoryOnly || item.mandatory

      return matchesSearch && matchesCategory && matchesPriority && matchesMandatory
    })
  }, [allItems, searchQuery, selectedCategory, selectedPriority, mandatoryOnly])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedPriority("all")
    setMandatoryOnly(false)
  }

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "all" || selectedPriority !== "all" || mandatoryOnly

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Normativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Búsqueda por texto */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por título, contenido o etiquetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioridad</label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las prioridades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las prioridades</SelectItem>
                  <SelectItem value="high">Alta Prioridad</SelectItem>
                  <SelectItem value="medium">Prioridad Media</SelectItem>
                  <SelectItem value="low">Prioridad Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Button
                variant={mandatoryOnly ? "default" : "outline"}
                onClick={() => setMandatoryOnly(!mandatoryOnly)}
                className="w-full justify-start"
              >
                <Filter className="w-4 h-4 mr-2" />
                Solo Obligatorias
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Acciones</label>
              <Button variant="outline" onClick={clearFilters} disabled={!hasActiveFilters} className="w-full">
                <X className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Filtros activos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm font-medium text-muted-foreground">Filtros activos:</span>
              {searchQuery && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Texto: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Categoría: {categories.find((c) => c.id === selectedCategory)?.name}
                </Badge>
              )}
              {selectedPriority !== "all" && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Prioridad: {selectedPriority}
                </Badge>
              )}
              {mandatoryOnly && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  Solo Obligatorias
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Resultados de Búsqueda</span>
            <Badge variant="secondary">{filteredItems.length} normativas encontradas</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={`${item.categoryId}-${item.id}`} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {item.categoryName}
                    </Badge>
                  </div>
                  <NormativaItem item={item} categoryColor={item.categoryColor} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No se encontraron resultados</p>
              <p className="text-sm">
                {hasActiveFilters
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Introduce términos de búsqueda para encontrar normativas"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
