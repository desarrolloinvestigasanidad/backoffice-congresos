"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Settings, Download, Upload, BarChart3 } from "lucide-react"
import { CongressList } from "./congress-list"
import { CongressForm } from "./congress-form"
import { CongressStats } from "./congress-stats"
import { CongressCalendar } from "./congress-calendar"

export function CongressManagement() {
  const [activeTab, setActiveTab] = useState("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar congresos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Congreso
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <CongressStats />

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <CongressList searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <CongressCalendar />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics de Congresos
                </CardTitle>
                <CardDescription>Métricas detalladas y reportes de rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dashboard de analytics en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración Global
                </CardTitle>
                <CardDescription>Configuraciones generales para todos los congresos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Panel de configuración en desarrollo...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de formulario */}
      {showForm && (
        <CongressForm
          onClose={() => setShowForm(false)}
          onSave={() => {
            setShowForm(false)
            // Refrescar lista
          }}
        />
      )}
    </div>
  )
}
