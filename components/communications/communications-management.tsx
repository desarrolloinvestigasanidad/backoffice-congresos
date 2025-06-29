"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Edit } from "lucide-react";
import { Loader2, AlertCircle } from "lucide-react";
import CommunicationFilters from "./communication-filters"; // Reutilizamos tus filtros

// Interfaz para los datos de la comunicación en la lista
interface CommunicationSummary {
  id: number;
  title: string;
  status: "draft" | "submitted" | "review" | "accepted" | "rejected";
  updatedAt: string;
  authors: { firstName: string; lastName: string; role: string }[];
  congress: { title: string };
}

// Reutilizamos tu función para las insignias de estado
const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return <Badge variant='secondary'>Borrador</Badge>;
    case "submitted":
      return <Badge variant='default'>Enviado</Badge>;
    case "review":
      return <Badge variant='outline'>En Revisión</Badge>;
    case "accepted":
      return <Badge variant='default'>Aceptado</Badge>;
    case "rejected":
      return <Badge variant='destructive'>Rechazado</Badge>;
    default:
      return <Badge variant='secondary'>Desconocido</Badge>;
  }
};

export function CommunicationsManagement() {
  const { token } = useAuth();
  const [communications, setCommunications] = useState<CommunicationSummary[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "all", type: "all" });

  useEffect(() => {
    const fetchCommunications = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        // Por ahora cargamos todas, luego los filtros aplicarán la lógica
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/comunicaciones`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok)
          throw new Error("No se pudieron cargar las comunicaciones.");
        const data = await response.json();
        setCommunications(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunications();
  }, [token]);

  const filteredCommunications = communications.filter((comm) => {
    const matchesSearch = comm.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    // Aquí se aplicaría la lógica de los filtros de estado y tipo
    return matchesSearch;
  });

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

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>Todas las Comunicaciones</CardTitle>
            <div className='relative w-full max-w-sm'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Buscar por título...'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* <CommunicationFilters onFilterChange={setFilters} /> */}
          <div className='mt-4 border rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor Principal</TableHead>
                  <TableHead>Congreso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className='text-right'>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommunications.map((comm) => {
                  const mainAuthor = comm.authors.find(
                    (a) => a.role === "principal"
                  );
                  return (
                    <TableRow key={comm.id}>
                      <TableCell className='font-medium'>
                        {comm.title}
                      </TableCell>
                      <TableCell>
                        {mainAuthor?.firstName} {mainAuthor?.lastName}
                      </TableCell>
                      <TableCell>{comm.congress?.title}</TableCell>
                      <TableCell>{getStatusBadge(comm.status)}</TableCell>
                      <TableCell className='text-right'>
                        <Link
                          href={`/dashboard/communications/review/${comm.id}`}>
                          <Button variant='outline' size='sm'>
                            <Eye className='mr-2 h-4 w-4' />
                            Revisar
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
