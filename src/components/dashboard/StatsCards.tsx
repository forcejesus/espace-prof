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
        <Card key={index} className={`bg-white/90 backdrop-blur-sm shadow-akili-lg border-0 hover:shadow-akili-intense transition-all duration-fast transform hover:-translate-y-1 animate-fade-in-up animate-delay-${(index + 1) * 100}`}>
          <CardContent className="p-s32 text-center">
            <div className="flex flex-col items-center space-y-s16">
              <div className={`w-20 h-20 rounded-full ${stat.bgColor} flex items-center justify-center shadow-akili-md mb-s8`}>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              
              <div className="text-center">
                <p className="text-h1-bold text-akili-grey-800 mb-s4">{stat.value}</p>
                <h3 className="text-h5-bold text-akili-grey-800 mb-s8">{stat.title}</h3>
                <p className="text-body3-medium text-akili-green-500 font-akili-bold">{stat.change}</p>
                
                {stat.subtitle && (
                  <p className="text-body4-medium text-akili-grey-600 leading-relaxed mt-s8">{stat.subtitle}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}