
import { Gamepad, Calendar, GraduationCap, Users, TrendingUp, Award, ArrowRight, Settings, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { 
      title: "Jeux Créés", 
      value: "24", 
      icon: Gamepad, 
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600", 
      textColor: "text-white",
      change: "+3 ce mois",
      changeColor: "text-orange-200"
    },
    { 
      title: "Planifications", 
      value: "12", 
      icon: Calendar, 
      bgColor: "bg-gradient-to-br from-violet-500 to-violet-600", 
      textColor: "text-white",
      change: "+2 cette semaine",
      changeColor: "text-violet-200"
    },
    { 
      title: "Enseignants", 
      value: "8", 
      icon: GraduationCap, 
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600", 
      textColor: "text-white",
      change: "+1 ce mois",
      changeColor: "text-blue-200"
    },
    { 
      title: "Apprenants", 
      value: "432", 
      icon: Users, 
      bgColor: "bg-gradient-to-br from-green-500 to-green-600", 
      textColor: "text-white",
      change: "+28 ce mois",
      changeColor: "text-green-200"
    },
  ];

  const quickActions = [
    {
      title: "Nouveau Jeu",
      description: "Créez un nouveau jeu éducatif interactif",
      icon: Gamepad,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-100",
      onClick: () => onNavigate("creator")
    },
    {
      title: "Planifier une Session",
      description: "Organisez une session de jeu en direct",
      icon: Calendar,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-100",
      onClick: () => onNavigate("live")
    },
    {
      title: "Bibliothèque",
      description: "Explorez vos jeux et ressources",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-100",
      onClick: () => onNavigate("library")
    },
    {
      title: "Historique",
      description: "Consultez les performances passées",
      icon: Award,
      iconColor: "text-green-500",
      iconBg: "bg-green-100",
      onClick: () => onNavigate("history")
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      {/* Header avec gradient orange et branding AKILI */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Bonjour sur AKILI ! 👋</h1>
              <p className="text-orange-100 text-sm md:text-base">Votre plateforme éducative interactive</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={() => onNavigate("settings")}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
            <Button 
              onClick={() => onNavigate("profile")}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className={`text-xs ${stat.changeColor.replace('text-', 'text-').replace('-200', '-600')}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions Rapides */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Actions Rapides</h2>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("settings")}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            Voir tout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className="action-card group"
              onClick={action.onClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${action.iconBg} flex items-center justify-center icon-scale`}>
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{action.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 arrow-slide" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section de performance récente */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-orange-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Performance Récente</h2>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("history")}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            Voir détails
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">Taux de réussite</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Sessions actives</p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
        </div>
      </div>
    </div>
  );
}
