import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Bell } from "lucide-react"

export default function PlatformHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/images/logo-congreso.png" alt="Logo Congresos Médicos" fill className="object-contain" />
          </div>
          <span className="font-bold text-primary">Congresos Médicos</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/plataforma" className="text-sm font-medium hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/plataforma/comunicaciones" className="text-sm font-medium hover:text-primary transition-colors">
            Comunicaciones
          </Link>
          <Link href="/plataforma/certificados" className="text-sm font-medium hover:text-primary transition-colors">
            Certificados
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Link href="/plataforma/perfil">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Cerrar sesión
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
