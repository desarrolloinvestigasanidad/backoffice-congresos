"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import PersonalInfoForm from "./personal-info-form"
import ProfessionalInfoForm from "./professional-info-form"
import AccountSettings from "./account-settings"
import ActivityHistory from "./activity-history"
import ProfileStats from "./profile-stats"
import { User, Briefcase, Settings, History, Award, Calendar } from "lucide-react"

interface ProfileDashboardProps {
  profile: any // Usar tipado completo en producción
}

export default function ProfileDashboard({ profile }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState("personal")

  const fullName = `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`
  const initials = `${profile.personalInfo.firstName[0]}${profile.personalInfo.lastName[0]}`

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={profile.personalInfo.profileImage || "/placeholder.svg"} alt={fullName} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                Cuenta Verificada
              </Badge>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-1">
                {profile.professionalInfo.title} {fullName}
              </h2>
              <p className="text-lg text-muted-foreground mb-2">{profile.professionalInfo.specialization}</p>
              <p className="text-muted-foreground mb-4">{profile.professionalInfo.institution}</p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {profile.professionalInfo.position}
                </Badge>
                <Badge variant="outline">
                  <Award className="w-3 h-3 mr-1" />
                  {profile.professionalInfo.yearsExperience} años experiencia
                </Badge>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Miembro desde {new Date(profile.stats.memberSince).getFullYear()}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <ProfileStats stats={profile.stats} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de navegación */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Profesional</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Configuración</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Actividad</span>
          </TabsTrigger>
        </TabsList>

        {/* Información Personal */}
        <TabsContent value="personal" className="space-y-6 pt-6">
          <PersonalInfoForm personalInfo={profile.personalInfo} address={profile.address} taxInfo={profile.taxInfo} />
        </TabsContent>

        {/* Información Profesional */}
        <TabsContent value="professional" className="space-y-6 pt-6">
          <ProfessionalInfoForm
            professionalInfo={profile.professionalInfo}
            congresses={profile.congresses}
            stats={profile.stats}
          />
        </TabsContent>

        {/* Configuración */}
        <TabsContent value="settings" className="space-y-6 pt-6">
          <AccountSettings settings={profile.accountSettings} email={profile.personalInfo.email} />
        </TabsContent>

        {/* Actividad */}
        <TabsContent value="activity" className="space-y-6 pt-6">
          <ActivityHistory activity={profile.recentActivity} stats={profile.stats} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
