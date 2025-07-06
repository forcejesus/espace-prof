import { Brain, Users, Calendar, Settings, BarChart, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  onNavigate: (view: string) => void;
  currentView?: string;
}

export function Sidebar({ onNavigate, currentView = "dashboard" }: SidebarProps) {
  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: BarChart, 
      onClick: () => onNavigate(""),
      isActive: currentView === "dashboard"
    },
    { 
      id: "mes-jeux", 
      label: "Mes Jeux", 
      icon: Brain, 
      onClick: () => onNavigate("mes-jeux"),
      isActive: currentView === "mes-jeux",
      badge: "24"
    },
    { 
      id: "planification", 
      label: "Planifications", 
      icon: Calendar, 
      onClick: () => onNavigate("planification"),
      isActive: currentView === "planification",
      badge: "12"
    },
    { 
      id: "apprenants", 
      label: "Apprenants", 
      icon: Users, 
      onClick: () => onNavigate("groupe-apprenant"),
      isActive: currentView === "apprenants",
      badge: "432"
    },
    { 
      id: "analytics", 
      label: "Analytics", 
      icon: BarChart, 
      onClick: () => onNavigate("analytics"),
      isActive: currentView === "analytics"
    },
    { 
      id: "settings", 
      label: "Paramètres", 
      icon: Settings, 
      onClick: () => onNavigate("settings"),
      isActive: currentView === "settings"
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-akili-grey-300 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-s24 border-b border-akili-grey-300">
        <div className="flex items-center space-x-s12">
          <div className="w-10 h-10 bg-gradient-to-br from-akili-orange-500 to-akili-orange-700 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-h5-bold text-akili-grey-800">AKILI</h2>
            <p className="text-body3-medium text-akili-grey-600">Education Platform</p>
          </div>
        </div>
      </div>
      
      {/* Menu principal */}
      <div className="flex-1 py-s20">
        <div className="px-s16 mb-s16">
          <p className="text-body4-bold text-akili-grey-600 uppercase tracking-wider">
            MENU PRINCIPAL
          </p>
        </div>
        
        <nav className="space-y-s8 px-s12">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center justify-between px-s16 py-s12 rounded-lg transition-all duration-200 group ${
                item.isActive
                  ? "bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 text-white shadow-md"
                  : "text-akili-grey-700 hover:bg-akili-grey-200 hover:text-akili-orange-500"
              }`}
            >
              <div className="flex items-center space-x-s12">
                <item.icon className={`w-5 h-5 ${
                  item.isActive ? "text-white" : "text-akili-grey-600 group-hover:text-akili-orange-500"
                }`} />
                <span className="text-body2-medium">{item.label}</span>  
              </div>
              
              {item.badge && (
                <Badge 
                  className={`text-xs ${
                    item.isActive 
                      ? "bg-white/20 text-white hover:bg-white/30" 
                      : "bg-akili-orange-100 text-akili-orange-700"
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Section d'aide */}
      <div className="p-s20 border-t border-akili-grey-300">
        <div className="bg-gradient-to-br from-akili-orange-50 to-akili-orange-100 rounded-lg p-s16">
          <div className="flex items-center space-x-s12 mb-s12">
            <div className="w-8 h-8 bg-gradient-to-br from-akili-orange-500 to-akili-orange-600 rounded-lg inline-flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-body2-bold text-akili-grey-800">Centre d'aide</h4>
              <p className="text-body4-medium text-akili-grey-600">Besoin d'assistance ?</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 hover:from-akili-orange-600 hover:to-akili-orange-700 text-white border-0"
          >
            Contactez-nous
          </Button>
        </div>
      </div>
    </div>
  );
}