import type { Metadata } from "next"
import DashboardLayout from "@/components/admin/layout/dashboard-layout"
import ButtonImageEditor from "@/components/admin/platform-editor/button-image-editor"

export const metadata: Metadata = {
  title: "Editor de Botones Interactivos | Backoffice Congresos",
  description: "Herramienta para posicionar botones interactivos sobre la imagen de la plataforma",
}

export default function ButtonEditorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editor de Botones Interactivos</h1>
          <p className="text-muted-foreground">
            Diseña y posiciona botones interactivos sobre la imagen de la plataforma principal
          </p>
        </div>
        <ButtonImageEditor />
      </div>
    </DashboardLayout>
  )
}
