"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Star, Download, Eye, Plus } from "lucide-react";
import { CertificateTemplateCreator } from "./certificate-template-creator"; // Importamos el editor

// --- TUS DATOS SIMULADOS ORIGINALES ---
const templateCategories = [
  "Todos",
  "Profesional",
  "Académico",
  "Premium",
  "Clásico",
];
const templatesData = [
  {
    id: 1,
    name: "Moderno Azul",
    category: "Profesional",
    isPremium: false,
    downloads: 1245,
    rating: 4.5,
    colors: ["#1E40AF", "#DBEAFE", "#1E3A8A"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Elegante Dorado",
    category: "Premium",
    isPremium: true,
    downloads: 876,
    rating: 4.8,
    colors: ["#92400E", "#FEF3C7", "#78350F"],
    previewUrl: "/placeholder.svg?height=200&width=300",
  },
  // ...resto de tus plantillas
];
// --- FIN DE DATOS SIMULADOS ---

export default function CertificateTemplates() {
  const [templates, setTemplates] = useState(templatesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Estado para controlar si mostramos la lista o el editor
  const [view, setView] = useState<"list" | "editor">("list");
  // Podríamos añadir un estado para la plantilla a editar: const [editingTemplate, setEditingTemplate] = useState(null);

  const handleSaveTemplate = (data: any) => {
    console.log("Guardando nueva plantilla (simulación):", data);
    // Lógica para añadir la nueva plantilla a la lista (cuando no haya backend)
    const newTemplate = {
      id: templates.length + 1,
      name: data.title, // Usamos el título como nombre
      category: "Nuevo",
      isPremium: false,
      downloads: 0,
      rating: 0,
      colors: [data.backgroundColor],
      previewUrl: data.logoUrl || "/placeholder.svg?height=200&width=300",
    };
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Si la vista es el editor, mostramos el componente de creación/edición
  if (view === "editor") {
    return (
      <CertificateTemplateCreator
        onBack={() => setView("list")}
        onSaveTemplate={handleSaveTemplate}
      />
    );
  }

  // Si no, mostramos la lista de plantillas (tu vista original)
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <CardTitle className='flex items-center gap-2'>
              <FileText className='h-5 w-5' />
              Plantillas de Certificados
            </CardTitle>
            <Button onClick={() => setView("editor")}>
              <Plus className='mr-2 h-4 w-4' /> Crear Nueva Plantilla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={18}
              />
              <Input
                placeholder='Buscar plantillas...'
                className='pl-10'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className='space-y-6'>
            <TabsList className='flex flex-wrap h-auto'>
              {templateCategories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className='mt-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className='overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                    <div className='aspect-[4/3] bg-gray-100 dark:bg-gray-800'>
                      <img
                        src={template.previewUrl}
                        alt={template.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <CardContent className='p-4'>
                      <h3 className='font-semibold'>{template.name}</h3>
                      <div className='flex items-center justify-between text-sm text-muted-foreground mt-2'>
                        <Badge variant='outline'>{template.category}</Badge>
                        <span className='flex items-center'>
                          <Download className='h-4 w-4 mr-1' />
                          {template.downloads}
                        </span>
                      </div>
                      <Button
                        className='w-full mt-4'
                        size='sm'
                        onClick={() =>
                          alert(`Usando plantilla: ${template.name}`)
                        }>
                        Usar Plantilla
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
