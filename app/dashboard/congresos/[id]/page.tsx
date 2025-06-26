"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// La interfaz para los datos del congreso
interface Congress {
  id: string | number;
  title: string;
  description: string;
  status: "draft" | "upcoming" | "active" | "finished";
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
}

export default function CongressDetailPage() {
  const params = useParams();
  const { id } = params;

  const [congress, setCongress] = useState<Congress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCongressDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NTk5MDg1UyIsInN1YiI6IjQ0NTk5MDg1UyIsInJvbGVJZCI6MiwiaWF0IjoxNzUwOTMxNDMzLCJleHAiOjE3NTEwMTc4MzN9.Khh7aiJ_TmW6hVhFKStEErVtDja8LD-Zi6QxhLQenkI";
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("No se pudo cargar el congreso.");
          const data = await response.json();
          setCongress(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCongressDetails();
    }
  }, [id]);

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
  if (!congress)
    return <div className='text-center p-10'>Congreso no encontrado.</div>;

  return (
    <div className='container mx-auto p-4 md:p-6 space-y-6'>
      <Link href='/dashboard/congresos'>
        <Button variant='outline'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Volver a la lista
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <div>
              <CardTitle className='text-2xl md:text-3xl'>
                {congress.title}
              </CardTitle>
              <CardDescription className='mt-2 text-lg'>
                {congress.description}
              </CardDescription>
            </div>
            <Badge className='text-base'>{congress.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div className='flex items-center gap-3 p-4 border rounded-lg'>
            <Calendar className='h-8 w-8 text-muted-foreground' />
            <div>
              <p className='text-sm text-muted-foreground'>Fechas</p>
              <p className='font-semibold'>
                {new Date(congress.startDate).toLocaleDateString()} -{" "}
                {new Date(congress.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 p-4 border rounded-lg'>
            <MapPin className='h-8 w-8 text-muted-foreground' />
            <div>
              <p className='text-sm text-muted-foreground'>Ubicación</p>
              <p className='font-semibold'>{congress.location}</p>
            </div>
          </div>
          <div className='flex items-center gap-3 p-4 border rounded-lg'>
            <Users className='h-8 w-8 text-muted-foreground' />
            <div>
              <p className='text-sm text-muted-foreground'>Participantes</p>
              <p className='font-semibold'>0 / {congress.maxParticipants}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Aquí podrías añadir más tarjetas con otras secciones: ponentes, programa, etc. */}
    </div>
  );
}
