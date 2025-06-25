"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Search, Filter, Clock, FileText } from "lucide-react"

// Datos simulados
const historyData = [
  {
    id: 1,
    certificateId: "CERT-2024-001",
    action: "download",
    date: "2024-03-20T14:30:00",
    user: "María González",
    details: "Descarga de certificado de participación",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    certificateId: "CERT-2024-001",
    action: "view",
    date: "2024-03-20T14:25:00",
    user: "María González",
    details: "Vista previa de certificado",
    ip: "192.168.1.1",
  },
  {
    id: 3,
    certificateId: "CERT-2024-002",
    action: "generate",
    date: "2024-03-19T10:15:00",
    user: "Sistema",
    details: "Generación automática de certificado",
    ip: "10.0.0.1",
  },
  {
    id: 4,
    certificateId: "CERT-2024-001",
    action: "verify",
    date: "2024-03-18T16:45:00",
    user: "Juan Pérez",
    details: "Verificación de autenticidad",
    ip: "192.168.2.5",
  },
  {
    id: 5,
    certificateId: "CERT-2024-003",
    action: "update",
    date: "2024-03-17T09:20:00",
    user: "Admin",
    details: "Actualización de estado a pendiente",
    ip: "10.0.0.2",
  },
]

export default function CertificateHistory() {
  const [searchTerm, setSearchTerm] = useState("")

  const getActionColor = (action: string) => {
    switch (action) {
      case "download":
        return "bg-green-100 text-green-800"
      case "view":
        return "bg-blue-100 text-blue-800"
      case "generate":
        return "bg-purple-100 text-purple-800"
      case "verify":
        return "bg-amber-100 text-amber-800"
      case "update":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case "download":
        return "Descarga"
      case "view":
        return "Vista"
      case "generate":
        return "Generación"
      case "verify":
        return "Verificación"
      case "update":
        return "Actualización"
      default:
        return action
    }
  }

  const filteredHistory = historyData.filter(
    (item) =>
      item.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Historial de Actividad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar por ID, usuario o detalles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        item.action === "download"
                          ? "bg-green-100"
                          : item.action === "view"
                            ? "bg-blue-100"
                            : item.action === "generate"
                              ? "bg-purple-100"
                              : item.action === "verify"
                                ? "bg-amber-100"
                                : "bg-gray-100"
                      }`}
                    >
                      {item.action === "download" ? (
                        <Download className="h-5 w-5 text-green-600" />
                      ) : item.action === "view" ? (
                        <FileText className="h-5 w-5 text-blue-600" />
                      ) : item.action === "generate" ? (
                        <FileText className="h-5 w-5 text-purple-600" />
                      ) : item.action === "verify" ? (
                        <FileText className="h-5 w-5 text-amber-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{item.details}</h3>
                        <Badge className={getActionColor(item.action)}>{getActionText(item.action)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.date).toLocaleString()}
                        </span>
                        <span>Usuario: {item.user}</span>
                        <span>ID: {item.certificateId}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
