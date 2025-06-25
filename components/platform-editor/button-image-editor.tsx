"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Trash2, Save, Eye, Download, Upload, Square, Circle, Pen, Move, Undo, Redo } from "lucide-react"
import ButtonPropertiesForm from "./button-properties-form"
import ButtonPreview from "./button-preview"
import { cn } from "@/lib/utils"

// Tipos para los botones interactivos
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

interface PlatformConfig {
  heroImage: string
  title: string
  subtitle: string
  buttons: ImageButton[]
}

type DrawingMode = "select" | "rectangle" | "circle" | "polygon"

// Datos iniciales de ejemplo
const initialConfig: PlatformConfig = {
  heroImage: "/platform-design.jpg",
  title: "Plataforma de Congresos Médicos",
  subtitle: "Gestiona tu participación científica",
  buttons: [
    {
      id: 1,
      label: "Nueva Comunicación",
      href: "/plataforma/comunicaciones/nueva",
      shape: "rectangle",
      coordinates: [
        { x: 10, y: 20 },
        { x: 35, y: 35 },
      ],
      variant: "primary",
      active: true,
      showLabel: true,
      labelPosition: "center",
    },
    {
      id: 2,
      label: "Mis Comunicaciones",
      href: "/plataforma/comunicaciones",
      shape: "circle",
      coordinates: [
        { x: 70, y: 45 },
        { x: 85, y: 60 },
      ],
      variant: "secondary",
      active: true,
      showLabel: true,
      labelPosition: "center",
    },
  ],
}

export default function ButtonImageEditor() {
  const [config, setConfig] = useState<PlatformConfig>(initialConfig)
  const [selectedButton, setSelectedButton] = useState<ImageButton | null>(null)
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("select")
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState<Point[]>([])
  const [activeTab, setActiveTab] = useState("editor")
  const [showPreview, setShowPreview] = useState(false)
  const [jsonCode, setJsonCode] = useState("")
  const [history, setHistory] = useState<PlatformConfig[]>([initialConfig])
  const [historyIndex, setHistoryIndex] = useState(0)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Actualizar el código JSON cuando cambia la configuración
  useEffect(() => {
    setJsonCode(JSON.stringify(config, null, 2))
  }, [config])

  // Añadir al historial cuando cambia la configuración
  const addToHistory = (newConfig: PlatformConfig) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newConfig)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setConfig(newConfig)
  }

  // Deshacer
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setConfig(history[historyIndex - 1])
    }
  }

  // Rehacer
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setConfig(history[historyIndex + 1])
    }
  }

  // Función para añadir un nuevo botón
  const addNewButton = (shape: "rectangle" | "circle" | "polygon" = "rectangle") => {
    const newButton: ImageButton = {
      id: Date.now(),
      label: "Nuevo Botón",
      href: "/plataforma/nueva-ruta",
      shape,
      coordinates:
        shape === "rectangle"
          ? [
              { x: 40, y: 40 },
              { x: 60, y: 60 },
            ]
          : shape === "circle"
            ? [
                { x: 45, y: 45 },
                { x: 55, y: 55 },
              ]
            : [
                { x: 40, y: 40 },
                { x: 60, y: 40 },
                { x: 50, y: 60 },
              ],
      variant: "primary",
      active: true,
      showLabel: true,
      labelPosition: "center",
    }

    const newConfig = {
      ...config,
      buttons: [...config.buttons, newButton],
    }

    addToHistory(newConfig)
    setSelectedButton(newButton)
  }

  // Función para eliminar un botón
  const deleteButton = (id: number) => {
    const newConfig = {
      ...config,
      buttons: config.buttons.filter((button) => button.id !== id),
    }

    addToHistory(newConfig)

    if (selectedButton && selectedButton.id === id) {
      setSelectedButton(null)
    }
  }

  // Función para actualizar las propiedades de un botón
  const updateButtonProperties = (updatedButton: ImageButton) => {
    const newConfig = {
      ...config,
      buttons: config.buttons.map((button) => (button.id === updatedButton.id ? updatedButton : button)),
    }

    addToHistory(newConfig)
    setSelectedButton(updatedButton)
  }

  // Función para actualizar la información general
  const updateGeneralInfo = (field: keyof PlatformConfig, value: string) => {
    const newConfig = {
      ...config,
      [field]: value,
    }
    setConfig(newConfig)
  }

  // Convertir coordenadas del ratón a porcentajes
  const getRelativeCoordinates = (e: React.MouseEvent): Point => {
    if (!imageContainerRef.current) return { x: 0, y: 0 }

    const rect = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    }
  }

  // Iniciar el dibujo
  const handleMouseDown = (e: React.MouseEvent) => {
    if (drawingMode === "select") return

    const point = getRelativeCoordinates(e)
    setIsDrawing(true)
    setCurrentPath([point])
  }

  // Continuar el dibujo
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const point = getRelativeCoordinates(e)

    if (drawingMode === "rectangle" || drawingMode === "circle") {
      setCurrentPath([currentPath[0], point])
    } else if (drawingMode === "polygon") {
      // Para polígonos, añadir puntos mientras se mueve
      setCurrentPath([...currentPath.slice(0, -1), point])
    }
  }

  // Finalizar el dibujo
  const handleMouseUp = () => {
    if (!isDrawing || currentPath.length < 2) {
      setIsDrawing(false)
      setCurrentPath([])
      return
    }

    // Crear nuevo botón con la forma dibujada
    const newButton: ImageButton = {
      id: Date.now(),
      label: `Botón ${drawingMode}`,
      href: "/plataforma/nueva-ruta",
      shape: drawingMode as "rectangle" | "circle" | "polygon",
      coordinates: [...currentPath],
      variant: "primary",
      active: true,
      showLabel: true,
      labelPosition: "center",
    }

    const newConfig = {
      ...config,
      buttons: [...config.buttons, newButton],
    }

    addToHistory(newConfig)
    setSelectedButton(newButton)
    setIsDrawing(false)
    setCurrentPath([])
    setDrawingMode("select")
  }

  // Manejar clic en polígono (añadir punto)
  const handlePolygonClick = (e: React.MouseEvent) => {
    if (drawingMode !== "polygon" || !isDrawing) return

    const point = getRelativeCoordinates(e)
    setCurrentPath([...currentPath, point])
  }

  // Finalizar polígono (doble clic)
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (drawingMode === "polygon" && isDrawing) {
      handleMouseUp()
    }
  }

  // Verificar si un punto está dentro de un botón
  const isPointInButton = (point: Point, button: ImageButton): boolean => {
    const coords = button.coordinates

    if (button.shape === "rectangle") {
      const [topLeft, bottomRight] = coords
      return point.x >= topLeft.x && point.x <= bottomRight.x && point.y >= topLeft.y && point.y <= bottomRight.y
    }

    if (button.shape === "circle") {
      const [center, edge] = coords
      const radius = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2))
      const distance = Math.sqrt(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2))
      return distance <= radius
    }

    if (button.shape === "polygon") {
      // Algoritmo de ray casting para polígonos
      let inside = false
      for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
        if (
          coords[i].y > point.y !== coords[j].y > point.y &&
          point.x < ((coords[j].x - coords[i].x) * (point.y - coords[i].y)) / (coords[j].y - coords[i].y) + coords[i].x
        ) {
          inside = !inside
        }
      }
      return inside
    }

    return false
  }

  // Manejar clic en el canvas para seleccionar botones
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (drawingMode !== "select") return

    const point = getRelativeCoordinates(e)
    const clickedButton = config.buttons.find((button) => isPointInButton(point, button))

    setSelectedButton(clickedButton || null)
  }

  // Renderizar forma en el canvas
  const renderShape = (button: ImageButton, isSelected = false, isPreview = false) => {
    const coords = button.coordinates
    const strokeColor = isSelected ? "#3b82f6" : isPreview ? "#ef4444" : "#10b981"
    const fillColor = isSelected
      ? "rgba(59, 130, 246, 0.2)"
      : isPreview
        ? "rgba(239, 68, 68, 0.2)"
        : "rgba(16, 185, 129, 0.2)"

    if (button.shape === "rectangle") {
      const [topLeft, bottomRight] = coords
      return (
        <div
          key={button.id}
          className="absolute border-2 pointer-events-none"
          style={{
            left: `${topLeft.x}%`,
            top: `${topLeft.y}%`,
            width: `${bottomRight.x - topLeft.x}%`,
            height: `${bottomRight.y - topLeft.y}%`,
            borderColor: strokeColor,
            backgroundColor: fillColor,
          }}
        />
      )
    }

    if (button.shape === "circle") {
      const [center, edge] = coords
      const radiusX = Math.abs(edge.x - center.x)
      const radiusY = Math.abs(edge.y - center.y)
      return (
        <div
          key={button.id}
          className="absolute border-2 rounded-full pointer-events-none"
          style={{
            left: `${center.x - radiusX}%`,
            top: `${center.y - radiusY}%`,
            width: `${radiusX * 2}%`,
            height: `${radiusY * 2}%`,
            borderColor: strokeColor,
            backgroundColor: fillColor,
          }}
        />
      )
    }

    if (button.shape === "polygon") {
      const pathData = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

      return (
        <svg
          key={button.id}
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={pathData} stroke={strokeColor} strokeWidth="0.5" fill={fillColor} />
        </svg>
      )
    }

    return null
  }

  // Exportar la configuración
  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "platform-config.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  // Importar configuración
  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedConfig = JSON.parse(event.target?.result as string)
        addToHistory(importedConfig)
      } catch (error) {
        console.error("Error al importar la configuración:", error)
        alert("El archivo no contiene una configuración válida")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Editor de Botones Interactivos</h1>
          <p className="text-muted-foreground">
            Dibuja áreas interactivas personalizadas sobre la imagen de la plataforma
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex === 0}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex === history.length - 1}>
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? "Ocultar Vista Previa" : "Vista Previa"}
          </Button>
          <Button variant="default" size="sm" onClick={exportConfig}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <div className="relative">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Input
              type="file"
              accept=".json"
              onChange={importConfig}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {showPreview && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <ButtonPreview config={config} />
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Editor Visual</TabsTrigger>
          <TabsTrigger value="code">Editor JSON</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Panel izquierdo: Herramientas de dibujo */}
            <Card>
              <CardHeader>
                <CardTitle>Herramientas</CardTitle>
                <CardDescription>Selecciona una herramienta para dibujar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={drawingMode === "select" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDrawingMode("select")}
                  >
                    <Move className="w-4 h-4 mr-2" />
                    Seleccionar
                  </Button>
                  <Button
                    variant={drawingMode === "rectangle" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDrawingMode("rectangle")}
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Rectángulo
                  </Button>
                  <Button
                    variant={drawingMode === "circle" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDrawingMode("circle")}
                  >
                    <Circle className="w-4 h-4 mr-2" />
                    Círculo
                  </Button>
                  <Button
                    variant={drawingMode === "polygon" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDrawingMode("polygon")}
                  >
                    <Pen className="w-4 h-4 mr-2" />
                    Polígono
                  </Button>
                </div>

                {drawingMode === "polygon" && isDrawing && (
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    Haz clic para añadir puntos. Doble clic para finalizar.
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" value={config.title} onChange={(e) => updateGeneralInfo("title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={config.subtitle}
                    onChange={(e) => updateGeneralInfo("subtitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroImage">URL de la imagen</Label>
                  <Input
                    id="heroImage"
                    value={config.heroImage}
                    onChange={(e) => updateGeneralInfo("heroImage", e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Botones ({config.buttons.length})</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {config.buttons.map((button) => (
                      <div
                        key={button.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-md border cursor-pointer",
                          selectedButton?.id === button.id ? "border-primary bg-primary/5" : "border-border",
                        )}
                        onClick={() => setSelectedButton(button)}
                      >
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              button.shape === "rectangle"
                                ? "default"
                                : button.shape === "circle"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="w-2 h-2 p-0 rounded-full"
                          />
                          <span className="text-sm truncate max-w-[100px]">{button.label}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteButton(button.id)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => addNewButton("rectangle")}>
                      <Square className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => addNewButton("circle")}>
                      <Circle className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => addNewButton("polygon")}>
                      <Pen className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Panel central: Editor visual */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Editor Visual</CardTitle>
                <CardDescription>
                  {drawingMode === "select"
                    ? "Haz clic en un botón para seleccionarlo"
                    : drawingMode === "polygon"
                      ? "Haz clic para añadir puntos, doble clic para finalizar"
                      : "Arrastra para dibujar la forma"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  ref={imageContainerRef}
                  className={cn(
                    "relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border bg-muted",
                    drawingMode !== "select" && "cursor-crosshair",
                  )}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onClick={
                    drawingMode === "select"
                      ? handleCanvasClick
                      : drawingMode === "polygon"
                        ? handlePolygonClick
                        : undefined
                  }
                  onDoubleClick={handleDoubleClick}
                >
                  {/* Imagen de fondo */}
                  {config.heroImage && (
                    <Image
                      src={config.heroImage || "/placeholder.svg"}
                      alt="Imagen de la plataforma"
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Overlay sutil */}
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Botones existentes */}
                  {config.buttons.map((button) => renderShape(button, selectedButton?.id === button.id))}

                  {/* Forma en proceso de dibujo */}
                  {isDrawing && currentPath.length > 0 && (
                    <>
                      {drawingMode === "rectangle" && currentPath.length === 2 && (
                        <div
                          className="absolute border-2 border-dashed border-red-500 bg-red-500/20 pointer-events-none"
                          style={{
                            left: `${Math.min(currentPath[0].x, currentPath[1].x)}%`,
                            top: `${Math.min(currentPath[0].y, currentPath[1].y)}%`,
                            width: `${Math.abs(currentPath[1].x - currentPath[0].x)}%`,
                            height: `${Math.abs(currentPath[1].y - currentPath[0].y)}%`,
                          }}
                        />
                      )}
                      {drawingMode === "circle" && currentPath.length === 2 && (
                        <div
                          className="absolute border-2 border-dashed border-red-500 bg-red-500/20 rounded-full pointer-events-none"
                          style={{
                            left: `${currentPath[0].x - Math.abs(currentPath[1].x - currentPath[0].x)}%`,
                            top: `${currentPath[0].y - Math.abs(currentPath[1].y - currentPath[0].y)}%`,
                            width: `${Math.abs(currentPath[1].x - currentPath[0].x) * 2}%`,
                            height: `${Math.abs(currentPath[1].y - currentPath[0].y) * 2}%`,
                          }}
                        />
                      )}
                      {drawingMode === "polygon" && currentPath.length > 1 && (
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d={currentPath
                              .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
                              .join(" ")}
                            stroke="#ef4444"
                            strokeWidth="0.5"
                            strokeDasharray="2,2"
                            fill="rgba(239, 68, 68, 0.2)"
                          />
                          {currentPath.map((point, index) => (
                            <circle key={index} cx={point.x} cy={point.y} r="0.5" fill="#ef4444" />
                          ))}
                        </svg>
                      )}
                    </>
                  )}

                  {/* Mensaje si no hay imagen */}
                  {!config.heroImage && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Introduce una URL de imagen válida
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Panel derecho: Propiedades del botón seleccionado */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedButton ? `Propiedades: ${selectedButton.label}` : "Propiedades del Botón"}
                </CardTitle>
                <CardDescription>
                  {selectedButton
                    ? "Configura las propiedades del botón seleccionado"
                    : "Selecciona un botón en el editor o dibuja uno nuevo para configurar sus propiedades"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedButton ? (
                  <ButtonPropertiesForm button={selectedButton} onUpdate={updateButtonProperties} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Selecciona un botón en el editor o dibuja uno nuevo para configurar sus propiedades
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle>Editor JSON</CardTitle>
              <CardDescription>Edita directamente la configuración en formato JSON</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <textarea
                  value={jsonCode}
                  onChange={(e) => setJsonCode(e.target.value)}
                  className="w-full h-[500px] font-mono text-sm p-4 rounded-md border border-input bg-transparent"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setJsonCode(JSON.stringify(config, null, 2))}>
                Restablecer
              </Button>
              <Button
                onClick={() => {
                  try {
                    const updatedConfig = JSON.parse(jsonCode)
                    addToHistory(updatedConfig)
                  } catch (error) {
                    alert("El formato JSON no es válido")
                  }
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                Aplicar Cambios
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
