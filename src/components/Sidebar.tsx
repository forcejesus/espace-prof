import { Brain, Users, Calendar, Settings, BarChart, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  onNavigate?: (view: string) => void; // Optional for backwards compatibility
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      // Convertir le path complet en nom de vue pour la compatibilité
      const viewName = path === "/" ? "" : path.replace("/", "");
      onNavigate(viewName);
    } else {
      navigate(path);
    }
  };

  const isActive = (path: string) => {
    if (path === "/" || path === "") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === path;
  };

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: BarChart, 
      path: "/",
      badge: undefined
    },
    { 
      id: "mes-jeux", 
      label: "Mes Jeux", 
      icon: Brain, 
      path: "/mes-jeux",
      badge: "24"
    },
    { 
      id: "planification", 
      label: "Planifications", 
      icon: Calendar, 
      path: "/planification",
      badge: "12"
    },
    { 
      id: "apprenants", 
      label: "Apprenants", 
      icon: Users, 
      path: "/groupe-apprenant",
      badge: "432"
    },
    { 
      id: "mon-compte", 
      label: "Mon Compte", 
      icon: Settings, 
      path: "/mon-compte",
      badge: undefined
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
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center justify-between px-s16 py-s12 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 text-white shadow-md"
                  : "text-akili-grey-700 hover:bg-akili-grey-200 hover:text-akili-orange-500"
              }`}
            >
              <div className="flex items-center space-x-s12">
                <item.icon className={`w-5 h-5 ${
                  isActive(item.path) ? "text-white" : "text-akili-grey-600 group-hover:text-akili-orange-500"
                }`} />
                <span className="text-body2-medium">{item.label}</span>  
              </div>
              
              {item.badge && (
                <Badge 
                  className={`text-xs ${
                    isActive(item.path) 
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
      
      {/* Section de déconnexion */}
      <div className="p-s20 border-t border-akili-grey-300">
        <button
          onClick={() => {
            // Logique de déconnexion - peut être modifiée selon vos besoins
            console.log("Déconnexion...");
            handleNavigation('/login');
          }}
          className="w-full flex items-center space-x-s12 px-s16 py-s12 rounded-lg transition-all duration-200 group text-akili-grey-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-600" />
          <span className="text-body2-medium">Se déconnecter</span>
        </button>
      </div>
    </div>
  );
}