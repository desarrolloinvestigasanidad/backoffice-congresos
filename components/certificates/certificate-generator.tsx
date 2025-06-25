"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Award, User, Calendar, FileText, Palette, Download, Eye } from "lucide-react"

export default function CertificateGenerator() {
  const [formData, setFormData] = useState({
    type: "",
    recipientName: "",
    recipientTitle: "",
    eventName: "",
    eventDate: "",
    eventLocation: "",
    hours: "",
    template: "",
    customText: "",
    achievements: [] as string[],
    organizer: "",
    signatoryName: "",
    signatoryTitle: "",
  })

  const [newAchievement, setNewAchievement] = useState("")

  const certificateTypes = [
    { value: "participation", label: "Participación", description: "Certificado de asistencia al evento" },
    { value: "presentation", label: "Ponencia", description: "Certificado por presentar una ponencia" },
    { value: "achievement", label: "Reconocimiento", description: "Certificado de logro especial" },
    { value: "completion", label: "Finalización", description: "Certificado de curso completado" },
  ]

  const templates = [
    { value: "modern-blue", label: "Moderno Azul", preview: "/templates/modern-blue.jpg" },
    { value: "elegant-gold", label: "Elegante Dorado", preview: "/templates/elegant-gold.jpg" },
    { value: "premium-purple", label: "Premium Púrpura", preview: "/templates/premium-purple.jpg" },
    { value: "classic-green", label: "Clásico Verde", preview: "/templates/classic-green.jpg" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }))
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }))
  }

  const handleGenerate = () => {
    console.log("Generando certificado:", formData)
    // Aquí iría la lógica de generación
  }

  const handlePreview = () => {
    console.log("Vista previa:", formData)
    // Aquí iría la lógica de vista previa
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Generador de Certificados
          </CardTitle>
          <CardDescription>Crea certificados personalizados para diferentes tipos de participación</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <div className="space-y-6">
          {/* Tipo de Certificado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Tipo de Certificado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {certificateTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.type === type.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("type", type.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      {formData.type === type.value && <div className="w-4 h-4 bg-blue-500 rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Información del Destinatario */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Destinatario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipientName">Nombre Completo *</Label>
                  <Input
                    id="recipientName"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    placeholder="Dr. María González"
                  />
                </div>
                <div>
                  <Label htmlFor="recipientTitle">Título/Grado</Label>
                  <Input
                    id="recipientTitle"
                    value={formData.recipientTitle}
                    onChange={(e) => handleInputChange("recipientTitle", e.target.value)}
                    placeholder="Doctora en Medicina"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información del Evento */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Información del Evento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="eventName">Nombre del Evento *</Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange("eventName", e.target.value)}
                  placeholder="XV Congreso Internacional de Medicina"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate">Fecha del Evento</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Horas Académicas</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={formData.hours}
                    onChange={(e) => handleInputChange("hours", e.target.value)}
                    placeholder="40"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="eventLocation">Ubicación</Label>
                <Input
                  id="eventLocation"
                  value={formData.eventLocation}
                  onChange={(e) => handleInputChange("eventLocation", e.target.value)}
                  placeholder="Madrid, España"
                />
              </div>
            </CardContent>
          </Card>

          {/* Logros y Reconocimientos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Logros y Reconocimientos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="Agregar logro o reconocimiento"
                  onKeyPress={(e) => e.key === "Enter" && addAchievement()}
                />
                <Button onClick={addAchievement} variant="outline">
                  Agregar
                </Button>
              </div>

              {formData.achievements.length > 0 && (
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{achievement}</span>
                      <Button size="sm" variant="ghost" onClick={() => removeAchievement(index)}>
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Configuración y Vista Previa */}
        <div className="space-y-6">
          {/* Plantilla */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Seleccionar Plantilla
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.template === template.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleInputChange("template", template.value)}
                  >
                    <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-center">{template.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Texto Personalizado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Texto Personalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="customText">Mensaje Adicional</Label>
                <Textarea
                  id="customText"
                  value={formData.customText}
                  onChange={(e) => handleInputChange("customText", e.target.value)}
                  placeholder="Texto adicional para incluir en el certificado..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Información del Organizador */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información del Organizador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="organizer">Organización</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => handleInputChange("organizer", e.target.value)}
                  placeholder="Sociedad Española de Medicina"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="signatoryName">Nombre del Firmante</Label>
                  <Input
                    id="signatoryName"
                    value={formData.signatoryName}
                    onChange={(e) => handleInputChange("signatoryName", e.target.value)}
                    placeholder="Dr. Juan Pérez"
                  />
                </div>
                <div>
                  <Label htmlFor="signatoryTitle">Cargo del Firmante</Label>
                  <Input
                    id="signatoryTitle"
                    value={formData.signatoryTitle}
                    onChange={(e) => handleInputChange("signatoryTitle", e.target.value)}
                    placeholder="Director del Congreso"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Button onClick={handlePreview} variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Vista Previa
                </Button>
                <Button onClick={handleGenerate} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
