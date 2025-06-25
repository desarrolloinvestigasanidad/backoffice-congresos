"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react"

export function CongressCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = [
    {
      id: 1,
      title: "XV Congreso Internacional de Medicina",
      startDate: new Date(2024, 2, 15), // Marzo 15
      endDate: new Date(2024, 2, 18), // Marzo 18
      status: "active",
      location: "Madrid",
      participants: 450,
    },
    {
      id: 2,
      title: "Simposio de IA",
      startDate: new Date(2024, 3, 20), // Abril 20
      endDate: new Date(2024, 3, 22), // Abril 22
      status: "upcoming",
      location: "Barcelona",
      participants: 280,
    },
    {
      id: 3,
      title: "Congreso de Sostenibilidad",
      startDate: new Date(2024, 4, 10), // Mayo 10
      endDate: new Date(2024, 4, 12), // Mayo 12
      status: "draft",
      location: "Valencia",
      participants: 0,
    },
  ]

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const today = new Date()

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDay = (day: number) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter((event) => {
      return dayDate >= event.startDate && dayDate <= event.endDate
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500",
      upcoming: "bg-blue-500",
      draft: "bg-gray-400",
      finished: "bg-red-500",
    }
    return colors[status as keyof typeof colors] || "bg-gray-400"
  }

  const currentMonthEvents = events.filter(
    (event) =>
      event.startDate.getMonth() === currentDate.getMonth() &&
      event.startDate.getFullYear() === currentDate.getFullYear(),
  )

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendario */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Días vacíos del mes anterior */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="p-2 h-20"></div>
              ))}

              {/* Días del mes actual */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1
                const dayEvents = getEventsForDay(day)
                const isToday =
                  today.getDate() === day &&
                  today.getMonth() === currentDate.getMonth() &&
                  today.getFullYear() === currentDate.getFullYear()

                return (
                  <div
                    key={day}
                    className={`p-1 h-20 border rounded-lg ${isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${getStatusColor(event.status)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} más</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de eventos del mes */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Eventos de {monthNames[currentDate.getMonth()]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentMonthEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No hay eventos programados para este mes</p>
            ) : (
              currentMonthEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant={event.status === "active" ? "default" : "secondary"}>
                      {event.status === "active"
                        ? "Activo"
                        : event.status === "upcoming"
                          ? "Próximo"
                          : event.status === "draft"
                            ? "Borrador"
                            : "Finalizado"}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.startDate.getDate()}/{event.startDate.getMonth() + 1} - {event.endDate.getDate()}/
                      {event.endDate.getMonth() + 1}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.participants} participantes
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
