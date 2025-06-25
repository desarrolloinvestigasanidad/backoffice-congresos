"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

interface ButtonPreviewProps {
  config: PlatformConfig
}

export default function ButtonPreview({ config }: ButtonPreviewProps) {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  const getButtonVariant = (variant: string) => {
    switch (variant) {
      case "primary":
        return "default"
      case "secondary":
        return "secondary"
      case "accent":
        return "destructive"
      case "outline":
        return "outline"
      default:
        return "default"
    }
  }

  // Calcular el centro de una forma para posicionar la etiqueta
  const getShapeCenter = (button: ImageButton): Point => {
    const coords = button.coordinates

    if (button.shape === "rectangle") {
      const [topLeft, bottomRight] = coords
      return {
        x: (topLeft.x + bottomRight.x) / 2,
        y: (topLeft.y + bottomRight.y) / 2,
      }
    }

    if (button.shape === "circle") {
      return coords[0] // El primer punto es el centro
    }

    if (button.shape === "polygon") {
      // Calcular el centroide del polígono
      const sumX = coords.reduce((sum, point) => sum + point.x, 0)
      const sumY = coords.reduce((sum, point) => sum + point.y, 0)
      return {
        x: sumX / coords.length,
        y: sumY / coords.length,
      }
    }

    return { x: 50, y: 50 }
  }

  // Verificar si un punto está dentro de una forma
  const isPointInShape = (point: Point, button: ImageButton): boolean => {
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

  // Manejar clic en el área de la imagen
  const handleImageClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    const clickPoint = { x, y }

    // Encontrar el botón clickeado
    const clickedButton = config.buttons.find((button) => button.active && isPointInShape(clickPoint, button))

    if (clickedButton) {
      console.log(`Botón clickeado: ${clickedButton.label} -> ${clickedButton.href}`)
      // Aquí podrías navegar a la URL o mostrar una acción
    }
  }

  // Renderizar las formas invisibles para la interacción
  const renderInteractiveArea = (button: ImageButton) => {
    const coords = button.coordinates

    if (button.shape === "rectangle") {
      const [topLeft, bottomRight] = coords
      return (
        <div
          key={`area-${button.id}`}
          className={cn(
            "absolute cursor-pointer transition-all duration-300",
            hoveredButton === button.id ? "bg-primary/20" : "bg-transparent hover:bg-primary/10",
          )}
          style={{
            left: `${topLeft.x}%`,
            top: `${topLeft.y}%`,
            width: `${bottomRight.x - topLeft.x}%`,
            height: `${bottomRight.y - topLeft.y}%`,
          }}
          onMouseEnter={() => setHoveredButton(button.id)}
          onMouseLeave={() => setHoveredButton(null)}
        />
      )
    }

    if (button.shape === "circle") {
      const [centerPoint, edge] = coords
      const radiusX = Math.abs(edge.x - centerPoint.x)
      const radiusY = Math.abs(edge.y - centerPoint.y)
      return (
        <div
          key={`area-${button.id}`}
          className={cn(
            "absolute cursor-pointer rounded-full transition-all duration-300",
            hoveredButton === button.id ? "bg-primary/20" : "bg-transparent hover:bg-primary/10",
          )}
          style={{
            left: `${centerPoint.x - radiusX}%`,
            top: `${centerPoint.y - radiusY}%`,
            width: `${radiusX * 2}%`,
            height: `${radiusY * 2}%`,
          }}
          onMouseEnter={() => setHoveredButton(button.id)}
          onMouseLeave={() => setHoveredButton(null)}
        />
      )
    }

    if (button.shape === "polygon") {
      const pathData = coords.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ") + " Z"

      return (
        <svg
          key={`area-${button.id}`}
          className="absolute inset-0 w-full h-full cursor-pointer"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          onMouseEnter={() => setHoveredButton(button.id)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <path
            d={pathData}
            fill={hoveredButton === button.id ? "rgba(59, 130, 246, 0.2)" : "transparent"}
            className="hover:fill-primary/10 transition-all duration-300"
          />
        </svg>
      )
    }

    return null
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Título y subtítulo */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{config.title}</h1>
        <p className="text-lg text-muted-foreground">{config.subtitle}</p>
      </div>

      {/* Contenedor de imagen con botones */}
      <div
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5"
        onClick={handleImageClick}
      >
        {/* Imagen de fondo */}
        {config.heroImage && (
          <Image
            src={config.heroImage || "/placeholder.svg"}
            alt="Plataforma Design"
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Áreas interactivas invisibles */}
        {config.buttons.map((button) => button.active && renderInteractiveArea(button))}

        {/* Etiquetas de los botones */}
        {config.buttons.map((button) => {
          if (!button.active || !button.showLabel) return null

          const center = getShapeCenter(button)
          let labelStyle: React.CSSProperties = {}

          switch (button.labelPosition) {
            case "center":
              labelStyle = {
                left: `${center.x}%`,
                top: `${center.y}%`,
                transform: "translate(-50%, -50%)",
              }
              break
            case "top":
              labelStyle = {
                left: `${center.x}%`,
                top: `${center.y - 10}%`,
                transform: "translate(-50%, -100%)",
              }
              break
            case "bottom":
              labelStyle = {
                left: `${center.x}%`,
                top: `${center.y + 10}%`,
                transform: "translate(-50%, 0%)",
              }
              break
            case "left":
              labelStyle = {
                left: `${center.x - 10}%`,
                top: `${center.y}%`,
                transform: "translate(-100%, -50%)",
              }
              break
            case "right":
              labelStyle = {
                left: `${center.x + 10}%`,
                top: `${center.y}%`,
                transform: "translate(0%, -50%)",
              }
              break
          }

          return (
            <div
              key={`label-${button.id}`}
              className="absolute pointer-events-none transition-all duration-300"
              style={{
                ...labelStyle,
                transform: hoveredButton === button.id ? `${labelStyle.transform} scale(1.1)` : labelStyle.transform,
              }}
            >
              <Button
                variant={getButtonVariant(button.variant) as any}
                size="lg"
                className={cn(
                  "shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] font-semibold pointer-events-none",
                  button.variant === "accent" && "bg-accent hover:bg-accent/90 text-accent-foreground",
                  hoveredButton === button.id && "ring-2 ring-white/50",
                )}
              >
                {button.label}
              </Button>
            </div>
          )
        })}
      </div>

      {/* Información adicional */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Vista previa interactiva con {config.buttons.filter((b) => b.active).length} áreas activas
        </p>
      </div>
    </div>
  )
}
