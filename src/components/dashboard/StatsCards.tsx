import { Brain, Calendar, Users, TrendingUp, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { DashboardData } from "@/services/dashboardService";

interface StatsCardsProps {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export function StatsCards({ data, loading, error }: StatsCardsProps) {
  const { t } = useTranslation();
  
  // Gestion du chargement
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-white border border-akili-grey-300 shadow-akili-sm rounded-xl overflow-hidden">
            <CardContent className="p-s20">
              <div className="flex items-start justify-between mb-s16">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
              <div className="space-y-s8">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
        <Card className="bg-white border border-akili-red-300 shadow-akili-sm rounded-xl overflow-hidden">
          <CardContent className="p-s20">
            <div className="text-akili-red-600 text-center">
              <p className="text-body2-medium">Erreur de chargement</p>
              <p className="text-body4-medium mt-2">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Création des statistiques à partir des données API
  const stats = [
    {
      title: t('dashboard.stats.totalGames'),
      value: data?.jeuxCrees?.toString() || "0",
      trend: "+15%", // Placeholder pour le trend
      subtitle: t('dashboard.stats.gamesSubtitle'),
      icon: Brain,
      color: "orange",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-orange-600"
    },
    {
      title: t('dashboard.stats.totalPlanification'),
      value: data?.planificationsTotal?.toString() || "0",
      trend: "+8%", // Placeholder pour le trend
      subtitle: t('dashboard.stats.planificationSubtitle'),
      icon: Calendar,
      color: "blue",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-blue-600"
    },
    {
      title: t('dashboard.stats.apprenantEcole'),
      value: data?.apprenantsEcole?.toString() || "0",
      trend: "+12%", // Placeholder pour le trend
      subtitle: t('dashboard.stats.apprenantEcoleSubtitle'),
      icon: Users,
      color: "green",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-green-600"
    },
    {
      title: t('dashboard.stats.apprenantInvite'),
      value: data?.apprenantsInvites?.toString() || "0",
      trend: "+24%", // Placeholder pour le trend
      subtitle: t('dashboard.stats.apprenantInviteSubtitle'),
      icon: UserPlus,
      color: "purple",
      bgColor: "bg-white",
      textColor: "text-akili-grey-800",
      valueColor: "text-akili-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} border border-akili-grey-300 shadow-akili-sm hover:shadow-akili-md transition-all duration-300 rounded-xl overflow-hidden group`}>
          <CardContent className="p-s20">
            {/* Header avec icône et trend */}
            <div className="flex items-start justify-between mb-s16 mx-0 my-[25px]">
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
                stat.trend.startsWith('+') ? 'bg-akili-green-100 text-akili-green-700' : 'bg-akili-red-100 text-akili-red-700'
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
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}