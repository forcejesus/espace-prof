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
      onClick: () => onNavigate("creer-quiz")
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="group cursor-pointer hover:shadow-akili-lg transition-all duration-fast border-0 shadow-akili-md bg-white transform hover:-translate-y-2" 
            onClick={action.onClick}
          >
            <CardContent className="p-s28 flex flex-col justify-between h-full">
              <div className="flex flex-col items-center text-center space-y-s20 px-0 mx-0 my-[29px]">
                <div className={`w-20 h-20 rounded-akili-xl ${action.iconBg} flex items-center justify-center shadow-akili-lg group-hover:scale-110 transition-transform duration-fast`}>
                  <action.icon className={`w-10 h-10 ${action.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-akili-bold text-akili-grey-800 mb-s8 text-h5-bold">{action.title}</h3>
                  <p className="text-body3-medium text-akili-grey-600 leading-relaxed">{action.description}</p>
                </div>
              </div>
              
              <div className="mt-s20 pt-s20 border-t border-akili-grey-300">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }} 
                  className="w-full bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 hover:from-akili-orange-600 hover:to-akili-orange-700 text-white font-akili-bold py-s12 px-s20 rounded-akili-lg transition-all duration-300 transform hover:scale-105 shadow-akili-md hover:shadow-akili-lg"
                >
                  {t('dashboard.quickActions.access')}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}