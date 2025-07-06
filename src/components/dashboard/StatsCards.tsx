import { Brain, Calendar, Users, TrendingUp, Award, Target, ChartBar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export function StatsCards() {
  const { t } = useTranslation();
  
  const stats = [
    { 
      title: "Total Revenus", 
      value: "$9,427.64",
      trend: "+10%",
      subtitle: "vs mois dernier", 
      icon: TrendingUp, 
      color: "orange",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-orange-600"
    },
    { 
      title: t('dashboard.stats.totalGames'), 
      value: "57,922", 
      trend: "+8%",
      subtitle: "vs mois dernier",
      icon: Brain, 
      color: "blue",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-blue-600"
    },
    { 
      title: "Planifications Actives", 
      value: "380", 
      trend: "+12%",
      subtitle: "sessions en cours",
      icon: Calendar, 
      color: "green",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-green-600"
    },
    { 
      title: "Performance", 
      value: "$2,119.99", 
      trend: "+24%",
      subtitle: "résumé mensuel",
      icon: ChartBar, 
      color: "purple",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-purple-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} border border-akili-grey-300 shadow-akili-sm hover:shadow-akili-md transition-all duration-300 rounded-xl overflow-hidden group`}>
          <CardContent className="p-s20">
            {/* Header avec icône et trend */}
            <div className="flex items-start justify-between mb-s16">
              <div className="flex items-center space-x-s12">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'orange' ? 'bg-akili-orange-100' :
                  stat.color === 'blue' ? 'bg-akili-blue-100' :
                  stat.color === 'green' ? 'bg-akili-green-100' :
                  'bg-akili-purple-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === 'orange' ? 'text-akili-orange-600' :
                    stat.color === 'blue' ? 'text-akili-blue-600' :
                    stat.color === 'green' ? 'text-akili-green-600' :
                    'text-akili-purple-500'
                  }`} />
                </div>
              </div>
              <Badge className={`text-xs font-medium ${
                stat.trend.startsWith('+') 
                  ? 'bg-akili-green-100 text-akili-green-700' 
                  : 'bg-akili-red-100 text-akili-red-700'
              }`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.trend}
              </Badge>
            </div>
            
            {/* Contenu principal */}
            <div className="space-y-s8">
              <h3 className={`text-body2-medium ${stat.textColor}`}>
                {stat.title}
              </h3>
              
              <div className="space-y-s4">
                <p className={`text-h3-bold ${stat.valueColor}`}>
                  {stat.value}
                </p>
                
                <p className="text-body4-medium text-akili-grey-600">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}