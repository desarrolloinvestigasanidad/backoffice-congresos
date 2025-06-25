"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import PaymentSummary from "./payment-summary"
import { ArrowLeft, CreditCard, Lock, Shield, AlertCircle, FileText } from "lucide-react"

interface PaymentFormProps {
  communication: any // Usar tipado completo en producción
}

export default function PaymentForm({ communication }: PaymentFormProps) {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState({
    // Datos de facturación (pre-rellenados del perfil)
    billingName: communication.user.name,
    billingEmail: communication.user.email,
    billingPhone: communication.user.phone,
    billingAddress: communication.user.address.street,
    billingCity: communication.user.address.city,
    billingPostalCode: communication.user.address.postalCode,
    billingCountry: communication.user.address.country,
    taxId: communication.user.taxId,
    // Datos de pago
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    // Opciones
    saveCard: false,
    acceptTerms: false,
    acceptPrivacy: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updatePaymentData = (field: string, value: any) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error del campo cuando se modifica
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar datos de facturación
    if (!paymentData.billingName.trim()) newErrors.billingName = "El nombre es obligatorio"
    if (!paymentData.billingEmail.trim()) newErrors.billingEmail = "El email es obligatorio"
    if (!paymentData.billingAddress.trim()) newErrors.billingAddress = "La dirección es obligatoria"
    if (!paymentData.billingCity.trim()) newErrors.billingCity = "La ciudad es obligatoria"
    if (!paymentData.billingPostalCode.trim()) newErrors.billingPostalCode = "El código postal es obligatorio"

    // Validar datos de tarjeta
    if (!paymentData.cardNumber.trim()) newErrors.cardNumber = "El número de tarjeta es obligatorio"
    if (!paymentData.cardExpiry.trim()) newErrors.cardExpiry = "La fecha de caducidad es obligatoria"
    if (!paymentData.cardCvc.trim()) newErrors.cardCvc = "El CVC es obligatorio"
    if (!paymentData.cardName.trim()) newErrors.cardName = "El nombre del titular es obligatorio"

    // Validar aceptación de términos
    if (!paymentData.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos y condiciones"
    if (!paymentData.acceptPrivacy) newErrors.acceptPrivacy = "Debes aceptar la política de privacidad"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simular respuesta exitosa
      const paymentResult = {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        amount: communication.amount,
        currency: "EUR",
      }

      console.log("Pago procesado:", paymentResult)

      // Redirigir a página de confirmación
      router.push(`/plataforma/pago/confirmacion?txn=${paymentResult.transactionId}`)
    } catch (error) {
      console.error("Error en el pago:", error)
      setErrors({ payment: "Error al procesar el pago. Inténtalo de nuevo." })
    } finally {
      setIsProcessing(false)
    }
  }

  const coauthors = communication.authors.filter((author: any) => author.role === "coautor")

  return (
    <div className="space-y-6">
      {/* Navegación */}
      <div className="flex items-center gap-4">
        <Link href="/plataforma/pago">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
            <Lock className="w-3 h-3 mr-1" />
            Pago Seguro
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario de pago */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos de facturación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Datos de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billingName">Nombre completo *</Label>
                  <Input
                    id="billingName"
                    value={paymentData.billingName}
                    onChange={(e) => updatePaymentData("billingName", e.target.value)}
                    placeholder="Dr. Juan Pérez"
                  />
                  {errors.billingName && <p className="text-sm text-red-600">{errors.billingName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Email *</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    value={paymentData.billingEmail}
                    onChange={(e) => updatePaymentData("billingEmail", e.target.value)}
                    placeholder="juan@email.com"
                  />
                  {errors.billingEmail && <p className="text-sm text-red-600">{errors.billingEmail}</p>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="billingPhone">Teléfono</Label>
                  <Input
                    id="billingPhone"
                    value={paymentData.billingPhone}
                    onChange={(e) => updatePaymentData("billingPhone", e.target.value)}
                    placeholder="+34 600 123 456"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">NIF/CIF</Label>
                  <Input
                    id="taxId"
                    value={paymentData.taxId}
                    onChange={(e) => updatePaymentData("taxId", e.target.value)}
                    placeholder="12345678A"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress">Dirección *</Label>
                <Input
                  id="billingAddress"
                  value={paymentData.billingAddress}
                  onChange={(e) => updatePaymentData("billingAddress", e.target.value)}
                  placeholder="Calle Mayor 123"
                />
                {errors.billingAddress && <p className="text-sm text-red-600">{errors.billingAddress}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="billingCity">Ciudad *</Label>
                  <Input
                    id="billingCity"
                    value={paymentData.billingCity}
                    onChange={(e) => updatePaymentData("billingCity", e.target.value)}
                    placeholder="Madrid"
                  />
                  {errors.billingCity && <p className="text-sm text-red-600">{errors.billingCity}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingPostalCode">Código Postal *</Label>
                  <Input
                    id="billingPostalCode"
                    value={paymentData.billingPostalCode}
                    onChange={(e) => updatePaymentData("billingPostalCode", e.target.value)}
                    placeholder="28001"
                  />
                  {errors.billingPostalCode && <p className="text-sm text-red-600">{errors.billingPostalCode}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingCountry">País *</Label>
                  <Select
                    value={paymentData.billingCountry}
                    onValueChange={(value) => updatePaymentData("billingCountry", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="España">España</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Francia">Francia</SelectItem>
                      <SelectItem value="Italia">Italia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos de pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Datos de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de tarjeta *</Label>
                <Input
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => updatePaymentData("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="text-sm text-red-600">{errors.cardNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre del titular *</Label>
                <Input
                  id="cardName"
                  value={paymentData.cardName}
                  onChange={(e) => updatePaymentData("cardName", e.target.value)}
                  placeholder="JUAN PEREZ"
                />
                {errors.cardName && <p className="text-sm text-red-600">{errors.cardName}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Fecha de caducidad *</Label>
                  <Input
                    id="cardExpiry"
                    value={paymentData.cardExpiry}
                    onChange={(e) => updatePaymentData("cardExpiry", e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.cardExpiry && <p className="text-sm text-red-600">{errors.cardExpiry}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardCvc">CVC *</Label>
                  <Input
                    id="cardCvc"
                    value={paymentData.cardCvc}
                    onChange={(e) => updatePaymentData("cardCvc", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cardCvc && <p className="text-sm text-red-600">{errors.cardCvc}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveCard"
                  checked={paymentData.saveCard}
                  onCheckedChange={(checked) => updatePaymentData("saveCard", checked)}
                />
                <Label htmlFor="saveCard" className="text-sm">
                  Guardar tarjeta para futuros pagos
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Términos y condiciones */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={paymentData.acceptTerms}
                  onCheckedChange={(checked) => updatePaymentData("acceptTerms", checked)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  Acepto los{" "}
                  <Link href="/terminos" className="text-primary hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  del servicio
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms}</p>}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={paymentData.acceptPrivacy}
                  onCheckedChange={(checked) => updatePaymentData("acceptPrivacy", checked)}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm">
                  Acepto la{" "}
                  <Link href="/privacidad" className="text-primary hover:underline">
                    política de privacidad
                  </Link>
                </Label>
              </div>
              {errors.acceptPrivacy && <p className="text-sm text-red-600">{errors.acceptPrivacy}</p>}
            </CardContent>
          </Card>

          {/* Error de pago */}
          {errors.payment && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{errors.payment}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botón de pago */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Procesando pago...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pagar €{communication.amount.toFixed(2)}
              </>
            )}
          </Button>

          {/* Seguridad */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Pago seguro SSL</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>Datos encriptados</span>
            </div>
          </div>
        </div>

        {/* Resumen de pago */}
        <div className="lg:col-span-1">
          <PaymentSummary communication={communication} />
        </div>
      </div>
    </div>
  )
}
