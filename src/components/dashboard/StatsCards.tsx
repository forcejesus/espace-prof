import { Brain, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    { 
      title: "Jeux Créés", 
      value: "24", 
      icon: Brain, 
      bgColor: "bg-akili-purple-500", 
      textColor: "text-white",
      change: "+3 ce mois",
      changeColor: "text-purple-200"
    },
    { 
      title: "Planifications", 
      value: "12", 
      icon: Calendar, 
      bgColor: "bg-akili-blue-500", 
      textColor: "text-white",
      change: "+5 cette semaine",
      changeColor: "text-blue-200"
    },
    { 
      title: "Apprenants", 
      value: "432", 
      subtitle: "École: 380 | Groupes: 35 | Individuels: 17",
      icon: Users, 
      bgColor: "bg-akili-green-500", 
      textColor: "text-white",
      change: "+28 ce mois",
      changeColor: "text-green-200"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-s24">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-white/95 backdrop-blur-lg shadow-2xl border-0 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up animate-delay-${(index + 1) * 100} rounded-2xl overflow-hidden`}>
          <CardContent className="p-s40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center space-y-s20">
              <div className={`w-24 h-24 rounded-full ${stat.bgColor} flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-110 relative`}>
                <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
                <stat.icon className="w-12 h-12 text-white relative z-10" />
              </div>
              
              <div className="text-center space-y-s12">
                <p className="text-h1-bold text-akili-grey-800 mb-s8 transform transition-transform duration-300 hover:scale-105">{stat.value}</p>
                <h3 className="text-h5-bold text-akili-grey-800 mb-s12">{stat.title}</h3>
                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-s16 py-s8 rounded-full text-body4-bold shadow-lg">
                    {stat.change}
                  </div>
                </div>
                
                {stat.subtitle && (
                  <p className="text-body4-medium text-akili-grey-600 leading-relaxed mt-s12 bg-akili-grey-200/50 p-s12 rounded-akili-lg">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}