"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Loader2, AlertCircle } from "lucide-react";

// Interfaz para los datos del congreso, necesaria para las props
interface Congress {
  id: string | number;
  title: string;
  description: string;
  status: "draft" | "upcoming" | "active" | "finished";
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  category: string;
  organizer: string;
}

interface CongressFormProps {
  congressToEdit?: Congress | null;
  onClose: () => void;
  onSave: () => void;
}

export function CongressForm({
  onClose,
  onSave,
  congressToEdit,
}: CongressFormProps) {
  const isEditMode = !!congressToEdit;

  // El estado inicial del formulario está vacío
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: 0,
    category: "",
    organizer: "",
    status: "draft",
  });

  // Este efecto se ejecuta si se pasa un congreso para editar, y rellena el formulario
  useEffect(() => {
    if (isEditMode && congressToEdit) {
      const formattedStartDate = congressToEdit.startDate
        ? new Date(congressToEdit.startDate).toISOString().split("T")[0]
        : "";
      const formattedEndDate = congressToEdit.endDate
        ? new Date(congressToEdit.endDate).toISOString().split("T")[0]
        : "";

      setFormData({
        title: congressToEdit.title,
        description: congressToEdit.description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        location: congressToEdit.location,
        maxParticipants: congressToEdit.maxParticipants || 0,
        category: congressToEdit.category || "",
        organizer: congressToEdit.organizer || "",
        status: congressToEdit.status,
      });
    }
  }, [congressToEdit, isEditMode]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    try {
      // Usamos el token que has puesto para pruebas. En producción, debería venir de un contexto de autenticación.
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NTk5MDg1UyIsInN1YiI6IjQ0NTk5MDg1UyIsInJvbGVJZCI6MiwiaWF0IjoxNzUwOTMxNDMzLCJleHAiOjE3NTEwMTc4MzN9.Khh7aiJ_TmW6hVhFKStEErVtDja8LD-Zi6QxhLQenkI";
      if (!token) throw new Error("No se encontró el token de autenticación.");

      const apiUrl = isEditMode
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses/${congressToEdit?.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses`;

      const method = isEditMode ? "PUT" : "POST";

      const bodyToSend = {
        ...formData,
        maxParticipants: Number(formData.maxParticipants) || 0,
      };

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error al ${isEditMode ? "actualizar" : "crear"} el congreso`
        );
      }

      onSave(); // Llama a la función para refrescar la lista
      onClose(); // Cierra el formulario
    } catch (error: any) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <Card className='w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>
                {isEditMode ? "Editar Congreso" : "Nuevo Congreso"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? `Editando los detalles de "${congressToEdit?.title}"`
                  : "Configura todos los detalles del congreso"}
              </CardDescription>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              disabled={isSubmitting}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {apiError && (
              <div className='mb-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800'>
                <AlertCircle className='h-5 w-5' />
                {apiError}
              </div>
            )}

            <Tabs defaultValue='basic' className='space-y-4'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='basic'>Información Básica</TabsTrigger>
                <TabsTrigger value='details'>Detalles y Estado</TabsTrigger>
              </TabsList>

              <TabsContent value='basic' className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Título del Congreso</Label>
                  <Input
                    id='title'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder='Ej: XV Congreso Internacional de Medicina'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='description'>Descripción</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder='Describe el congreso, sus objetivos y temáticas principales...'
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value='details' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='startDate'>Fecha de Inicio</Label>
                    <Input
                      id='startDate'
                      type='date'
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='endDate'>Fecha de Fin</Label>
                    <Input
                      id='endDate'
                      type='date'
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='location'>Ubicación</Label>
                    <Input
                      id='location'
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder='Ej: Madrid, España'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='maxParticipants'>
                      Máximo de Participantes
                    </Label>
                    <Input
                      id='maxParticipants'
                      type='number'
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxParticipants: e.target.valueAsNumber,
                        })
                      }
                      placeholder='500'
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='status'>Estado del Congreso</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='draft'>Borrador</SelectItem>
                      <SelectItem value='upcoming'>Próximo</SelectItem>
                      <SelectItem value='active'>Activo</SelectItem>
                      <SelectItem value='finished'>Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className='flex justify-end gap-2 mt-6 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={onClose}
                disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {isSubmitting
                  ? isEditMode
                    ? "Guardando..."
                    : "Creando..."
                  : isEditMode
                  ? "Guardar Cambios"
                  : "Crear Congreso"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
