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
        <Card key={index} className="bg-white shadow-akili-lg border-0 hover:shadow-akili-intense transition-all duration-fast transform hover:-translate-y-1">
          <CardContent className="p-s24">
            <div className="flex items-center justify-between mb-s20">
              <div className={`w-14 h-14 rounded-akili-xl ${stat.bgColor} flex items-center justify-center shadow-akili-md`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-h2-black text-akili-grey-800 mb-s4">{stat.value}</p>
                <p className="text-body3-medium text-akili-green-500 font-akili-bold">{stat.change}</p>
              </div>
            </div>
            <div>
              <h3 className="text-h4-bold text-akili-grey-800 mb-s8">{stat.title}</h3>
              {stat.subtitle && (
                <p className="text-body3-medium text-akili-grey-600">{stat.subtitle}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}