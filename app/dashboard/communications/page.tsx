// app/backoffice/comunicaciones/page.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Comm {
  id: number;
  title: string;
  status: string;
  congressName: string;
}

export default function BackofficeCommsPage() {
  const [items, setItems] = useState<Comm[]>([]);
  useEffect(() => {
    fetch("/api/comunicaciones/admin/review")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Revisión de Comunicaciones</h1>
      <div className='space-y-4'>
        {items.map((c) => (
          <Card key={c.id}>
            <CardContent className='flex justify-between items-center'>
              <div>
                <h2 className='font-semibold'>{c.title}</h2>
                <p className='text-sm text-muted-foreground'>
                  {c.congressName}
                </p>
                <p className='text-sm'>Estado: {c.status}</p>
              </div>
              <Link href={`/backoffice/comunicaciones/${c.id}`}>
                <Button size='sm'>Revisar →</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
