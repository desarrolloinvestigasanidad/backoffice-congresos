"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import VideoControls from "./video-controls"
import ChatPanel from "./chat-panel"
import ParticipantsPanel from "./participants-panel"

interface StreamEvent {
  id: string
  title: string
  presenter: string
  startTime: string
  endTime: string
  status: "upcoming" | "live" | "ended"
  viewers: number
  streamUrl?: string
}

// Datos simulados del evento en vivo
const currentEvent: StreamEvent = {
  id: "live-1",
  title: "Mesa Redonda: Avances en Cardiología Intervencionista",
  presenter: "Dr. Carlos Martínez, Dra. Elena Ruiz, Dr. Javier López",
  startTime: "2023-06-15T10:00:00Z",
  endTime: "2023-06-15T11:30:00Z",
  status: "live",
  viewers: 247,
  streamUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
}

export default function CinemaRoom() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [showParticipants, setShowParticipants] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (seekTime: number) => {
    setCurrentTime(seekTime)
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div ref={containerRef} className={`space-y-6 ${isFullscreen ? "bg-black text-white" : ""}`}>
      {/* Header del evento */}
      {!isFullscreen && (
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="destructive" className="animate-pulse">
                🔴 EN VIVO
              </Badge>
              <span className="text-sm text-muted-foreground">{currentEvent.viewers} espectadores</span>
            </div>
            <h1 className="text-2xl font-bold">{currentEvent.title}</h1>
            <p className="text-muted-foreground">{currentEvent.presenter}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowParticipants(!showParticipants)}>
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Participantes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)}>
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Chat
            </Button>
          </div>
        </div>
      )}

      {/* Contenedor principal */}
      <div
        className={`grid gap-6 ${isFullscreen ? "h-screen" : ""} ${
          showChat || showParticipants ? "lg:grid-cols-4" : "lg:grid-cols-1"
        }`}
      >
        {/* Reproductor de video */}
        <Card
          className={`${showChat || showParticipants ? "lg:col-span-3" : "lg:col-span-1"} ${
            isFullscreen ? "border-0 bg-transparent" : ""
          }`}
        >
          <CardContent className={`p-0 ${isFullscreen ? "" : "overflow-hidden rounded-lg"}`}>
            <div className={`relative bg-black ${isFullscreen ? "h-full" : "aspect-video"}`}>
              {/* Ambiente cinematográfico */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

              {/* Video principal */}
              <video
                ref={videoRef}
                src={currentEvent.streamUrl}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                autoPlay
                muted
              />

              {/* Overlay de información en vivo */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-medium animate-pulse">
                  🔴 EN VIVO
                </div>
                <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {currentEvent.viewers} espectadores
                </div>
              </div>

              {/* Título del evento en overlay */}
              {isFullscreen && (
                <div className="absolute bottom-20 left-4 right-4">
                  <h2 className="text-white text-xl font-bold mb-1">{currentEvent.title}</h2>
                  <p className="text-white/80">{currentEvent.presenter}</p>
                </div>
              )}

              {/* Controles de video */}
              <VideoControls
                isPlaying={isPlaying}
                volume={volume}
                currentTime={currentTime}
                duration={duration}
                isFullscreen={isFullscreen}
                onPlayPause={handlePlayPause}
                onVolumeChange={handleVolumeChange}
                onSeek={handleSeek}
                onFullscreen={handleFullscreen}
              />
            </div>
          </CardContent>
        </Card>

        {/* Panel lateral */}
        {(showChat || showParticipants) && !isFullscreen && (
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex gap-2">
                <Button
                  variant={showChat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowChat(true)
                    setShowParticipants(false)
                  }}
                  className="flex-1"
                >
                  Chat
                </Button>
                <Button
                  variant={showParticipants ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setShowChat(false)
                    setShowParticipants(true)
                  }}
                  className="flex-1"
                >
                  Participantes
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {showChat && <ChatPanel />}
              {showParticipants && <ParticipantsPanel />}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Información adicional cuando no está en pantalla completa */}
      {!isFullscreen && (
        <Card>
          <CardHeader>
            <CardTitle>Información del Evento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Descripción</h3>
                <p className="text-sm text-muted-foreground">
                  Mesa redonda con los principales expertos en cardiología intervencionista, donde se discutirán los
                  últimos avances en técnicas mínimamente invasivas y nuevos dispositivos para el tratamiento de
                  enfermedades cardiovasculares.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Programa</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Introducción</span>
                    <span className="text-muted-foreground">10:00 - 10:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nuevas técnicas</span>
                    <span className="text-muted-foreground">10:15 - 10:45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Casos clínicos</span>
                    <span className="text-muted-foreground">10:45 - 11:15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Preguntas y respuestas</span>
                    <span className="text-muted-foreground">11:15 - 11:30</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
