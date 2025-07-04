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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-s32">
      {stats.map((stat, index) => (
        <Card key={index} className="group bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-3xl overflow-hidden">
          <CardContent className="p-s40 relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-akili-grey-50/80 via-white/60 to-akili-grey-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-s24">
              {/* Icon circle */}
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl ${stat.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                {/* Subtle pulse effect */}
                <div className={`absolute inset-0 w-20 h-20 rounded-2xl ${stat.bgColor} opacity-20 animate-ping`}></div>
              </div>
              
              {/* Stats content */}
              <div className="space-y-s16">
                {/* Main value */}
                <div className="space-y-s8">
                  <p className="text-4xl font-bold text-akili-grey-900 group-hover:text-akili-grey-800 transition-colors duration-200">
                    {stat.value}
                  </p>
                  <h3 className="text-lg font-semibold text-akili-grey-700">
                    {stat.title}
                  </h3>
                </div>
                
                {/* Change indicator */}
                <div className="inline-flex items-center px-s20 py-s8 bg-gradient-to-r from-green-500/90 to-green-600/90 text-white text-sm font-medium rounded-full shadow-md">
                  {stat.change}
                </div>
                
                {/* Subtitle if exists */}
                {stat.subtitle && (
                  <div className="mt-s20 pt-s16 border-t border-akili-grey-200/60">
                    <p className="text-sm text-akili-grey-600 leading-relaxed bg-akili-grey-100/30 px-s16 py-s12 rounded-xl">
                      {stat.subtitle}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}