"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { CongressList } from "./congress-list";
import { CongressForm } from "./congress-form";
import { CongressStats } from "./congress-stats";

// La interfaz debe estar definida o importada aquí para que todo funcione
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
  participants?: number;
}

export function CongressManagement() {
  // --- Estados para la UI y la interacción ---
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCongress, setEditingCongress] = useState<Congress | null>(null);

  // --- Estados para los datos, ahora centralizados en este componente padre ---
  const [congresses, setCongresses] = useState<Congress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos, se puede llamar para recargar
  const fetchCongresses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Reemplaza esto con tu método de obtención de token (ej: localStorage.getItem('token'))
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NTk5MDg1UyIsInN1YiI6IjQ0NTk5MDg1UyIsInJvbGVJZCI6MiwiaWF0IjoxNzUwOTMxNDMzLCJleHAiOjE3NTEwMTc4MzN9.Khh7aiJ_TmW6hVhFKStEErVtDja8LD-Zi6QxhLQenkI";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("No se pudieron cargar los congresos.");
      const data = await response.json();
      setCongresses(data);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtiene los datos la primera vez que se carga el componente
  useEffect(() => {
    fetchCongresses();
  }, []);

  // --- Funciones de manejo de acciones ---

  const handleEdit = (congress: Congress) => {
    setEditingCongress(congress);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCongress(null);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingCongress(null);
    fetchCongresses(); // Vuelve a cargar los datos para ver los cambios
  };

  const handleDelete = async (congressId: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este congreso?"))
      return;

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ0NTk5MDg1UyIsInN1YiI6IjQ0NTk5MDg1UyIsInJvbGVJZCI6MiwiaWF0IjoxNzUwOTMxNDMzLCJleHAiOjE3NTEwMTc4MzN9.Khh7aiJ_TmW6hVhFKStEErVtDja8LD-Zi6QxhLQenkI";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses/${congressId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el congreso.");
      }
      // Actualiza el estado local para reflejar la eliminación al instante
      setCongresses((prev) => prev.filter((c) => c.id !== congressId));
    } catch (err: any) {
      console.error("Error al eliminar:", err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row gap-4 justify-between'>
        <div className='relative flex-1 sm:max-w-sm'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Buscar congresos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        <Button
          onClick={() => {
            setEditingCongress(null);
            setShowForm(true);
          }}>
          <Plus className='h-4 w-4 mr-2' />
          Nuevo Congreso
        </Button>
      </div>

      {/* El componente de estadísticas ahora recibe los datos reales */}
      <CongressStats congresses={congresses} />

      {/* La lista ahora es un componente más simple que recibe todo como props */}
      <CongressList
        congresses={congresses}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* El formulario se renderiza condicionalmente */}
      {showForm && (
        <CongressForm
          onClose={handleCloseForm}
          onSave={handleSave}
          congressToEdit={editingCongress}
        />
      )}
    </div>
  );
}
