"use client";

import { useState, useEffect } from "react";
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
import {
  Euro,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  MoreHorizontal,
  FileText,
  Download,
} from "lucide-react";
import { Loader2 } from "lucide-react";

// Interfaz para los datos que esperamos de cada comunicación
interface CommunicationPayment {
  id: number;
  title: string;
  amount: number;
  paymentStatus: "paid" | "pending" | "failed";
  updatedAt: string;
  user: {
    // Asumimos que el autor principal es el usuario asociado
    firstName: string;
    lastName: string;
  };
  congress: {
    title: string;
  };
}

// Reutilizamos tu función para las insignias de estado
const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant='outline' className='text-yellow-600 border-yellow-300'>
          Pendiente
        </Badge>
      );
    case "paid":
      return (
        <Badge variant='outline' className='text-green-600 border-green-300'>
          Pagado
        </Badge>
      );
    case "failed":
      return <Badge variant='destructive'>Fallido</Badge>;
    default:
      return <Badge variant='secondary'>Desconocido</Badge>;
  }
};

export function PaymentsManagement() {
  const { token } = useAuth();
  const [payments, setPayments] = useState<CommunicationPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!token) {
        setError("No autenticado.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        // Obtenemos todas las comunicaciones para ver su estado de pago
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/comunicaciones`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok)
          throw new Error("No se pudieron cargar los datos de pago.");
        const data = await response.json();
        setPayments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, [token]);

  // Calculamos las estadísticas a partir de los datos obtenidos
  const totalPaid = payments
    .filter((p) => p.paymentStatus === "paid")
    .reduce((sum, p) => sum + (p.amount || 8), 0); // Asumimos 8€ si no hay `amount`

  const totalPending = payments
    .filter((p) => p.paymentStatus === "pending")
    .reduce((sum, p) => sum + (p.amount || 8), 0);

  const filteredPayments = payments.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${p.user?.firstName || ""} ${p.user?.lastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
    <div className='space-y-6'>
      {/* Tarjetas de Estadísticas */}
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Pagado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>€{totalPaid.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>€{totalPending.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{payments.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Transacciones */}
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle>Todas las Transacciones</CardTitle>
            <div className='relative w-full max-w-sm'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Buscar por título, autor...'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comunicación</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className='text-right'>Importe</TableHead>
                <TableHead className='text-center'>Estado</TableHead>
                <TableHead>Fecha Últ. Act.</TableHead>
                <TableHead className='text-right'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className='font-medium'>{p.title}</TableCell>
                  <TableCell>
                    {p.user?.firstName} {p.user?.lastName}
                  </TableCell>
                  <TableCell className='text-right'>
                    €{(p.amount || 8).toFixed(2)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {getStatusBadge(p.paymentStatus)}
                  </TableCell>
                  <TableCell>
                    {new Date(p.updatedAt).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                          <FileText className='mr-2 h-4 w-4' />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className='mr-2 h-4 w-4' />
                          Descargar Factura
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPayments.length === 0 && (
            <p className='text-center py-8 text-muted-foreground'>
              No se encontraron pagos.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
