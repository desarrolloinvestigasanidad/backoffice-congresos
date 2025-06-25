"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"

export function CongressStats() {
  const stats = [
    {
      title: "Total Congresos",
      value: "24",
      change: "+3 este mes",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Congresos Activos",
      value: "8",
      change: "En curso",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Próximos Eventos",
      value: "12",
      change: "Próximos 30 días",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Total Participantes",
      value: "2,847",
      change: "+12% vs mes anterior",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
