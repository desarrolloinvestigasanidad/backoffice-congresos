import { Card, CardContent } from "@/components/ui/card"
import { FileText, CreditCard, Award, CheckCircle } from "lucide-react"

// Datos que vendrán del backend/API
const userStats = {
  comunicaciones: 0,
  pagado: 0,
  certificados: 0,
  estado: "Activo",
}

export default function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{userStats.comunicaciones}</div>
          <div className="text-sm text-muted-foreground">Comunicaciones</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">€{userStats.pagado}</div>
          <div className="text-sm text-muted-foreground">Pagado</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">{userStats.certificados}</div>
          <div className="text-sm text-muted-foreground">Certificados</div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="w-8 h-8 text-accent" />
          </div>
          <div className="text-2xl font-bold text-accent">{userStats.estado}</div>
          <div className="text-sm text-muted-foreground">Estado</div>
        </CardContent>
      </Card>
    </div>
  )
}
