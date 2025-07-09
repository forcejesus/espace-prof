import { Zap, Target, History, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface QuickActionsProps {
  onNavigate: (view: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const { t } = useTranslation();
  
  const quickActions = [
    {
      title: t('dashboard.quickActions.newGame'),
      description: t('dashboard.quickActions.newGameDesc'),
      icon: Zap,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-akili-orange-500 to-akili-orange-600",
      onClick: () => onNavigate("create-quiz")
    },
    {
      title: t('dashboard.quickActions.newCategory'),
      description: t('dashboard.quickActions.newCategoryDesc'),
      icon: Target,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-akili-blue-500 to-akili-blue-600",
      onClick: () => onNavigate("creer-categorie")
    },
    {
      title: t('dashboard.quickActions.planGame'),
      description: t('dashboard.quickActions.planGameDesc'),
      icon: History,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-akili-green-500 to-akili-green-600",
      onClick: () => onNavigate("planification")
    },
    {
      title: t('dashboard.quickActions.addInvitedStudent'),
      description: t('dashboard.quickActions.addInvitedStudentDesc'),
      icon: UserPlus,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-akili-purple-500 to-akili-purple-700",
      onClick: () => onNavigate("apprenant-invite")
    }
  ];

  return (
    <div className="space-y-s20">
      <h2 className="text-h3-bold text-akili-grey-800">{t('dashboard.quickActions.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-s16">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="group cursor-pointer hover:shadow-akili-md transition-all duration-fast border-0 shadow-akili-sm bg-white" 
            onClick={action.onClick}
          >
            <CardContent className="p-s16">
              <div className="flex items-center space-x-s16">
                <div className={`w-12 h-12 rounded-lg ${action.iconBg} flex items-center justify-center shadow-akili-sm group-hover:scale-105 transition-transform duration-fast`}>
                  <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-akili-bold text-akili-grey-800 text-body1-bold">{action.title}</h3>
                  <p className="text-body3-medium text-akili-grey-600">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}