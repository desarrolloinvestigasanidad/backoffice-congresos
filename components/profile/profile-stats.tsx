import { FileText, CheckCircle, Calendar, Award } from "lucide-react"

interface ProfileStatsProps {
  stats: any
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 text-center">
      <div className="p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-center mb-1">
          <FileText className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-lg font-bold text-blue-600">{stats.communicationsSubmitted}</div>
        <div className="text-xs text-blue-700">Comunicaciones</div>
      </div>
      <div className="p-3 bg-green-50 rounded-lg">
        <div className="flex items-center justify-center mb-1">
          <CheckCircle className="w-4 h-4 text-green-600" />
        </div>
        <div className="text-lg font-bold text-green-600">{stats.communicationsAccepted}</div>
        <div className="text-xs text-green-700">Aceptadas</div>
      </div>
      <div className="p-3 bg-purple-50 rounded-lg">
        <div className="flex items-center justify-center mb-1">
          <Calendar className="w-4 h-4 text-purple-600" />
        </div>
        <div className="text-lg font-bold text-purple-600">{stats.congressesAttended}</div>
        <div className="text-xs text-purple-700">Congresos</div>
      </div>
      <div className="p-3 bg-yellow-50 rounded-lg">
        <div className="flex items-center justify-center mb-1">
          <Award className="w-4 h-4 text-yellow-600" />
        </div>
        <div className="text-lg font-bold text-yellow-600">{stats.certificatesEarned}</div>
        <div className="text-xs text-yellow-700">Certificados</div>
      </div>
    </div>
  )
}
