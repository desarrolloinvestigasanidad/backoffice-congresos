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
import {
  Download,
  ImageUp,
  Palette,
  Type,
  User,
  University,
} from "lucide-react";

// Interfaz para los datos del póster
interface PosterData {
  headerText: string;
  title: string;
  authors: string;
  affiliations: string;
  mainContent: string;
  figureUrl: string | null;
  figureCaption: string;
  footerText: string;
  backgroundColor: string;
  textColor: string;
}

// --- SUB-COMPONENTE DE VISTA PREVIA DEL PÓSTER ---
function PosterPreview({ data }: { data: PosterData }) {
  // Función para simular el renderizado de Markdown simple
  const renderMarkdown = (text: string) => {
    return text
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>'
      )
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n/g, "<br />");
  };

  return (
    <div
      className='p-6 md:p-8 border-2 border-gray-300 rounded-lg shadow-lg w-full max-w-3xl mx-auto aspect-[1/1.414] overflow-y-auto'
      style={{ backgroundColor: data.backgroundColor, color: data.textColor }}>
      <div className='text-center flex flex-col h-full'>
        {/* CABECERA */}
        <header className='mb-4'>
          <p className='text-lg font-semibold'>{data.headerText}</p>
        </header>
        <Separator className='bg-gray-400' />

        {/* TÍTULO Y AUTORES */}
        <div className='my-6'>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight mb-2'>
            {data.title}
          </h1>
          <p className='text-xl italic'>{data.authors}</p>
          <p className='text-md mt-1'>{data.affiliations}</p>
        </div>

        <Separator className='bg-gray-400' />

        {/* CUERPO Y FIGURA */}
        <main className='flex-1 mt-6 text-left grid grid-cols-3 gap-6'>
          <div
            className='col-span-2 text-sm leading-relaxed'
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(data.mainContent),
            }}
          />
          <div className='col-span-1'>
            {data.figureUrl && (
              <div className='border p-2'>
                <img
                  src={data.figureUrl}
                  alt={data.figureCaption || "Figura del póster"}
                  className='w-full object-contain'
                />
                <p className='text-xs italic text-center mt-2'>
                  {data.figureCaption}
                </p>
              </div>
            )}
          </div>
        </main>

        {/* PIE */}
        <footer className='mt-auto pt-4 text-xs'>
          <Separator className='bg-gray-400 mb-2' />
          {data.footerText}
        </footer>
      </div>
    </div>
  );
}

// --- COMPONENTE PRINCIPAL DEL GENERADOR ---
export function PosterGenerator() {
  const [posterData, setPosterData] = useState<PosterData>({
    headerText: "Congreso Nacional de Medicina 2025",
    title: "Impacto de la IA en el Diagnóstico por Imagen",
    authors: "Dr. Juan Pérez, Dra. María García",
    affiliations: "Hospital Universitario Central, Departamento de Radiología",
    mainContent: `## Introducción\nEl diagnóstico por imagen ha experimentado una revolución con la llegada de la inteligencia artificial...\n\n### Objetivos\n* Evaluar la precisión de algoritmos de IA.\n* Comparar resultados con radiólogos expertos.\n\n## Resultados\nLos algoritmos mostraron una sensibilidad del **95%** en la detección de nódulos pulmonares, superando el promedio humano del 88%.\n\n## Conclusión\nLa IA es una herramienta prometedora que puede aumentar la eficiencia y precisión en radiología.`,
    figureUrl:
      "https://via.placeholder.com/400x300.png?text=Gráfico+de+Resultados",
    figureCaption: "Fig. 1: Comparativa de sensibilidad.",
    footerText: "Logo del Hospital | Logo de la Universidad",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPosterData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleGeneratePdf = () => {
    alert("La generación de PDF es una funcionalidad avanzada. ¡Próximamente!");
    // Aquí iría la lógica con librerías como jsPDF y html2canvas para crear el PDF.
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* Columna de Formulario */}
      <div className='lg:col-span-1'>
        <Card>
          <CardHeader>
            <CardTitle>Editor del Póster</CardTitle>
            <CardDescription>
              Rellena los campos para configurar tu póster. Los cambios se
              reflejarán en la vista previa.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title' className='flex items-center gap-2'>
                <Type size={16} /> Título del Póster
              </Label>
              <Input
                id='title'
                value={posterData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='authors' className='flex items-center gap-2'>
                <User size={16} /> Autores
              </Label>
              <Input
                id='authors'
                value={posterData.authors}
                onChange={handleInputChange}
                placeholder='Separados por comas...'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='affiliations' className='flex items-center gap-2'>
                <University size={16} /> Afiliaciones
              </Label>
              <Input
                id='affiliations'
                value={posterData.affiliations}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='mainContent'>
                Contenido Principal (Soporta Markdown)
              </Label>
              <Textarea
                id='mainContent'
                value={posterData.mainContent}
                onChange={handleInputChange}
                rows={12}
                placeholder='Usa ## para títulos y **texto** para negrita.'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='figureCaption'
                className='flex items-center gap-2'>
                <ImageUp size={16} /> Pie de Figura
              </Label>
              <Input
                id='figureCaption'
                value={posterData.figureCaption}
                onChange={handleInputChange}
              />
            </div>
            <Separator />
            <div className='space-y-2'>
              <Label className='flex items-center gap-2'>
                <Palette size={16} /> Diseño
              </Label>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <Label htmlFor='backgroundColor' className='text-xs'>
                    Fondo
                  </Label>
                  <Input
                    id='backgroundColor'
                    type='color'
                    value={posterData.backgroundColor}
                    onChange={handleInputChange}
                    className='p-1 h-10 w-full'
                  />
                </div>
                <div>
                  <Label htmlFor='textColor' className='text-xs'>
                    Texto
                  </Label>
                  <Input
                    id='textColor'
                    type='color'
                    value={posterData.textColor}
                    onChange={handleInputChange}
                    className='p-1 h-10 w-full'
                  />
                </div>
              </div>
            </div>
            <Button className='w-full' onClick={handleGeneratePdf}>
              <Download className='mr-2 h-4 w-4' /> Generar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Columna de Vista Previa */}
      <div className='lg:col-span-2'>
        <PosterPreview data={posterData} />
      </div>
    </div>
  );
}
