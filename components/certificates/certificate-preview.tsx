"use client"

import { useState } from "react"
import { X, Download, ZoomIn, ZoomOut, RotateCw, Printer, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CertificatePreviewProps {
  certificate: any
  onClose: () => void
}

export default function CertificatePreview({ certificate, onClose }: CertificatePreviewProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Vista Previa del Certificado</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Certificado */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-gray-100">
            <div
              className="bg-white shadow-lg"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease",
                width: "210mm", // A4 width
                height: "297mm", // A4 height
                transformOrigin: "center center",
              }}
            >
              {/* Contenido del certificado */}
              <div className="p-8 border-8 border-double border-amber-200 h-full flex flex-col">
                <div className="text-center mb-8">
                  <div className="text-2xl font-serif text-amber-800 mb-2">CERTIFICADO</div>
                  <div className="text-4xl font-bold mb-2">{certificate.title}</div>
                  <div className="text-xl">{certificate.event}</div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="text-lg">Se certifica que</div>
                  <div className="text-3xl font-bold">Dr. María González</div>
                  <div className="text-lg max-w-2xl">
                    Ha participado en el evento con una duración de {certificate.hours} horas académicas, celebrado el{" "}
                    {new Date(certificate.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="flex justify-around">
                    <div className="text-center">
                      <div className="border-t border-gray-400 w-48 mx-auto mt-16 mb-2"></div>
                      <div className="font-semibold">Dr. Juan Pérez</div>
                      <div className="text-sm">Director del Congreso</div>
                    </div>
                    <div className="text-center">
                      <div className="border-t border-gray-400 w-48 mx-auto mt-16 mb-2"></div>
                      <div className="font-semibold">Dra. Ana Rodríguez</div>
                      <div className="text-sm">Secretaria Académica</div>
                    </div>
                  </div>

                  <div className="text-center mt-8 text-sm text-gray-500">
                    <div>Código de verificación: {certificate.verificationCode}</div>
                    <div>Verifique la autenticidad de este certificado en www.congresosmedicos.es/verificar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-72 border-l p-4 space-y-4 overflow-y-auto">
            <div>
              <h3 className="font-semibold mb-2">Información del Certificado</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <Badge
                      className={
                        certificate.status === "emitido"
                          ? "bg-green-100 text-green-800"
                          : certificate.status === "listo"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {certificate.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Tipo</p>
                    <p className="font-medium">{certificate.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Fecha de emisión</p>
                    <p className="font-medium">{certificate.date}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Plantilla</p>
                    <p className="font-medium">{certificate.template}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Código de verificación</p>
                    <p className="font-medium">{certificate.verificationCode}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Herramientas</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4 mr-1" /> Ampliar
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4 mr-1" /> Reducir
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4 mr-1" /> Rotar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Acciones</h3>
              <div className="space-y-2">
                <Button className="w-full" disabled={certificate.status === "pendiente"}>
                  <Download className="h-4 w-4 mr-2" /> Descargar PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="h-4 w-4 mr-2" /> Imprimir
                </Button>
                <Button variant="outline" className="w-full">
                  <Check className="h-4 w-4 mr-2" /> Verificar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
