"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageUp, Save, VenetianMask, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TemplateData {
  headerText: string;
  title: string;
  bodyText: string;
  footerText: string;
  logoUrl: string | null;
  signatureUrl: string | null;
  backgroundColor: string;
}

// --- SUB-COMPONENTE DE VISTA PREVIA ---
function CertificatePreview({ data }: { data: TemplateData }) {
  return (
    <div
      className='p-4 sm:p-8 border-dashed border-2 border-gray-300 rounded-lg aspect-[1/1.414] w-full max-w-xl mx-auto shadow-lg overflow-hidden'
      style={{ backgroundColor: data.backgroundColor }}>
      <div className='flex flex-col h-full text-center'>
        <header className='mb-4'>
          {data.logoUrl ? (
            <img
              src={data.logoUrl}
              alt='Logo'
              className='h-16 mx-auto mb-2 object-contain'
            />
          ) : (
            <div className='h-16' />
          )}
          <p className='text-sm italic'>{data.headerText}</p>
        </header>
        <Separator className='my-2 md:my-4' />
        <main className='flex-1 flex flex-col justify-center py-2'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 md:mb-6'>
            {data.title}
          </h1>
          <p
            className='text-base sm:text-lg leading-relaxed whitespace-pre-line'
            dangerouslySetInnerHTML={{
              __html: data.bodyText
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;") // Sanitize HTML
                .replace(
                  /\[NOMBRE_COMPLETO\]/g,
                  '<b class="text-blue-600">Nombre Apellido Ejemplo</b>'
                )
                .replace(
                  /\[TITULO_CONGRESO\]/g,
                  "<i>Congreso de Ejemplo (2025)</i>"
                )
                .replace(/\n/g, "<br />"),
            }}
          />
        </main>
        <Separator className='my-2 md:my-4' />
        <footer className='mt-4'>
          {data.signatureUrl ? (
            <img
              src={data.signatureUrl}
              alt='Firma'
              className='h-12 mx-auto mb-2 object-contain'
            />
          ) : (
            <div className='h-12' />
          )}
          <p className='text-xs'>{data.footerText}</p>
        </footer>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL DEL EDITOR ---
export function CertificateTemplateCreator({
  onBack,
  onSaveTemplate,
}: {
  onBack: () => void;
  onSaveTemplate: (data: TemplateData) => void;
}) {
  const [templateData, setTemplateData] = useState<TemplateData>({
    headerText: "La Sociedad Médica de Congresos certifica que:",
    title: "CERTIFICADO DE ASISTENCIA",
    bodyText:
      "Se otorga el presente a:\n\n[NOMBRE_COMPLETO]\n\npor su valiosa asistencia y participación en el\n[TITULO_CONGRESO].",
    footerText: "Firmado digitalmente, Madrid.",
    logoUrl: null,
    signatureUrl: null,
    backgroundColor: "#FFFFFF",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTemplateData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleImageUpload = (field: "logoUrl" | "signatureUrl") => {
    const url = prompt(
      `Introduce la URL para la imagen (${
        field === "logoUrl" ? "Logo" : "Firma"
      }):`
    );
    if (url) {
      setTemplateData((prev) => ({ ...prev, [field]: url }));
    }
  };

  const handleSave = () => {
    onSaveTemplate(templateData);
    onBack();
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      <div className='lg:col-span-1'>
        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Editor de Plantilla</CardTitle>
              <Button variant='outline' size='sm' onClick={onBack}>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Volver a la lista
              </Button>
            </div>
            <CardDescription>
              Personaliza los campos de tu certificado. Los cambios se
              reflejarán en tiempo real.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Título del Certificado</Label>
              <Input
                id='title'
                value={templateData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='headerText'>Texto de Cabecera</Label>
              <Input
                id='headerText'
                value={templateData.headerText}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bodyText'>Cuerpo del Mensaje</Label>
              <Textarea
                id='bodyText'
                value={templateData.bodyText}
                onChange={handleInputChange}
                rows={6}
              />
              <p className='text-xs text-muted-foreground'>
                Placeholders: <Badge variant='outline'>[NOMBRE_COMPLETO]</Badge>{" "}
                <Badge variant='outline'>[TITULO_CONGRESO]</Badge>
              </p>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='footerText'>Texto del Pie de Página</Label>
              <Input
                id='footerText'
                value={templateData.footerText}
                onChange={handleInputChange}
              />
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-4'>
              <Button
                variant='outline'
                onClick={() => handleImageUpload("logoUrl")}>
                <ImageUp className='mr-2 h-4 w-4' />
                Logo
              </Button>
              <Button
                variant='outline'
                onClick={() => handleImageUpload("signatureUrl")}>
                <VenetianMask className='mr-2 h-4 w-4' />
                Firma
              </Button>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='backgroundColor'>Color de Fondo</Label>
              <Input
                id='backgroundColor'
                type='color'
                value={templateData.backgroundColor}
                onChange={handleInputChange}
                className='p-1 h-10 w-full'
              />
            </div>
            <Button className='w-full' onClick={handleSave}>
              <Save className='mr-2 h-4 w-4' /> Guardar Plantilla
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className='lg:col-span-2'>
        <CertificatePreview data={templateData} />
      </div>
    </div>
  );
}
