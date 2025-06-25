"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"

export function CongressStats() {
  const stats = [
    {
      title: "Total Congresos",
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: Calendar,
      description: "Este mes",
    },
    {
      title: "Activos",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: CheckCircle,
      description: "En curso",
    },
    {
      title: "Próximos",
      value: "12",
      change: "+1",
      changeType: "positive" as const,
      icon: Clock,
      description: "Programados",
    },
    {
      title: "Participantes",
      value: "2,847",
      change: "+247",
      changeType: "positive" as const,
      icon: Users,
      description: "Total registrados",
    },
  ]

  const statusStats = [
    { label: "Activos", count: 8, color: "bg-green-500" },
    { label: "Próximos", count: 12, color: "bg-blue-500" },
    { label: "Finalizados", count: 4, color: "bg-gray-500" },
    { label: "Cancelados", count: 0, color: "bg-red-500" },
  ]

  return (
    <div className="space-y-4">
      {/* Métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estado de congresos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estado de Congresos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {statusStats.map((status) => (
              <div key={status.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="text-sm text-muted-foreground">
                  {status.label}: <span className="font-medium text-foreground">{status.count}</span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
