"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si la carga ha terminado y no hay token, redirigimos al login.
    if (!loading && !token) {
      router.push("/login");
    }
  }, [loading, token, router]);

  // Mientras se verifica el token, mostramos un spinner a pantalla completa.
  // Esto evita parpadeos o que se muestre contenido protegido por un instante.
  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen w-screen'>
        <Loader2 className='h-12 w-12 animate-spin text-primary' />
      </div>
    );
  }

  // Si después de cargar, sigue sin haber un usuario o token, no renderizamos nada
  // porque el useEffect ya estará redirigiendo.
  if (!user || !token) {
    return null;
  }

  // Si todo está correcto (ha terminado de cargar y hay un usuario),
  // mostramos el contenido protegido.
  return <>{children}</>;
}
