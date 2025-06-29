"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // <-- 1. IMPORTAMOS EL HOOK DE AUTENTICACIÓN
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, X } from "lucide-react";
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
}
interface UserFormProps {
  userToEdit?: User | null;
  onClose: () => void;
  onSave: () => void;
}

// He movido la interfaz aquí para que el componente sea autocontenido
interface UserFormData {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: string;
}

export function UserForm({ onClose, onSave }: UserFormProps) {
  // Obtenemos el token del admin logueado desde el contexto
  const { token } = useAuth();

  const [formData, setFormData] = useState<UserFormData>({
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roleId: "1", // Por defecto, creamos un Admin
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, roleId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Usamos el token que viene del contexto de autenticación
      if (!token) {
        throw new Error("No estás autenticado para realizar esta acción.");
      }

      // --- CAMBIO CLAVE: Apuntamos a la ruta correcta para crear usuarios como admin ---
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, // ANTES: /auth/register
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Token del admin que crea al usuario
          },
          body: JSON.stringify({
            ...formData,
            roleId: parseInt(formData.roleId, 10),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario.");
      }

      onSave(); // Llama a la función para refrescar la lista
      onClose(); // Cierra el modal
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>Añadir Nuevo Usuario</CardTitle>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              disabled={isSubmitting}>
              <X className='h-4 w-4' />
            </Button>
          </div>
          <CardDescription>
            Rellena los campos obligatorios para crear una nueva cuenta.
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
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>Nombre</Label>
                <Input
                  id='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>Apellidos</Label>
                <Input
                  id='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='id'>DNI / NIE</Label>
              <Input
                id='id'
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña</Label>
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='roleId'>Rol de Usuario</Label>
              <Select value={formData.roleId} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>Administrador</SelectItem>
                  <SelectItem value='2'>Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Añadir Usuario
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
