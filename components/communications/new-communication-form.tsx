"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import AuthorManagement from "./author-management"
import FileUploadSection from "./file-upload-section"
import PaymentSummary from "./payment-summary"
import { Save, Send, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

interface FormData {
  title: string
  abstract: string
  keywords: string
  type: "poster" | "video" | "oral" | ""
  congress: string
  category: string
  authors: Author[]
  files: {
    abstract?: File
    poster?: File
    video?: File
    presentation?: File
  }
}

interface Author {
  id: string
  name: string
  email: string
  institution: string
  role: "principal" | "coautor"
  isRegistered: boolean
}

// Datos que vendrían del backend
const availableCongreses = [{ id: "congreso-2025", name: "Congreso Nacional de Medicina 2025", active: true }]

const categories = {
  poster: [
    "Cardiología",
    "Neurología",
    "Oncología",
    "Pediatría",
    "Cirugía",
    "Medicina Interna",
    "Radiología",
    "Anestesiología",
  ],
  video: ["Técnicas Quirúrgicas", "Casos Clínicos", "Procedimientos Diagnósticos", "Innovación Médica"],
  oral: ["Investigación Clínica", "Casos Complejos", "Avances Terapéuticos", "Protocolos y Guías"],
}

export default function NewCommunicationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    title: "",
    abstract: "",
    keywords: "",
    type: "",
    congress: "",
    category: "",
    authors: [
      {
        id: "1",
        name: "Dr. Juan Pérez", // Datos del usuario actual
        email: "juan@email.com",
        institution: "Hospital Universitario",
        role: "principal",
        isRegistered: true,
      },
    ],
    files: {},
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando se modifica
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "El título es obligatorio"
    if (!formData.abstract.trim()) newErrors.abstract = "El resumen es obligatorio"
    if (!formData.type) newErrors.type = "Selecciona el tipo de comunicación"
    if (!formData.congress) newErrors.congress = "Selecciona un congreso"
    if (!formData.category) newErrors.category = "Selecciona una categoría"
    if (formData.authors.length === 0) newErrors.authors = "Debe haber al menos un autor"

    // Validar archivos según el tipo
    if (formData.type === "poster" && !formData.files.poster) {
      newErrors.files = "El poster es obligatorio para comunicaciones tipo poster"
    }
    if (formData.type === "video" && !formData.files.video) {
      newErrors.files = "El video es obligatorio para comunicaciones tipo video"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)
    try {
      // Simular guardado como borrador
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Guardado como borrador:", formData)
      router.push("/plataforma/comunicaciones")
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simular envío de comunicación
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Comunicación enviada:", formData)
      router.push("/plataforma/comunicaciones")
    } catch (error) {
      console.error("Error al enviar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const coauthors = formData.authors.filter((author) => author.role === "coautor")
  const totalCost = 8 // €8 por autor principal, coautores gratis

  return (
    <div className="space-y-6">
      {/* Navegación */}
      <div className="flex items-center gap-4">
        <Link href="/plataforma/comunicaciones">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Borrador</Badge>
          <span className="text-sm text-muted-foreground">Se guarda automáticamente</span>
        </div>
      </div>

      {/* Información básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="congress">Congreso *</Label>
              <Select value={formData.congress} onValueChange={(value) => updateFormData("congress", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un congreso" />
                </SelectTrigger>
                <SelectContent>
                  {availableCongreses.map((congress) => (
                    <SelectItem key={congress.id} value={congress.id} disabled={!congress.active}>
                      {congress.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.congress && <p className="text-sm text-red-600">{errors.congress}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Comunicación *</Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poster">Poster</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="oral">Comunicación Oral</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
            </div>
          </div>

          {formData.type && (
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories[formData.type as keyof typeof categories]?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder="Título de la comunicación"
              maxLength={200}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              {errors.title && <span className="text-red-600">{errors.title}</span>}
              <span>{formData.title.length}/200</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Resumen *</Label>
            <Textarea
              id="abstract"
              value={formData.abstract}
              onChange={(e) => updateFormData("abstract", e.target.value)}
              placeholder="Resumen de la comunicación (máximo 500 palabras)"
              rows={6}
              maxLength={3000}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              {errors.abstract && <span className="text-red-600">{errors.abstract}</span>}
              <span>{formData.abstract.length}/3000 caracteres</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Palabras Clave</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => updateFormData("keywords", e.target.value)}
              placeholder="Palabras clave separadas por comas"
            />
            <p className="text-sm text-muted-foreground">Máximo 5 palabras clave separadas por comas</p>
          </div>
        </CardContent>
      </Card>

      {/* Gestión de autores */}
      <AuthorManagement
        authors={formData.authors}
        onAuthorsChange={(authors) => updateFormData("authors", authors)}
        error={errors.authors}
      />

      {/* Subida de archivos */}
      <FileUploadSection
        type={formData.type}
        files={formData.files}
        onFilesChange={(files) => updateFormData("files", files)}
        error={errors.files}
      />

      {/* Resumen de pago */}
      <PaymentSummary
        principalAuthor={formData.authors.find((a) => a.role === "principal")}
        coauthors={coauthors}
        totalCost={totalCost}
      />

      {/* Acciones */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>Los cambios se guardan automáticamente como borrador</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft} disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar Comunicación"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
