"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Briefcase, Award, Calendar, Download, Building } from "lucide-react"

interface ProfessionalInfoFormProps {
  professionalInfo: any
  congresses: any[]
  stats: any
}

export default function ProfessionalInfoForm({ professionalInfo, congresses, stats }: ProfessionalInfoFormProps) {
  const [formData, setFormData] = useState(professionalInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Datos profesionales guardados:", formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(professionalInfo)
    setIsEditing(false)
  }

  const getCongressStatusBadge = (status: string) => {
    switch (status) {
      case "registered":
        return (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            Registrado
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-50 text-green-700">
            Completado
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Información profesional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Información Profesional
            </div>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título Profesional</Label>
              <Select
                value={formData.title}
                onValueChange={(value) => updateFormData("title", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona título" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr.">Dr.</SelectItem>
                  <SelectItem value="Dra.">Dra.</SelectItem>
                  <SelectItem value="Prof.">Prof.</SelectItem>
                  <SelectItem value="Prof. Dr.">Prof. Dr.</SelectItem>
                  <SelectItem value="Sr.">Sr.</SelectItem>
                  <SelectItem value="Sra.">Sra.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Especialización *</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => updateFormData("specialization", value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona especialización" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiología">Cardiología</SelectItem>
                  <SelectItem value="Neurología">Neurología</SelectItem>
                  <SelectItem value="Oncología">Oncología</SelectItem>
                  <SelectItem value="Pediatría">Pediatría</SelectItem>
                  <SelectItem value="Cirugía General">Cirugía General</SelectItem>
                  <SelectItem value="Medicina Interna">Medicina Interna</SelectItem>
                  <SelectItem value="Radiología">Radiología</SelectItem>
                  <SelectItem value="Anestesiología">Anestesiología</SelectItem>
                  <SelectItem value="Otra">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Número de Colegiado</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => updateFormData("licenseNumber", e.target.value)}
                disabled={!isEditing}
                placeholder="28/12345"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Años de Experiencia</Label>
              <Input
                id="yearsExperience"
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => updateFormData("yearsExperience", Number.parseInt(e.target.value))}
                disabled={!isEditing}
                min="0"
                max="50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institución *</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => updateFormData("institution", e.target.value)}
              disabled={!isEditing}
              placeholder="Hospital Universitario La Paz"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento/Servicio</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => updateFormData("department", e.target.value)}
                disabled={!isEditing}
                placeholder="Servicio de Cardiología"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Cargo/Posición</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData("position", e.target.value)}
                disabled={!isEditing}
                placeholder="Médico Adjunto"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CV y documentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Curriculum Vitae
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{formData.cv || "No hay CV subido"}</p>
                <p className="text-sm text-muted-foreground">
                  {formData.cv ? "Última actualización: hace 2 meses" : "Sube tu CV en formato PDF"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {formData.cv && (
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                {formData.cv ? "Actualizar" : "Subir CV"}
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Tu CV será utilizado para verificar tu información profesional y puede ser solicitado por los organizadores
            del congreso.
          </p>
        </CardContent>
      </Card>

      {/* Estadísticas profesionales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Estadísticas Profesionales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.communicationsSubmitted}</div>
              <div className="text-sm text-blue-700">Comunicaciones Enviadas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.communicationsAccepted}</div>
              <div className="text-sm text-green-700">Comunicaciones Aceptadas</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.congressesAttended}</div>
              <div className="text-sm text-purple-700">Congresos Asistidos</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.certificatesEarned}</div>
              <div className="text-sm text-yellow-700">Certificados Obtenidos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historial de congresos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Historial de Congresos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {congresses.length > 0 ? (
            <div className="space-y-4">
              {congresses.map((congress) => (
                <div key={congress.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{congress.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Rol: {congress.role}</span>
                        <span>Fecha: {new Date(congress.date).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getCongressStatusBadge(congress.status)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No has participado en congresos aún</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
