"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, File, Video, ImageIcon, Trash2, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploadSectionProps {
  type: string
  files: Record<string, File | undefined>
  onFilesChange: (files: Record<string, File | undefined>) => void
  error?: string
}

interface FileRequirement {
  key: string
  label: string
  required: boolean
  accept: string
  maxSize: number
  description: string
  icon: React.ReactNode
}

const getFileRequirements = (type: string): FileRequirement[] => {
  const common = [
    {
      key: "abstract",
      label: "Resumen (PDF)",
      required: true,
      accept: ".pdf",
      maxSize: 5,
      description: "Resumen en formato PDF (máx. 5MB)",
      icon: <File className="w-5 h-5" />,
    },
  ]

  switch (type) {
    case "poster":
      return [
        ...common,
        {
          key: "poster",
          label: "Poster",
          required: true,
          accept: ".pdf,.jpg,.jpeg,.png",
          maxSize: 20,
          description: "Poster en PDF o imagen de alta calidad (máx. 20MB)",
          icon: <ImageIcon className="w-5 h-5" />,
        },
      ]
    case "video":
      return [
        ...common,
        {
          key: "video",
          label: "Video",
          required: true,
          accept: ".mp4,.avi,.mov",
          maxSize: 500,
          description: "Video en formato MP4, AVI o MOV (máx. 500MB)",
          icon: <Video className="w-5 h-5" />,
        },
      ]
    case "oral":
      return [
        ...common,
        {
          key: "presentation",
          label: "Presentación",
          required: false,
          accept: ".pdf,.ppt,.pptx",
          maxSize: 50,
          description: "Presentación en PDF o PowerPoint (máx. 50MB)",
          icon: <File className="w-5 h-5" />,
        },
      ]
    default:
      return common
  }
}

export default function FileUploadSection({ type, files, onFilesChange, error }: FileUploadSectionProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const requirements = getFileRequirements(type)

  const handleFileUpload = async (key: string, file: File) => {
    // Simular progreso de subida
    setUploadProgress((prev) => ({ ...prev, [key]: 0 }))

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress((prev) => ({ ...prev, [key]: i }))
    }

    onFilesChange({ ...files, [key]: file })
    setUploadProgress((prev) => ({ ...prev, [key]: undefined }))
  }

  const removeFile = (key: string) => {
    const newFiles = { ...files }
    delete newFiles[key]
    onFilesChange(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!type) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Archivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Selecciona primero el tipo de comunicación para ver los requisitos de archivos</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Archivos Requeridos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {requirements.map((requirement) => {
          const file = files[requirement.key]
          const progress = uploadProgress[requirement.key]
          const isUploading = progress !== undefined

          return (
            <div key={requirement.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {requirement.icon}
                  <Label className="font-medium">
                    {requirement.label}
                    {requirement.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                </div>
                {file && !isUploading && (
                  <Button variant="outline" size="sm" onClick={() => removeFile(requirement.key)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{requirement.description}</p>

              {!file && !isUploading && (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Arrastra el archivo aquí o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    accept={requirement.accept}
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0]
                      if (selectedFile) {
                        if (selectedFile.size > requirement.maxSize * 1024 * 1024) {
                          alert(`El archivo es demasiado grande. Máximo ${requirement.maxSize}MB`)
                          return
                        }
                        handleFileUpload(requirement.key, selectedFile)
                      }
                    }}
                    className="hidden"
                    id={`file-${requirement.key}`}
                  />
                  <Label htmlFor={`file-${requirement.key}`} className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>Seleccionar archivo</span>
                    </Button>
                  </Label>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subiendo archivo...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              )}

              {file && !isUploading && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-800">{file.name}</p>
                    <p className="text-sm text-green-600">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Información adicional */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Requisitos técnicos:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Los archivos PDF deben ser legibles y de alta calidad</li>
                <li>Los videos deben tener una resolución mínima de 720p</li>
                <li>Todos los archivos serán revisados por el comité científico</li>
                <li>Una vez enviada la comunicación, no se podrán modificar los archivos</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
