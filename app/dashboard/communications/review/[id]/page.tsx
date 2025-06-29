"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import CommunicationDetail from "@/components/communications/communication-detail";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";
import { Loader2, AlertCircle, Send, ArrowLeft } from "lucide-react";

export default function ReviewCommunicationPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();

  const [communication, setCommunication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para el formulario de revisión
  const [reviewComment, setReviewComment] = useState("");
  const [isPublicComment, setIsPublicComment] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Solo se ejecuta si tenemos un ID y un token
    if (id && token) {
      const fetchCommunication = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/comunicaciones/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok)
            throw new Error("No se pudo cargar la comunicación.");
          const data = await response.json();
          setCommunication(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCommunication();
    }
  }, [id, token]);

  const handleReviewSubmit = async (decision: "accept" | "reject") => {
    if (!reviewComment.trim()) {
      alert("Por favor, añade un comentario de revisión.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comunicaciones/admin/${id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            decision,
            comment: reviewComment,
            isPublic: isPublicComment,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Error al enviar la revisión.");

      alert("Revisión enviada con éxito.");
      router.push("/dashboard/communications"); // Volvemos a la lista
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para renderizar el contenido principal (loading, error, o los detalles)
  const renderContent = () => {
    if (isLoading)
      return (
        <div className='flex justify-center items-center py-20'>
          <Loader2 className='h-12 w-12 animate-spin' />
        </div>
      );
    if (error)
      return (
        <div className='text-red-600 text-center p-10 bg-red-50 rounded-lg'>
          <AlertCircle className='mx-auto h-8 w-8 mb-2' />
          <p>{error}</p>
        </div>
      );
    if (!communication)
      return (
        <div className='text-center p-10'>Comunicación no encontrada.</div>
      );

    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Columna de detalles de la comunicación */}
        <div className='lg:col-span-2'>
          <CommunicationDetail communication={communication} />
        </div>

        {/* Columna de acciones de revisión */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-6'>
            <CardHeader>
              <CardTitle>Panel de Revisión</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <Label htmlFor='reviewComment'>Comentarios para el autor</Label>
                <Textarea
                  id='reviewComment'
                  placeholder='Añade tus notas, sugerencias o motivos de la decisión...'
                  rows={8}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='isPublicComment'
                  checked={isPublicComment}
                  onCheckedChange={(checked) =>
                    setIsPublicComment(checked as boolean)
                  }
                  disabled={isSubmitting}
                />
                <Label htmlFor='isPublicComment' className='text-sm'>
                  Hacer este comentario visible para el autor
                </Label>
              </div>
              <div className='flex gap-2 pt-2 border-t'>
                <Button
                  className='flex-1 bg-red-600 hover:bg-red-700'
                  onClick={() => handleReviewSubmit("reject")}
                  disabled={isSubmitting || !reviewComment.trim()}>
                  {isSubmitting ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    "Rechazar"
                  )}
                </Button>
                <Button
                  className='flex-1 bg-green-600 hover:bg-green-700'
                  onClick={() => handleReviewSubmit("accept")}
                  disabled={isSubmitting || !reviewComment.trim()}>
                  {isSubmitting ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    "Aceptar"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Revisión de Comunicación
            </h1>
            <p className='text-muted-foreground'>
              {isLoading
                ? "Cargando detalles..."
                : `ID de Comunicación: ${communication?.id || id}`}
            </p>
          </div>
          <Button
            variant='outline'
            onClick={() => router.push("/dashboard/communications")}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver a la lista
          </Button>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}
