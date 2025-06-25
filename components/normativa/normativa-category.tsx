"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import NormativaItem from "./normativa-item"
import { ChevronDown, ChevronUp, FileText, Presentation, Shield, MapPin } from "lucide-react"

interface NormativaCategoryProps {
  category: any // Usar tipado completo en producción
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "FileText":
      return <FileText className="w-5 h-5" />
    case "Presentation":
      return <Presentation className="w-5 h-5" />
    case "Shield":
      return <Shield className="w-5 h-5" />
    case "MapPin":
      return <MapPin className="w-5 h-5" />
    default:
      return <FileText className="w-5 h-5" />
  }
}

const getCategoryColor = (color: string) => {
  switch (color) {
    case "blue":
      return "border-blue-200 bg-blue-50"
    case "green":
      return "border-green-200 bg-green-50"
    case "red":
      return "border-red-200 bg-red-50"
    case "purple":
      return "border-purple-200 bg-purple-50"
    default:
      return "border-gray-200 bg-gray-50"
  }
}

export default function NormativaCategory({ category }: NormativaCategoryProps) {
  const [isOpen, setIsOpen] = useState(false)

  const mandatoryItems = category.items.filter((item: any) => item.mandatory)
  const optionalItems = category.items.filter((item: any) => !item.mandatory)
  const highPriorityItems = category.items.filter((item: any) => item.priority === "high")

  return (
    <Card className={`border-2 ${getCategoryColor(category.color)}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getCategoryIcon(category.icon)}
                <div>
                  <h3 className="text-xl">{category.name}</h3>
                  <p className="text-sm font-normal text-muted-foreground">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white/70">
                    {category.items.length} normativas
                  </Badge>
                  {mandatoryItems.length > 0 && (
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      {mandatoryItems.length} obligatorias
                    </Badge>
                  )}
                  {highPriorityItems.length > 0 && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      {highPriorityItems.length} prioritarias
                    </Badge>
                  )}
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Normativas obligatorias primero */}
              {mandatoryItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Normativas Obligatorias
                  </h4>
                  {mandatoryItems.map((item: any) => (
                    <NormativaItem key={item.id} item={item} categoryColor={category.color} />
                  ))}
                </div>
              )}

              {/* Normativas opcionales */}
              {optionalItems.length > 0 && (
                <div className="space-y-3">
                  {mandatoryItems.length > 0 && <div className="border-t pt-4" />}
                  <h4 className="font-semibold text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    Normativas Informativas
                  </h4>
                  {optionalItems.map((item: any) => (
                    <NormativaItem key={item.id} item={item} categoryColor={category.color} />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
