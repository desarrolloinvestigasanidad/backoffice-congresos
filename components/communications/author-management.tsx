"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Trash2, Mail, Building, Crown, User } from "lucide-react"

interface Author {
  id: string
  name: string
  email: string
  institution: string
  role: "principal" | "coautor"
  isRegistered: boolean
}

interface AuthorManagementProps {
  authors: Author[]
  onAuthorsChange: (authors: Author[]) => void
  error?: string
}

export default function AuthorManagement({ authors, onAuthorsChange, error }: AuthorManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    email: "",
    institution: "",
  })

  const principalAuthor = authors.find((author) => author.role === "principal")
  const coauthors = authors.filter((author) => author.role === "coautor")

  const addCoauthor = () => {
    if (!newAuthor.name || !newAuthor.email) return

    const author: Author = {
      id: Date.now().toString(),
      name: newAuthor.name,
      email: newAuthor.email,
      institution: newAuthor.institution,
      role: "coautor",
      isRegistered: false, // Se verificará en el backend
    }

    onAuthorsChange([...authors, author])
    setNewAuthor({ name: "", email: "", institution: "" })
    setShowAddForm(false)
  }

  const removeCoauthor = (authorId: string) => {
    onAuthorsChange(authors.filter((author) => author.id !== authorId))
  }

  const canAddMoreCoauthors = coauthors.length < 6

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Autores</span>
          <Badge variant="secondary">{authors.length}/7 autores</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Autor Principal */}
        {principalAuthor && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {principalAuthor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{principalAuthor.name}</h3>
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Autor Principal
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {principalAuthor.email}
                  </div>
                  {principalAuthor.institution && (
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {principalAuthor.institution}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">€8.00</div>
                <div className="text-xs text-muted-foreground">Pago requerido</div>
              </div>
            </div>
          </div>
        )}

        {/* Coautores */}
        {coauthors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Coautores</h4>
            {coauthors.map((author) => (
              <div key={author.id} className="p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{author.name}</h3>
                      <Badge variant="outline">
                        <User className="w-3 h-3 mr-1" />
                        Coautor
                      </Badge>
                      {author.isRegistered && (
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          Registrado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {author.email}
                      </div>
                      {author.institution && (
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {author.institution}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">Gratis</div>
                      <div className="text-xs text-muted-foreground">Sin coste</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCoauthor(author.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Añadir coautor */}
        {canAddMoreCoauthors && (
          <div className="space-y-3">
            {!showAddForm ? (
              <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Añadir Coautor ({coauthors.length}/6)
              </Button>
            ) : (
              <div className="p-4 border rounded-lg space-y-3">
                <h4 className="font-medium">Nuevo Coautor</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="coauthor-name">Nombre completo *</Label>
                    <Input
                      id="coauthor-name"
                      value={newAuthor.name}
                      onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                      placeholder="Dr. María García"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coauthor-email">Email *</Label>
                    <Input
                      id="coauthor-email"
                      type="email"
                      value={newAuthor.email}
                      onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
                      placeholder="maria@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coauthor-institution">Institución</Label>
                  <Input
                    id="coauthor-institution"
                    value={newAuthor.institution}
                    onChange={(e) => setNewAuthor({ ...newAuthor, institution: e.target.value })}
                    placeholder="Hospital Universitario"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addCoauthor} disabled={!newAuthor.name || !newAuthor.email}>
                    Añadir
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {!canAddMoreCoauthors && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">Has alcanzado el límite máximo de 6 coautores por comunicación.</p>
          </div>
        )}

        {/* Información adicional */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Información importante:</strong> El autor principal debe pagar €8. Los coautores pueden participar
            sin coste adicional. Se enviará una invitación por email a cada coautor.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
