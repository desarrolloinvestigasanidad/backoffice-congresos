"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  phone: string;
  country: string;
  professionalCategory: string;
  createdAt: string;
  role: { name: string };
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && token) {
      const fetchUserDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok)
            throw new Error("No se pudo cargar la información del usuario.");
          const data = await response.json();
          setUser(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserDetails();
    }
  }, [id, token]);

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='h-12 w-12 animate-spin' />
      </div>
    );
  if (error)
    return (
      <div className='text-red-600 text-center p-10'>
        <AlertCircle className='mx-auto h-8 w-8 mb-2' />
        <p>{error}</p>
      </div>
    );
  if (!user)
    return <div className='text-center p-10'>Usuario no encontrado.</div>;

  return (
    <div className='space-y-6'>
      <Button variant='outline' onClick={() => router.back()}>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Volver a la lista
      </Button>
      <Card>
        <CardHeader>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <CardTitle className='text-3xl'>
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription className='mt-2 text-lg'>
                Detalles del Perfil de Usuario
              </CardDescription>
            </div>
            <Badge className='text-base w-fit'>
              {user.role?.name || (user.roleId === 1 ? "Admin" : "Cliente")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='p-4 border rounded-lg space-y-2'>
            <h3 className='font-semibold'>Información de Contacto</h3>
            <div className='flex items-center gap-3'>
              <Mail className='h-4 w-4 text-muted-foreground' />
              <span>{user.email}</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='h-4 w-4 text-muted-foreground' />
              <span>{user.phone || "No especificado"}</span>
            </div>
          </div>
          <div className='p-4 border rounded-lg space-y-2'>
            <h3 className='font-semibold'>
              Información Profesional y Geográfica
            </h3>
            <div className='flex items-center gap-3'>
              <Briefcase className='h-4 w-4 text-muted-foreground' />
              <span>{user.professionalCategory || "No especificado"}</span>
            </div>
            <div className='flex items-center gap-3'>
              <MapPin className='h-4 w-4 text-muted-foreground' />
              <span>{user.country || "No especificado"}</span>
            </div>
          </div>
          <p className='text-xs text-muted-foreground text-right'>
            Miembro desde: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
