// app/backoffice/comunicaciones/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CommDetail {
  id: number;
  title: string;
  congressName: string;
}

export default function ReviewCommunicationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();

  const [comm, setComm] = useState<CommDetail | null>(null);
  const [decision, setDecision] = useState<"accept" | "reject">("accept");
  const [comment, setComment] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/comunicaciones/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setComm({
          id: data.id,
          title: data.title,
          congressName: data.congressName,
        })
      )
      .catch(() => setComm(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await fetch(`/api/comunicaciones/admin/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, comment, isPublic }),
    });
    if (res.ok) {
      router.push("/backoffice/comunicaciones");
    } else {
      alert("Error al enviar la revisión");
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!comm) return <p>Comunicación no encontrada</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Revisar Comunicación</h1>
      <Card>
        <CardContent>
          <h2 className='text-lg font-semibold'>{comm.title}</h2>
          <p className='text-sm text-muted-foreground mb-4'>
            {comm.congressName}
          </p>

          <div className='space-y-4'>
            <div>
              <Label htmlFor='decision'>Decisión</Label>
              <Select
                value={decision}
                onValueChange={(val) => setDecision(val as any)}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='accept'>Aceptar</SelectItem>
                  <SelectItem value='reject'>Rechazar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor='comment'>Comentario</Label>
              <Textarea
                id='comment'
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className='flex items-center gap-2'>
              <input
                id='public'
                type='checkbox'
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className='h-4 w-4 text-primary'
              />
              <Label htmlFor='public'>Hacer comentario público</Label>
            </div>

            <div className='flex gap-2'>
              <Button variant='outline' onClick={() => router.back()}>
                Volver
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar Revisión"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
