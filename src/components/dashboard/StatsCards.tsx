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
        <Card key={index} className={`bg-white shadow-akili-lg border-0 hover:shadow-akili-intense transition-all duration-fast transform hover:-translate-y-1 animate-fade-in-up animate-delay-${(index + 1) * 100}`}>
          <CardContent className="p-s32">
            <div className="flex items-start justify-between mb-s24">
              <div className={`w-16 h-16 rounded-akili-xl ${stat.bgColor} flex items-center justify-center shadow-akili-md`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-h2-black text-akili-grey-800 mb-s8">{stat.value}</p>
                <p className="text-body3-medium text-akili-green-500 font-akili-bold">{stat.change}</p>
              </div>
            </div>
            <div className="pt-s16">
              <h3 className="text-h4-bold text-akili-grey-800 mb-s12">{stat.title}</h3>
              {stat.subtitle && (
                <p className="text-body3-medium text-akili-grey-600 leading-relaxed">{stat.subtitle}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}