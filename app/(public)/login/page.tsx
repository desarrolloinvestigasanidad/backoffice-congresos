"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();

  // --- CAMBIO 1: El estado ahora es para 'id' en lugar de 'email' ---
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // --- CAMBIO 2: Enviamos 'id' en el body de la petición ---
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error en el inicio de sesión.");
      }

      auth.login(data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Backoffice Login</CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder al panel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            {error && (
              <div className='flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800'>
                <AlertCircle className='h-5 w-5 flex-shrink-0' />
                {error}
              </div>
            )}
            {/* --- CAMBIO 3: El formulario ahora pide el ID (DNI/NIE) --- */}
            <div className='space-y-2'>
              <Label htmlFor='id'>ID (DNI / NIE)</Label>
              <Input
                id='id'
                type='text'
                placeholder='12345678A'
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña</Label>
              <Input
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
