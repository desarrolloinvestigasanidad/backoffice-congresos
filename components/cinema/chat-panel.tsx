"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: string
  role?: "moderator" | "speaker" | "user"
  isHighlighted?: boolean
}

// Mensajes simulados del chat
const initialMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Dr. Moderador",
    message: "¡Bienvenidos a la mesa redonda! Pueden hacer preguntas durante la presentación.",
    timestamp: "10:00",
    role: "moderator",
    isHighlighted: true,
  },
  {
    id: "2",
    user: "María García",
    message: "Excelente presentación hasta ahora",
    timestamp: "10:15",
    role: "user",
  },
  {
    id: "3",
    user: "Dr. Carlos Martínez",
    message: "Gracias por participar. Ahora vamos a ver algunos casos clínicos.",
    timestamp: "10:16",
    role: "speaker",
  },
  {
    id: "4",
    user: "Ana López",
    message: "¿Podrían profundizar en las contraindicaciones?",
    timestamp: "10:18",
    role: "user",
  },
  {
    id: "5",
    user: "Pedro Sánchez",
    message: "Muy interesante el caso que acaban de mostrar",
    timestamp: "10:20",
    role: "user",
  },
  {
    id: "6",
    user: "Dr. Moderador",
    message: "Recordad que podéis usar el botón de 'levantar la mano' para hacer preguntas en voz alta",
    timestamp: "10:22",
    role: "moderator",
    isHighlighted: true,
  },
]

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isHandRaised, setIsHandRaised] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simular nuevos mensajes cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        "¿Hay algún estudio comparativo con la técnica tradicional?",
        "Excelente explicación, muy clara",
        "¿Cuál es la curva de aprendizaje para esta técnica?",
        "¿Tienen datos de seguimiento a largo plazo?",
        "Muy interesante, gracias por compartir",
        "¿Podrían comentar sobre los costes?",
        "¿Hay diferencias según la edad del paciente?",
      ]

      const randomUsers = [
        "Dr. Fernández",
        "Dra. Ruiz",
        "Carlos M.",
        "Elena P.",
        "Miguel A.",
        "Laura S.",
        "Javier L.",
        "Carmen V.",
      ]

      if (Math.random() > 0.7) {
        // 30% de probabilidad cada 5 segundos
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          role: "user",
        }
        setMessages((prev) => [...prev, newMsg])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: "Tú",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        role: "user",
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "moderator":
        return "bg-blue-500"
      case "speaker":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "moderator":
        return (
          <Badge variant="secondary" className="text-xs">
            Moderador
          </Badge>
        )
      case "speaker":
        return (
          <Badge variant="secondary" className="text-xs">
            Ponente
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      {/* Header del chat */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Chat en vivo</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">247 conectados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isHighlighted ? "bg-blue-50 -mx-4 px-4 py-2 rounded" : ""}`}
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className={`text-xs text-white ${getRoleColor(message.role)}`}>
                {message.user.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium truncate">{message.user}</span>
                {getRoleBadge(message.role)}
                <span className="text-xs text-muted-foreground">{message.timestamp}</span>
              </div>
              <p className="text-sm break-words">{message.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Controles del chat */}
      <div className="p-4 border-t space-y-3">
        <div className="flex gap-2">
          <Button
            variant={isHandRaised ? "default" : "outline"}
            size="sm"
            onClick={() => setIsHandRaised(!isHandRaised)}
            className="flex-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
              <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
              <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
              <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>
            {isHandRaised ? "Bajar mano" : "Levantar mano"}
          </Button>
          <Button variant="outline" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22 11 13 2 9z" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
