import { Brain, Calendar, Users, TrendingUp, Award, Target, ChartBar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StatsCards() {
  const stats = [
    { 
      title: "Total Jeux", 
      value: "24",
      subtitle: "Planifications: 12", 
      icon: Brain, 
      bgGradient: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700",
      iconBg: "bg-white/15",
      trend: "+18%",
      color: "purple"
    },
    { 
      title: "Total Planifications", 
      value: "12", 
      icon: Calendar, 
      bgGradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-700",
      iconBg: "bg-white/15",
      trend: "+12%",
      color: "blue"
    },
    { 
      title: "Apprenants d'École", 
      value: "380", 
      icon: Users, 
      bgGradient: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700",
      iconBg: "bg-white/15",
      trend: "+8%",
      color: "green"
    },
    { 
      title: "Apprenants Invités", 
      value: "52", 
      icon: Award, 
      bgGradient: "bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600",
      iconBg: "bg-white/15",
      trend: "+24%",
      color: "orange"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s24">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgGradient} border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] rounded-3xl overflow-hidden h-[320px] group relative`}>
          <CardContent className="p-s32 h-full flex flex-col justify-between text-white relative z-10">
            {/* Header avec icône et trend */}
            <div className="flex items-start justify-between">
              <div className={`w-16 h-16 ${stat.iconBg} backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </Badge>
            </div>
            
            {/* Contenu principal */}
            <div className="space-y-s12 text-center">
              <h3 className="text-lg font-bold text-white/90 leading-tight group-hover:text-white transition-colors">
                {stat.title}
              </h3>
              
              <div className="space-y-s8">
                <p className="text-5xl font-black text-white group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </p>
                
                {stat.subtitle && (
                  <p className="text-sm text-white/70 leading-relaxed">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Indicateur de progression visuel */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/50 rounded-full transition-all duration-1000 group-hover:bg-white/70"
                style={{ width: `${65 + index * 10}%` }}
              ></div>
            </div>
            
            {/* Éléments décoratifs animés */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full opacity-60 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/5 rounded-full opacity-40 group-hover:scale-125 group-hover:opacity-10 transition-all duration-500"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full opacity-20 group-hover:scale-110 group-hover:opacity-10 transition-all duration-1000 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}