"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, X } from "lucide-react";

// Interfaz para que el formulario sepa qué datos esperar
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
}

interface UserFormProps {
  userToEdit?: User | null; // <-- NUEVA PROPIEDAD para recibir el usuario a editar
  onClose: () => void;
  onSave: () => void;
}

export function UserForm({ onClose, onSave, userToEdit }: UserFormProps) {
  const { token } = useAuth();
  const isEditMode = !!userToEdit;

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "", // La contraseña siempre empieza vacía por seguridad
    firstName: "",
    lastName: "",
    roleId: "1",
  });

  // --- NUEVO: useEffect que rellena el formulario si estamos en modo edición ---
  useEffect(() => {
    if (isEditMode && userToEdit) {
      setFormData({
        id: userToEdit.id,
        email: userToEdit.email,
        password: "", // Dejamos la contraseña en blanco
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        roleId: String(userToEdit.roleId),
      });
    }
  }, [userToEdit, isEditMode]);

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
      if (!token) throw new Error("No estás autenticado.");

      // La URL y el método cambian si es edición o creación
      const apiUrl = isEditMode
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userToEdit.id}` // <-- Ruta para actualizar
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`; // <-- Ruta para crear (usando userController)

      const method = isEditMode ? "PUT" : "POST";

      const bodyToSend: any = {
        ...formData,
        roleId: parseInt(formData.roleId, 10),
      };

      // Si estamos editando y no se ha introducido una nueva contraseña, la eliminamos del envío
      // para no sobreescribir la existente en el backend con un string vacío.
      if (isEditMode && !formData.password) {
        delete bodyToSend.password;
      }

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Ocurrió un error.");

      onSave();
      onClose();
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
            <CardTitle>
              {isEditMode ? "Editar Usuario" : "Añadir Nuevo Usuario"}
            </CardTitle>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              disabled={isSubmitting}>
              <X className='h-4 w-4' />
            </Button>
          </div>
          <CardDescription>
            {isEditMode
              ? "Modifica los datos del usuario."
              : "Rellena los campos para crear una nueva cuenta."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className='space-y-4'>
            {/* ... (resto del formulario) ... */}
            <div className='space-y-2'>
              <Label htmlFor='id'>DNI / NIE</Label>
              {/* En modo edición, el DNI no se puede cambiar */}
              <Input
                id='id'
                value={formData.id}
                onChange={handleChange}
                required
                disabled={isEditMode}
              />
            </div>
            {/* ... */}
            <div className='space-y-2'>
              <Label htmlFor='password'>Contraseña</Label>
              {/* En modo edición, este campo es opcional */}
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  isEditMode ? "Dejar en blanco para no cambiar" : ""
                }
              />
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
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              {isEditMode ? "Guardar Cambios" : "Añadir Usuario"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
