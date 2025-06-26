"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { UserForm } from "./user-form";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Interfaz para el objeto usuario, usada en todo el componente
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  // Puedes añadir cualquier otro campo que devuelva tu API y quieras usar
}

// --- SUB-COMPONENTE PARA RENDERIZAR LA LISTA ---
function UserList({
  users,
  isLoading,
  error,
  searchTerm,
  onEdit,
  onDelete,
}: {
  users: User[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  onEdit: (user: User) => void;
  onDelete: (id: string | number) => void;
}) {
  if (isLoading)
    return (
      <div className='flex justify-center p-10'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  if (error)
    return (
      <div className='text-red-600 text-center p-10'>
        <AlertCircle className='mx-auto h-8 w-8 mb-2' />
        <p>{error}</p>
      </div>
    );

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredUsers.length === 0 && !isLoading) {
    return (
      <Card>
        <CardContent className='text-center py-8'>
          <p className='text-muted-foreground'>No se encontraron usuarios.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className='flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
              <div>
                <p className='font-medium'>
                  {user.firstName} {user.lastName}
                </p>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant={user.roleId === 1 ? "default" : "secondary"}>
                  {user.roleId === 1 ? "Admin" : "Cliente"}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Abrir menú</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <Link href={`/dashboard/users/${user.id}`}>
                        <Eye className='mr-2 h-4 w-4' />
                        Ver detalles
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEdit(user)}
                      className='cursor-pointer'>
                      <Edit className='mr-2 h-4 w-4' />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='text-red-600 focus:text-red-500 cursor-pointer'
                      onClick={() => onDelete(user.id)}>
                      <Trash2 className='mr-2 h-4 w-4' />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// --- COMPONENTE PRINCIPAL DE GESTIÓN DE USUARIOS ---
export function UserManagement() {
  const { token } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!token) throw new Error("No autenticado.");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("No se pudieron cargar los usuarios.");
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingUser(null);
    fetchUsers(); // Vuelve a cargar los datos para ver los cambios
  };

  const handleDelete = async (userId: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?"))
      return;
    try {
      if (!token) throw new Error("No autenticado.");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el usuario.");
      }
      setUsers((prev) => prev.filter((u) => u.id !== userId));
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
            placeholder='Buscar por nombre, apellidos o email...'
            className='pl-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className='h-4 w-4 mr-2' />
          Añadir Usuario
        </Button>
      </div>

      <UserList
        users={users}
        isLoading={isLoading}
        error={error}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <UserForm
          onClose={handleCloseForm}
          onSave={handleSave}
          userToEdit={editingUser}
        />
      )}
    </div>
  );
}
