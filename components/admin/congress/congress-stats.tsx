"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";

// La interfaz debe estar disponible para las props
interface Congress {
  id: string | number;
  status: "draft" | "upcoming" | "active" | "finished";
  participants?: number; // Hacemos participants opcional
  // ...puedes añadir más campos si los necesitas para las estadísticas
}

interface CongressStatsProps {
  congresses: Congress[]; // Recibe la lista de congresos como prop
}

export function CongressStats({ congresses }: CongressStatsProps) {
  // Calculamos las estadísticas dinámicamente
  const totalCongresses = congresses.length;
  const activeCongresses = congresses.filter(
    (c) => c.status === "active"
  ).length;
  const upcomingCongresses = congresses.filter(
    (c) => c.status === "upcoming"
  ).length;

  // Sumamos los participantes de todos los congresos (si el dato existe)
  const totalParticipants = congresses.reduce(
    (acc, congress) => acc + (congress.participants || 0),
    0
  );

  const stats = [
    {
      title: "Total Congresos",
      value: totalCongresses.toString(),
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Congresos Activos",
      value: activeCongresses.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Próximos Eventos",
      value: upcomingCongresses.toString(),
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Total Participantes",
      value: totalParticipants.toLocaleString("es-ES"), // Formato de miles para España
      icon: Users,
      color: "text-purple-600",
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            {/* Podríamos añadir lógicas de cambio si tuvieramos datos históricos */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
