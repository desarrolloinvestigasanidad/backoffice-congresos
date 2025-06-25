"use client"
import { Button } from "@/components/ui/button"

interface ButtonData {
  id: string
  label: string
  href: string
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent"
  active: boolean
  position: { x: number; y: number }
}

const InteractiveImageButtons = () => {
  const buttons: ButtonData[] = [
    {
      id: "inicio",
      label: "Inicio",
      href: "/plataforma",
      variant: "secondary" as const,
      active: true,
      position: { x: 25, y: 25 },
    },
    {
      id: "calendario",
      label: "Calendario",
      href: "/plataforma/calendario",
      variant: "secondary" as const,
      active: true,
      position: { x: 25, y: 40 },
    },
    {
      id: "miembros",
      label: "Miembros",
      href: "/plataforma/miembros",
      variant: "secondary" as const,
      active: true,
      position: { x: 25, y: 55 },
    },
    {
      id: "recursos",
      label: "Recursos",
      href: "/plataforma/recursos",
      variant: "secondary" as const,
      active: true,
      position: { x: 25, y: 70 },
    },
    {
      id: "configuracion",
      label: "Configuración",
      href: "/plataforma/configuracion",
      variant: "secondary" as const,
      active: true,
      position: { x: 25, y: 85 },
    },
    {
      id: "galeria",
      label: "Galería",
      href: "/plataforma/galeria",
      variant: "accent" as const,
      active: true,
      position: { x: 75, y: 25 },
    },
    {
      id: "sala-cine",
      label: "Sala de Cine",
      href: "/plataforma/sala-cine",
      variant: "accent" as const,
      active: true,
      position: { x: 75, y: 40 },
    },
  ]

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {buttons.map((button) => (
        <Button
          key={button.id}
          variant={button.variant}
          style={{
            position: "absolute",
            left: `${button.position.x}%`,
            top: `${button.position.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => {
            window.location.href = button.href
          }}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}

export default InteractiveImageButtons
