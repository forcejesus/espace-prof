import { Brain, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCards() {
  const stats = [
    { 
      title: "Total Jeux", 
      value: "24", 
      subtitle: "Planifications: 12",
      icon: Brain, 
      bgGradient: "bg-gradient-to-br from-pink-400 to-pink-600",
      change: "+3 ce mois"
    },
    { 
      title: "Total Planifications", 
      value: "12", 
      icon: Calendar, 
      bgGradient: "bg-gradient-to-br from-purple-400 to-purple-600",
      change: "+5 cette semaine"
    },
    { 
      title: "Apprenants d'École", 
      value: "380", 
      icon: Users, 
      bgGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      change: "+15 ce mois"
    },
    { 
      title: "Apprenants Invités", 
      value: "52", 
      icon: Users, 
      bgGradient: "bg-gradient-to-br from-green-400 to-green-600",
      change: "+8 cette semaine"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s24">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgGradient} border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 rounded-3xl overflow-hidden h-[280px]`}>
          <CardContent className="p-s40 h-full flex flex-col justify-center items-center text-center text-white relative">
            {/* Icon */}
            <div className="mb-s20">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Main content */}
            <div className="space-y-s16">
              {/* Title */}
              <h3 className="text-lg font-bold text-white leading-tight">
                {stat.title}
              </h3>
              
              {/* Value */}
              <p className="text-4xl font-bold text-white">
                {stat.value}
              </p>
              
              {/* Subtitle if exists */}
              {stat.subtitle && (
                <p className="text-sm text-white/80 leading-relaxed">
                  {stat.subtitle}
                </p>
              )}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/10 rounded-full opacity-30"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}