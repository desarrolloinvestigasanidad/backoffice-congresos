import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Users, Euro, Info } from "lucide-react"

interface Author {
  id: string
  name: string
  email: string
  role: "principal" | "coautor"
}

interface PaymentSummaryProps {
  principalAuthor?: Author
  coauthors: Author[]
  totalCost: number
}

export default function PaymentSummary({ principalAuthor, coauthors, totalCost }: PaymentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Resumen de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Autor Principal */}
        {principalAuthor && (
          <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{principalAuthor.name}</p>
                <p className="text-sm text-muted-foreground">Autor Principal</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">€8.00</p>
              <Badge className="bg-primary text-primary-foreground">Requerido</Badge>
            </div>
          </div>
        )}

        {/* Coautores */}
        {coauthors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Coautores ({coauthors.length})</h4>
            {coauthors.map((coauthor) => (
              <div key={coauthor.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-full">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{coauthor.name}</p>
                    <p className="text-sm text-muted-foreground">Coautor</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-green-600">Gratis</p>
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Sin coste
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-full">
              <Euro className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-lg">Total a Pagar</p>
              <p className="text-sm text-muted-foreground">
                {coauthors.length + 1} participante{coauthors.length > 0 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-2xl text-accent">€{totalCost.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">IVA incluido</p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Información de pago:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>El pago se realizará después de enviar la comunicación</li>
                <li>Solo el autor principal debe realizar el pago</li>
                <li>Los coautores recibirán acceso gratuito una vez confirmado el pago</li>
                <li>El pago incluye acceso completo al congreso y certificados</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
