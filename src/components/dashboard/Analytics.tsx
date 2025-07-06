import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Analytics() {
  const { t } = useTranslation();
  
  const analyticsData = [
    {
      title: "Taux de Participation",
      value: "87.3%",
      change: "+2.4%",
      isPositive: true,
      color: "bg-akili-green-100",
      textColor: "text-akili-green-700"
    },
    {
      title: "Score Moyen",
      value: "76.8",
      change: "+5.2%",
      isPositive: true,
      color: "bg-akili-blue-100",
      textColor: "text-akili-blue-700"
    },
    {
      title: "Temps Moyen",
      value: "12m 34s",
      change: "-1.8%",
      isPositive: false,
      color: "bg-akili-orange-100",
      textColor: "text-akili-orange-700"
    }
  ];

  const monthlyData = [
    { month: "Jan", value: 65 },
    { month: "Fév", value: 78 },
    { month: "Mar", value: 82 },
    { month: "Avr", value: 75 },
    { month: "Mai", value: 88 },
    { month: "Jun", value: 92 },
    { month: "Jul", value: 85 },
    { month: "Aoû", value: 89 },
    { month: "Sep", value: 94 },
    { month: "Oct", value: 87 },
    { month: "Nov", value: 91 },
    { month: "Déc", value: 96 }
  ];

  return (
    <div className="space-y-s20">
      {/* Métriques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-s16">
        {analyticsData.map((metric, index) => (
          <Card key={index} className="bg-white border border-akili-grey-300 shadow-akili-sm rounded-xl">
            <CardContent className="p-s16">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body3-medium text-akili-grey-600 mb-s4">{metric.title}</p>
                  <p className="text-h4-bold text-akili-grey-800">{metric.value}</p>
                </div>
                <Badge className={`${metric.color} ${metric.textColor} border-0`}>
                  {metric.isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphique de performance */}
      <Card className="bg-white border border-akili-grey-300 shadow-akili-sm rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-h4-bold text-akili-grey-800">
              Performance Mensuelle
            </CardTitle>
            <div className="flex items-center space-x-s8">
              <Badge variant="outline" className="border-akili-grey-400 text-akili-grey-700">
                Cette année
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end space-x-s8">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-akili-orange-500 to-akili-orange-300 rounded-t-sm transition-all duration-300 hover:from-akili-orange-600 hover:to-akili-orange-400"
                  style={{ height: `${(data.value / 100) * 200}px` }}
                ></div>
                <p className="text-body4-medium text-akili-grey-600 mt-s8">{data.month}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-s20 pt-s20 border-t border-akili-grey-300">
            <div className="flex items-center justify-between text-body3-medium text-akili-grey-600">
              <span>Performance moyenne: 84.2%</span>
              <span className="flex items-center text-akili-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.3% vs année précédente
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}