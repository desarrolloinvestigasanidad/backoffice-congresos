"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, Eye, Share2, Calendar, Clock, Users, FileText } from "lucide-react"
import PlatformHeader from "@/components/platform/platform-header"
import CertificatePreview from "./certificate-preview"
import CertificateGenerator from "./certificate-generator"
import CertificateTemplates from "./certificate-templates"
import CertificateHistory from "./certificate-history"

// Datos simulados que vendrían del backend
const certificatesData = {
  stats: {
    total: 12,
    emitidos: 8,
    horas: 45,
    categorias: 4,
  },
  certificates: [
    {
      id: 1,
      title: "Certificado de Participación",
      event: "XV Congreso Nacional de Cardiología",
      date: "2024-03-15",
      hours: 8,
      type: "participacion",
      status: "emitido",
      downloads: 3,
      template: "profesional",
      verificationCode: "CERT-2024-001",
    },
    {
      id: 2,
      title: "Certificado de Ponencia",
      event: "Simposio de Medicina Interna",
      date: "2024-02-20",
      hours: 2,
      type: "ponencia",
      status: "listo",
      downloads: 0,
      template: "premium",
      verificationCode: "CERT-2024-002",
    },
    {
      id: 3,
      title: "Certificado de Asistencia",
      event: "Workshop de Investigación Clínica",
      date: "2024-01-10",
      hours: 6,
      type: "asistencia",
      status: "pendiente",
      downloads: 0,
      template: "clasico",
      verificationCode: "CERT-2024-003",
    },
  ],
}

export default function CertificatesDashboard() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "emitido":
        return "bg-green-100 text-green-800"
      case "listo":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "participacion":
        return "bg-purple-100 text-purple-800"
      case "ponencia":
        return "bg-orange-100 text-orange-800"
      case "asistencia":
        return "bg-cyan-100 text-cyan-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Certificados</h1>
              <p className="text-muted-foreground">Genera y descarga tus certificados de participación</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{certificatesData.stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emitidos</p>
                    <p className="text-2xl font-bold">{certificatesData.stats.emitidos}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horas</p>
                    <p className="text-2xl font-bold">{certificatesData.stats.horas}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Categorías</p>
                    <p className="text-2xl font-bold">{certificatesData.stats.categorias}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="generator">Generar</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Vista General */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Mis Certificados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certificatesData.certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{cert.title}</h3>
                            <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                            <Badge className={getTypeColor(cert.type)}>{cert.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{cert.event}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {cert.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {cert.hours}h
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {cert.downloads} descargas
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCertificate(cert)
                              setShowPreview(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={cert.status === "pendiente"}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" disabled={cert.status === "pendiente"}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Generar Certificado */}
          <TabsContent value="generator">
            <CertificateGenerator />
          </TabsContent>

          {/* Plantillas */}
          <TabsContent value="templates">
            <CertificateTemplates />
          </TabsContent>

          {/* Historial */}
          <TabsContent value="history">
            <CertificateHistory />
          </TabsContent>

          {/* Configuración */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Certificados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Configuración avanzada disponible próximamente.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Vista Previa */}
      {showPreview && selectedCertificate && (
        <CertificatePreview certificate={selectedCertificate} onClose={() => setShowPreview(false)} />
      )}
    </div>
  )
}
