import { Brain, Users, Calendar, Settings, BarChart, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { authService } from "@/services/authService";

interface SidebarProps {
  onNavigate?: (view: string) => void; // Optional for backwards compatibility
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
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
      label: t('nav.dashboard'), 
      icon: BarChart, 
      path: "/",
      badge: undefined
    },
    { 
      id: "mes-jeux", 
      label: t('nav.mesJeux'), 
      icon: Brain, 
      path: "/mes-jeux",
      badge: "24"
    },
    { 
      id: "planification", 
      label: t('nav.planifications'), 
      icon: Calendar, 
      path: "/planification",
      badge: "12"
    },
    { 
      id: "apprenants", 
      label: t('nav.apprenants'), 
      icon: Users, 
      path: "/groupe-apprenant",
      badge: "432"
    },
    { 
      id: "apprenant-invite", 
      label: t('nav.apprenantsInvites'), 
      icon: Users, 
      path: "/apprenant-invite",
      badge: undefined
    },
    { 
      id: "mon-compte", 
      label: t('nav.monCompte'), 
      icon: Settings, 
      path: "/mon-compte",
      badge: undefined
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-akili-grey-300 min-h-screen flex flex-col fixed left-0 top-0 z-50">
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
              className={`w-full flex items-center justify-between px-s16 py-s12 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <div className="flex items-center space-x-s12">
                <item.icon className={`w-5 h-5 ${
                  isActive(item.path) ? "text-white" : "text-gray-500 group-hover:text-orange-600"
                }`} />
                <span className="text-body2-medium">{item.label}</span>  
              </div>
              
              {item.badge && (
                <Badge 
                  className={`text-xs ${
                    isActive(item.path) 
                      ? "bg-white/20 text-white hover:bg-white/30" 
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Section support */}
      <div className="p-s20 border-t border-akili-grey-300">
        <div className="flex items-center justify-between mb-s16">
          <LanguageSelector />
        </div>
        
        <div className="bg-gradient-to-br from-akili-orange-50 to-akili-orange-100 rounded-lg p-s16 mb-s16">
          <div className="flex items-center space-x-s12 mb-s12">
            <div className="w-8 h-8 bg-gradient-to-br from-akili-orange-500 to-akili-orange-600 rounded-lg inline-flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-body2-bold text-akili-grey-800">{t('support.title')}</h4>
              <p className="text-body4-medium text-akili-grey-600">{t('support.email')}</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-akili-orange-500 to-akili-orange-600 hover:from-akili-orange-600 hover:to-akili-orange-700 text-white border-0"
          >
            {t('support.contact')}
          </Button>
        </div>
        
        {/* Section de déconnexion */}
        <button
          onClick={() => {
            // Déconnexion propre avec nettoyage du localStorage
            authService.logout();
            handleNavigation('/login');
          }}
          className="w-full flex items-center space-x-s12 px-s16 py-s12 rounded-lg transition-all duration-200 group text-akili-grey-600 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-600" />
          <span className="text-body2-medium">{t('nav.seDeconnecter')}</span>
        </button>
      </div>
    </div>
  );
}