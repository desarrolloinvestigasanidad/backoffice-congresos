"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, Palette, Settings, MapPin } from "lucide-react"

interface Point {
  x: number
  y: number
}

interface ImageButton {
  id: number
  label: string
  href: string
  shape: "rectangle" | "circle" | "polygon"
  coordinates: Point[]
  variant: "primary" | "secondary" | "accent" | "outline"
  active: boolean
  showLabel: boolean
  labelPosition: "center" | "top" | "bottom" | "left" | "right"
}

interface ButtonPropertiesFormProps {
  button: ImageButton
  onUpdate: (button: ImageButton) => void
}

export default function ButtonPropertiesForm({ button, onUpdate }: ButtonPropertiesFormProps) {
  const [localButton, setLocalButton] = useState<ImageButton>(button)

  // Actualizar el estado local cuando cambia el botón seleccionado
  useEffect(() => {
    setLocalButton(button)
  }, [button])

  // Actualizar un campo específico
  const updateField = <K extends keyof ImageButton>(field: K, value: ImageButton[K]) => {
    const updatedButton = {
      ...localButton,
      [field]: value,
    }
    setLocalButton(updatedButton)
    onUpdate(updatedButton)
  }

  // Actualizar coordenadas específicas
  const updateCoordinate = (index: number, axis: "x" | "y", value: number) => {
    const newCoordinates = [...localButton.coordinates]
    newCoordinates[index] = {
      ...newCoordinates[index],
      [axis]: Math.max(0, Math.min(100, value)),
    }
    updateField("coordinates", newCoordinates)
  }

  // Añadir punto al polígono
  const addPolygonPoint = () => {
    if (localButton.shape === "polygon") {
      const newPoint = { x: 50, y: 50 }
      updateField("coordinates", [...localButton.coordinates, newPoint])
    }
  }

  // Eliminar punto del polígono
  const removePolygonPoint = (index: number) => {
    if (localButton.shape === "polygon" && localButton.coordinates.length > 3) {
      const newCoordinates = localButton.coordinates.filter((_, i) => i !== index)
      updateField("coordinates", newCoordinates)
    }
  }

  // Obtener descripción de la forma
  const getShapeDescription = () => {
    switch (localButton.shape) {
      case "rectangle":
        return "Área rectangular definida por esquina superior izquierda y inferior derecha"
      case "circle":
        return "Área circular definida por centro y radio"
      case "polygon":
        return "Área poligonal definida por múltiples puntos"
      default:
        return ""
    }
  }

  return (
    <Tabs defaultValue="basic">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="basic">
          <Settings className="w-4 h-4 mr-2" />
          Básico
        </TabsTrigger>
        <TabsTrigger value="coordinates">
          <MapPin className="w-4 h-4 mr-2" />
          Coordenadas
        </TabsTrigger>
        <TabsTrigger value="style">
          <Palette className="w-4 h-4 mr-2" />
          Estilo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label">Etiqueta del botón</Label>
          <Input id="label" value={localButton.label} onChange={(e) => updateField("label", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="href">
            <div className="flex items-center">
              <LinkIcon className="w-4 h-4 mr-2" />
              Enlace (URL)
            </div>
          </Label>
          <Input id="href" value={localButton.href} onChange={(e) => updateField("href", e.target.value)} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="active">Botón activo</Label>
          <Switch
            id="active"
            checked={localButton.active}
            onCheckedChange={(checked) => updateField("active", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showLabel">Mostrar etiqueta</Label>
          <Switch
            id="showLabel"
            checked={localButton.showLabel}
            onCheckedChange={(checked) => updateField("showLabel", checked)}
          />
        </div>

        {localButton.showLabel && (
          <div className="space-y-2">
            <Label htmlFor="labelPosition">Posición de la etiqueta</Label>
            <Select
              value={localButton.labelPosition}
              onValueChange={(value) => updateField("labelPosition", value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="top">Arriba</SelectItem>
                <SelectItem value="bottom">Abajo</SelectItem>
                <SelectItem value="left">Izquierda</SelectItem>
                <SelectItem value="right">Derecha</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <Label>Información de la forma</Label>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{localButton.shape}</Badge>
            <span className="text-sm text-muted-foreground">
              {localButton.coordinates.length} punto{localButton.coordinates.length !== 1 ? "s" : ""}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{getShapeDescription()}</p>
        </div>
      </TabsContent>

      <TabsContent value="coordinates" className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Coordenadas ({localButton.coordinates.length} puntos)</Label>
            {localButton.shape === "polygon" && (
              <Button variant="outline" size="sm" onClick={addPolygonPoint}>
                Añadir punto
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {localButton.coordinates.map((point, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">X (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={point.x.toFixed(1)}
                      onChange={(e) => updateCoordinate(index, "x", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Y (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={point.y.toFixed(1)}
                      onChange={(e) => updateCoordinate(index, "y", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                  {localButton.shape === "polygon" && localButton.coordinates.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive"
                      onClick={() => removePolygonPoint(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {localButton.shape === "rectangle" && (
            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
              <strong>Rectángulo:</strong> Punto 1 = esquina superior izquierda, Punto 2 = esquina inferior derecha
            </div>
          )}

          {localButton.shape === "circle" && (
            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
              <strong>Círculo:</strong> Punto 1 = centro, Punto 2 = define el radio
            </div>
          )}

          {localButton.shape === "polygon" && (
            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
              <strong>Polígono:</strong> Cada punto define un vértice. Mínimo 3 puntos requeridos.
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="style" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="variant">Estilo del botón</Label>
          <Select value={localButton.variant} onValueChange={(value) => updateField("variant", value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estilo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Principal</SelectItem>
              <SelectItem value="secondary">Secundario</SelectItem>
              <SelectItem value="accent">Acento</SelectItem>
              <SelectItem value="outline">Contorno</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="default" className="w-full" onClick={() => updateField("variant", "primary")}>
            Principal
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => updateField("variant", "secondary")}>
            Secundario
          </Button>
          <Button variant="destructive" className="w-full" onClick={() => updateField("variant", "accent")}>
            Acento
          </Button>
          <Button variant="outline" className="w-full" onClick={() => updateField("variant", "outline")}>
            Contorno
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label>Vista previa del botón</Label>
          <div className="p-4 border rounded-lg bg-muted/50 flex items-center justify-center">
            <Button
              variant={
                localButton.variant === "primary"
                  ? "default"
                  : localButton.variant === "secondary"
                    ? "secondary"
                    : localButton.variant === "accent"
                      ? "destructive"
                      : "outline"
              }
              disabled={!localButton.active}
            >
              {localButton.label}
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
