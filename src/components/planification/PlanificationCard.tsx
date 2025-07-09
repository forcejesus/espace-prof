import { Calendar, Timer, Users, Gamepad2, ChevronRight, Play, Edit, BarChart3, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlanificationCardProps {
  plan: any;
  index: number;
  onStartLiveSession: (plan: any) => void;
}

export function PlanificationCard({ plan, index, onStartLiveSession }: PlanificationCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "en-attente":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          icon: CalendarDays,
          label: "En attente"
        };
      case "en-cours":
        return {
          color: "bg-gradient-to-r from-emerald-500 to-green-600",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-700",
          icon: Play,
          label: "En cours"
        };
      case "terminé":
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: BarChart3,
          label: "Terminé"
        };
      default:
        return {
          color: "bg-gradient-to-r from-gray-500 to-gray-600",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          icon: CalendarDays,
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(plan.statut);
  const StatusIcon = statusConfig.icon;

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-0 rounded-2xl overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header avec gradient */}
      <CardHeader className={`${statusConfig.bgColor} border-b border-gray-100 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/20 to-transparent rounded-full"></div>
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${statusConfig.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <StatusIcon className="w-5 h-5 text-white" />
                </div>
                <Badge className={`${statusConfig.color} text-white font-medium px-3 py-1 rounded-lg shadow-sm`}>
                  {statusConfig.label}
                </Badge>
              </div>
              
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                {plan.type} - PIN: {plan.pin}
              </CardTitle>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Gamepad2 className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{plan.jeu?.titre || 'Jeu sans titre'}</span>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Informations principales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-bold text-gray-800">{plan.date_debut}</div>
                <div className="text-sm text-gray-600">à {plan.heure_debut}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div className="flex items-center space-x-3">
              <Timer className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-bold text-gray-800">{plan.heure_debut} - {plan.heure_fin}</div>
                <div className="text-sm text-gray-600">{plan.jeu?.questions?.length || 0} questions</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Participants */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-bold text-gray-800">
                  {plan.nombreParticipants || 0} / {plan.limite_participant} participants
                </div>
                <div className="text-sm text-gray-600">
                  {plan.placesRestantes || plan.limite_participant} places restantes
                </div>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-800 border border-orange-200 font-medium">
              {plan.type}
            </Badge>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-3 pt-2 border-t border-gray-100">
          <Button 
            variant="outline" 
            className="flex-1 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 rounded-xl"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          {plan.type === "Live" && (
            <Button 
              onClick={() => onStartLiveSession(plan)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play className="w-4 h-4 mr-2" />
              {plan.statut === "en-cours" ? "Rejoindre" : "Démarrer"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}