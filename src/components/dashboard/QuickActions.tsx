import { Zap, Target, History, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionsProps {
  onNavigate: (view: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const quickActions = [
    {
      title: "Nouveau Jeux",
      description: "Créez un nouveau jeu éducatif",
      icon: Zap,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("creer-quiz")
    },
    {
      title: "Planifier une Session",
      description: "Organisez une session de jeu",
      icon: Target,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("planification")
    },
    {
      title: "Historique des Planifications",
      description: "Consultez vos planifications passées",
      icon: History,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("historique-planification")
    },
    {
      title: "Gestion des Apprenants",
      description: "Gérez vos apprenants et groupes",
      icon: UserPlus,
      iconColor: "text-white",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      onClick: () => onNavigate("groupe-apprenant")
    }
  ];

  return (
    <div className="space-y-s20">
      <h2 className="text-h3-bold text-akili-grey-800">Actions Rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s20">
        {quickActions.map((action, index) => (
          <Card key={index} className="group cursor-pointer hover:shadow-akili-lg transition-all duration-fast border-0 shadow-akili-md bg-white transform hover:-translate-y-2" onClick={action.onClick}>
            <CardContent className="p-s28 flex flex-col justify-between h-full">
              <div className="flex flex-col items-center text-center space-y-s20">
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
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-akili-bold py-s12 px-s20 rounded-akili-lg transition-all duration-300 transform hover:scale-105 shadow-akili-md hover:shadow-akili-lg"
                >
                  Accéder
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}