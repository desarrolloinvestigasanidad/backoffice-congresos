"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Calendar,
  MapPin,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Congress {
  id: string | number;
  title: string;
  description: string;
  status: "draft" | "upcoming" | "active" | "finished";
  startDate: string;
  endDate: string;
  location: string;
  participants?: number;
  maxParticipants: number;
  category: string;
  organizer: string;
}

// Las props que recibe el componente, ahora gestionadas por su padre
interface CongressListProps {
  congresses: Congress[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  onEdit: (congress: Congress) => void;
  onDelete: (id: string | number) => void;
}

export function CongressList({
  congresses,
  isLoading,
  error,
  searchTerm,
  onEdit,
  onDelete,
}: CongressListProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      {
        label: string;
        variant: "default" | "secondary" | "outline" | "destructive";
      }
    > = {
      active: { label: "Activo", variant: "default" },
      upcoming: { label: "Próximo", variant: "secondary" },
      draft: { label: "Borrador", variant: "outline" },
      finished: { label: "Finalizado", variant: "destructive" },
    };
    const config = statusConfig[status] || {
      label: "Desconocido",
      variant: "outline",
    };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredCongresses = congresses.filter(
    (congress) =>
      congress.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (congress.category &&
        congress.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (congress.organizer &&
        congress.organizer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
    <div className='space-y-4'>
      {filteredCongresses.length === 0 && (
        <Card>
          <CardContent className='text-center py-8'>
            <p className='text-muted-foreground'>
              No se encontraron congresos.
            </p>
          </CardContent>
        </Card>
      )}

      {filteredCongresses.map((congress) => (
        <Card key={congress.id}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <CardTitle className='text-lg'>{congress.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  {congress.description}
                </p>
              </div>
              <div className='flex items-center gap-2'>
                {getStatusBadge(congress.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                      <span className='sr-only'>Abrir menú</span>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      {/* Enlace a la página de detalles */}
                      <Link href={`/dashboard/congresos/${congress.id}`}>
                        <Eye className='mr-2 h-4 w-4' /> Ver detalles
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(congress)}>
                      <Edit className='mr-2 h-4 w-4' /> Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className='text-red-600 focus:text-red-500'
                      onClick={() => onDelete(congress.id)}>
                      <Trash2 className='mr-2 h-4 w-4' /> Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-muted-foreground' />
                <div className='text-sm'>
                  <p className='font-medium'>
                    {new Date(congress.startDate).toLocaleDateString()}
                  </p>
                  <p className='text-muted-foreground'>
                    hasta {new Date(congress.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <p className='text-sm font-medium'>{congress.location}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Users className='h-4 w-4 text-muted-foreground' />
                <p className='text-sm font-medium'>
                  {congress.participants || 0} / {congress.maxParticipants}{" "}
                  part.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
