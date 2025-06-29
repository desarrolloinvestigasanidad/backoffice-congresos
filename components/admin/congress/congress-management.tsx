"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // <-- 1. IMPORTAMOS EL HOOK
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { CongressList } from "./congress-list";
import { CongressForm } from "./congress-form";
import { CongressStats } from "./congress-stats";

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
  // --- 2. OBTENEMOS EL TOKEN DINÁMICO DEL CONTEXTO ---
  const { token } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCongress, setEditingCongress] = useState<Congress | null>(null);
  const [congresses, setCongresses] = useState<Congress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCongresses = async () => {
    // Solo intentamos cargar si hay un token
    if (!token) {
      setIsLoading(false);
      setError("No autenticado. Por favor, inicia sesión.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // --- 3. USAMOS EL TOKEN DEL CONTEXTO ---
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/congresses`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        // Si el token ha caducado, la API devolverá 401
        if (response.status === 401)
          throw new Error(
            "Tu sesión ha caducado. Por favor, vuelve a iniciar sesión."
          );
        throw new Error("No se pudieron cargar los congresos.");
      }
      const data = await response.json();
      setCongresses(data);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. HACEMOS QUE EL useEffect DEPENDA DEL TOKEN ---
  // Así, solo se ejecutará cuando el token esté disponible.
  useEffect(() => {
    fetchCongresses();
  }, [token]);

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
    fetchCongresses(); // Vuelve a cargar los datos
  };

  const handleDelete = async (congressId: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este congreso?"))
      return;
    if (!token) {
      alert("Tu sesión ha caducado. Por favor, vuelve a iniciar sesión.");
      return;
    }

    try {
      // --- 3. USAMOS EL TOKEN DEL CONTEXTO ---
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

      <CongressStats congresses={congresses} />

      <CongressList
        congresses={congresses}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
