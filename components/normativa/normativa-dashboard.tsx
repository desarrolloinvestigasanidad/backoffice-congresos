"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import NormativaCategory from "./normativa-category"
import NormativaSearch from "./normativa-search"
import NormativaNotifications from "./normativa-notifications"
import NormativaFAQ from "./normativa-faq"
import { FileText, Presentation, Shield, MapPin, Search, Bell, HelpCircle, Calendar, AlertCircle } from "lucide-react"

interface NormativaDashboardProps {
  data: any // Usar tipado completo en producción
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "FileText":
      return <FileText className="w-5 h-5" />
    case "Presentation":
      return <Presentation className="w-5 h-5" />
    case "Shield":
      return <Shield className="w-5 h-5" />
    case "MapPin":
      return <MapPin className="w-5 h-5" />
    default:
      return <FileText className="w-5 h-5" />
  }
}

const getCategoryColor = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 border-blue-200"
    case "green":
      return "bg-green-50 text-green-700 border-green-200"
    case "red":
      return "bg-red-50 text-red-700 border-red-200"
    case "purple":
      return "bg-purple-50 text-purple-700 border-purple-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
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

export default function NormativaDashboard({ data }: NormativaDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const totalItems = data.categories.reduce((acc: number, category: any) => acc + category.items.length, 0)
  const mandatoryItems = data.categories.reduce(
    (acc: number, category: any) => acc + category.items.filter((item: any) => item.mandatory).length,
    0,
  )
  const highPriorityItems = data.categories.reduce(
    (acc: number, category: any) => acc + category.items.filter((item: any) => item.priority === "high").length,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header con información del congreso */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">{data.congress.name}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {data.congress.dates}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.congress.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700">Activo</Badge>
              <div className="text-sm text-muted-foreground">Última actualización: {formatDate(data.lastUpdated)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
            <div className="text-sm text-muted-foreground">Total Normativas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{mandatoryItems}</div>
            <div className="text-sm text-muted-foreground">Obligatorias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{highPriorityItems}</div>
            <div className="text-sm text-muted-foreground">Alta Prioridad</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{data.categories.length}</div>
            <div className="text-sm text-muted-foreground">Categorías</div>
          </CardContent>
        </Card>
      </div>

      {/* Notificaciones importantes */}
      {data.notifications.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800 mb-2">Actualizaciones Recientes</h3>
                <div className="space-y-2">
                  {data.notifications.slice(0, 2).map((notification: any) => (
                    <div key={notification.id} className="text-sm text-yellow-700">
                      <strong>{notification.title}:</strong> {notification.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navegación por tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Buscar</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Avisos</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">FAQ</span>
          </TabsTrigger>
        </TabsList>

        {/* Resumen por categorías */}
        <TabsContent value="overview" className="space-y-6 pt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {data.categories.map((category: any) => (
              <Card key={category.id} className={`border-2 ${getCategoryColor(category.color)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {getCategoryIcon(category.icon)}
                    <div>
                      <h3 className="text-lg">{category.name}</h3>
                      <p className="text-sm font-normal opacity-80">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.slice(0, 2).map((item: any) => (
                      <div key={item.id} className="p-3 bg-white/50 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{item.title}</h4>
                          <div className="flex gap-1">
                            {item.mandatory && (
                              <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                                Obligatorio
                              </Badge>
                            )}
                            {item.priority === "high" && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                                Alta Prioridad
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs opacity-75 line-clamp-2">{item.content.substring(0, 100)}...</p>
                      </div>
                    ))}
                    {category.items.length > 2 && (
                      <div className="text-center">
                        <Button variant="outline" size="sm" className="text-xs">
                          Ver {category.items.length - 2} más
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sección detallada por categoría */}
          <div className="space-y-6">
            {data.categories.map((category: any) => (
              <NormativaCategory key={category.id} category={category} />
            ))}
          </div>
        </TabsContent>

        {/* Búsqueda */}
        <TabsContent value="search" className="space-y-6 pt-6">
          <NormativaSearch categories={data.categories} />
        </TabsContent>

        {/* Notificaciones */}
        <TabsContent value="notifications" className="space-y-6 pt-6">
          <NormativaNotifications notifications={data.notifications} />
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-6 pt-6">
          <NormativaFAQ faqs={data.faqs} categories={data.categories} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
