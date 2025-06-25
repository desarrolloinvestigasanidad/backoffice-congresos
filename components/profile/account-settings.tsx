"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Save, Settings, Bell, Shield, Smartphone, AlertTriangle } from "lucide-react"

interface AccountSettingsProps {
  settings: any
  email: string
}

export default function AccountSettings({ settings, email }: AccountSettingsProps) {
  const [formData, setFormData] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const updatePasswordData = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Configuración guardada:", formData)
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    setIsSaving(true)
    try {
      // Simular cambio de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Contraseña cambiada")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      console.error("Error al cambiar contraseña:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Configuración general */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configuración General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select value={formData.timezone} onValueChange={(value) => updateFormData("timezone", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona zona horaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Lisbon">Lisboa (GMT+0)</SelectItem>
                  <SelectItem value="Europe/Paris">París (GMT+1)</SelectItem>
                  <SelectItem value="Europe/Rome">Roma (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Guardando..." : "Guardar Configuración"}
          </Button>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por Email</Label>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones sobre tus comunicaciones y congresos
              </p>
            </div>
            <Switch
              checked={formData.emailNotifications}
              onCheckedChange={(checked) => updateFormData("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones SMS</Label>
              <p className="text-sm text-muted-foreground">Recibe recordatorios importantes por SMS</p>
            </div>
            <Switch
              checked={formData.smsNotifications}
              onCheckedChange={(checked) => updateFormData("smsNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Emails de Marketing</Label>
              <p className="text-sm text-muted-foreground">Recibe información sobre nuevos congresos y eventos</p>
            </div>
            <Switch
              checked={formData.marketingEmails}
              onCheckedChange={(checked) => updateFormData("marketingEmails", checked)}
            />
          </div>

          <Button onClick={handleSaveSettings} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Guardando..." : "Guardar Notificaciones"}
          </Button>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cambiar contraseña */}
          <div className="space-y-4">
            <h3 className="font-semibold">Cambiar Contraseña</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => updatePasswordData("currentPassword", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => updatePasswordData("newPassword", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => updatePasswordData("confirmPassword", e.target.value)}
                />
              </div>
              <Button onClick={handleChangePassword} disabled={isSaving}>
                <Shield className="w-4 h-4 mr-2" />
                {isSaving ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </div>
          </div>

          {/* Autenticación de dos factores */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación de Dos Factores</Label>
                <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
              </div>
              <div className="flex items-center gap-2">
                {formData.twoFactorEnabled ? (
                  <Badge className="bg-green-100 text-green-700">Activado</Badge>
                ) : (
                  <Badge variant="outline">Desactivado</Badge>
                )}
                <Switch
                  checked={formData.twoFactorEnabled}
                  onCheckedChange={(checked) => updateFormData("twoFactorEnabled", checked)}
                />
              </div>
            </div>
          </div>

          {/* Sesiones activas */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="font-semibold">Sesiones Activas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Smartphone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Sesión Actual</p>
                    <p className="text-sm text-muted-foreground">Chrome en Windows • Madrid, España</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Activa</Badge>
              </div>
            </div>
            <Button variant="outline" className="text-red-600 hover:text-red-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Cerrar Todas las Sesiones
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Zona de peligro */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Zona de Peligro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Eliminar Cuenta</h3>
            <p className="text-sm text-red-700 mb-4">
              Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede
              deshacer.
            </p>
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Eliminar Cuenta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
